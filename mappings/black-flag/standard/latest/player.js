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
            pdfUrl: '/modules/sheet-export/mappings/black-flag/ToV-Character-Sheet.pdf',
            nameDownload: `${this.actor.name ?? "character"}.pdf`,
            name: "ToV-Character-Sheet.pdf",
        });


        this.setImage(this.actor.img, 1, 45, 550, 140, 220);

        this.setCalculated("Name", this.actor.name);
        this.setCalculated("Class & Level", this.getLocalizedClassAndSubclassAndLevel(this.getPrimaryClassObj()));
        this.setCalculated("Subclass", this.actor.SOMETHING);
        this.setCalculated("XP", this.actor.system.progression.xp.value);
        this.setCalculated("Lineage", this.actor.system.progression.lineage.name);
        this.setCalculated("Heritage", this.actor.system.progression.heritage.name);
        this.setCalculated("Background", this.actor.system.progression.background.name);
        this.setCalculated("Player", Object.entries(this.actor.ownership).filter(entry => entry[1] === 3).map(entry => entry[0]).map(id => !game.users.get(id)?.isGM ? game.users.get(id)?.name : null).filter(x => x).join(", "));
        this.setCalculated("DexSave", this.actor.system.abilities.dexterity.save.bonus);
        this.setCalculated("ConSave", this.actor.system.abilities.constitution.save.bonus);
        this.setCalculated("IntSave", this.actor.system.abilities.intelligence.save.bonus);
        this.setCalculated("WisSave", this.actor.system.abilities.wisdom.save.bonus);
        this.setCalculated("ChaSave", this.actor.system.abilities.charisma.save.bonus);
        this.setCalculated("StrValue", this.actor.system.abilities.strength.value);
        this.setCalculated("ConValue", this.actor.system.abilities.constitution.value);
        this.setCalculated("IntValue", this.actor.system.abilities.intelligence.value);
        this.setCalculated("WisValue", this.actor.system.abilities.wisdom.value);
        this.setCalculated("ChaValue", this.actor.system.abilities.charisma.value);
        this.setCalculated("StrSave", this.actor.system.abilities.strength.save.bonus);
        this.setCalculated("StrSaveValue", this.actor.system.abilities.strength.save.mod);
        this.setCalculated("DexSaveValue", this.actor.system.abilities.dexterity.save.mod);
        this.setCalculated("ConSaveValue", this.actor.system.abilities.constitution.save.mod);
        this.setCalculated("IntSaveValue", this.actor.system.abilities.intelligence.save.mod);
        this.setCalculated("WisSaveValue", this.actor.system.abilities.wisdom.save.mod);
        this.setCalculated("ChaSaveValue", this.actor.system.abilities.charisma.save.mod);
        this.setCalculated("StrMod", this.actor.system.abilities.strength.mod);
        this.setCalculated("DexMod", this.actor.system.abilities.dexterity.mod);
        this.setCalculated("ConMod", this.actor.system.abilities.constitution.mod);
        this.setCalculated("IntMod", this.actor.system.abilities.intelligence.mod);
        this.setCalculated("WisMod", this.actor.system.abilities.wisdom.mod);
        this.setCalculated("ChaMod", this.actor.system.abilities.charisma.mod);
        this.setCalculated("DexValue", this.actor.system.abilities.dexterity.value);
        this.setCalculated("Speed1", this.actor.system.traits.movement.labels[0] ? this.actor.system.traits.movement.labels[0] : "");
        this.setCalculated("Speed2", this.actor.system.traits.movement.labels[1] ? this.actor.system.traits.movement.labels[1] : "");
        this.setCalculated("Speed3", this.actor.system.traits.movement.labels[2] ? this.actor.system.traits.movement.labels[2] : "");
        this.setCalculated("Initiative", this.actor.system.attributes.initiative.mod);
        this.setCalculated("Proficiency", this.actor.system.attributes.proficiency);
        this.setCalculated("PassiveINS", this.actor.SOMETHING);
        this.setCalculated("PassiveINV", this.actor.SOMETHING);
        this.setCalculated("PassivePER", this.actor.SOMETHING);
        this.setCalculated("Luck1", this.actor.SOMETHING);
        this.setCalculated("Luck2", this.actor.SOMETHING);
        this.setCalculated("Luck3", this.actor.SOMETHING);
        this.setCalculated("Luck4", this.actor.SOMETHING);
        this.setCalculated("Luck5", this.actor.SOMETHING);
        this.setCalculated("MaxHP", this.actor.system.attributes.hp.max);
        this.setCalculated("CurrentHP", this.actor.system.attributes.hp.value);
        this.setCalculated("TempHP", this.actor.system.attributes.hp.temp);
        this.setCalculated("HDType", this.formatHD(this.actor.system.attributes.hd.d));
        this.setCalculated("HDUsed", this.actor.system.attributes.hd.spent);
        this.setCalculated("HDMax", this.actor.system.attributes.hd.max);
        this.setCalculated("ATKName1", this.actor.SOMETHING);
        this.setCalculated("ATKName4", this.actor.SOMETHING);
        this.setCalculated("ATKName5", this.actor.SOMETHING);
        this.setCalculated("ATKName2", this.actor.SOMETHING);
        this.setCalculated("ATKName3", this.actor.SOMETHING);
        this.setCalculated("Bonus1", this.actor.SOMETHING);
        this.setCalculated("Bonus2", this.actor.SOMETHING);
        this.setCalculated("Bonus3", this.actor.SOMETHING);
        this.setCalculated("Bonus4", this.actor.SOMETHING);
        this.setCalculated("Bonus5", this.actor.SOMETHING);
        this.setCalculated("DMG2", this.actor.SOMETHING);
        this.setCalculated("DMG3", this.actor.SOMETHING);
        this.setCalculated("DMG4", this.actor.SOMETHING);
        this.setCalculated("DMG5", this.actor.SOMETHING);
        this.setCalculated("DMG1", this.actor.SOMETHING);
        this.setCalculated("RAN/PRO1", this.actor.SOMETHING);
        this.setCalculated("RAN/PRO2", this.actor.SOMETHING);
        this.setCalculated("RAN/PRO5", this.actor.SOMETHING);
        this.setCalculated("WeaponOptions1", this.actor.SOMETHING);
        this.setCalculated("WeaponOptions2", this.actor.SOMETHING);
        this.setCalculated("WeaponOptions3", this.actor.SOMETHING);
        this.setCalculated("WeaponOptions4", this.actor.SOMETHING);
        this.setCalculated("WeaponOptions5", this.actor.SOMETHING);
        this.setCalculated("Check Box12", this.actor.SOMETHING);
        this.setCalculated("Check Box13", this.actor.SOMETHING);
        this.setCalculated("Check Box14", this.actor.SOMETHING);
        this.setCalculated("Check Box15", this.actor.SOMETHING);
        this.setCalculated("Check Box16", this.actor.SOMETHING);
        this.setCalculated("Check Box17", this.actor.SOMETHING);
        this.setCalculated("AcroProf", this.actor.SOMETHING);
        this.setCalculated("AnHaProf", this.actor.SOMETHING);
        this.setCalculated("ArcProf", this.actor.SOMETHING);
        this.setCalculated("AthProf", this.actor.SOMETHING);
        this.setCalculated("DecProf", this.actor.SOMETHING);
        this.setCalculated("HisProf", this.actor.SOMETHING);
        this.setCalculated("InProf", this.actor.SOMETHING);
        this.setCalculated("IntProf", this.actor.SOMETHING);
        this.setCalculated("InvProf", this.actor.SOMETHING);
        this.setCalculated("MedProf", this.actor.SOMETHING);
        this.setCalculated("NatProf", this.actor.SOMETHING);
        this.setCalculated("SoHProf", this.actor.SOMETHING);
        this.setCalculated("SurProf", this.actor.SOMETHING);
        this.setCalculated("ACRO", this.actor.SOMETHING);
        this.setCalculated("ANHA", this.actor.SOMETHING);
        this.setCalculated("ARC", this.actor.SOMETHING);
        this.setCalculated("ATH", this.actor.SOMETHING);
        this.setCalculated("DEC", this.actor.SOMETHING);
        this.setCalculated("HIS", this.actor.SOMETHING);
        this.setCalculated("INS", this.actor.SOMETHING);
        this.setCalculated("INT", this.actor.SOMETHING);
        this.setCalculated("INV", this.actor.SOMETHING);
        this.setCalculated("MED", this.actor.SOMETHING);
        this.setCalculated("NAT", this.actor.SOMETHING);
        this.setCalculated("PER", this.actor.SOMETHING);
        this.setCalculated("PERF", this.actor.SOMETHING);
        this.setCalculated("PERS", this.actor.SOMETHING);
        this.setCalculated("REL", this.actor.SOMETHING);
        this.setCalculated("SOH", this.actor.SOMETHING);
        this.setCalculated("STE", this.actor.SOMETHING);
        this.setCalculated("SUR", this.actor.SOMETHING);
        this.setCalculated("ACSH", this.actor.SOMETHING);
        this.setCalculated("ACNS", this.actor.SOMETHING);
        this.setCalculated("Armor1", this.actor.SOMETHING);
        this.setCalculated("Armor2", this.actor.SOMETHING);
        this.setCalculated("Armor3", this.actor.SOMETHING);
        this.setCalculated("BAC1", this.actor.SOMETHING);
        this.setCalculated("BAC2", this.actor.SOMETHING);
        this.setCalculated("BAC3", this.actor.SOMETHING);
        this.setCalculated("ACProp1", this.actor.SOMETHING);
        this.setCalculated("ACProp2", this.actor.SOMETHING);
        this.setCalculated("ACProp3", this.actor.SOMETHING);
        this.setCalculated("Conditions", this.actor.SOMETHING);
        this.setCalculated("EX1", this.actor.SOMETHING);
        this.setCalculated("EX2", this.actor.SOMETHING);
        this.setCalculated("EX3", this.actor.SOMETHING);
        this.setCalculated("EX4", this.actor.SOMETHING);
        this.setCalculated("EX5", this.actor.SOMETHING);
        this.setCalculated("EX6", this.actor.SOMETHING);
        this.setCalculated("Prof.,Lang.,Tal", this.actor.SOMETHING);
        this.setCalculated("Treasure & Equipment", this.actor.SOMETHING);
        this.setCalculated("Platinum", this.actor.SOMETHING);
        this.setCalculated("Gold", this.actor.SOMETHING);
        this.setCalculated("Silver", this.actor.SOMETHING);
        this.setCalculated("Copper", this.actor.SOMETHING);
        this.setCalculated("Features", this.actor.SOMETHING);
        this.setCalculated("Homeland", this.actor.SOMETHING);
        this.setCalculated("Backstory",  (function (h) {
            const d = document.createElement("div");
            d.innerHTML = h;
            return d.textContent || d.innerText || "";
        })(this.actor.system.biography.backstory));
        this.setCalculated("CharacterName2", this.actor.SOMETHING);
        this.setCalculated("Appearance", this.actor.SOMETHING);
        this.setCalculated("Allies & Orgs",  (function (h) {
            const d = document.createElement("div");
            d.innerHTML = h;
            return d.textContent || d.innerText || "";
        })(this.actor.system.biography.allies));
        this.setCalculated("Age", this.actor.system.biography.age);
        this.setCalculated("Height", this.actor.system.biography.height);
        this.setCalculated("Weight", this.actor.system.biography.weight);
        this.setCalculated("Eyes", this.actor.system.biography.eyes);
        this.setCalculated("Skin", this.actor.system.biography.skin);
        this.setCalculated("Hair", this.actor.system.biography.hair);
        this.setCalculated("Motivation",  (function (h) {
            const d = document.createElement("div");
            d.innerHTML = h;
            return d.textContent || d.innerText || "";
        })(this.actor.system.biography.motivation));
        this.setCalculated("Additional Features & Traits", this.actor.SOMETHING);
        this.setCalculated("Additional Treasure", this.actor.SOMETHING);
        this.setCalculated("Spellcaster Class & Source", this.actor.SOMETHING);
        this.setCalculated("SpellAbility", this.actor.SOMETHING);
        this.setCalculated("SpellSaveDC", this.actor.SOMETHING);
        this.setCalculated("Bonus", this.actor.SOMETHING);
        this.setCalculated("CharacterName3", this.actor.SOMETHING);
        this.setCalculated("Cantrip1", this.actor.SOMETHING);
        this.setCalculated("Cantrip2", this.actor.SOMETHING);
        this.setCalculated("Cantrip3", this.actor.SOMETHING);
        this.setCalculated("Cantrip4", this.actor.SOMETHING);
        this.setCalculated("Cantrip5", this.actor.SOMETHING);
        this.setCalculated("Cantrip6", this.actor.SOMETHING);
        this.setCalculated("Cantrip7", this.actor.SOMETHING);
        this.setCalculated("Cantrip8", this.actor.SOMETHING);
        this.setCalculated("Cantrip9", this.actor.SOMETHING);
        this.setCalculated("Total1", this.actor.SOMETHING);
        this.setCalculated("Ex1", this.actor.SOMETHING);
        this.setCalculated("1-1", this.actor.SOMETHING);
        this.setCalculated("1-2", this.actor.SOMETHING);
        this.setCalculated("1-3", this.actor.SOMETHING);
        this.setCalculated("1-4", this.actor.SOMETHING);
        this.setCalculated("1-5", this.actor.SOMETHING);
        this.setCalculated("1-6", this.actor.SOMETHING);
        this.setCalculated("1-7", this.actor.SOMETHING);
        this.setCalculated("1-8", this.actor.SOMETHING);
        this.setCalculated("1-9", this.actor.SOMETHING);
        this.setCalculated("1-10", this.actor.SOMETHING);
        this.setCalculated("1-11", this.actor.SOMETHING);
        this.setCalculated("1-12", this.actor.SOMETHING);
        this.setCalculated("1-13", this.actor.SOMETHING);
        this.setCalculated("Total2", this.actor.SOMETHING);
        this.setCalculated("Ex2", this.actor.SOMETHING);
        this.setCalculated("2-1", this.actor.SOMETHING);
        this.setCalculated("2-3", this.actor.SOMETHING);
        this.setCalculated("2-4", this.actor.SOMETHING);
        this.setCalculated("2-5", this.actor.SOMETHING);
        this.setCalculated("2-6", this.actor.SOMETHING);
        this.setCalculated("2-7", this.actor.SOMETHING);
        this.setCalculated("2-8", this.actor.SOMETHING);
        this.setCalculated("2-9", this.actor.SOMETHING);
        this.setCalculated("2-10", this.actor.SOMETHING);
        this.setCalculated("2-11", this.actor.SOMETHING);
        this.setCalculated("2-2", this.actor.SOMETHING);
        this.setCalculated("2-12", this.actor.SOMETHING);
        this.setCalculated("Total3", this.actor.SOMETHING);
        this.setCalculated("Ex3", this.actor.SOMETHING);
        this.setCalculated("3-1", this.actor.SOMETHING);
        this.setCalculated("3-2", this.actor.SOMETHING);
        this.setCalculated("3-3", this.actor.SOMETHING);
        this.setCalculated("3-4", this.actor.SOMETHING);
        this.setCalculated("3-5", this.actor.SOMETHING);
        this.setCalculated("3-6", this.actor.SOMETHING);
        this.setCalculated("3-7", this.actor.SOMETHING);
        this.setCalculated("3-8", this.actor.SOMETHING);
        this.setCalculated("3-9", this.actor.SOMETHING);
        this.setCalculated("3-10", this.actor.SOMETHING);
        this.setCalculated("3-11", this.actor.SOMETHING);
        this.setCalculated("3-12", this.actor.SOMETHING);
        this.setCalculated("Total4", this.actor.SOMETHING);
        this.setCalculated("Ex4", this.actor.SOMETHING);
        this.setCalculated("4-1", this.actor.SOMETHING);
        this.setCalculated("4-2", this.actor.SOMETHING);
        this.setCalculated("4-3", this.actor.SOMETHING);
        this.setCalculated("4-4", this.actor.SOMETHING);
        this.setCalculated("4-5", this.actor.SOMETHING);
        this.setCalculated("4-6", this.actor.SOMETHING);
        this.setCalculated("4-7", this.actor.SOMETHING);
        this.setCalculated("4-8", this.actor.SOMETHING);
        this.setCalculated("4-9", this.actor.SOMETHING);
        this.setCalculated("4-10", this.actor.SOMETHING);
        this.setCalculated("4-11", this.actor.SOMETHING);
        this.setCalculated("Total5", this.actor.SOMETHING);
        this.setCalculated("Ex5", this.actor.SOMETHING);
        this.setCalculated("5-1", this.actor.SOMETHING);
        this.setCalculated("5-2", this.actor.SOMETHING);
        this.setCalculated("5-3", this.actor.SOMETHING);
        this.setCalculated("5-4", this.actor.SOMETHING);
        this.setCalculated("5-5", this.actor.SOMETHING);
        this.setCalculated("5-6", this.actor.SOMETHING);
        this.setCalculated("5-7", this.actor.SOMETHING);
        this.setCalculated("5-8", this.actor.SOMETHING);
        this.setCalculated("5-9", this.actor.SOMETHING);
        this.setCalculated("5-10", this.actor.SOMETHING);
        this.setCalculated("5-11", this.actor.SOMETHING);
        this.setCalculated("Total6", this.actor.SOMETHING);
        this.setCalculated("Ex6", this.actor.SOMETHING);
        this.setCalculated("Total7", this.actor.SOMETHING);
        this.setCalculated("Ex7", this.actor.SOMETHING);
        this.setCalculated("Total8", this.actor.SOMETHING);
        this.setCalculated("Ex8", this.actor.SOMETHING);
        this.setCalculated("Total9", this.actor.SOMETHING);
        this.setCalculated("Ex9", this.actor.SOMETHING);
        this.setCalculated("8-1", this.actor.SOMETHING);
        this.setCalculated("8-2", this.actor.SOMETHING);
        this.setCalculated("8-3", this.actor.SOMETHING);
        this.setCalculated("8-4", this.actor.SOMETHING);
        this.setCalculated("8-5", this.actor.SOMETHING);
        this.setCalculated("8-7", this.actor.SOMETHING);
        this.setCalculated("8-6", this.actor.SOMETHING);
        this.setCalculated("9-1", this.actor.SOMETHING);
        this.setCalculated("9-2", this.actor.SOMETHING);
        this.setCalculated("9-3", this.actor.SOMETHING);
        this.setCalculated("9-4", this.actor.SOMETHING);
        this.setCalculated("9-5", this.actor.SOMETHING);
        this.setCalculated("9-6", this.actor.SOMETHING);
        this.setCalculated("9-7", this.actor.SOMETHING);
        this.setCalculated("6-1", this.actor.SOMETHING);
        this.setCalculated("6-2", this.actor.SOMETHING);
        this.setCalculated("6-3", this.actor.SOMETHING);
        this.setCalculated("6-4", this.actor.SOMETHING);
        this.setCalculated("6-5", this.actor.SOMETHING);
        this.setCalculated("6-6", this.actor.SOMETHING);
        this.setCalculated("6-7", this.actor.SOMETHING);
        this.setCalculated("6-8", this.actor.SOMETHING);
        this.setCalculated("6-9", this.actor.SOMETHING);
        this.setCalculated("7-1", this.actor.SOMETHING);
        this.setCalculated("7-2", this.actor.SOMETHING);
        this.setCalculated("7-3", this.actor.SOMETHING);
        this.setCalculated("7-4", this.actor.SOMETHING);
        this.setCalculated("7-5", this.actor.SOMETHING);
        this.setCalculated("7-6", this.actor.SOMETHING);
        this.setCalculated("7-7", this.actor.SOMETHING);
        this.setCalculated("RAN/PRO3", this.actor.SOMETHING);
        this.setCalculated("RAN/PRO4", this.actor.SOMETHING);
        this.setCalculated("PersProf", this.actor.SOMETHING);
        this.setCalculated("PercProf", this.actor.SOMETHING);
        this.setCalculated("PerfProf", this.actor.SOMETHING);
        this.setCalculated("RelProf", this.actor.SOMETHING);
        this.setCalculated("SteProf", this.actor.SOMETHING);
        this.setCalculated("Check Box1-1", this.actor.SOMETHING);
        this.setCalculated("Check Box1-2", this.actor.SOMETHING);
        this.setCalculated("Check Box1-3", this.actor.SOMETHING);
        this.setCalculated("Check Box1-4", this.actor.SOMETHING);
        this.setCalculated("Check Box1-5", this.actor.SOMETHING);
        this.setCalculated("Check Box1-6", this.actor.SOMETHING);
        this.setCalculated("Check Box1-7", this.actor.SOMETHING);
        this.setCalculated("Check Box1-8", this.actor.SOMETHING);
        this.setCalculated("Check Box1-9", this.actor.SOMETHING);
        this.setCalculated("Check Box1-10", this.actor.SOMETHING);
        this.setCalculated("Check Box1-11", this.actor.SOMETHING);
        this.setCalculated("Check Box1-12", this.actor.SOMETHING);
        this.setCalculated("Check Box1-13", this.actor.SOMETHING);
        this.setCalculated("Check Box2-1", this.actor.SOMETHING);
        this.setCalculated("Check Box2-2", this.actor.SOMETHING);
        this.setCalculated("Check Box2-3", this.actor.SOMETHING);
        this.setCalculated("Check Box2-4", this.actor.SOMETHING);
        this.setCalculated("Check Box2-5", this.actor.SOMETHING);
        this.setCalculated("Check Box2-6", this.actor.SOMETHING);
        this.setCalculated("Check Box2-7", this.actor.SOMETHING);
        this.setCalculated("Check Box2-8", this.actor.SOMETHING);
        this.setCalculated("Check Box2-9", this.actor.SOMETHING);
        this.setCalculated("Check Box2-10", this.actor.SOMETHING);
        this.setCalculated("Check Box2-11", this.actor.SOMETHING);
        this.setCalculated("Check Box2-12", this.actor.SOMETHING);
        this.setCalculated("Check Box3-1", this.actor.SOMETHING);
        this.setCalculated("Check Box3-2", this.actor.SOMETHING);
        this.setCalculated("Check Box3-3", this.actor.SOMETHING);
        this.setCalculated("Check Box3-4", this.actor.SOMETHING);
        this.setCalculated("Check Box3-5", this.actor.SOMETHING);
        this.setCalculated("Check Box3-6", this.actor.SOMETHING);
        this.setCalculated("Check Box3-7", this.actor.SOMETHING);
        this.setCalculated("Check Box3-8", this.actor.SOMETHING);
        this.setCalculated("Check Box3-9", this.actor.SOMETHING);
        this.setCalculated("Check Box3-10", this.actor.SOMETHING);
        this.setCalculated("Check Box3-11", this.actor.SOMETHING);
        this.setCalculated("Check Box3-12", this.actor.SOMETHING);
        this.setCalculated("Check Box4-1", this.actor.SOMETHING);
        this.setCalculated("Check Box4-2", this.actor.SOMETHING);
        this.setCalculated("Check Box84-3", this.actor.SOMETHING);
        this.setCalculated("Check Box84-4", this.actor.SOMETHING);
        this.setCalculated("Check Box4-5", this.actor.SOMETHING);
        this.setCalculated("Check Box4-6", this.actor.SOMETHING);
        this.setCalculated("Check Box4-7", this.actor.SOMETHING);
        this.setCalculated("Check Box4-8", this.actor.SOMETHING);
        this.setCalculated("Check Box4-9", this.actor.SOMETHING);
        this.setCalculated("Check Box4-10", this.actor.SOMETHING);
        this.setCalculated("Check Box4-11", this.actor.SOMETHING);
        this.setCalculated("Check Box5-1", this.actor.SOMETHING);
        this.setCalculated("Check Box5-2", this.actor.SOMETHING);
        this.setCalculated("Check Box5-3", this.actor.SOMETHING);
        this.setCalculated("Check Box5-4", this.actor.SOMETHING);
        this.setCalculated("Check Box5-5", this.actor.SOMETHING);
        this.setCalculated("Check Box5-6", this.actor.SOMETHING);
        this.setCalculated("Check Box5-7", this.actor.SOMETHING);
        this.setCalculated("Check Box5-8", this.actor.SOMETHING);
        this.setCalculated("Check Box5-9", this.actor.SOMETHING);
        this.setCalculated("Check Box6-1", this.actor.SOMETHING);
        this.setCalculated("Check Box6-2", this.actor.SOMETHING);
        this.setCalculated("Check Box6-3", this.actor.SOMETHING);
        this.setCalculated("Check Box86-4", this.actor.SOMETHING);
        this.setCalculated("Check Box86-5", this.actor.SOMETHING);
        this.setCalculated("Check Box6-6", this.actor.SOMETHING);
        this.setCalculated("Check Box6-7", this.actor.SOMETHING);
        this.setCalculated("Check Box6-8", this.actor.SOMETHING);
        this.setCalculated("Check Box6-9", this.actor.SOMETHING);
        this.setCalculated("Check Box7-1", this.actor.SOMETHING);
        this.setCalculated("Check Box7-2", this.actor.SOMETHING);
        this.setCalculated("Check Box7-3", this.actor.SOMETHING);
        this.setCalculated("Check Box8-1", this.actor.SOMETHING);
        this.setCalculated("Check Box8-2", this.actor.SOMETHING);
        this.setCalculated("Check Box8-3", this.actor.SOMETHING);
        this.setCalculated("Check Box8-4", this.actor.SOMETHING);
        this.setCalculated("Check Box8-5", this.actor.SOMETHING);
        this.setCalculated("Check Box8-6", this.actor.SOMETHING);
        this.setCalculated("Check Box8-7", this.actor.SOMETHING);
        this.setCalculated("Check Box9-1", this.actor.SOMETHING);
        this.setCalculated("Check Box9-2", this.actor.SOMETHING);
        this.setCalculated("Check Box9-3", this.actor.SOMETHING);
        this.setCalculated("Check Box9-4", this.actor.SOMETHING);
        this.setCalculated("Check Box9-5", this.actor.SOMETHING);
        this.setCalculated("Check Box9-6", this.actor.SOMETHING);
        this.setCalculated("Check Box9-7", this.actor.SOMETHING);
        this.setCalculated("Check Box5-10", this.actor.SOMETHING);
        this.setCalculated("Check Box5-11", this.actor.SOMETHING);
        this.setCalculated("Check Box7-7", this.actor.SOMETHING);
        this.setCalculated("Check Box7-6", this.actor.SOMETHING);
        this.setCalculated("Check Box7-5", this.actor.SOMETHING);
        this.setCalculated("Check Box7-4", this.actor.SOMETHING);
        this.setCalculated("Image1_af_image", this.actor.SOMETHING);

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

    formatHD(diceObject) {
        if (!diceObject || typeof diceObject !== "object") return "";
      
        return Object.entries(diceObject)
          .map(([key, value]) => `${value.available}D${key}`)
          .join(", ");
      }

}
export default MappingClass;

