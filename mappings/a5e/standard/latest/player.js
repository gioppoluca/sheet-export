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

        const sys = this.actor.system ?? {};
        const det = sys.details ?? {};
        const attr = sys.attributes ?? {};
        const abl = sys.abilities ?? {};
        const skl = sys.skills ?? {};
        const profs = sys.proficiencies ?? {};
        const bonuses = sys.bonuses ?? {};
        const setList = (labelPrefix, arr, startIdx = 1, maxCount = 12) => {
            const list = Array.isArray(arr) ? arr : [];
            for (let i = 0; i < Math.min(list.length, maxCount); i++) {
                this.setCalculated(`${labelPrefix} ${startIdx + i}`, `${list[i]}`);
            }
            // blank out the rest (optional)
        };

        const heritage = (this.actor.items ?? []).find(i => i.type === 'heritage')?.name ?? '';
        this.setCalculated("Maximum Hit Points", sys.attributes.hp.baseMax ?? 0);
        this.setCalculated("Current Hit Points", sys.attributes.hp.value ?? 0);
        this.setCalculated("Temporary Hit Points", sys.attributes.hp.temp ?? 0);
        this.setCalculated("Atk Bonus 1", this.actor.SOMETHING + "Atk Bonus 1");
        this.setCalculated("Atk Bonus 2", this.actor.SOMETHING + "Atk Bonus 2");
        this.setCalculated("Atk Bonus 3", this.actor.SOMETHING + "Atk Bonus 3");
        this.setCalculated("Atk Bonus 4", this.actor.SOMETHING + "Atk Bonus 4");
        this.setCalculated("Atk Bonus 5", this.actor.SOMETHING + "Atk Bonus 5");
        this.setCalculated("Atk Bonus 6", this.actor.SOMETHING + "Atk Bonus 6");
        this.setCalculated("Atk Bonus 7", this.actor.SOMETHING + "Atk Bonus 7");
        this.setCalculated("DamageType 1", this.actor.SOMETHING + "DamageType 1");
        this.setCalculated("DamageType 2", this.actor.SOMETHING + "DamageType 2");
        this.setCalculated("DamageType 3", this.actor.SOMETHING + "DamageType 3");
        this.setCalculated("DamageType 4", this.actor.SOMETHING + "DamageType 4");
        this.setCalculated("DamageType 5", this.actor.SOMETHING + "DamageType 5");
        this.setCalculated("DamageType 6", this.actor.SOMETHING + "DamageType 6");
        this.setCalculated("DamageType 7", this.actor.SOMETHING + "DamageType 7");
        this.setCalculated("Range 1", this.actor.SOMETHING + "Range 1");
        this.setCalculated("Range 2", this.actor.SOMETHING + "Range 2");
        this.setCalculated("Range 3", this.actor.SOMETHING + "Range 3");
        this.setCalculated("Range 4", this.actor.SOMETHING + "Range 4");
        this.setCalculated("Range 5", this.actor.SOMETHING + "Range 5");
        this.setCalculated("Range 6", this.actor.SOMETHING + "Range 6");
        this.setCalculated("Range 7", this.actor.SOMETHING + "Range 7");
        this.setCalculated("Notes 1", this.actor.SOMETHING + "Notes 1");
        this.setCalculated("Notes 2", this.actor.SOMETHING + "Notes 2");
        this.setCalculated("Notes 3", this.actor.SOMETHING + "Notes 3");
        this.setCalculated("Notes 4", this.actor.SOMETHING + "Notes 4");
        this.setCalculated("Notes 5", this.actor.SOMETHING + "Notes 5");
        this.setCalculated("Notes 6", this.actor.SOMETHING + "Notes 6");
        this.setCalculated("Notes 7", this.actor.SOMETHING + "Notes 7");
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
        /*
                this.setCalculated("Maneuver 1", this.actor.SOMETHING + "Maneuver 1");
                this.setCalculated("Maneuver 2", this.actor.SOMETHING + "Maneuver 2");
                this.setCalculated("Maneuver 3", this.actor.SOMETHING + "Maneuver 3");
                this.setCalculated("Maneuver 4", this.actor.SOMETHING + "Maneuver 4");
                this.setCalculated("Maneuver 5", this.actor.SOMETHING + "Maneuver 5");
                this.setCalculated("Maneuver 6", this.actor.SOMETHING + "Maneuver 6");
                this.setCalculated("Maneuver 7", this.actor.SOMETHING + "Maneuver 7");
                this.setCalculated("Maneuver 8", this.actor.SOMETHING + "Maneuver 8");
                this.setCalculated("Maneuver 9", this.actor.SOMETHING + "Maneuver 9");
                this.setCalculated("Maneuver 10", this.actor.SOMETHING + "Maneuver 10");
                this.setCalculated("Maneuver 11", this.actor.SOMETHING + "Maneuver 11");
                this.setCalculated("Exertion Cost 1", this.actor.SOMETHING + "Exertion Cost 1");
                this.setCalculated("Exertion Cost 2", this.actor.SOMETHING + "Exertion Cost 2");
                this.setCalculated("Exertion Cost 3", this.actor.SOMETHING + "Exertion Cost 3");
                this.setCalculated("Exertion Cost 4", this.actor.SOMETHING + "Exertion Cost 4");
                this.setCalculated("Exertion Cost 5", this.actor.SOMETHING + "Exertion Cost 5");
                this.setCalculated("Exertion Cost 6", this.actor.SOMETHING + "Exertion Cost 6");
                this.setCalculated("Exertion Cost 7", this.actor.SOMETHING + "Exertion Cost 7");
                this.setCalculated("Exertion Cost 8", this.actor.SOMETHING + "Exertion Cost 8");
                this.setCalculated("Exertion Cost 9", this.actor.SOMETHING + "Exertion Cost 9");
                this.setCalculated("Exertion Cost 10", this.actor.SOMETHING + "Exertion Cost 10");
                this.setCalculated("Exertion Cost 11", this.actor.SOMETHING + "Exertion Cost 11");
                this.setCalculated("Activation 1", this.actor.SOMETHING + "Activation 1");
                this.setCalculated("Activation 2", this.actor.SOMETHING + "Activation 2");
                this.setCalculated("Activation 3", this.actor.SOMETHING + "Activation 3");
                this.setCalculated("Activation 4", this.actor.SOMETHING + "Activation 4");
                this.setCalculated("Activation 5", this.actor.SOMETHING + "Activation 5");
                this.setCalculated("Activation 6", this.actor.SOMETHING + "Activation 6");
                this.setCalculated("Activation 7", this.actor.SOMETHING + "Activation 7");
                this.setCalculated("Activation 8", this.actor.SOMETHING + "Activation 8");
                this.setCalculated("Activation 9", this.actor.SOMETHING + "Activation 9");
                this.setCalculated("Activation 10", this.actor.SOMETHING + "Activation 10");
                this.setCalculated("Activation 11", this.actor.SOMETHING + "Activation 11");
                */
        this.setCalculated("pg 1", this.actor.SOMETHING + "pg 1");
        this.setCalculated("pg 2", this.actor.SOMETHING + "pg 2");
        this.setCalculated("pg 3", this.actor.SOMETHING + "pg 3");
        this.setCalculated("pg 4", this.actor.SOMETHING + "pg 4");
        this.setCalculated("pg 5", this.actor.SOMETHING + "pg 5");
        this.setCalculated("pg 6", this.actor.SOMETHING + "pg 6");
        this.setCalculated("pg 7", this.actor.SOMETHING + "pg 7");
        this.setCalculated("pg 8", this.actor.SOMETHING + "pg 8");
        this.setCalculated("pg 9", this.actor.SOMETHING + "pg 9");
        this.setCalculated("pg 10", this.actor.SOMETHING + "pg 10");
        this.setCalculated("pg 11", this.actor.SOMETHING + "pg 11");
        this.setCalculated("Exploration Knacks 1", this.actor.SOMETHING + "Exploration Knacks 1");
        this.setCalculated("Exploration Knacks 2", this.actor.SOMETHING + "Exploration Knacks 2");
        this.setCalculated("Exploration Knacks 3", this.actor.SOMETHING + "Exploration Knacks 3");
        this.setCalculated("Exploration Knacks 4", this.actor.SOMETHING + "Exploration Knacks 4");
        this.setCalculated("Exploration Knacks 5", this.actor.SOMETHING + "Exploration Knacks 5");
        this.setCalculated("Exploration Knacks 6", this.actor.SOMETHING + "Exploration Knacks 6");
        this.setCalculated("Wt 1", this.actor.SOMETHING + "Wt 1");
        this.setCalculated("Wt 2", this.actor.SOMETHING + "Wt 2");
        this.setCalculated("Wt 3", this.actor.SOMETHING + "Wt 3");
        this.setCalculated("Wt 4", this.actor.SOMETHING + "Wt 4");
        this.setCalculated("Wt 5", this.actor.SOMETHING + "Wt 5");
        this.setCalculated("Wt 6", this.actor.SOMETHING + "Wt 6");
        this.setCalculated("Wt 7", this.actor.SOMETHING + "Wt 7");
        this.setCalculated("Wt 8", this.actor.SOMETHING + "Wt 8");
        this.setCalculated("Wt 9", this.actor.SOMETHING + "Wt 9");
        this.setCalculated("Wt 10", this.actor.SOMETHING + "Wt 10");
        this.setCalculated("Wt 11", this.actor.SOMETHING + "Wt 11");
        this.setCalculated("Wt 12", this.actor.SOMETHING + "Wt 12");
        this.setCalculated("Item 1", this.actor.SOMETHING + "Item 1");
        this.setCalculated("Item 2", this.actor.SOMETHING + "Item 2");
        this.setCalculated("Item 3", this.actor.SOMETHING + "Item 3");
        this.setCalculated("Item 4", this.actor.SOMETHING + "Item 4");
        this.setCalculated("Item 5", this.actor.SOMETHING + "Item 5");
        this.setCalculated("Item 6", this.actor.SOMETHING + "Item 6");
        this.setCalculated("Item 7", this.actor.SOMETHING + "Item 7");
        this.setCalculated("Item 8", this.actor.SOMETHING + "Item 8");
        this.setCalculated("Item 9", this.actor.SOMETHING + "Item 9");
        this.setCalculated("Item 10", this.actor.SOMETHING + "Item 10");
        this.setCalculated("Item 11", this.actor.SOMETHING + "Item 11");
        this.setCalculated("Item 12", this.actor.SOMETHING + "Item 12");
        this.setCalculated("Type 1", this.actor.SOMETHING + "Type 1");
        this.setCalculated("Properties 1", this.actor.SOMETHING + "Properties 1");
        this.setCalculated("Properties 2", this.actor.SOMETHING + "Properties 2");
        this.setCalculated("Properties 3", this.actor.SOMETHING + "Properties 3");
        this.setCalculated("Properties 4", this.actor.SOMETHING + "Properties 4");
        this.setCalculated("Properties 5", this.actor.SOMETHING + "Properties 5");
        this.setCalculated("Properties 6", this.actor.SOMETHING + "Properties 6");
        this.setCalculated("Properties 7", this.actor.SOMETHING + "Properties 7");
        this.setCalculated("Properties 8", this.actor.SOMETHING + "Properties 8");
        this.setCalculated("Properties 9", this.actor.SOMETHING + "Properties 9");
        this.setCalculated("Properties 10", this.actor.SOMETHING + "Properties 10");
        this.setCalculated("Properties 11", this.actor.SOMETHING + "Properties 11");
        this.setCalculated("Properties 12", this.actor.SOMETHING + "Properties 12");
        this.setCalculated("Character Name", this.actor.name ?? "");
        this.setCalculated("Heritage", heritage);
        this.setCalculated("Background", sys.details.background ?? "");
        this.setCalculated("Culture", sys.details.culture ?? "");
        this.setCalculated("Destiny", sys.details.destiny ?? "");
        this.setCalculated("Experience Points", sys.details.xp ?? 0);

        const classesObj = this.actor.classes ?? {};    // authoritative source (user request)

        const entries = Object.values(classesObj).map(c => {
            // Try levels directly on the classes entry, then fall back to item/system
            const name = c?.name ?? "";
            const levels = Number(c?.classLevels)
            const archetype = c?.archetype?.name ?? "";

            return { name, levels, archetype };
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
        this.setCalculated("Hit Die", this.actor.SOMETHING + "Hit Die");
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
        this.setCalculated("Supply", this.actor.SOMETHING + "Supply");
        this.setCalculated("Max Carried", this.actor.SOMETHING + "Max Carried");
        this.setCalculated("Inspiration Feature", this.actor.SOMETHING + "Inspiration Feature");
        this.setCalculated("Source of Inspiration", this.actor.SOMETHING + "Source of Inspiration");
        this.setCalculated("Fulfillment Feature", this.actor.SOMETHING + "Fulfillment Feature");

        this.setCalculated("Passive Insight", sys.skills.ins.bonuses.passive ?? 0);
        this.setCalculated("Passive Perception", sys.skills.prc.bonuses.passive ?? 0);
        this.setCalculated("Passive Stealth", sys.skills.ste.bonuses.passive ?? 0);
        this.setCalculated("Passive Skill", "");
        this.setCalculated("New Passive Skill", "");

        const SKILL_LABELS = game.a5e.config.skills;
        const expDice = game.a5e.config.expertiseDiceSidesMap;
        const skills = this.actor.system.skills ?? {};
        const joinSpecs = (a) => (Array.isArray(a) ? a.join(", ") : "");
        for (const [key, label] of Object.entries(SKILL_LABELS)) {
            const k = skills[key] ?? {};
            const modBonus = abl[k.ability]?.mod ?? 0;
            const expString = expDice[k.expertiseDice] > 0 ? `${k.mod + modBonus}+d${expDice[k.expertiseDice]}` : `${k.mod + modBonus}`;
            // Example field names you already have in your PDF mapping:
            this.setCalculated(`${label} Skill Proficiency`, k.proficient);
            this.setCalculated(`${label} Expertise Die`, expString);
            this.setCalculated(`${label} Specialty`, joinSpecs(k.specialties));
            // If you also map passives per skill on the PDF:
            // this.setCalculated(`Passive ${label}`, k.bonuses?.passive ?? 0);
        }
        /*
                this.setCalculated("New Skill 1", this.actor.SOMETHING + "New Skill 1");
                this.setCalculated("New Skill 2", this.actor.SOMETHING + "New Skill 2");
                this.setCalculated("New Skill 1 Expertise Die", this.actor.SOMETHING + "New Skill 1 Expertise Die");
                this.setCalculated("New Skill 2 Expertise Die", this.actor.SOMETHING + "New Skill 2 Expertise Die");
                this.setCalculated("New Skill 1 Proficiency", this.actor.SOMETHING + "New Skill 1 Proficiency");
                this.setCalculated("New Skill 2 Proficiency", this.actor.SOMETHING + "New Skill 2 Proficiency");
                */
        setList("Tool Proficiencies", profs.tools ?? [], 1, 6);

        this.setCalculated("Attack 1", this.actor.SOMETHING + "Attack 1");
        this.setCalculated("Attack 3", this.actor.SOMETHING + "Attack 3");
        this.setCalculated("Attack 4", this.actor.SOMETHING + "Attack 4");
        this.setCalculated("Attack 5", this.actor.SOMETHING + "Attack 5");
        this.setCalculated("Attack 6", this.actor.SOMETHING + "Attack 6");
        this.setCalculated("Attack 2", this.actor.SOMETHING + "Attack 2");
        this.setCalculated("Attack 7", this.actor.SOMETHING + "Attack 7");
        this.setCalculated("Strife 1", (sys.attributes.strife ?? 0) >= 1 ? 1 : 0);
        this.setCalculated("Strife 2", (sys.attributes.strife ?? 0) >= 2 ? 1 : 0);
        this.setCalculated("Strife 3", (sys.attributes.strife ?? 0) >= 3 ? 1 : 0);
        this.setCalculated("Strife 4", (sys.attributes.strife ?? 0) >= 4 ? 1 : 0);
        this.setCalculated("Strife 5", (sys.attributes.strife ?? 0) >= 5 ? 1 : 0);
        this.setCalculated("Strife 6", (sys.attributes.strife ?? 0) >= 6 ? 1 : 0);
        this.setCalculated("Strife 7", (sys.attributes.strife ?? 0) >= 7 ? 1 : 0);
        this.setCalculated("Investigation Skill Proficiency", this.actor.SOMETHING + "Investigation Skill Proficiency");
        setList("Languages Other Proficiencies", profs.languages ?? [], 1, 2);

        const features = (this.actor.items ?? []).filter(it => it.type === 'feature');
        const MAX = 19; // adjust to your PDF’s capacity
        for (let i = 0; i < MAX; i++) {
            const label = `Features  Traits ${i + 1}`;
            const it = features[i];
            this.setCalculated(label, it ? it.name : "");
        }
        this.setCalculated("Traditions Known", this.actor.SOMETHING + "Traditions Known");
        this.setCalculated("Maneuvers Known", this.actor.SOMETHING + "Maneuvers Known");
        this.setCalculated("Exertion Points", this.actor.SOMETHING + "Exertion Points");
        this.setCalculated("Knack Description 1", this.actor.SOMETHING + "Knack Description 1");
        this.setCalculated("Knack Description 2", this.actor.SOMETHING + "Knack Description 2");
        this.setCalculated("Knack Description 3", this.actor.SOMETHING + "Knack Description 3");
        this.setCalculated("Knack Description 4", this.actor.SOMETHING + "Knack Description 4");
        this.setCalculated("Knack Description 6", this.actor.SOMETHING + "Knack Description 6");
        this.setCalculated("Knack Description 5", this.actor.SOMETHING + "Knack Description 5");
        // Appearance / bio bits
        this.setCalculated("Age", sys.details.age ?? "");
        this.setCalculated("Height", sys.details.height ?? "");
        this.setCalculated("Weight", sys.details.weight ?? "");
        this.setCalculated("Eyes", sys.details.eyeColor ?? "");
        this.setCalculated("Skin", sys.details.skinColor ?? "");
        this.setCalculated("Hair", sys.details.hairColor ?? "");
        this.setCalculated("Character Backstory", sys.details.bio ?? "");
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
        this.setCalculated("CP", sys.currency.cp);
        this.setCalculated("SP", sys.currency.sp);
        this.setCalculated("EP", sys.currency.ep);
        this.setCalculated("GP", sys.currency.gp);
        this.setCalculated("PP", sys.currency.pp);

        this.setCalculated("Spellcasting Class", this.actor.SOMETHING + "Spellcasting Class");
        this.setCalculated("Casting Ability", this.actor.SOMETHING + "Casting Ability");
        this.setCalculated("Maneuver Save DC", this.actor.SOMETHING + "Maneuver Save DC");
        this.setCalculated("Spell Save DC", this.actor.SOMETHING + "Spell Save DC");
        this.setCalculated("Spell Attack Bonus", this.actor.SOMETHING + "Spell Attack Bonus");
        this.setCalculated("Spell Points", this.actor.SOMETHING + "Spell Points");
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
        for (let lvl = 1; lvl <= 9; lvl++) {
            const slots = sys.spellResources?.slots?.[lvl]?.max ?? 0;
            const used = (sys.spellResources?.slots?.[lvl]?.max ?? 0) - (sys.spellResources?.slots?.[lvl]?.current ?? 0);
            this.setCalculated(`${lvl} Slots`, slots);
            this.setCalculated(`${lvl} Expended`, used);
            // Known/Prepared counts aren’t directly stored at top level; leave “Known” blank unless you track it elsewhere
            // this.setCalculated(`${lvl} Known`, "");
        }

        this.setCalculated("1 Known", this.actor.SOMETHING + "1 Known");
        this.setCalculated("1 Spell 1", this.actor.SOMETHING + "1 Spell 1");
        this.setCalculated("page # 1-1", this.actor.SOMETHING + "page # 1-1");
        this.setCalculated("1 Spell 2", this.actor.SOMETHING + "1 Spell 2");
        this.setCalculated("page # 1-2", this.actor.SOMETHING + "page # 1-2");
        this.setCalculated("1 Spell 3", this.actor.SOMETHING + "1 Spell 3");
        this.setCalculated("page # 1-3", this.actor.SOMETHING + "page # 1-3");
        this.setCalculated("1 Spell 4", this.actor.SOMETHING + "1 Spell 4");
        this.setCalculated("page # 1-4", this.actor.SOMETHING + "page # 1-4");
        this.setCalculated("1 Spell 5", this.actor.SOMETHING + "1 Spell 5");
        this.setCalculated("page # 1-5", this.actor.SOMETHING + "page # 1-5");
        this.setCalculated("1 Spell 6", this.actor.SOMETHING + "1 Spell 6");
        this.setCalculated("page # 1-6", this.actor.SOMETHING + "page # 1-6");
        this.setCalculated("1 Spell 7", this.actor.SOMETHING + "1 Spell 7");
        this.setCalculated("page # 1-7", this.actor.SOMETHING + "page # 1-7");
        this.setCalculated("1 Spell 8", this.actor.SOMETHING + "1 Spell 8");
        this.setCalculated("page # 1-8", this.actor.SOMETHING + "page # 1-8");
        this.setCalculated("1 Spell 9", this.actor.SOMETHING + "1 Spell 9");
        this.setCalculated("page # 1-9", this.actor.SOMETHING + "page # 1-9");
        this.setCalculated("1 Spell 10", this.actor.SOMETHING + "1 Spell 10");
        this.setCalculated("page # 1-10", this.actor.SOMETHING + "page # 1-10");
        this.setCalculated("1 Spell 11", this.actor.SOMETHING + "1 Spell 11");
        this.setCalculated("page # 1-11", this.actor.SOMETHING + "page # 1-11");
        this.setCalculated("1 Spell 12", this.actor.SOMETHING + "1 Spell 12");
        this.setCalculated("page # 1-12", this.actor.SOMETHING + "page # 1-12");
        this.setCalculated("2 Known", this.actor.SOMETHING + "2 Known");
        this.setCalculated("2 Spell 1", this.actor.SOMETHING + "2 Spell 1");
        this.setCalculated("page # 2-1", this.actor.SOMETHING + "page # 2-1");
        this.setCalculated("2 Spell 2", this.actor.SOMETHING + "2 Spell 2");
        this.setCalculated("page # 2-2", this.actor.SOMETHING + "page # 2-2");
        this.setCalculated("2 Spell 3", this.actor.SOMETHING + "2 Spell 3");
        this.setCalculated("page # 2-3", this.actor.SOMETHING + "page # 2-3");
        this.setCalculated("2 Spell 4", this.actor.SOMETHING + "2 Spell 4");
        this.setCalculated("page # 2-4", this.actor.SOMETHING + "page # 2-4");
        this.setCalculated("2 Spell 5", this.actor.SOMETHING + "2 Spell 5");
        this.setCalculated("page # 2-5", this.actor.SOMETHING + "page # 2-5");
        this.setCalculated("2 Spell 6", this.actor.SOMETHING + "2 Spell 6");
        this.setCalculated("page # 2-6", this.actor.SOMETHING + "page # 2-6");
        this.setCalculated("2 Spell 7", this.actor.SOMETHING + "2 Spell 7");
        this.setCalculated("page # 2-7", this.actor.SOMETHING + "page # 2-7");
        this.setCalculated("2 Spell 8", this.actor.SOMETHING + "2 Spell 8");
        this.setCalculated("page # 2-8", this.actor.SOMETHING + "page # 2-8");
        this.setCalculated("2 Spell 9", this.actor.SOMETHING + "2 Spell 9");
        this.setCalculated("page # 2-9", this.actor.SOMETHING + "page # 2-9");
        this.setCalculated("2 Spell 10", this.actor.SOMETHING + "2 Spell 10");
        this.setCalculated("page # 2-10", this.actor.SOMETHING + "page # 2-10");
        this.setCalculated("2 Spell 11", this.actor.SOMETHING + "2 Spell 11");
        this.setCalculated("page # 2-11", this.actor.SOMETHING + "page # 2-11");
        this.setCalculated("2 Spell 12", this.actor.SOMETHING + "2 Spell 12");
        this.setCalculated("page # 2-12", this.actor.SOMETHING + "page # 2-12");
        this.setCalculated("3 Known", this.actor.SOMETHING + "3 Known");
        this.setCalculated("3 Spell 1", this.actor.SOMETHING + "3 Spell 1");
        this.setCalculated("page # 3-1", this.actor.SOMETHING + "page # 3-1");
        this.setCalculated("3 Spell 2", this.actor.SOMETHING + "3 Spell 2");
        this.setCalculated("page # 3-2", this.actor.SOMETHING + "page # 3-2");
        this.setCalculated("3 Spell 3", this.actor.SOMETHING + "3 Spell 3");
        this.setCalculated("page # 3-3", this.actor.SOMETHING + "page # 3-3");
        this.setCalculated("3 Spell 4", this.actor.SOMETHING + "3 Spell 4");
        this.setCalculated("page # 3-4", this.actor.SOMETHING + "page # 3-4");
        this.setCalculated("3 Spell 5", this.actor.SOMETHING + "3 Spell 5");
        this.setCalculated("page # 3-5", this.actor.SOMETHING + "page # 3-5");
        this.setCalculated("3 Spell 6", this.actor.SOMETHING + "3 Spell 6");
        this.setCalculated("page # 3-6", this.actor.SOMETHING + "page # 3-6");
        this.setCalculated("3 Spell 7", this.actor.SOMETHING + "3 Spell 7");
        this.setCalculated("page # 3-7", this.actor.SOMETHING + "page # 3-7");
        this.setCalculated("3 Spell 8", this.actor.SOMETHING + "3 Spell 8");
        this.setCalculated("page # 3-8", this.actor.SOMETHING + "page # 3-8");
        this.setCalculated("3 Spell 9", this.actor.SOMETHING + "3 Spell 9");
        this.setCalculated("page # 3-9", this.actor.SOMETHING + "page # 3-9");
        this.setCalculated("3 Spell 10", this.actor.SOMETHING + "3 Spell 10");
        this.setCalculated("page # 3-10", this.actor.SOMETHING + "page # 3-10");
        this.setCalculated("3 Spell 11", this.actor.SOMETHING + "3 Spell 11");
        this.setCalculated("page # 3-11", this.actor.SOMETHING + "page # 3-11");
        this.setCalculated("3 Spell 12", this.actor.SOMETHING + "3 Spell 12");
        this.setCalculated("page # 3-12", this.actor.SOMETHING + "page # 3-12");
        this.setCalculated("4 Known", this.actor.SOMETHING + "4 Known");
        this.setCalculated("4 Spell 1", this.actor.SOMETHING + "4 Spell 1");
        this.setCalculated("page # 4-1", this.actor.SOMETHING + "page # 4-1");
        this.setCalculated("4 Spell 2", this.actor.SOMETHING + "4 Spell 2");
        this.setCalculated("page # 4-2", this.actor.SOMETHING + "page # 4-2");
        this.setCalculated("4 Spell 3", this.actor.SOMETHING + "4 Spell 3");
        this.setCalculated("page # 4-3", this.actor.SOMETHING + "page # 4-3");
        this.setCalculated("4 Spell 4", this.actor.SOMETHING + "4 Spell 4");
        this.setCalculated("page # 4-4", this.actor.SOMETHING + "page # 4-4");
        this.setCalculated("4 Spell 5", this.actor.SOMETHING + "4 Spell 5");
        this.setCalculated("page # 4-5", this.actor.SOMETHING + "page # 4-5");
        this.setCalculated("4 Spell 6", this.actor.SOMETHING + "4 Spell 6");
        this.setCalculated("page # 4-6", this.actor.SOMETHING + "page # 4-6");
        this.setCalculated("4 Spell 7", this.actor.SOMETHING + "4 Spell 7");
        this.setCalculated("page # 4-7", this.actor.SOMETHING + "page # 4-7");
        this.setCalculated("4 Spell 8", this.actor.SOMETHING + "4 Spell 8");
        this.setCalculated("page # 4-8", this.actor.SOMETHING + "page # 4-8");
        this.setCalculated("4 Spell 9", this.actor.SOMETHING + "4 Spell 9");
        this.setCalculated("page # 4-9", this.actor.SOMETHING + "page # 4-9");
        this.setCalculated("4 Spell 10", this.actor.SOMETHING + "4 Spell 10");
        this.setCalculated("page # 4-10", this.actor.SOMETHING + "page # 4-10");
        this.setCalculated("4 Spell 11", this.actor.SOMETHING + "4 Spell 11");
        this.setCalculated("page # 4-11", this.actor.SOMETHING + "page # 4-11");
        this.setCalculated("5 Known", this.actor.SOMETHING + "5 Known");
        this.setCalculated("5 Spell 1", this.actor.SOMETHING + "5 Spell 1");
        this.setCalculated("page # 5-1", this.actor.SOMETHING + "page # 5-1");
        this.setCalculated("5 Spell 2", this.actor.SOMETHING + "5 Spell 2");
        this.setCalculated("page # 5-2", this.actor.SOMETHING + "page # 5-2");
        this.setCalculated("5 Spell 3", this.actor.SOMETHING + "5 Spell 3");
        this.setCalculated("page # 5-3", this.actor.SOMETHING + "page # 5-3");
        this.setCalculated("5 Spell 4", this.actor.SOMETHING + "5 Spell 4");
        this.setCalculated("page # 5-4", this.actor.SOMETHING + "page # 5-4");
        this.setCalculated("5 Spell 5", this.actor.SOMETHING + "5 Spell 5");
        this.setCalculated("page # 5-5", this.actor.SOMETHING + "page # 5-5");
        this.setCalculated("5 Spell 6", this.actor.SOMETHING + "5 Spell 6");
        this.setCalculated("page # 5-6", this.actor.SOMETHING + "page # 5-6");
        this.setCalculated("5 Spell 7", this.actor.SOMETHING + "5 Spell 7");
        this.setCalculated("page # 5-7", this.actor.SOMETHING + "page # 5-7");
        this.setCalculated("5 Spell 8", this.actor.SOMETHING + "5 Spell 8");
        this.setCalculated("page # 5-8", this.actor.SOMETHING + "page # 5-8");
        this.setCalculated("5 Spell 9", this.actor.SOMETHING + "5 Spell 9");
        this.setCalculated("page # 5-9", this.actor.SOMETHING + "page # 5-9");
        this.setCalculated("6 Known", this.actor.SOMETHING + "6 Known");
        this.setCalculated("6 Spell 1", this.actor.SOMETHING + "6 Spell 1");
        this.setCalculated("page # 6-1", this.actor.SOMETHING + "page # 6-1");
        this.setCalculated("6 Spell 2", this.actor.SOMETHING + "6 Spell 2");
        this.setCalculated("page # 6-2", this.actor.SOMETHING + "page # 6-2");
        this.setCalculated("6 Spell 3", this.actor.SOMETHING + "6 Spell 3");
        this.setCalculated("page # 6-3", this.actor.SOMETHING + "page # 6-3");
        this.setCalculated("6 Spell 4", this.actor.SOMETHING + "6 Spell 4");
        this.setCalculated("page # 6-4", this.actor.SOMETHING + "page # 6-4");
        this.setCalculated("6 Spell 5", this.actor.SOMETHING + "6 Spell 5");
        this.setCalculated("page # 6-5", this.actor.SOMETHING + "page # 6-5");
        this.setCalculated("6 Spell 6", this.actor.SOMETHING + "6 Spell 6");
        this.setCalculated("page # 6-6", this.actor.SOMETHING + "page # 6-6");
        this.setCalculated("6 Spell 7", this.actor.SOMETHING + "6 Spell 7");
        this.setCalculated("page # 6-7", this.actor.SOMETHING + "page # 6-7");
        this.setCalculated("6 Spell 8", this.actor.SOMETHING + "6 Spell 8");
        this.setCalculated("page # 6-8", this.actor.SOMETHING + "page # 6-8");
        this.setCalculated("6 Spell 9", this.actor.SOMETHING + "6 Spell 9");
        this.setCalculated("page # 6-9", this.actor.SOMETHING + "page # 6-9");
        this.setCalculated("7 Known", this.actor.SOMETHING + "7 Known");
        this.setCalculated("7 Spell 1", this.actor.SOMETHING + "7 Spell 1");
        this.setCalculated("page # 7-1", this.actor.SOMETHING + "page # 7-1");
        this.setCalculated("7 Spell 2", this.actor.SOMETHING + "7 Spell 2");
        this.setCalculated("page # 7-2", this.actor.SOMETHING + "page # 7-2");
        this.setCalculated("7 Spell 3", this.actor.SOMETHING + "7 Spell 3");
        this.setCalculated("page # 7-3", this.actor.SOMETHING + "page # 7-3");
        this.setCalculated("7 Spell 4", this.actor.SOMETHING + "7 Spell 4");
        this.setCalculated("page # 7-4", this.actor.SOMETHING + "page # 7-4");
        this.setCalculated("7 Spell 5", this.actor.SOMETHING + "7 Spell 5");
        this.setCalculated("page # 7-5", this.actor.SOMETHING + "page # 7-5");
        this.setCalculated("7 Spell 6", this.actor.SOMETHING + "7 Spell 6");
        this.setCalculated("page # 7-6", this.actor.SOMETHING + "page # 7-6");
        this.setCalculated("7 Spell 7", this.actor.SOMETHING + "7 Spell 7");
        this.setCalculated("page # 7-7", this.actor.SOMETHING + "page # 7-7");
        this.setCalculated("7 Spell 8", this.actor.SOMETHING + "7 Spell 8");
        this.setCalculated("page # 7-8", this.actor.SOMETHING + "page # 7-8");
        this.setCalculated("8 Known", this.actor.SOMETHING + "8 Known");
        this.setCalculated("8 Spell 1", this.actor.SOMETHING + "8 Spell 1");
        this.setCalculated("page # 8-1", this.actor.SOMETHING + "page # 8-1");
        this.setCalculated("8 Spell 2", this.actor.SOMETHING + "8 Spell 2");
        this.setCalculated("page # 8-2", this.actor.SOMETHING + "page # 8-2");
        this.setCalculated("8 Spell 3", this.actor.SOMETHING + "8 Spell 3");
        this.setCalculated("page # 8-3", this.actor.SOMETHING + "page # 8-3");
        this.setCalculated("8 Spell 4", this.actor.SOMETHING + "8 Spell 4");
        this.setCalculated("page # 8-4", this.actor.SOMETHING + "page # 8-4");
        this.setCalculated("8 Spell 5", this.actor.SOMETHING + "8 Spell 5");
        this.setCalculated("page # 8-5", this.actor.SOMETHING + "page # 8-5");
        this.setCalculated("8 Spell 6", this.actor.SOMETHING + "8 Spell 6");
        this.setCalculated("page # 8-6", this.actor.SOMETHING + "page # 8-6");
        this.setCalculated("9 Known", this.actor.SOMETHING + "9 Known");
        this.setCalculated("9 Spell 1", this.actor.SOMETHING + "9 Spell 1");
        this.setCalculated("9 Spell 2", this.actor.SOMETHING + "9 Spell 2");
        this.setCalculated("9 Spell 3", this.actor.SOMETHING + "9 Spell 3");
        this.setCalculated("9 Spell 4", this.actor.SOMETHING + "9 Spell 4");
        this.setCalculated("9 Spell 5", this.actor.SOMETHING + "9 Spell 5");
        this.setCalculated("9 Spell 6", this.actor.SOMETHING + "9 Spell 6");
        this.setCalculated("page # 9-1", this.actor.SOMETHING + "page # 9-1");
        this.setCalculated("page # 9-2", this.actor.SOMETHING + "page # 9-2");
        this.setCalculated("page # 9-3", this.actor.SOMETHING + "page # 9-3");
        this.setCalculated("page # 9-4", this.actor.SOMETHING + "page # 9-4");
        this.setCalculated("page # 9-5", this.actor.SOMETHING + "page # 9-5");
        this.setCalculated("page # 9-6", this.actor.SOMETHING + "page # 9-6");
        /*
        this.setCalculated("Features  Traits 26", this.actor.SOMETHING + "Features  Traits 26");
        this.setCalculated("Features  Traits 25", this.actor.SOMETHING + "Features  Traits 25");
        this.setCalculated("Features  Traits 24", this.actor.SOMETHING + "Features  Traits 24");
        this.setCalculated("Features  Traits 23", this.actor.SOMETHING + "Features  Traits 23");
        this.setCalculated("Features  Traits 22", this.actor.SOMETHING + "Features  Traits 22");
        this.setCalculated("Features  Traits 21", this.actor.SOMETHING + "Features  Traits 21");
        this.setCalculated("Features  Traits 20", this.actor.SOMETHING + "Features  Traits 20");
*/
    }
}
export default MappingClass;

