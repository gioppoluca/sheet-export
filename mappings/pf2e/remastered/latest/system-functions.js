/**
 * SystemFunctions class.
 * This is the system function class used to allow override of common mapping approach.
*/
class SystemFunctions {
    constructor(actor, sheetType, sheet) {
        this.actor = actor;
        this.sheetType = sheetType;
        this.sheet = sheet;
        console.log(this.actor);
    }


    /**
     * Returns the string to use for accessing the actor data
     * based on the sheet type and Foundry version.
     * 
     * For player sheets in Foundry v10+, returns "actor."
     * For player sheets pre-v10, returns "actor.data."
     * Same logic for NPC sheets.
     * Defaults to empty string if sheetType is invalid.
     * THIS FUNCTION MUST NOT BE REMOVED, BUT MAPPERS CHE ALTER THE MEANING OF @
     */
    getAtReplacement(game_generation) {
        switch (this.sheetType) {
            case "player":
                return game_generation > 10 ? "actor." : "actor.data."
                break;
            case "npc":
                return game_generation > 10 ? "actor." : "actor.data."
            default:
                return "";
        }
    }

    /**
     * preMapping is a method that gets called before mapping fields. 
     * It can be used to modify fields before mapping.
     * THIS FUNCTION MUST NOT BE REMOVED; BUT CAN BE USED TO MODIFY FIELDS BEFORE MAPPING
    */
    preMapping(fields) {
        console.log("preMapping");
        console.log(fields);
        console.log(this.actor);
        console.log(this.sheetType);
        console.log(this.sheet);
        return fields;
    }

    //  Insert below your custom functions
}