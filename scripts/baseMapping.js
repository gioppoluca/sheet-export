class baseMapping {
    fieldMappings = {};
    logPrefix = "Export Sheet";
    systemName = "test";

    constructor(actor, sheetType, sheet) {
        this.sheetType = sheetType;
        console.log("sheetType:", this.sheetType);
        this.actor = actor;
        this.sheet = sheet;
        console.log("actor:", this.actor);
        this.createMappings();
    }

    #log(severity, message, options) {
        /* A wrapper around the foundry vtt logger or `console`, whichever is present */
        if ( typeof(ui) !== "undefined" ) {
            switch(severity) {
                case 'error':
                    ui.notifications.error(`${this.logPrefix} | ${this.systemName} | ${message}`, options);
                    break;
                case 'warn':
                case 'warning':
                    ui.notifications.warn(`${this.logPrefix} | ${this.systemName} | ${message}`, options);
                    break;
                case 'debug':
                    console.debug(`${this.logPrefix} | ${this.systemName} | ${message}`);
                    break;
                default:
                    ui.notifications.info(`${this.logPrefix} | ${this.systemName} | ${message}`, options);
            }
        } else {
            switch(severity) {
                case 'error':
                    console.error(`${this.logPrefix} | ${this.systemName} | ${message}`);
                    break;
                case 'warn':
                case 'warning':
                    console.warn(`${this.logPrefix} | ${this.systemName} | ${message}`);
                    break;
                case 'debug':
                    console.debug(`${this.logPrefix} | ${this.systemName} | ${message}`);
                    break;
                default:
                    console.info(`${this.logPrefix} | ${this.systemName} | ${message}`);
            }
        }
    }

    #logDebug(message, options) {
        this.#log("debug", message, options);
    }

    #logError(message, options) {
        this.#log("error", message, options);
    }

    #logInfo(message, options) {
        this.#log("info", message, options);
    }

    #logWarning(message, options) {
        this.#log("warning", message, options);
    }

    getMapping(fieldName) {
        /* pdf field getter */
        if (Object.keys(this.fieldMappings).includes(fieldName)) {
            return this.fieldMappings[fieldName];
        } else {
            this.#logWarning(`${fieldName} does not exist`);
            return undefined;
        }
    }

    setMapping(fieldName, value, force) {
        /* pdf field setter */
        if ( !Object.keys(this.fieldMappings).includes(fieldName) || force) {
            this.fieldMappings[fieldName] = value;
        } else {
            this.#logWarning(`${fieldName} is already defined. Only using the first value`);
        }
    }

    createMappings = function(){

    }
}

export default baseMapping;