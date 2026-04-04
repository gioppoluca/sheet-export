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
            pdfUrl: '/modules/sheet-export/mappings/shadowrun6-eden/SR6-Character-Sheet-Fillable.pdf',
            nameDownload: `${this.actor.name ?? "character"}.pdf`,
            name: "SR6-Character-Sheet-Fillable.pdf",
        });

        // ── Identity ──────────────────────────────────────────────────────────
        this.setCalculated("CHARACTER", this.actor.name);
        this.setCalculated("CHARACTER_2", this.actor.name);
        this.setCalculated("Name/Primary Alias", this.actor.name);
        this.setCalculated("Metatype", this.actor.system.metatype || "");
        this.setCalculated("Sex", this.actor.system.gender || "");
        this.setCalculated("Reputation", this.actor.system.reputation || 0);
        this.setCalculated("Heat", this.actor.system.heat || 0);
        this.setCalculated("Karma", this.actor.system.karma || 0);
        this.setCalculated("Total Karma", this.actor.system.karma_total || 0);
        this.setCalculated("Nuyen", this.actor.system.nuyen || 0);
        this.setCalculated("Notes", this.actor.system.notes || "");
        this.setCalculated("NOTES", this.actor.system.notes || "");
        this.setCalculated("NOTES_2", this.actor.system.notes || "");

        // ── Core Attributes ───────────────────────────────────────────────────
        // Use .pool which already includes base + mod + augment
        this.setCalculated("Body", this.actor.system.attributes.bod.pool);
        this.setCalculated("Agility", this.actor.system.attributes.agi.pool);
        this.setCalculated("Reaction", this.actor.system.attributes.rea.pool);
        this.setCalculated("Strength", this.actor.system.attributes.str.pool);
        this.setCalculated("Willpower", this.actor.system.attributes.wil.pool);
        this.setCalculated("Logic", this.actor.system.attributes.log.pool);
        this.setCalculated("Intuition", this.actor.system.attributes.int.pool);
        this.setCalculated("Charisma", this.actor.system.attributes.cha.pool);
        this.setCalculated("Essence", this.actor.system.attributes.essence.pool);
        this.setCalculated("Edge", this.actor.system.attributes.edg.max);

        // Magic or Resonance — only one will be non-zero
        this.setCalculated("MagicResonance",
            this.actor.system.attributes.mag.pool > 0
                ? this.actor.system.attributes.mag.pool
                : this.actor.system.attributes.res.pool > 0
                    ? this.actor.system.attributes.res.pool
                    : "");

        // ── Derived Stats ─────────────────────────────────────────────────────
        // Composure = Willpower + Charisma
        this.setCalculated("Composure",
            this.actor.system.attributes.wil.pool +
            this.actor.system.attributes.cha.pool +
            (this.actor.system.derived.composure.mod || 0));

        // Judge Intentions = Intuition + Charisma
        this.setCalculated("Judge Intentions",
            this.actor.system.attributes.int.pool +
            this.actor.system.attributes.cha.pool +
            (this.actor.system.derived.judge_intentions.mod || 0));

        // Memory = Logic + Willpower
        this.setCalculated("Memory",
            this.actor.system.attributes.log.pool +
            this.actor.system.attributes.wil.pool +
            (this.actor.system.derived.memory.mod || 0));

        // Lift/Carry = Body + Strength
        this.setCalculated("LiftCarry",
            this.actor.system.attributes.bod.pool +
            this.actor.system.attributes.str.pool +
            (this.actor.system.derived.lift_carry.mod || 0));

        // Movement
        this.setCalculated("Movement",
            `${this.actor.system.walk}m / +${this.actor.system.sprint}m (+${this.actor.system.perHit}m/hit)`);

        // ── Initiative ────────────────────────────────────────────────────────
        const physIniBase = this.actor.system.attributes.rea.pool +
            this.actor.system.attributes.int.pool +
            (this.actor.system.initiative.physical.mod || 0);
        const physIniDice = 1 + (this.actor.system.initiative.physical.diceMod || 0);
        this.setCalculated("Initiative", `${physIniBase} + ${physIniDice}d6`);

        const matIniBase = this.actor.system.attributes.int.pool +
            (this.actor.system.initiative.matrix.mod || 0);
        const matIniDice = (this.actor.system.initiative.matrix.dice || 1) +
            (this.actor.system.initiative.matrix.diceMod || 0);
        this.setCalculated("Matrix Initiative", `${matIniBase} + ${matIniDice}d6`);

        const astIniBase = (this.actor.system.attributes.int.pool * 2) +
            (this.actor.system.initiative.astral.mod || 0);
        const astIniDice = (this.actor.system.initiative.astral.dice || 2) +
            (this.actor.system.initiative.astral.diceMod || 0);
        this.setCalculated("Astral Initiative", `${astIniBase} + ${astIniDice}d6`);

        // ── Monitor tracks ────────────────────────────────────────────────────
        this.setCalculated("Physical Limit", this.actor.system.physical.max);
        this.setCalculated("Stun Limit", this.actor.system.stun.max);

        // ── Defense Rating ────────────────────────────────────────────────────
        this.setCalculated("Defense Rating",
            this.actor.system.defenserating.physical.mod || 0);

        // ── Matrix / Persona (device-based) ──────────────────────────────────
        this.setCalculated("Attack", this.actor.system.persona.device.mod.a || "");
        this.setCalculated("Sleaze", this.actor.system.persona.device.mod.s || "");
        this.setCalculated("Data Proc", this.actor.system.persona.device.mod.d || "");
        this.setCalculated("Firewall", this.actor.system.persona.device.mod.f || "");

        // ── Skills ────────────────────────────────────────────────────────────
        const skillLabels = {
            astral: "Astral",
            athletics: "Athletics",
            biotech: "Biotech",
            close_combat: "Close Combat",
            con: "Con",
            conjuring: "Conjuring",
            cracking: "Cracking",
            electronics: "Electronics",
            enchanting: "Enchanting",
            engineering: "Engineering",
            exotic_weapons: "Exotic Weapons",
            firearms: "Firearms",
            influence: "Influence",
            outdoors: "Outdoors",
            perception: "Perception",
            piloting: "Piloting",
            sorcery: "Sorcery",
            stealth: "Stealth",
            tasking: "Tasking",
        };

        const skillLines = Object.entries(this.actor.system.skills)
            .filter(([, sk]) => sk.points > 0)
            .map(([key, sk]) => {
                let line = `${skillLabels[key] ?? key} ${sk.points}`;
                if (sk.specialization) line += ` [${sk.specialization}]`;
                if (sk.expertise) line += ` (${sk.expertise})`;
                return line;
            });
        this.setCalculated("Skills", skillLines.join("\n") || "");

        // ── Gear items ────────────────────────────────────────────────────────
        const gearItems = this.actor.items.filter(i => i.type === "gear");

        // Melee weapons
        const meleeWeapon = gearItems.find(i => i.system.type === "WEAPON_CLOSE_COMBAT");
        this.setCalculated("Primary Melee Weapon",
            meleeWeapon ? this.formatWeapon(meleeWeapon) : "");
        this.setCalculated("Unarmed",
            meleeWeapon
                ? `${meleeWeapon.system.dmg}${meleeWeapon.system.stun ? "S" : "P"}`
                : "");
        const allMelee = gearItems.filter(i => i.system.type === "WEAPON_CLOSE_COMBAT");
        this.setCalculated("Melee Weapons",
            allMelee.map(w => this.formatWeapon(w)).join("\n") || "");

        // Ranged weapons
        const rangedTypes = ["WEAPON_PISTOLS", "WEAPON_AUTOMATICS", "WEAPON_LONGARMS",
            "WEAPON_HEAVY_WEAPONS", "WEAPON_THROWN", "WEAPON_TASERS"];
        const rangedWeapon = gearItems.find(i => rangedTypes.includes(i.system.type));
        this.setCalculated("Primary Ranged Weapon",
            rangedWeapon ? this.formatWeapon(rangedWeapon) : "");
        const allRanged = gearItems.filter(i => rangedTypes.includes(i.system.type));
        this.setCalculated("Ranged Weapons",
            allRanged.map(w => this.formatWeapon(w)).join("\n") || "");

        // Armor
        const armor = gearItems.filter(i => i.system.type === "ARMOR");
        this.setCalculated("Primary Armor",
            armor.length ? (armor[0].system.customName || armor[0].name) : "");
        this.setCalculated("Rating",
            armor.length ? (armor[0].system.rating || "") : "");

        // Augmentations
        const augTypes = ["CYBERWARE", "BIOWARE", "NANOWARE", "GENETECH"];
        const augs = gearItems.filter(i => augTypes.includes(i.system.type));
        this.setCalculated("Augmentations",
            augs.map(i => i.system.customName || i.name).join("\n") || "");

        // Programs (matrix)
        const programs = gearItems.filter(i => i.system.type === "PROGRAM");
        this.setCalculated("Programs 1", programs[0] ? programs[0].name : "");
        this.setCalculated("Programs 2", programs[1] ? programs[1].name : "");
        this.setCalculated("Programs 3", programs[2] ? programs[2].name : "");
        this.setCalculated("Programs 4", programs[3] ? programs[3].name : "");

        // General Gear (everything else)
        const miscGear = gearItems.filter(i =>
            !["WEAPON_CLOSE_COMBAT", ...rangedTypes, "ARMOR", ...augTypes, "PROGRAM"]
                .includes(i.system.type));
        this.setCalculated("Gear",
            miscGear.map(i => i.system.customName || i.name).join("\n") || "");

        // ── Magic / Resonance items ───────────────────────────────────────────
        const spellItems = this.actor.items.filter(i =>
            ["spell", "ritual", "preparation", "complexform"].includes(i.type));
        this.setCalculated("Spells/Preparations/Rituals/Complex Forms",
            spellItems.map(i => i.name).join("\n") || "");

        const powers = this.actor.items.filter(i => i.type === "adeptpower");
        this.setCalculated("Adept Powers or Other Abilities",
            powers.map(i => i.name).join("\n") || "");

        // ── Qualities & Contacts ──────────────────────────────────────────────
        const qualities = this.actor.items.filter(i => i.type === "quality");
        this.setCalculated("Qualities",
            qualities.map(i => i.name).join("\n") || "");

        const contacts = this.actor.items.filter(i => i.type === "contact");
        this.setCalculated("Contacts",
            contacts.map(i => i.name).join("\n") || "");

        // ── Tradition ─────────────────────────────────────────────────────────
        this.setCalculated("Misc",
            this.actor.system.tradition?.name
                ? `Tradition: ${this.actor.system.tradition.name}`
                : "");
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    formatWeapon(item) {
        const s = item.system;
        const displayName = s.customName || item.name;
        const dmg = `${s.dmg}${s.stun ? "S" : "P"}`;
        const ar = (s.attackRating || []).join("/");
        const modes = Object.entries(s.modes || {})
            .filter(([, v]) => v).map(([k]) => k).join("/");
        let line = `${displayName}  DMG: ${dmg}`;
        if (ar && ar !== "0/0/0/0/0") line += `  AR: ${ar}`;
        if (modes) line += `  ${modes}`;
        return line;
    }
}

export default MappingClass;
/*
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
        
        this.setCalculated("CHARACTER", this.actor.name);
        
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
        
        this.setCalculated("Body", this.actor.system.attributes.bod.base);
        /*
        this.setCalculated("Armor", this.actor.SOMETHING);
        this.setCalculated("Pilot", this.actor.SOMETHING);
        this.setCalculated("Sensor", this.actor.SOMETHING);
        this.setCalculated("Seats", this.actor.SOMETHING);
        this.setCalculated("Vehicle", this.actor.SOMETHING);
        this.setCalculated("Handling", this.actor.SOMETHING);

    }
}

export default MappingClass;
*/