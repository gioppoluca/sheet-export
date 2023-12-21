
import baseMapping from "../../../../scripts/baseMapping.js";

class Mapping extends baseMapping {

    formatModifier(mod) {
        /* Format the modifier correctly with a + sign if needed */
        if (typeof(mod) === "undefined") {
            return mod;
        } else if (isNaN(parseInt(mod))) {
            return mod;
        } else {
            return (parseInt(mod) < 0) ? mod : `+${mod}`;
        }
    };

    // override createMappings method from base class
    createMappings() {
        super.createMappings();

        /* Ancestry Section*/
        this.setMapping("ancestry", this.actor.ancestry.name);
        this.setMapping("heritage_and_traits", this.actor.heritage.name);
        this.setMapping("heritage_and_traits", this.actor.system.traits.size.value);

        /* Character Name Section*/
        this.setMapping("character_name", this.actor.name);
        this.setMapping("player_name", Object.entries(this.actor.ownership).filter(i => i[1] === 3).map(i => i[0]).map(id => !game.users.get(id)?.isGM ? game.users.get(id)?.name : null).filter(x => x).join(", "));

        /* Background Section */
        this.setMapping("background", this.actor.system.background);
        /* FIXME: complete background notes */
        this.setMapping("background_notes", "");

        /* Level Section */
        this.setMapping("level", this.actor.system.details.level.value);
        this.setMapping("xp", this.actor.system.details.xp.value);

        /* Class Section */
        this.setMapping("level", this.actor.class.name);
        /* FIXME: complete class notes */
        this.setMapping("class_notes", "");

        /* attributes Section */
        Object.keys(this.actor.abilities).forEach(
            (a) => {
                this.setMapping(a, this.formatModifier(this.actor.abilities[a].mod));
                this.setMapping(`${a}_partial`, this.isPartialAttribute(a));
            }
        )

        /* Defenses Section*/

        /* Armor Class */
        this.setMapping("ac", this.actor.armorClass.value);
        this.setMapping("ac_attribute_modifier", this.actor.armorClass.modifiers.filter(i => i.type === 'ability').map(i => i.modifier)[0] || 0);
        this.setMapping("ac_proficiency_modifier", this.actor.armorClass.modifiers.filter(i => i.type === 'proficiency').map(i => i.modifier)[0] || 0);
        this.setMapping("ac_item_modifier", this.actor.armorClass.modifiers.filter(i => i.type === 'item').map(i => i.modifier)[0] || 0);

        /* Shield */
        this.setMapping("ac_shield_bonus", this.actor.items.filter(i => i.system.category === 'shield' && i.isEquipped).map(i => i.system.acBonus)[0] || '');
        this.setMapping("shield_hardness", this.actor.items.filter(i => i.system.category === 'shield' && i.isEquipped).map(i => i.system.hardness)[0] || '-');
        this.setMapping("shield_max_hp", this.actor.items.filter(i => i.system.category === 'shield' && i.isEquipped).map(i => i.system.hp.max)[0] || '-');
        this.setMapping("shield_bt", this.actor.items.filter(i => i.system.category === 'shield' && i.isEquipped).map(i => i.system.hp.brokenThreshold)[0] || '-');
        this.setMapping("shield_current_hp", this.actor.items.filter(i => i.system.category === 'shield' && i.isEquipped).map(i => i.system.hp.value)[0] || '-');

        /* Armor proficiencies */
        Object.keys(this.actor.system.proficiencies.defenses).forEach(
            (d) => {
                this.setMapping(`defense_${d}_trained`, this.actor.system.proficiencies.defenses[d].rank >= 1 || false );
                this.setMapping(`defense_${d}_expert`, this.actor.system.proficiencies.defenses[d].rank >= 2 || false );
                this.setMapping(`defense_${d}_master`, this.actor.system.proficiencies.defenses[d].rank >= 3 || false );
                this.setMapping(`defense_${d}_legendary`, this.actor.system.proficiencies.defenses[d].rank >= 4 || false );
            }
        )

        /* Saving Throws */
        Object.keys(this.actor.saves).forEach(
            (s) => {
                this.setMapping(`${s}`, this.actor.saves[s].mod);
                this.setMapping(`${s}_attribute_modifier`, this.actor.saves[s].modifiers.filter(i => i.type === 'ability' && i.enabled).map(i => i.modifier)[0] || 0);
                this.setMapping(`${s}_proficiency_modifier`, this.actor.saves[s].modifiers.filter(i => i.type === 'proficiency' && i.enabled).map(i => i.modifier)[0] || 0);
                this.setMapping(`${s}_item_modifier`, this.actor.saves[s].modifiers.filter(i => i.type === 'item' && i.enabled).map(i => i.modifier).sort().reverse()[0] || 0);
                this.setMapping(`${s}_trained`, this.actor.saves[s].rank >= 1 || false);
                this.setMapping(`${s}_expert`, this.actor.saves[s].rank >= 2 || false);
                this.setMapping(`${s}_master`, this.actor.saves[s].rank >= 3 || false);
                this.setMapping(`${s}_legendary`, this.actor.saves[s].rank >= 4 || false);
            }
        )
    }

    // custom method in the mapping class
    isPartialAttribute(attribute) {
        /* is there a partial boost for the given attribute */
        let count = 0;
        attribute = attribute.toLowerCase();
        Object.values(this.actor.system.build.abilities.boosts).forEach(
            (el) => {
                if (typeof (el) === "string" && el.toLowerCase() === attribute) {
                    count = count + 1;
                } else if (Array.isArray(el) && el.map(i => i.toLowerCase()).includes(attribute)) {
                    count = count + 1;
                }
            }
        );
        Object.values(this.actor.system.build.abilities.flaws).forEach(
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
    };

}

export default Mapping;
