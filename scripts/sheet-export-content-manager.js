

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
        let chunk = this.wrapText(this.reminderContent[id], widgets[0].getRectangle().width, widgets[0].getRectangle().height, this.font, this.fontSize);
        let nCharUsed = chunk.length;
        this.reminderContent[id] = this.reminderContent[id].slice(nCharUsed);
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

    wrapText = (text, width, height, font, fontSize) => {
        console.log(font.name);
        //    let charWw = font.widthOfTextAtSize("W", fontSize);
        let charWh = font.heightAtSize(fontSize);
        //     let charXrow = Math.floor(width / charWw);
        let maxRows = Math.floor(height / charWh);
        //     let maxChars = charXrow * maxRows;
        console.log("charWh: %d,  maxRows: %d, ", charWh, maxRows);
        //    let initialChunk = text.substr(0, maxChars);
        // now we have the chunk, but we need to check how many new line we have to remove lines
        //     let newLines = initialChunk.split('\n').length - 1;
        //    maxRows -= newLines;
        //    maxChars = charXrow * maxRows;
        //    console.log("newLines: %d, maxRows: %d, maxChars: %d", newLines, maxRows, maxChars);
        ///     let chunk = text.substr(0, maxChars);
        //return chunk;

        const words = text.split(' ');
        let line = '';
        let result = [];
        let nrows = 0;
        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const testWidth = font.widthOfTextAtSize(testLine, fontSize);
            if (testWidth > (width * 0.91)) {
                result.push(line);
                console.log(line);
                let newLines = line.split('\n').length - 1;
                console.log(newLines);
                line = words[n] + ' ';
                nrows = nrows + 1 + newLines;
                console.log(nrows);
            } else {
                line = testLine;
            }
            if (nrows >= maxRows) { break; }
        }
        console.log(result);
        let chunk = result.join("");
        console.log(chunk);
        return chunk;

    }
}