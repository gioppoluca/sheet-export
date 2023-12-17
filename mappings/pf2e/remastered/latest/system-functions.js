class SystemFunctions {
    constructor(actor, sheetType, sheet) {
        this.actor = actor;
        this.sheetType = sheetType; 
        this.sheet = sheet;
        console.log(this.actor);
    }

    getSystemFunctionsId() {
        console.log("getSystemFunctionsId");
        console.log(this.sheetType);
        console.log(this.sheet);
        console.log(this.actor);
        return "pf2e";
    }
    //  Insert below your custom functions
}