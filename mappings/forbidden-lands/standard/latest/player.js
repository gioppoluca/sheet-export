import baseMapping from "../../../../scripts/baseMapping.js";

class MappingClass extends baseMapping {


    authors = [
        {
            name: 'Alexk',
            url: '',
            github: '',
        },
    ];
    // override createMappings method from base class
    createMappings() {
        super.createMappings();

        // Set the PDF files to use - MIND that the order of the files is important!
        this.pdfFiles.push({
            pdfUrl: '/modules/sheet-export/mappings/forbidden-lands/forbiden-lands.pdf',
            nameDownload: `${this.actor.name ?? "character"}.pdf`,
            name: "forbiden-lands.pdf",
        });

        this.setCalculated("Wits", this.actor.system.attribute.wits.value);
        this.setCalculated("Empathy", this.actor.system.attribute.empathy.value);
        this.setCalculated("Name", this.actor.name);
        this.setCalculated("Kin", this.actor.system.bio.kin.value);
        this.setCalculated("Profession", this.actor.system.bio.profession.value);
        this.setCalculated("Pride", this.actor.system.bio.pride.value.replaceAll(/<[^>]*>/g, "").trim());
        this.setCalculated("Dark_Secret", this.actor.system.bio.darkSecret.value.replaceAll(/<[^>]*>/g, "").trim());
        this.setCalculated("Age", this.actor.system.bio.age.value);
        this.setCalculated("Reputation", this.actor.system.bio.reputation.value);
        this.setCalculated("Agility", this.actor.system.attribute.agility.value);
        this.setCalculated("Strength", this.actor.system.attribute.strength.value);

    }
}
export default MappingClass;

