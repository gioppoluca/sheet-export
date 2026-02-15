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
            pdfUrl: '/modules/sheet-export/mappings/dragonbane/dragonbane.pdf',
            nameDownload: `${this.actor.name ?? "character"}.pdf`,
            name: "dragonbane.pdf",
        });


        const abilMapping = { "str": "str", "con": "con", "agl": "agl", "int": "int", "wil": "wil", "cha": "cha" };
        const skillMapping = {
            "acrobatics": "Acrobatics",
            "awareness": "Awareness",
            "bartering": "Bartering",
            "axes": "Axes",
            "beast-lore": "Beast Lore",
            "bluffing": "Bluffing",
            "bushcraft": "Bushcraft",
            "crafting": "Crafting",
            "evade": "Evade",
            "healing": "Healing",
            "hunting-and-fishing": "Hunting & Fishing",
            "languages": "Languages",
            "myths-and-legends": "Myths & Legends",
            "performance": "Performance",
            "persuasion": "Persuasion",
            "riding": "Riding",
            "seamanship": "Seamanship",
            "sleight-of-hand": "Sleight of Hand",
            "sneaking": "Sneaking",
            "spot-hidden": "Spot Hidden",
            "swimming": "Swimming",
            "bows": "Bows",
            "brawling": "Brawling",
            "crossbows": "Crossbows",
            "hammers": "Hammers",
            "slings": "Slings",
            "staves": "Staves",
            "knives": "Knives",
            "spears": "Spears",
            "swords": "Swords"
        };

        const weapons_in_hands = this.actor.items.filter(i => { return (i.type === 'weapon' && i.system.worn) }) || [];
        const skills = this.actor.system.skills || [];
        const secondarySkills = skills.filter(s => !Object.values(skillMapping).includes(s.name));
        const gear = this.actor.items.filter(i => { return (['item', 'weapon', 'armor'].includes(i.type) && !i.system.memento) }) || [];
        const abspells = this.actor.items.filter(i => ['spell', 'ability'].includes(i.type)) || [];
        const memento = this.actor.items.filter(i => { return (i.type === 'item' && i.system.memento) }) || [];
        const armor_worn = this.actor.items.filter(i => { return (i.type === 'armor' && i.system.worn) }) || [];



        for (const [pdfField, abilKey] of Object.entries(abilMapping)) {
            this.setCalculated(pdfField, this.actor.system.attributes[abilKey].value);
            this.setCalculated(`${pdfField}_chk`, this.actor.system.conditions[abilKey].value);
        }

        for (const [pdfField, skillKey] of Object.entries(skillMapping)) {
            const skill = skills.find(s => s.name === skillKey);
            console.log(`Mapping skill ${pdfField}:`, skill, skillKey, skill?.system?.value);
            this.setCalculated(pdfField, String(skill?.system.value || 0));

            this.setCalculated(`${pdfField}_chk`, skill?.system?.advance);
        }

        console.log("Secondary skills:", secondarySkills);
        for (let i = 0; i < 7; i++) {
            const skill = secondarySkills[i];
            this.setCalculated(`sec_skill${i + 1}`, skill?.name || "");
            this.setCalculated(`sec_skill_ab${i + 1}`, String(skill?.system?.value || 0));
            this.setCalculated(`sec_skill_chk${i + 1}`, skill?.system?.advance || 0);
        }
        this.setCalculated("name", this.actor.name || "");
        this.setCalculated("player", game.user?.name || "");
        this.setCalculated("kin", this.actor.system.kin.name || "");
        this.setCalculated("age", this.actor.system.age || 0);
        this.setCalculated("profession", this.actor.system.profession.name || "");
        this.setCalculated("weakness", this.htmlToText(this.actor.system.weakness) || "");
        this.setCalculated("appearance", this.htmlToText(this.actor.system.appearance) || "");

        this.setCalculated("dam_bon_str", this.actor.system.damageBonus.str.value || "");
        this.setCalculated("dam_bon_agl", this.actor.system.damageBonus.agl.value || "");
        this.setCalculated("movement", this.actor.system.movement.value);
        this.setCalculated("enc_limit", this.actor.system.encumbrance.limit || 0);
        this.setCalculated("willpower", this.actor.system.willPoints.max || 0);
        this.setCalculated("hp", this.actor.system.hitPoints.max);
        this.setCalculated("gold", this.actor.system.currency.gc || 0);
        this.setCalculated("silver", this.actor.system.currency.sc || 0);
        this.setCalculated("copper", this.actor.system.currency.cc || 0);
        // Map Weapons - up to 3 weapons
        for (let i = 0; i < 3; i++) {
            const weapon = weapons_in_hands[i];
            console.log(`Mapping weapon ${i + 1}:`, weapon);
            this.setCalculated(`weapon${i + 1}`, weapon?.name || "");
            console.log(`Weapon ${i + 1} name:`, weapon?.system.grip.label);
            this.setCalculated(`weapon_grip${i + 1}`, game.i18n.localize(weapon?.system?.grip.label) || "");
            this.setCalculated(`weapon_range${i + 1}`, weapon?.system.range || "");
            this.setCalculated(`weapon_dam${i + 1}`, weapon?.system.damage || "");
            this.setCalculated(`weapon_dur${i + 1}`, weapon?.system.durability || "");
            this.setCalculated(`weapon_feat${i + 1}`, weapon?.system.features || "");
        }

        //this.setCalculated("tiny_items", this.actor.SOMETHING + "tiny_items");

        // Map Gear/Packing (Packning) - up to 10 items
        for (let i = 0; i < 10; i++) {
            const item = gear[i];
            const quantity = item?.system.quantity || 0;
            const name = item?.name || "";
            this.setCalculated(`inventory${i + 1}`, `${quantity} ${name}`.trim());
        }


        // Map Mementos (Minnessak) - up to 2
        let mem = ""
        for (let i = 0; i < 2; i++) {
            if (memento[i]) {
                mem += memento[i]?.name + ",";
            }
        }
        this.setCalculated("memento", mem);

        for (let i = 0; i < 15; i++) {
            const spell = abspells[i];
            this.setCalculated(`ab_spells_${i + 1}`, spell?.name || "");
        }
        this.setCalculated("rest_round_chk", false);
        this.setCalculated("rest_stretch_chk", false);
        const armor = this.actor.system.equippedArmor;
        const helm = this.actor.system.equippedHelmet;
        console.log("Equipped armor:", armor);
        console.log("Equipped helmet:", helm);
        this.setCalculated("AR", armor?.system.rating || 0);
        this.setCalculated("helm_AR", helm?.system.rating || 0);
        this.setCalculated("AR_name", armor?.name || "");
        this.setCalculated("helm_AR_name", helm?.name || "");
        this.setCalculated("ar_bane_acro_chk", armor?.system.bane?.includes('Acrobatics') || false);
        this.setCalculated("ar_bane_sneak_chk", armor?.system.bane?.includes('Sneaking') || false);
        this.setCalculated("ar_bane_evade_chk", armor?.system.bane?.includes('Evade') || false);
        this.setCalculated("helm_ar_awa_chk", helm?.system.bane?.includes('Awareness') || false);
        this.setCalculated("helm_ar_rng_chk", helm?.system.bane?.includes('Bows', "Crossbows", "Slings") || false);
    }
}
export default MappingClass;

