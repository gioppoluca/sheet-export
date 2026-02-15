import baseMapping from "../../../../scripts/baseMapping.js";

class MappingClass extends baseMapping {


    authors = [
        {
            name: 'YOUR_NAME',
            url: '',
            github: '',
        },
    ];
    // override createMappings method from base class
    async createMappings() {
        super.createMappings();

        // Set the PDF files to use - MIND that the order of the files is important!
        this.pdfFiles.push({
            pdfUrl: '/modules/sheet-export/mappings/dragonbane/YOUR_PDF_FILENAME.pdf',
            nameDownload: `${this.actor.name ?? "character"}.pdf`,
            name: "YOUR_PDF_FILENAME.pdf",
        });



    }
}
export default MappingClass;

