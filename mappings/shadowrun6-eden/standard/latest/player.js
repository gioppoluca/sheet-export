import baseMapping from "../../../../scripts/baseMapping.js";

class MappingClass extends baseMapping {

    authors = [
        {
            name: "gioppoluca",
            url: "https://github.com/gioppoluca",
            github: "https://github.com/gioppoluca",
        },
    ];

    async createMappings() {
        await super.createMappings();

        this.pdfFiles.push({
            pdfUrl: "/modules/sheet-export/mappings/shadowrun6-eden/SR6-Character-Sheet-Fillable.pdf",
            nameDownload: `${this.actor.name ?? "character"}.pdf`,
            name: "SR6-Character-Sheet-Fillable.pdf",
        });

        const system = this.actor.system ?? {};
        const items = Array.from(this.actor.items ?? []);
        const gearItems = items.filter(item => item.type === "gear");
        const modItems = items.filter(item => item.type === "mod");

        this.modsByParentId = this.groupModsByParent(modItems);

        // ── Identity ──────────────────────────────────────────────────────────
        this.setCalculated("CHARACTER", this.actor.name ?? "");
        this.setCalculated("CHARACTER_2", this.actor.name ?? "");
        this.setCalculated("Name/Primary Alias", this.actor.name ?? "");
        this.setCalculated("Metatype", system.metatype ?? "");
        this.setCalculated("Sex", system.gender ?? "");
        this.setCalculated("Reputation", system.reputation ?? 0);
        this.setCalculated("Heat", system.heat ?? 0);
        this.setCalculated("Karma", system.karma ?? 0);
        this.setCalculated("Total Karma", system.karma_total ?? 0);
        this.setCalculated("Nuyen", system.nuyen ?? 0);
        this.setCalculated("Notes", system.notes ?? "");
        this.setCalculated("NOTES", system.notes ?? "");
        this.setCalculated("NOTES_2", system.notes ?? "");

        // ── Core Attributes ───────────────────────────────────────────────────
        this.setCalculated("Body", this.attributeValue("bod"));
        this.setCalculated("Agility", this.attributeValue("agi"));
        this.setCalculated("Reaction", this.attributeValue("rea"));
        this.setCalculated("Strength", this.attributeValue("str"));
        this.setCalculated("Willpower", this.attributeValue("wil"));
        this.setCalculated("Logic", this.attributeValue("log"));
        this.setCalculated("Intuition", this.attributeValue("int"));
        this.setCalculated("Charisma", this.attributeValue("cha"));
        this.setCalculated("Essence", this.attributeValue("essence"));
        this.setCalculated("Edge", system.edge?.max ?? system.attributes?.edg?.max ?? "");

        const magic = this.attributeValue("mag");
        const resonance = this.attributeValue("res");
        this.setCalculated("MagicResonance", magic > 0 ? magic : resonance > 0 ? resonance : "");

        // ── Derived Stats ─────────────────────────────────────────────────────
        this.setCalculated("Composure",
            this.attributeValue("wil") +
            this.attributeValue("cha") +
            this.number(system.derived?.composure?.mod));

        this.setCalculated("Judge Intentions",
            this.attributeValue("int") +
            this.attributeValue("cha") +
            this.number(system.derived?.judge_intentions?.mod));

        this.setCalculated("Memory",
            this.attributeValue("log") +
            this.attributeValue("wil") +
            this.number(system.derived?.memory?.mod));

        this.setCalculated("LiftCarry",
            this.attributeValue("bod") +
            this.attributeValue("str") +
            this.number(system.derived?.lift_carry?.mod));

        this.setCalculated("Movement",
            `${system.walk ?? 0}m / +${system.sprint ?? 0}m (+${system.perHit ?? 0}m/hit)`);

        // ── Initiative ────────────────────────────────────────────────────────
        const physicalInitiative = system.initiative?.physical ?? {};
        const physicalBase = this.preparedValue(
            physicalInitiative.pool,
            this.attributeValue("rea") + this.attributeValue("int") + this.number(physicalInitiative.mod),
        );
        const physicalDice = this.preparedValue(
            physicalInitiative.dicePool,
            this.number(physicalInitiative.dice, 1) + this.number(physicalInitiative.diceMod),
        );
        this.setCalculated("Initiative", `${physicalBase} + ${physicalDice}d6`);

        const matrixInitiative = system.initiative?.matrix ?? {};
        const matrixBase = this.preparedValue(
            matrixInitiative.pool,
            this.attributeValue("int") + this.number(matrixInitiative.mod),
        );
        const matrixDice = this.preparedValue(
            matrixInitiative.dicePool,
            this.number(matrixInitiative.dice, 1) + this.number(matrixInitiative.diceMod),
        );
        this.setCalculated("Matrix Initiative", `${matrixBase} + ${matrixDice}d6`);

        const astralInitiative = system.initiative?.astral ?? {};
        const astralBase = this.preparedValue(
            astralInitiative.pool,
            (this.attributeValue("int") * 2) + this.number(astralInitiative.mod),
        );
        const astralDice = this.preparedValue(
            astralInitiative.dicePool,
            this.number(astralInitiative.dice, 2) + this.number(astralInitiative.diceMod),
        );
        this.setCalculated("Astral Initiative", `${astralBase} + ${astralDice}d6`);

        // ── Monitor tracks and defense ────────────────────────────────────────
        this.setCalculated("Physical Limit", system.physical?.max ?? "");
        this.setCalculated("Stun Limit", system.stun?.max ?? "");
        this.setCalculated("Defense Rating", this.ratingValue(system.defenserating?.physical));

        // ── Matrix / Persona ──────────────────────────────────────────────────
        const persona = this.resolvePersona(system.persona);
        this.setCalculated("Attack", this.nonZero(persona.a));
        this.setCalculated("Sleaze", this.nonZero(persona.s));
        this.setCalculated("Data Proc", this.nonZero(persona.d));
        this.setCalculated("Firewall", this.nonZero(persona.f));

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

        const activeSkills = Object.entries(system.skills ?? {})
            .filter(([, skill]) => this.number(skill?.points) > 0)
            .map(([key, skill]) => this.formatActorSkill(skillLabels[key] ?? this.humanize(key), skill));

        const knowledgeSkills = items
            .filter(item => item.type === "skill")
            .map(item => this.formatKnowledgeSkill(item));

        this.setCalculated("Skills", [...activeSkills, ...knowledgeSkills].join("\n"));

        // ── Weapons ───────────────────────────────────────────────────────────
        const meleeWeapons = gearItems.filter(item => this.isMeleeWeapon(item));
        const rangedWeapons = gearItems.filter(item => this.isRangedWeapon(item));
        const unarmedWeapon = meleeWeapons.find(item =>
            item.system?.subtype === "UNARMED" ||
            item.system?.genesisID === "unarmed" ||
            item.name?.toLowerCase() === "unarmed");
        const primaryMelee = meleeWeapons.find(item => item !== unarmedWeapon) ?? unarmedWeapon;
        const primaryRanged = rangedWeapons[0];

        this.setCalculated("Primary Melee Weapon", primaryMelee ? this.formatWeapon(primaryMelee) : "");
        this.setCalculated("Primary Ranged Weapon", primaryRanged ? this.formatWeapon(primaryRanged) : "");
        this.setCalculated("Unarmed", unarmedWeapon ? this.weaponDamage(unarmedWeapon) : "");
        this.setCalculated("Melee Weapons", meleeWeapons.map(item => this.formatWeapon(item)).join("\n"));
        this.setCalculated("Ranged Weapons", rangedWeapons.map(item => this.formatWeapon(item)).join("\n"));

        // ── Armor ─────────────────────────────────────────────────────────────
        const armorItems = gearItems.filter(item => item.system?.type === "ARMOR");
        const primaryArmor = this.selectPrimaryArmor(armorItems);
        const otherArmor = armorItems.filter(item => item !== primaryArmor);

        this.setCalculated("Primary Armor", primaryArmor ? this.itemName(primaryArmor) : "");
        this.setCalculated("Rating", primaryArmor ? this.nonZero(primaryArmor.system?.defense) : "");

        // ── Augmentations ─────────────────────────────────────────────────────
        const augmentationTypes = new Set(["CYBERWARE", "BIOWARE", "NANOWARE", "GENETECH"]);
        const augmentations = gearItems.filter(item => augmentationTypes.has(item.system?.type));
        this.setCalculated("Augmentations", augmentations.map(item => this.formatAugmentation(item)).join("\n"));

        // ── Matrix programs and devices ───────────────────────────────────────
        const programs = items.filter(item =>
            item.type === "software" ||
            (item.type === "gear" && ["SOFTWARE", "PROGRAM"].includes(item.system?.type)));
        const programFields = this.splitAcrossFields(programs.map(item => this.formatProgram(item)), 4);
        for (let index = 0; index < 4; index += 1) {
            this.setCalculated(`Programs ${index + 1}`, programFields[index]);
        }

        const devices = gearItems.filter(item => item.system?.type === "ELECTRONICS");
        this.setCalculated("Devices/DR", devices.map(item => this.formatDevice(item)).join("\n"));

        // ── General gear ──────────────────────────────────────────────────────
        const excludedGear = new Set([
            ...meleeWeapons,
            ...rangedWeapons,
            ...armorItems,
            ...augmentations,
            ...programs.filter(item => item.type === "gear"),
            ...devices,
        ]);
        const freeMods = modItems.filter(item => !item.system?.embeddedInUuid);
        const miscGear = gearItems.filter(item => !excludedGear.has(item));
        const gearLines = [
            ...otherArmor.map(item => this.formatArmor(item)),
            ...miscGear.map(item => this.formatGenericGear(item)),
            ...freeMods.map(item => this.itemName(item)),
        ];
        this.setCalculated("Gear", gearLines.join("\n"));

        // ── Magic / Resonance ─────────────────────────────────────────────────
        const magicItemTypes = new Set(["spell", "ritual", "preparation", "complexform", "focus"]);
        const magicItems = items.filter(item => magicItemTypes.has(item.type));
        this.setCalculated(
            "Spells/Preparations/Rituals/Complex Forms",
            magicItems.map(item => this.formatMagicItem(item)).join("\n"),
        );

        const abilityItemTypes = new Set([
            "adeptpower",
            "critterpower",
            "spritepower",
            "metamagic",
            "echo",
            "martialartstyle",
            "martialarttech",
        ]);
        const abilities = items.filter(item => abilityItemTypes.has(item.type));
        this.setCalculated(
            "Adept Powers or Other Abilities",
            abilities.map(item => this.formatAbility(item)).join("\n"),
        );

        // ── Qualities and contacts ────────────────────────────────────────────
        const qualities = items.filter(item => item.type === "quality");
        this.setCalculated("Qualities", qualities.map(item => this.formatQuality(item)).join("\n"));

        const contacts = items.filter(item => item.type === "contact");
        this.setCalculated("Contacts", contacts.map(item => this.formatContact(item)).join("\n"));

        // ── SINs and lifestyles ───────────────────────────────────────────────
        const sins = items.filter(item => item.type === "sin");
        for (let index = 0; index < 3; index += 1) {
            this.setCalculated(
                `Fake IDs  Related Lifestyles  Funds  Licenses ${index + 1}`,
                sins[index] ? this.formatSin(sins[index]) : "",
            );
        }

        const lifestyles = items.filter(item => item.type === "lifestyle");
        this.setCalculated("Primary Lifestyle", lifestyles[0] ? this.formatLifestyle(lifestyles[0]) : "");
        this.setCalculated("Licenses", "");

        // ── Miscellaneous character data ──────────────────────────────────────
        const misc = [];
        if (system.tradition?.name) misc.push(`Tradition: ${system.tradition.name}`);
        if (system.mortype) misc.push(`Type: ${this.humanize(system.mortype)}`);
        this.setCalculated("Misc", misc.join("\n"));
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    number(value, fallback = 0) {
        const result = Number(value);
        return Number.isFinite(result) ? result : fallback;
    }

    preparedValue(value, fallback) {
        const result = Number(value);
        return Number.isFinite(result) ? result : fallback;
    }

    nonZero(value) {
        const result = this.number(value);
        return result !== 0 ? result : "";
    }

    attributeValue(key) {
        const attribute = this.actor.system?.attributes?.[key] ?? {};
        const pool = Number(attribute.pool);
        if (Number.isFinite(pool)) return pool;

        return Math.max(
            0,
            this.number(attribute.base) + Math.min(4, this.number(attribute.mod)),
        );
    }

    ratingValue(rating) {
        if (!rating) return 0;

        const pool = Number(rating.pool);
        if (Number.isFinite(pool)) return pool;

        const base = Number(rating.base);
        if (Number.isFinite(base)) return base + this.number(rating.mod);

        return this.number(rating.mod);
    }

    resolvePersona(persona = {}) {
        const candidates = [persona.used, persona.device?.mod, persona.living?.mod].filter(Boolean);
        return candidates.find(candidate =>
            ["a", "s", "d", "f"].some(key => this.number(candidate[key]) !== 0)) ?? candidates[0] ?? {};
    }

    itemId(item) {
        return item.id ?? item._id ?? "";
    }

    itemName(item) {
        return item.system?.customName || item.name || "";
    }

    groupModsByParent(modItems) {
        const result = new Map();

        for (const mod of modItems) {
            const uuid = mod.system?.embeddedInUuid;
            if (!uuid) continue;

            const parentId = uuid.split(".").pop();
            if (!result.has(parentId)) result.set(parentId, []);
            result.get(parentId).push(mod);
        }

        return result;
    }

    getMods(item) {
        return this.modsByParentId?.get(this.itemId(item)) ?? [];
    }

    formatActorSkill(label, skill) {
        let line = `${label} ${this.number(skill.points)}`;
        if (skill.specialization) line += ` [${this.humanize(skill.specialization)}]`;
        if (skill.expertise) line += ` (${this.humanize(skill.expertise)})`;

        const expanded = Array.isArray(skill.expandedSpecializations)
            ? skill.expandedSpecializations
                .map(value => typeof value === "string" ? value : value?.name)
                .filter(Boolean)
            : [];
        if (expanded.length) line += ` {${expanded.map(value => this.humanize(value)).join(", ")}}`;

        return line;
    }

    formatKnowledgeSkill(item) {
        const points = this.number(item.system?.points);
        return `${this.itemName(item)}${points > 0 ? ` ${points}` : ""}`;
    }

    isWeapon(item) {
        return item.type === "gear" && String(item.system?.type ?? "").startsWith("WEAPON_");
    }

    isMeleeWeapon(item) {
        return this.isWeapon(item) && item.system?.type === "WEAPON_CLOSE_COMBAT";
    }

    isRangedWeapon(item) {
        return this.isWeapon(item) && !this.isMeleeWeapon(item);
    }

    weaponDamage(item) {
        const system = item.system ?? {};
        if (system.dmgDef) return system.dmgDef;

        const damage = Number(system.dmg);
        return Number.isFinite(damage) ? `${damage}${system.stun ? "S" : "P"}` : "";
    }

    formatWeapon(item) {
        const system = item.system ?? {};
        const parts = [this.itemName(item)];
        const damage = this.weaponDamage(item);
        if (damage) parts.push(`DV ${damage}`);

        const attackRating = Array.isArray(system.attackRating) ? system.attackRating : [];
        if (attackRating.some(value => this.number(value) > 0)) {
            parts.push(`AR ${attackRating.map(value => this.number(value) > 0 ? this.number(value) : "—").join("/")}`);
        }

        const modes = Object.entries(system.modes ?? {})
            .filter(([, enabled]) => enabled)
            .map(([mode]) => mode);
        if (modes.length) parts.push(modes.join("/"));

        if (this.number(system.ammocap) > 0) {
            parts.push(`Ammo ${this.number(system.ammocount)}/${this.number(system.ammocap)}`);
        }

        const mods = this.getMods(item).map(mod => this.itemName(mod));
        if (mods.length) parts.push(`Mods: ${mods.join(", ")}`);

        return parts.join(" | ");
    }

    selectPrimaryArmor(armorItems) {
        if (!armorItems.length) return null;

        const activeArmor = armorItems.filter(item => item.system?.usedForPool);
        const candidates = activeArmor.length ? activeArmor : armorItems;

        return [...candidates].sort((left, right) => {
            const leftBody = left.system?.subtype === "ARMOR_BODY" ? 1 : 0;
            const rightBody = right.system?.subtype === "ARMOR_BODY" ? 1 : 0;
            if (leftBody !== rightBody) return rightBody - leftBody;
            return this.number(right.system?.defense) - this.number(left.system?.defense);
        })[0];
    }

    formatArmor(item) {
        const parts = [this.itemName(item)];
        const defense = this.number(item.system?.defense);
        const social = this.number(item.system?.social);
        const capacity = this.number(item.system?.capacity);
        if (defense) parts.push(`DR +${defense}`);
        if (social) parts.push(`Social +${social}`);
        if (capacity) parts.push(`Cap ${capacity}`);
        return parts.join(" | ");
    }

    formatAugmentation(item) {
        const parts = [this.itemName(item)];
        const rating = this.number(item.system?.rating);
        const essence = this.number(item.system?.essence);
        if (rating > 0 && !new RegExp(`\\brating\\s+${rating}\\b`, "i").test(parts[0])) {
            parts.push(`Rating ${rating}`);
        }
        if (essence > 0) parts.push(`Ess ${essence}`);
        return parts.join(" | ");
    }

    formatProgram(item) {
        const parts = [this.itemName(item)];
        const rating = this.number(item.system?.rating);
        if (rating > 0) parts.push(`R${rating}`);
        return parts.join(" ");
    }

    splitAcrossFields(lines, fieldCount) {
        const result = Array.from({ length: fieldCount }, () => "");
        if (!lines.length) return result;

        const chunkSize = Math.ceil(lines.length / fieldCount);
        for (let index = 0; index < fieldCount; index += 1) {
            result[index] = lines.slice(index * chunkSize, (index + 1) * chunkSize).join("\n");
        }
        return result;
    }

    formatDevice(item) {
        const system = item.system ?? {};
        const parts = [this.itemName(item)];
        const attributes = ["a", "s", "d", "f"]
            .map(key => this.number(system[key]))
            .filter(value => value > 0);
        if (attributes.length) {
            parts.push(`A/S/D/F ${["a", "s", "d", "f"].map(key => this.number(system[key]) || "—").join("/")}`);
        }

        const deviceRating = this.number(system.matrix?.deviceRating ?? system.devRating);
        const slots = this.number(system.progSlots);
        const rating = this.number(system.rating);
        if (deviceRating) parts.push(`DR ${deviceRating}`);
        if (slots) parts.push(`Slots ${slots}`);
        if (rating) parts.push(`Rating ${rating}`);

        const mods = this.getMods(item).map(mod => this.itemName(mod));
        if (mods.length) parts.push(`Mods: ${mods.join(", ")}`);

        return parts.join(" | ");
    }

    formatGenericGear(item) {
        const parts = [this.itemName(item)];
        const rating = this.number(item.system?.rating);
        const capacity = this.number(item.system?.capacity);
        const count = this.number(item.system?.count);
        if (rating) parts.push(`Rating ${rating}`);
        if (capacity) parts.push(`Cap ${capacity}`);
        if (item.system?.countable && count > 0) parts.push(`x${count}`);

        const mods = this.getMods(item).map(mod => this.itemName(mod));
        if (mods.length) parts.push(`Mods: ${mods.join(", ")}`);

        return parts.join(" | ");
    }

    formatMagicItem(item) {
        const system = item.system ?? {};
        const labels = {
            spell: "Spell",
            ritual: "Ritual",
            preparation: "Preparation",
            complexform: "Complex Form",
            focus: "Focus",
        };
        const parts = [`[${labels[item.type] ?? this.humanize(item.type)}] ${this.itemName(item)}`];

        if (item.type === "spell") {
            if (system.category) parts.push(this.humanize(system.category));
            if (system.range) parts.push(this.humanize(system.range));
            if (system.duration) parts.push(this.humanize(system.duration));
            if (system.drain !== undefined) parts.push(`DV ${system.drain}`);
            if (system.damage) parts.push(this.humanize(system.damage));
        } else if (item.type === "ritual") {
            if (this.number(system.threshold) > 0) parts.push(`Threshold ${this.number(system.threshold)}`);
        } else if (item.type === "complexform") {
            if (system.duration) parts.push(this.humanize(system.duration));
            if (system.fading !== undefined) parts.push(`Fading ${system.fading}`);
            if (this.number(system.threshold) > 0) parts.push(`Threshold ${this.number(system.threshold)}`);
        } else if (item.type === "focus") {
            const rating = this.number(system.rating ?? system.force);
            if (rating > 0) parts.push(`Force ${rating}`);
        }

        return parts.join(" | ");
    }

    formatAbility(item) {
        const system = item.system ?? {};
        const labels = {
            adeptpower: "Adept",
            critterpower: "Critter",
            spritepower: "Sprite",
            metamagic: "Metamagic",
            echo: "Echo",
            martialartstyle: "Martial Art",
            martialarttech: "Technique",
        };
        const parts = [`[${labels[item.type] ?? this.humanize(item.type)}] ${this.itemName(item)}`];

        if (item.type === "adeptpower") {
            if (this.number(system.level) > 0) parts.push(`Level ${this.number(system.level)}`);
            if (system.choice) parts.push(system.choice);
            if (system.cost !== undefined) parts.push(`${system.cost} PP`);
            if (system.activation) parts.push(this.humanize(system.activation));
        } else if (["critterpower", "spritepower"].includes(item.type)) {
            if (system.action) parts.push(this.humanize(system.action));
            if (system.range) parts.push(this.humanize(system.range));
            if (system.duration) parts.push(this.humanize(system.duration));
        }

        return parts.join(" | ");
    }

    formatQuality(item) {
        const system = item.system ?? {};
        const category = String(system.category ?? "").toUpperCase();
        const marker = category === "ADVANTAGE" ? "+" : category === "DISADVANTAGE" ? "−" : "•";
        const parts = [`[${marker}] ${this.itemName(item)}`];

        const level = this.number(system.level);
        const value = this.number(system.value);
        if (level > 0) parts.push(`Level ${level}`);
        if (value !== 0) parts.push(`${value} Karma`);

        return parts.join(" | ");
    }

    formatContact(item) {
        const system = item.system ?? {};
        const parts = [this.itemName(item)];
        const connection = this.number(system.rating ?? system.connection);
        const loyalty = this.number(system.loyalty);
        if (connection) parts.push(`C ${connection}`);
        if (loyalty) parts.push(`L ${loyalty}`);
        if (system.type) parts.push(this.humanize(system.type));
        return parts.join(" | ");
    }

    formatSin(item) {
        const system = item.system ?? {};
        const parts = [this.itemName(item)];
        const rating = this.number(system.rating);
        if (rating) parts.push(`Rating ${rating}`);
        if (system.type) parts.push(this.humanize(system.type));
        return parts.join(" | ");
    }

    formatLifestyle(item) {
        const system = item.system ?? {};
        const parts = [this.itemName(item)];
        if (system.type) parts.push(this.humanize(system.type));
        if (system.paid !== undefined && system.paid !== "") parts.push(`Paid ${system.paid}`);
        return parts.join(" | ");
    }

    humanize(value) {
        return String(value ?? "")
            .replaceAll("_", " ")
            .replace(/\b\w/g, character => character.toUpperCase());
    }
}

export default MappingClass;
