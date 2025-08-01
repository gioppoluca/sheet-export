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
    async createMappings() {
        super.createMappings();

        // Set the PDF files to use - MIND that the order of the files is important!
        this.pdfFiles.push({
            pdfUrl: '/modules/sheet-export/mappings/dragonbane/dragonbane.pdf',
            nameDownload: `${this.actor.name ?? "character"}.pdf`,
            name: "dragonbane.pdf",
        });

        this.setCalculated("Checkbox_1", this.actor.SOMETHING);
        this.setCalculated("Checkbox_2", this.actor.SOMETHING);
        this.setCalculated("Checkbox_3", this.actor.SOMETHING);
        this.setCalculated("Checkbox_4", this.actor.SOMETHING);
        this.setCalculated("Checkbox_5", this.actor.SOMETHING);
        this.setCalculated("Checkbox_6", this.actor.SOMETHING);
        this.setCalculated("Checkbox_7", this.actor.SOMETHING);
        this.setCalculated("Checkbox_8", this.actor.SOMETHING);
        this.setCalculated("Checkbox_9", this.actor.SOMETHING);
        this.setCalculated("Checkbox_10", this.actor.SOMETHING);
        this.setCalculated("Checkbox_11", this.actor.SOMETHING);
        this.setCalculated("Checkbox_12", this.actor.SOMETHING);
        this.setCalculated("Checkbox_13", this.actor.SOMETHING);
        this.setCalculated("Checkbox_14", this.actor.SOMETHING);
        this.setCalculated("Checkbox_15", this.actor.SOMETHING);
        this.setCalculated("Checkbox_16", this.actor.SOMETHING);
        this.setCalculated("Checkbox_17", this.actor.SOMETHING);
        this.setCalculated("Checkbox_18", this.actor.SOMETHING);
        this.setCalculated("Checkbox_19", this.actor.SOMETHING);
        this.setCalculated("Checkbox_20", this.actor.SOMETHING);
        this.setCalculated("Checkbox_21", this.actor.SOMETHING);
        this.setCalculated("Checkbox_22", this.actor.SOMETHING);
        this.setCalculated("Checkbox_23", this.actor.SOMETHING);
        this.setCalculated("Checkbox_24", this.actor.SOMETHING);
        this.setCalculated("Checkbox_25", this.actor.SOMETHING);
        this.setCalculated("Checkbox_26", this.actor.SOMETHING);
        this.setCalculated("Checkbox_27", this.actor.SOMETHING);
        this.setCalculated("Checkbox_28", this.actor.SOMETHING);
        this.setCalculated("Checkbox_29", this.actor.SOMETHING);
        this.setCalculated("Checkbox_30", this.actor.SOMETHING);
        this.setCalculated("Checkbox_31", this.actor.SOMETHING);
        this.setCalculated("Checkbox_32", this.actor.SOMETHING);
        this.setCalculated("Checkbox_33", this.actor.SOMETHING);
        this.setCalculated("Checkbox_34", this.actor.SOMETHING);
        this.setCalculated("Checkbox_35", this.actor.SOMETHING);
        this.setCalculated("Checkbox_36", this.actor.SOMETHING);
        this.setCalculated("Checkbox_37", this.actor.SOMETHING);
        this.setCalculated("Checkbox_38", this.actor.SOMETHING);
        this.setCalculated("Checkbox_39", this.actor.SOMETHING);
        this.setCalculated("Checkbox_40", this.actor.SOMETHING);
        this.setCalculated("Checkbox_41", this.actor.SOMETHING);
        this.setCalculated("Checkbox_42", this.actor.SOMETHING);
        this.setCalculated("Checkbox_43", this.actor.SOMETHING);
        this.setCalculated("Text_1", this.actor.system.attributes.str.value);
        this.setCalculated("Text_2", this.actor.system.attributes.con.value);
        this.setCalculated("Text_3", this.actor.system.attributes.agl.value);
        this.setCalculated("Text_4", this.actor.system.attributes.int.value);
        this.setCalculated("Text_5", this.actor.system.attributes.wil.value);
        this.setCalculated("Text_6", this.actor.system.attributes.cha.value);
        this.setCalculated("Text_7", this.actor.SOMETHING);
        this.setCalculated("Text_8", this.actor.SOMETHING);
        this.setCalculated("Text_9", this.actor.SOMETHING);
        this.setCalculated("Text_10", this.actor.SOMETHING);
        this.setCalculated("Text_11", this.actor.SOMETHING);
        this.setCalculated("Text_12", this.actor.SOMETHING);
        this.setCalculated("Text_13", this.actor.SOMETHING);
        this.setCalculated("Text_14", this.actor.SOMETHING);
        this.setCalculated("Text_15", this.actor.SOMETHING);
        this.setCalculated("Text_16", this.actor.SOMETHING);
        this.setCalculated("Text_17", this.actor.SOMETHING);
        this.setCalculated("Text_18", this.actor.SOMETHING);
        this.setCalculated("Text_19", this.actor.SOMETHING);
        this.setCalculated("Text_20", this.actor.SOMETHING);
        this.setCalculated("Text_21", this.actor.SOMETHING);
        this.setCalculated("Text_22", this.actor.SOMETHING);
        this.setCalculated("Text_23", this.actor.SOMETHING);
        this.setCalculated("Text_24", this.actor.SOMETHING);
        this.setCalculated("Text_25", this.actor.SOMETHING);
        this.setCalculated("Text_26", this.actor.SOMETHING);
        this.setCalculated("Text_27", this.actor.SOMETHING);
        this.setCalculated("Text_28", this.actor.SOMETHING);
        this.setCalculated("Text_29", this.actor.SOMETHING);
        this.setCalculated("Text_30", this.actor.SOMETHING);
        this.setCalculated("Text_31", this.actor.SOMETHING);
        this.setCalculated("Text_32", this.actor.SOMETHING);
        this.setCalculated("Text_33", this.actor.SOMETHING);
        this.setCalculated("Text_34", this.actor.SOMETHING);
        this.setCalculated("Text_35", this.actor.SOMETHING);
        this.setCalculated("Text_36", this.actor.SOMETHING);
        this.setCalculated("Text_37", this.actor.SOMETHING);
        this.setCalculated("Text_38", this.actor.SOMETHING);
        this.setCalculated("Text_39", this.actor.SOMETHING);
        this.setCalculated("Text_40", this.actor.SOMETHING);
        this.setCalculated("Text_41", this.actor.SOMETHING);
        this.setCalculated("Text_42", this.actor.SOMETHING);
        this.setCalculated("Text_43", this.actor.SOMETHING);
        this.setCalculated("Text_44", this.actor.SOMETHING);
        this.setCalculated("Text_45", this.actor.SOMETHING);
        this.setCalculated("Text_46", this.actor.SOMETHING);
        this.setCalculated("Text_47", this.actor.SOMETHING);
        this.setCalculated("Text_48", this.actor.SOMETHING);
        this.setCalculated("Text_49", this.actor.SOMETHING);
        this.setCalculated("Text_50", this.actor.SOMETHING);
        this.setCalculated("Text_51", this.actor.SOMETHING);
        this.setCalculated("Text_52", this.actor.SOMETHING);
        this.setCalculated("Text_53", this.actor.SOMETHING);
        this.setCalculated("Text_54", this.actor.SOMETHING);
        this.setCalculated("Text_55", this.actor.SOMETHING);
        this.setCalculated("Text_56", this.actor.SOMETHING);
        this.setCalculated("Text_57", this.actor.SOMETHING);
        this.setCalculated("Text_58", this.actor.SOMETHING);
        this.setCalculated("Text_59", this.actor.SOMETHING);
        this.setCalculated("Text_60", this.actor.SOMETHING);
        this.setCalculated("Text_61", this.actor.SOMETHING);
        this.setCalculated("Text_62", this.actor.SOMETHING);
        this.setCalculated("Text_63", this.actor.SOMETHING);
        this.setCalculated("Text_64", this.actor.SOMETHING);
        this.setCalculated("Text_65", this.actor.SOMETHING);
        this.setCalculated("Text_66", this.actor.SOMETHING);
        this.setCalculated("Text_67", this.actor.SOMETHING);
        this.setCalculated("Text_68", this.actor.SOMETHING);
        this.setCalculated("Text_69", this.actor.SOMETHING);
        this.setCalculated("Text_70", this.actor.SOMETHING);
        this.setCalculated("Text_71", this.actor.SOMETHING);
        this.setCalculated("Text_72", this.actor.SOMETHING);
        this.setCalculated("Text_73", this.actor.SOMETHING);
        this.setCalculated("Text_74", this.actor.SOMETHING);
        this.setCalculated("Text_75", this.actor.SOMETHING);
        this.setCalculated("Text_76", this.actor.SOMETHING);
        this.setCalculated("Text_77", this.actor.SOMETHING);
        this.setCalculated("Text_78", this.actor.SOMETHING);
        this.setCalculated("Text_79", this.actor.SOMETHING);
        this.setCalculated("Text_80", this.actor.SOMETHING);
        this.setCalculated("Text_81", this.actor.SOMETHING);
        this.setCalculated("Text_82", this.actor.SOMETHING);
        this.setCalculated("Text_83", this.actor.SOMETHING);
        this.setCalculated("Text_84", this.actor.SOMETHING);
        this.setCalculated("Text_85", this.actor.SOMETHING);
        this.setCalculated("Text_86", this.actor.SOMETHING);
        this.setCalculated("Text_87", this.actor.SOMETHING);
        this.setCalculated("Text_88", this.actor.SOMETHING);
        this.setCalculated("Text_89", this.actor.SOMETHING);
        this.setCalculated("Text_90", this.actor.SOMETHING);
        this.setCalculated("Text_91", this.actor.SOMETHING);
        this.setCalculated("Text_92", this.actor.SOMETHING);
        this.setCalculated("Text_93", this.actor.SOMETHING);
        this.setCalculated("Text_94", this.actor.SOMETHING);
        this.setCalculated("Text_95", this.actor.SOMETHING);
        this.setCalculated("Text_96", this.actor.SOMETHING);
        this.setCalculated("Text_97", this.actor.SOMETHING);
        this.setCalculated("Text_98", this.actor.SOMETHING);
        this.setCalculated("Text_99", this.actor.SOMETHING);
        this.setCalculated("Text_100", this.actor.SOMETHING);
        this.setCalculated("Text_101", this.actor.SOMETHING);
        this.setCalculated("Text_102", this.actor.SOMETHING);
        this.setCalculated("Text_103", this.actor.SOMETHING);
        this.setCalculated("Text_104", this.actor.SOMETHING);
        this.setCalculated("Text_105", this.actor.SOMETHING);
        this.setCalculated("Text_106", this.actor.SOMETHING);
        this.setCalculated("Text_107", this.actor.SOMETHING);
        this.setCalculated("Text_108", this.actor.SOMETHING);
        this.setCalculated("Text_109", this.actor.SOMETHING);
        this.setCalculated("Text_110", this.actor.SOMETHING);
        this.setCalculated("Text_111", this.actor.SOMETHING);
        this.setCalculated("Text_112", this.actor.SOMETHING);
        this.setCalculated("Text_113", this.actor.SOMETHING);
        this.setCalculated("Text_114", this.actor.SOMETHING);
        this.setCalculated("Text_115", this.actor.SOMETHING);
        this.setCalculated("Text_116", this.actor.SOMETHING);
        this.setCalculated("Text_117", this.actor.SOMETHING);
        this.setCalculated("Text_118", this.actor.SOMETHING);
        this.setCalculated("Text_119", this.actor.SOMETHING);
        this.setCalculated("Checkbox_44", this.actor.SOMETHING);
        this.setCalculated("Checkbox_45", this.actor.SOMETHING);
        this.setCalculated("Checkbox_46", this.actor.SOMETHING);
        this.setCalculated("Checkbox_47", this.actor.SOMETHING);
        this.setCalculated("Checkbox_48", this.actor.SOMETHING);
        this.setCalculated("Checkbox_49", this.actor.SOMETHING);
        this.setCalculated("Checkbox_50", this.actor.SOMETHING);
        this.setCalculated("Checkbox_51", this.actor.SOMETHING);
        this.setCalculated("Checkbox_53", this.actor.SOMETHING);
        this.setCalculated("Checkbox_54", this.actor.SOMETHING);
        this.setCalculated("Checkbox_55", this.actor.SOMETHING);
        this.setCalculated("Checkbox_56", this.actor.SOMETHING);
        this.setCalculated("Checkbox_57", this.actor.SOMETHING);
        this.setCalculated("Checkbox_58", this.actor.SOMETHING);
        this.setCalculated("Checkbox_59", this.actor.SOMETHING);
        this.setCalculated("Checkbox_60", this.actor.SOMETHING);
        this.setCalculated("Checkbox_61", this.actor.SOMETHING);
        this.setCalculated("Checkbox_62", this.actor.SOMETHING);
        this.setCalculated("Checkbox_63", this.actor.SOMETHING);
        this.setCalculated("Checkbox_64", this.actor.SOMETHING);
        this.setCalculated("Checkbox_65", this.actor.SOMETHING);
        this.setCalculated("Checkbox_66", this.actor.SOMETHING);
        this.setCalculated("Checkbox_67", this.actor.SOMETHING);
        this.setCalculated("Checkbox_68", this.actor.SOMETHING);
        this.setCalculated("Checkbox_69", this.actor.SOMETHING);
        this.setCalculated("Checkbox_70", this.actor.SOMETHING);
        this.setCalculated("Checkbox_71", this.actor.SOMETHING);
        this.setCalculated("Checkbox_72", this.actor.SOMETHING);
        this.setCalculated("Checkbox_73", this.actor.SOMETHING);
        this.setCalculated("Checkbox_74", this.actor.SOMETHING);
        this.setCalculated("Checkbox_75", this.actor.SOMETHING);
        this.setCalculated("Checkbox_76", this.actor.SOMETHING);
        this.setCalculated("Checkbox_77", this.actor.SOMETHING);
        this.setCalculated("Checkbox_78", this.actor.SOMETHING);
        this.setCalculated("Checkbox_79", this.actor.SOMETHING);
        this.setCalculated("Checkbox_80", this.actor.SOMETHING);
        this.setCalculated("Checkbox_81", this.actor.SOMETHING);
        this.setCalculated("Checkbox_82", this.actor.SOMETHING);
        this.setCalculated("Checkbox_83", this.actor.SOMETHING);
        this.setCalculated("Checkbox_84", this.actor.SOMETHING);
        this.setCalculated("Checkbox_85", this.actor.SOMETHING);
        this.setCalculated("Checkbox_86", this.actor.SOMETHING);
        this.setCalculated("Checkbox_87", this.actor.SOMETHING);
        this.setCalculated("Checkbox_88", this.actor.SOMETHING);
        this.setCalculated("Checkbox_89", this.actor.SOMETHING);
        this.setCalculated("Checkbox_90", this.actor.SOMETHING);
        this.setCalculated("Checkbox_91", this.actor.SOMETHING);
        this.setCalculated("Checkbox_92", this.actor.SOMETHING);
        this.setCalculated("Checkbox_93", this.actor.SOMETHING);
        this.setCalculated("Checkbox_94", this.actor.SOMETHING);
        this.setCalculated("Checkbox_95", this.actor.SOMETHING);
        this.setCalculated("Checkbox_96", this.actor.SOMETHING);
        this.setCalculated("Checkbox_97", this.actor.SOMETHING);
        this.setCalculated("Text_120", this.actor.SOMETHING);


    }
}
export default MappingClass;

