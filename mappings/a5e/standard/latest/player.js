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
            pdfUrl: '/modules/sheet-export/mappings/a5e/Level_Up_CharSheet.pdf',
            nameDownload: `${this.actor.name ?? "character"}.pdf`,
            name: "Level_Up_CharSheet.pdf",
        });


        this.setImage(this.actor.img, 2, 30, 510, 260, 120);

        const sys = this.actor.system ?? {};
        const det = sys.details ?? {};
        const attr = sys.attributes ?? {};
        const abl = sys.abilities ?? {};
        const skl = sys.skills ?? {};
        const profs = sys.proficiencies ?? {};
        const bonuses = sys.bonuses ?? {};
        const findLabelByKey = (data, targetKey) => {
            for (const [key, value] of Object.entries(data)) {
                if (typeof value === "string") {
                    if (key === targetKey) {
                        return value;
                    }
                } else if (typeof value === "object" && value !== null) {
                    const found = findLabelByKey(value, targetKey);
                    if (found) {
                        return found;
                    }
                }
            }
            return undefined;
        }
        const setList = (labelPrefix, arr, startIdx = 1, maxCount = 12) => {
            const list = Array.isArray(arr) ? arr : [];
            for (let i = 0; i < Math.min(list.length, maxCount); i++) {
                this.setCalculated(`${labelPrefix} ${startIdx + i}`, `${list[i]}`);
            }
            // blank out the rest (optional)
        };
        const setListDecoded = (labelPrefix, arr, startIdx = 1, maxCount = 12, data) => {
            const list = Array.isArray(arr) ? arr : [];
            for (let i = 0; i < Math.min(list.length, maxCount); i++) {
                let decoded = findLabelByKey(data, list[i]);
                this.setCalculated(`${labelPrefix} ${startIdx + i}`, `${decoded}`);
            }
            // blank out the rest (optional)
        };


        this.setCalculated("Maximum Hit Points", sys.attributes.hp.value ?? 0);
        this.setCalculated("Current Hit Points", sys.attributes.hp.value ?? 0);
        this.setCalculated("Temporary Hit Points", String(sys.attributes.hp.temp ?? 0));
        const maneuvers = (this.actor.items ?? []).filter(it => it.type === 'maneuver');
        const MAX_MAN = 11; // adjust to your PDF’s capacity
        for (let i = 0; i < MAX_MAN; i++) {
            const manLabel = `Maneuver ${i + 1}`;
            const exLabel = `Exertion Cost ${i + 1}`;
            const actLabel = `Activation ${i + 1}`;
            const it = maneuvers[i];
            this.setCalculated(manLabel, it ? it.name : "");
            this.setCalculated(exLabel, it ? it.system.exertionCost : "");
            //const actString = it?.actions?.default?.activation?.type == "" ? `${it.actions.default.activation.cost} ${game.a5e.config.abilityActivationTypes["action"]}` : `${it.actions.default.activation.cost} ${game.a5e.config.abilityActivationTypes[it.system.actions.default.activation.type]}`;
            const actString = it?.actions?.default?.activation?.type ? `${it.actions.default.activation.cost} ${game.a5e.config.abilityActivationTypes[it.actions.default.activation.type]}` : "";
            this.setCalculated(actLabel, it ? actString : "");
        }
        this.setCalculated("Character Name", this.actor.name ?? "");
        const heritage = (this.actor.items ?? []).find(i => i.type === 'heritage')?.name ?? '';
        this.setCalculated("Heritage", heritage);
        const background = (this.actor.items ?? []).find(i => i.type === 'background')?.name ?? '';
        this.setCalculated("Background", background);
        const culture = (this.actor.items ?? []).find(i => i.type === 'culture')?.name ?? '';
        this.setCalculated("Culture", culture);
        const destiny = (this.actor.items ?? []).find(i => i.type === 'destiny');
        this.setCalculated("Destiny", destiny ? destiny.name : "");
        this.setCalculated("Experience Points", sys.details.xp ?? 0);

        const classesObj = this.actor.classes ?? {};    // authoritative source (user request)

        const entries = Object.values(classesObj).map(c => {
            // Try levels directly on the classes entry, then fall back to item/system
            const name = c?.name ?? "";
            const levels = Number(c?.classLevels)
            const archetype = c?.archetype?.name ?? "";
            const slug = c.slug;
            const hd = c.hitDice;

            return { name, levels, archetype, hd, slug };
        });
        const classLevelString = entries.map(e => `${e.name} ${e.levels} ${e.archetype}`).join(' / ');
        this.setCalculated("Class, Level & Archetyoe", classLevelString);

        this.setCalculated("Strength", sys.abilities.str.value);
        this.setCalculated("Dexterity", sys.abilities.dex.value);
        this.setCalculated("Constitution", sys.abilities.con.value);
        this.setCalculated("Intelligence", sys.abilities.int.value);
        this.setCalculated("Wisdom", sys.abilities.wis.value);
        this.setCalculated("Charisma", sys.abilities.cha.value);

        this.setCalculated("STR", sys.abilities.str.mod);
        this.setCalculated("STR Save", sys.abilities.str.save.mod);

        this.setCalculated("DEX Save", sys.abilities.dex.save.mod);
        this.setCalculated("DEX", sys.abilities.dex.mod);
        this.setCalculated("CON Save", sys.abilities.con.save.mod);
        this.setCalculated("CON", sys.abilities.con.mod);


        this.setCalculated("INT", sys.abilities.int.mod);
        this.setCalculated("INT Save", sys.abilities.int.save.mod);

        this.setCalculated("WIS", sys.abilities.wis.mod);
        this.setCalculated("WIS Save", sys.abilities.wis.save.mod);

        this.setCalculated("CHR", sys.abilities.cha.mod);
        this.setCalculated("CHR Save", sys.abilities.cha.save.mod);
        this.setCalculated("Proficiency Bonus", attr.prof ?? 0);
        this.setCalculated("Armor Class", attr.ac.value ?? 10);
        const sizeMap = { tiny: "Tiny", sm: "Small", med: "Medium", lg: "Large", huge: "Huge", grg: "Gargantuan" };
        this.setCalculated("Size", sizeMap[sys.traits?.size] ?? "Medium");

        // Pull main walk speed: prefer explicit movement bonus (your JSON uses it), else attributes
        const getWalkSpeed = () => {
            // bonuses.movement: entries keyed by id; pick one with movementTypes including "walk"
            const bonusMove = Object.values(bonuses.movement ?? {}).find(b => b?.context?.movementTypes?.includes("walk"));
            if (bonusMove?.formula) return `${bonusMove.formula} ft`;
            const walk = attr.movement?.walk?.distance ?? 0;
            return `${walk} ft`;
        };
        this.setCalculated("Speed", getWalkSpeed());

        this.setCalculated("Total HD", this.actor.HitDiceManager.max);
        console.log(entries)
        const hdString = entries.map(e => `d${e.hd.size}`).join(' / ');
        this.setCalculated("Hit Die", hdString);
        this.setCalculated("STR Save Prof", sys.abilities.str.save.proficient);
        this.setCalculated("DEX Save Prof", sys.abilities.dex.save.proficient);
        this.setCalculated("CON Save Prof", sys.abilities.con.save.proficient);
        this.setCalculated("INT Save Prof", sys.abilities.int.save.proficient);
        this.setCalculated("WIS Save Prof", sys.abilities.wis.save.proficient);
        this.setCalculated("CHR Save Prof", sys.abilities.cha.save.proficient);

        this.setCalculated("Death Save Success 1", (sys.attributes.death?.success ?? 0) >= 1 ? 1 : 0);
        this.setCalculated("Death Save Success 2", (sys.attributes.death?.success ?? 0) >= 2 ? 1 : 0);
        this.setCalculated("Death Save Success 3", (sys.attributes.death?.success ?? 0) >= 3 ? 1 : 0);
        this.setCalculated("Death Save Failure 1", (sys.attributes.death?.failure ?? 0) >= 1 ? 1 : 0);
        this.setCalculated("Death Save Failure 2", (sys.attributes.death?.failure ?? 0) >= 2 ? 1 : 0);
        this.setCalculated("Death Save Failure 3", (sys.attributes.death?.failure ?? 0) >= 3 ? 1 : 0);
        this.setCalculated("Fatigue 1", (sys.attributes.fatigue ?? 0) >= 1 ? 1 : 0);
        this.setCalculated("Fatigue 2", (sys.attributes.fatigue ?? 0) >= 2 ? 1 : 0);
        this.setCalculated("Fatigue 3", (sys.attributes.fatigue ?? 0) >= 3 ? 1 : 0);
        this.setCalculated("Fatigue 4", (sys.attributes.fatigue ?? 0) >= 4 ? 1 : 0);
        this.setCalculated("Fatigue 5", (sys.attributes.fatigue ?? 0) >= 5 ? 1 : 0);
        this.setCalculated("Fatigue 6", (sys.attributes.fatigue ?? 0) >= 6 ? 1 : 0);
        this.setCalculated("Fatigue 7", (sys.attributes.fatigue ?? 0) >= 7 ? 1 : 0);
        this.setCalculated("Supply", sys.supply);
        //this.setCalculated("Max Carried", this.actor.SOMETHING + "Max Carried");
        this.setCalculated("Inspiration Feature", "");

        this.setCalculated("Passive Insight", String(sys.skills.ins.passive ?? 0));
        this.setCalculated("Passive Perception", String(sys.skills.prc.passive ?? 0));
        this.setCalculated("Passive Stealth", String(sys.skills.ste.passive ?? 0));
        this.setCalculated("Passive Skill", "");
        this.setCalculated("New Passive Skill", "");

        const SKILL_LABELS = game.a5e.config.skills;
        const expDice = game.a5e.config.expertiseDiceSidesMap;
        const skills = this.actor.system.skills ?? {};
        for (const [key, label] of Object.entries(SKILL_LABELS)) {
            const k = skills[key] ?? {};
            const modBonus = abl[k.ability]?.mod ?? 0;
            const expDie = expDice[k.expertiseDice] > 0 ? `d${expDice[k.expertiseDice]}` : "";

            this.setCalculated(`${label} Skill Proficiency`, k.proficient);
            this.setCalculated(`${label} Expertise Die`, expDie);
            this.setCalculated(`${label} Specialty`, `${k.mod + modBonus}`);
        }
        setListDecoded("Tool Proficiencies", profs.tools ?? [], 1, 6, game.a5e.config.tools);
        this.setCalculated("Strife 1", (sys.attributes.strife ?? 0) >= 1 ? 1 : 0);
        this.setCalculated("Strife 2", (sys.attributes.strife ?? 0) >= 2 ? 1 : 0);
        this.setCalculated("Strife 3", (sys.attributes.strife ?? 0) >= 3 ? 1 : 0);
        this.setCalculated("Strife 4", (sys.attributes.strife ?? 0) >= 4 ? 1 : 0);
        this.setCalculated("Strife 5", (sys.attributes.strife ?? 0) >= 5 ? 1 : 0);
        this.setCalculated("Strife 6", (sys.attributes.strife ?? 0) >= 6 ? 1 : 0);
        this.setCalculated("Strife 7", (sys.attributes.strife ?? 0) >= 7 ? 1 : 0);
        setList("Languages Other Proficiencies", profs.languages ?? [], 1, 2);

        const features = (this.actor.items ?? []).filter(it => it.type === 'feature');
        const MAX = 19; // adjust to your PDF’s capacity
        for (let i = 0; i < MAX; i++) {
            const label = `Features  Traits ${i + 1}`;
            const it = features[i];
            this.setCalculated(label, it ? it.name : "");
        }


        // --- Destiny & Inspiration ---

        this.setCalculated("Source of Inspiration", "");

        this.setCalculated("Fulfillment Feature", "");

        // --- Class & Combat Resources ---
        this.setCalculated("Traditions Known", (sys.proficiencies?.traditions ?? []).join(", "));

        // Maneuvers Known: explicit count isn't always in data, can use list length
        const maneuverCount = (this.actor.items ?? []).filter(i => i.type === 'maneuver').length;
        this.setCalculated("Maneuvers Known", maneuverCount);

        this.setCalculated("Exertion Points", String(attr.prof * 2));

        // --- Exploration Knacks ---
        // Assuming knacks are features with 'knack' in the name or specific type. 
        // Adjust filter as needed for A5e specific Knack types.
        const knacks = (this.actor.items ?? []).filter(i => i.type === 'feature' && i.name.toLowerCase().includes('knack'));
        for (let i = 0; i < 6; i++) {
//            this.setCalculated(`Exploration Knacks ${i + 1}`, knacks[i] ? knacks[i].name : "");
            // If there is a description field:
//            this.setCalculated(`Knack Description ${i + 1}`, knacks[i] ? knacks[i].system.description : "");
        }
        // Appearance / bio bits
        this.setCalculated("Age", sys.details.age ?? "");
        this.setCalculated("Height", sys.details.height ?? "");
        this.setCalculated("Weight", sys.details.weight ?? "");
        this.setCalculated("Eyes", sys.details.eyeColor ?? "");
        this.setCalculated("Skin", sys.details.skinColor ?? "");
        this.setCalculated("Hair", sys.details.hairColor ?? "");
        this.setCalculated("Character Backstory", this.htmlToText(sys.details.bio ?? ""));
        /*
        this.setCalculated("Character Appearance_af_image", this.actor.SOMETHING + "Character Appearance_af_image");
        this.setCalculated("Name 1", this.actor.SOMETHING + "Name 1");
        this.setCalculated("Ability 1", this.actor.SOMETHING + "Ability 1");
        this.setCalculated("Ability 1-2", this.actor.SOMETHING + "Ability 1-2");
        this.setCalculated("Name 2", this.actor.SOMETHING + "Name 2");
        this.setCalculated("Ability 2", this.actor.SOMETHING + "Ability 2");
        this.setCalculated("Name 3", this.actor.SOMETHING + "Name 3");
        this.setCalculated("Type 3", this.actor.SOMETHING + "Type 3");
        this.setCalculated("Type 2", this.actor.SOMETHING + "Type 2");
        this.setCalculated("Ability 3", this.actor.SOMETHING + "Ability 3");
        this.setCalculated("Name 4", this.actor.SOMETHING + "Name 4");
        this.setCalculated("Type 4", this.actor.SOMETHING + "Type 4");
        this.setCalculated("Ability 4", this.actor.SOMETHING + "Ability 4");
        this.setCalculated("Ability 2-2", this.actor.SOMETHING + "Ability 2-2");
        this.setCalculated("Ability 3-2", this.actor.SOMETHING + "Ability 3-2");
        this.setCalculated("Ability 4-2", this.actor.SOMETHING + "Ability 4-2");
        this.setCalculated("Bulky 1", this.actor.SOMETHING + "Bulky 1");
        this.setCalculated("Bulky 2", this.actor.SOMETHING + "Bulky 2");
        this.setCalculated("Bulky 3", this.actor.SOMETHING + "Bulky 3");
        this.setCalculated("Bulky 4", this.actor.SOMETHING + "Bulky 4");
        this.setCalculated("Bulky 5", this.actor.SOMETHING + "Bulky 5");
        this.setCalculated("Bulky 6", this.actor.SOMETHING + "Bulky 6");
        this.setCalculated("Bulky 7", this.actor.SOMETHING + "Bulky 7");
        this.setCalculated("Bulky 8", this.actor.SOMETHING + "Bulky 8");
        this.setCalculated("Max Bulky", this.actor.SOMETHING + "Max Bulky");
        this.setCalculated("Allies & Organizations", this.actor.SOMETHING + "Allies & Organizations");
        this.setCalculated("Treasure", this.actor.SOMETHING + "Treasure");
        this.setCalculated("Treasure 2", this.actor.SOMETHING + "Treasure 2");
        */
        this.setCalculated("CP", String(sys.currency.cp));
        this.setCalculated("SP", String(sys.currency.sp));
        this.setCalculated("EP", String(sys.currency.ep));
        this.setCalculated("GP", String(sys.currency.gp));
        this.setCalculated("PP", String(sys.currency.pp));
        //this.setCalculated("Spellcasting Class", this.actor.SOMETHING + "Spellcasting Class");
        this.setCalculated("Casting Ability", sys.attributes.spellcasting);
        this.setCalculated("Maneuver Save DC", `${8 + attr.prof + sys.abilities.str.save.mod}/${8 + attr.prof + sys.abilities.dex.save.mod}`);
        this.setCalculated("Spell Save DC", sys.attributes.spellDC);
        let spellAttack = attr.prof + (sys.abilities[sys.attributes.spellcasting]?.mod ?? 0);
        this.setCalculated("Spell Attack Bonus", spellAttack);
        this.setCalculated("Spell Points", sys.spellResources.points.max);
        /*
        this.setCalculated("0 Spell 1", this.actor.SOMETHING + "0 Spell 1");
        this.setCalculated("0 Spell 2", this.actor.SOMETHING + "0 Spell 2");
        this.setCalculated("0 Spell 3", this.actor.SOMETHING + "0 Spell 3");
        this.setCalculated("0 Spell 4", this.actor.SOMETHING + "0 Spell 4");
        this.setCalculated("0 Spell 5", this.actor.SOMETHING + "0 Spell 5");
        this.setCalculated("0 Spell 6", this.actor.SOMETHING + "0 Spell 6");
        this.setCalculated("0 Spell 7", this.actor.SOMETHING + "0 Spell 7");
        this.setCalculated("0 Spell 8", this.actor.SOMETHING + "0 Spell 8");
        this.setCalculated("page # 0-1", this.actor.SOMETHING + "page # 0-1");
        this.setCalculated("page # 0-2", this.actor.SOMETHING + "page # 0-2");
        this.setCalculated("page # 0-3", this.actor.SOMETHING + "page # 0-3");
        this.setCalculated("page # 0-4", this.actor.SOMETHING + "page # 0-4");
        this.setCalculated("page # 0-5", this.actor.SOMETHING + "page # 0-5");
        this.setCalculated("page # 0-6", this.actor.SOMETHING + "page # 0-6");
        this.setCalculated("page # 0-7", this.actor.SOMETHING + "page # 0-7");
        this.setCalculated("page # 0-8", this.actor.SOMETHING + "page # 0-8");
        */
        //let spell_slot = game.a5e.config.SPELL_SLOT_TABLE[]
        for (let lvl = 1; lvl <= 9; lvl++) {
            const slots = sys.spellResources?.slots?.[lvl]?.max ?? 0;
            const used = (sys.spellResources?.slots?.[lvl]?.max ?? 0) - (sys.spellResources?.slots?.[lvl]?.current ?? 0);
            this.setCalculated(`${lvl} Slots`, String(slots));
            this.setCalculated(`${lvl} Expended`, String(used));
            // Known/Prepared counts aren’t directly stored at top level; leave “Known” blank unless you track it elsewhere
            // this.setCalculated(`${lvl} Known`, "");
            // TODO this will work for warlock but probably not for all casters
            console.log(entries)
            if (entries.some(e => e.slug === "warlock")) {
                const warlockSlots = sys.spellResources?.slots?.pact?.max ?? 0;
                const warlockUsed = (sys.spellResources?.slots?.pact?.max ?? 0) - (sys.spellResources?.slots?.pact?.current ?? 0);
                this.setCalculated(`${lvl} Known`, "cost: " + game.a5e.config.spellLevelCost[lvl]);
                //                this.setCalculated(`${lvl} Prepared`, String(warlockUsed));
            } else {
                this.setCalculated(`${lvl} Known`, "");
                this.setCalculated(`${lvl} Prepared`, "");
            }
        }
        // --- Attacks & Weapons ---
        // Filter for weapons. You might also want to include items with an attack roll.
        const weapons = (this.actor.items ?? []).filter(i => i.type === 'object' && i.system.objectType === 'weapon');

        for (let i = 0; i < 7; i++) {
            const w = weapons[i];
            const baseLabel = i + 1;

            if (w) {
                console.log(w)
                // Get the first action that has an attack or damage roll
                const actions = Object.values(w.system.actions ?? {});
                const primaryAction = actions.find(a =>
                    Object.values(a.rolls ?? {}).some(r => r.type === 'attack' || r.type === 'damage')
                );

                // Notes -> Weapon Name
                this.setCalculated(`Attack ${baseLabel}`, w.name);

                if (primaryAction) {
                    console.log(primaryAction)
                    // Range
                    const rangeParts = [];
                    if (primaryAction.ranges) {
                        Object.values(primaryAction.ranges).forEach(r => {
                            if (r.range) rangeParts.push(r.range);
                        });
                    }
                    this.setCalculated(`Range ${baseLabel}`, rangeParts.join("/"));

                    // Damage Type (and Formula)
                    const damageRoll = Object.values(primaryAction.rolls ?? {}).find(r => r.type === 'damage');
                    if (damageRoll) {
                        const dmgString = `${damageRoll.formula} ${damageRoll.damageType}`;
                        this.setCalculated(`DamageType ${baseLabel}`, dmgString);
                    } else {
                        this.setCalculated(`DamageType ${baseLabel}`, "");
                    }

                    // Attack Bonus 
                    // Note: A5e calculates this dynamically. Without the engine, we can check for a flat bonus 
                    // or default to the ability mod used. For now, we leave it blank or map a specific bonus field if you have one.
                    const attackRoll = Object.values(primaryAction.rolls ?? {}).find(r => r.type === 'attack');
                    console.log(attackRoll)
                    let abilityKey = attackRoll.ability;
                    console.log(abilityKey)
                    // 1. Resolve "default" ability
                    if (abilityKey === 'default') {
                        const props = w.system.weaponProperties ?? [];
                        // If Finesse (or Range, for bows/crossbows) is present, use DEX. Else STR.
                        if (props.includes('finesse') || props.includes('range')) {
                            abilityKey = 'dex';
                        } else {
                            abilityKey = 'str';
                        }
                    }
                    console.log(abilityKey)
                    // 2. Get Modifier (Safely)
                    // Uses .mod if available, otherwise calculates from .value
                    const abilityObj = sys.abilities[abilityKey] || {};
                    //const val = abilityObj.value ?? 10;
                    const abilityMod = Number(abilityObj.mod);
                    let finalAttBonus = attr.prof + Number(attackRoll.bonus) + abilityMod
                    console.log(attr, abilityMod, finalAttBonus, attackRoll.bonus)
                    if (attackRoll) {
                        //if (typeof attackRoll.bonus === 'number' && attackRoll.bonus !== 0) {
                        this.setCalculated(`Atk Bonus ${baseLabel}`, `${finalAttBonus}`);
                    } else {
                        // If no flat bonus, leave blank or implement ability mod lookup if desired
                        this.setCalculated(`Atk Bonus ${baseLabel}`, "");
                    }
                    //this.setCalculated(`Atk Bonus ${baseLabel}`, ""); 
                }
            } else {
                // Clear fields if no weapon exists for this slot
                this.setCalculated(`Atk Bonus ${baseLabel}`, "");
                this.setCalculated(`DamageType ${baseLabel}`, "");
                this.setCalculated(`Range ${baseLabel}`, "");
                this.setCalculated(`Notes ${baseLabel}`, "");
            }
        }

        // --- Spells ---
        // Filter items for spells
        const spells = (this.actor.items ?? []).filter(i => i.type === 'spell');
        const spellsByLevel = {};

        // Group by level
        spells.forEach(s => {
            const lvl = s.system.level ?? 0;
            if (!spellsByLevel[lvl]) spellsByLevel[lvl] = [];
            spellsByLevel[lvl].push(s);
        });

        // Loop through levels 0 to 9
        for (let level = 0; level <= 9; level++) {
            const levelSpells = spellsByLevel[level] || [];
            // Determine the max number of slots per level in your PDF (e.g., 12 for level 1, etc.)
            // Adjust these limits based on your specific PDF fields
            let maxSlots = 12;
            if (level === 0) maxSlots = 8; // Cantrips usually have fewer slots

            for (let i = 0; i < maxSlots; i++) {
                const spell = levelSpells[i];
                const prefix = `${level} Spell ${i + 1}`;
                //                const pagePrefix = `page # ${level}-${i + 1}`;

                if (spell) {
                    this.setCalculated(prefix, spell.name);
                    // Map schools or components to "page" if page number isn't available
                    const school = spell.system.schools?.primary ?? "";
                    //                  this.setCalculated(pagePrefix, school); 
                } else {
                    this.setCalculated(prefix, "");
                    //                this.setCalculated(pagePrefix, "");
                }
            }
        }

        // --- Inventory ---
        const gear = (this.actor.items ?? []).filter(i => i.type === 'object');

        for (let i = 0; i < 12; i++) {
            const item = gear[i];
            const idx = i + 1;

            if (item) {
                this.setCalculated(`Item ${idx}`, item.name);
                this.setCalculated(`Wt ${idx}`, item.system.weight ?? 0);
//                this.setCalculated(`Type ${idx}`, item.system.objectType ?? "");

                // Map Rarity or Weapon Properties to "Properties"
                let props = item.system.rarity ?? "";
                if (item.system.weaponProperties && item.system.weaponProperties.length > 0) {
                    props = item.system.weaponProperties.join(", ");
                }
                this.setCalculated(`Properties ${idx}`, props);
            } else {
                this.setCalculated(`Item ${idx}`, "");
                this.setCalculated(`Wt ${idx}`, "");
                this.setCalculated(`Type ${idx}`, "");
                this.setCalculated(`Properties ${idx}`, "");
            }
        }

    }
}
export default MappingClass;

