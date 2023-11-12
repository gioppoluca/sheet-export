export class CustomMapping extends FormApplication {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "sheet-export-customMapping",
            title: 'Custom Mappings',
            template: "./modules/sheet-export/templates/customMapping.hbs",
            width: 600,
            closeOnSubmit: true,
            resizable: true,
            popOut: true,
            dragDrop: [{ dragSelector: ".icon", dropSelector: ".item-list" }]
        });
    }
    activateListeners(html) {
        super.activateListeners(html);
        document.getElementById("sheet-export-customMapping-upload-player-json").addEventListener("change", event => {
            const file = event.target.files[0];
            console.log(file);
            if (file.type != "application/json") {
                ui.notifications.error("Please upload a JSON file");
                return;
            }
            var blob = file.slice(0, file.size, file.type);
            var newFile = new File([blob], 'player.json', {type: file.type});
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

        document.getElementById("sheet-export-customMapping-upload-npc-json").addEventListener("change", event => {
            const file = event.target.files[0];
            console.log(file);
            if (file.type != "application/json") {
                ui.notifications.error("Please upload a JSON file");
                return;
            }
            var blob = file.slice(0, file.size, file.type);
            var newFile = new File([blob], 'npc.json', {type: file.type});
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
        console.log("saveJsonBuffer");
        console.log(file);
        let response = await FilePicker.upload("data", `modules/sheet-export/mappings/${game.system.id}/custom/latest`, file, {});
        console.log(response);
    }
}