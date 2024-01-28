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
    createMappings() {
        super.createMappings();

        // Set the PDF files to use - MIND that the order of the files is important!
        this.pdfFiles.push({
            pdfUrl: '/modules/sheet-export/mappings/pf1/Pf1e-Foundry_to_PDF.pdf',
            nameDownload: `${this.actor.name ?? "character"}.pdf`,
            name: "Pf1e-Foundry_to_PDF.pdf",
        });



        this.setCalculated("Player", Object.entries(this.actor.permission).filter(entry => entry[1] === 3).map(entry => entry[0]).map(id => !game.users.get(id)?.isGM ? game.users.get(id)?.name : null).filter(x => x).join(", "));
        this.setCalculated("Character Name", this.actor.name);
        this.setCalculated("Alignment", this.actor.system.details.alignment);
        this.setCalculated("Class", this.actor.items.filter(i => i.type === "class").map(i => i.data.name)[0]);
        this.setCalculated("Level", this.actor.items.filter(i => i.type === "class").map(i => i.system.level)[0]);
        this.setCalculated("Class1", this.actor.items.filter(i => i.type === "class").map(i => i.data.name)[1] || "");
        this.setCalculated("Level1", this.actor.items.filter(i => i.type === "class").map(i => i.system.level)[1] || "");
        this.setCalculated("Deity", this.actor.system.details.deity);
        this.setCalculated("Race", this.actor.items.filter(i => i.type === "race").map(i => i.data.name)[0]);
        this.setCalculated("Size", this.actor.system.traits.size);
        this.setCalculated("Gender", this.actor.system.details.gender);
        this.setCalculated("Age", this.actor.system.details.age);
        this.setCalculated("Height", this.actor.system.details.height);
        this.setCalculated("Weight", this.actor.system.details.weight);
        this.setCalculated("Total Hp", this.actor.system.attributes.hp.max);
        this.setCalculated("Damage Reduction", this.actor.system.traits.dr);
        this.setCalculated("Base Speed", this.actor.system.attributes.speed.land.base);
        this.setCalculated("With Armor", this.actor.system.attributes.speed.land.total);
        this.setCalculated("Fly", this.actor.system.attributes.speed.fly.base);
        this.setCalculated("Maneuverability", this.actor.system.attributes.speed.fly.maneuverability);
        this.setCalculated("Swim", this.actor.system.attributes.speed.swim.base);
        this.setCalculated("Climb", this.actor.system.attributes.speed.climb.base);
        this.setCalculated("Burrow", this.actor.system.attributes.speed.burrow.base);
        this.setCalculated("Ability Score Strength", this.actor.system.abilities.str.total);
        this.setCalculated("Ability Score Dexterity", this.actor.system.abilities.dex.total);
        this.setCalculated("Ability Score Constitution", this.actor.system.abilities.con.total);
        this.setCalculated("Ability Score Intelligence", this.actor.system.abilities.int.total);
        this.setCalculated("Ability Score Wisdom", this.actor.system.abilities.wis.total);
        this.setCalculated("Ability Score Charisma", this.actor.system.abilities.cha.total);
        this.setCalculated("Ability Modifier Strength", this.actor.system.abilities.str.mod);
        this.setCalculated("Ability Modifier Dexterity", this.actor.system.abilities.dex.mod);
        this.setCalculated("Ability Modifier Constitution", this.actor.system.abilities.con.mod);
        this.setCalculated("Ability Modifier Intelligence", this.actor.system.abilities.int.mod);
        this.setCalculated("Ability Modifier Wisdom", this.actor.system.abilities.wis.mod);
        this.setCalculated("Ability Modifier Charisma", this.actor.system.abilities.cha.mod);
        this.setCalculated("Total Initiative Modifier", this.actor.system.attributes.init.total);
        this.setCalculated("Dex Modifier ini", this.actor.system.abilities.dex.mod);
        this.setCalculated("Initiative Misc Modifier", this.actor.system.attributes.init.bonus);
        this.setCalculated("Total Armor Class", this.actor.system.attributes.ac.normal.total);
        this.setCalculated("Armor Bonus", this.actor.system.ac.normal.total);
        this.setCalculated("Shield Bonus", this.actor.system.ac.shield.total);
        this.setCalculated("Dex Modifier1", this.actor.system.abilities.dex.mod);
        this.setCalculated("Size Modifier1", this.actor.system.traits.size);
        this.setCalculated("Natural Armor", this.actor.system.attributes.naturalAC);
        this.setCalculated("AC Misc Modifier", Math.floor(this.actor.system.attributes.ac.normal.total - this.actor.system.ac.normal.total - this.actor.system.ac.shield.total - this.actor.system.abilities.dex.mod - this.actor.system.attributes.naturalAC - 10));
        this.setCalculated("Touch Armor Class", this.actor.system.attributes.ac.touch.total);
        this.setCalculated("Total Fortitude Save", this.actor.system.attributes.savingThrows.fort.total);
        this.setCalculated("Base Save Fortitude", this.actor.items.filter(i => i.type === "class").map(i => i.system.savingThrows.fort.value)[0]);
        this.setCalculated("Con Modifier S", this.actor.system.abilities.con.mod);
        this.setCalculated("Total Reflex Save", this.actor.system.attributes.savingThrows.ref.total);
        this.setCalculated("Base Save Reflex", this.actor.items.filter(i => i.type === "class").map(i => i.system.savingThrows.ref.value)[0]);
        this.setCalculated("Dex Modifier S", this.actor.system.abilities.dex.mod);
        this.setCalculated("Total Will save", this.actor.system.attributes.savingThrows.will.total);
        this.setCalculated("Base Save Will", this.actor.items.filter(i => i.type === "class").map(i => i.system.savingThrows.will.value)[0]);
        this.setCalculated("Wis Modifier S", this.actor.system.abilities.wis.mod);
        this.setCalculated("Magic Modifier Fortitude", this.actor.items.filter(i => i.type === "class").map(i => i.system.savingThrows.fort.value)[1] || "");
        this.setCalculated("Magic Modifier Reflex", this.actor.items.filter(i => i.type === "class").map(i => i.system.savingThrows.ref.value)[1] || "");
        this.setCalculated("Magic Modifier Will", this.actor.items.filter(i => i.type === "class").map(i => i.system.savingThrows.will.value)[1] || "");
        this.setCalculated("Saving Throw Modifiers", this.actor.system.attributes.saveNotes);
        this.setCalculated("Weapon Name Slot 1", this.actor.items.filter(i => i.type === "weapon" && i.system.equipped && i.hasAttack && i.hasDamage)[0]?.name || "");
        this.setCalculated("Weapon Name Slot 2", this.actor.items.filter(i => i.type === "weapon" && i.system.equipped && i.hasAttack && i.hasDamage)[1]?.name || "");
        this.setCalculated("Weapon Name Slot 3", this.actor.items.filter(i => i.type === "weapon" && i.system.equipped && i.hasAttack && i.hasDamage)[2]?.name || "");
        this.setCalculated("Weapon Name Slot 4", this.actor.items.filter(i => i.type === "weapon" && i.system.equipped && i.hasAttack && i.hasDamage)[3]?.name || "");
        this.setCalculated("Weapon Name Slot 5", this.actor.items.filter(i => i.type === "weapon" && i.system.equipped && i.hasAttack && i.hasDamage)[4]?.name || "");
        this.setCalculated("Type Slot 1", this.actor.items.filter(i => i.type === "weapon" && i.system.equipped && i.hasAttack && i.hasDamage)[0]?.system.weaponSubtype || "");
        this.setCalculated("Type Slot 2", this.actor.items.filter(i => i.type === "weapon" && i.system.equipped && i.hasAttack && i.hasDamage)[1]?.system.weaponSubtype || "");
        this.setCalculated("Type Slot 3", this.actor.items.filter(i => i.type === "weapon" && i.system.equipped && i.hasAttack && i.hasDamage)[2]?.system.weaponSubtype || "");
        this.setCalculated("Type Slot 4", this.actor.items.filter(i => i.type === "weapon" && i.system.equipped && i.hasAttack && i.hasDamage)[3]?.system.weaponSubtype || "");
        this.setCalculated("Type Slot 5", this.actor.items.filter(i => i.type === "weapon" && i.system.equipped && i.hasAttack && i.hasDamage)[4]?.system.weaponSubtype || "");
        this.setCalculated("Attack Bonus Slot 1", this.actor.items.filter(i => i.type === "weapon" && i.system.equipped && i.hasAttack && i.hasDamage)[0]?.system.weaponSubtype || "");
        this.setCalculated("Attack Bonus Slot 2", this.actor.items.filter(i => i.type === "weapon" && i.system.equipped && i.hasAttack && i.hasDamage)[1]?.system.weaponSubtype || "");
        this.setCalculated("Attack Bonus Slot 3", this.actor.items.filter(i => i.type === "weapon" && i.system.equipped && i.hasAttack && i.hasDamage)[2]?.system.weaponSubtype || "");
        this.setCalculated("Attack Bonus Slot 4", this.actor.items.filter(i => i.type === "weapon" && i.system.equipped && i.hasAttack && i.hasDamage)[3]?.system.weaponSubtype || "");
        this.setCalculated("Attack Bonus Slot 5", this.actor.items.filter(i => i.type === "weapon" && i.system.equipped && i.hasAttack && i.hasDamage)[4]?.system.weaponSubtype || "");
        /*
        this.setCalculated("Critical Slot 1", this.actor.items.filter(i => i.type === "weapon" && i.system.equipped && i.hasAttack && i.hasDamage)[0]?.system.ability.critRange || "");
        this.setCalculated("Critical Slot 2", this.actor.items.filter(i => i.type === "weapon" && i.system.equipped && i.hasAttack && i.hasDamage)[1]?.data.data.ability.critRange || "");
        this.setCalculated("Critical Slot 3", this.actor.items.filter(i => i.type === "weapon" && i.system.equipped && i.hasAttack && i.hasDamage)[2]?.data.data.ability.critRange || "");
        this.setCalculated("Critical Slot 4", this.actor.items.filter(i => i.type === "weapon" && i.system.equipped && i.hasAttack && i.hasDamage)[3]?.data.data.ability.critRange || "");
        this.setCalculated("Critical Slot 5", this.actor.items.filter(i => i.type === "weapon" && i.system.equipped && i.hasAttack && i.hasDamage)[4]?.data.data.ability.critRange || "");
        this.setCalculated("Multi Slot 1", this.actor.items.filter(i => i.type === "weapon" && i.system.equipped && i.hasAttack && i.hasDamage)[0]?.data.data.ability.critMult || "");
        this.setCalculated("Multi Slot 2", this.actor.items.filter(i => i.type === "weapon" && i.system.equipped && i.hasAttack && i.hasDamage)[1]?.data.data.ability.critMult || "");
        this.setCalculated("Multi Slot 3", this.actor.items.filter(i => i.type === "weapon" && i.system.equipped && i.hasAttack && i.hasDamage)[2]?.data.data.ability.critMult || "");
        this.setCalculated("Multi Slot 4", this.actor.items.filter(i => i.type === "weapon" && i.system.equipped && i.hasAttack && i.hasDamage)[3]?.data.data.ability.critMult || "");
        this.setCalculated("Multi Slot 5", this.actor.items.filter(i => i.type === "weapon" && i.system.equipped && i.hasAttack && i.hasDamage)[4]?.data.data.ability.critMult || "");
        */
        this.setCalculated("Total CMB", this.actor.system.attributes.cmb.total);
        this.setCalculated("Total CMD", this.actor.system.attributes.cmd.total);
        this.setCalculated("Base Attack Bonus_a", this.actor.system.attributes.bab.total);
        this.setCalculated("Spell Resistance", this.actor.system.attributes.sr.total);
        this.setCalculated("Base Attack Bonus1", this.actor.system.attributes.bab.total);
        this.setCalculated("Base Attack Bonus2", this.actor.system.attributes.bab.total);
        this.setCalculated("Str Modifiercmb", this.actor.system.abilities.str.mod);
        this.setCalculated("Str Modifiercmd", this.actor.system.abilities.str.mod);
        this.setCalculated("Dex Modifiercmd", this.actor.system.abilities.dex.mod);
        this.setCalculated("Size Modifiercmb", this.actor.system.traits.size);
        this.setCalculated("Size Modifiercmd", this.actor.system.traits.size);
        this.setCalculated("Item 1", this.actor.items.filter(i => ["loot", "weapon", "container", "consumable", "equipment"].includes(i.type)).map(i => `${i.name} (${i.system.quantity})`).sort().join(",\n"));
        this.setCalculated("Spell Name Level 0", this.actor.items.filter(i => ["spell"].includes(i.type) && i.system.level === 0).map(i => `this.actor.{i.name}`).sort().join(" // "));
        this.setCalculated("Spell Name Level 1", this.actor.items.filter(i => ["spell"].includes(i.type) && i.system.level === 1).map(i => `this.actor.{i.name}`).sort().join(" // "));
        this.setCalculated("Spell Name Level 2", this.actor.items.filter(i => ["spell"].includes(i.type) && i.system.level === 2).map(i => `this.actor.{i.name}`).sort().join(" // "));
        this.setCalculated("Spell Name Level 3", this.actor.items.filter(i => ["spell"].includes(i.type) && i.system.level === 3).map(i => `this.actor.{i.name}`).sort().join(" // "));
        this.setCalculated("Spell Name Level 4", this.actor.items.filter(i => ["spell"].includes(i.type) && i.system.level === 4).map(i => `this.actor.{i.name}`).sort().join(" // "));
        this.setCalculated("Spell Name Level 5", this.actor.items.filter(i => ["spell"].includes(i.type) && i.system.level === 5).map(i => `this.actor.{i.name}`).sort().join(" // "));
        this.setCalculated("Spell Name Level 6", this.actor.items.filter(i => ["spell"].includes(i.type) && i.system.level === 6).map(i => `this.actor.{i.name}`).sort().join(" // "));
        this.setCalculated("Spell Name Level 7", this.actor.items.filter(i => ["spell"].includes(i.type) && i.system.level === 7).map(i => `this.actor.{i.name}`).sort().join(" // "));
        this.setCalculated("Spell Name Level 8", this.actor.items.filter(i => ["spell"].includes(i.type) && i.system.level === 8).map(i => `this.actor.{i.name}`).sort().join(" // "));
        this.setCalculated("Spell Name Level 9", this.actor.items.filter(i => ["spell"].includes(i.type) && i.system.level === 9).map(i => `this.actor.{i.name}`).sort().join(" // "));
        this.setCalculated("Copper", this.actor.system.currency.cp || "");
        this.setCalculated("Silver", this.actor.system.currency.sp || "");
        this.setCalculated("Gold", this.actor.system.currency.gp || "");
        this.setCalculated("Platinum", this.actor.system.currency.pp || "");
        this.setCalculated("Total WT", this.actor.system.attributes.encumbrance.carriedWeight);
        this.setCalculated("Light Load", this.actor.system.attributes.encumbrance.levels.light);
        this.setCalculated("Medium Load", this.actor.system.attributes.encumbrance.levels.medium);
        this.setCalculated("Heavy Load", this.actor.system.attributes.encumbrance.levels.heavy);
        this.setCalculated("Lift Over Head", this.actor.system.attributes.encumbrance.levels.heavy);
        this.setCalculated("Lift Off Ground", this.actor.system.attributes.encumbrance.levels.carry);
        this.setCalculated("Drag or Push", this.actor.system.attributes.encumbrance.levels.drag);
        this.setCalculated("Feat 1", this.actor.items.filter(i => i.type === "feat" && i.subType === "feat").map(i => i.name).sort().join("\n"));
        this.setCalculated("Special Abilities 1", this.actor.items.filter(i => i.type === "feat" && i.subType === "classFeat").map(i => i.name).sort().join("\n"));
        this.setCalculated("Special Abilities 2", this.actor.items.filter(i => i.type === "feat" && i.subType === "trait").map(i => i.name).sort().join("\n"));
        this.setCalculated("First Class Experience Points", this.actor.system.details.xp.value);
        this.setCalculated("First Class Next Level", this.actor.system.details.xp.max);
        this.setCalculated("First Class Experience Points1", this.actor.system.details.xp.pct);
        /*
        this.setCalculated("Spells Per Day Level 0", this.actor.data.spells.primary.spells.spell0.value);
        this.setCalculated("Spells Per Day Level 1", this.actor.data.spells.primary.spells.spell1.value);
        this.setCalculated("Spells Per Day Level 2", this.actor.data.spells.primary.spells.spell2.value);
        this.setCalculated("Spells Per Day Level 3", this.actor.data.spells.primary.spells.spell3.value);
        this.setCalculated("Spells Per Day Level 4", this.actor.data.spells.primary.spells.spell4.value);
        this.setCalculated("Spells Per Day Level 5", this.actor.data.spells.primary.spells.spell5.value);
        this.setCalculated("Spells Per Day Level 6", this.actor.data.spells.primary.spells.spell6.value);
        this.setCalculated("Spells Per Day Level 7", this.actor.data.spells.primary.spells.spell7.value);
        this.setCalculated("Spells Per Day Level 8", this.actor.data.spells.primary.spells.spell8.value);
        this.setCalculated("Spells Per Day Level 9", this.actor.data.spells.primary.spells.spell9.value);
        this.setCalculated("Close", this.actor.data.spells.primary.range.close);
        this.setCalculated("Medium", this.actor.data.spells.primary.range.medium);
        this.setCalculated("Long", this.actor.data.spells.primary.range.long);
        */
        this.setCalculated("AC Items Slot 1", this.actor.items.filter(i => i.type === "equipment" && i.subType === "armor").map(i => i.name).sort().join(",\n"));
        this.setCalculated("AC Items Slot 2", this.actor.items.filter(i => i.type === "equipment" && i.subType === "shield").map(i => i.name).sort().join(",\n"));
        /*
        this.setCalculated("Bonus 1", this.actor.data.armor.total);
        this.setCalculated("Bonus 2", this.actor.data.shield.total);
        */
        this.setCalculated("Type 1", this.actor.items.filter(i => i.type === "equipment" && i.subType === "armor").map(i => i.system.equipmentSubtype).sort().join(",\n"));
        this.setCalculated("Type 2", this.actor.items.filter(i => i.type === "equipment" && i.subType === "shield").map(i => i.system.equipmentSubtype).sort().join(",\n"));
        this.setCalculated("Check Penalty 1", this.actor.items.filter(i => i.type === "equipment" && i.subType === "armor").map(i => i.system.armor.acp).sort().join(",\n"));
        this.setCalculated("Check Penalty 2", this.actor.items.filter(i => i.type === "equipment" && i.subType === "shield").map(i => i.system.armor.acp).sort().join(",\n"));
        this.setCalculated("Spell Failure 1", this.actor.items.filter(i => i.type === "equipment" && i.subType === "armor").map(i => i.system.spellFailure).sort().join(",\n"));
        this.setCalculated("Spell Failure 2", this.actor.items.filter(i => i.type === "equipment" && i.subType === "shield").map(i => i.system.spellFailure).sort().join(",\n"));
        this.setCalculated("Acrobatics", this.actor.system.skills.acr.cs);
        this.setCalculated("Appraise Check", this.actor.system.skills.apr.cs);
        this.setCalculated("Bluff Check", this.actor.system.skills.blf.cs);
        this.setCalculated("Climb check", this.actor.system.skills.clm.cs);
        this.setCalculated("Diplomacy Check", this.actor.system.skills.dip.cs);
        this.setCalculated("Disable Device Check", this.actor.system.skills.dev.cs);
        this.setCalculated("Disguise Check", this.actor.system.skills.dis.cs);
        this.setCalculated("Escape Artist Check", this.actor.system.skills.esc.cs);
        this.setCalculated("Fly Check", this.actor.system.skills.fly.cs);
        this.setCalculated("Handle Animal Check", this.actor.system.skills.han.cs);
        this.setCalculated("Heal Check", this.actor.system.skills.hea.cs);
        this.setCalculated("Intimidate Check", this.actor.system.skills.int.cs);
        this.setCalculated("Linguistics Check", this.actor.system.skills.lin.cs);
        this.setCalculated("Perception Check", this.actor.system.skills.per.cs);
        this.setCalculated("Ride Check", this.actor.system.skills.rid.cs);
        this.setCalculated("Sense Motive Check", this.actor.system.skills.sen.cs);
        this.setCalculated("Sleight Of Hand Check", this.actor.system.skills.slt.cs);
        this.setCalculated("SpellCraft Check", this.actor.system.skills.spl.cs);
        this.setCalculated("Stealth Check", this.actor.system.skills.ste.cs);
        this.setCalculated("Survival", this.actor.system.skills.sur.cs);
        this.setCalculated("Swim Check", this.actor.system.skills.swm.cs);
        this.setCalculated("Use Magic Device Check", this.actor.system.skills.umd.cs);
        this.setCalculated("Ranks 1", this.actor.system.skills.acr.rank);
        this.setCalculated("Ranks 2", this.actor.system.skills.apr.rank);
        this.setCalculated("Ranks 3", this.actor.system.skills.blf.rank);
        this.setCalculated("Ranks 4", this.actor.system.skills.clm.rank);
        this.setCalculated("Ranks 8", this.actor.system.skills.dip.rank);
        this.setCalculated("Ranks 9", this.actor.system.skills.dev.rank);
        this.setCalculated("Ranks 10", this.actor.system.skills.dis.rank);
        this.setCalculated("Ranks 11", this.actor.system.skills.esc.rank);
        this.setCalculated("Ranks 12", this.actor.system.skills.fly.rank);
        this.setCalculated("Ranks 13", this.actor.system.skills.han.rank);
        this.setCalculated("Ranks 14", this.actor.system.skills.hea.rank);
        this.setCalculated("Ranks 15", this.actor.system.skills.int.rank);
        this.setCalculated("Ranks 16", this.actor.system.skills.kar.rank);
        this.setCalculated("Ranks 17", this.actor.system.skills.kdu.rank);
        this.setCalculated("Ranks 18", this.actor.system.skills.ken.rank);
        this.setCalculated("Ranks 19", this.actor.system.skills.kge.rank);
        this.setCalculated("Ranks 20", this.actor.system.skills.khi.rank);
        this.setCalculated("Ranks 21", this.actor.system.skills.klo.rank);
        this.setCalculated("Ranks 22", this.actor.system.skills.kna.rank);
        this.setCalculated("Ranks 23", this.actor.system.skills.kno.rank);
        this.setCalculated("Ranks 24", this.actor.system.skills.kpl.rank);
        this.setCalculated("Ranks 25", this.actor.system.skills.kre.rank);
        this.setCalculated("Ranks 26", this.actor.system.skills.lin.rank);
        this.setCalculated("Ranks 27", this.actor.system.skills.per.rank);
        this.setCalculated("Ranks 32", this.actor.system.skills.rid.rank);
        this.setCalculated("Ranks 33", this.actor.system.skills.sen.rank);
        this.setCalculated("Ranks 34", this.actor.system.skills.slt.rank);
        this.setCalculated("Ranks 35", this.actor.system.skills.spl.rank);
        this.setCalculated("Ranks 36", this.actor.system.skills.ste.rank);
        this.setCalculated("Ranks 37", this.actor.system.skills.sur.rank);
        this.setCalculated("Ranks 38", this.actor.system.skills.swm.rank);
        this.setCalculated("Ranks 39", this.actor.system.skills.umd.rank);
        this.setCalculated("Total Bonus 1", this.actor.system.skills.acr.mod);
        this.setCalculated("Total Bonus 2", this.actor.system.skills.apr.mod);
        this.setCalculated("Total Bonus 3", this.actor.system.skills.blf.mod);
        this.setCalculated("Total Bonus 4", this.actor.system.skills.clm.mod);
        this.setCalculated("Total Bonus 8", this.actor.system.skills.dip.mod);
        this.setCalculated("Total Bonus 9", this.actor.system.skills.dev.mod);
        this.setCalculated("Total Bonus 10", this.actor.system.skills.dis.mod);
        this.setCalculated("Total Bonus 11", this.actor.system.skills.esc.mod);
        this.setCalculated("Total Bonus 12", this.actor.system.skills.fly.mod);
        this.setCalculated("Total Bonus 13", this.actor.system.skills.han.mod);
        this.setCalculated("Total Bonus 14", this.actor.system.skills.hea.mod);
        this.setCalculated("Total Bonus 15", this.actor.system.skills.int.mod);
        this.setCalculated("Total Bonus 16", this.actor.system.skills.kar.mod);
        this.setCalculated("Total Bonus 17", this.actor.system.skills.kdu.mod);
        this.setCalculated("Total Bonus 18", this.actor.system.skills.ken.mod);
        this.setCalculated("Total Bonus 19", this.actor.system.skills.kge.mod);
        this.setCalculated("Total Bonus 20", this.actor.system.skills.khi.mod);
        this.setCalculated("Total Bonus 21", this.actor.system.skills.klo.mod);
        this.setCalculated("Total Bonus 22", this.actor.system.skills.kna.mod);
        this.setCalculated("Total Bonus 23", this.actor.system.skills.kno.mod);
        this.setCalculated("Total Bonus 24", this.actor.system.skills.kpl.mod);
        this.setCalculated("Total Bonus 25", this.actor.system.skills.kre.mod);
        this.setCalculated("Total Bonus 26", this.actor.system.skills.lin.mod);
        this.setCalculated("Total Bonus 27", this.actor.system.skills.per.mod);
        this.setCalculated("Total Bonus 32", this.actor.system.skills.rid.mod);
        this.setCalculated("Total Bonus 33", this.actor.system.skills.sen.mod);
        this.setCalculated("Total Bonus 34", this.actor.system.skills.slt.mod);
        this.setCalculated("Total Bonus 35", this.actor.system.skills.spl.mod);
        this.setCalculated("Total Bonus 36", this.actor.system.skills.ste.mod);
        this.setCalculated("Total Bonus 37", this.actor.system.skills.sur.mod);
        this.setCalculated("Total Bonus 38", this.actor.system.skills.swm.mod);
        this.setCalculated("Total Bonus 39", this.actor.system.skills.umd.mod);
        this.setCalculated("Profession 1 Check", this.actor.system.skills.pro.subSkills.pro1?.cs);
        this.setCalculated("Profession 1", this.actor.system.skills.pro.subSkills.pro1?.name || "");
        this.setCalculated("Total Bonus 30", (this.actor.system.skills.pro.subSkills.pro1?.name) ? this.actor.system.skills.pro.subSkills.pro1.mod : "");
        this.setCalculated("Ranks 30", (this.actor.system.skills.pro.subSkills.pro1?.name) ? this.actor.system.skills.pro.subSkills.pro1.rank : "");
        this.setCalculated("Profession 2 Check", this.actor.system.skills.pro.subSkills.pro2?.cs || "");
        this.setCalculated("Profession 2", this.actor.system.skills.pro.subSkills.pro2?.name || "");
        this.setCalculated("Total Bonus 31", (this.actor.system.skills.pro.subSkills.pro2?.name) ? this.actor.system.skills.pro.subSkills.pro2.mod : "");
        this.setCalculated("Ranks 31", (this.actor.system.skills.prf.subSkills.pro2?.name) ? this.actor.system.skills.prf.subSkills.pro2.rank : "");
        this.setCalculated("Perform 1 check", this.actor.system.skills.prf.subSkills.prf1?.cs);
        this.setCalculated("Perform 1", this.actor.system.skills.prf.subSkills.prf1?.name || "");
        this.setCalculated("Total Bonus 28", (this.actor.system.skills.prf.subSkills.prf1?.name) ? this.actor.system.skills.prf.subSkills.prf1.mod : "");
        this.setCalculated("Ranks 28", (this.actor.system.skills.prf.subSkills.prf1?.name) ? this.actor.system.skills.prf.subSkills.prf1.rank : "");
        this.setCalculated("Perform 2 check", this.actor.system.skills.prf.subSkills.prf2?.cs || "");
        this.setCalculated("Perform 2", this.actor.system.skills.prf.subSkills.prf2?.name || "");
        this.setCalculated("Total Bonus 29", (this.actor.system.skills.prf.subSkills.prf2?.name) ? this.actor.system.skills.prf.subSkills.prf2.mod : "");
        this.setCalculated("Ranks 29", (this.actor.system.skills.prf.subSkills.prf2?.name) ? this.actor.system.skills.prf.subSkills.prf2.rank : "");
        this.setCalculated("Craft Check 1", this.actor.system.skills.crf.subSkills.crf1?.cs || "");
        this.setCalculated("Craft 1", this.actor.system.skills.crf.subSkills.crf1?.name || "");
        this.setCalculated("Total Bonus 5", (this.actor.system.skills.crf.subSkills.crf1?.name) ? this.actor.system.skills.crf.subSkills.crf1.mod : "");
        this.setCalculated("Ranks 5", (this.actor.system.skills.crf.subSkills.crf1?.name) ? this.actor.system.skills.crf.subSkills.crf1.rank : "");
        this.setCalculated("Craft Check 2", this.actor.system.skills.crf.subSkills.crf2?.cs || "");
        this.setCalculated("Craft 2", this.actor.system.skills.crf.subSkills.crf2?.name || "");
        this.setCalculated("Total Bonus 6", (this.actor.system.skills.crf.subSkills.crf2?.name) ? this.actor.system.skills.crf.subSkills.crf2.mod : "");
        this.setCalculated("Ranks 6", (this.actor.system.skills.crf.subSkills.crf2?.name) ? this.actor.system.skills.crf.subSkills.crf2.rank : "");
        this.setCalculated("Craft Check 3", this.actor.system.skills.crf.subSkills.crf3?.cs || "");
        this.setCalculated("Craft 3", this.actor.system.skills.crf.subSkills.crf3?.name || "");
        this.setCalculated("Total Bonus 7", (this.actor.system.skills.crf.subSkills.crf3?.name) ? this.actor.system.skills.crf.subSkills.crf3.mod : "");
        this.setCalculated("Ranks 7", (this.actor.system.skills.crf.subSkills.crf3?.name) ? this.actor.system.skills.crf.subSkills.crf3.rank : "");
        this.setCalculated("Languages Line 1", [this.actor.system.traits.languages.value.filter(String).map(l => l.capitalize()).sort().join(", "), this.actor.system.traits.languages.custom,].filter(String).join(", "));
        this.setCalculated("Conditional Modifiers Line 1", [this.actor.system.traits.weaponProf.total.filter(String).map(l => l.capitalize()).join(", "), this.actor.system.traits.weaponProf.custom, this.actor.system.traits.armorProf.total.filter(String).map(l => l.capitalize()).join(", "), this.actor.system.traits.armorProf.custom,].filter(String).join(", "));
        /*
        this.setCalculated("Damage Slot 1", this.actor.items.filter(i => i.type === "weapon" && i.system.equipped && i.hasAttack && i.hasDamage)[0]?.data?.data?.damage?.parts[0][0]?.replace(/sizeRoll\((?<count>[0-9]*), ?(?<size>[0-9]*), ?\u0040size\)/, "$<count>d$<size>") || "");
        this.setCalculated("DT Slot 1", this.actor.items.filter(i => i.type === "weapon" && i.system.equipped && i.hasAttack && i.hasDamage)[0]?.data?.data?.damage?.parts[0][1] || "");
        this.setCalculated("Damage Slot 2", this.actor.items.filter(i => i.type === "weapon" && i.system.equipped && i.hasAttack && i.hasDamage)[1]?.data?.data?.damage?.parts[0][0]?.replace(/sizeRoll\((?<count>[0-9]*), ?(?<size>[0-9]*), ?\u0040size\)/, "$<count>d$<size>") || "");
        this.setCalculated("DT Slot 2", this.actor.items.filter(i => i.type === "weapon" && i.system.equipped && i.hasAttack && i.hasDamage)[1]?.data?.data?.damage?.parts[0][1] || "");
        this.setCalculated("Damage Slot 3", this.actor.items.filter(i => i.type === "weapon" && i.system.equipped && i.hasAttack && i.hasDamage)[2]?.data?.data?.damage?.parts[0][0]?.replace(/sizeRoll\((?<count>[0-9]*), ?(?<size>[0-9]*), ?\u0040size\)/, "$<count>d$<size>") || "");
        this.setCalculated("DT Slot 3", this.actor.items.filter(i => i.type === "weapon" && i.system.equipped && i.hasAttack && i.hasDamage)[2]?.data?.data?.damage?.parts[0][1] || "");
        this.setCalculated("Damage Slot 4", this.actor.items.filter(i => i.type === "weapon" && i.system.equipped && i.hasAttack && i.hasDamage)[3]?.data?.data?.damage?.parts[0][0]?.replace(/sizeRoll\((?<count>[0-9]*), ?(?<size>[0-9]*), ?\u0040size\)/, "$<count>d$<size>") || "");
        this.setCalculated("DT Slot 4", this.actor.items.filter(i => i.type === "weapon" && i.system.equipped && i.hasAttack && i.hasDamage)[3]?.data?.data?.damage?.parts[0][1] || "");
        this.setCalculated("Damage Slot 5", this.actor.items.filter(i => i.type === "weapon" && i.system.equipped && i.hasAttack && i.hasDamage)[4]?.data?.data?.damage?.parts[0][0]?.replace(/sizeRoll\((?<count>[0-9]*), ?(?<size>[0-9]*), ?\u0040size\)/, "$<count>d$<size>") || "");
        this.setCalculated("DT Slot 5", this.actor.items.filter(i => i.type === "weapon" && i.system.equipped && i.hasAttack && i.hasDamage)[4]?.data?.data?.damage?.parts[0][1] || "");
*/
    }
}

export default MappingClass;
