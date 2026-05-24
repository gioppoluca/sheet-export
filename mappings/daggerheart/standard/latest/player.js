import baseMapping from "../../../../scripts/baseMapping.js";

/**
 * Sheet Export mapping for the Daggerheart system (player character).
 *
 * Target PDF: "Daggerheart PDF Character Sheet.pdf" (Daggerheart v1.2 Open Beta sheet).
 * The PDF form fields were renamed to semantic names matching the sheet layout.
 *
 * Built against the `daggerheart` system v2.2.x actor data model.
 */
class MappingClass extends baseMapping {

    authors = [
        {
            name: 'Sheet Export contributors',
            url: 'https://github.com/lizzard77/sheet-export',
            github: 'https://github.com/lizzard77/sheet-export',
        },
    ];

    /** Capitalize and de-camelCase a system key, e.g. "veryClose" -> "Very Close". */
    pretty(value) {
        if (!value) return '';
        return String(value)
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, c => c.toUpperCase())
            .trim();
    }

    /** Format a trait/modifier number with an explicit sign ("+2", "-1", "+0"). */
    signed(value) {
        const n = Number(value ?? 0);
        return (n >= 0 ? '+' : '') + n;
    }

    /** Build the "TRAIT & RANGE" string for a weapon item. */
    weaponTraitRange(weapon) {
        const trait = this.pretty(weapon?.system?.attack?.roll?.trait);
        const range = this.pretty(weapon?.system?.attack?.range);
        return [trait, range].filter(Boolean).join(' / ');
    }

    /** Convert description HTML to plain text without relying on Foundry's TextEditor. */
    stripHtml(html) {
        if (typeof html !== 'string' || !html) return '';
        const withBreaks = html
            .replace(/<li[^>]*>/gi, '• ')
            .replace(/<br\s*\/?>/gi, '\n')
            .replace(/<\/(p|div|li|tr|h[1-6])>/gi, '\n');
        const doc = new DOMParser().parseFromString(withBreaks, 'text/html');
        return (doc.body.textContent || '')
            .replace(/@(?:UUID|Compendium)\[[^\]]*\]\{([^}]+)\}/g, '$1')
            .replace(/[ \t]+\n/g, '\n')
            .replace(/\n{2,}/g, '\n')
            .trim();
    }

    /** Normalize a value that may be an Array, Set, string or undefined into an array. */
    toArray(value) {
        if (value == null) return [];
        if (typeof value === 'string') return [value];
        try { return Array.from(value); } catch { return []; }
    }

    /** Put `text` into two fields, splitting at a word boundary near `maxLen` chars. */
    setFeature(field1, field2, text, maxLen = 60) {
        const value = String(text ?? '').trim();
        if (value.length <= maxLen) {
            this.setCalculated(field1, value);
            this.setCalculated(field2, '');
            return;
        }
        let cut = value.lastIndexOf(' ', maxLen);
        if (cut <= 0) cut = maxLen;
        this.setCalculated(field1, value.slice(0, cut).trim());
        this.setCalculated(field2, value.slice(cut).trim());
    }

    /** Wrap item names into comma-separated lines no longer than `maxLen` chars. */
    wrapItems(itemNames, maxLen) {
        const lines = [];
        let line = '';
        for (const item of itemNames) {
            const candidate = line ? `${line}, ${item}` : item;
            if (!line || candidate.length <= maxLen) {
                line = candidate;
            } else {
                lines.push(line);
                line = item;
            }
        }
        if (line) lines.push(line);
        return lines.map((l, i) => (i < lines.length - 1 ? `${l},` : l));
    }

    /** Build the "DAMAGE DICE" string for a weapon item. */
    weaponDamage(weapon) {
        const part = weapon?.system?.attack?.damage?.parts?.hitPoints?.value;
        if (!part?.dice) return '';
        const prof = Number(this.actor.system?.proficiency ?? 1) || 1;
        const count = part.multiplier === 'prof' ? prof : (part.flatMultiplier ?? 1);
        const bonus = part.bonus ? ` + ${part.bonus}` : '';
        const types = this.toArray(weapon?.system?.attack?.damage?.parts?.hitPoints?.type)
            .map(t => this.pretty(t)).join(', ');
        return `${count}${part.dice}${bonus}${types ? ' ' + types : ''}`;
    }

    /**
     * Internal: render a feature list (weaponFeatures or armorFeatures) into a
     * readable string, resolving linked Active Effect descriptions (e.g. armor
     * "flexible" -> "+1 to Evasion").
     */
    _renderFeatures(item, list) {
        return this.toArray(list).map(f => {
            const label = this.pretty(typeof f === 'string' ? f : f?.value);
            if (!label) return '';
            const notes = [];
            for (const eid of this.toArray(f?.effectIds)) {
                const desc = this.stripHtml(item.effects?.get?.(eid)?.description);
                if (desc) notes.push(desc);
            }
            return notes.length ? `${label} (${notes.join('; ')})` : label;
        }).filter(Boolean).join(', ');
    }

    weaponFeatures(weapon) { return this._renderFeatures(weapon, weapon?.system?.weaponFeatures); }
    armorFeatures(armor)   { return this._renderFeatures(armor,  armor?.system?.armorFeatures); }

    /** Tick the first `amount` checkboxes of a `${prefix}_N` (1-based) sequence. */
    markBoxes(prefix, amount) {
        const n = Number(amount ?? 0);
        for (let i = 1; i <= n; i++) this.setCalculated(`${prefix}_${i}`, true);
    }

    async createMappings() {
        super.createMappings();

        this.pdfFiles.push({
            pdfUrl: '/modules/sheet-export/mappings/daggerheart/standard/Daggerheart PDF Character Sheet.pdf',
            nameDownload: `${this.actor.name ?? "character"}.pdf`,
            name: "Daggerheart PDF Character Sheet.pdf",
        });

        const sys = this.actor.system ?? {};
        const items = this.actor.items;

        // ---- Identity items -------------------------------------------------
        const classItem = items.find(i => i.type === 'class');
        const subclassItem = items.find(i => i.type === 'subclass');
        const ancestryItem = items.find(i => i.type === 'ancestry');
        const communityItem = items.find(i => i.type === 'community');

        // ---- Header ---------------------------------------------------------
        this.setCalculated("name", this.actor.name ?? '');
        this.setCalculated("pronouns", sys.biography?.characteristics?.pronouns ?? '');
        this.setCalculated("heritage",
            [ancestryItem?.name, communityItem?.name].filter(Boolean).join(' / '));
        this.setCalculated("subclass", subclassItem?.name ?? '');
        this.setCalculated("level", String(sys.levelData?.level?.current ?? ''));
        this.setCalculated("class", classItem?.name ?? '');
        // "header_box_2" is the unlabeled second top-left box - left empty.

        // ---- Evasion & Armor score (the two shields) ------------------------
        const activeArmor = items.find(i => i.type === 'armor' && i.system?.equipped);
        this.setCalculated("evasion", String(sys.evasion ?? ''));
        this.setCalculated("armor_score", String(activeArmor?.system?.armor?.max ?? ''));

        // ---- Traits ---------------------------------------------------------
        const traitEntries = [
            ['agility',   sys.traits?.agility],
            ['strength',  sys.traits?.strength],
            ['finesse',   sys.traits?.finesse],
            ['instinct',  sys.traits?.instinct],
            ['presence',  sys.traits?.presence],
            ['knowledge', sys.traits?.knowledge],
        ];
        for (const [key, trait] of traitEntries) {
            this.setCalculated(`trait_${key}`, this.signed(trait?.value));
            if (trait?.tierMarked) this.setCalculated(`trait_${key}_marked`, true);
        }

        // ---- Damage thresholds ---------------------------------------------
        // "threshold_minor" has no equivalent in the system data -> left empty.
        this.setCalculated("threshold_major", String(sys.damageThresholds?.major ?? ''));
        this.setCalculated("threshold_severe", String(sys.damageThresholds?.severe ?? ''));

        // ---- HP / Stress / Hope tracks & Proficiency (tick N boxes) ---------
        this.markBoxes("hp", sys.resources?.hitPoints?.value);
        this.markBoxes("stress", sys.resources?.stress?.value);
        this.markBoxes("hope", sys.resources?.hope?.value);
        this.markBoxes("proficiency", sys.proficiency);

        // ---- Experiences (5 rows) ------------------------------------------
        const experiences = Object.values(sys.experiences ?? {});
        for (let i = 0; i < 5; i++) {
            const exp = experiences.at(i);
            this.setCalculated(`experience_${i + 1}_name`, exp?.name ?? '');
            this.setCalculated(`experience_${i + 1}_value`, exp ? this.signed(exp.value) : '');
        }

        // ---- Gold (tick N boxes per denomination) ---------------------------
        // gold_hoards_* / gold_fortune_* / gold_extra_* have no system field.
        this.markBoxes("gold_handfuls", sys.gold?.handfuls);
        this.markBoxes("gold_bags", sys.gold?.bags);
        this.markBoxes("gold_chests", sys.gold?.chests);

        // ---- Active weapons -------------------------------------------------
        const weapons = items.filter(i => i.type === 'weapon');
        const primary = weapons.find(w => w.system?.equipped && !w.system?.secondary);
        const secondary = weapons.find(w => w.system?.equipped && w.system?.secondary);

        if (primary) {
            this.setCalculated("primary_weapon_name", primary.name ?? '');
            this.setCalculated("primary_weapon_trait_range", this.weaponTraitRange(primary));
            this.setCalculated("primary_weapon_damage", this.weaponDamage(primary));
            this.setFeature("primary_weapon_feature", "primary_weapon_feature_2",
                this.weaponFeatures(primary));
        }
        if (secondary) {
            this.setCalculated("secondary_weapon_name", secondary.name ?? '');
            this.setCalculated("secondary_weapon_trait_range", this.weaponTraitRange(secondary));
            this.setCalculated("secondary_weapon_damage", this.weaponDamage(secondary));
            this.setFeature("secondary_weapon_feature", "secondary_weapon_feature_2",
                this.weaponFeatures(secondary));
        }

        // ---- Active armor ---------------------------------------------------
        if (activeArmor) {
            this.setCalculated("active_armor_name", activeArmor.name ?? '');
            this.setCalculated("active_armor_base_score",
                String(activeArmor.system?.armor?.max ?? ''));
            this.setFeature("active_armor_feature", "active_armor_feature_2",
                this.armorFeatures(activeArmor));
        }

        // ---- Inventory (general gear: comma-separated, wrapped to 5 lines) --
        const gear = items.filter(i => ['loot', 'consumable'].includes(i.type));
        const gearNames = gear.map(it => {
            const qty = it?.system?.quantity;
            return `${it.name}${qty > 1 ? ` (x${qty})` : ''}`;
        }).filter(Boolean);
        const invLines = this.wrapItems(gearNames, 60);
        for (let i = 0; i < 5; i++) {
            // The last line absorbs any overflow.
            this.setCalculated(`inventory_${i + 1}`,
                i < 4 ? (invLines.at(i) ?? '') : invLines.slice(i).join(' '));
        }

        // ---- Inventory weapon (first non-equipped weapon) -------------------
        const invWeapon = weapons.find(w => !w.system?.equipped);
        if (invWeapon) {
            this.setCalculated("inventory_weapon_name", invWeapon.name ?? '');
            this.setCalculated("inventory_weapon_trait_range", this.weaponTraitRange(invWeapon));
            this.setCalculated("inventory_weapon_damage", this.weaponDamage(invWeapon));
            this.setFeature("inventory_weapon_feature", "inventory_weapon_feature_2",
                this.weaponFeatures(invWeapon));
        }

        // ---- Inventory armor (first non-equipped armor) ---------------------
        const invArmor = items.find(i => i.type === 'armor' && !i.system?.equipped);
        if (invArmor) {
            this.setCalculated("inventory_armor_name", invArmor.name ?? '');
            this.setCalculated("inventory_armor_base_score",
                String(invArmor.system?.armor?.max ?? ''));
            this.setFeature("inventory_armor_feature", "inventory_armor_feature_2",
                this.armorFeatures(invArmor));
        }

        // ---- Class feature box ----------------------------------------------
        // Class-sourced features plus the loadout of domain cards.
        const classFeatures = items
            .filter(i => i.type === 'feature' && i.system?.originItemType === 'class');
        // Feature headings are upper-cased to stand out (form fields can't do bold).
        const featureBlocks = classFeatures.map(feat =>
            `${(feat.name ?? '').toUpperCase()}\n${this.stripHtml(feat.system?.description)}`.trim());
        const domainCards = items.filter(i => i.type === 'domainCard');
        if (domainCards.length) {
            featureBlocks.push('DOMAIN CARDS: ' + domainCards.map(c => c.name).join(', '));
        }
        // Blank line between features (before each heading from the 2nd on);
        // blank lines *within* a description are already removed by stripHtml.
        this.setCalculated("class_feature", featureBlocks.join('\n\n'));
    }
}

export default MappingClass;
