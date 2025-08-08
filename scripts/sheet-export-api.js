import { PDFDocument } from './lib/pdf-lib.esm.js';
import { systemMapping, systemMappingSheet } from './systemMapping.js';


async function getMapping(mappingChoice, mappingRelease, mappingElement) {
	console.log("get mapping");
	/*
	console.log(`/modules/sheet-export/mappings/${game.system.id}/${mappingChoice}/${mappingRelease}/${mappingElement}.json`);
	console.log(getRoute(`/modules/sheet-export/mappings/${game.system.id}/${mappingChoice}/${mappingRelease}/${mappingElement}.json`));
	const mapping = await fetch(getRoute(`/modules/sheet-export/mappings/${game.system.id}/${mappingChoice}/${mappingRelease}/${mappingElement}.json`)).then(response => response.text()
	);
	console.log(mapping);
	try {
		return JSON.parse(mapping);
	} catch (err) {
		console.error('Error parsing JSON:', err);
		return {};
	}
*/
	//let mappingClass;
	const { default: mappingClass } = await import(getRoute(`/modules/sheet-export/mappings/${game.system.id}/${mappingChoice}/${mappingRelease}/${mappingElement}.js`));
	console.log(mappingClass);
	var mc = new mappingClass(actor, this.sheetType, this.sheet);
	console.log(mc);
	console.log(mc.getMapping("name"));
	console.log(mc.getMapping("test1"));
	return mc;
}

async function getPdf(pdfUrl, buffer = null) {
	console.log(pdfUrl);
	let pdfBytes = null
	if (buffer == null) {
		pdfBytes = await fetch(getRoute(pdfUrl)).then((res) => res.arrayBuffer());
	} else {
		pdfBytes = buffer;
	}
	//	const formBytes = await fetch(getRoute(pdfUrl)).then((res) => res.arrayBuffer());

	const pdfDoc = await PDFDocument.load(pdfBytes);
	return pdfDoc;
}

function getSheetTypeFromActor(actor, mappingChoice = "", mappingRelease = "") {
	let systemMappingsSheet = systemMappingSheet();
	let sheetType = "";
	if (systemMappingsSheet[game.system.id] == undefined) {
		console.log("game system not yet supported by sheet-export");
		return;
	} else if (systemMappingsSheet[game.system.id][actor.type]) {
		console.log("there is a mapping for the actor type");
		console.log(`/modules/sheet-export/mappings/${game.system.id}/${mappingChoice}/${mappingRelease}/${systemMappingsSheet[game.system.id][actor.type]}.js`);
		const request = new XMLHttpRequest();
		request.open("HEAD", getRoute(`/modules/sheet-export/mappings/${game.system.id}/${mappingChoice}/${mappingRelease}/${systemMappingsSheet[game.system.id][actor.type]}.js`), false); // `false` makes the request synchronous
		request.send(null);
		if (request.status === 200) {
			sheetType = systemMappingsSheet[game.system.id][actor.type];
		} else {
			console.log("the sheet for PC Type should be supported but mapping is not present for this release");
			console.log(`${game.system.id}/${mappingChoice}/${mappingRelease}/${systemMappingsSheet[game.system.id][actor.type]}.js`)
			return;
		}
	} else {
		console.log("the sheet for this Document Type is not supported by sheet-export");
		return;
	}
	return sheetType;
}

function getSheetType(actor, mappingChoice = "", mappingRelease = "") {
	let systemMappings = systemMapping();
	let sheetType = "";

	if (systemMappings[game.system.id] == undefined) {
		console.log("game system not yet supported by sheet-export");
		return;
	} else if (systemMappings[game.system.id].player.includes(actor.type ?? actor.data.type)) {
		const request = new XMLHttpRequest();
		request.open("HEAD", getRoute(`/modules/sheet-export/mappings/${game.system.id}/${mappingChoice}/${mappingRelease}/player.js`), false); // `false` makes the request synchronous
		request.send(null);
		if (request.status === 200) {
			sheetType = "player";
		} else {
			console.log("the sheet for PC Type should be supported but mapping is not present for this release");
			return;
		}
	} else if (systemMappings[game.system.id].npc.includes(actor.type ?? actor.data.type)) {
		const request = new XMLHttpRequest();
		request.open("HEAD", getRoute(`/modules/sheet-export/mappings/${game.system.id}/${mappingChoice}/${mappingRelease}/npc.js`), false); // `false` makes the request synchronous
		request.send(null);
		if (request.status === 200) {
			sheetType = "npc";
		} else {
			console.log("the sheet for NPC Type should be supported but mapping is not present for this release");
			return;
		}
	} else {
		console.log("the sheet for this Document Type is not supported by sheet-export");
		return;
	}
	return sheetType;
}

export { getMapping, getPdf, getSheetType, getSheetTypeFromActor };

