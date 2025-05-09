const systemMapping = function () {
    return  {
        "dnd5e":{
            "player": "character",
            "npc": "npc"
        },
        "cypher":{
            "player": "PC",
            "npc": "NPC"
        },
        "pf2e":{
            "player": "character"
        },
        "pf1":{
            "player": "character"
        },
        "CoC7":{
            "player": "character"
        },
        "shadowrun6-eden":{
            "player": "Player"
        },
        "sfrpg":{
            "player": "character"
        },
        "swade":{
            "player": "character"
        },
        "vtm5e":{
            "player": "vampire"
        },
        "cyphersystem":{
            "player": "PC"
        }

    }
}

const systemMappingSheet = function () {
    return {
        "dnd5e":{
            "character": "player",
            "npc": "npc"
        },
        "cypher":{
            "PC": "player",
            "NPC": "npc"
        },
        "pf2e":{
            "character": "player"
        },
        "pf1":{
            "character": "player"
        },
        "CoC7":{
            "character": "player"
        },
        "shadowrun6-eden":{
            "Player": "player"
        },
        "sfrpg":{
            "character": "player"
        },
        "swade":{
            "character": "player"
        },
        "vtm5e":{
            "vampire": "vampire",
            "werewolf": "werewolf"
        },
        "black-flag":{
            "pc": "player"
        },
        "cyphersystem":{
            "PC": "player",
        }

    }
}

export {systemMappingSheet, systemMapping}