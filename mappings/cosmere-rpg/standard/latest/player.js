import baseMapping from "../../../../scripts/baseMapping.js";

class MappingClass extends baseMapping {


    authors = [
        {
            name: 'boxfriend',
            url: 'https://github.com/boxfriend',
            github: 'https://github.com/boxfriend',
        },
    ];
    // override createMappings method from base class
    async createMappings() {
        super.createMappings();

        // Set the PDF files to use - MIND that the order of the files is important!
        this.pdfFiles.push({
            pdfUrl: '/modules/sheet-export/mappings/cosmere-rpg/Cosmere_RPG_SL_Character_Sheet.pdf',
            nameDownload: `${this.actor.name ?? "character"}.pdf`,
            name: "Cosmere_RPG_SL_Character_Sheet.pdf",
        });
		
        this.setCalculated("Level.Page 1", this.actor.system.level);
		this.setCalculated("Character Name.Page 1", this.actor.name);
        this.setCalculated("Paths.Page 1", this.actor.paths.map(x => x.name).join(', '));
        this.setCalculated("Ancestry.Page 1", this.actor.ancestry.name);
        this.setCalculated("Physical Defense.Page 1", this.actor.system.defenses.phy.value);
        this.setCalculated("Cognitive Defense.Page 1", this.actor.system.defenses.cog.value);
        this.setCalculated("Spiritual Defense.Page 1", this.actor.system.defenses.spi.value);
        this.setCalculated("Speed.Page 1", this.actor.system.attributes.spd.value);
        this.setCalculated("Willpower.Page 1", this.actor.system.attributes.wil.value);
        this.setCalculated("Presence.Page 1", this.actor.system.attributes.pre.value);
        this.setCalculated("Strength.Page 1", this.actor.system.attributes.str.value);
        this.setCalculated("Intellect.Page 1", this.actor.system.attributes.int.value);
        this.setCalculated("Awareness.Page 1", this.actor.system.attributes.awa.value);
		
		const tickBoxes = (boxes, rank) => {
			boxes.forEach((box, index) => {
				this.setCalculated(box, rank > index);
			});
		};
		
		//Physical Skills
		const agi = this.actor.system.skills.agi;
		this.setCalculated("Agility", agi.mod.value);
		tickBoxes(["Rank Box 7","Rank Box 10","Rank Box 6","Rank Box 9","Rank Box 8"], agi.rank);
		
		const ath = this.actor.system.skills.ath;
		this.setCalculated("Athletics", ath.mod.value);
		tickBoxes(["Rank Box 12", "Rank Box 14","Rank Box 15", "Rank Box 11", "Rank Box 13"], ath.rank);
		
		const hwp = this.actor.system.skills.hwp;
		this.setCalculated("Heavy Weapons", hwp.mod.value);
		tickBoxes(["Rank Box 17", "Rank Box 20", "Rank Box 16", "Rank Box 19", "Rank Box 18"], hwp.rank);
		
		const lwp = this.actor.system.skills.lwp;
		this.setCalculated("Light Weapons", lwp.mod.value);
		tickBoxes(["Rank Box 22", "Rank Box 25", "Rank Box 21", "Rank Box 24", "Rank Box 23"], lwp.rank);
		
		const stl = this.actor.system.skills.stl;
		this.setCalculated("Stealth", stl.mod.value);
		tickBoxes(["Rank Box 27", "Rank Box 30", "Rank Box 26", "Rank Box 29", "Rank Box 28"], stl.rank);
		
		const thv = this.actor.system.skills.thv;
		this.setCalculated("Thievery", thv.mod.value);
		tickBoxes(["Rank Box 32", "Rank Box 35", "Rank Box 31", "Rank Box 34", "Rank Box 33"], thv.rank);
		
		//Cognitive Skills
		const cra = this.actor.system.skills.cra;
		this.setCalculated("Crafting", cra.mod.value);
		tickBoxes(["Rank Box 42", "Rank Box 45", "Rank Box 41", "Rank Box 44", "Rank Box 43"], cra.rank);
		
		const ded = this.actor.system.skills.ded;
        this.setCalculated("Deduction", ded.mod.value);
		tickBoxes(["Rank Box 47", "Rank Box 50", "Rank Box 46", "Rank Box 49", "Rank Box 48"], ded.rank);
		
		const dis = this.actor.system.skills.dis;
        this.setCalculated("Discipline", dis.mod.value);
		tickBoxes(["Rank Box 52", "Rank Box 55", "Rank Box 51", "Rank Box 54", "Rank Box 53"], dis.rank);
		
		const inm = this.actor.system.skills.inm;
        this.setCalculated("Intimidation", inm.mod.value);
		tickBoxes(["Rank Box 57", "Rank Box 60", "Rank Box 56", "Rank Box 59", "Rank Box 58"], inm.rank);
		
		const lor = this.actor.system.skills.lor;
        this.setCalculated("Lore", lor.mod.value);
		tickBoxes(["Rank Box 62", "Rank Box 65", "Rank Box 61", "Rank Box 64", "Rank Box 63"], lor.rank);
		
		const med = this.actor.system.skills.med;
        this.setCalculated("Medicine", med.mod.value);
		tickBoxes(["Rank Box 67", "Rank Box 70", "Rank Box 66", "Rank Box 69", "Rank Box 68"], med.rank);
		
		//Spiritual Skills
		const dec = this.actor.system.skills.dec;
		this.setCalculated("Deception", dec.mod.value);
		tickBoxes(["Rank Box 77", "Rank Box 80", "Rank Box 76", "Rank Box 79", "Rank Box 78"], dec.rank);
		
		const ins = this.actor.system.skills.ins;
        this.setCalculated("Insight", ins.mod.value);
		tickBoxes(["Rank Box 82", "Rank Box 85", "Rank Box 81", "Rank Box 84", "Rank Box 83"], ins.rank);
		
		const lea = this.actor.system.skills.lea;
        this.setCalculated("Leadership", lea.mod.value);
		tickBoxes(["Rank Box 87", "Rank Box 90", "Rank Box 86", "Rank Box 89", "Rank Box 88"], lea.rank);
		
		const prc = this.actor.system.skills.prc;
        this.setCalculated("Perception", prc.mod.value);
		tickBoxes(["Rank Box 92", "Rank Box 95", "Rank Box 91", "Rank Box 94", "Rank Box 93"], prc.rank);
		
		const prs = this.actor.system.skills.prs;
        this.setCalculated("Persuasion", prs.mod.value);
		tickBoxes(["Rank Box 97", "Rank Box 100", "Rank Box 96", "Rank Box 99", "Rank Box 98"], prs.rank);
		
		const sur = this.actor.system.skills.sur;
        this.setCalculated("Survival", sur.mod.value);
		tickBoxes(["Rank Box 102", "Rank Box 105", "Rank Box 101", "Rank Box 104", "Rank Box 103"], sur.rank);

        this.setCalculated("Recovery Die", this.actor.system.recovery.die.derived);
        this.setCalculated("Health Maximum", this.actor.system.resources.hea.max.value);
        this.setCalculated("Health Current", this.actor.system.resources.hea.value);
		this.setCalculated("Focus Maximum", this.actor.system.resources.foc.max.value);
        this.setCalculated("Focus Current", this.actor.system.resources.foc.value);
		this.setCalculated("Investiture Maximum 4", this.actor.system.resources.inv.max.value ?? '0');
        this.setCalculated("Investiture Current 4", this.actor.system.resources.inv.value ?? '0');
        this.setCalculated("Deflect", this.actor.deflect ?? '0');

        this.setCalculated("Expertises 1", this.actor.system.expertises.map(x => x.label).join(', '));
        this.setCalculated("Lifting Capacity", this.actor.system.encumbrance.lift.derived);
        this.setCalculated("Movement", Object.entries(this.actor.system.movement)
			.filter(([_, value]) => value.rate.derived > 0)
			.map(([key, value]) => `${key}: ${value.rate.derived}`)
			.join('\n'));
			
        this.setCalculated("Senses Range", this.actor.system.senses.range.value);
        this.setCalculated("Conditions", Array.from(this.actor.items.values()).filter(x => x.type === 'injury')
			.map(x => `${x.name}: ${x.system.duration.remaining} / ${x.system.duration.initial}`).join('\n'));

        this.setCalculated("Talents 1", this.actor.talents.map(x => x.name).join('\n'));
        this.setCalculated("Weapons", Array.from(this.actor.items.values()).filter(x => x.type === 'weapon').map(x => x.name).join('\n'));
		
        this.setCalculated("Spheres", this.actor.system.currency.spheres.total.value);
        
        this.setCalculated("Obstacle", this.actor.system.obstacle);
        this.setCalculated("Purpose", this.actor.system.purpose);
		
		//Goals
		const g1 = this.actor.goals[0];
		this.setCalculated("Goal 1", g1?.name ?? '');
		if(g1) tickBoxes(["Goal Box 2", "Goal Box 3", "GoalBox4"], g1.system.level);
		
		const g2 = this.actor.goals[1];
        this.setCalculated("Goal 2", g2?.name ?? '');
		if(g2) tickBoxes(["Goal Box 4", "Goal Box 5", "GoalBox5"], g2.system.level);
		
		const g3 = this.actor.goals[2];
        this.setCalculated("Goal 3", g3?.name ?? '');
		if(g3) tickBoxes(["Goal Box 6", "Goal Box 7", "GoalBox6"], g3.system.level);
		
		const g4 = this.actor.goals[3];
        this.setCalculated("Goal 4", g4?.name ?? '');
		if(g4) tickBoxes(["Goal Box 8", "Goal Box 9", "GoalBox7"], g4.system.level);
		
		const g5 = this.actor.goals[4];
        this.setCalculated("Goal 5", g5?.name ?? '');
		if(g5) tickBoxes(["Goal Box 10", "Goal Box 11", "GoalBox8"], g5.system.level);
		
		const g6 = this.actor.goals[5];
        this.setCalculated("Goal 6", g6?.name ?? '');
		if(g6) tickBoxes(["Goal Box 12", "Goal Box 13", "GoalBox9"], g6.system.level);
		
		const g7 = this.actor.goals[6];
        this.setCalculated("Goal 7", g7?.name ?? '');
		if(g7) tickBoxes(["Goal Box 14", "Goal Box 15", "GoalBox10"], g7.system.level);
		
		const g8 = this.actor.goals[7];
        this.setCalculated("Goal 8", g8?.name ?? '');
		if(g8) tickBoxes(["Goal Box 16", "Goal Box 17", "GoalBox11"], g8.system.level);
		
		const g9 = this.actor.goals[8];
        this.setCalculated("Goal 9", g9?.name ?? '');
		if(g9) tickBoxes(["Goal Box 18", "Goal Box 19", "GoalBox12"], g9.system.level);
		
        this.setCalculated("Talents 3", this.actor.system.notes);
        this.setCalculated("Connections", Array.from(this.actor.items.values()).filter(x => x.type === 'connection').map(x => x.name).join('\n'));
        this.setCalculated("Armor & Equipment", Array.from(this.actor.items.values()).filter(x => x.type === 'armor' || x.type == 'equipment').map(x => x.name).join('\n'));
        
        this.setCalculated("Character Appearance", this.actor.system.appearance);

    }
	
	
	
}
export default MappingClass;

