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

        let BLOOD_POTENCY_TEXT = [
            {
                surge: game.i18n.localize('WOD5E.VTM.Add1Dice'),
                mend: game.i18n.localize('WOD5E.VTM.1SuperficialDamage'),
                power: game.i18n.localize('WOD5E.None'),
                rouse: game.i18n.localize('WOD5E.None'),
                bane: '0',
                feeding: game.i18n.localize('WOD5E.VTM.NoEffect')
            },
            {
                surge: game.i18n.localize('WOD5E.VTM.Add2Dice'),
                mend: game.i18n.localize('WOD5E.VTM.1SuperficialDamage'),
                power: game.i18n.localize('WOD5E.None'),
                rouse: game.i18n.localize('WOD5E.VTM.Level1'),
                bane: '2',
                feeding: game.i18n.localize('WOD5E.VTM.NoEffect')
            },
            {
                surge: game.i18n.localize('WOD5E.VTM.Add2Dice'),
                mend: game.i18n.localize('WOD5E.VTM.2SuperficialDamage'),
                power: game.i18n.localize('WOD5E.VTM.Add1Dice'),
                rouse: game.i18n.localize('WOD5E.VTM.Level1'),
                bane: '2',
                feeding: game.i18n.localize('WOD5E.VTM.FeedingPenalty1')
            },
            {
                surge: game.i18n.localize('WOD5E.VTM.Add3Dice'),
                mend: game.i18n.localize('WOD5E.VTM.2SuperficialDamage'),
                power: game.i18n.localize('WOD5E.VTM.Add1Dice'),
                rouse: game.i18n.localize('WOD5E.VTM.Level2'),
                bane: '3',
                feeding: game.i18n.localize('WOD5E.VTM.FeedingPenalty2')
            },
            {
                surge: game.i18n.localize('WOD5E.VTM.Add3Dice'),
                mend: game.i18n.localize('WOD5E.VTM.3SuperficialDamage'),
                power: game.i18n.localize('WOD5E.VTM.Add2Dice'),
                rouse: game.i18n.localize('WOD5E.VTM.Level2'),
                bane: '3',
                feeding: game.i18n.localize('WOD5E.VTM.FeedingPenalty3')
            },
            {
                surge: game.i18n.localize('WOD5E.VTM.Add4Dice'),
                mend: game.i18n.localize('WOD5E.VTM.3SuperficialDamage'),
                power: game.i18n.localize('WOD5E.VTM.Add2Dice'),
                rouse: game.i18n.localize('WOD5E.VTM.Level3'),
                bane: '4',
                feeding: game.i18n.localize('WOD5E.VTM.FeedingPenalty4')
            },
            {
                surge: game.i18n.localize('WOD5E.VTM.Add4Dice'),
                mend: game.i18n.localize('WOD5E.VTM.3SuperficialDamage'),
                power: game.i18n.localize('WOD5E.VTM.Add3Dice'),
                rouse: game.i18n.localize('WOD5E.VTM.Level3'),
                bane: '4',
                feeding: game.i18n.localize('WOD5E.VTM.FeedingPenalty5')
            },
            {
                surge: game.i18n.localize('WOD5E.VTM.Add5Dice'),
                mend: game.i18n.localize('WOD5E.VTM.3SuperficialDamage'),
                power: game.i18n.localize('WOD5E.VTM.Add3Dice'),
                rouse: game.i18n.localize('WOD5E.VTM.Level4'),
                bane: '5',
                feeding: game.i18n.localize('WOD5E.VTM.FeedingPenalty5')
            },
            {
                surge: game.i18n.localize('WOD5E.VTM.Add5Dice'),
                mend: game.i18n.localize('WOD5E.VTM.4SuperficialDamage'),
                power: game.i18n.localize('WOD5E.VTM.Add4Dice'),
                rouse: game.i18n.localize('WOD5E.VTM.Level4'),
                bane: '5',
                feeding: game.i18n.localize('WOD5E.VTM.FeedingPenalty6')
            },
            {
                surge: game.i18n.localize('WOD5E.VTM.Add6Dice'),
                mend: game.i18n.localize('WOD5E.VTM.4SuperficialDamage'),
                power: game.i18n.localize('WOD5E.VTM.Add4Dice'),
                rouse: game.i18n.localize('WOD5E.VTM.Level5'),
                bane: '6',
                feeding: game.i18n.localize('WOD5E.VTM.FeedingPenalty6')
            },
            {
                surge: game.i18n.localize('WOD5E.VTM.Add6Dice'),
                mend: game.i18n.localize('WOD5E.VTM.5SuperficialDamage'),
                power: game.i18n.localize('WOD5E.VTM.Add5Dice'),
                rouse: game.i18n.localize('WOD5E.VTM.Level5'),
                bane: '6',
                feeding: game.i18n.localize('WOD5E.VTM.FeedingPenalty7')
            }
        ]


        // Set the PDF files to use - MIND that the order of the files is important!
        this.pdfFiles.push({
            pdfUrl: '/modules/sheet-export/mappings/vtm5e/vampire.pdf',
            nameDownload: `${this.actor.name ?? "character"}.pdf`,
            name: "vampire.pdf",
        });

        //console.log(this.actor.system.blood.potency);
        //console.log(BLOOD_POTENCY_TEXT);
        let bpt = BLOOD_POTENCY_TEXT[this.actor.system.blood.potency];
        //console.log(bpt)

        this.setCalculated("Name", this.actor.name);
        this.setCalculated("Concept", this.actor.system.headers.concept);
        this.setCalculated("Predator", this.actor.items.filter(item => { console.log(item); console.log(item.type); console.log(item.type === 'predatorType'); return item.type === 'predatorType' })[0]?.name);
        this.setCalculated("Chronicle", this.actor.system.headers.chronicle);
        this.setCalculated("Ambition", this.actor.system.headers.ambition);
        this.setCalculated("Clan", this.actor.items.filter(item => { console.log(item); console.log(item.type); console.log(item.type === 'clan'); return item.type === 'clan' })[0]?.name);
        this.setCalculated("Sire", this.actor.system.headers.sire);
        this.setCalculated("Desire", this.actor.system.headers.desire);
        this.setCalculated("Generation", this.actor.system.headers.generation);
        this.setCalculated("Notes", this.htmlToText(this.actor.system.notes));
        this.setCalculated("Blood Surge", bpt.surge);
        this.setCalculated("Mend Amount", bpt.mend);
        this.setCalculated("Power Bonus", bpt.power);
        this.setCalculated("Rouse ReRoll", bpt.rouse);
        this.setCalculated("Feeding Penalty", bpt.feeding);
        this.setCalculated("Bane Severity", bpt.bane);
        this.setCalculated("Appearance", this.htmlToText(this.actor.system.appearance));
        this.setCalculated("Distinguishing features", this.actor.SOMETHING);
        this.setCalculated("History", this.htmlToText(this.actor.system.biography));
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
            this.setCalculated(`health${index}`, this.actor.system.health.max >= index ? "" : "X");
        }

        // willpower
        for (let index = 1; index < 11; index++) {
            //const element = array[index];
            this.setCalculated(`will${index}`, this.actor.system.willpower.max >= index ? "" : "X");
        }

        // potency
        for (let index = 1; index < 11; index++) {
            //const element = array[index];
            this.setCalculated(`potency${index}`, this.actor.system.blood.potency >= index ? true : false);
        }

        // hunger
        for (let index = 1; index < 6; index++) {
            //const element = array[index];
            this.setCalculated(`hunger${index}`, this.actor.system.hunger.value >= index ? true : false);
        }

        // humanity
        for (let index = 1; index < 11; index++) {
            //const element = array[index];
            this.setCalculated(`hum-${index-1}`, this.actor.system.humanity.value >= index ? true : false);
        }

        let discIndex = 1
        const disciplines = this.actor.system.disciplines
        const onwedDisciplines = Object.entries(this.actor.system.disciplines)
            .filter(discipline => disciplines[discipline[0]].value !== 0);
        console.log("known disciplines")
        console.log(onwedDisciplines)
        onwedDisciplines.forEach(discipline => {
            console.group(discipline)
            console.log(discIndex)
            console.log(discipline)
            this.setCalculated(`Main${discIndex}`, discipline[1].displayName);

            const powers = discipline[1].powers

            for (let index = 1; index < 6; index++) {
                //const element = array[index];
                console.log(`main${discIndex}- ${index}`)
                console.log(discipline[1].value >= index ? true : false)
                this.setCalculated(`main${discIndex}-${index}`, discipline[1].value >= index ? true : false);
            }

            console.log(powers)
            let indexPower = 1
            powers.forEach(pow => {
                //                this.setCalculated(`main${indexPower}_${discIndex}`, pow.name);
                this.setCalculated(`Row${indexPower}_${discIndex}`, pow.name);
                console.log(pow)
                //                console.log(`main${indexPower}_${discIndex}`)
                indexPower++
            })
            discIndex++
        })

        this.setCalculated("Chronicle Tenets", this.actor.SOMETHING);
        this.setCalculated("Touchstones Convictions", (function (h) {
            const d = document.createElement("div");
            d.innerHTML = h;
            return d.textContent || d.innerText || "";
        })(this.actor.system.headers.touchstones));


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

        this.setCalculated("Clan Banes", this.htmlToText(this.actor.items.filter(item => { return item.type === 'clan' })[0]?.system.bane));
        this.setCalculated("Resonance", this.actor.system.blood.resonance);
        this.setCalculated("totalxp", this.actor.system.derivedXP.totalXP);
        this.setCalculated("spentxp", (this.actor.system.derivedXP.totalXP - this.actor.system.derivedXP.remainingXP));
        this.setCalculated("Date of Death", this.actor.system.bio.dateof.death);
        this.setCalculated("True age", this.actor.system.bio.age.trueage);
        this.setCalculated("Apparent Age", this.actor.system.bio.age.apparent);
        this.setCalculated("Date of Birth", this.actor.system.bio.dateof.birth);

    }
}
export default MappingClass;

