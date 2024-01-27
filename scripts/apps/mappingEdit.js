
import { getMapping, getPdf } from "../sheet-export-api.js";


export class MappingEdit extends FormApplication {
    disabledPc = false;
    disabledNpc = false;
    static ID = "sheet-export";
    saveFile = "player";
    workingMapping = {};
    constructor(object, options = {}) {
        super(object, options);


        /*
        let stats = object?.getFlag('monks-tokenbar', 'stats') || MonksTokenBar.stats;
        options.height = 62 + (Math.max(stats.length, 4) * 27);

        this.stats = (stats || []).map(s => {
            s.id = s.id || randomID();
            return s;
        });
        //let's just grab the first player character we can find
        let player = game.actors.find(a => a.type == 'character');
        if (player) {
            let attributes = getDocumentClass("Token")?.getTrackedAttributes(player.system ?? {});
            if (attributes)
                this.attributes = attributes.value.concat(attributes.bar).map(a => a.join('.'));
        }
        */
    }

    async getData() {
        console.log("getData");
        console.log("||||||||||||MappingEdit||||||||||||||");
        var disabledPc = false;
        var disabledNpc = false;
        await FilePicker.browse("data", `modules/sheet-export/mappings/${game.system.id}/standard/latest`, { extensions: [".json"] }).then(results => {
            // Add the default option first
            console.log(results);
            console.log(results.files.filter(f => f.split("/").at(-1).replace(".json", "")));
            disabledPc = results.files.filter(f => f.split("/").at(-1).replace(".json", "") === "player")[0] ? false : true;
            console.log(results.files.filter(f => f.split("/").at(-1).replace(".json", "") === "player")[0] ? false : true);
            disabledNpc = results.files.filter(f => f.split("/").at(-1).replace(".json", "") === "npc")[0] ? false : true;
            console.log(results.files.filter(f => f.split("/").at(-1).replace(".json", "") === "npc")[0] ? false : true);
            console.log("disabledNpc:", disabledNpc);

        });
        console.log("outside");
        console.log(disabledPc);
        console.log(disabledNpc);
        return {
            "disabledPc": disabledPc,
            "disabledNpc": disabledNpc
        };
    }


    _updateObject() {
        console.log("_updateObject");
    }

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "sheet-export-mappingedit",
            title: 'Edit Mappings',
            template: "./modules/sheet-export/templates/mappingEdit.hbs",
            width: 600,
            closeOnSubmit: true,
            resizable: true,
            popOut: true,
            dragDrop: [{ dragSelector: ".icon", dropSelector: ".item-list" }]
        });
    }
    activateListeners(html) {
        super.activateListeners(html);
        document.getElementById("sheet-export-mappingedit-upload").addEventListener("change", event => {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = ev => this.onFileUpload(ev.target.result);
            reader.readAsArrayBuffer(file);
            console.log("change");
            console.log(event.target.files[0]);
            console.log(event.target.files[0].name);
            console.log(file);
        });
        //    $('input[name="generate"]', html).click(this.generateMapping.bind(this));
        $('button[name="PC"]', html).click(this.showPCmapping.bind(this));
        $('button[name="save"]', html).click(this.saveMapping.bind(this));
    }
    onFileUpload(buffer) {
        this.generateMapping(buffer);

    }
    async generateMapping(buffer) {
        console.log("generateMapping");
        const pdf = await getPdf("", buffer);
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

        let field_list = [];
        fields.forEach(field => {
            let new_field = `        this.setCalculated("${field.getName().trim()}", this.actor.SOMETHING);`
            field_list.push(new_field);
        });
        let all_mapping = field_list.join("\n");

        let new_mapping = `import baseMapping from "../../../../scripts/baseMapping.js";

class MappingClass extends baseMapping {


    authors = [
        {
            name: 'YOUR_NAME',
            url: '',
            github: '',
        },
    ];
    // override createMappings method from base class
    createMappings() {
        super.createMappings();

        // Set the PDF files to use - MIND that the order of the files is important!
        this.pdfFiles.push({
            pdfUrl: '/modules/sheet-export/mappings/${game.system.id}/YOUR_PDF_FILENAME.pdf',
            nameDownload: \`\${this.actor.name ?? "character"}.pdf\`,
            name: "YOUR_PDF_FILENAME.pdf",
        });

${all_mapping}

    }
}
export default MappingClass;

`
        console.log(new_mapping);
        const blob = new Blob([new_mapping], { type: "text/javascript;charset=utf-8" });
        saveAs(blob, "new_mapping.js");
    }

    async generateMapping_old(buffer) {
        console.log("generateMapping");
        const pdf = await getPdf("", buffer);
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
        let new_mapping = {
            "releasemin": "",
            "pdfUrl": "insert_your_pdf_url_here",
            "helperFunctions": {
                "testFunction": "function testFunction(items) {console.log(items);}"
            },
            "fonts": [
                {
                    "id": "UbuntuCondensed-Regular",
                    "path": "/modules/sheet-export/mappings/dnd5e/experimental/latest/UbuntuCondensed-Regular.ttf"
                }
            ],
            "globalContent": [
                {
                    "content": " global_content_expression",
                    "id": "global_content_id"
                }
            ],
            "images": [
                {
                    "path": "@img",
                    "page": 0,
                    "pos_x": 0,
                    "pos_y": 0,
                    "width": 100,
                    "height": 100
                }
            ],
            "fields": [
            ]
        };

        fields.forEach(field => {
            let new_field = {
                "content": " content_expression_formula_here ",
                "pdf": field.getName().trim(),
                "font": "Helvetica",
                "font_size": 9
            }
            new_mapping.fields.push(new_field);
        });
        console.log(new_mapping);
        const blob = new Blob([JSON.stringify(new_mapping, null, 2)], { type: "application/json" });
        saveAs(blob, "new_mapping.json");
    }


    async saveMapping() {
        console.log("saveMapping");
        const inputForm = document.getElementById("fieldList");
        console.log(inputForm);
        inputForm.childNodes.forEach(element => {
            console.log(element);
            console.log(element.children[1]);
            console.log(element.children[1].id);
            console.log(element.children[1].value);
            if (this.workingMapping.fields.find((el) => el.pdf == element.children[1].id) === undefined) {
                var newField = {
                    "content": "",
                    "pdf": element.children[1].id
                }
                this.workingMapping.fields.push(newField);

            }
            this.workingMapping.fields.find((el) => el.pdf == element.children[1].id).content = element.children[1].value;

        });
        console.log(this.workingMapping);
        const text = JSON.stringify(this.workingMapping, null, 2);
        const blob = new Blob([text], { type: "text/plain" });
        var newFile = new File([blob], this.saveFile + '.json', { type: "application/json" });
        let response = await FilePicker.upload("data", `modules/sheet-export/mappings/${game.system.id}/custom/latest`, newFile, {});
        console.log(response);
        /*
        const reader = new FileReader();
        reader.onload = ev => this.onFileUpload(ev.target.result);
        reader.readAsArrayBuffer(newFile);
        */
    }
    async showPCmapping() {
        console.log("showPCmapping");
        // get the mapping
        let mappingVersion = game.settings.get(MappingEdit.ID, "mapping-version");
        let mappingRelease = game.settings.get(MappingEdit.ID, "mapping-release");
        const mapping = await getMapping(mappingVersion, mappingRelease, "player");
        console.log(mapping);
        this.workingMapping = mapping;
        const pdf = await getPdf(mapping.pdfUrl);
        const form = pdf.getForm();
        const fields = form.getFields()
        const inputForm = document.getElementById("fieldList");
        this.saveFile = "player1";
        var i = 0;
        fields.forEach(field => {
            const row = document.createElement("li");
            const name = field.getName().trim();

            // Create label
            const label = document.createElement("label");
            label.innerText = `${name}: `;
            label.htmlFor = name;

            // Insert label
            row.prepend(label);
            inputForm.appendChild(row);
            const input = document.createElement("textarea");
            input.disabled = false;
            input.setAttribute("data-idx", i);
            input.setAttribute("data-key", name);
            input.id = name;
            var fieldMapping = mapping.fields.find(f => f.pdf === name)

            input.innerHTML = fieldMapping ? fieldMapping.content : "";
            row.appendChild(input); // Add to DOM

            i++;
        });
    }
}