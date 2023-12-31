import { MappingEdit } from "./apps/mappingEdit.js";
import { CustomMapping } from "./apps/customMapping.js";

export const registerSettings = function () {
	let mappingOptions = {};
	console.log("----------- SHEET-EXPORT -----------");

	// read from file the folder structure inside the gamesystem in which we are to polulate the option list
	FilePicker.browse("data", `modules/sheet-export/mappings/${game.system.id}`).then(results => {
		// Add the default option first
		console.log(results);


		// Add options for each included mapping
		results.dirs.forEach(name => {
			FilePicker.browse("data", name).then(inner => {
				var releaseName = name.split("/").pop();
				inner.dirs.forEach(innerName => {

					// Create the option
					var option = releaseName+"-"+innerName.split("/").pop();
					console.log(option);
					mappingOptions[option] = option;
				});
			});
		});

	});
	console.log(mappingOptions);
	// Register any custom module settings here
	let modulename = "sheet-export";

	//------------------------------------Module's Mappings--------------------------------------------

	game.settings.register(modulename, "mappingOption", {
		name: game.i18n.localize(`${modulename}.settings.mappingOption.Name`),
		hint: game.i18n.localize(`${modulename}.settings.mappingOption.Hint`),
		scope: "world",
		config: true,
		default: 'standard-latest',
		choices: mappingOptions,
		type: String,
		requiresReload: true,
		onChange: value => { // value is the new value of the setting
			console.log(value)
			game.settings.set(modulename,'mapping-version', value.split("-")[0]);
			game.settings.set(modulename,'mapping-release', value.split("-")[1]);
		  },
	});

	game.settings.register(modulename, "mapping-version", {
		scope: "world",
		config: false,
		default: 'standard',
		type: String,
		requiresReload: true,
	});
	game.settings.register(modulename, "mapping-release", {
		scope: "world",
		config: false,
		default: 'latest',
		type: String,
		requiresReload: true,
	});
	
	game.settings.registerMenu(modulename, 'mappingEdit', {
		name: game.i18n.localize(`${modulename}.settings.mappingEdit.Name`),
		label: game.i18n.localize(`${modulename}.settings.mappingEdit.Name`),
		hint: game.i18n.localize(`${modulename}.settings.mappingEdit.Hint`),
		icon: 'fas fa-desktop',
		restricted: true,
		type: MappingEdit,
	});

	/*
	game.settings.registerMenu(modulename, 'setCustomMapping', {
		name: game.i18n.localize(`${modulename}.settings.setCustomMapping.Name`),
		label: game.i18n.localize(`${modulename}.settings.setCustomMapping.Name`),
		hint: game.i18n.localize(`${modulename}.settings.setCustomMapping.Hint`),
		icon: 'fas fa-desktop',
		restricted: true,
		type: CustomMapping,
	});
*/
}
/*
import { ResetPosition } from "./apps/resetposition.js";
import { EditStats } from "./apps/editstats.js";
import { MonksTokenBar, i18n } from "./monks-tokenbar.js"

export const divideXpOptions = {
	"no-split": "MonksTokenBar.divide-xp-no-split.name",
	"equal-split": "MonksTokenBar.divide-xp-equal-split.name",
	"robin-hood-split": "MonksTokenBar.divide-xp-robin-hood-split.name",
	"nottingham-split": "MonksTokenBar.divide-xp-nottingham-split.name",
};

export const registerSettings = function () {
	// Register any custom module settings here
	let modulename = "monks-tokenbar";

	let imageoptions = {
		'token': game.i18n.localize("MonksTokenBar.token-pictures.token"),
		'actor': game.i18n.localize("MonksTokenBar.token-pictures.actor"),
	};

	let movementoptions = {
		'free': game.i18n.localize("MonksTokenBar.FreeMovement"),
		'none': game.i18n.localize("MonksTokenBar.NoMovement"),
		'combat': game.i18n.localize("MonksTokenBar.CombatTurn"),
		'ignore': game.i18n.localize("MonksTokenBar.Ignore"),
	};

	let dblclickoptions = {
		'sheet': game.i18n.localize("MonksTokenBar.OpenCharacterSheet"),
		'request': game.i18n.localize("MonksTokenBar.RequestSavingThrow"),
	};

	let lootoptions = {
		'convert': game.i18n.localize("MonksTokenBar.Convert"),
		'transfer': game.i18n.localize("MonksTokenBar.Transfer"),
		'transferplus': game.i18n.localize("MonksTokenBar.TransferPlus"),
	};

	let openLootOptions = {
		'none': game.i18n.localize("MonksTokenBar.None"),
		'gm': game.i18n.localize("MonksTokenBar.GMOnly"),
		'players': game.i18n.localize("MonksTokenBar.PlayersOnly"),
		'everyone': game.i18n.localize("MonksTokenBar.Everyone"),
	}

	let permissions = {
		"LIMITED": "Limited",
		"OBSERVER": "Observer",
		"OWNER": "Owner"
	}

	let lootsheetoptions = MonksTokenBar.getLootSheetOptions();
	let lootfolder = {};
	
	const dividexp = (game.system.id === "pf2e" ? "no-split" : "equal-split");

	game.settings.registerMenu(modulename, 'resetPosition', {
		name: 'Reset Position',
		label: 'Reset Position',
		hint: 'Reset the position of the tokenbar if it disappears off the screen.',
		icon: 'fas fa-desktop',
		restricted: true,
		type: ResetPosition,
		onClick: (value) => {
			log('Reset position');
		}
	});

	game.settings.registerMenu(modulename, 'editStats', {
		name: 'Edit Stats',
		label: 'Edit Stats',
		hint: 'Edit the stats that are displayed on the Tokenbar',
		icon: 'fas fa-align-justify',
		restricted: true,
		type: EditStats
	});

	//------------------------------------Token Bar settings--------------------------------------------
	game.settings.register(modulename, "allow-player", {
		name: game.i18n.localize("MonksTokenBar.allow-player.name"),
		hint: game.i18n.localize("MonksTokenBar.allow-player.hint"),
		scope: "world",
		config: true,
		default: false,
		type: Boolean,
	});
	game.settings.register(modulename, "show-undefined", {
		name: game.i18n.localize("MonksTokenBar.show-undefined.name"),
		hint: game.i18n.localize("MonksTokenBar.show-undefined.hint"),
		scope: "world",
		config: true,
		default: false,
		type: Boolean,
	});
	game.settings.register(modulename, "show-offline", {
		name: game.i18n.localize("MonksTokenBar.show-offline.name"),
		hint: game.i18n.localize("MonksTokenBar.show-offline.hint"),
		scope: "world",
		config: true,
		default: true,
		type: Boolean,
		onChange: () => { MonksTokenBar.tokenbar.refresh(); }
	});
	game.settings.register(modulename, "use-party", {
		name: game.i18n.localize("MonksTokenBar.use-party.name"),
		hint: game.i18n.localize("MonksTokenBar.use-party.hint"),
		scope: "world",
		config: game.system.id == "pf2e",
		default: false,
		type: Boolean,
		onChange: () => { MonksTokenBar.tokenbar.refresh(); }
	});
	game.settings.register(modulename, "include-actor", {
		name: game.i18n.localize("MonksTokenBar.include-actor.name"),
		hint: game.i18n.localize("MonksTokenBar.include-actor.hint"),
		scope: "world",
		config: true,
		default: false,
		type: Boolean,
		onChange: () => { MonksTokenBar.tokenbar.refresh(); }
	});
	game.settings.register(modulename, "minimum-ownership", {
		name: game.i18n.localize("MonksTokenBar.minimum-ownership.name"),
		hint: game.i18n.localize("MonksTokenBar.minimum-ownership.hint"),
		scope: "world",
		config: true,
		default: "OWNER",
		type: String,
		choices: permissions,
	});
	game.settings.register(modulename, "disable-tokenbar", {
		name: game.i18n.localize("MonksTokenBar.disable-tokenbar.name"),
		hint: game.i18n.localize("MonksTokenBar.disable-tokenbar.hint"),
		scope: "client",
		config: true,
		default: false,
		type: Boolean,
	});

	game.settings.register(modulename, "show-vertical", {
		name: game.i18n.localize("MonksTokenBar.show-vertical.name"),
		hint: game.i18n.localize("MonksTokenBar.show-vertical.hint"),
		scope: "client",
		config: true,
		default: false,
		type: Boolean,
		requiresReload: true
	});

	game.settings.register(modulename, "dblclick-action", {
		name: game.i18n.localize("MonksTokenBar.dblclick-action.name"),
		hint: game.i18n.localize("MonksTokenBar.dblclick-action.hint"),
		scope: "world",
		config: true,
		default: 'sheet',
		choices: dblclickoptions,
		type: String,
		requiresReload: true
	});

	//------------------------------------Icon settings--------------------------------------------

	game.settings.register(modulename, "token-size", {
		name: game.i18n.localize("MonksTokenBar.token-size.name"),
		hint: game.i18n.localize("MonksTokenBar.token-size.hint"),
		scope: "world",
		config: true,
		range: {
			min: 50,
			max: 100,
			step: 5,
		},
		default: 50,
		type: Number,
		requiresReload: true
	});

	game.settings.register(modulename, "resolution-size", {
		name: game.i18n.localize("MonksTokenBar.resolution-size.name"),
		hint: game.i18n.localize("MonksTokenBar.resolution-size.hint"),
		scope: "world",
		config: true,
		range: {
			min: 30,
			max: 200,
			step: 5,
		},
		default: 50,
		type: Number,
		requiresReload: true
	});

	game.settings.register(modulename, "show-resource-bars", {
		name: game.i18n.localize("MonksTokenBar.show-resource-bars.name"),
		hint: game.i18n.localize("MonksTokenBar.show-resource-bars.hint"),
		scope: "world",
		config: true,
		default: false,
		type: Boolean,
	});
	game.settings.register(modulename, "token-pictures", {
		name: game.i18n.localize("MonksTokenBar.token-pictures.name"),
		hint: game.i18n.localize("MonksTokenBar.token-pictures.hint"),
		scope: "world",
		config: true,
		default: "token",
		type: String,
		choices: imageoptions,
	});

	game.settings.register(modulename, "show-inspiration", {
		name: game.i18n.localize("MonksTokenBar.show-inspiration.name"),
		hint: game.i18n.localize("MonksTokenBar.show-inspiration.hint"),
		scope: "client",
		config: true,
		default: false,
		type: Boolean,
		onChange: () => { MonksTokenBar.tokenbar.refresh(); }
	});
	game.settings.register(modulename, "show-disable-panning-option", {
		name: game.i18n.localize("MonksTokenBar.show-disable-panning-option.name"),
		hint: game.i18n.localize("MonksTokenBar.show-disable-panning-option.hint"),
		scope: "world",
		config: true,
		default: false,
		type: Boolean,
		requiresReload: true
	});

	//------------------------------------Movement settings--------------------------------------------
	game.settings.register(modulename, "notify-on-change", {
		name: game.i18n.localize("MonksTokenBar.notify-on-change.name"),
		hint: game.i18n.localize("MonksTokenBar.notify-on-change.hint"),
		scope: "world",
		config: true,
		default: true,
		type: Boolean,
	});

	game.settings.register(modulename, "change-to-combat", {
		name: game.i18n.localize("MonksTokenBar.change-to-combat.name"),
		hint: game.i18n.localize("MonksTokenBar.change-to-combat.hint"),
		scope: "world",
		config: true,
		default: true,
		type: Boolean
	});
	game.settings.register(modulename, "free-npc-combat", {
		name: game.i18n.localize("MonksTokenBar.free-npc-combat.name"),
		hint: game.i18n.localize("MonksTokenBar.free-npc-combat.hint"),
		scope: "world",
		config: true,
		default: true,
		type: Boolean,
	});
	game.settings.register(modulename, "allow-after-movement", {
		name: game.i18n.localize("MonksTokenBar.allow-after-movement.name"),
		hint: game.i18n.localize("MonksTokenBar.allow-after-movement.hint"),
		scope: "world",
		config: true,
		default: false,
		type: Boolean
	});
	game.settings.register(modulename, "movement-after-combat", {
		name: game.i18n.localize("MonksTokenBar.movement-after-combat.name"),
		hint: game.i18n.localize("MonksTokenBar.movement-after-combat.hint"),
		scope: "world",
		config: true,
		default: "free",
		type: String,
		choices: movementoptions,
	});
	game.settings.register(modulename, "show-on-tracker", {
		name: game.i18n.localize("MonksTokenBar.show-on-tracker.name"),
		hint: game.i18n.localize("MonksTokenBar.show-on-tracker.hint"),
		scope: "world",
		config: true,
		default: true,
		type: Boolean
	});

	//------------------------------------After Combat settings--------------------------------------------

	game.settings.register(modulename, "send-levelup-whisper", {
		name: game.i18n.localize("MonksTokenBar.send-levelup-whisper.name"),
		hint: game.i18n.localize("MonksTokenBar.send-levelup-whisper.hint"),
		scope: "world",
		config: true,
		default: true,
		type: Boolean,
	});

	game.settings.register(modulename, "show-xp-dialog", {
		name: game.i18n.localize("MonksTokenBar.show-xp-dialog.name"),
		hint: game.i18n.localize("MonksTokenBar.show-xp-dialog.hint"),
		scope: "world",
		config: true,
		default: true,
		type: Boolean,
	});

	game.settings.register(modulename, "hide-combatants", {
		name: game.i18n.localize("MonksTokenBar.hide-combatants.name"),
		hint: game.i18n.localize("MonksTokenBar.hide-combatants.hint"),
		scope: "world",
		config: true,
		default: false,
		type: Boolean,
	});

	game.settings.register(modulename, "divide-xp", {
		name: game.i18n.localize("MonksTokenBar.divide-xp.name"),
		hint: game.i18n.localize("MonksTokenBar.divide-xp.hint"),
		scope: "world",
		config: true,
		default: dividexp,
		type: String,
		choices: divideXpOptions,
		localize: true
	});

	game.settings.register(modulename, "gold-formula", {
		name: game.i18n.localize("MonksTokenBar.gold-formula.name"),
		hint: game.i18n.localize("MonksTokenBar.gold-formula.hint"),
		scope: "world",
		config: true,
		default: "Math.round(0.6 * 10 * (10 ** (0.15 * ({{ actor.system.details.cr}} ?? 0))))",
		type: String,
	});
	game.settings.register(modulename, "auto-gold-cr", {
		name: game.i18n.localize("MonksTokenBar.auto-gold-cr.name"),
		hint: game.i18n.localize("MonksTokenBar.auto-gold-cr.hint"),
		scope: "world",
		config: true,
		default: false,
		type: Boolean,
	});

	//------------------------------------Loot settings--------------------------------------------

	game.settings.register(modulename, "show-lootable-menu", {
		name: game.i18n.localize("MonksTokenBar.show-lootable-menu.name"),
		hint: game.i18n.localize("MonksTokenBar.show-lootable-menu.hint"),
		scope: "world",
		config: true,
		default: true,
		type: Boolean,
	});

	game.settings.register(modulename, "only-use-defeated", {
		name: game.i18n.localize("MonksTokenBar.only-use-defeated.name"),
		hint: game.i18n.localize("MonksTokenBar.only-use-defeated.hint"),
		scope: "world",
		config: true,
		default: false,
		type: Boolean,
	});

	game.settings.register(modulename, "loot-sheet", {
		name: game.i18n.localize("MonksTokenBar.assign-loot.name"),
		hint: game.i18n.localize("MonksTokenBar.assign-loot.hint"),
		scope: "world",
		config: true,
		default: "monks-enhanced-journal",
		choices: lootsheetoptions,
		type: String,
	});
	game.settings.register(modulename, "loot-entity", {
		name: game.i18n.localize("MonksTokenBar.loot-entity.name"),
		hint: game.i18n.localize("MonksTokenBar.loot-entity.hint"),
		scope: "world",
		config: true,
		default: "root",
		type: String,
	});
	game.settings.register(modulename, "loot-name", {
		name: i18n("MonksTokenBar.loot-name.name"),
		hint: i18n("MonksTokenBar.loot-name.hint"),
		scope: "world",
		config: true,
		default: i18n("MonksTokenBar.LootEntry"),
		type: String,
	});
	game.settings.register(modulename, "create-canvas-object", {
		name: game.i18n.localize("MonksTokenBar.create-canvas-object.name"),
		hint: game.i18n.localize("MonksTokenBar.create-canvas-object.hint"),
		scope: "world",
		config: true,
		default: true,
		type: Boolean,
	});
	game.settings.register(modulename, "open-loot", {
		name: game.i18n.localize("MonksTokenBar.open-loot.name"),
		hint: game.i18n.localize("MonksTokenBar.open-loot.hint"),
		scope: "world",
		config: true,
		default: "none",
		choices: openLootOptions,
		type: String,
	});

	//------------------------------------Request Roll settings--------------------------------------------
	game.settings.register(modulename, "allow-roll", {
		name: game.i18n.localize("MonksTokenBar.allow-roll.name"),
		hint: game.i18n.localize("MonksTokenBar.allow-roll.hint"),
		scope: "world",
		config: true,
		default: false,
		type: Boolean,
	});
	game.settings.register(modulename, "request-roll-sound", {
		name: game.i18n.localize("MonksTokenBar.request-roll-sound.name"),
		hint: game.i18n.localize("MonksTokenBar.request-roll-sound.hint"),
		scope: "world",
		config: false,
		default: true,
		type: Boolean,
	});
	game.settings.register(modulename, "request-roll-sound-file", {
		name: game.i18n.localize("MonksTokenBar.request-roll-sound.name"),
		hint: game.i18n.localize("MonksTokenBar.request-roll-sound.hint"),
		scope: "client",
		config: true,
		default: "modules/monks-tokenbar/sounds/RollRequestAlert.ogg",
		type: String,
	});
	game.settings.register(modulename, "gm-sound", {
		name: game.i18n.localize("MonksTokenBar.gm-sound.name"),
		hint: game.i18n.localize("MonksTokenBar.gm-sound.hint"),
		scope: "world",
		config: !game.modules.get("dice-so-nice")?.active,
		default: true,
		type: Boolean,
	});
	game.settings.register(modulename, "add-advantage-buttons", {
		name: game.i18n.localize("MonksTokenBar.add-advantage-buttons.name"),
		hint: game.i18n.localize("MonksTokenBar.add-advantage-buttons.hint"),
		scope: "world",
		config: true,
		default: true,
		type: Boolean,
	});
	game.settings.register(modulename, "delete-after-grab", {
		name: game.i18n.localize("MonksTokenBar.delete-after-grab.name"),
		hint: game.i18n.localize("MonksTokenBar.delete-after-grab.hint"),
		scope: "world",
		config: true,
		default: false,
		type: Boolean,
	});
	game.settings.register(modulename, "capture-savingthrows", {
		name: game.i18n.localize("MonksTokenBar.capture-savingthrows.name"),
		hint: game.i18n.localize("MonksTokenBar.capture-savingthrows.hint"),
		scope: "world",
		config: game.system.id == 'dnd5e',
		default: false,
		type: Boolean
	});

	//this is just a global setting for movement mode
	game.settings.register(modulename, "movement", {
		scope: "world",
		config: false,
		default: "free",
		type: String,
	});
	game.settings.register(modulename, "debug", {
		scope: "world",
		config: false,
		default: false,
		type: Boolean,
	});
	game.settings.register(modulename, "stats", {
		scope: "world",
		config: false,
		default: { default: true },
		type: Object,
	});

	//outdated
	game.settings.register(modulename, "stat1-icon", {
		name: game.i18n.localize("MonksTokenBar.stat1-icon.name"),
		hint: game.i18n.localize("MonksTokenBar.stat1-icon.hint"),
		scope: "world",
		config: false,
		default: null,//icon1, //MonksTokenBar.system._defaultSetting.icon1,
		type: String,
		requiresReload: true
	});
	game.settings.register(modulename, "stat1-resource", {
		name: game.i18n.localize("MonksTokenBar.stat1-resource.name"),
		hint: game.i18n.localize("MonksTokenBar.stat1-resource.hint"),
		scope: "world",
		config: false,
		default: null, //stat1, //MonksTokenBar.system._defaultSetting.stat1,
		type: String,
		requiresReload: true
	});
	game.settings.register(modulename, "stat2-icon", {
		name: game.i18n.localize("MonksTokenBar.stat2-icon.name"),
		hint: game.i18n.localize("MonksTokenBar.stat2-icon.hint"),
		scope: "world",
		config: false,
		default: null, //icon2, //MonksTokenBar.system._defaultSetting.icon2,
		type: String,
		//choices: imageoptions,
		requiresReload: true
	});
	game.settings.register(modulename, "stat2-resource", {
		name: game.i18n.localize("MonksTokenBar.stat2-resource.name"),
		hint: game.i18n.localize("MonksTokenBar.stat2-resource.hint"),
		scope: "world",
		config: false,
		default: null, //stat2, //MonksTokenBar.system._defaultSetting.stat2,
		type: String,
		requiresReload: true
	});

};
*/