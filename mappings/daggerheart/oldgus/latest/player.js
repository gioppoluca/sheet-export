import baseMapping from "../../../../scripts/baseMapping.js";

/**
 * Sheet Export mapping for the Daggerheart system (player character).
 *
 * Target PDF: "Old Gus' Unofficial Daggerheart Character Sheet" (fillable, 4 pages).
 * https://callmepartario.github.io/og-dhsrd/
 *
 * The PDF form fields already carry semantic names, so they are addressed directly.
 * "HP Max", "Stress Max", "Hope Max" and "Weapon N Type" are radio groups; the
 * option name is passed as the calculated value (module supports PDFRadioGroup).
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

    /** Convert description HTML to plain text without relying on Foundry's TextEditor. */
    stripHtml(html) {
        if (!html) return '';
        const withBreaks = String(html)
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

    /** Daggerheart tier for a given level (1 / 2-4 / 5-7 / 8-10). */
    tierFromLevel(level) {
        const l = Number(level ?? 1);
        return l >= 8 ? 4 : l >= 5 ? 3 : l >= 2 ? 2 : 1;
    }

    /** Build the "TRAIT AND RANGE" string for a weapon item. */
    weaponTraitRange(weapon) {
        const trait = this.pretty(weapon?.system?.attack?.roll?.trait);
        const range = this.pretty(weapon?.system?.attack?.range);
        return [trait, range].filter(Boolean).join(' / ');
    }

    /** Build the "DAMAGE AND TYPE" string for a weapon item. */
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
     * Build a readable feature string for a weapon/armor item.
     * `key` is "weaponFeatures" or "armorFeatures". Linked Active Effects are
     * resolved into their description (e.g. armor "flexible" -> "+1 to Evasion").
     */
    itemFeatures(item, key) {
        return this.toArray(item?.system?.[key]).map(f => {
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

    /** Compact "NAME: <description>" block for a feature item (heading upper-cased). */
    featureBlock(feat) {
        const name = (feat?.name ?? '').toUpperCase();
        const desc = this.stripHtml(feat?.system?.description);
        return desc ? `${name}: ${desc}` : name;
    }

    /** Tick the first `amount` checkboxes of a `${prefix} N` (1-based) sequence. */
    markBoxes(prefix, amount) {
        const n = Number(amount ?? 0);
        for (let i = 1; i <= n; i++) this.setCalculated(`${prefix} ${i}`, true);
    }

    async createMappings() {
        super.createMappings();

        this.pdfFiles.push({
            pdfUrl: '/modules/sheet-export/mappings/daggerheart/oldgus/old-gus-daggerheart-character-sheet-fillable.pdf',
            nameDownload: `${this.actor.name ?? "character"}.pdf`,
            name: "old-gus-daggerheart-character-sheet-fillable.pdf",
        });

        const sys = this.actor.system ?? {};
        const items = this.actor.items;

        const classItem = items.find(i => i.type === 'class');
        const subclassItem = items.find(i => i.type === 'subclass');
        const ancestryItem = items.find(i => i.type === 'ancestry');
        const communityItem = items.find(i => i.type === 'community');

        // ---- Identity -------------------------------------------------------
        this.setCalculated("Name", this.actor.name ?? '');
        this.setCalculated("Pronouns", sys.biography?.characteristics?.pronouns ?? '');
        this.setCalculated("Ancestry", ancestryItem?.name ?? '');
        this.setCalculated("Community", communityItem?.name ?? '');
        this.setCalculated("Class", classItem?.name ?? '');
        this.setCalculated("Subclass", subclassItem?.name ?? '');
        const level = sys.levelData?.level?.current;
        this.setCalculated("Level", String(level ?? ''));
        this.setCalculated("Tier", String(this.tierFromLevel(level)));
        this.setCalculated("Domains",
            this.toArray(classItem?.system?.domains).map(d => this.pretty(d)).join(', '));
        this.setCalculated("Spellcast Trait", this.pretty(subclassItem?.system?.spellcastingTrait));

        // ---- Traits ---------------------------------------------------------
        // The per-trait checkbox ("<Trait> Mark") flags the Spellcast Trait.
        const spellcastTrait = subclassItem?.system?.spellcastingTrait;
        for (const key of ['agility', 'strength', 'finesse', 'instinct', 'presence', 'knowledge']) {
            const trait = sys.traits?.[key];
            const label = key.charAt(0).toUpperCase() + key.slice(1);
            this.setCalculated(label, this.signed(trait?.value));
            if (key === spellcastTrait) this.setCalculated(`${label} Mark`, true);
        }

        // ---- Evasion / Armor / Damage thresholds ----------------------------
        const activeArmor = items.find(i => i.type === 'armor' && i.system?.equipped);
        this.setCalculated("Evasion", String(sys.evasion ?? ''));
        this.setCalculated("Armor", String(activeArmor?.system?.armor?.max ?? ''));
        this.setCalculated("Major Damage Threshold", String(sys.damageThresholds?.major ?? ''));
        this.setCalculated("Severe Damage Threshold", String(sys.damageThresholds?.severe ?? ''));

        // ---- HP / Stress / Hope / Proficiency / Armor slots (tick N boxes) --
        this.markBoxes("HP", sys.resources?.hitPoints?.value);
        this.markBoxes("Stress", sys.resources?.stress?.value);
        this.markBoxes("Hope", sys.resources?.hope?.value);
        this.markBoxes("Proficiency", sys.proficiency);
        this.markBoxes("Armor Slot", activeArmor?.system?.armor?.current);

        // Max-indicator radio groups (the highlighted slot marking each resource's max).
        const hpMax = sys.resources?.hitPoints?.max;
        if (hpMax) this.setCalculated("HP Max", String(hpMax));
        const stressMax = sys.resources?.stress?.max;
        if (stressMax) this.setCalculated("Stress Max", String(stressMax));
        const hopeMax = sys.resources?.hope?.max;
        if (hopeMax) this.setCalculated("Hope Max", String(hopeMax));

        // ---- Experiences (5 rows) ------------------------------------------
        const experiences = Object.values(sys.experiences ?? {});
        for (let i = 0; i < 5; i++) {
            const exp = experiences[i];
            this.setCalculated(`Experience ${i + 1}`, exp?.name ?? '');
            this.setCalculated(`Experience ${i + 1} Bonus`, exp ? this.signed(exp.value) : '');
        }

        // ---- Gold -----------------------------------------------------------
        this.setCalculated("Gold, Handfuls", String(sys.gold?.handfuls ?? ''));
        this.setCalculated("Gold, Bags", String(sys.gold?.bags ?? ''));
        this.setCalculated("Gold, Chests", String(sys.gold?.chests ?? ''));
        this.setCalculated("Gold, Coins", String(sys.gold?.coins ?? ''));
        // "Gold, Stashed" has no system equivalent -> left empty.

        // ---- Weapons (up to 4: primary, secondary, then the rest) ----------
        const weapons = items.filter(i => i.type === 'weapon');
        const orderedWeapons = [
            ...weapons.filter(w => w.system?.equipped && !w.system?.secondary),
            ...weapons.filter(w => w.system?.equipped && w.system?.secondary),
            ...weapons.filter(w => !w.system?.equipped),
        ];
        for (let i = 0; i < 4; i++) {
            const w = orderedWeapons[i];
            if (!w) continue;
            const n = i + 1;
            this.setCalculated(`Weapon ${n} Label`, w.name ?? '');
            this.setCalculated(`Weapon ${n} Trait and Range`, this.weaponTraitRange(w));
            this.setCalculated(`Weapon ${n} Damage and Type`, this.weaponDamage(w));
            this.setCalculated(`Weapon ${n} Feature`, this.itemFeatures(w, 'weaponFeatures'));
            if (w.system?.equipped) this.setCalculated(`Weapon ${n} Active`, true);
            this.setCalculated(`Weapon ${n} Hand 1`, true);
            if (w.system?.burden === 'twoHanded') this.setCalculated(`Weapon ${n} Hand 2`, true);
            this.setCalculated(`Weapon ${n} Type`, w.system?.secondary ? 'Secondary' : 'Primary');
        }

        // ---- Armor ----------------------------------------------------------
        if (activeArmor) {
            this.setCalculated("Armor Label", activeArmor.name ?? '');
            const bt = activeArmor.system?.baseThresholds;
            this.setCalculated("Armor Base Thresholds",
                bt ? `${bt.major ?? ''} / ${bt.severe ?? ''}` : '');
            this.setCalculated("Base Armor Score", String(activeArmor.system?.armor?.max ?? ''));
            this.setCalculated("Armor Feature", this.itemFeatures(activeArmor, 'armorFeatures'));
        }

        // ---- Features -------------------------------------------------------
        const hopeFeature = items.find(i => i.type === 'feature' && i.system?.identifier === 'hope');
        if (hopeFeature) {
            this.setCalculated("Class Hope Feature", this.featureBlock(hopeFeature));
        }
        // Subclass features unlock progressively with the subclass' featureState
        // (foundation >= 1, specialization >= 2, mastery >= 3); locked ones exist
        // as items on the actor but are hidden on the in-app sheet.
        const subclassState = Number(subclassItem?.system?.featureState ?? 0);
        const subclassUnlock = { foundation: 1, specialization: 2, mastery: 3 };
        const classSubFeatures = items.filter(i => {
            if (i.type !== 'feature' || i.system?.identifier === 'hope') return false;
            const origin = i.system?.originItemType;
            if (origin === 'class') return true;
            if (origin === 'subclass') {
                return subclassState >= (subclassUnlock[i.system?.identifier] ?? 1);
            }
            return false;
        });
        this.setCalculated("Class and Subclass Features",
            classSubFeatures.map(f => this.featureBlock(f)).join('\n\n'));

        const heritageFeatures = items.filter(i => i.type === 'feature'
            && ['ancestry', 'community'].includes(i.system?.originItemType));
        this.setCalculated("Heritage Features",
            heritageFeatures.map(f => this.featureBlock(f)).join('\n\n'));

        // ---- Inventory ------------------------------------------------------
        const gear = items.filter(i => ['loot', 'consumable'].includes(i.type));
        const gearNames = gear.map(it => {
            const qty = it?.system?.quantity;
            return `${it.name}${qty > 1 ? ` (x${qty})` : ''}`;
        }).filter(Boolean);
        this.setCalculated("Inventory", gearNames.slice(0, 14).join('\n'));
        this.setCalculated("Inventory (Continued)", gearNames.slice(14).join('\n'));

        // ---- Domain cards (up to 18) ---------------------------------------
        const domainCards = items.filter(i => i.type === 'domainCard');
        for (let i = 0; i < 18; i++) {
            const card = domainCards[i];
            if (!card) continue;
            const n = i + 1;
            this.setCalculated(`Domain Card ${n}, Name`, card.name ?? '');
            this.setCalculated(`Domain Card ${n}, Recall Cost`, String(card.system?.recallCost ?? ''));
            this.setCalculated(`Domain Card ${n}, Level`, String(card.system?.level ?? ''));
            this.setCalculated(`Domain Card ${n}, Domain`, this.pretty(card.system?.domain));
            this.setCalculated(`Domain Card ${n}, Type`, this.pretty(card.system?.type));
            this.setCalculated(`Domain Card ${n}, Effects`, this.stripHtml(card.system?.description));
            if (card.system?.inVault === false) {
                this.setCalculated(`Domain Card ${n}, Loadout`, true);
            }
        }

        // ---- Notes ----------------------------------------------------------
        const background = this.stripHtml(sys.biography?.background);
        const connections = this.stripHtml(sys.biography?.connections);
        this.setCalculated("Notes", [background, connections].filter(Boolean).join('\n\n'));
    }
}

export default MappingClass;
