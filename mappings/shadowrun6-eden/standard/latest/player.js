import baseMapping from "../../../../scripts/baseMapping.js";

class MappingClass extends baseMapping {


    authors = [
        {
            name: 'gioppoluca',
            url: 'https://github.com/gioppoluca',
            github: 'https://github.com/gioppoluca',
        },
    ];
    // override createMappings method from base class
    createMappings() {
        super.createMappings();

        // Set the PDF files to use - MIND that the order of the files is important!
        this.pdfFiles.push({
            pdfUrl: '/modules/sheet-export/mappings/shadowrun6-eden/SR6-Character-Sheet-Fillable.pdf',
            nameDownload: `${this.actor.name ?? "character"}.pdf`,
            name: "SR6-Character-Sheet-Fillable.pdf",
        });

        this.setCalculated("Essence", this.actor.system.attributes.essence.base);
        this.setCalculated("Agility", this.actor.system.attributes.agi.base);
    //    this.setCalculated("MagicResonance", this.actor.SOMETHING);
        this.setCalculated("Reaction", this.actor.system.attributes.rea.base);
        this.setCalculated("Initiative", this.actor.system.initiative.physical.base);
        this.setCalculated("Strength", this.actor.system.attributes.essence.base);
        this.setCalculated("Matrix Initiative", this.actor.system.initiative.matrix.base);
        this.setCalculated("Willpower", this.actor.system.attributes.wil.base);
        this.setCalculated("Astral Initiative", this.actor.system.initiative.astral.base);
        this.setCalculated("Logic", this.actor.system.attributes.log.base);
 //       this.setCalculated("Composure", this.actor.SOMETHING);
        this.setCalculated("Intuition", this.actor.system.attributes.int.base);
 //       this.setCalculated("Judge Intentions", this.actor.SOMETHING);
        this.setCalculated("Charisma", this.actor.system.attributes.cha.base);
        this.setCalculated("Memory", this.actor.system.derived.memory.base);
        this.setCalculated("Edge", this.actor.system.attributes.edg.base);
        /*
        this.setCalculated("LiftCarry", this.actor.SOMETHING);
        this.setCalculated("Unarmed", this.actor.SOMETHING);
        this.setCalculated("Movement", this.actor.SOMETHING);
        this.setCalculated("Defense Rating", this.actor.SOMETHING);
        this.setCalculated("Fake IDs  Related Lifestyles  Funds  Licenses 2", this.actor.SOMETHING);
        this.setCalculated("Fake IDs  Related Lifestyles  Funds  Licenses 3", this.actor.SOMETHING);
        */
        this.setCalculated("CHARACTER", this.actor.name);
        /*
        this.setCalculated("PLAYER", this.actor.SOMETHING);
        this.setCalculated("NOTES", this.actor.SOMETHING);
        this.setCalculated("CHARACTER_2", this.actor.SOMETHING);
        this.setCalculated("PLAYER_2", this.actor.SOMETHING);
        this.setCalculated("NOTES_2", this.actor.SOMETHING);
        this.setCalculated("Programs 2", this.actor.SOMETHING);
        this.setCalculated("Programs 3", this.actor.SOMETHING);
        this.setCalculated("Programs 4", this.actor.SOMETHING);
        this.setCalculated("Skills", this.actor.SOMETHING);
        this.setCalculated("Qualities", this.actor.SOMETHING);
        this.setCalculated("Contacts", this.actor.SOMETHING);
        this.setCalculated("Name/Primary Alias", this.actor.SOMETHING);
        this.setCalculated("Ethnicity", this.actor.SOMETHING);
        this.setCalculated("Metatype", this.actor.SOMETHING);
        this.setCalculated("Age", this.actor.SOMETHING);
        this.setCalculated("Weight", this.actor.SOMETHING);
        this.setCalculated("Reputation", this.actor.SOMETHING);
        this.setCalculated("Sex", this.actor.SOMETHING);
        this.setCalculated("Heat", this.actor.SOMETHING);
        this.setCalculated("Karma", this.actor.SOMETHING);
        this.setCalculated("Total Karma", this.actor.SOMETHING);
        this.setCalculated("Misc", this.actor.SOMETHING);
        this.setCalculated("Primary Armor", this.actor.SOMETHING);
        this.setCalculated("Rating", this.actor.SOMETHING);
        this.setCalculated("Primary Melee Weapon", this.actor.SOMETHING);
        this.setCalculated("Primary Ranged Weapon", this.actor.SOMETHING);
        this.setCalculated("Stats", this.actor.SOMETHING);
        this.setCalculated("Gear", this.actor.SOMETHING);
        this.setCalculated("Augmentations", this.actor.SOMETHING);
        this.setCalculated("Spells/Preparations/Rituals/Complex Forms", this.actor.SOMETHING);
        this.setCalculated("Adept Powers or Other Abilities", this.actor.SOMETHING);
        this.setCalculated("Ranged Weapons", this.actor.SOMETHING);
        this.setCalculated("Melee Weapons", this.actor.SOMETHING);
        this.setCalculated("Attack", this.actor.SOMETHING);
        this.setCalculated("Sleaze", this.actor.SOMETHING);
        this.setCalculated("Data Proc", this.actor.SOMETHING);
        this.setCalculated("Firewall", this.actor.SOMETHING);
        this.setCalculated("Programs 1", this.actor.SOMETHING);
        this.setCalculated("Devices/DR", this.actor.SOMETHING);
        this.setCalculated("Notes", this.actor.SOMETHING);
        this.setCalculated("Check Box11", this.actor.SOMETHING);
        this.setCalculated("Check Box12", this.actor.SOMETHING);
        this.setCalculated("Check Box13", this.actor.SOMETHING);
        this.setCalculated("Check Box14", this.actor.SOMETHING);
        this.setCalculated("Check Box15", this.actor.SOMETHING);
        this.setCalculated("Check Box16", this.actor.SOMETHING);
        this.setCalculated("Check Box17", this.actor.SOMETHING);
        this.setCalculated("Check Box18", this.actor.SOMETHING);
        this.setCalculated("Check Box19", this.actor.SOMETHING);
        this.setCalculated("Check Box20", this.actor.SOMETHING);
        this.setCalculated("Check Box21", this.actor.SOMETHING);
        this.setCalculated("Check Box22", this.actor.SOMETHING);
        this.setCalculated("Check Box23", this.actor.SOMETHING);
        this.setCalculated("Check Box24", this.actor.SOMETHING);
        this.setCalculated("Check Box25", this.actor.SOMETHING);
        this.setCalculated("Check Box26", this.actor.SOMETHING);
        this.setCalculated("Check Box27", this.actor.SOMETHING);
        this.setCalculated("Check Box28", this.actor.SOMETHING);
        this.setCalculated("Check Box29", this.actor.SOMETHING);
        this.setCalculated("Check Box30", this.actor.SOMETHING);
        this.setCalculated("Check Box31", this.actor.SOMETHING);
        this.setCalculated("Check Box32", this.actor.SOMETHING);
        this.setCalculated("Check Box33", this.actor.SOMETHING);
        this.setCalculated("Check Box34", this.actor.SOMETHING);
        this.setCalculated("Check Box35", this.actor.SOMETHING);
        this.setCalculated("Check Box36", this.actor.SOMETHING);
        this.setCalculated("Check Box37", this.actor.SOMETHING);
        this.setCalculated("Check Box38", this.actor.SOMETHING);
        this.setCalculated("Check Box39", this.actor.SOMETHING);
        this.setCalculated("Check Box40", this.actor.SOMETHING);
        this.setCalculated("Fake IDs  Related Lifestyles  Funds  Licenses 1", this.actor.SOMETHING);
        this.setCalculated("Primary Lifestyle", this.actor.SOMETHING);
        this.setCalculated("Nuyen", this.actor.SOMETHING);
        this.setCalculated("Licenses", this.actor.SOMETHING);
        this.setCalculated("Check Box1.0.0", this.actor.SOMETHING);
        this.setCalculated("Check Box1.0.1.2", this.actor.SOMETHING);
        this.setCalculated("Check Box1.0.1.3", this.actor.SOMETHING);
        this.setCalculated("Check Box1.0.1.4", this.actor.SOMETHING);
        this.setCalculated("Check Box1.0.1.5", this.actor.SOMETHING);
        this.setCalculated("Check Box1.0.1.0", this.actor.SOMETHING);
        this.setCalculated("Check Box1.0.1.1", this.actor.SOMETHING);
        this.setCalculated("Check Box1.0.1.6.0.0", this.actor.SOMETHING);
        this.setCalculated("Check Box2.0", this.actor.SOMETHING);
        this.setCalculated("Check Box2.1", this.actor.SOMETHING);
        this.setCalculated("Check Box2.2", this.actor.SOMETHING);
        this.setCalculated("Check Box2.3", this.actor.SOMETHING);
        this.setCalculated("Check Box2.4", this.actor.SOMETHING);
        this.setCalculated("Check Box2.5", this.actor.SOMETHING);
        this.setCalculated("Check Box2.6", this.actor.SOMETHING);
        this.setCalculated("Check Box2.7", this.actor.SOMETHING);
        this.setCalculated("Check Box2.8", this.actor.SOMETHING);
        this.setCalculated("Check Box2.9", this.actor.SOMETHING);
        this.setCalculated("Check Box2.10", this.actor.SOMETHING);
        this.setCalculated("Check Box2.11", this.actor.SOMETHING);
        this.setCalculated("Acceleration.0.0", this.actor.SOMETHING);
        this.setCalculated("Speed Interval", this.actor.SOMETHING);
        this.setCalculated("Top Speed", this.actor.SOMETHING);
        */
        this.setCalculated("Body", this.actor.system.attributes.bod.base);
        /*
        this.setCalculated("Armor", this.actor.SOMETHING);
        this.setCalculated("Pilot", this.actor.SOMETHING);
        this.setCalculated("Sensor", this.actor.SOMETHING);
        this.setCalculated("Seats", this.actor.SOMETHING);
        this.setCalculated("Vehicle", this.actor.SOMETHING);
        this.setCalculated("Handling", this.actor.SOMETHING);
*/
    }
}

export default MappingClass;
