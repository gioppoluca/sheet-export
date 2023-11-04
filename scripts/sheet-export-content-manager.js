

export class SheetExportContentManager {
    constructor(originalGlobalContent, fset) {
        this.originalGlobalContent = originalGlobalContent;
        this.reminderContent = originalGlobalContent;
        this.fset = fset;
        this.fontSize = 10;
    }
    getContentChunk(id) {
        let width = 100;
        let height = 100;
        const widgets = this.field.acroField.getWidgets();
        widgets.forEach((w) => {
            const rect = w.getRectangle();
            console.log(rect);
        });
        let chunk = this.wrapText(this.reminderContent[id], widgets[0].getRectangle().width, this.font, this.fontSize);
        return chunk;
        // the algo should be: cycle on a single word of increasing widest letter to find the max chars per line and than the height of the font at that size
        // this way we can take a chunk of chars*max_lines, than cut the content and return it
        // evenif th problem is with the \n that will mess all
        // than probably getting the text char by char
    }

    setCurrentField(field) {
        this.field = field;
    }
    setCurrentFont(font) {
        this.font = font;
    }
    setCurrentFontsize(fontSize) {
        this.fontSize = fontSize;
    }

    wrapText = (text, width, font, fontSize) => {
        const words = text.split(' ');
        let line = '';
        let result = '';
        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const testWidth = font.widthOfTextAtSize(testLine, fontSize);
            if (testWidth > width) {
                result += line + '\n';
                line = words[n] + ' ';
            } else {
                line = testLine;
            }
        }
        result += line;
        return result;
    }
}