class baseMapping {
    constructor(actor, sheetType, sheet) {
        this.sheetType = sheetType;
        console.log("sheetType:", this.sheetType);
        this.actor = actor;
        this.sheet = sheet;
        console.log("actor:", this.actor);
        this.createMappings();
    }

    getMapping(fieldName) {
        if (this[fieldName] === undefined) {
            return "";
        }
        return this[fieldName];
    }

    createMappings(){

    }
}


export default baseMapping;