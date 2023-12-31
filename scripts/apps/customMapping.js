import { PDFDocument } from '../lib/pdf-lib.esm.js';
import fontkit from '../lib/fontkit.es.js';


export class CustomMapping extends FormApplication {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "sheet-export-customMapping",
            title: 'Custom Mappings',
            template: "./modules/sheet-export/templates/customMapping.hbs",
            width: 650,
            closeOnSubmit: true,
            resizable: true,
            popOut: true,
            dragDrop: [{ dragSelector: ".icon", dropSelector: ".item-list" }]
        });
    }
    activateListeners(html) {
        super.activateListeners(html);
        document.getElementById("sheet-export-customMapping-upload-player-js").addEventListener("change", event => {
            const file = event.target.files[0];
            console.log(file);
            if ((file.type != "text/javascript") && (file.type != "application/x-javascript")) {
                ui.notifications.error("Please upload a JS file");
                return;
            }
            var blob = file.slice(0, file.size, "text/javascript");
            var newFile = new File([blob], 'player.js', { type: "text/javascript" });
            this.saveFile(newFile);
        });

        document.getElementById("sheet-export-customMapping-upload-player-pdf").addEventListener("change", event => {
            const file = event.target.files[0];
            console.log(file);
            if (file.type != "application/pdf") {
                ui.notifications.error("Please upload a PDF file");
                return;
            }
            this.saveFile(file);
        });

        document.getElementById("sheet-export-customMapping-upload-npc-js").addEventListener("change", event => {
            const file = event.target.files[0];
            console.log(file);
            if ((file.type != "text/javascript") && (file.type != "application/x-javascript")) {
                ui.notifications.error("Please upload a JS file");
                return;
            }
            var blob = file.slice(0, file.size, file.type);
            var newFile = new File([blob], 'npc.js', { type: file.type });
            this.saveFile(newFile);
        });

        document.getElementById("sheet-export-customMapping-upload-npc-pdf").addEventListener("change", event => {
            const file = event.target.files[0];
            console.log(file);
            if (file.type != "application/pdf") {
                ui.notifications.error("Please upload a PDF file");
                return;
            }
            this.saveFile(file);
        });
    }
    /*
        async saveJsonBuffer(file, type) {
            console.log("saveJsonBuffer");
            console.log(file);
            console.log(type);
            let response = await FilePicker.upload("data", "modules/sheet-export/mappings/dnd5e/custom/latest", file, {});
            console.log(response);
        }
    */
    async saveFile(file) {
        console.log("saveJsBuffer");
        console.log(file);
        let response = await FilePicker.upload("data", `modules/sheet-export/mappings/${game.system.id}/custom/latest`, file, {});
        console.log(response);
        const reader = new FileReader();
//        reader.onload = ev => this.onFileUpload(ev.target.result);
//        reader.readAsArrayBuffer(file);
    }

    async onFileUpload(buffer) {
        console.log("onFileUpload");
        console.log(buffer);
        const pdfDoc = await PDFDocument.load(buffer);
        pdfDoc.registerFontkit(fontkit);
        var form = pdfDoc.getForm();
        console.log(form);
        var fields = form.getFields()
        console.log(fields);
        var info = pdfDoc.getInfoDict();
        console.log(info);
        console.log(pdfDoc);
        console.log(pdfDoc.fonts);
    }
}