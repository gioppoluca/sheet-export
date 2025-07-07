
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
        this.systemName = "dnd5e";
        // Set the PDF files to use - MIND that the order of the files is important!
        this.pdfFiles.push({
            pdfUrl: '/modules/sheet-export/mappings/dnd5e/npc sheet 5e.pdf',
            nameDownload: `${this.actor.name ?? "character"}.pdf`,
            name: "npc sheet 5e.pdf",
        });

        // Set Player image
        this.setImage(this.actor.img, 0, 15, 725, 50, 50);


        this.setCalculated("NpcName", this.actor.name);
        this.setCalculated("Race", this.actor.system.details.race);
        this.setCalculated("Type", this.actor.system.details.type.value + " (" + game.dnd5e.config.actorSizes[this.actor.system.traits.size] + ")" + " - " + this.actor.system.details.alignment);
        this.setCalculated("str", this.actor.system.abilities.str.value);
        this.setCalculated("STRmod", this.actor.system.abilities.str.mod + " (sv: " + this.actor.system.abilities.str.save + ")");
        this.setCalculated("dex", this.actor.system.abilities.dex.value);
        this.setCalculated("DEXmod", this.actor.system.abilities.dex.mod + " (sv: " + this.actor.system.abilities.dex.save + ")");
        this.setCalculated("con", this.actor.system.abilities.con.value);
        this.setCalculated("CONmod", this.actor.system.abilities.con.mod + " (sv: " + this.actor.system.abilities.con.save + ")");
        this.setCalculated("int", this.actor.system.abilities.int.value);
        this.setCalculated("INTmod", this.actor.system.abilities.int.mod + " (sv: " + this.actor.system.abilities.int.save + ")");
        this.setCalculated("wis", this.actor.system.abilities.wis.value);
        this.setCalculated("WISmod", this.actor.system.abilities.wis.mod + " (sv: " + this.actor.system.abilities.wis.save + ")");
        this.setCalculated("cha", this.actor.system.abilities.cha.value);
        this.setCalculated("CHAmod", this.actor.system.abilities.cha.mod + " (sv: " + this.actor.system.abilities.cha.save + ")");
        this.setCalculated("ProfBonus", this.actor.system.attributes.prof);
        this.setCalculated("AC", this.actor.system.attributes.ac.value);
        this.setCalculated("initiative", this.actor.system.attributes.init.total);
        this.setCalculated("HPMax", this.actor.system.attributes.hp.max);
        this.setCalculated("HPCurrent", this.actor.system.attributes.hp.value);
        this.setCalculated("Speed", (function (actor) {
            const mo = actor.system.attributes.movement;
            const mt = Object.entries(game.dnd5e.config.movementTypes).map(e => e[0]);
            const ma = Object.entries(mo).filter(e => e[1] && mt.includes(e[0]));
            if (mo.walk && ma?.length === 1) {
                return `${ma[0][1]}${mo.units}${mo.hover ? "\n(hover)" : ""}`;
            } else {
                return ma.map(m => `${m[0].substring(0, 2)}:${m[1]}${mo.units}`).join('\n').concat(mo.hover ? "\n(hover)" : "");
            }
        })(this.actor)
        );
        this.setCalculated("features", this.actor.items.filter(i => ["feat", "trait"].includes(i.type)).slice(0, 16).map(i => `${i.name} - ${i.system.source}: \n${((h) => {
            const d = document.createElement("div");
            d.innerHTML = h;
            return d.textContent || d.innerText || "";
        })(i.system.description.value.substring(0, 599))}${(i.system.description.value.length > 600) ? '...' : ''}\n`).join("\n")
        );
        this.setCalculated("Wpn1 Name", this.actor.items.filter(i => i.type === 'weapon' && i.system.equipped && i.hasAttack && i.hasDamage)[0]?.name || "");
        this.setCalculated("Wpn1 AtkBonus", (function (actor) {
            const theWeapon = actor.items.filter(i => i.type === 'weapon' && i.system.equipped && i.hasAttack && i.hasDamage)[0];
            theWeapon?.prepareFinalAttributes();
            return theWeapon?.labels?.toHit?.replace(/^\+ $/, "0") || ""
        })(this.actor)
        );
        this.setCalculated("Wpn1 Damage", (function (actor) {
            const dda = Array.from(actor.itemTypes.weapon.filter(i => i.system.equipped && i.hasAttack && i.hasDamage))?.[0]?.labels.derivedDamage;
            return !dda ? "" : dda.map(dd => `${dd.formula || ""} ${game.dnd5e.config.damageTypes[dd.damageType]}`).join('\n');
        })(this.actor)
        );
        this.setCalculated("Wpn2 Name", this.actor.items.filter(i => i.type === 'weapon' && i.system.equipped && i.hasAttack && i.hasDamage)[1]?.name || "");
        this.setCalculated("Wpn2 AtkBonus", (function (actor) {
            const theWeapon = actor.items.filter(i => i.type === 'weapon' && i.system.equipped && i.hasAttack && i.hasDamage)[1];
            theWeapon?.prepareFinalAttributes();
            return theWeapon?.labels?.toHit?.replace(/^\+ $/, "0") || ""
        })(this.actor)
        );
        this.setCalculated("Wpn2 Damage", (function (actor) {
            const dda = Array.from(actor.itemTypes.weapon.filter(i => i.system.equipped && i.hasAttack && i.hasDamage))?.[1]?.labels.derivedDamage;
            return !dda ? "" : dda.map(dd => `${dd.formula || ""} ${game.dnd5e.config.damageTypes[dd.damageType]}`).join('\n');
        })(this.actor)
        );
        this.setCalculated("Wpn3 Name", this.actor.items.filter(i => i.type === 'weapon' && i.system.equipped && i.hasAttack && i.hasDamage)[2]?.name || "");
        this.setCalculated("Wpn3 AtkBonus", (function (actor) {
            const theWeapon = actor.items.filter(i => i.type === 'weapon' && i.system.equipped && i.hasAttack && i.hasDamage)[2];
            theWeapon?.prepareFinalAttributes();
            return theWeapon?.labels?.toHit?.replace(/^\+ $/, "0") || ""
        })(this.actor)
        );
        this.setCalculated("Wpn3 Damage", (function (actor) {
            const dda = Array.from(actor.itemTypes.weapon.filter(i => i.system.equipped && i.hasAttack && i.hasDamage))?.[2]?.labels.derivedDamage;
            return !dda ? "" : dda.map(dd => `${dd.formula || ""} ${game.dnd5e.config.damageTypes[dd.damageType]}`).join('\n');
        })(this.actor)
        );
        this.setCalculated("Wpn4 Name", this.actor.items.filter(i => i.type === 'weapon' && i.system.equipped && i.hasAttack && i.hasDamage)[3]?.name || "");
        this.setCalculated("Wpn4 AtkBonus", (function (actor) {
            const theWeapon = actor.items.filter(i => i.type === 'weapon' && i.system.equipped && i.hasAttack && i.hasDamage)[3];
            theWeapon?.prepareFinalAttributes();
            return theWeapon?.labels?.toHit?.replace(/^\+ $/, "0") || ""
        })(this.actor)
        );
        this.setCalculated("Wpn4 Damage", (function (actor) {
            const dda = Array.from(actor.itemTypes.weapon.filter(i => i.system.equipped && i.hasAttack && i.hasDamage))?.[3]?.labels.derivedDamage;
            return !dda ? "" : dda.map(dd => `${dd.formula || ""} ${game.dnd5e.config.damageTypes[dd.damageType]}`).join('\n');
        })(this.actor)
        );
        this.setCalculated("Wpn5 Name", this.actor.items.filter(i => i.type === 'weapon' && i.system.equipped && i.hasAttack && i.hasDamage)[4]?.name || "");
        this.setCalculated("Wpn5 AtkBonus", (function (actor) {
            const theWeapon = actor.items.filter(i => i.type === 'weapon' && i.system.equipped && i.hasAttack && i.hasDamage)[4];
            theWeapon?.prepareFinalAttributes();
            return theWeapon?.labels?.toHit?.replace(/^\+ $/, "0") || ""
        })(this.actor)
        );
        this.setCalculated("Wpn5 Damage", (function (actor) {
            const dda = Array.from(actor.itemTypes.weapon.filter(i => i.system.equipped && i.hasAttack && i.hasDamage))?.[4]?.labels.derivedDamage;
            return !dda ? "" : dda.map(dd => `${dd.formula || ""} ${game.dnd5e.config.damageTypes[dd.damageType]}`).join('\n');
        })(this.actor)
        );
        this.setCalculated("Wpn6 Name", this.actor.items.filter(i => i.type === 'weapon' && i.system.equipped && i.hasAttack && i.hasDamage)[5]?.name || "");
        this.setCalculated("Wpn6 AtkBonus", (function (actor) {
            const theWeapon = actor.items.filter(i => i.type === 'weapon' && i.system.equipped && i.hasAttack && i.hasDamage)[5];
            theWeapon?.prepareFinalAttributes();
            return theWeapon?.labels?.toHit?.replace(/^\+ $/, "0") || ""
        })(this.actor)
        );
        this.setCalculated("Wpn6 Damage", (function (actor) {
            const dda = Array.from(actor.itemTypes.weapon.filter(i => i.system.equipped && i.hasAttack && i.hasDamage))?.[5]?.labels.derivedDamage;
            return !dda ? "" : dda.map(dd => `${dd.formula || ""} ${game.dnd5e.config.damageTypes[dd.damageType]}`).join('\n');
        })(this.actor)
        );
        this.setCalculated("Wpn7 Name", this.actor.items.filter(i => i.type === 'weapon' && i.system.equipped && i.hasAttack && i.hasDamage)[6]?.name || "");
        this.setCalculated("Wpn7 AtkBonus", (function (actor) {
            const theWeapon = actor.items.filter(i => i.type === 'weapon' && i.system.equipped && i.hasAttack && i.hasDamage)[6];
            theWeapon?.prepareFinalAttributes();
            return theWeapon?.labels?.toHit?.replace(/^\+ $/, "0") || ""
        })(this.actor)
        );
        this.setCalculated("Wpn7 Damage", (function (actor) {
            const dda = Array.from(actor.itemTypes.weapon.filter(i => i.system.equipped && i.hasAttack && i.hasDamage))?.[6]?.labels.derivedDamage;
            return !dda ? "" : dda.map(dd => `${dd.formula || ""} ${game.dnd5e.config.damageTypes[dd.damageType]}`).join('\n');
        })(this.actor)
        );
        this.setCalculated("Skills", (function (actor) {
            let skill_text = "";
            Object.keys(actor.system.skills).forEach(key => {
                let row = game.dnd5e.config.skills[key].label + ": " + actor.system.skills[key].mod;
                skill_text += row + "\n";
            });
            return skill_text;
        })(this.actor)
        );
        this.setCalculated("PersonalityTraits", (function (h) {
            const d = document.createElement("div");
            d.innerHTML = h;
            return d.textContent || d.innerText || "";
        })(this.actor.system.details.trait)
        );
        this.setCalculated("Ideals", (function (h) {
            const d = document.createElement("div");
            d.innerHTML = h;
            return d.textContent || d.innerText || "";
        })(this.actor.system.details.ideal)
        );
        this.setCalculated("Bonds", (function (h) {
            const d = document.createElement("div");
            d.innerHTML = h;
            return d.textContent || d.innerText || "";
        })(this.actor.system.details.bond)
        );
        this.setCalculated("HD", this.actor.system.attributes.hp.formula);
        this.setCalculated("Flaws", (function (h) {
            const d = document.createElement("div");
            d.innerHTML = h;
            return d.textContent || d.innerText || "";
        })(this.actor.system.details.flaw)
        );
        this.setCalculated("equipment", this.actor.items.filter(i => ['weapon', 'equipment', 'tool'].includes(i.type)).map(i => (i.system.quantity <= 1) ? i.name : `${i.name} (${i.system.quantity})`).join(', '));
        this.setCalculated("CP", this.actor.system.currency.cp || "");
        this.setCalculated("SP", this.actor.system.currency.sp || "");
        this.setCalculated("EP", this.actor.system.currency.ep || "");
        this.setCalculated("GP", this.actor.system.currency.gp || "");
        this.setCalculated("PP", this.actor.system.currency.pp || "");
        this.setCalculated("PPerception", this.actor.system.skills.prc.passive);
        this.setCalculated("biography", (function (h) {
            const d = document.createElement("div");
            d.innerHTML = h.value;
            return d.textContent || d.innerText || "";
        })(this.actor.system.details.biography)
        );
        this.setCalculated("senses", (function (actor) {
            let senses_text = "";
            Object.keys(actor.system.attributes.senses).forEach(key => {
                if (key != "units" && actor.system.attributes.senses[key] > 0) {
                    let row = key + ": " + actor.system.attributes.senses[key] + " " + actor.system.attributes.senses["units"];
                    senses_text += row + "\n";
                };
            });
            return senses_text;
        })(this.actor)
        );
        this.setCalculated("spells", (function (actor) {
            let spell_text = "";
            actor.items.filter(i => i.type === 'spell').sort((a, b) => { return (a.system.level - b.system.level || a.name.localeCompare(b.name)) }).map(x => { x.name = x.name + ((typeof x.flags['items-with-spells-5e'] !== 'undefined') ? '[' + fromUuidSync(x.flags['items-with-spells-5e']['parent-item']).name + ']' : ''); return x }).forEach(object => {
                let row = object.system.level + " - " + object.name;
                spell_text += row + "\n";
            });

            return spell_text;
        })(this.actor)
        );

    }

    getPrimaryClassObj() {
        const allClasses = this.actor.items.filter(i => i.type === 'class').map(i => i);
        if (allClasses.length > 1) {
            const primary = allClasses.filter(i => i.flags?.srd5e?.isPrimaryClass);
            if (primary.length >= 1) {
                return primary[0];
            }
        }
        return allClasses[0];
    }

    getLocalizedClassAndSubclass(classItem) {
        const sc = classItem.system.subclass;
        return sc ? game.i18n.localize(classItem.name) + "/" + game.i18n.localize(sc) : game.i18n.localize(classItem.name);
    }

    getLocalizedClassAndSubclassAndLevel(classItem) {
        return `${this.getLocalizedClassAndSubclass(classItem)} ${classItem.system.levels}`;
    }

    getFeatsAndTraits() {
        let featsAndTraits = '';
        this.actor.items.filter(i => ['feat', 'trait'].includes(i.type)).map(i => i).forEach(i => {
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

    traitsLangs() {
        let s = "";
        let a = this.actor.system.traits.weaponProf.value.map(x => game.dnd5e.config.weaponProficiencies[x]
            || game.packs.get("dnd5e.items").index.get(game.dnd5e.config.weaponIds[x])?.name).first();
        let b = this.actor.system.traits.weaponProf.custom.split(";").filter(x => String(x) && x?.length);

        if (a?.length > 0) { s = `${s}Weapons: ${a} ${b.join(', ')}\n`; }
        a = this.actor.system.traits.armorProf.value.map(x => game.dnd5e.config.armorProficiencies[x]
            || game.packs.get("dnd5e.items").index.get(game.dnd5e.config.armorIds[x])?.name).first();
        b = this.actor.system.traits.armorProf.custom.split(";").filter(x => String(x) && x?.length);
        if (a?.length > 0) { s = `${s}Armor: ${a} ${b.join(', ')}\n`; }
        a = Object.keys(this.actor.system.tools).map(x => game.dnd5e.config.toolProficiencies[x]
            || game.packs.get("dnd5e.items").index.get(game.dnd5e.config.toolIds[x])?.name).join(",");
        if (a?.length > 0) { s = `${s}Tools: ${a} \n`; }
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

}

export default MappingClass;
