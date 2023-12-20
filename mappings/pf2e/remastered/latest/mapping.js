
import baseMapping from "../../../../scripts/baseMapping.js";

class Mapping extends baseMapping {

    // override createMappings method from base class
    createMappings() {
        console.log("createMappings");
        this.name = this.actor.name;
        console.log(this.name);
        this.background = this.actor.system.background;
        for (let index = 0; index < 4; index++) {
            this["test" + index] = this.actor.name + " " + index;

        }

    }

    // custom method in the mapping class
    is_partial_attribute = function (attribute) {
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

    // start of the mapping
    ancestry = this.actor.ancestry.name;
    str_partial = this.is_partial_attribute("str");
}

export default Mapping;
