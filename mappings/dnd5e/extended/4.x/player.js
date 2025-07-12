
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
            pdfUrl: '/modules/sheet-export/mappings/dnd5e/5E_CharacterSheet_Fillable.pdf',
            nameDownload: `${this.actor.name ?? "character"}.pdf`,
            name: "Extended character sheet 5e.pdf",
        });

        // Set Player image
        this.setImage(this.actor.img, 1, 30, 440, 160, 220);

        //        this.setCalculated("ClassLevel", this.actor.items.filter(i => i.type === 'class').map(i => `${i.name} ${i.system.levels}`).join(' / '));
        this.setCalculated("ClassLevel", this.getLocalizedClassAndSubclassAndLevel(this.getPrimaryClassObj()));

        this.setCalculated("Background", (this.actor.system.details.background ? this.actor.system.details.background : (this.actor.items.find((item) => item.type === 'background')?.name ? this.actor.items.find((item) => item.type === 'background')?.name : "")));
        this.setCalculated("PlayerName", Object.entries(this.actor.ownership).filter(entry => entry[1] === 3).map(entry => entry[0]).map(id => !game.users.get(id)?.isGM ? game.users.get(id)?.name : null).filter(x => x).join(", "));
        this.setCalculated("CharacterName", this.actor.name);
        this.setCalculated("Race", this.actor.system.details.race);
        this.setCalculated("Alignment", this.actor.system.details.alignment);
        this.setCalculated("XP", this.actor.system.details.xp.value);
        this.setCalculated("Inspiration", this.actor.system.attributes.inspiration ? "x" : "");
        this.setCalculated("STR", this.actor.system.abilities.str.value);
        this.setCalculated("ProfBonus", this.actor.system.attributes.prof);
        this.setCalculated("AC", this.actor.system.attributes.ac.value);
        this.setCalculated("Initiative", this.actor.system.attributes.init.total);
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
        this.setCalculated("PersonalityTraits", (function (h) {
            const d = document.createElement("div");
            d.innerHTML = h;
            return d.textContent || d.innerText || "";
        })(this.actor.system.details.trait)
        );
        this.setCalculated("STRmod", this.actor.system.abilities.str.mod);
        this.setCalculated("ST Strength", this.actor.system.abilities.str.save);
        this.setCalculated("DEX", this.actor.system.abilities.dex.value);
        this.setCalculated("Ideals", (function (h) {
            const d = document.createElement("div");
            d.innerHTML = h;
            return d.textContent || d.innerText || "";
        })(this.actor.system.details.ideal)
        );
        this.setCalculated("DEXmod", this.actor.system.abilities.dex.mod);
        this.setCalculated("Bonds", (function (h) {
            const d = document.createElement("div");
            d.innerHTML = h;
            return d.textContent || d.innerText || "";
        })(this.actor.system.details.bond)
        );
        this.setCalculated("CON", this.actor.system.abilities.con.value);
        this.setCalculated("HDTotal", this.actor.system.attributes.hd.value);
        this.setCalculated("Check Box 12", this.actor.system.attributes.death.success);
        this.setCalculated("Check Box 13", this.actor.system.attributes.death.success);
        this.setCalculated("Check Box 14", this.actor.system.attributes.death.success);
        this.setCalculated("CONmod", this.actor.system.abilities.con.mod);
        this.setCalculated("Check Box 15", this.actor.system.attributes.death.failure);
        this.setCalculated("Check Box 16", this.actor.system.attributes.death.failure);
        this.setCalculated("Check Box 17", this.actor.system.attributes.death.failure);
        this.setCalculated("HD", this.actor.system.attributes.hd.value);
        this.setCalculated("Flaws", (function (h) {
            const d = document.createElement("div");
            d.innerHTML = h;
            return d.textContent || d.innerText || "";
        })(this.actor.system.details.flaw)
        );
        this.setCalculated("INT", this.actor.system.abilities.int.value);
        this.setCalculated("ST Dexterity", this.actor.system.abilities.dex.save);
        this.setCalculated("ST Constitution", this.actor.system.abilities.con.save);
        this.setCalculated("ST Intelligence", this.actor.system.abilities.int.save);
        this.setCalculated("ST Wisdom", this.actor.system.abilities.wis.save);
        this.setCalculated("ST Charisma", this.actor.system.abilities.cha.save);
        this.setCalculated("Acrobatics", this.actor.system.skills.acr.total);
        this.setCalculated("Animal", this.actor.system.skills.ani.total);
        this.setCalculated("Athletics", this.actor.system.skills.ath.total);
        this.setCalculated("Deception", this.actor.system.skills.dec.total);
        this.setCalculated("History", this.actor.system.skills.his.total);
        console.log("before weapon start");
        this.setCalculated("Wpn Name", this.localizedItemName(this.actor.items.filter(i => i.type === 'weapon' && i.system.equipped && i.hasAttack && i.hasDamage)[0]) || "");
        console.log(this.localizedItemName(this.actor.items.filter(i => i.type === 'weapon' && i.system.equipped && i.hasAttack && i.hasDamage)[0]) || "");
        console.log("before weapon atkbonus");
        this.setCalculated("Wpn1 AtkBonus", (function (actor) {
            const theWeapon = actor.items.filter(i => i.type === 'weapon' && i.system.equipped && i.hasAttack && i.hasDamage)[0];
            console.log(theWeapon);
            //theWeapon?.prepareFinalAttributes();
            return theWeapon?.labels?.toHit?.replace(/^\+ $/, "0") || ""
        })(this.actor)
        );
        console.log("before weapon damage");
        this.setCalculated("Wpn1 Damage", (function (actor) {
            const dda = Array.from(actor.itemTypes.weapon.filter(i => i.system.equipped && i.hasAttack && i.hasDamage))?.[0]?.labels?.damages[0]?.label;
            return !dda ? "" : dda;
        })(this.actor)
        );
        this.setCalculated("Insight", this.actor.system.skills.ins.total);
        this.setCalculated("Intimidation", this.actor.system.skills.itm.total);
        this.setCalculated("Wpn Name 2", this.actor.items.filter(i => i.type === 'weapon' && i.system.equipped && i.hasAttack && i.hasDamage)[1]?.name || "");
        this.setCalculated("Wpn2 AtkBonus", (function (actor) {
            const theWeapon = actor.items.filter(i => i.type === 'weapon' && i.system.equipped && i.hasAttack && i.hasDamage)[1];
            //theWeapon?.prepareFinalAttributes();
            return theWeapon?.labels?.toHit?.replace(/^\+ $/, "0") || ""
        })(this.actor)
        );
        this.setCalculated("Wpn Name 3", this.actor.items.filter(i => i.type === 'weapon' && i.system.equipped && i.hasAttack && i.hasDamage)[2]?.name || "");
        this.setCalculated("Wpn3 AtkBonus", (function (actor) {
            const theWeapon = actor.items.filter(i => i.type === 'weapon' && i.system.equipped && i.hasAttack && i.hasDamage)[2];
            //theWeapon?.prepareFinalAttributes();
            return theWeapon?.labels?.toHit?.replace(/^\+ $/, "0") || ""
        })(this.actor)
        );
        this.setCalculated("Check Box 11", this.actor.system.abilities.str.proficient);
        this.setCalculated("Check Box 18", this.actor.system.abilities.dex.proficient);
        this.setCalculated("Check Box 19", this.actor.system.abilities.con.proficient);
        this.setCalculated("Check Box 20", this.actor.system.abilities.int.proficient);
        this.setCalculated("Check Box 21", this.actor.system.abilities.wis.proficient);
        this.setCalculated("Check Box 22", this.actor.system.abilities.cha.proficient);
        this.setCalculated("INTmod", this.actor.system.abilities.int.mod);
        this.setCalculated("Wpn2 Damage", (function (actor) {
            const dda = Array.from(actor.itemTypes.weapon.filter(i => i.system.equipped && i.hasAttack && i.hasDamage))?.[1]?.labels?.damages[0]?.label;
            return !dda ? "" : dda;
        })(this.actor)
        );
        this.setCalculated("Investigation", this.actor.system.skills.inv.total);
        this.setCalculated("WIS", this.actor.system.abilities.wis.value);
        this.setCalculated("Arcana", this.actor.system.skills.arc.total);
        this.setCalculated("Perception", this.actor.system.skills.prc.total);
        this.setCalculated("WISmod", this.actor.system.abilities.wis.mod);
        this.setCalculated("CHA", this.actor.system.abilities.cha.value);
        this.setCalculated("Nature", this.actor.system.skills.nat.total);
        this.setCalculated("Performance", this.actor.system.skills.per.total);
        this.setCalculated("Medicine", this.actor.system.skills.med.total);
        this.setCalculated("Religion", this.actor.system.skills.rel.total);
        this.setCalculated("Stealth", this.actor.system.skills.ste.total);
        this.setCalculated("Check Box 23", this.actor.system.skills.acr.value);
        this.setCalculated("Check Box 24", this.actor.system.skills.ani.value);
        this.setCalculated("Check Box 25", this.actor.system.skills.arc.value);
        this.setCalculated("Check Box 26", this.actor.system.skills.ath.value);
        this.setCalculated("Check Box 27", this.actor.system.skills.dec.value);
        this.setCalculated("Check Box 28", this.actor.system.skills.his.value);
        this.setCalculated("Check Box 29", this.actor.system.skills.ins.value);
        this.setCalculated("Check Box 30", this.actor.system.skills.itm.value);
        this.setCalculated("Check Box 31", this.actor.system.skills.inv.value);
        this.setCalculated("Check Box 32", this.actor.system.skills.med.value);
        this.setCalculated("Check Box 33", this.actor.system.skills.nat.value);
        this.setCalculated("Check Box 34", this.actor.system.skills.prc.value);
        this.setCalculated("Check Box 35", this.actor.system.skills.prf.value);
        this.setCalculated("Check Box 36", this.actor.system.skills.per.value);
        this.setCalculated("Check Box 37", this.actor.system.skills.rel.value);
        this.setCalculated("Check Box 38", this.actor.system.skills.slt.value);
        this.setCalculated("Check Box 39", this.actor.system.skills.ste.value);
        this.setCalculated("Check Box 40", this.actor.system.skills.sur.value);
        this.setCalculated("Persuasion", this.actor.system.skills.per.total);
        this.setCalculated("HPMax", this.actor.system.attributes.hp.max);
        this.setCalculated("HPCurrent", this.actor.system.attributes.hp.value);
        this.setCalculated("HPTemp", this.actor.system.attributes.hp.temp);
        this.setCalculated("Wpn3 Damage", (function (actor) {
            const dda = Array.from(actor.itemTypes.weapon.filter(i => i.system.equipped && i.hasAttack && i.hasDamage))?.[2]?.labels?.damages[0]?.label;
            return !dda ? "" : dda;
        })(this.actor)
        );
        this.setCalculated("SleightofHand", this.actor.system.skills.slt.total);
        this.setCalculated("CHamod", this.actor.system.abilities.cha.mod);
        this.setCalculated("Survival", this.actor.system.skills.sur.total);
        this.setCalculated("AttacksSpellcasting", "");
        this.setCalculated("Passive", this.actor.system.skills.prc.passive);
        this.setCalculated("CP", this.actor.system.currency.cp || "");
        this.setCalculated("ProficienciesLang", this.traitsLangs());
        this.setCalculated("SP", this.actor.system.currency.sp || "");
        this.setCalculated("EP", this.actor.system.currency.ep || "");
        this.setCalculated("GP", this.actor.system.currency.gp || "");
        this.setCalculated("PP", this.actor.system.currency.pp || "");

        this.setCalculated("Equipment", this.actor.items.filter(i => ['weapon', 'equipment', 'tool'].includes(i.type)).map(i => (i.system.quantity <= 1) ? i.name : `${i.name} (${i.system.quantity})`).join(', '));
        this.setCalculated("Features and Traits", this.getFeatsAndTraits());
        this.setCalculated("CharacterName 2", this.actor.name || "");
        this.setCalculated("Age", this.actor.system?.details?.age || "");
        this.setCalculated("Height", this.actor.system?.details?.height || "");
        this.setCalculated("Weight", this.actor.system?.details?.weight || "");
        this.setCalculated("Eyes", this.actor.system?.details?.eyes || "");
        this.setCalculated("Skin", this.actor.system?.details?.skin || "");
        this.setCalculated("Hair", this.actor.system?.details?.hair || "");
        this.setCalculated("Faction Symbol Image", "");
        this.setCalculated("Allies", "");
        this.setCalculated("FactionName", "");
        this.setCalculated("Backstory", (function (h) {
            const d = document.createElement("div");
            d.innerHTML = h;
            return d.textContent || d.innerText || "";
        })(this.actor.system.details.biography.value)
        );
        this.setCalculated("Feat+Traits", this.actor.items.filter(i => ['feat', 'trait'].includes(i.type)).slice(16).map(i => `${i.name} - ${i.system.source}`).join('\n'));
        this.setCalculated("Treasure", this.actor.items.filter(i => ['backpack', 'consumable', 'loot'].includes(i.type)).map(i => (i.system.quantity <= 1) ? i.name : `${i.name} (${i.system.quantity})`).join(', '));
        this.setCalculated("Spellcasting Class 2", this.actor.items.filter(i => i.type === 'class').map(i => `${i.name}`).join(' / '));
        this.setCalculated("SpellcastingAbility 2", this.actor.system.attributes.spellcasting.capitalize() || "");
        this.setCalculated("SpellSaveDC  2", this.actor.system.attributes.spelldc || "");
        this.setCalculated("SpellAtkBonus 2", "+" + String(this.actor.system.attributes.spelldc - 8));
        this.setCalculated("SlotsTotal 19", this.actor.system.spells.spell1.max || "");
        this.setCalculated("SlotsRemaining 19", this.actor.system.spells.spell1.value || "");
        this.setCalculated("SlotsTotal 20", this.actor.system.spells.spell2.max || "");
        this.setCalculated("SlotsRemaining 20", this.actor.system.spells.spell2.value || "");
        this.setCalculated("SlotsTotal 21", this.actor.system.spells.spell3.max || "");
        this.setCalculated("SlotsRemaining 21", this.actor.system.spells.spell3.value || "");
        this.setCalculated("SlotsTotal 22", this.actor.system.spells.spell4.max || "");
        this.setCalculated("SlotsRemaining 22", this.actor.system.spells.spell4.value || "");
        this.setCalculated("SlotsTotal 23", this.actor.system.spells.spell5.max || "");
        this.setCalculated("SlotsRemaining 23", this.actor.system.spells.spell5.value || "");
        this.setCalculated("SlotsTotal 24", this.actor.system.spells.spell6.max || "");
        this.setCalculated("SlotsRemaining 24", this.actor.system.spells.spell6.value || "");
        this.setCalculated("SlotsTotal 25", this.actor.system.spells.spell7.max || "");
        this.setCalculated("SlotsRemaining 25", this.actor.system.spells.spell7.value || "");
        this.setCalculated("SlotsTotal 26", this.actor.system.spells.spell8.max || "");
        this.setCalculated("SlotsRemaining 26", this.actor.system.spells.spell8.value || "");
        this.setCalculated("SlotsTotal 27", this.actor.system.spells.spell9.max || "");
        this.setCalculated("SlotsRemaining 27", this.actor.system.spells.spell9.value || "");
        this.setCalculated("Spells 1014", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 0).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[0] || "");
        this.setCalculated("Spells 1016", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 0).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[1] || "");
        this.setCalculated("Spells 1017", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 0).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[2] || "");
        this.setCalculated("Spells 1018", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 0).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[3] || "");
        this.setCalculated("Spells 1019", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 0).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[4] || "");
        this.setCalculated("Spells 1020", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 0).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[5] || "");
        this.setCalculated("Spells 1021", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 0).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[6] || "");
        this.setCalculated("Spells 1022", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 0).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[7] || "");
        this.setCalculated("Spells 1015", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 1).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[0] || "");
        this.setCalculated("Spells 1023", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 1).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[1] || "");
        this.setCalculated("Spells 1024", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 1).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[2] || "");
        this.setCalculated("Spells 1025", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 1).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[3] || "");
        this.setCalculated("Spells 1026", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 1).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[4] || "");
        this.setCalculated("Spells 1027", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 1).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[5] || "");
        this.setCalculated("Spells 1028", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 1).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[6] || "");
        this.setCalculated("Spells 1029", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 1).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[7] || "");
        this.setCalculated("Spells 1030", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 1).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[8] || "");
        this.setCalculated("Spells 1031", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 1).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[9] || "");
        this.setCalculated("Spells 1032", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 1).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[10] || "");
        this.setCalculated("Spells 1033", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 1).map(x => x.name + " " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[11] || "");
        this.setCalculated("Check Box 251", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 1)[0]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 309", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 1)[1]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3010", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 1)[2]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3011", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 1)[3]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3012", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 1)[4]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3013", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 1)[5]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3014", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 1)[6]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3015", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 1)[7]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3016", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 1)[8]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3017", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 1)[9]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3018", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 1)[10]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3019", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 1)[11]?.system.preparation.prepared || "");
        this.setCalculated("Spells 1046", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 2).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[0] || "");
        this.setCalculated("Spells 1034", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 2).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[1] || "");
        this.setCalculated("Spells 1035", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 2).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[2] || "");
        this.setCalculated("Spells 1036", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 2).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[3] || "");
        this.setCalculated("Spells 1037", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 2).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[4] || "");
        this.setCalculated("Spells 1038", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 2).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[5] || "");
        this.setCalculated("Spells 1039", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 2).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[6] || "");
        this.setCalculated("Spells 1040", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 2).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[7] || "");
        this.setCalculated("Spells 1041", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 2).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[8] || "");
        this.setCalculated("Spells 1042", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 2).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[9] || "");
        this.setCalculated("Spells 1043", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 2).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[10] || "");
        this.setCalculated("Spells 1044", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 2).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[11] || "");
        this.setCalculated("Spells 1045", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 2).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[12] || "");
        this.setCalculated("Check Box 313", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 2)[0]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 310", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 2)[1]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3020", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 2)[2]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3021", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 2)[3]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3022", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 2)[4]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3023", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 2)[5]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3024", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 2)[6]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3025", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 2)[7]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3026", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 2)[8]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3027", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 2)[9]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3028", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 2)[10]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3029", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 2)[11]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3030", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 2)[12]?.system.preparation.prepared || "");
        this.setCalculated("Spells 1048", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 3).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[0] || "");
        this.setCalculated("Spells 1047", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 3).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[1] || "");
        this.setCalculated("Spells 1049", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 3).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[2] || "");
        this.setCalculated("Spells 1050", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 3).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[3] || "");
        this.setCalculated("Spells 1051", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 3).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[4] || "");
        this.setCalculated("Spells 1052", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 3).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[5] || "");
        this.setCalculated("Spells 1053", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 3).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[6] || "");
        this.setCalculated("Spells 1054", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 3).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[7] || "");
        this.setCalculated("Spells 1055", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 3).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[8] || "");
        this.setCalculated("Spells 1056", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 3).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[9] || "");
        this.setCalculated("Spells 1057", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 3).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[10] || "");
        this.setCalculated("Spells 1058", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 3).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[11] || "");
        this.setCalculated("Spells 1059", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 3).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[12] || "");
        this.setCalculated("Check Box 315", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 3)[0]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 314", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 3)[1]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3031", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 3)[2]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3032", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 3)[3]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3033", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 3)[4]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3034", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 3)[5]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3035", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 3)[6]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3036", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 3)[7]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3037", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 3)[8]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3038", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 3)[9]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3039", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 3)[10]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3040", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 3)[11]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3041", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 3)[12]?.system.preparation.prepared || "");
        this.setCalculated("Spells 1061", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 4).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[0] || "");
        this.setCalculated("Spells 1060", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 4).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[1] || "");
        this.setCalculated("Spells 1062", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 4).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[2] || "");
        this.setCalculated("Spells 1063", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 4).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[3] || "");
        this.setCalculated("Spells 1064", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 4).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[4] || "");
        this.setCalculated("Spells 1065", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 4).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[5] || "");
        this.setCalculated("Spells 1066", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 4).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[6] || "");
        this.setCalculated("Spells 1067", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 4).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[7] || "");
        this.setCalculated("Spells 1068", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 4).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[8] || "");
        this.setCalculated("Spells 1069", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 4).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[9] || "");
        this.setCalculated("Spells 1070", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 4).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[10] || "");
        this.setCalculated("Spells 1071", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 4).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[11] || "");
        this.setCalculated("Spells 1072", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 4).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[12] || "");
        this.setCalculated("Check Box 317", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 4)[0]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 316", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 4)[1]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3042", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 4)[2]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3043", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 4)[3]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3044", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 4)[4]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3045", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 4)[5]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3046", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 4)[6]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3047", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 4)[7]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3048", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 4)[8]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3049", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 4)[9]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3050", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 4)[10]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3051", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 4)[11]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3052", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 4)[12]?.system.preparation.prepared || "");
        this.setCalculated("Spells 1074", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 5).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[0] || "");
        this.setCalculated("Spells 1073", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 5).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[1] || "");
        this.setCalculated("Spells 1075", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 5).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[2] || "");
        this.setCalculated("Spells 1076", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 5).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[3] || "");
        this.setCalculated("Spells 1077", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 5).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[4] || "");
        this.setCalculated("Spells 1078", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 5).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[5] || "");
        this.setCalculated("Spells 1079", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 5).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[6] || "");
        this.setCalculated("Spells 1080", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 5).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[7] || "");
        this.setCalculated("Spells 1081", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 5).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[8] || "");
        this.setCalculated("Check Box 319", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 5)[0]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 318", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 5)[1]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3053", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 5)[2]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3054", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 5)[3]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3055", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 5)[4]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3056", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 5)[5]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3057", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 5)[6]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3058", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 5)[7]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3059", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 5)[8]?.system.preparation.prepared || "");
        this.setCalculated("Spells 1083", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 6).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[0] || "");
        this.setCalculated("Spells 1082", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 6).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[1] || "");
        this.setCalculated("Spells 1084", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 6).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[2] || "");
        this.setCalculated("Spells 1085", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 6).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[3] || "");
        this.setCalculated("Spells 1086", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 6).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[4] || "");
        this.setCalculated("Spells 1087", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 6).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[5] || "");
        this.setCalculated("Spells 1088", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 6).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[6] || "");
        this.setCalculated("Spells 1089", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 6).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[7] || "");
        this.setCalculated("Spells 1090", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 6).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[8] || "");
        this.setCalculated("Check Box 321", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 6)[0]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 320", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 6)[1]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3060", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 6)[2]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3061", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 6)[3]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3062", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 6)[4]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3063", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 6)[5]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3064", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 6)[6]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3065", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 6)[7]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3066", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 6)[8]?.system.preparation.prepared || "");
        this.setCalculated("Spells 1092", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 7).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[0] || "");
        this.setCalculated("Spells 1091", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 7).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[1] || "");
        this.setCalculated("Spells 1093", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 7).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[2] || "");
        this.setCalculated("Spells 1094", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 7).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[3] || "");
        this.setCalculated("Spells 1095", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 7).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[4] || "");
        this.setCalculated("Spells 1096", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 7).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[5] || "");
        this.setCalculated("Spells 1097", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 7).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[6] || "");
        this.setCalculated("Spells 1098", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 7).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[7] || "");
        this.setCalculated("Spells 1099", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 7).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[8] || "");
        this.setCalculated("Check Box 323", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 7)[0]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 322", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 7)[1]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3067", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 7)[2]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3068", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 7)[3]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3069", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 7)[4]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3070", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 7)[5]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3071", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 7)[6]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3072", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 7)[7]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3073", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 7)[8]?.system.preparation.prepared || "");
        this.setCalculated("Spells 10101", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 8).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[0] || "");
        this.setCalculated("Spells 10100", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 8).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[1] || "");
        this.setCalculated("Spells 10102", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 8).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[2] || "");
        this.setCalculated("Spells 10103", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 8).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[3] || "");
        this.setCalculated("Spells 10104", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 8).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[4] || "");
        this.setCalculated("Spells 10105", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 8).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[5] || "");
        this.setCalculated("Spells 10106", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 8).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[6] || "");
        this.setCalculated("Check Box 325", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 8)[0]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 324", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 8)[1]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3074", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 8)[2]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3075", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 8)[3]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3076", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 8)[4]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3077", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 8)[5]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3078", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 8)[6]?.system.preparation.prepared || "");
        this.setCalculated("Spells 10108", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 9).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[0] || "");
        this.setCalculated("Spells 10107", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 9).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[1] || "");
        this.setCalculated("Spells 10109", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 9).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[2] || "");
        this.setCalculated("Spells 101010", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 9).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[3] || "");
        this.setCalculated("Spells 101011", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 9).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[4] || "");
        this.setCalculated("Spells 101012", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 9).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[5] || "");
        this.setCalculated("Spells 101013", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 9).map(x => x.name + " - " + (x.system.properties.has('vocal') ? "V" : "") + (x.system.properties.has('somatic') ? "S" : "") + (x.system.properties.has('material') ? "M" : "") + (x.system.properties.has('ritual') ? "R" : "") + (x.system.properties.has('concentration') ? "C" : "")).sort()[6] || "");
        this.setCalculated("Check Box 327", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 9)[0]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 326", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 9)[1]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3079", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 9)[2]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3080", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 9)[3]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3081", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 9)[4]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3082", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 9)[5]?.system.preparation.prepared || "");
        this.setCalculated("Check Box 3083", this.actor.items.filter(i => i.type === 'spell' && i.system.level === 9)[6]?.system.preparation.prepared || "");
        //        this.mapCompleteSpells();
        //        this.mapEquipment();
    }

    /*
        mapCompleteSpells() {
            let orderedSpells = this.actor.items.filter(i => i.type === 'spell').sort((a, b) => { return (a.system.level - b.system.level || a.name.localeCompare(b.name)) })
            const maxSpells = orderedSpells.length < 80 ? orderedSpells.length : 80;
            for (let index = 0; index < maxSpells; index++) {
                const theSpell = orderedSpells[index];
                const spellIndex = (index + 1).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
                this.setCalculated(`spell_name_${spellIndex}`, theSpell.name + ((typeof theSpell.flags['items-with-spells-5e'] !== 'undefined') ? '[' + fromUuidSync(theSpell.flags['items-with-spells-5e']['parent-item']).name + ']' : '') || "");
                this.setCalculated(`spell_school_${spellIndex}`, theSpell.system.school || "");
                this.setCalculated(`spell_level_${spellIndex}`, theSpell.system.level || 0);
                this.setCalculated(`spell_description_${spellIndex}`, (function (h) {
                    const d = document.createElement("div");
                    d.innerHTML = h;
                    return d.textContent || d.innerText || "";
                })(theSpell.system.description.value || ""));
                this.setCalculated(`spell_verbal_${spellIndex}`, theSpell.system.properties.has('vocal') || 0);
                this.setCalculated(`spell_somatic_${spellIndex}`, theSpell.system.properties.has('somatic') || 0);
                this.setCalculated(`spell_material_${spellIndex}`, theSpell.system.properties.has('material') || 0);
                this.setCalculated(`spell_ritual_${spellIndex}`, theSpell.system.properties.has('ritual') || 0);
                this.setCalculated(`spell_concentration_${spellIndex}`, theSpell.system.properties.has('concentration') || 0);
                this.setCalculated(`spell_range_${spellIndex}`, (theSpell.system.range?.value != null ? theSpell.system.range.value + " " : "") + theSpell.system.range.units || "");
                this.setCalculated(`spell_casting_${spellIndex}`, (theSpell.system.activation?.cost != null ? theSpell.system.activation?.cost + " " : "") + theSpell.system.activation.type || "");
                this.setCalculated(`spell_duration_${spellIndex}`, theSpell.system.duration?.value + " " + theSpell.system.duration.units || "");
            }
        }
    
        mapEquipment() {
            this.setGlobalValue("equipment_extended", this.actor.items.filter(i => ['weapon', 'equipment', 'tool', 'consumable', 'loot', 'backpack'].includes(i.type)).map(i => `${i.name} (${i.system.quantity}): \n${((h) => {
                const d = document.createElement("div");
                d.innerHTML = h;
                return d.textContent || d.innerText || "";
            })(i.system.description.value)}\n`).join("\n"));
    
            this.setCalculated("equipment_extended1", this.getGlobalValue("equipment_extended", 0, 2500));
            this.setCalculated("equipment_extended2", this.getGlobalValue("equipment_extended", 2500, 5000));
            this.setCalculated("equipment_extended3", this.getGlobalValue("equipment_extended", 5000, 7500));
            this.setCalculated("equipment_extended4", this.getGlobalValue("equipment_extended", 7500, 10000));
    
        }
    */
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
        const sc = classItem?.system?.subclass;
        return sc ? game.i18n.localize(classItem?.name) + "/" + game.i18n.localize(sc) : game.i18n.localize(classItem?.name);
    }

    getLocalizedClassAndSubclassAndLevel(classItem) {
        return `${this.getLocalizedClassAndSubclass(classItem)} ${classItem?.system?.levels}`;
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

    // this is the override of the function to define the layout of the spell cards
    getCardLayoutConfig() {
        return super.getCardLayoutConfig({
            page: {
                width: 595.28,
                height: 841.89,
                margin: 0,
                backgroundImage: {
                    background: {
                        path: "/modules/sheet-export/mappings/dnd5e/SpellCardPage.png",
                        width: 24,
                        height: 24
                    }
                }
            },
            card: {
                width: 297.64,
                height: 420.945
            },
            rows: 2,
            columns: 2,
            fonts: {
                TitleFont: "/modules/sheet-export/mappings/dnd5e/BLKCHCRY.TTF",
                BodyFont: "/modules/sheet-export/mappings/dnd5e/Roboto-Regular.ttf"
            },
            images: {
                Evocation: {
                    path: "/modules/sheet-export/mappings/dnd5e/Evocation.webp",
                    width: 24,
                    height: 24
                },
                Conjuration: {
                    path: "/modules/sheet-export/mappings/dnd5e/Conjuration.webp",
                    width: 24,
                    height: 24
                },
                Transmutation: {
                    path: "/modules/sheet-export/mappings/dnd5e/Transmutation.webp",
                    width: 24,
                    height: 24
                },
                Divination: {
                    path: "/modules/sheet-export/mappings/dnd5e/Divination.webp",
                    width: 24,
                    height: 24
                },
                Enchantment: {
                    path: "/modules/sheet-export/mappings/dnd5e/Enchantment.webp",
                    width: 24,
                    height: 24
                },
                Illusion: {
                    path: "/modules/sheet-export/mappings/dnd5e/Illusion.webp",
                    width: 24,
                    height: 24
                },
                Abjuration: {
                    path: "/modules/sheet-export/mappings/dnd5e/Abjuration.webp",
                    width: 24,
                    height: 24
                },
                Necromancy: {
                    path: "/modules/sheet-export/mappings/dnd5e/Necromancy.webp",
                    width: 24,
                    height: 24
                }
            }
        });
    }


    // this is override of the card template
    getCardTemplate() {
        return super.getCardTemplate({
            fields: [
                {
                    key: "title",
                    type: "text",
                    fontName: "TitleFont",
                    size: 12,
                    center: true,
                    color: "#550000",
                    width: 211.2,
                    height: 16.8,
                    x: 13.2,
                    y: 387.545
                    //                    y: 803.49
                },
                {
                    key: "level",
                    type: "text",
                    fontName: "BodyFont",
                    size: 15,
                    color: "#e0b710",
                    x: 248.8,
                    y: 383
                },
                {
                    key: "school",
                    type: "imageRef",
                    width: 24,
                    height: 24,
                    x: 241.7,
                    y: 353
                },
                {
                    key: "school",
                    type: "text",
                    fontName: "BodyFont",
                    size: 6,
                    center: true,
                    color: "#e0b710",
                    width: 38.4,
                    height: 10,
                    x: 234.24,
                    y: 340
                },
                {
                    key: "casting",
                    type: "text",
                    fontName: "BodyFont",
                    size: 9,
                    color: "#222222",
                    x: 12,
                    y: 357
                },
                {
                    key: "range",
                    type: "text",
                    fontName: "BodyFont",
                    size: 9,
                    color: "#222222",
                    x: 86,
                    y: 357
                },
                {
                    key: "duration",
                    type: "text",
                    fontName: "BodyFont",
                    size: 9,
                    color: "#222222",
                    x: 160,
                    y: 357
                },
                {
                    key: "description",
                    type: "text",
                    fontName: "BodyFont",
                    wrap: true,
                    size: 9,
                    color: "#222222",
                    width: 273.6,
                    height: 312,
                    x: 12,
                    y: 12.945
                    //                    y: 433.89
                }
            ],
            checkboxes: [{
                key: "ritual",
                x: 38.2,
                y: 328.5
            },
            {
                key: "concentration",
                x: 91.3,
                y: 328.5
            },
            {
                key: "verbal",
                x: 135,
                y: 328.5
            },
            {
                key: "somatic",
                x: 175.5,
                y: 328.5
            },
            {
                key: "material",
                x: 218.55,
                y: 328.5
            }
            ]
        });
    }


    getCardDataArray() {
        const spells = this.actor.items.filter(i => i.type === 'spell').sort((a, b) => { return (a.system.level - b.system.level || a.name.localeCompare(b.name)) })
        console.log(spells)
        return spells.map(spell => ({
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
    }

    getCardItemLayoutConfig() {
        return super.getCardLayoutConfig({
            page: {
                width: 595.28,
                height: 841.89,
                margin: 0,
                backgroundImage: {
                    background: {
                        path: "/modules/sheet-export/mappings/dnd5e/ItemCardPage.png",
                        width: 24,
                        height: 24
                    }
                }
            },
            card: {
                width: 297.64,
                height: 210.472
            },
            rows: 4,
            columns: 2,
            fonts: {
                TitleFont: "/modules/sheet-export/mappings/dnd5e/BLKCHCRY.TTF",
                BodyFont: "/modules/sheet-export/mappings/dnd5e/Roboto-Regular.ttf"
            },
            images: {
            }
        });
    }

    getCardItemTemplate() {
        return super.getCardTemplate({
            fields: [
                {
                    key: "title",
                    type: "text",
                    fontName: "TitleFont",
                    size: 12,
                    center: true,
                    color: "#550000",
                    width: 211.2,
                    height: 16.8,
                    x: 13.2,
                    y: 177.073
                    //                    y: 803.49
                },
                {
                    key: "description",
                    type: "text",
                    fontName: "BodyFont",
                    wrap: true,
                    size: 7,
                    color: "#222222",
                    width: 273.6,
                    height: 144.96,
                    x: 12,
                    y: 7
                    //                    y: 12.945
                    //                    y: 433.89
                }
            ]
        });
    }

    getCardItemDataArray() {
        //const spells = this.actor.items.filter(i => i.type === 'spell').sort((a, b) => { return (a.system.level - b.system.level || a.name.localeCompare(b.name)) })
        const items = this.actor.items.filter(i => ['weapon', 'equipment', 'tool', 'consumable', 'loot', 'backpack'].includes(i.type));
        console.log(items)
        return items.map(item => ({
            title: item.name,
            description: this.htmlToText(item.system.description?.value || ""),
        }));
    }


    getCardFeatLayoutConfig() {
        return super.getCardLayoutConfig({
            page: {
                width: 595.28,
                height: 841.89,
                margin: 0,
                backgroundImage: {
                    background: {
                        path: "/modules/sheet-export/mappings/dnd5e/ItemCardPage.png",
                        width: 24,
                        height: 24
                    }
                }
            },
            card: {
                width: 297.64,
                height: 210.472
            },
            rows: 4,
            columns: 2,
            fonts: {
                TitleFont: "/modules/sheet-export/mappings/dnd5e/BLKCHCRY.TTF",
                BodyFont: "/modules/sheet-export/mappings/dnd5e/Roboto-Regular.ttf"
            },
            images: {
            }
        });
    }

    getCardFeatTemplate() {
        return super.getCardTemplate({
            fields: [
                {
                    key: "title",
                    type: "text",
                    fontName: "TitleFont",
                    size: 12,
                    center: true,
                    color: "#550000",
                    width: 211.2,
                    height: 16.8,
                    x: 13.2,
                    y: 177.073
                    //                    y: 803.49
                },
                {
                    key: "description",
                    type: "text",
                    fontName: "BodyFont",
                    wrap: true,
                    size: 7,
                    color: "#222222",
                    width: 273.6,
                    height: 144.96,
                    x: 12,
                    y: 7
                    //                    y: 12.945
                    //                    y: 433.89
                }
            ]
        });
    }

    getCardFeatDataArray() {
        //const spells = this.actor.items.filter(i => i.type === 'spell').sort((a, b) => { return (a.system.level - b.system.level || a.name.localeCompare(b.name)) })
        //const items = this.actor.items.filter(i => ['weapon', 'equipment', 'tool', 'consumable', 'loot', 'backpack'].includes(i.type));
        const feats = this.actor.items.filter(i => ['feat', 'trait'].includes(i.type))
        console.log(feats)
        return feats.map(feat => ({
            title: feat.name,
            description: this.htmlToText(feat.system.description?.value || ""),
        }));
    }


    getCardSections() {
        return [
            {
                layoutConfig: this.getCardFeatLayoutConfig(),
                cardTemplate: this.getCardFeatTemplate(),
                cardDataArray: this.getCardFeatDataArray()
            },
            {
                layoutConfig: this.getCardItemLayoutConfig(),
                cardTemplate: this.getCardItemTemplate(),
                cardDataArray: this.getCardItemDataArray()
            },
            {
                layoutConfig: this.getCardLayoutConfig(),
                cardTemplate: this.getCardTemplate(),
                cardDataArray: this.getCardDataArray()   // e.g., player spells
            }
        ];
    }
}

export default MappingClass;
