
import { PDFDocument, PDFRawStream, PDFName, StandardFonts } from './lib/pdf-lib.esm.js';
import fontkit from './lib/fontkit.es.js';
import { registerSettings } from "./settings.js";
import { getMapping, getPdf, getSheeType } from "./sheet-export-api.js";
import { SheetExportContentManager } from "./sheet-export-content-manager.js";
Hooks.once('ready', async function () {

});
/* global pdfform minipdf saveAs */

// Store mapping
Hooks.once('init', async function () {
	// TODO refactor this moving to settings
	game.settings.register(SheetExportconfig.ID, "mapping", {
		name: "sheet-export.settings.mapping.Name",
		hint: "sheet-export.settings.mapping.Hint",
		scope: "world",
		config: true,
		type: String,
		default: "[]",
	});

	game.settings.register(SheetExportconfig.ID, "mapping-npc", {
		name: "sheet-export.settings.mapping-npc.Name",
		hint: "sheet-export.settings.mapping-npc.Hint",
		scope: "world",
		config: true,
		type: String,
		default: "[]",
	});

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
	if (game.user.isGM) {
		// Create a new text box
		let editor, newTextBox;

		// Get the old text box
		const oldTextBox = html[0].querySelector("[name='sheet-export.mapping']");

		// NPC part (just duplicate the previous fields)
		let editorNPC, newTextBoxNPC;

		// Get the old text box
		const oldTextBoxNPC = html[0].querySelector("[name='sheet-export.mapping-npc']");

		// If Ace Library is enabled use an Ace Editor
		if (game.modules.get("acelib")?.active) {
			/* global ace */
			// Create an editor
			newTextBox = document.createElement("div");
			editor = ace.edit(newTextBox);

			// Set to the default options
			editor.setOptions(ace.userSettings);

			// Set to JavaScript mode
			editor.session.setMode("ace/mode/javascript");

			// Copy the value from the old textbox into the Ace Editor
			editor.setValue(oldTextBox.value);

			// After a short wait (to make sure the editor is loaded), beautify the editor contents
			setTimeout(() => editor.execCommand("beautify"), 500);

			// Hide annotations
			editor.getSession().on(
				"changeAnnotation",
				debounce(() => editor.getSession().setAnnotations(), 1)
			);
			newTextBoxNPC = document.createElement("div");
			editorNPC = ace.edit(newTextBoxNPC);

			// Set to the default options
			editorNPC.setOptions(ace.userSettings);

			// Set to JavaScript mode
			editorNPC.session.setMode("ace/mode/javascript");

			// Copy the value from the old textbox into the Ace Editor
			editorNPC.setValue(oldTextBoxNPC.value);

			// After a short wait (to make sure the editor is loaded), beautify the editor contents
			setTimeout(() => editorNPC.execCommand("beautify"), 500);

			// Hide annotations
			editorNPC.getSession().on(
				"changeAnnotation",
				debounce(() => editorNPC.getSession().setAnnotations(), 1)
			);
		} else {
			// Otherwise create new textarea
			newTextBox = document.createElement("textarea");

			// Copy the value from the old textbox into the new one
			newTextBox.value = oldTextBox.value;
			// Otherwise create new textarea NPC
			newTextBoxNPC = document.createElement("textarea");

			// Copy the value from the old textbox into the new one
			newTextBoxNPC.value = oldTextBoxNPC.value;
		}

		// Don't show the old textbox
		oldTextBox.style.display = "none";

		// Give the editor some height
		newTextBox.style.height = "20em";

		// Make the editor take up the full width
		oldTextBox.parentElement.style.flex = "100%";

		// Insert the new textbox right after the old one
		oldTextBox.after(newTextBox);

		// Don't show the old textbox NPC
		oldTextBoxNPC.style.display = "none";

		// Give the editor some height
		newTextBoxNPC.style.height = "20em";

		// Make the editor take up the full width
		oldTextBoxNPC.parentElement.style.flex = "100%";

		// Insert the new textbox right after the old one
		oldTextBoxNPC.after(newTextBoxNPC);

		if (game.modules.get("acelib")?.active) {
			// Update whenever the ace editor changes
			editor.on("change", () => {
				// Copy the value from the ace editor to the old textbox
				oldTextBox.value = editor.getValue();
			});
			editorNPC.on("change", () => {
				// Copy the value from the ace editor to the old textbox
				oldTextBoxNPC.value = editorNPC.getValue();
			});
		} else {
			// Update whenever the new textbox changes
			newTextBox.addEventListener("change", () => {
				// Copy the value from the new textbox to the old one
				oldTextBox.value = newTextBox.value;
			});
			newTextBoxNPC.addEventListener("change", () => {
				// Copy the value from the new textbox to the old one
				oldTextBoxNPC.value = newTextBoxNPC.value;
			});
		}

		// Create mapping select menu
		const mappingSelect = document.createElement("select");
		mappingSelect.style.margin = "10px 0";
		oldTextBox.parentNode.before(mappingSelect);

		// Browse and get list of included mapping files
		FilePicker.browse("data", "modules/sheet-export/mappings", { extensions: [".mapping"] }).then(results => {
			// Add the default option first
			results.files.unshift("");

			// Add options for each included mapping
			results.files.forEach(name => {
				// Create the option
				const option = document.createElement("option");
				mappingSelect.append(option);

				// Add just the name of the system as the text
				name = name.split("/").at(-1).replace(".mapping", "");
				option.innerHTML = name;
			});
		});

		// Create mapping select menu NPC
		const mappingSelectNPC = document.createElement("select");
		mappingSelectNPC.style.margin = "10px 0";
		oldTextBoxNPC.parentNode.before(mappingSelectNPC);

		// Browse and get list of included mapping files
		FilePicker.browse("data", "modules/sheet-export/mappings", { extensions: [".mapping"] }).then(results => {
			// Add the default option first
			results.files.unshift("");

			// Add options for each included mapping
			results.files.forEach(name => {
				// Create the option
				const option = document.createElement("option");
				mappingSelectNPC.append(option);

				// Add just the name of the system as the text
				name = name.split("/").at(-1).replace(".mapping", "");
				option.innerHTML = name;
			});
		});

		// Resize the Settings Config App
		app.setPosition();

		// Add an event listener
		mappingSelect.addEventListener("change", async () => {
			// Fetch selected mapping if not empty
			const mapping = mappingSelect.value
				? await fetch(getRoute(`/modules/sheet-export/mappings/${mappingSelect.value}.mapping`)).then(response =>
					response.text()
				)
				: "";

			// Copy the mapping to the old text box
			oldTextBox.value = mapping;
			if (game.modules.get("acelib")?.active) {
				// Copy the mapping to the ace editor
				editor.setValue(mapping);
			} else {
				// Copy the mapping to the new textbox
				newTextBox.value = mapping;
			}
		});
		mappingSelectNPC.addEventListener("change", async () => {
			// Fetch selected mapping if not empty
			const mapping = mappingSelectNPC.value
				? await fetch(getRoute(`/modules/sheet-export/mappings/${mappingSelectNPC.value}.mapping`)).then(response =>
					response.text()
				)
				: "";

			// Copy the mapping to the old text box
			oldTextBoxNPC.value = mapping;
			if (game.modules.get("acelib")?.active) {
				// Copy the mapping to the ace editor
				editorNPC.setValue(mapping);
			} else {
				// Copy the mapping to the new textbox
				newTextBoxNPC.value = mapping;
			}
		});
	}
});

// Add button to Actor Sheet for opening app
Hooks.on("getActorSheetHeaderButtons", (sheet, buttons) => {
	console.log("check the sheet")
	console.log(sheet)
	console.log(sheet.actor)
	// If this is not a player character sheet, return without adding the button
	// added pc for cypher system
	let sheetType = getSheeType(sheet.actor);
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
			new SheetExportconfig(sheet.actor, sheetType).render(true);

			// Bring window to top
			Object.values(ui.windows)
				.filter(window => window instanceof SheetExportconfig)[0]
				?.bringToTop();
		},
	});
});

class SheetExportconfig extends FormApplication {
	constructor(actor, sheetType) {
		super();
		this.sheetType = sheetType;
		console.log(this.sheetType);
		this.actor = actor;
		console.log(this.actor);
		this.filledPdf = new ArrayBuffer();
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
		const blob = new Blob([this.filledPdf], { type: "application/pdf" });
		saveAs(blob, `${this.actor.name ?? "character"}.pdf`);
	}

	/** Manage new PDF upload */
	onFileUpload(buffer) {
		this.currentBuffer = buffer;
		this.createForm(this.currentBuffer);
	}

	getMapping = getMapping;
	getPdf = getPdf;

	async embedImages(pdf, images) {
		//	console.log(Jimp);
		const actor = this.actor;
		for (let i = 0; i < images.length; i++) {
			let img_path = images[i].path;
			console.log(img_path);
			img_path = img_path.replaceAll("@", game.release.generation > 10 ? "actor." : "actor.data.");
			let actual_path = "";
			try {
				actual_path = Function(`"use strict"; return function(actor) { return ${img_path} };`)()(actor);

			} catch (error) {
				ui.notifications.error(`The image: ${img_path} is not mapped correctly; got error: ${error.message}`);

			}
			console.log(actual_path);
			console.log(images[i]);
			let img_ext = actual_path.split('.').pop();
			console.log(img_ext);
			const arrayBuffer = await fetch(getRoute(actual_path)).then(res => res.arrayBuffer())
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

				// Draw the JPG image in the center of the page
				page.drawImage(embedding_image, {
					x: images[i].pos_x,
					y: images[i].pos_x,
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

	async createForm(buffer) {
		console.log("create form");
		const inputForm = document.getElementById("fieldList");

		// get the mapping
		let mappingVersion = game.settings.get(SheetExportconfig.ID, "mapping-version");
		let mappingRelease = game.settings.get(SheetExportconfig.ID, "mapping-release");
		console.log(this.sheetType);
		const mapping = await this.getMapping(mappingVersion, mappingRelease, this.sheetType);
		console.log("got mapping");
		// get the PDF
		const pdf = await this.getPdf(mapping.pdfUrl, buffer);
		pdf.registerFontkit(fontkit);

		//manage fonts
		// Embed the Helvetica font
		const helveticaFont = await pdf.embedFont(StandardFonts.Helvetica)
		const fonts = mapping.fonts;
		let customFonts = [];
		for (let i = 0; i < fonts.length; i++) {
			let fontBytes = await fetch(getRoute(fonts[i].path)).then((res) => res.arrayBuffer());
			let theFont = await pdf.embedFont(fontBytes);
			customFonts[fonts[i].id] = theFont;
		}
		console.log(customFonts);
		// Fetch the Ubuntu font
		/*
const fontUrl = 'https://pdf-lib.js.org/assets/ubuntu/Ubuntu-R.ttf';
const fontBytes = await fetch(fontUrl).then((res) => res.arrayBuffer());
pdfDoc.registerFontkit(fontkit);
const ubuntuFont = await pdfDoc.embedFont(fontBytes);
*/
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
			testFunction2: function (actor) {
				console.log("test");
				console.log(actor);
			}
		}
		let helperFunctions = mapping.helperFunctions;
		if (helperFunctions) {
			for (const [key, value] of Object.entries(helperFunctions)) {
				console.log(`${key}: ${value}`);
				functionSet[key] = eval("(" + value + ")");;
			}
		}
		console.log(functionSet);
		// Manage the images
		// get the images from mapping
		let images = mapping.images;
		if (images) {
			await this.embedImages(pdf, images);
		}
		// manage global content
		let globalContentMapping = mapping.globalContent;
		let globalContent = {};
		if (globalContentMapping) {
			console.log("global content");
			globalContentMapping.forEach(content => {
				console.log(content);
				let replacedContent = content.content.replaceAll("@", game.release.generation > 10 ? "actor." : "actor.data.");
				console.log(replacedContent);
				console.log(actor);
				let contentValue = Function(`"use strict"; return function(actor,functionSet) { return ${replacedContent} };`)()(actor, functionSet);
				console.log(contentValue);
				globalContent[content.id] = contentValue
			});
		}
		console.log(globalContent);
		// Add global content to OverloadManager
		functionSet.secm = new SheetExportContentManager(globalContent, functionSet);
		functionSet.customFonts = customFonts;
		functionSet.defaultFont = helveticaFont;
		// Manage the form fields
		var i = 0;
		fields.forEach(field => {
			const type = field.constructor.name.trim();
			const name = field.getName().trim();
			console.log(`${type}: ${name}`)
			console.log(field);
			console.log("dafault appearance");
			console.log(field.acroField.getDefaultAppearance());
			console.log(field.acroField.DA());
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

			var fieldMapping = mapping.fields.find(f => f.pdf === name)
			console.log(fieldMapping)
			var contentMapping = fieldMapping ? fieldMapping.content.replaceAll("@", game.release.generation > 10 ? "actor." : "actor.data.") : "\"\"";
			contentMapping = "{'calculated': " + contentMapping + " }";
			console.log(contentMapping);
			functionSet.secm.setCurrentField(field);
			if (fieldMapping) {
				console.log("field mapping exists so I set font and fontsize");
				console.log(customFonts);
				fieldMapping.font ? functionSet.secm.setCurrentFont(customFonts[fieldMapping.font]) : functionSet.secm.setCurrentFont(helveticaFont);
				fieldMapping.font ? functionSet.secm.setCurrentFontsize(fieldMapping.font_size) : functionSet.secm.setCurrentFontsize(10);
			}
			var mappingValue = "";
			//			console.log("the actor");
			//			console.log(actor);
			try {
				// Return as evaluated JavaScript with the actor as an argument
				mappingValue = Function(`"use strict"; return function(actor,functionSet) { return ${contentMapping} };`)()(actor, functionSet);
				console.log(mappingValue);
			} catch (err) {
				console.log(err);
				ui.notifications.error(`The field: ${name} is not mapped correctly using: ${contentMapping}; got error: ${err.message}`);
			}
			switch (type) {
				case "PDFTextField":
					//					input.setAttribute("type", "string");
					console.log(mappingValue.calculated);
					input.innerHTML = mappingValue ? mappingValue.calculated : "";
					field.setText(mappingValue ? (mappingValue.calculated ? mappingValue.calculated.toString() : "") : "");
					if (fieldMapping.font) {
						field.updateAppearances(functionSet.defaultFont);
					}
					break;
				case "PDFCheckBox":
					console.log(mappingValue.calculated);
					input.setAttribute("type", "checkbox");
					input.checked = mappingValue ? mappingValue.calculated : "";
					// before check if mappingValue is defined, than since we expect a boolean we can set the value directly
					mappingValue ? (mappingValue.calculated ? field.check() : field.uncheck()) : field.uncheck();
					break;
				case "PDFCheckBox":
					console.log(mappingValue.calculated);
					console.log("PDFButton");
					break;
				case "PDFRadioGroup":
					console.log(mappingValue.calculated);
					console.log("PDFRadioGroup");
					break;

				default:
					console.log("nothing in switch");
					break;
			}
			row.appendChild(input); // Add to DOM

			i++;
		})
		// elaborated all the fields, now we can download the pdf
		this.filledPdf = await pdf.save();
		document.getElementById("sheet-export-header").setAttribute("style", "display: none");
		document.getElementById("sheet-export-final").style.display = "block";
	}
}
