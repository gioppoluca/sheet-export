
import baseMapping from "../../../../scripts/baseMapping.js";

class MappingClass extends baseMapping {


    authors = [
        {
            name: 'bushvin',
            url: 'https://blog.elaba.net',
            lemmy: 'https://lemmy.world/u/bushvin',
            github: 'https://github.com/bushvin',
        },
    ];

    formatModifier(mod) {
        /* Format the modifier correctly with a + sign if needed */
        if (typeof (mod) === "undefined") {
            return mod;
        } else if (isNaN(parseInt(mod))) {
            return mod;
        } else {
            return (parseInt(mod) < 0) ? mod : `+${mod}`;
        }
    }

    // override createMappings method from base class
    createMappings() {
        super.createMappings();

        // Set the PDF files to use - MIND that the order of the files is important!
        this.pdfFiles.push({
            pdfUrl: '/modules/sheet-export/mappings/pf2e/remastered/latest/pf2e-remastered.pdf',
            nameDownload: `${this.actor.name ?? "character"}.pdf`,
            name: "pf2e-remastered.pdf",
        });

        /* Ancestry Section*/
        this.setCalculated("ancestry", this.actor.ancestry.name);
        this.setCalculated("heritage_and_traits", this.actor.heritage.name);
        this.setCalculated("heritage_and_traits", this.actor.system.traits.size.value);

        /* Character Name Section*/
        this.setCalculated("character_name", this.actor.name);
        this.setCalculated("player_name", Object.entries(this.actor.ownership).filter(i => i[1] === 3).map(i => i[0]).map(id => !game.users.get(id)?.isGM ? game.users.get(id)?.name : null).filter(x => x).join(", "));

        /* Background Section */
        this.setCalculated("background", this.actor.background.name);
        /* FIXME: complete background notes */
        this.setCalculated("background_notes", "");

        /* Level Section */
        this.setCalculated("level", this.actor.system.details.level.value);
        this.setCalculated("xp", this.actor.system.details.xp.value);

        /* Class Section */
        this.setCalculated("class", this.actor.class.name);
        /* FIXME: complete class notes */
        this.setCalculated("class_notes", "");

        /* attributes Section */
        Object.keys(this.actor.abilities).forEach(
            (a) => {
                this.setCalculated(a, this.formatModifier(this.actor.abilities[a].mod));
                this.setCalculated(`${a}_partial`, this.isPartialAttribute(a));
            }
        );

        /* Skills section */
        let loreCount = 1;
        let skillNotes = '';
        let extraLores = [];
        for (const slug in this.actor.skills) {
            const skill = this.actor.skills[slug];
            let skillSlug = slug;
            
            // Handle Lores
            if (skill.lore) {
                if (loreCount > 2) //Sheet only has 2 lore fields
                    extraLore += skill;
                skillSlug = `lore${loreCount}`;
                this.setCalculated(`${skillSlug}_subcategory`, skill.label);
                loreCount++;
            }
            
            switch (true) {
                case (skill.rank == 4):
                    this.setCalculated(`${skillSlug}_legendary`, true);
                case (skill.rank >= 3):
                    this.setCalculated(`${skillSlug}_master`, true);
                case (skill.rank >= 2):
                    this.setCalculated(`${skillSlug}_expert`, true);
                case (skill.rank >= 1):
                    this.setCalculated(`${skillSlug}_trained`, true);
            }

            skill.modifiers.forEach((modifier) => {
                let type = modifier.type;
                if (modifier.slug == 'armor-check-penalty')
                    type = 'armor';

                if (type == 'ability')
                    type = 'attribute';

                this.setCalculated(`${skillSlug}_${type}_modifier`, this.formatModifier(modifier.modifier));
            });

            this.setCalculated(`${skillSlug}`, this.formatModifier(skill.mod));
        }
        // Handle lores > 2
        extraLores.forEach((lore) => {
            const rank = ['U','T','E','M','L'][lore.rank];
            const value = this.formatModifier(lore.mod);
            skillNotes += '${lore.label}(${lore.rank}) ${value}\n';
        });

        this.setCalculated('skill_notes', skillNotes);

        /* Languages */
        const languageSlugs = this.actor.system.details.languages.value;
        const commonLanguage = game.pf2e.settings.campaign.languages.commonLanguage;
        const localizedLanguages = languageSlugs.flatMap((language) => {
            if (language === commonLanguage && languageSlugs.includes("common")) {
                return;
            }
            const label =
                language === "common" && commonLanguage
                    ? game.i18n.format("PF2E.Actor.Creature.Language.CommonLanguage", {
                          language: game.i18n.localize(CONFIG.PF2E.languages[commonLanguage]),
                      })
                    : game.i18n.localize(CONFIG.PF2E.languages[language]);
            return label;
        })

        this.setCalculated("languages", localizedLanguages.join(', '))

        /* Defenses Section*/
        this.setCalculated("hp_max", this.actor.hitPoints.max)

        const immunities = Object.values(this.actor.system.attributes.immunities).map(
            (immunity) => {
                return immunity.type;
            }
        );
        const resistances = Object.values(this.actor.system.attributes.resistances).map(
            (resistance) => {
                return `${resistance.type} ${resistance.value}`;
            }
        );
        const weaknesses = Object.values(this.actor.system.attributes.weaknesses).map(
            (weakness) => {
                return `${weakness.type} ${weakness.value}`;
            }
        );
        
        this.setCalculated("resistances_immunities", `Immun: ${immunities.join(', ')}; Resist: ${resistances.join(', ')}; Weak: ${weaknesses.join(', ')}`);

        /* Armor Class */
        this.setCalculated("ac", this.actor.armorClass.value);
        this.setCalculated("ac_attribute_modifier", this.actor.armorClass.modifiers.filter(i => i.type === 'ability').map(i => i.modifier)[0] || 0);
        this.setCalculated("ac_proficiency_modifier", this.actor.armorClass.modifiers.filter(i => i.type === 'proficiency').map(i => i.modifier)[0] || 0);
        this.setCalculated("ac_item_modifier", this.actor.armorClass.modifiers.filter(i => i.type === 'item').map(i => i.modifier)[0] || 0);


        /* Shield */
        this.setCalculated("ac_shield_bonus", this.actor.heldShield.acBonus);
        this.setCalculated("shield_hardness", this.actor.heldShield.hardness);
        this.setCalculated("shield_max_hp", this.actor.heldShield.hitPoints.max);
        this.setCalculated("shield_bt", this.actor.heldShield.hitPoints.brokenThreshold);

        /* Armor proficiencies */
        Object.keys(this.actor.system.proficiencies.defenses).forEach(
            (d) => {
                this.setCalculated(`defense_${d}_trained`, this.actor.system.proficiencies.defenses[d].rank >= 1 || false );
                this.setCalculated(`defense_${d}_expert`, this.actor.system.proficiencies.defenses[d].rank >= 2 || false );
                this.setCalculated(`defense_${d}_master`, this.actor.system.proficiencies.defenses[d].rank >= 3 || false );
                this.setCalculated(`defense_${d}_legendary`, this.actor.system.proficiencies.defenses[d].rank >= 4 || false );
            }
        );

        /* Saving Throws */
        Object.keys(this.actor.saves).forEach(
            (s) => {
                this.setCalculated(`${s}`, this.actor.saves[s].mod);
                this.setCalculated(`${s}_attribute_modifier`, this.actor.saves[s].modifiers.filter(i => i.type === 'ability' && i.enabled).map(i => i.modifier)[0] || 0);
                this.setCalculated(`${s}_proficiency_modifier`, this.actor.saves[s].modifiers.filter(i => i.type === 'proficiency' && i.enabled).map(i => i.modifier)[0] || 0);
                this.setCalculated(`${s}_item_modifier`, this.actor.saves[s].modifiers.filter(i => i.type === 'item' && i.enabled).map(i => i.modifier).sort().reverse()[0] || 0);
                this.setCalculated(`${s}_trained`, this.actor.saves[s].rank >= 1 || false);
                this.setCalculated(`${s}_expert`, this.actor.saves[s].rank >= 2 || false);
                this.setCalculated(`${s}_master`, this.actor.saves[s].rank >= 3 || false);
                this.setCalculated(`${s}_legendary`, this.actor.saves[s].rank >= 4 || false);
            }
        );

        /* Perception */
        this.setCalculated('perception', this.formatModifier(this.actor.perception.mod))
        this.setCalculated('perception_attribute_modifier', this.actor.perception.modifiers.filter(i => i.type === 'ability' && i.enabled).map(i => i.modifier)[0] || 0)
        this.setCalculated('perception_proficiency_modifier', this.actor.perception.modifiers.filter(i => i.type === 'proficiency' && i.enabled).map(i => i.modifier)[0] || 0)
        this.setCalculated('perception_item_modifier', this.actor.perception.modifiers.filter(i => i.type === 'item' && i.enabled).map(i => i.modifier)[0] || 0)
        this.setCalculated('perception_trained', this.actor.perception.rank >= 1)
        this.setCalculated('perception_expert', this.actor.perception.rank >= 2)
        this.setCalculated('perception_master', this.actor.perception.rank >= 3)
        this.setCalculated('perception_legendary', this.actor.perception.rank >= 4)

        /* Speed */
        this.setCalculated('speed', this.actor.system.attributes.speed.value)
        this.setCalculated('special_movement', this.actor.system.attributes.speed.otherSpeeds.map(s => `${s.label}: ${s.value}`).join(', '))

        // Set Player image
        this.setImage(this.actor.img, 2, 40, 500, 120, 200);

    }

    // custom method in the mapping class
    isPartialAttribute(attribute) {
        /* is there a partial boost for the given attribute */
        let count = 0;
        attribute = attribute.toLowerCase();
        Object.values(this.actor.system.build.attributes.boosts).forEach(
            (el) => {
                if (typeof (el) === "string" && el.toLowerCase() === attribute) {
                    count = count + 1;
                } else if (Array.isArray(el) && el.map(i => i.toLowerCase()).includes(attribute)) {
                    count = count + 1;
                }
            }
        );
        Object.values(this.actor.system.build.attributes.flaws).forEach(
            (el) => {
                if (typeof (el) === "string" && el.toLowerCase() === attribute) {
                    count = count - 1;
                } else if (Array.isArray(el) && el.map(i => i.toLowerCase()).includes(attribute)) {
                    count = count - 1;
                }
            }
        );
        if (count > 4 && parseInt(count / 2) * 2 < count) {
            return true;
        }
        return false;
    }

}

export default MappingClass;
