import { PDFDocument } from './lib/pdf-lib.esm.js';
import { systemMapping } from './systemMapping.js';


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

function getSheetType(actor) {
	let systemMappings = systemMapping();
	let sheetType = "";
	if (systemMappings[game.system.id] == undefined) {
		console.log("game system not yet supported by sheet-export");
		return;
	} else if (systemMappings[game.system.id].player.includes(actor.type ?? actor.data.type)) {
		sheetType = "player";
	} else if (systemMappings[game.system.id].npc.includes(actor.type ?? actor.data.type)) {
		sheetType = "npc";
	} else {
		console.log("the sheet for this Document Type is not supported by sheet-export");
		return;
	}
	return sheetType;
}

export { getMapping, getPdf, getSheetType };

