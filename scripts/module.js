import { PDFDocument, PDFRawStream, PDFName, StandardFonts, getDefaultFontSize } from './lib/pdf-lib.esm.js';
import fontkit from './lib/fontkit.es.js';
import { registerSettings } from "./settings.js";
import { getMapping, getPdf, getSheetType } from "./sheet-export-api.js";
import { SheetExportContentManager } from "./sheet-export-content-manager.js";
import fetchInject from "./lib/fetch-inject.min.js";

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
	let sheetType = getSheetType(sheet.actor);
	// TODO check if sheetTtype is undefined
	console.log(sheetType);
	console.log(sheet.actor);
	//	if (!["character", "PC", "Player", "npc", "pc"].includes(sheet.actor.type ?? sheet.actor.data.type)) return;

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
});

class SheetExportconfig extends FormApplication {
	constructor(actor, sheetType, sheet) {
		super();
		this.sheetType = sheetType;
		console.log(this.sheetType);
		this.actor = actor;
		this.sheet = sheet;
		console.log(this.actor);
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
			const theFile = this.filledPdf[index];
			const blob = new Blob([theFile.file], { type: "application/pdf" });
			console.log(blob);
			saveAs(blob, theFile.name);
		}

	}

	/** Manage new PDF upload */
	onFileUpload(buffer) {
		this.currentBuffer = buffer;
		this.createForm(this.currentBuffer);
	}

	getMapping = getMapping;
	getPdf = getPdf;

	async embedImages(pdf, images) {
		for (let i = 0; i < images.length; i++) {
			let img_path = images[i].path;
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
					embedding_image = await pdf.embedPng(arrayBuffer)
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
					x: images[i].pos_x,
					y: images[i].pos_y,
					width: images[i].width,
					height: images[i].height,
				})
			}
		};
	}

	testFunction(actor) {
		console.log("test");
		console.log(actor);
	}


	/**
	 * Creates the form for the PDF export.
	 * Fetches the form mapping and PDF template. 
	 * Populates the PDF form fields with data from the actor.
	 */
	async createForm(buffer) {
		console.log("create form");
		const inputForm = document.getElementById("fieldList");

		// get the mapping version and release for the game system set in the config
		let mappingVersion = game.settings.get(SheetExportconfig.ID, "mapping-version");
		let mappingRelease = game.settings.get(SheetExportconfig.ID, "mapping-release");
		console.log(this.sheetType);

		// get the mapping for the game system and the version set in the config
		//		const mapping = await this.getMapping(mappingVersion, mappingRelease, this.sheetType);
		const { default: MappingClass } = await import(getRoute(`/modules/sheet-export/mappings/${game.system.id}/${mappingVersion}/${mappingRelease}/${this.sheetType}.js`));
		console.log(mappingClass);
		var mappingClass = new MappingClass(this.actor, this.sheetType, this.sheet);
		console.log(mappingClass);
		//	console.log(mc.getMapping("name"));
		//		console.log(mc.getMapping("test1"));


		for (let pfdFileIndex = 0; pfdFileIndex < mappingClass.pdfFiles.length; pfdFileIndex++) {
			const mapping = mappingClass.getFields(pfdFileIndex);
			console.log(mapping);
			const pdfFile = mappingClass.pdfFiles[pfdFileIndex];
			// get the PDF
			let pdf = null
			if (pfdFileIndex > 0) {
				pdf = await this.getPdf(pdfFile.pdfUrl);
			} else {
				pdf = await this.getPdf(pdfFile.pdfUrl, buffer);
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


			var i = 0;
			fields.forEach(field => {
				const type = field.constructor.name.trim();
				const name = field.getName().trim();
				//				console.log(`${type}: ${name}`)
				//				console.log(field);
				//	console.log("dafault appearance");
				console.log(field.acroField.getDefaultAppearance());
				const fontExp = /\/(?<font>.*?)\s/gm
				var fieldFont = fontExp.exec(field.acroField.getDefaultAppearance())?.groups?.font;
				var defApp = field.acroField.getDefaultAppearance().split(" ");
				var fieldFont = defApp[0].slice(1);
				//			console.log(fieldFont);
				//			console.log(field.acroField.DA());
				var widg = field.acroField.getWidgets()
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
			this.filledPdf.push({ file: await pdf.save(), name: pdfFile.name });

		}
		/*
		
				// get the PDF
				const pdf = await this.getPdf(mappingClass.pdfUrl, buffer);
				pdf.registerFontkit(fontkit);
		
				//manage fonts
				// Embed the Helvetica font
				// TODO remove for now untill refactored
				/*
				const helveticaFont = await pdf.embedFont(StandardFonts.Helvetica)
				const fonts = mapping.fonts;
				let customFonts = [];
				for (let i = 0; i < fonts.length; i++) {
					let fontBytes = await fetch(getRoute(fonts[i].path)).then((res) => res.arrayBuffer());
					let theFont = await pdf.embedFont(fontBytes);
					//			console.log(theFont);
					customFonts[fonts[i].id] = theFont;
				}
		
				console.log(customFonts);
				*/
		/*
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

		// manage helper functions
		// TODO export the helper functions to a file
		let functionSet = {
		}

		console.log("-----************.............-------");


		/**
		 * Fetches the system-specific functions for the current system and initializes 
		 * a SystemFunctions instance with the actor, the sheet type and the sheet.
		 * 
		 * Uses fetchInject to asynchronously load the system-specific functions file.
		 * Returns the SystemFunctions instance.
		 */
		/*
		functionSet.system = await fetchInject([
			getRoute(`/modules/sheet-export/mappings/${game.system.id}/${mappingVersion}/${mappingRelease}/system-functions.js`)
		]).then(() => {
			console.log("fetched system functions");
			return new SystemFunctions(actor, this.sheetType, this.sheet);
		})
		console.log(functionSet);
*/
		// get the replacement string for the @
		//	const atReplacementString = functionSet.system.getAtReplacement(game.release.generation);

		/**
		 * Calls the system-specific preMapping function on the fields from the mapping
		 * to allow the system to modify/preprocess the fields before rendering.
		 * 
		 * This allows each system to handle any system-specific logic for the field
		 * mappings. For example, a system may want to set default values for certain
		 * fields based on the actor data.
		 */
		//	mapping.fields = functionSet.system.preMapping(mapping.fields);

		/**
		 * Loads any helper functions defined in the mapping into the functionSet 
		 * object. This allows reusable helper functions to be defined once in the 
		 * mapping and used throughout the template.
		 * 
		 * Loops through each key/value pair in the helperFunctions mapping property, 
		 * logs the key and value, evaluates the function definition string using 
		 * eval(), and assigns the resulting function to the functionSet object under 
		 * the given key.
		 * 
		 * This provides a way to dynamically load functions into the runtime from 
		 * the mapping definition.
		*/
		/*
		let helperFunctions = mapping.helperFunctions;
		if (helperFunctions) {
			for (const [key, value] of Object.entries(helperFunctions)) {
				console.log(`${key}: ${value}`);
				functionSet[key] = eval("(" + value + ")");;
			}
		}
		*/
		/*
		console.log(functionSet);

		/**
		 * Embeds images from the mapping into the PDF.
		 * 
		 * Takes the images array from the mapping and calls this.embedImages() 
		 * to asynchronously embed each image into the PDF.
		 * 
		 * This allows images referenced in the mapping to be embedded into 
		 * the generated PDF output.
		*/
		/*
				let images = mappingClass.images;
				if (images) {
					await this.embedImages(pdf, images);
				}
		
				// manage global content
				/**
				 * Parses the globalContentMapping from the sheet mapping and evaluates each content string
				 * to generate the globalContent object.
				 * 
				 * The globalContentMapping contains template strings that can reference the actor data using @.
				 * These are replaced with actor. or actor.data. depending on the Foundry version.
				 * 
				 * The content string is then evaluated as a function to return the actual content value.
				 * 
				 * The resulting globalContent object contains the evaluated content values indexed by id.
				 */

		//let globalContentMapping = mapping.globalContent;
		//		let globalContent = {};
		/*
		if (globalContentMapping) {
			console.log("global content");
			globalContentMapping.forEach(content => {
				console.log(content);
				let replacedContent = content.content.replaceAll("@", atReplacementString);
				let contentValue = Function(`"use strict"; return function(actor,functionSet) { return ${replacedContent} };`)()(actor, functionSet);
				globalContent[content.id] = contentValue
			});
		}
		console.log(globalContent);
		*/
		// Add global content to OverloadManager
		//		functionSet.secm = new SheetExportContentManager(globalContent, functionSet);
		//	functionSet.customFonts = customFonts;
		//	functionSet.defaultFont = helveticaFont;
		// Manage the form fields
		/*
		var i = 0;
		fields.forEach(field => {
			const type = field.constructor.name.trim();
			const name = field.getName().trim();
			//		console.log(`${type}: ${name}`)
			//		console.log(field);
			//	console.log("dafault appearance");
			console.log(field.acroField.getDefaultAppearance());
			const fontExp = /\/(?<font>.*?)\s/gm
			var fieldFont = fontExp.exec(field.acroField.getDefaultAppearance())?.groups?.font;
			var defApp = field.acroField.getDefaultAppearance().split(" ");
			var fieldFont = defApp[0].slice(1);
			console.log(fieldFont);
			console.log(field.acroField.DA());
			var widg = field.acroField.getWidgets()
			console.log("widgets");
			console.log(widg);
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
			const input = document.createElement("textarea");
			input.disabled = true;
			input.setAttribute("data-idx", i);
			input.setAttribute("data-key", name);
			input.id = name;

			var fieldMapping = mapping.find(f => f.pdf === name)
			//		console.log(fieldMapping)
			//		console.log(contentMapping);
			functionSet.secm.setCurrentField(field);
			functionSet.secm.setCurrentFontsize(getDefaultFontSize(field.acroField));
			if (fieldMapping) {
				//	console.log("field mapping exists so I set font and fontsize");
				//	console.log(customFonts);
				// check if there is an overload of the font for the field
				if (fieldMapping.font) {
					//					console.log("font is overloaded");
					functionSet.secm.setCurrentFont(customFonts[fieldMapping.font])

				}
				// check if the font of the field is one of the embedded fonts
				/*
				else if (customFonts[fieldFont]) {
					//					console.log("font is embedded");
					functionSet.secm.setCurrentFont(customFonts[fieldFont]);
				}
				*/
		/*
		else {
			//					console.log("font is default helvetica");
			//		functionSet.secm.setCurrentFont(helveticaFont);
		}
		// check if the font size is overloaded
		if (fieldMapping.font_size) {
			//					console.log("font size is overloaded");
			functionSet.secm.setCurrentFontsize(fieldMapping.font_size)
		} else {
			//					console.log("font size is default");
			functionSet.secm.setCurrentFontsize(getDefaultFontSize(field.acroField));
		}
		//			console.log(fieldMapping.font);
		//			console.log(fieldMapping.font_size);
	}
	// TODO the content mapping is already done in the js class so this part is useless
	/*
	var contentMapping = fieldMapping ? fieldMapping.content.replaceAll("@", atReplacementString) : "\"\"";
	contentMapping = "{'calculated': " + contentMapping + " }";
	var mappingValue = "";
	//			console.log("the actor");
	//			console.log(actor);
	try {
		// Return as evaluated JavaScript with the actor as an argument
		mappingValue = Function(`"use strict"; return function(actor,functionSet) { return ${contentMapping} };`)()(actor, functionSet);
		//		console.log(mappingValue);
	} catch (err) {
		console.log(`${type}: ${name}`)
		console.log(err);
		console.log("The function to execute");
		console.log(contentMapping);
		console.log("The actor");
		console.log(actor);
		ui.notifications.error(`The field: ${name} is not mapped correctly using: ${contentMapping}; got error: ${err.message}`, { permanent: true });
	}
	*/
		/*
					switch (type) {
						case "PDFTextField":
							//					input.setAttribute("type", "string");
							//				console.log(mappingValue.calculated);
							input.innerHTML = fieldMapping ? fieldMapping.calculated : "";
							field.setText(fieldMapping ? (fieldMapping.calculated ? fieldMapping.calculated.toString() : "") : "");
							//					console.log(functionSet.secm.fontSize);
							/*
							if (functionSet.secm.fontSize) {
								field.setFontSize(functionSet.secm.fontSize);
							}
							//console.log(fieldMapping.font);
							//					console.log(functionSet.secm.font);
							if (functionSet.secm.font) {
								field.updateAppearances(functionSet.secm.font);
							}
							/*
							if (fieldMapping.font) {
								field.updateAppearances(functionSet.defaultFont);
							}
							*/
		/*
		field.markAsClean();
		break;
	case "PDFCheckBox":
		//			console.log(mappingValue.calculated);
		input.setAttribute("type", "checkbox");
		input.checked = fieldMapping ? fieldMapping.calculated : "";
		// before check if mappingValue is defined, than since we expect a boolean we can set the value directly
		fieldMapping ? (fieldMapping.calculated ? field.check() : field.uncheck()) : field.uncheck();
		break;
	case "PDFButton":
		//			console.log(mappingValue.calculated);
		console.log("PDFButton");
		break;
	case "PDFRadioGroup":
		//			console.log(mappingValue.calculated);
		console.log("PDFRadioGroup");
		break;

	default:
		//				console.log("nothing in switch");
		break;
}
row.appendChild(input); // Add to DOM

i++;
})
// elaborated all the fields, now we can download the pdf
//form.flatten();
this.filledPdf = await pdf.save();
*/
		document.getElementById("sheet-export-header").setAttribute("style", "display: none");
		document.getElementById("sheet-export-final").style.display = "block";
	}
}
