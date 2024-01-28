import { PDFDocument, PDFRawStream, PDFName, StandardFonts, getDefaultFontSize } from './lib/pdf-lib.esm.js';
import fontkit from './lib/fontkit.es.js';
import { registerSettings } from "./settings.js";
import { getPdf, getSheetType } from "./sheet-export-api.js";

//global saveAs;

Hooks.once('ready', async function () {

});

// Store mapping
Hooks.once('init', async function () {
	if (game.version && isNewerVersion(game.version, "9.230")) {
		game.keybindings.register(SheetExportconfig.ID, "showConfig", {
			name: "Show Config",
			hint: "Show PDF config menu for the character currently open",
			onDown: () => {
				// If the currently opened sheet is an Actor sheet, open the PDF config for the actor
				if (ui.activeWindow instanceof ActorSheet) {
					new SheetExportconfig(ui.activeWindow.object).render(true);
				}
			},
		});
	}
	registerSettings();
});

// Inject editor into the settings menu
Hooks.on("renderSettingsConfig", (app, html) => {
	// Only if GM
	// TODO check if this is control is placed also on the other part
	if (game.user.isGM) {
	}

});

// Add button to Actor Sheet for opening app
Hooks.on("getActorSheetHeaderButtons", (sheet, buttons) => {
	console.log("check the sheet")
	console.log(sheet)
	console.log(sheet.actor)
	// If this is not a player character sheet, return without adding the button
	// added pc for cypher system
	let mappingVersion = game.settings.get(SheetExportconfig.ID, "mapping-version");
	let mappingRelease = game.settings.get(SheetExportconfig.ID, "mapping-release");
	let sheetType = getSheetType(sheet.actor, mappingVersion, mappingRelease);
	if (sheetType) {
		buttons.unshift({
			label: "Export to PDF",
			class: "export-pdf",
			icon: "fas fa-file-export",
			onclick: () => {
				// Open Config window
				new SheetExportconfig(sheet.actor, sheetType, sheet).render(true);

				// Bring window to top
				Object.values(ui.windows)
					.filter(window => window instanceof SheetExportconfig)[0]
					?.bringToTop();
			},
		});
	}
});

class SheetExportconfig extends FormApplication {
	constructor(actor, sheetType, sheet) {
		super();
		this.sheetType = sheetType;
		console.group("SheetExportconfig");
		console.log(this.sheetType);
		this.actor = actor;
		this.sheet = sheet;
		this.mappingVersion = game.settings.get(SheetExportconfig.ID, "mapping-version");
		this.mappingRelease = game.settings.get(SheetExportconfig.ID, "mapping-release");
		console.log(this.actor);
		console.log(this.mappingVersion);
		console.groupEnd();
		//this.filledPdf = new ArrayBuffer();
		this.filledPdf = [];
		this.currentBuffer = new ArrayBuffer();
	}

	/** The module's ID */
	static ID = "sheet-export";

	/** @override */
	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			template: "modules/sheet-export/templates/module.hbs",
			id: "sheet-export-form",
			height: (window.innerHeight * 7) / 8,
			width: Math.max(window.innerWidth / 3, 600),
			resizable: true,
			title: "Export to PDF",
		});
	}

	/** @override */
	activateListeners() {
		document.getElementById("sheet-export-upload").addEventListener("change", event => {
			const file = event.target.files[0];
			const reader = new FileReader();
			reader.onload = ev => this.onFileUpload(ev.target.result);
			reader.readAsArrayBuffer(file);
		});

		document.getElementById("sheet-export-apply").addEventListener("click", event => {
			console.log("apply");
			this.createForm(null);
		});

		document.getElementById("sheet-export-final").addEventListener("click", event => {
			event.preventDefault();
			this.download(this.currentBuffer);
		});

		document.getElementById("sheet-export-download")?.addEventListener("click", event => event.preventDefault());
	}

	/** @override */
	getData() {
		const system = game.system.id;
		return {
			download: {
				show: !!game.i18n.translations.pdfsheet?.download[system],
				label: game.i18n.localize(`sheet-export.download.${system}.label`),
				title: game.i18n.localize(`sheet-export.download.${system}.title`),
				url: game.i18n.localize(`sheet-export.download.${system}.url`),
			},
		};
	}

	/** Get values and download PDF */
	download(buffer) {
		//		console.log(buffer);
		for (let index = 0; index < this.filledPdf.length; index++) {
			console.log(this.filledPdf[index]);
			const theFile = this.filledPdf[index];
			const blob = new Blob([theFile.file], { type: "application/pdf" });
			console.log(blob);
			saveAs(blob, theFile.nameDownload);
		}

	}

	/** Manage new PDF upload */
	onFileUpload(buffer) {
		this.currentBuffer = buffer;
		this.createForm(this.currentBuffer);
	}

	async getMeta(url) {
		const img = new Image();
		img.src = url;
		await img.decode();
		return img
	};

	fitImage2Box(img, box) {
		const ratioImg = img.naturalWidth / img.naturalHeight;
		const ratioBox = box.width / box.height;
		console.log(ratioImg);
		console.log(ratioBox);
		if (ratioBox > ratioImg) {
			console.log("box is a ractangle with greater aspect ratio than than image");
			const height = box.height;
			const ratio = box.height / img.naturalHeight;
			console.log(ratio);
			const width = img.naturalWidth * ratio;
			const x = box.pos_x + (box.width - width) / 2;
			const y = box.pos_y;
			return { width, height, x, y };
		} else {
			console.log("box is a ractangle with lower aspect ratio than image");
			const width = box.width;
			const ratio = box.width / img.naturalWidth;
			console.log(ratio);
			const height = img.naturalHeight * ratio;
			const x = box.pos_x;
			const y = box.pos_y + (box.height - height) / 2;
			return { width, height, x, y };
		}
	}

	async embedImages(pdf, images) {
		for (let i = 0; i < images.length; i++) {
			let img_path = images[i].path;

			// test to get image dimensions from url

			console.log(images[i]);
			console.log(images[i].height / images[i].width)
			// Usage example:
			let coords = null;
			await this.getMeta(getRoute(img_path)).then(img => {
				console.log("IMG dimensions")
				console.log(img.naturalHeight + ' ' + img.naturalWidth);
				console.log(img.naturalHeight / img.naturalWidth);
				console.log(img);
				coords = this.fitImage2Box(img, images[i]);
				console.log(coords);
			});


			console.log(img_path);
			console.log(images[i]);
			let img_ext = img_path.split('.').pop();
			console.log(img_ext);
			const arrayBuffer = await fetch(getRoute(img_path)).then(res => res.arrayBuffer())
			let embedding_image = null;
			switch (img_ext) {
				case "png":
					embedding_image = await pdf.embedPng(arrayBuffer)
					break;
				case "jpg":
				case "jpeg":
					embedding_image = await pdf.embedJpg(arrayBuffer)
					break;
				case "webp":
					// Create an OffscreenCanvas and draw the WebP image
					const offscreenCanvas = new OffscreenCanvas(1, 1);
					const offscreenContext = offscreenCanvas.getContext('2d');

					const img = new Image();
					img.src = URL.createObjectURL(new Blob([arrayBuffer], { type: 'image/webp' }));
					await img.decode();
					offscreenCanvas.width = img.width;
					offscreenCanvas.height = img.height;
					offscreenContext.drawImage(img, 0, 0);

					// Convert the canvas to a PNG Blob
					const pngBlob = await offscreenCanvas.convertToBlob({ type: 'image/png' });

					// Read the Blob as an ArrayBuffer
					const pngArrayBuffer = await new Response(pngBlob).arrayBuffer();
					embedding_image = await pdf.embedPng(pngArrayBuffer)
					break;

				default:
					ui.notifications.error(`We cannot manage: ${img_path}; format unsupported`);
					break;
			}
			if (embedding_image != null) {
				const page = pdf.getPage(images[i].page);
				console.log(images[i]);
				// Draw the JPG image in the center of the page
				page.drawImage(embedding_image, {
					x: coords.x,
					y: coords.y,
					width: coords.width,
					height: coords.height,
				})
				/*
								page.drawImage(embedding_image, {
									x: images[i].pos_x,
									y: images[i].pos_y,
									width: images[i].width,
									height: images[i].height,
								})
				*/
			}
		};
	}

	/**
	 * Creates the form for the PDF export.
	 * Fetches the form mapping and PDF template. 
	 * Populates the PDF form fields with data from the actor.
	 */
	async createForm(buffer) {
		console.log("create form");
		document.getElementById("sheet-export-form").style.cursor = "wait";

		const inputForm = document.getElementById("fieldList");

		// get the mapping version and release for the game system set in the config
		console.log(this.sheetType);

		// get the mapping for the game system and the version set in the config
		const { default: MappingClass } = await import(getRoute(`/modules/sheet-export/mappings/${game.system.id}/${this.mappingVersion}/${this.mappingRelease}/${this.sheetType}.js`));
		var mappingClass = null;
		try {
			mappingClass = new MappingClass(this.actor, this.sheetType, this.sheet);
		} catch (error) {
			ui.notifications.error("error in loading mapping:" + error.message);
			console.log(error);
			document.getElementById("sheet-export-form").style.cursor = "default";
		}
		console.log(mappingClass);


		for (let pfdFileIndex = 0; pfdFileIndex < mappingClass.pdfFiles.length; pfdFileIndex++) {
			const mapping = mappingClass.getFields(pfdFileIndex);
			//console.log(mapping);
			const pdfFile = mappingClass.pdfFiles[pfdFileIndex];
			// get the PDF
			let pdf = null
			if (pfdFileIndex > 0) {
				pdf = await getPdf(pdfFile.pdfUrl);
			} else {
				pdf = await getPdf(pdfFile.pdfUrl, buffer);
			}
			pdf.registerFontkit(fontkit);
			console.log(pdf);
			let form = null;
			let fields = null;
			try {
				form = pdf.getForm();
				console.log(form);
				fields = form.getFields()
				console.log(fields);
			} catch (error) {
				ui.notifications.error("error in loading PDF form fields:" + error.message);
				console.log(error);
				return;
			}
			const actor = this.actor;

			let images = mappingClass.getImages(pfdFileIndex);
			if (images) {
				await this.embedImages(pdf, images);
			}

			const rowPdfTitle = document.createElement("li");

			const pdfTitle = document.createElement("label");
			pdfTitle.innerText = `${pdfFile.name} - ${fields.length} fields`;
			pdfTitle.setAttribute("class", "pdf-title");
			rowPdfTitle.prepend(pdfTitle);

			inputForm.appendChild(rowPdfTitle);

			var i = 0;
			fields.forEach(field => {
				const type = field.constructor.name.trim();
				const name = field.getName().trim();
				//				console.log(`${type}: ${name}`)
				//				console.log(field);
				//	console.log("dafault appearance");
				//		console.log(field.acroField.getDefaultAppearance());
				const fontExp = /\/(?<font>.*?)\s/gm
				var fieldFont = fontExp.exec(field.acroField.getDefaultAppearance())?.groups?.font;
				//				var defApp = field.acroField.getDefaultAppearance().split(" ");
				//				var fieldFont = defApp[0].slice(1);
				//			console.log(fieldFont);
				//			console.log(field.acroField.DA());
				//				var widg = field.acroField.getWidgets()
				//			console.log("widgets");
				//			console.log(widg);
				// Create row
				const row = document.createElement("li");

				// Create label
				const label = document.createElement("label");
				label.innerText = `${name}: `;
				label.htmlFor = name;

				// Insert label
				row.prepend(label);
				inputForm.appendChild(row);
				// Create an input
				let input = null;
				if ((typeof field.isMultiline === 'function') && field.isMultiline()) {
					input = document.createElement("textarea");
				} else {
					input = document.createElement("input");
					input.setAttribute("text-align", "right");
				}
				input.disabled = true;
				input.setAttribute("data-idx", i);
				input.setAttribute("data-key", name);
				input.id = name;

				var fieldMapping = mapping.find(f => f.pdf === name)
				//		console.log(fieldMapping)
				//				functionSet.secm.setCurrentField(field);
				//				functionSet.secm.setCurrentFontsize(getDefaultFontSize(field.acroField));

				switch (type) {
					case "PDFTextField":
						if (field.isMultiline()) {
							input.innerHTML = fieldMapping ? fieldMapping.calculated : "";
						} else {
							input.setAttribute("type", "text");
							input.value = fieldMapping ? fieldMapping.calculated : "";
						}
						field.setText(fieldMapping ? (fieldMapping.calculated ? fieldMapping.calculated.toString() : "") : "");
						field.markAsClean();
						break;
					case "PDFCheckBox":
						input.setAttribute("type", "checkbox");
						input.checked = fieldMapping ? fieldMapping.calculated : "";
						fieldMapping ? (fieldMapping.calculated ? field.check() : field.uncheck()) : field.uncheck();
						break;
					case "PDFButton":
						console.log("PDFButton");
						break;
					case "PDFRadioGroup":
						console.log("PDFRadioGroup");
						break;

					default:
						//				console.log("nothing in switch");
						break;
				}
				row.appendChild(input); // Add to DOM

				i++;
			})
			// TODO this has to be an array
			console.log(pdfFile);
			this.filledPdf.push({ file: await pdf.save(), name: pdfFile.name, nameDownload: this.actor.name + ".pdf" });

		}
		document.getElementById("sheet-export-header").setAttribute("style", "display: none");
		document.getElementById("sheet-export-final").style.display = "block";
		document.getElementById("sheet-export-form").style.cursor = "default";

	}
}
