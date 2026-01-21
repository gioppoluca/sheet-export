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
    async createMappings() {
        super.createMappings();

        // Set the PDF files to use - MIND that the order of the files is important!
        this.pdfFiles.push({
            pdfUrl: '/modules/sheet-export/mappings/shadowdark/ShadowDark Character Sheet Fillable.pdf',
            nameDownload: `${this.actor.name ?? "character"}.pdf`,
            name: "ShadowDark Character Sheet Fillable.pdf",
        });

        this.setCalculated("Strength Total", this.actor.system.abilities.str.base);
        this.setCalculated("Strength Modifier", this.actor.system.abilities.str.mod);
        this.setCalculated("Dexterity Total", this.actor.system.abilities.dex.base);
        this.setCalculated("Dexterity Modifier", this.actor.system.abilities.dex.mod);
        this.setCalculated("Constitution Total", this.actor.system.abilities.con.base);
        this.setCalculated("Constitution Modifier", this.actor.system.abilities.con.mod);
        this.setCalculated("Intelligence Total", this.actor.system.abilities.int.base);
        this.setCalculated("Intelligence Modifier", this.actor.system.abilities.int.mod);
        this.setCalculated("Wisdom Total", this.actor.system.abilities.wis.base);
        this.setCalculated("Wisdom Modifier", this.actor.system.abilities.wis.mod);
        this.setCalculated("Charisma Total", this.actor.system.abilities.cha.base);
        this.setCalculated("Charisma Modifier", this.actor.system.abilities.cha.mod);
        //this.setCalculated("Attacks", this.actor.collections.items._source[0].name);
        this.setCalculated("Armor Class", this.actor.system.attributes.ac.value);
        this.setCalculated("Hit Points", this.actor.system.attributes.hp.max);
        this.setCalculated("Name", this.actor.name);
        this.setCalculated("Race", this.actor.system.ancestry);
        this.setCalculated("Class", this.actor.system.class);
        this.setCalculated("Level", this.actor.system.level);
        this.setCalculated("XP Current", this.actor.system.level.xp);
        //this.setCalculated("XP Target", this.actor.system.xp.target);
        this.setCalculated("Title", this.actor.system.ancestry);
        this.setCalculated("Alignment", this.actor.system.alignment);
        this.setCalculated("Background", this.actor.system.background);
        this.setCalculated("Deity", this.actor.system.deity.toString());
        this.setCalculated("Talents / Spells", this.actor.system.talentsSpells);
        this.setCalculated("Gold Pieces", this.actor.system.coins.gp);
        this.setCalculated("Silver Pieces", this.actor.system.coins.sp);
        this.setCalculated("Copper Pieces", this.actor.system.coins.cp);
        const gear = this.actor.items?._source ?? [];
        for (let i = 0; i < 20; i++) {
            this.setCalculated(`Gear ${i + 1}`, gear[i]?.name ?? "");
        }
        //this.setCalculated("Free To Carry", this.actor.system.attributes.freeToCarry);

    }
}
export default MappingClass;

