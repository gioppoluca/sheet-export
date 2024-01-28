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
            pdfUrl: '/modules/sheet-export/mappings/swade/SWADE_Character_Sheet.pdf',
            nameDownload: `${this.actor.name ?? "character"}.pdf`,
            name: "SWADE_Character_Sheet.pdf",
        });

        this.setCalculated("Name", this.actor.name);
        this.setCalculated("Race", this.actor.system.details.species.name);
        this.setCalculated("Bennies", this.actor.system.bennies.max);
        this.setCalculated("Agility Die", "d" + this.actor.system.attributes.agility.die.sides);
        this.setCalculated("Agility Mod", this.actor.system.attributes.agility.die.modifier);
        this.setCalculated("Smarts Die", "d" + this.actor.system.attributes.smarts.die.sides);
        this.setCalculated("Smarts Mod", this.actor.system.attributes.smarts.die.modifier);
        this.setCalculated("Spirit Die", "d" + this.actor.system.attributes.spirit.die.sides);
        this.setCalculated("Spirit Mod", this.actor.system.attributes.spirit.die.modifier);
        this.setCalculated("Strength Die", "d" + this.actor.system.attributes.strength.die.sides);
        this.setCalculated("Strength Mod", this.actor.system.attributes.strength.die.modifier);
        this.setCalculated("Vigor Die", "d" + this.actor.system.attributes.vigor.die.sides);
        this.setCalculated("Vigor Mod", this.actor.system.attributes.vigor.die.modifier);
        this.setCalculated("Pace", this.actor.system.stats.speed.adjusted);
        this.setCalculated("Parry", this.actor.system.stats.parry.value);
        this.setCalculated("Toughness", this.actor.system.stats.toughness.value + "(" + this.actor.system.stats.toughness.armor + ")");
        this.setCalculated("Skills 1", this.actor.items.filter(item => item.type === "skill")[0]?.name ?? '');
        this.setCalculated("Skills 2", this.actor.items.filter(item => item.type === "skill")[1]?.name ?? '');
        this.setCalculated("Skills 3", this.actor.items.filter(item => item.type === "skill")[2]?.name ?? '');
        this.setCalculated("Skills 4", this.actor.items.filter(item => item.type === "skill")[3]?.name ?? '');
        this.setCalculated("Skills 5", this.actor.items.filter(item => item.type === "skill")[4]?.name ?? '');
        this.setCalculated("Skills 6", this.actor.items.filter(item => item.type === "skill")[5]?.name ?? '');
        this.setCalculated("Skills 7", this.actor.items.filter(item => item.type === "skill")[6]?.name ?? '');
        this.setCalculated("Skills 8", this.actor.items.filter(item => item.type === "skill")[7]?.name ?? '');
        this.setCalculated("Skills 9", this.actor.items.filter(item => item.type === "skill")[8]?.name ?? '');
        this.setCalculated("Skills 10", this.actor.items.filter(item => item.type === "skill")[9]?.name ?? '');
        this.setCalculated("Skills 11", this.actor.items.filter(item => item.type === "skill")[10]?.name ?? '');
        this.setCalculated("Skills 12", this.actor.items.filter(item => item.type === "skill")[11]?.name ?? '');
        this.setCalculated("Skills 13", this.actor.items.filter(item => item.type === "skill")[12]?.name ?? '');
        this.setCalculated("Skills 14", this.actor.items.filter(item => item.type === "skill")[13]?.name ?? '');
        this.setCalculated("Skills 15", this.actor.items.filter(item => item.type === "skill")[14]?.name ?? '');
        this.setCalculated("Skills 16", this.actor.items.filter(item => item.type === "skill")[15]?.name ?? '');
        this.setCalculated("Skills 17", this.actor.items.filter(item => item.type === "skill")[16]?.name ?? '');
        this.setCalculated("Skills 18", this.actor.items.filter(item => item.type === "skill")[17]?.name ?? '');
        this.setCalculated("Skills 19", this.actor.items.filter(item => item.type === "skill")[18]?.name ?? '');
        this.setCalculated("Skills 20", this.actor.items.filter(item => item.type === "skill")[19]?.name ?? '');
        console.log(this.actor.items.filter(item => item.type === "skill"))
        this.setCalculated("Skills 1 Die", ("d" + this.actor.items.filter(item => item.type === "skill")[0]?.system.die.sides) ?? '');
        this.setCalculated("Skills 2 Die", ("d" + this.actor.items.filter(item => item.type === "skill")[1]?.system.die.sides) ?? '');
        this.setCalculated("Skills 3 Die", ("d" + this.actor.items.filter(item => item.type === "skill")[2]?.system.die.sides) ?? '');
        this.setCalculated("Skills 4 Die", ("d" + this.actor.items.filter(item => item.type === "skill")[3]?.system.die.sides) ?? '');
        this.setCalculated("Skills 5 Die", ("d" + this.actor.items.filter(item => item.type === "skill")[4]?.system.die.sides) ?? '');
        this.setCalculated("Skills 6 Die", ("d" + this.actor.items.filter(item => item.type === "skill")[5]?.system.die.sides) ?? '');
        this.setCalculated("Skills 7 Die", ("d" + this.actor.items.filter(item => item.type === "skill")[6]?.system.die.sides) ?? '');
        this.setCalculated("Skills 8 Die", ("d" + this.actor.items.filter(item => item.type === "skill")[7]?.system.die.sides) ?? '');
        this.setCalculated("Skills 9 Die", ("d" + this.actor.items.filter(item => item.type === "skill")[8]?.system.die.sides) ?? '');
        this.setCalculated("Skills 10 Die", ("d" + this.actor.items.filter(item => item.type === "skill")[9]?.system.die.sides) ?? '');
        this.setCalculated("Skills 11 Die", ("d" + this.actor.items.filter(item => item.type === "skill")[10]?.system.die.sides) ?? '');
        this.setCalculated("Skills 12 Die", ("d" + this.actor.items.filter(item => item.type === "skill")[11]?.system.die.sides) ?? '');
        this.setCalculated("Skills 13 Die", ("d" + this.actor.items.filter(item => item.type === "skill")[12]?.system.die.sides) ?? '');
        this.setCalculated("Skills 14 Die", ("d" + this.actor.items.filter(item => item.type === "skill")[13]?.system.die.sides) ?? '');
        this.setCalculated("Skills 15 Die", ("d" + this.actor.items.filter(item => item.type === "skill")[14]?.system.die.sides) ?? '');
        this.setCalculated("Skills 16 Die", ("d" + this.actor.items.filter(item => item.type === "skill")[15]?.system.die.sides) ?? '');
        this.setCalculated("Skills 17 Die", ("d" + this.actor.items.filter(item => item.type === "skill")[16]?.system.die.sides) ?? '');
        this.setCalculated("Skills 18 Die", ("d" + this.actor.items.filter(item => item.type === "skill")[17]?.system.die.sides) ?? '');
        this.setCalculated("Skills 19 Die", ("d" + this.actor.items.filter(item => item.type === "skill")[18]?.system.die.sides) ?? '');
        this.setCalculated("Skills 20 Die", ("d" + this.actor.items.filter(item => item.type === "skill")[19]?.system.die.sides) ?? '');
        this.setCalculated("Skills 1 Mod", this.actor.items.filter(item => item.type === "skill")[0]?.system.die.modifier ?? '');
        this.setCalculated("Skills 2 Mod", this.actor.items.filter(item => item.type === "skill")[1]?.system.die.modifier ?? '');
        this.setCalculated("Skills 3 Mod", this.actor.items.filter(item => item.type === "skill")[2]?.system.die.modifier ?? '');
        this.setCalculated("Skills 4 Mod", this.actor.items.filter(item => item.type === "skill")[3]?.system.die.modifier ?? '');
        this.setCalculated("Skills 5 Mod", this.actor.items.filter(item => item.type === "skill")[4]?.system.die.modifier ?? '');
        this.setCalculated("Skills 6 Mod", this.actor.items.filter(item => item.type === "skill")[5]?.system.die.modifier ?? '');
        this.setCalculated("Skills 7 Mod", this.actor.items.filter(item => item.type === "skill")[6]?.system.die.modifier ?? '');
        this.setCalculated("Skills 8 Mod", this.actor.items.filter(item => item.type === "skill")[7]?.system.die.modifier ?? '');
        this.setCalculated("Skills 9 Mod", this.actor.items.filter(item => item.type === "skill")[8]?.system.die.modifier ?? '');
        this.setCalculated("Skills 10 Mod", this.actor.items.filter(item => item.type === "skill")[9]?.system.die.modifier ?? '');
        this.setCalculated("Skills 11 Mod", this.actor.items.filter(item => item.type === "skill")[10]?.system.die.modifier ?? '');
        this.setCalculated("Skills 12 Mod", this.actor.items.filter(item => item.type === "skill")[11]?.system.die.modifier ?? '');
        this.setCalculated("Skills 13 Mod", this.actor.items.filter(item => item.type === "skill")[12]?.system.die.modifier ?? '');
        this.setCalculated("Skills 14 Mod", this.actor.items.filter(item => item.type === "skill")[13]?.system.die.modifier ?? '');
        this.setCalculated("Skills 15 Mod", this.actor.items.filter(item => item.type === "skill")[14]?.system.die.modifier ?? '');
        this.setCalculated("Skills 16 Mod", this.actor.items.filter(item => item.type === "skill")[15]?.system.die.modifier ?? '');
        this.setCalculated("Skills 17 Mod", this.actor.items.filter(item => item.type === "skill")[16]?.system.die.modifier ?? '');
        this.setCalculated("Skills 18 Mod", this.actor.items.filter(item => item.type === "skill")[17]?.system.die.modifier ?? '');
        this.setCalculated("Skills 19 Mod", this.actor.items.filter(item => item.type === "skill")[18]?.system.die.modifier ?? '');
        this.setCalculated("Skills 20 Mod", this.actor.items.filter(item => item.type === "skill")[19]?.system.die.modifier ?? '');
        this.setCalculated("Hindrances 1", this.actor.items.filter(item => item.type === "hindrance")[0]?.name ?? '');
        this.setCalculated("Hindrances 2", this.actor.items.filter(item => item.type === "hindrance")[1]?.name ?? '');
        this.setCalculated("Hindrances 3", this.actor.items.filter(item => item.type === "hindrance")[2]?.name ?? '');
        this.setCalculated("Hindrances 4", this.actor.items.filter(item => item.type === "hindrance")[3]?.name ?? '');
        this.setCalculated("Edges & Advancements 1", this.actor.items.filter(item => item.type === "edge")[0]?.name ?? '');
        this.setCalculated("Edges & Advancements 2", this.actor.items.filter(item => item.type === "edge")[1]?.name ?? '');
        this.setCalculated("Edges & Advancements 3", this.actor.items.filter(item => item.type === "edge")[2]?.name ?? '');
        this.setCalculated("Edges & Advancements 4", this.actor.items.filter(item => item.type === "edge")[3]?.name ?? '');
        this.setCalculated("Edges & Advancements 5", this.actor.items.filter(item => item.type === "edge")[4]?.name ?? '');
        this.setCalculated("Edges & Advancements 6", this.actor.items.filter(item => item.type === "edge")[5]?.name ?? '');
        this.setCalculated("Edges & Advancements 7", this.actor.items.filter(item => item.type === "edge")[6]?.name ?? '');
        this.setCalculated("Edges & Advancements 8", this.actor.items.filter(item => item.type === "edge")[7]?.name ?? '');
        this.setCalculated("Edges & Advancements 9", this.actor.items.filter(item => item.type === "edge")[8]?.name ?? '');
        this.setCalculated("Edges & Advancements 10", this.actor.items.filter(item => item.type === "edge")[9]?.name ?? '');
        this.setCalculated("Edges & Advancements 11", this.actor.items.filter(item => item.type === "edge")[10]?.name ?? '');
        this.setCalculated("Edges & Advancements 12", this.actor.items.filter(item => item.type === "edge")[11]?.name ?? '');
        this.setCalculated("Edges & Advancements 13", this.actor.items.filter(item => item.type === "edge")[12]?.name ?? '');
        this.setCalculated("Edges & Advancements 14", this.actor.items.filter(item => item.type === "edge")[13]?.name ?? '');
        this.setCalculated("Edges & Advancements 15", this.actor.items.filter(item => item.type === "edge")[14]?.name ?? '');
        this.setCalculated("Edges & Advancements 16", this.actor.items.filter(item => item.type === "edge")[15]?.name ?? '');
        this.setCalculated("Edges & Advancements 17", this.actor.items.filter(item => item.type === "edge")[16]?.name ?? '');
        this.setCalculated("Edges & Advancements 18", this.actor.items.filter(item => item.type === "edge")[17]?.name ?? '');
        this.setCalculated("Edges & Advancements 19", this.actor.items.filter(item => item.type === "edge")[18]?.name ?? '');
        this.setCalculated("Edges & Advancements 20", this.actor.items.filter(item => item.type === "edge")[19]?.name ?? '');
        this.setCalculated("Edges & Advancements 21", this.actor.items.filter(item => item.type === "edge")[20]?.name ?? '');
        this.setCalculated("Edges & Advancements 22", this.actor.items.filter(item => item.type === "edge")[21]?.name ?? '');
        this.setCalculated("Edges & Advancements 23", this.actor.items.filter(item => item.type === "edge")[22]?.name ?? '');
        this.setCalculated("Edges & Advancements 24", this.actor.items.filter(item => item.type === "edge")[23]?.name ?? '');
        this.setCalculated("Gear 1", this.getArmor(this.actor.items, 0));
        this.setCalculated("Gear 2", this.getArmor(this.actor.items, 1));
        this.setCalculated("Gear 3", this.getShield(this.actor.items, 0));
        this.setCalculated("Gear 4", this.getShield(this.actor.items, 1));
        this.setCalculated("Gear 5", this.actor.items.filter(item => item.type === "gear")[0]?.name ?? '');
        this.setCalculated("Gear 6", this.actor.items.filter(item => item.type === "gear")[1]?.name ?? '');
        this.setCalculated("Gear 7", this.actor.items.filter(item => item.type === "gear")[2]?.name ?? '');
        this.setCalculated("Gear 8", this.actor.items.filter(item => item.type === "gear")[3]?.name ?? '');
        this.setCalculated("Gear 9", this.actor.items.filter(item => item.type === "gear")[4]?.name ?? '');
        this.setCalculated("Gear 10", this.actor.items.filter(item => item.type === "gear")[5]?.name ?? '');
        this.setCalculated("Gear 11", this.actor.items.filter(item => item.type === "gear")[6]?.name ?? '');
        this.setCalculated("Gear 12", this.actor.items.filter(item => item.type === "gear")[7]?.name ?? '');
        this.setCalculated("Gear 13", this.actor.items.filter(item => item.type === "gear")[8]?.name ?? '');
        this.setCalculated("Gear 14", this.actor.items.filter(item => item.type === "gear")[9]?.name ?? '');
        this.setCalculated("Gear 15", this.actor.items.filter(item => item.type === "gear")[10]?.name ?? '');
        this.setCalculated("Gear 16", this.actor.items.filter(item => item.type === "gear")[11]?.name ?? '');
        this.setCalculated("Gear 17", this.actor.items.filter(item => item.type === "gear")[12]?.name ?? '');
        this.setCalculated("Gear 18", this.actor.items.filter(item => item.type === "gear")[13]?.name ?? '');
        this.setCalculated("Weapons 1", this.actor.items.filter(item => item.type === "weapon")[0]?.name ?? '');
        this.setCalculated("Weapons 2", this.actor.items.filter(item => item.type === "weapon")[1]?.name ?? '');
        this.setCalculated("Weapons 3", this.actor.items.filter(item => item.type === "weapon")[2]?.name ?? '');
        this.setCalculated("Weapons 4", this.actor.items.filter(item => item.type === "weapon")[3]?.name ?? '');
        this.setCalculated("Weapons 5", this.actor.items.filter(item => item.type === "weapon")[4]?.name ?? '');
        this.setCalculated("Weapons 6", this.actor.items.filter(item => item.type === "weapon")[5]?.name ?? '');
        this.setCalculated("Weapons 7", this.actor.items.filter(item => item.type === "weapon")[6]?.name ?? '');
        this.setCalculated("Weapons Range 1", this.actor.items.filter(item => item.type === "weapon")[0]?.system.range ?? '');
        this.setCalculated("Weapons Range 2", this.actor.items.filter(item => item.type === "weapon")[1]?.system.range ?? '');
        this.setCalculated("Weapons Range 3", this.actor.items.filter(item => item.type === "weapon")[2]?.system.range ?? '');
        this.setCalculated("Weapons Range 4", this.actor.items.filter(item => item.type === "weapon")[3]?.system.range ?? '');
        this.setCalculated("Weapons Range 5", this.actor.items.filter(item => item.type === "weapon")[4]?.system.range ?? '');
        this.setCalculated("Weapons Range 6", this.actor.items.filter(item => item.type === "weapon")[5]?.system.range ?? '');
        this.setCalculated("Weapons Range 7", this.actor.items.filter(item => item.type === "weapon")[6]?.system.range ?? '');
        this.setCalculated("Weapons Damage 1", this.actor.items.filter(item => item.type === "weapon")[0]?.system.damage ?? '');
        this.setCalculated("Weapons Damage 2", this.actor.items.filter(item => item.type === "weapon")[1]?.system.damage ?? '');
        this.setCalculated("Weapons Damage 3", this.actor.items.filter(item => item.type === "weapon")[2]?.system.damage ?? '');
        this.setCalculated("Weapons Damage 4", this.actor.items.filter(item => item.type === "weapon")[3]?.system.damage ?? '');
        this.setCalculated("Weapons Damage 5", this.actor.items.filter(item => item.type === "weapon")[4]?.system.damage ?? '');
        this.setCalculated("Weapons Damage 6", this.actor.items.filter(item => item.type === "weapon")[5]?.system.damage ?? '');
        this.setCalculated("Weapons Damage 7", this.actor.items.filter(item => item.type === "weapon")[6]?.system.damage ?? '');
        this.setCalculated("Weapons AP 1", this.actor.items.filter(item => item.type === "weapon")[0]?.system.ap ?? '');
        this.setCalculated("Weapons AP 2", this.actor.items.filter(item => item.type === "weapon")[1]?.system.ap ?? '');
        this.setCalculated("Weapons AP 3", this.actor.items.filter(item => item.type === "weapon")[2]?.system.ap ?? '');
        this.setCalculated("Weapons AP 4", this.actor.items.filter(item => item.type === "weapon")[3]?.system.ap ?? '');
        this.setCalculated("Weapons AP 5", this.actor.items.filter(item => item.type === "weapon")[4]?.system.ap ?? '');
        this.setCalculated("Weapons AP 6", this.actor.items.filter(item => item.type === "weapon")[5]?.system.ap ?? '');
        this.setCalculated("Weapons AP 7", this.actor.items.filter(item => item.type === "weapon")[6]?.system.ap ?? '');
        this.setCalculated("Weapons ROF 1", this.actor.items.filter(item => item.type === "weapon")[0]?.system.rof ?? '');
        this.setCalculated("Weapons ROF 2", this.actor.items.filter(item => item.type === "weapon")[1]?.system.rof ?? '');
        this.setCalculated("Weapons ROF 3", this.actor.items.filter(item => item.type === "weapon")[2]?.system.rof ?? '');
        this.setCalculated("Weapons ROF 4", this.actor.items.filter(item => item.type === "weapon")[3]?.system.rof ?? '');
        this.setCalculated("Weapons ROF 5", this.actor.items.filter(item => item.type === "weapon")[4]?.system.rof ?? '');
        this.setCalculated("Weapons ROF 6", this.actor.items.filter(item => item.type === "weapon")[5]?.system.rof ?? '');
        this.setCalculated("Weapons ROF 7", this.actor.items.filter(item => item.type === "weapon")[6]?.system.rof ?? '');
        this.setCalculated("Weapons WT 1", this.actor.items.filter(item => item.type === "weapon")[0]?.system.weight ?? '');
        this.setCalculated("Weapons WT 2", this.actor.items.filter(item => item.type === "weapon")[1]?.system.weight ?? '');
        this.setCalculated("Weapons WT 3", this.actor.items.filter(item => item.type === "weapon")[2]?.system.weight ?? '');
        this.setCalculated("Weapons WT 4", this.actor.items.filter(item => item.type === "weapon")[3]?.system.weight ?? '');
        this.setCalculated("Weapons WT 5", this.actor.items.filter(item => item.type === "weapon")[4]?.system.weight ?? '');
        this.setCalculated("Weapons WT 6", this.actor.items.filter(item => item.type === "weapon")[5]?.system.weight ?? '');
        this.setCalculated("Weapons WT 7", this.actor.items.filter(item => item.type === "weapon")[6]?.system.weight ?? '');
        this.setCalculated("Power 1", this.actor.items.filter(item => item.type === "power")[0]?.name ?? '');
        this.setCalculated("Power 2", this.actor.items.filter(item => item.type === "power")[1]?.name ?? '');
        this.setCalculated("Power 3", this.actor.items.filter(item => item.type === "power")[2]?.name ?? '');
        this.setCalculated("Power 4", this.actor.items.filter(item => item.type === "power")[3]?.name ?? '');
        this.setCalculated("Power 5", this.actor.items.filter(item => item.type === "power")[4]?.name ?? '');
        this.setCalculated("Power 6", this.actor.items.filter(item => item.type === "power")[5]?.name ?? '');
        this.setCalculated("Power 7", this.actor.items.filter(item => item.type === "power")[6]?.name ?? '');
        this.setCalculated("Power 8", this.actor.items.filter(item => item.type === "power")[7]?.name ?? '');
        this.setCalculated("PP 1", this.actor.items.filter(item => item.type === "power")[0]?.system.pp ?? '');
        this.setCalculated("PP 2", this.actor.items.filter(item => item.type === "power")[1]?.system.pp ?? '');
        this.setCalculated("PP 3", this.actor.items.filter(item => item.type === "power")[2]?.system.pp ?? '');
        this.setCalculated("PP 4", this.actor.items.filter(item => item.type === "power")[3]?.system.pp ?? '');
        this.setCalculated("PP 5", this.actor.items.filter(item => item.type === "power")[4]?.system.pp ?? '');
        this.setCalculated("PP 6", this.actor.items.filter(item => item.type === "power")[5]?.system.pp ?? '');
        this.setCalculated("PP 7", this.actor.items.filter(item => item.type === "power")[6]?.system.pp ?? '');
        this.setCalculated("PP 8", this.actor.items.filter(item => item.type === "power")[7]?.system.pp ?? '');
        this.setCalculated("Power Range 1", this.actor.items.filter(item => item.type === "power")[0]?.system.range ?? '');
        this.setCalculated("Power Range 2", this.actor.items.filter(item => item.type === "power")[1]?.system.range ?? '');
        this.setCalculated("Power Range 3", this.actor.items.filter(item => item.type === "power")[2]?.system.range ?? '');
        this.setCalculated("Power Range 4", this.actor.items.filter(item => item.type === "power")[3]?.system.range ?? '');
        this.setCalculated("Power Range 5", this.actor.items.filter(item => item.type === "power")[4]?.system.range ?? '');
        this.setCalculated("Power Range 6", this.actor.items.filter(item => item.type === "power")[5]?.system.range ?? '');
        this.setCalculated("Power Range 7", this.actor.items.filter(item => item.type === "power")[6]?.system.range ?? '');
        this.setCalculated("Power Range 8", this.actor.items.filter(item => item.type === "power")[7]?.system.range ?? '');
        this.setCalculated("Duration 1", this.actor.items.filter(item => item.type === "power")[0]?.system.duration ?? '');
        this.setCalculated("Duration 2", this.actor.items.filter(item => item.type === "power")[1]?.system.duration ?? '');
        this.setCalculated("Duration 3", this.actor.items.filter(item => item.type === "power")[2]?.system.duration ?? '');
        this.setCalculated("Duration 4", this.actor.items.filter(item => item.type === "power")[3]?.system.duration ?? '');
        this.setCalculated("Duration 5", this.actor.items.filter(item => item.type === "power")[4]?.system.duration ?? '');
        this.setCalculated("Duration 6", this.actor.items.filter(item => item.type === "power")[5]?.system.duration ?? '');
        this.setCalculated("Duration 7", this.actor.items.filter(item => item.type === "power")[6]?.system.duration ?? '');
        this.setCalculated("Duration 8", this.actor.items.filter(item => item.type === "power")[7]?.system.duration ?? '');



    }

    getArmor(items, nr) {
        var item = items.filter(item => item.type === "armor")[nr];
        if (!item) return '';
        return (items.filter(item => item.type === "armor")[nr]?.name ?? '') + " | Armor: " + (items.filter(item => item.type === "armor")[nr]?.data.armor ?? '');
    }

    getShield(items, nr) {
        var item = items.filter(item => item.type === "shield")[nr];
        if (!item) return '';
        return (items.filter(item => item.type === "shield")[nr]?.name ?? '') + " | Parry: " + (items.filter(item => item.type === "shield")[nr]?.data.parry ?? '') + " | Cover: " + (items.filter(item => item.type === "shield")[nr]?.data.cover ?? '');
    }
}

export default MappingClass;
