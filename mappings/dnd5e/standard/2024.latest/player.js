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
            pdfUrl: '/modules/sheet-export/mappings/dnd5e/DnD_2024_Character-Sheet.pdf',
            nameDownload: `${this.actor.name ?? "character"}.pdf`,
            name: "DnD_2024_Character-Sheet.pdf",
        });

        // Set Player image
        this.setImage(this.actor.img, 1, 410, 470, 190, 160);

        // Here you can define your calculated fields
        this.setCalculated("Name", this.actor.name);
        let bkground = this.actor.system.details.background ? this.actor.system.details.background : (this.actor.items.find((item) => item.type === 'background')?.name ? this.actor.items.find((item) => item.type === 'background')?.name : "")
        this.setCalculated("Background", bkground);
        this.setCalculated("Class", this.getClassLevel());
        this.setCalculated("Species", this.actor.system.details.race);
        this.setCalculated("Subclass", (function (actor) { const mainClass = actor.items.filter(i => i.type === 'class')[0]; const sc = mainClass?.system?.subclass; return sc ? game.i18n.localize(sc) : ""; })(this.actor));
        this.setCalculated("Level", (function (actor) { return actor.items.filter(i => i.type === 'class').reduce((acc, i) => acc + (i.system?.levels ?? 0), 0); })(this.actor));
        this.setCalculated("SIZE", game.dnd5e.config.actorSizes[this.actor.system.traits.size].label);
        this.setCalculated("PROF BONUS", this.actor.system.attributes.prof);

        this.setCalculated("Alignment", this.actor.system.details.alignment);
        this.setCalculated("XP Points", this.actor.system.details.xp.value);
        this.setCalculated("STR SCORE", this.actor.system.abilities.str.value);
        this.setCalculated("DEX SCORE", this.actor.system.abilities.dex.value);
        this.setCalculated("CON SCORE", this.actor.system.abilities.con.value);
        this.setCalculated("INT SCORE", this.actor.system.abilities.int.value);
        this.setCalculated("WIS SCORE", this.actor.system.abilities.wis.value);
        this.setCalculated("CHA SCORE", this.actor.system.abilities.cha.value);
        this.setCalculated("STR MOD", String(this.actor.system.abilities.str.mod));
        this.setCalculated("DEX MOD", String(this.actor.system.abilities.dex.mod));
        this.setCalculated("CON MOD", String(this.actor.system.abilities.con.mod));
        this.setCalculated("INT MOD", String(this.actor.system.abilities.int.mod));
        this.setCalculated("WIS MOD", String(this.actor.system.abilities.wis.mod));
        this.setCalculated("CHA MOD", String(this.actor.system.abilities.cha.mod));
        this.setCalculated("STR SAVE", String(this.actor.system.abilities.str.save.value));
        this.setCalculated("DEX SAVE", String(this.actor.system.abilities.dex.save.value));
        this.setCalculated("CON SAVE", String(this.actor.system.abilities.con.save.value));
        this.setCalculated("INT SAVE", String(this.actor.system.abilities.int.save.value));
        this.setCalculated("WIS SAVE", String(this.actor.system.abilities.wis.save.value));
        this.setCalculated("CHA SAVE", String(this.actor.system.abilities.cha.save.value));
        this.setCalculated("STR CHK SAVE", this.actor.system.abilities.wis.proficient);
        this.setCalculated("DEX CHK SAVE", this.actor.system.abilities.wis.proficient);
        this.setCalculated("CON CHK SAVE", this.actor.system.abilities.wis.proficient);
        this.setCalculated("INT CHK SAVE", this.actor.system.abilities.wis.proficient);
        this.setCalculated("WIS CHK SAVE", this.actor.system.abilities.wis.proficient);
        this.setCalculated("CHA CHK SAVE", this.actor.system.abilities.wis.proficient);

        this.setCalculated("ACROBATICS CHK", this.actor.system.skills.acr.value);
        this.setCalculated("ANIMAL HANDLING CHK", this.actor.system.skills.ani.value);
        this.setCalculated("ARCANA CHK", this.actor.system.skills.arc.value);
        this.setCalculated("ATHLETICS CHK", this.actor.system.skills.ath.value);
        this.setCalculated("DECEPTION CHK", this.actor.system.skills.dec.value);
        this.setCalculated("HISTORY CHK", this.actor.system.skills.his.value);
        this.setCalculated("INSIGHT CHK", this.actor.system.skills.ins.value);
        this.setCalculated("INTIMIDATE CHK", this.actor.system.skills.itm.value);
        this.setCalculated("INVESTIGATION CHK", this.actor.system.skills.inv.value);
        this.setCalculated("MEDICINE CHK", this.actor.system.skills.med.value);
        this.setCalculated("NATURE CHK", this.actor.system.skills.nat.value);
        this.setCalculated("PERCEPTION CHK", this.actor.system.skills.prc.value);
        this.setCalculated("PERFORMANCE CHK", this.actor.system.skills.prf.value);
        this.setCalculated("PERSUASION CHK", this.actor.system.skills.per.value);
        this.setCalculated("RELIGION CHK", this.actor.system.skills.rel.value);
        this.setCalculated("SLEIGHT OF HAND CHK", this.actor.system.skills.slt.value);
        this.setCalculated("STEALTH CHK", this.actor.system.skills.ste.value);
        this.setCalculated("SURVIVAL CHK", this.actor.system.skills.sur.value);

        this.setCalculated("ACROBATICS", String(this.actor.system.skills.acr.total));
        this.setCalculated("ANIMAL HANDLING", String(this.actor.system.skills.ani.total));
        this.setCalculated("ARCANA", String(this.actor.system.skills.arc.total));
        this.setCalculated("ATHLETICS", String(this.actor.system.skills.ath.total));
        this.setCalculated("DECEPTION", String(this.actor.system.skills.dec.total));
        this.setCalculated("HISTORY", String(this.actor.system.skills.his.total));
        this.setCalculated("INSIGHT", String(this.actor.system.skills.ins.total));
        this.setCalculated("INTIMIDATE", String(this.actor.system.skills.itm.total));
        this.setCalculated("INVESTIGATION", String(this.actor.system.skills.inv.total));
        this.setCalculated("MEDICINE", String(this.actor.system.skills.med.total));
        this.setCalculated("NATURE", String(this.actor.system.skills.nat.total));
        this.setCalculated("PERCEPTION", String(this.actor.system.skills.prc.total));
        this.setCalculated("PERFORMANCE", String(this.actor.system.skills.prf.total));
        this.setCalculated("PERSUASION", String(this.actor.system.skills.per.total));
        this.setCalculated("RELIGION", String(this.actor.system.skills.rel.total));
        this.setCalculated("SLEIGHT OF HAND", String(this.actor.system.skills.slt.total));
        this.setCalculated("STEALTH", String(this.actor.system.skills.ste.total));
        this.setCalculated("SURVIVAL", String(this.actor.system.skills.sur.total));

        this.setCalculated("Armor Class", String(this.actor.system.attributes.ac.value));
        this.setCalculated("init", String(this.actor.system.attributes.init.total));
        this.setCalculated("SPEED", (function (actor) {
            const mo = actor.system.attributes.movement;
            const mt = Object.keys(game.dnd5e.config.movementTypes);
            const ma = Object.entries(mo).filter(e => e[1] && mt.includes(e[0]));
            if (mo.walk && ma?.length === 1) {
                return `${ma[0][1]}${mo.units}${mo.hover ? "\n(hover)" : ""}`;
            } else {
                return ma.map(m => `${m[0].substring(0, 2)}:${m[1]}${mo.units}`).join('\n').concat(mo.hover ? "\n(hover)" : "");
            }
        })(this.actor));
        this.setCalculated("Current HP", this.actor.system.attributes.hp.value || "");
        this.setCalculated("Max HP", this.actor.system.attributes.hp.max || "");
        this.setCalculated("Temp HP", this.actor.system.attributes.hp.temp || "");
        this.setCalculated("Max HD", this.actor.system.attributes.hd.value || "");
        this.setCalculated("Spent HD", "");
        this.setCalculated("CP", this.actor.system.currency.cp || "");
        this.setCalculated("SP", this.actor.system.currency.sp || "");
        this.setCalculated("EP", this.actor.system.currency.ep || "");
        this.setCalculated("GP", this.actor.system.currency.gp || "");
        this.setCalculated("PP", this.actor.system.currency.pp || "");
        this.setCalculated("PERSONALITY", (function (h) {
            const d = document.createElement("div");
            d.innerHTML = h;
            return d.textContent || d.innerText || "";
        })(this.actor.system.details?.trait || ""));
        this.setCalculated("PASSIVE PERCEPTION", this.actor.system.skills.prc.passive);

        let equip = this.actor.items.filter(i => ['weapon', 'equipment', 'tool'].includes(i.type)).map(i => (i.system.quantity <= 1) ? i.name : `${i.name} (${i.system.quantity})`).join(', ');
        this.setCalculated("EQUIPMENT", equip);

        let classFea1 = '';
        let classFea2 = '';
        let clidx = 0;
        this.actor.items.filter(i => i.type === 'feat' && i.system?.type?.value === 'class').sort().forEach(i => {
            if (clidx < 6) {
                classFea1 += ("### " + i.name);
                if (i.system?.source?.label) {
                    classFea1 += (" (" + i.system.source?.label + ")");
                }
                classFea1 += " ###\n";
                if (i.system?.description?.value) {
                    classFea1 += this.htmlToText(i.system.description.value);
                    classFea1 += "\n";
                }
            } else {
                classFea2 += ("### " + i.name);
                if (i.system?.source?.label) {
                    classFea2 += (" (" + i.system.source?.label + ")");
                }
                classFea2 += " ###\n";
                if (i.system?.description?.value) {
                    classFea2 += this.htmlToText(i.system.description.value);
                    classFea2 += "\n";
                }
            }
            clidx++;
        });

        this.setCalculated("CLASS FEATURES 1", classFea1);
        this.setCalculated("CLASS FEATURES 2", classFea2);

        let spceTraits = '';
        let speciesT = this.actor.items.filter(i => i.type === 'feat' && i.system?.type?.value === 'race').sort().forEach(i => {
            spceTraits += ("### " + i.name);
            if (i.system?.source?.label) {
                spceTraits += (" (" + i.system.source?.label + ")");
            }
            spceTraits += " ###\n";
            if (i.system?.description?.value) {
                spceTraits += this.htmlToText(i.system.description.value);
                spceTraits += "\n";
            }
        });

        let armourProf = Array.from(this.actor.system.traits.armorProf.value)
        armourProf.forEach(x => {
            switch (x) {
                case "lgt":
                    this.setCalculated("CHK ARMOR LIGHT", true);
                    break;
                case "med":
                    this.setCalculated("CHK ARMOR MEDIUM", true);
                    break;
                case "hvy":
                    this.setCalculated("CHK ARMOR HEAVY", true);
                    break;
                case "shl":
                    this.setCalculated("CHK ARMOR SHIELDS", true);
                    break;
            }
        });

        this.setCalculated("SPECIES TRAITS", spceTraits);
        this.setCalculated("FEATS", this.getFeatsAndTraits());
        this.setCalculated("WEAPON PROF", await this.weapons());
        this.setCalculated("TOOL PROF", await this.traits());
        this.setCalculated("LANGUAGES", await this.languages());
        this.setCalculated("LVL1 TOTAL", this.actor.system.spells.spell1.max || "");
        this.setCalculated("LVL2 TOTAL", this.actor.system.spells.spell2.max || "");
        this.setCalculated("LVL3 TOTAL", this.actor.system.spells.spell3.max || "");
        this.setCalculated("LVL4 TOTAL", this.actor.system.spells.spell4.max || "");
        this.setCalculated("LVL5 TOTAL", this.actor.system.spells.spell5.max || "");
        this.setCalculated("LVL6 TOTAL", this.actor.system.spells.spell6.max || "");
        this.setCalculated("LVL7 TOTAL", this.actor.system.spells.spell7.max || "");
        this.setCalculated("LVL8 TOTAL", this.actor.system.spells.spell8.max || "");
        this.setCalculated("LVL9 TOTAL", this.actor.system.spells.spell9.max || "");
        this.setCalculated("SPELL SAVE DC", this.actor.system.attributes.spell.dc || "");
        this.setCalculated("SPELL ATTACK BONUS", "+" + String(this.actor.system.attributes.spell.attack));
        this.setCalculated("SPELLCASTING ABILITY", this.actor.system.attributes.spellcasting.capitalize() || "");
        this.setCalculated("SPELLCASTING MOD", (function (actor) { const ability = actor.system.attributes.spellcasting; return ability ? actor.system.abilities[ability].mod : ""; })(this.actor));


        let prepSpells = this.actor.items.filter(i => i.type === 'spell' && i.system.prepared).sort((a, b) => { return (a.system.level - b.system.level || a.name.localeCompare(b.name)) }).map(spell => ({
            title: spell.name,
            description: this.htmlToText(spell.system.description?.value || ""),
            range: spell.labels.range,
            casting: spell.labels.activation,
            duration: spell.labels.duration,
            verbal: spell.system.properties.has("verbal"),
            somatic: spell.system.properties.has("somatic"),
            material: spell.system.properties.has("mgc"),
            ritual: spell.system.ritual === true,
            level: spell.system.level,
            concentration: spell.system.properties.has("concentration"),
            school: spell.labels.school // must match image key in layoutConfig
        }));

        for (let i = 0; i < prepSpells.length && i < 30; i++) {
            const spell = prepSpells[i];
            this.setCalculated("SPELL NAME" + (i), spell.title);
            this.setCalculated("RANGE" + (i), spell.range);
            this.setCalculated("CASTING TIME" + (i), spell.duration);
            this.setCalculated("CHK SP CON" + (i), spell.concentration);
            this.setCalculated("CHK SP R" + (i), spell.concentration);
            this.setCalculated("CHK SP M" + (i), spell.concentration);
        };
        for (let index = 0; index < 6; index++) {
            this.setCalculated(`NAME - WEAPON ${index + 1}`, this.localizedItemName(this.actor.items.filter(i => i.type === 'weapon' && i.system.equipped && i.hasAttack)[index]) || "");
            this.setCalculated(`BONUS/DC - WEAPON ${index + 1}`, (function (actor) {
                const theWeapon = actor.items.filter(i => i.type === 'weapon' && i.system.equipped && i.hasAttack)[index];
                console.log(theWeapon);
                //theWeapon?.prepareFinalAttributes();
                return theWeapon?.labels?.toHit?.replace(/^\+ $/, "0") || ""
            })(this.actor)
            );
            this.setCalculated(`DAMAGE/TYPE - WEAPON ${index + 1}`, (function (actor) {
                const dda = Array.from(actor.itemTypes.weapon.filter(i => i.system.equipped && i.hasAttack))?.[index]?.labels?.damages[0]?.label;
                return !dda ? "" : dda;
            })(this.actor)
            );

        }


    }

    getClassLevel() {
        const allClasses = this.actor.items.filter(i => i.type === 'class').map(i => i);
        let arrClass = []
        allClasses.forEach(i => {
            arrClass.push(this.getLocalizedClassAndSubclassAndLevel(i))
        });
        return arrClass.join(", ")
    }

    getLocalizedClassAndSubclass(classItem) {
        const sc = classItem?.system?.subclass;
        return sc ? game.i18n.localize(classItem?.name) + "/" + game.i18n.localize(sc) : game.i18n.localize(classItem?.name);
    }

    getLocalizedClassAndSubclassAndLevel(classItem) {
        return `${this.getLocalizedClassAndSubclass(classItem)} ${classItem?.system?.levels}`;
    }

    getFeatsAndTraits() {
        let featsAndTraits = '';
        this.actor.items.filter(i => ['feat', 'trait'].includes(i.type)).map(i => i).forEach(i => {
            if (i.system?.type?.value === 'class') return; // skip class features
            if (i.system?.type?.value === 'race') return; // skip race features
            featsAndTraits += ("### " + i.name);
            if (i.system?.source?.label) {
                featsAndTraits += (" (" + i.system.source?.label + ")");
            }
            featsAndTraits += " ###\n";
            if (i.system?.description?.value) {
                featsAndTraits += this.htmlToText(i.system.description.value);
                featsAndTraits += "\n";
            }
        });
        return featsAndTraits;
    }

    localizedItemName(item) {
        return item ? game.i18n.localize(item?.name) : '';
    }

    async traitsLangs() {
        console.log(this.actor)
        console.log(game.dnd5e.config.weaponProficiencies)
        console.log(game.packs.get("dnd5e.items").index)
        console.log(game.dnd5e.config.weaponIds)
        let s = "";
        let a = await Promise.all(await this.actor.system.traits.weaponProf.value.map(async (x) => {
            console.log(x)
            console.log(game.dnd5e.config.weaponProficiencies[x])
            console.log(game.dnd5e.config.weaponIds[x])
            console.log(await fromUuid(game.dnd5e.config.weaponIds[x]))
            console.log(game.packs.get("dnd5e.items").index.get(game.dnd5e.config.weaponIds[x])?.name)
            let itemComp = await fromUuid(game.dnd5e.config.weaponIds[x])
            console.log(game.dnd5e.config.weaponProficiencies[x] || itemComp?.name)
            return game.dnd5e.config.weaponProficiencies[x] || itemComp?.name
        }));
        let b = this.actor.system.traits.weaponProf.custom.split(";").filter(x => String(x) && x?.length);
        console.log(a)
        if (a?.length > 0) { s = `${s}Weapons: ${a} ${b.join(', ')}\n`; }
        a = this.actor.system.traits.armorProf.value.map(x => game.dnd5e.config.armorProficiencies[x]
            || game.packs.get("dnd5e.items").index.get(game.dnd5e.config.armorIds[x])?.name).first();
        b = this.actor.system.traits.armorProf.custom.split(";").filter(x => String(x) && x?.length);
        if (a?.length > 0) { s = `${s}Armor: ${a} ${b.join(', ')}\n`; }
        a = await Promise.all(Object.keys(this.actor.system.tools).map(async (x) => {
            let toolComp = await fromUuid(game.dnd5e.config.toolIds[x])
            return game.dnd5e.config.toolProficiencies[x] || toolComp?.name
        }));
        if (a?.length > 0) { s = `${s}Tools: ${a.join(', ')} \n`; }
        let traitLang = Array.from(this.actor.system.traits.languages.value);
        let confLang = Object.keys(flattenObject(game.dnd5e.config.languages))
        let actorLang = [];
        confLang.forEach(function myfunc(element) {
            //       console.log(this);
            if (traitLang.some(function (v) { return element.indexOf(v) >= 0; })) {
                actorLang.push(game.i18n.localize(this.getValueByDottedKeys(game.dnd5e.config.languages, element)));
            }
        }, this);

        //            a = Array.from(actor.system.traits.languages.value).map(x => game.dnd5e.config.languages[x]).join(",");
        a = actorLang.join(",");
        b = this.actor.system.traits.languages.custom.split(";").filter(x => String(x) && x?.length);
        if (a?.length > 0) { s = `${s}Languages: ${a} ${b.join(', ')}\n`; }
        return s;
    }

    async traits() {
        let s = "";
        let a = await Promise.all(Object.keys(this.actor.system.tools).map(async (x) => {
            let toolComp = await fromUuid(game.dnd5e.config.toolIds[x])
            return game.dnd5e.config.toolProficiencies[x] || toolComp?.name
        }));
        if (a?.length > 0) { s = `${a.join(', ')} \n`; }
        return s;
    }

    async languages() {
        let s = "";
        let traitLang = Array.from(this.actor.system.traits.languages.value);
        let confLang = Object.keys(flattenObject(game.dnd5e.config.languages))
        let actorLang = [];
        confLang.forEach(function myfunc(element) {
            if (traitLang.some(function (v) { return element.indexOf(v) >= 0; })) {
                actorLang.push(game.i18n.localize(this.getValueByDottedKeys(game.dnd5e.config.languages, element)));
            }
        }, this);

        //            a = Array.from(actor.system.traits.languages.value).map(x => game.dnd5e.config.languages[x]).join(",");
        let a = actorLang.join(",");
        let b = this.actor.system.traits.languages.custom.split(";").filter(x => String(x) && x?.length);
        if (a?.length > 0) { s = `${a} ${b.join(', ')}\n`; }
        return s;
    }

    async weapons() {
        let s = "";
        let a = await Promise.all(await this.actor.system.traits.weaponProf.value.map(async (x) => {
            console.log(x)
            console.log(game.dnd5e.config.weaponProficiencies[x])
            console.log(game.dnd5e.config.weaponIds[x])
            console.log(await fromUuid(game.dnd5e.config.weaponIds[x]))
            console.log(game.packs.get("dnd5e.items").index.get(game.dnd5e.config.weaponIds[x])?.name)
            let itemComp = await fromUuid(game.dnd5e.config.weaponIds[x])
            console.log(game.dnd5e.config.weaponProficiencies[x] || itemComp?.name)
            return game.dnd5e.config.weaponProficiencies[x] || itemComp?.name
        }));
        let b = this.actor.system.traits.weaponProf.custom.split(";").filter(x => String(x) && x?.length);
        if (a?.length > 0) { s = `${s}Weapons: ${a} ${b.join(', ')}\n`; }
        return s;
    }


}
export default MappingClass;

