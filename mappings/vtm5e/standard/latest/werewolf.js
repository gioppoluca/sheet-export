import baseMapping from "../../../../scripts/baseMapping.js";

class MappingClass extends baseMapping {


    authors = [
        {
            name: 'gioppoluca',
            url: 'https://github.com/gioppoluca',
            github: 'https://github.com/gioppoluca',
        },
    ];


    // override createMappings method from base class
    createMappings() {
        super.createMappings();

        // Set the PDF files to use - MIND that the order of the files is important!
        this.pdfFiles.push({
            pdfUrl: '/modules/sheet-export/mappings/vtm5e/werewolf.pdf',
            nameDownload: `${this.actor.name ?? "character"}.pdf`,
            name: "werewolf.pdf",
        });

        this.setCalculated("Name", this.actor.name);
        this.setCalculated("Concept", this.actor.system.headers.concept);
        this.setCalculated("Patron", this.actor.items.filter(item => { console.log(item); console.log(item.type); console.log(item.type === 'tribe'); return item.type === 'tribe' })[0]?.system?.patronSpirit?.name);
        this.setCalculated("Chron", this.htmlToText(this.actor.system.headers.chronicle));
        this.setCalculated("Tribe", this.actor.items.filter(item => { console.log(item); console.log(item.type); console.log(item.type === 'tribe'); return item.type === 'tribe' })[0]?.name);
        this.setCalculated("Auspice", this.actor.items.filter(item => { console.log(item); console.log(item.type); console.log(item.type === 'auspice'); return item.type === 'auspice' })[0]?.name);
        this.setCalculated("Notes", this.htmlToText(this.actor.system.notes));
        this.setCalculated("Appearance", this.htmlToText(this.actor.system.appearance));
        this.setCalculated("History", this.htmlToText(this.actor.system.bio.history));
        this.setCalculated("Chronicle Tenets", this.htmlToText(this.actor.system.headers.tenets));
        this.setCalculated("Touchstones Convictions", (function (h) {
            const d = document.createElement("div");
            d.innerHTML = h;
            return d.textContent || d.innerText || "";
        })(this.actor.system.headers.touchstones));
        this.setCalculated("totalxp", this.actor.system.derivedXP.totalXP);
        this.setCalculated("spentxp", (this.actor.system.derivedXP.totalXP - this.actor.system.derivedXP.remainingXP));


        Object.keys(this.actor.system.attributes).forEach(element => {
            console.log(element)
            for (let index = 1; index < 6; index++) {
                //const element = array[index];
                this.setCalculated(`${element}${index}`, this.actor.system.attributes[element].value >= index ? true : false);
            }
        });

        Object.keys(this.actor.system.skills).forEach(element => {
            console.log(element)
            for (let index = 1; index < 6; index++) {
                //const element = array[index];
                this.setCalculated(`${element}${index}`, this.actor.system.skills[element].value >= index ? true : false);
            }
        });

        // Health
        for (let index = 1; index < 11; index++) {
            //const element = array[index];
            this.setCalculated(`H${index}`, this.actor.system.health.max >= index ? "" : "X");
        }
        // willpower
        for (let index = 1; index < 11; index++) {
            //const element = array[index];
            this.setCalculated(`wi${index}`, this.actor.system.willpower.max >= index ? "" : "X");
        }
        // Harano
        for (let index = 1; index < 6; index++) {
            //const element = array[index];
            this.setCalculated(`har${index}`, this.actor.system.balance.harano.value >= index ? "X" : "");
        }
        // Hauglosk
        for (let index = 1; index < 6; index++) {
            //const element = array[index];
            this.setCalculated(`hau${index}`, this.actor.system.balance.hauglosk.value >= index ? "X" : "");
        }
        // rage
        for (let index = 1; index < 6; index++) {
            //const element = array[index];
            this.setCalculated(`rg${index}`, this.actor.system.rage.value >= index ? "X" : "");
        }

        // glory
        for (let index = 1; index < 6; index++) {
            //const element = array[index];
            this.setCalculated(`glo${index}`, this.actor.system.renown.glory.value >= index ? "X" : "");
        }
        // honor
        for (let index = 1; index < 6; index++) {
            //const element = array[index];
            this.setCalculated(`ho${index}`, this.actor.system.renown.honor.value >= index ? "X" : "");
        }
        // glory
        for (let index = 1; index < 6; index++) {
            //const element = array[index];
            this.setCalculated(`wd${index}`, this.actor.system.renown.wisdom.value >= index ? "X" : "");
        }


        let giftIndex = 1
        let pdfIndex = 1;
        const gifts = this.actor.system.gifts
        const onwedGifts = Object.entries(this.actor.system.gifts)
            .filter(gift => gifts[gift[0]].powers.length > 0);
        console.log("known gifts")
        console.log(onwedGifts)
        onwedGifts.forEach(gift => {
            console.group(gift)
            console.log(giftIndex)
            console.log(gift)
            //this.setCalculated(`Main${giftIndex}`, gift[1].displayName);

            const powers = gift[1].powers

            //            for (let index = 1; index < 6; index++) {
            //const element = array[index];
            //                console.log(`main${giftIndex}- ${index}`)
            //                console.log(discipline[1].value >= index ? true : false)
            //                this.setCalculated(`main${giftIndex}-${index}`, discipline[1].value >= index ? true : false);
            //            }

            console.log(powers)
            let indexPower = 0
            powers.forEach(pow => {
                //                this.setCalculated(`main${indexPower}_${giftIndex}`, pow.name);
                pdfIndex += indexPower;
                let dpElements = Object.entries(pow.system.dicepool)
                console.log(dpElements)
                let pool = dpElements[0][1].path.split('.')[1] + '+' + dpElements[1][1].path.split('.')[1]
                this.setCalculated(`Gifts-${pdfIndex}`, pow.name);
                this.setCalculated(`GiftsC${pdfIndex}`, pow.system.cost);
                this.setCalculated(`GiftsP${pdfIndex}`, pool);
                this.setCalculated(`GiftsN${pdfIndex}`, this.htmlToText(pow.system.description));
                console.log(pow)
                //                console.log(`main${indexPower}_${giftIndex}`)
                indexPower++
            })
            giftIndex++
            pdfIndex++
        })

        let adflows = this.actor.items.filter(item => { return (item.type === 'feature' && (item.system.featuretype === 'flaw' || item.system.featuretype === 'merit' || item.system.featuretype === 'background')) })
        console.log(adflows);
        let iterations = Math.min(adflows.length + 1, 12)
        for (let index = 1; index < iterations; index++) {
            const element = adflows[index - 1];
            console.log(element)
            this.setCalculated(`adflaw${index}`, element.name);
            for (let i = 1; i < 6; i++) {
                //const element = array[index];
                this.setCalculated(`adflaw${index}-${i}`, element.system.points >= i ? true : false);
            }
        }


    }
}
export default MappingClass;

