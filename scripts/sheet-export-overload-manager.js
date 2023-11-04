

export class SheetExportOverloadManager {
    constructor(originalGlobalContent, fset) {
        this.originalGlobalContent = originalGlobalContent;
        this.reminderContent = originalGlobalContent;
        this.fset = fset;
        this.fontSize = 10;
    }
    getContentChunk(id) {
        let width = 100;
        let height = 100;
        let chunk = this.wrapText(this.reminderContent[id], width, this.font, this.fontSize);
        return chunk;
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