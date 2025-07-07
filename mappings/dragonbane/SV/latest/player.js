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
            pdfUrl: '/modules/sheet-export/mappings/dragonbane/dragonbane_sv.pdf',
            nameDownload: `${this.actor.name ?? "character"}.pdf`,
            name: "dragonbane_sv.pdf",
        });

        this.setCalculated("Utseende", this.actor.system.attributes.str.value);
        this.setCalculated("Alder", this.actor.SOMETHING);
        this.setCalculated("Yrke", this.actor.SOMETHING);
        this.setCalculated("FYS", this.actor.system.attributes.con.value);
        this.setCalculated("SMI", this.actor.system.attributes.agl.value);
        this.setCalculated("INT", this.actor.system.attributes.int.value);
        this.setCalculated("PSY", this.actor.system.attributes.wil.value);
        this.setCalculated("KAR", this.actor.system.attributes.cha.value);
        this.setCalculated("Skadebonus STY", this.actor.SOMETHING);
        this.setCalculated("Skadebonus SMI", this.actor.SOMETHING);
        this.setCalculated("Forflyttning", this.actor.SOMETHING);
        this.setCalculated("Formagor och Besvarjelser 1", this.actor.SOMETHING);
        this.setCalculated("Formagor och Besvarjelser 2", this.actor.SOMETHING);
        this.setCalculated("Formagor och Besvarjelser 6", this.actor.SOMETHING);
        this.setCalculated("Formagor och Besvarjelser 4", this.actor.SOMETHING);
        this.setCalculated("Formagor och Besvarjelser 3", this.actor.SOMETHING);
        this.setCalculated("Formagor och Besvarjelser 5", this.actor.SOMETHING);
        this.setCalculated("Formagor och Besvarjelser 7", this.actor.SOMETHING);
        this.setCalculated("Formagor och Besvarjelser 8", this.actor.SOMETHING);
        this.setCalculated("Formagor och Besvarjelser 9", this.actor.SOMETHING);
        this.setCalculated("Formagor och Besvarjelser 10", this.actor.SOMETHING);
        this.setCalculated("Formagor och Besvarjelser 11", this.actor.SOMETHING);
        this.setCalculated("Formagor och Besvarjelser 12", this.actor.SOMETHING);
        this.setCalculated("Formagor och Besvarjelser 13", this.actor.SOMETHING);
        this.setCalculated("Formagor och Besvarjelser 14", this.actor.SOMETHING);
        this.setCalculated("Formagor och Besvarjelser 15", this.actor.SOMETHING);
        this.setCalculated("Barformaga", this.actor.SOMETHING);
        this.setCalculated("Sekundar Fardighet 2", this.actor.SOMETHING);
        this.setCalculated("Sekundar Fardighet 1", this.actor.SOMETHING);
        this.setCalculated("Sekundar Fardighet 3", this.actor.SOMETHING);
        this.setCalculated("Sekundar Fardighet 4", this.actor.SOMETHING);
        this.setCalculated("Sekundar Fardighet 5", this.actor.SOMETHING);
        this.setCalculated("Sekundar Fardighet 6", this.actor.SOMETHING);
        this.setCalculated("Sekundar Fardighet 7", this.actor.SOMETHING);
        this.setCalculated("Packning 2", this.actor.SOMETHING);
        this.setCalculated("Packning 1", this.actor.SOMETHING);
        this.setCalculated("Packning 4", this.actor.SOMETHING);
        this.setCalculated("Packning 3", this.actor.SOMETHING);
        this.setCalculated("Packning 5", this.actor.SOMETHING);
        this.setCalculated("Packning 6", this.actor.SOMETHING);
        this.setCalculated("Packning 7", this.actor.SOMETHING);
        this.setCalculated("Packning 8", this.actor.SOMETHING);
        this.setCalculated("Packning 9", this.actor.SOMETHING);
        this.setCalculated("Packning 10", this.actor.SOMETHING);
        this.setCalculated("Minnessak 1", this.actor.SOMETHING);
        this.setCalculated("Minnessak 2", this.actor.SOMETHING);
        this.setCalculated("Smasaker", this.actor.SOMETHING);
        this.setCalculated("Viljepoang", this.actor.SOMETHING);
        this.setCalculated("Kroppspoang", this.actor.SOMETHING);
        this.setCalculated("Guldmynt", this.actor.SOMETHING);
        this.setCalculated("Silvermynt", this.actor.SOMETHING);
        this.setCalculated("Kopparmynt", this.actor.SOMETHING);
        this.setCalculated("Rustning Huvud", this.actor.SOMETHING);
        this.setCalculated("Skyddsvarde Huvud", this.actor.SOMETHING);
        this.setCalculated("Vapen 1", this.actor.SOMETHING);
        this.setCalculated("Vapen 2", this.actor.SOMETHING);
        this.setCalculated("Vapen 3", this.actor.SOMETHING);
        this.setCalculated("Vapen 1_2", this.actor.SOMETHING);
        this.setCalculated("VapenGrepp 1", this.actor.SOMETHING);
        this.setCalculated("VapenGrepp 2", this.actor.SOMETHING);
        this.setCalculated("VapenGrepp 3", this.actor.SOMETHING);
        this.setCalculated("VapenRackvidd 2", this.actor.SOMETHING);
        this.setCalculated("VapenRackvidd 1", this.actor.SOMETHING);
        this.setCalculated("VapenSkada 1", this.actor.SOMETHING);
        this.setCalculated("VapenSkada 2", this.actor.SOMETHING);
        this.setCalculated("VapenSkada 3", this.actor.SOMETHING);
        this.setCalculated("VapenRackvidd 3", this.actor.SOMETHING);
        this.setCalculated("VapenBV 1", this.actor.SOMETHING);
        this.setCalculated("VapenBV 2", this.actor.SOMETHING);
        this.setCalculated("VapenBrytvarde 3", this.actor.SOMETHING);
        this.setCalculated("VapenEgenskaper 1", this.actor.SOMETHING);
        this.setCalculated("VapenEgenskaper 2", this.actor.SOMETHING);
        this.setCalculated("VapenEgenskaper 3", this.actor.SOMETHING);
        this.setCalculated("Bluffa", this.actor.SOMETHING);
        this.setCalculated("Fingerfardighet", this.actor.SOMETHING);
        this.setCalculated("Finna Dolda Ting", this.actor.SOMETHING);
        this.setCalculated("Frammande Sprak", this.actor.SOMETHING);
        this.setCalculated("Hantverk", this.actor.SOMETHING);
        this.setCalculated("Hoppa och Klattra", this.actor.SOMETHING);
        this.setCalculated("Jakt och Fiske", this.actor.SOMETHING);
        this.setCalculated("Kopsla", this.actor.SOMETHING);
        this.setCalculated("Lakekonst", this.actor.SOMETHING);
        this.setCalculated("Myter och Legender", this.actor.SOMETHING);
        this.setCalculated("Rida", this.actor.SOMETHING);
        this.setCalculated("Simma", this.actor.SOMETHING);
        this.setCalculated("Sjokunnighet", this.actor.SOMETHING);
        this.setCalculated("Smyga", this.actor.SOMETHING);
        this.setCalculated("Undvika", this.actor.SOMETHING);
        this.setCalculated("Upptrada", this.actor.SOMETHING);
        this.setCalculated("Upptacka Fara", this.actor.SOMETHING);
        this.setCalculated("Vildmarksvana", this.actor.SOMETHING);
        this.setCalculated("Overtala", this.actor.SOMETHING);
        this.setCalculated("Armborst", this.actor.SOMETHING);
        this.setCalculated("Hammare", this.actor.SOMETHING);
        this.setCalculated("Kniv", this.actor.SOMETHING);
        this.setCalculated("Pilbage", this.actor.SOMETHING);
        this.setCalculated("Slagsmal", this.actor.SOMETHING);
        this.setCalculated("Slunga", this.actor.SOMETHING);
        this.setCalculated("Spjut", this.actor.SOMETHING);
        this.setCalculated("Stav", this.actor.SOMETHING);
        this.setCalculated("Svard", this.actor.SOMETHING);
        this.setCalculated("Yxa", this.actor.SOMETHING);
        this.setCalculated("Sekundar Fardighet Varde 1", this.actor.SOMETHING);
        this.setCalculated("Sekundar Fardighet Varde 2", this.actor.SOMETHING);
        this.setCalculated("Sekundar Fardighet Varde 3", this.actor.SOMETHING);
        this.setCalculated("Sekundar Fardighet Varde 4", this.actor.SOMETHING);
        this.setCalculated("Sekundar Fardighet Varde 5", this.actor.SOMETHING);
        this.setCalculated("Sekundar Fardighet Varde 6", this.actor.SOMETHING);
        this.setCalculated("Sekundar Fardighet Varde 7", this.actor.SOMETHING);
        this.setCalculated("Packning Antal 1", this.actor.SOMETHING);
        this.setCalculated("Packning Vikt 1", this.actor.SOMETHING);
        this.setCalculated("Nackdel Huvud", this.actor.SOMETHING);
        this.setCalculated("Packning Antal 2", this.actor.SOMETHING);
        this.setCalculated("Packning Vikt 2", this.actor.SOMETHING);
        this.setCalculated("Packning Antal 3", this.actor.SOMETHING);
        this.setCalculated("Packning Vikt 3", this.actor.SOMETHING);
        this.setCalculated("Packning Antal 4", this.actor.SOMETHING);
        this.setCalculated("Packning Vikt 4", this.actor.SOMETHING);
        this.setCalculated("Packning Antal 5", this.actor.SOMETHING);
        this.setCalculated("Packning Vikt 5", this.actor.SOMETHING);
        this.setCalculated("Packning Antal 6", this.actor.SOMETHING);
        this.setCalculated("Packning Vikt 6", this.actor.SOMETHING);
        this.setCalculated("Packning Antal 7", this.actor.SOMETHING);
        this.setCalculated("Packning Vikt 7", this.actor.SOMETHING);
        this.setCalculated("Packning Antal 8", this.actor.SOMETHING);
        this.setCalculated("Packning Vikt 8", this.actor.SOMETHING);
        this.setCalculated("Packning Antal 9", this.actor.SOMETHING);
        this.setCalculated("Packning Vikt 9", this.actor.SOMETHING);
        this.setCalculated("Packning Antal 10", this.actor.SOMETHING);
        this.setCalculated("Packning Vikt 10", this.actor.SOMETHING);
        this.setCalculated("Svaghet", this.actor.SOMETHING);
        this.setCalculated("STY", this.actor.SOMETHING);
        this.setCalculated("Slakte", this.actor.SOMETHING);
        this.setCalculated("Bestiologi", this.actor.SOMETHING);
        this.setCalculated("Namn", this.actor.SOMETHING);
        this.setCalculated("Spelare", this.actor.SOMETHING);
        this.setCalculated("Rustning B#C3#A5l", this.actor.SOMETHING);
        this.setCalculated("Rustning Armar", this.actor.SOMETHING);
        this.setCalculated("Rustning Ben", this.actor.SOMETHING);
        this.setCalculated("Skyddsvarde B#C3#A5l", this.actor.SOMETHING);
        this.setCalculated("Skyddsvarde Armar", this.actor.SOMETHING);
        this.setCalculated("Skyddsvarde Ben", this.actor.SOMETHING);
        this.setCalculated("Nackdel B#C3#A5l", this.actor.SOMETHING);
        this.setCalculated("Nackdel Armar", this.actor.SOMETHING);
        this.setCalculated("Nackdel Ben", this.actor.SOMETHING);
        this.setCalculated("Skador", this.actor.SOMETHING);

    }
}
export default MappingClass;

