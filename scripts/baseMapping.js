import { detectImageType } from './lib/image-type-detector.js';
import { rgb } from './lib/pdf-lib.esm.js';
import { drawCenteredParagraph, drawLeftAlignedParagraph, drawCenteredText, drawTopLeftAlignedParagraph } from './pdf-utils.js'

class baseMapping {

    constructor(actor, sheetType, sheet) {
        console.group("baseMapping.constructor");
        this.sheetType = sheetType;
        this.actor = actor;
        this.sheet = sheet;
        console.debug("sheetType:", this.sheetType);
        console.debug("actor:", this.actor);
        console.groupEnd()
        /*
        schema for fieldMappings:
          pdf: string, pdf fieldname
          content: string, what to use to eval
          calculated: string, the result of eval(content)
          font: string, the name of the font
          font_size: int, the size of the associated font
        */
        this.fieldMappings = [];

        /*
        schema for imageMappings:
          path: string, path to image
          page: int, page number
          pos_x: int, x position
          pos_y: int, y position
          width: int, width of image
          height: int, height of image
        */
        this.imageMappings = [];
        this.pdfFiles = [];
        this.globalValues = [];
        this.logPrefix = "Export Sheet";
        this.systemName = "test";
        // embeddedImages: Map<string, { image: PDFEmbeddedImage, width: number, height: number }>
        this.embeddedImages = new Map();
        this.embeddedFonts = new Map(); // key: fontName, value: { font, path }

        // this.createMappings();
    }

    log(severity, message, options) {
        /* A wrapper around the foundry vtt logger or `console`, whichever is present */
        if (typeof (ui) !== "undefined") {
            switch (severity) {
                case 'error':
                    ui.notifications.error(`${this.logPrefix} | ${this.systemName} | ${message}`, options);
                    break;
                case 'warn':
                case 'warning':
                    ui.notifications.warn(`${this.logPrefix} | ${this.systemName} | ${message}`, options);
                    break;
                case 'debug':
                    console.debug(`${this.logPrefix} | ${this.systemName} | ${message}`);
                    break;
                default:
                    ui.notifications.info(`${this.logPrefix} | ${this.systemName} | ${message}`, options);
            }
        } else {
            switch (severity) {
                case 'error':
                    console.error(`${this.logPrefix} | ${this.systemName} | ${message}`);
                    break;
                case 'warn':
                case 'warning':
                    console.warn(`${this.logPrefix} | ${this.systemName} | ${message}`);
                    break;
                case 'debug':
                    console.debug(`${this.logPrefix} | ${this.systemName} | ${message}`);
                    break;
                default:
                    console.info(`${this.logPrefix} | ${this.systemName} | ${message}`);
            }
        }
    }

    logDebug(message, options) {
        this.log("debug", message, options);
    }

    logError(message, options) {
        this.log("error", message, options);
    }

    logInfo(message, options) {
        this.log("info", message, options);
    }

    logWarning(message, options) {
        this.log("warning", message, options);
    }

    updateMapping(fieldName, data, pdfId) {
        fieldName = fieldName.trim();
        if (this.fieldMappings[pdfId] === undefined) {
            this.fieldMappings[pdfId] = [];
        }
        let el = this.fieldMappings[pdfId].filter(i => i.pdf === fieldName);
        if (el.length === 0) {
            el = Object.assign({ "pdf": fieldName }, data);
        } else if (el.length > 1) {
            this.logError("More than one element was found with pdf field name ${fieldName}! What is going on?");
        } else {
            el = Object.assign(el[0], data);
        }
        this.fieldMappings[pdfId] = this.fieldMappings[pdfId].filter(i => i.pdf !== fieldName);
        this.fieldMappings[pdfId].push(el);
    }

    /* duplicate method name
    getMapping(fieldName) {
        // pdf field getter
        if (this.fieldMappings.map(i => i.pdf).includes(fieldName)) {
            return this.fieldMappings[fieldName];
        } else {
            this.logWarning(`${fieldName} does not exist`);
            return {};
        }
    }
    */

    setCalculated(fieldName, value, pdfId = 0) {
        fieldName = fieldName.trim();
        this.updateMapping(fieldName, { "calculated": value }, pdfId);
    }

    setFont(fieldName, fontName = undefined, fontSize = undefined) {
        fieldName = fieldName.trim();
        let font = {};
        if (fontName !== undefined) {
            font.font = String(fontName).trim();
        }
        if (!isNaN(parseInt(fontSize))) {
            font.font_size = parseInt(fontSize);
        }
        if (Object.keys(font).length > 0) {
            this.updateMapping(fieldName, font);
            return true;
        }
        return false;
    }

    setImage(path, page, pos_x, pos_y, width, height, pdfId = 0) {
        this.logDebug("setImage");
        if (this.imageMappings[pdfId] === undefined) {
            this.imageMappings[pdfId] = [];
        }
        this.imageMappings[pdfId].push({ "path": path, "page": page, "pos_x": pos_x, "pos_y": pos_y, "width": width, "height": height });

    }
    async createMappings() {
        this.fieldMappings = [];
    }

    getFields(pdfId) {
        return this.fieldMappings[pdfId];
    }

    getImages(pdfId) {
        return this.imageMappings[pdfId];
    }

    localizedItemName(theItem) {
        return theItem ? game.i18n.localize(theItem?.name) : '';
    }

    htmlToText(html) {
        return !html ? '' : html.replaceAll("\n", "")
            .replaceAll(/<h1[>\s]([^<]*)<\/h1>/gms, "# $1\n")
            .replaceAll(/<h2[>\s]([^<]*)<\/h2>/gms, "## $1\n")
            .replaceAll(/<h3[>\s]([^<]*)<\/h3>/gms, "### $1\n")
            .replaceAll(/<p[^>]*>/gms, "")
            .replaceAll(/<\/p>/gms, "\n")
            .replaceAll(/<li[^>]*>/gms, "• ")
            .replaceAll(/<\/li>/gms, "\n")
            .replaceAll(/<[^>]*>/gms, "")
            .replaceAll(/\u00a0/g, "")
            .replace(/@UUID\[.*?\]\{([^}]+)\}/g, '$1');
    }

    getValueByDottedKeys(obj, strKey) {
        let keys = strKey.split(".")
        let value = obj[keys[0]];
        for (let i = 1; i < keys.length; i++) {
            value = value[keys[i]]
        }
        return value
    }

    setGlobalValue(key, value) {
        this.globalValues[key] = value;
    }

    getGlobalValue(key, char_start = 0, char_end = 0) {
        return this.globalValues[key].substring(char_start, char_end);
    }

    /**
     * Generate the layout configuration for placing cards on a PDF page.
     * Parameters can be overridden to customize layout behavior.
     *
     * @param {Object} options - Optional overrides for layout parts.
     * @param {Object} options.page - Override default page settings.
     * @param {Object} options.card - Override default card size.
     * @param {number} options.rows - Number of rows per page.
     * @param {number} options.columns - Number of columns per page.
     * @param {Object} options.images - { imageKey: { path, width, height } }
     * @param {Object} options.fonts - Map of key -> { name, path, width, height }
     * @returns {Object} layoutConfig - Merged layout configuration.
     */
    getCardLayoutConfig(options = {}) {
        const defaultConfig = {
            page: {
                width: 595.28,
                height: 841.89,
                margin: 40,
                backgroundImage: null // URL or path to image
            },
            card: {
                width: 260,
                height: 200
            },
            rows: 2,
            columns: 2,
            fonts: {
                // fontName: pathToFont
                Default: "/modules/sheet-export/mappings/dnd5e/Roboto-Regular.ttf"
            },
            images: {
                // Map of key -> { path, width, height }
                // Example: "evocationIcon": { path: "modules/xyz/icons/evocation.png", width: 32, height: 32 }
            }
        };

        return {
            page: { ...defaultConfig.page, ...(options.page || {}) },
            card: { ...defaultConfig.card, ...(options.card || {}) },
            rows: options.rows ?? defaultConfig.rows,
            columns: options.columns ?? defaultConfig.columns,
            fonts: { ...defaultConfig.fonts, ...(options.fonts || {}) },
            images: { ...defaultConfig.images, ...(options.images || {}) }
        };

    }

    /**
     * Returns a card template structure used to render a single card on the PDF.
     * Describes what fields to render, their positions, formatting, and types.
     * All font and image keys must match those defined in layoutConfig.
     *
     * @param {Object} options - Optional override for fields or checkboxes.
     * @returns {Object} cardTemplate
     * fields {
                    key: "title",               // key from card data
                    type: "text",
                    fontName: "Default",        // must match layoutConfig.fonts
                    size: 14,
                    color: "#111111",
                    x: 10,
                    y: 180
                },
     * checkboxes {
                    key: "verbal",
                    x: 10,
                    y: 20
                },
     */
    getCardTemplate(options = {}) {
        const defaultTemplate = {
            fields: [
            ],
            checkboxes: [
            ],
            images: [
            ]
        };

        return {
            fields: options.fields || defaultTemplate.fields,
            checkboxes: options.checkboxes || defaultTemplate.checkboxes,
            images: options.images || defaultTemplate.images
        };
    }


    /**
     * Returns an array of data objects used to render cards.
     * Each object maps keys from the cardTemplate to values extracted from the actor.
     * Subclasses must override this method to generate system-specific data.
     *
     * @returns {Array<Object>} An array of card data entries
     */
    getCardDataArray() {
        this.logDebug("getCardDataArray: base method returns an empty array.");
        return [];
    }

    /**
     * Embed all images defined in layoutConfig.images.
     * Stores in `this.embeddedImages` as a map of key → { image, width, height }
     *
     * @param {PDFDocument} pdf - The PDFDocument instance
     * @param {Object} imageDefs - { imageKey: { path, width, height } }
     */
    async embedImages(pdf, imageDefs) {
        if (!this.embeddedImages) this.embeddedImages = new Map();

        for (const [name, def] of Object.entries(imageDefs)) {
            if (!def?.path) {
                this.logWarning(`Image "${name}" has no path.`);
                continue;
            }
//            this.logWarning(`Image path "${def?.path}"`);

            const imgPath = foundry.utils.getRoute(def.path);
//            this.logWarning(`Image imgPath "${imgPath}"`);
            let buffer, type;

            try {
                buffer = await fetch(imgPath).then(res => res.arrayBuffer());
                type = await detectImageType(imgPath);
            } catch (err) {
                this.logError(`Failed to fetch/detect "${name}": ${err}`);
                continue;
            }

            let embedded = null;

            try {
                switch (type) {
                    case "png":
                        embedded = await pdf.embedPng(buffer);
                        break;
                    case "jpg":
                    case "jpeg":
                        embedded = await pdf.embedJpg(buffer);
                        break;
                    case "webp":
                        const offscreen = new OffscreenCanvas(1, 1);
                        const ctx = offscreen.getContext("2d");
                        const img = new Image();
                        img.src = URL.createObjectURL(new Blob([buffer], { type: "image/webp" }));
                        await img.decode();
                        offscreen.width = img.width;
                        offscreen.height = img.height;
                        ctx.drawImage(img, 0, 0);
                        const blob = await offscreen.convertToBlob({ type: "image/png" });
                        const pngBuffer = await new Response(blob).arrayBuffer();
                        embedded = await pdf.embedPng(pngBuffer);
                        break;
                    default:
                        this.logError(`Unsupported type "${type}" for image "${name}"`);
                }

                if (embedded) {
                    this.embeddedImages.set(name, {
                        image: embedded,
                        width: def.width,
                        height: def.height
                    });
                    this.logDebug(`Embedded image "${name}"`);
                }

            } catch (embedErr) {
                this.logError(`Embedding failed for "${name}": ${embedErr}`);
            }
        }
        console.log("end of embedImages with:")
        console.log(this.embeddedImages)
    }

    /**
     * Embed all fonts defined in layoutConfig.fonts.
     * Stores in this.embeddedFonts as a map of fontName → { font, path }
     *
     * @param {PDFDocument} pdf - The PDFDocument instance
     * @param {Object} fontDefs - { fontName: pathToFont }
     */
    async embedFonts(pdf, fontDefs) {
        if (!this.embeddedFonts) this.embeddedFonts = new Map();

        for (const [fontName, pathToFont] of Object.entries(fontDefs)) {
            if (!pathToFont) {
                this.logWarning(`Font "${fontName}" has no path.`);
                continue;
            }

            if (this.embeddedFonts.has(fontName)) {
                this.logDebug(`Font "${fontName}" already embedded, skipping.`);
                continue;
            }

            try {
                const fontUrl = foundry.utils.getRoute(pathToFont);
                const fontBuffer = await fetch(fontUrl).then(res => res.arrayBuffer());
                const embeddedFont = await pdf.embedFont(fontBuffer);
                this.embeddedFonts.set(fontName, { font: embeddedFont, path: pathToFont });
                this.logDebug(`Embedded font "${fontName}" from "${pathToFont}"`);
            } catch (err) {
                this.logError(`Failed to embed font "${fontName}": ${err}`);
            }
        }
    }

    /**
     * Main orchestrator to add card pages to the PDF.
     * Gathers layout, template, and data; embeds fonts/images; and delegates rendering.
     *
     * @param {PDFDocument} pdfDoc - The target PDFDocument
     * @returns {Promise<void>}
     */
    async addCardPages(pdfDoc) {
        const sections = this.getCardSections?.();
        if (Array.isArray(sections) && sections.length) {
            for (const section of sections) {
                const { layoutConfig, cardTemplate, cardDataArray } = section;
                if (!cardDataArray?.length) continue;

                // Embed resources
                await this.embedFonts(pdfDoc, layoutConfig.fonts);
                await this.embedImages(pdfDoc, layoutConfig.images);
                // Call rendering
                await this.drawCards(pdfDoc, layoutConfig, cardTemplate, cardDataArray);
            }
        } else {
            // fallback for legacy single-section case
            const layoutConfig = this.getCardLayoutConfig();
            const cardTemplate = this.getCardTemplate();
            const cardDataArray = this.getCardDataArray();

            if (!cardDataArray?.length) return;

            // Embed resources
            await this.embedFonts(pdfDoc, layoutConfig.fonts);
            await this.embedImages(pdfDoc, layoutConfig.images);
            // Call rendering
            await this.drawCards(pdfDoc, layoutConfig, cardTemplate, cardDataArray);
        }
    }


    /**
     * Draws all cards into the PDF, handling pagination, row/col layout, and positioning.
     * Delegates the rendering of individual cards to drawSingleCard().
     *
     * @param {PDFDocument} pdfDoc
     * @param {Object} layoutConfig
     * @param {Object} cardTemplate
     * @param {Array<Object>} cardDataArray
     */
    async drawCards(pdfDoc, layoutConfig, cardTemplate, cardDataArray) {
        const { page, card, rows, columns } = layoutConfig;
        const cardsPerPage = rows * columns;

        let currentPage = null;
        let currentPageIndex = -1;
        // if there is a background image we add it only once
        if (layoutConfig.page.backgroundImage) {
            await this.embedImages(pdfDoc, layoutConfig.page.backgroundImage);
        }
        for (let i = 0; i < cardDataArray.length; i++) {
            const cardIndexOnPage = i % cardsPerPage;
            const isNewPage = cardIndexOnPage === 0;

            if (isNewPage) {
                currentPage = pdfDoc.addPage([page.width, page.height]);
                currentPageIndex++;

                // Optional: draw background image
                if (layoutConfig.page.backgroundImage) {
                    const bgName = Object.entries(layoutConfig.page.backgroundImage)[0];
                    console.log(bgName)
                    console.log(bgName[0])
                    const bg = this.embeddedImages.get(bgName[0]);
                    if (bg?.image) {
                        currentPage.drawImage(bg.image, {
                            x: 0,
                            y: 0,
                            width: page.width,
                            height: page.height
                        });
                    }
                }
            }

            const col = cardIndexOnPage % columns;
            const row = Math.floor(cardIndexOnPage / columns);

            const originX = page.margin + col * card.width;
            const originY = page.height - page.margin - (row + 1) * card.height;
            console.log(`originX: ${originX}`)
            console.log(`originY: ${originY}`)

            const cardData = cardDataArray[i];

            // Draw card using helper
            this.drawSingleCard(currentPage, cardData, cardTemplate, originX, originY);
        }
    }

    /**
     * Draws a single card's content onto a page using the card template and actor-bound data.
     *
     * @param {PDFPage} page - The page to draw on
     * @param {Object} cardData - The data object with keys used in the template
     * @param {Object} cardTemplate - The drawing template (fields and checkboxes)
     * @param {number} originX - X offset of the top-left corner of the card
     * @param {number} originY - Y offset of the top-left corner of the card
     */
    drawSingleCard(page, cardData, cardTemplate, originX, originY) {
        const { fields, checkboxes } = cardTemplate;

        for (const field of fields) {
            const {
                key,
                type = "text",
                fontName = "Default",
                size = 12,
                color = "#000000",
                x,
                y,
                width,
                height,
                wrap = false,
                center = false
            } = field;

            const fontEntry = this.embeddedFonts.get(fontName);
            if (!fontEntry?.font) {
                this.logWarning(`Font "${fontName}" not found for field "${key}"`);
                continue;
            }

            const value = cardData[key];
            if (value == null) continue;

            const drawArea = {
                x: originX + x,
                y: originY + y,
//                y: originY - y - (height ?? 20),
                width: width ?? 100,
                height: height ?? 20,
                font: fontEntry.font,
                size,
                color: this._parseRGBColor(color)
            };

            console.log(`drawArea.y: ${drawArea.y}`)


            if (type === "imageRef") {
                console.log("we have ImageRef")
                const imageEntry = this.embeddedImages.get(value);
                console.log(this.embeddedImages)
                console.log(imageEntry)
                console.log(value)
                console.log(drawArea)
                if (!imageEntry?.image) {
                    this.logWarning(`Image "${value}" not found for field "${key}"`);
                    continue;
                }

                page.drawImage(imageEntry.image, {
                    x: drawArea.x,
                    y: drawArea.y,
                    width: imageEntry.width,
                    height: imageEntry.height
                });
            }

            else if (type === "text") {
                if (wrap && center) {
                    drawCenteredParagraph(page, String(value), drawArea);
                } else if (wrap) {
                    drawTopLeftAlignedParagraph(page, String(value), drawArea);
                } else if (center) {
                    drawCenteredText(page, String(value), drawArea);
                } else {
                    page.drawText(String(value), {
                        x: drawArea.x,
                        y: drawArea.y,
                        width: drawArea.width,
                        height: drawArea.height,
                        size,
                        font: drawArea.font,
                        color: drawArea.color
                    });
                }
            }
        }

        for (const box of checkboxes ?? []) {
            const { key, label, x, y } = box;
            console.log(box)
            console.log(cardData)
            const checked = Boolean(cardData[key]);

            // Checkbox rectangle
            page.drawRectangle({
                x: originX + x,
                y: originY + y,
                width: 10,
                height: 10,
                borderColor: this._parseRGBColor("#000000"),
                borderWidth: 1,
                color: this._parseRGBColor("#FFFFFF")
            });

            if (checked) {
                page.drawLine({
                    start: { x: originX + x + 2, y: originY + y + 2 },
                    end: { x: originX + x + 8, y: originY + y + 8 },
                    thickness: 1,
                    color: this._parseRGBColor("#000000")
                });
                page.drawLine({
                    start: { x: originX + x + 8, y: originY + y + 2 },
                    end: { x: originX + x + 2, y: originY + y + 8 },
                    thickness: 1,
                    color: this._parseRGBColor("#000000")
                });
            }

            // Label
            page.drawText(label ?? "", {
                x: originX + x + 14,
                y: originY + y + 1,
                size: 9,
                font: this.embeddedFonts.get("Default")?.font,
                color: this._parseRGBColor("#000000")
            });
        }
    }

    /**
     * Converts a hex color string to rgb().
     * @param {string} hex - Color in "#rrggbb" format
     * @returns {rgb}
     */
    _parseRGBColor(hex) {
        const r = parseInt(hex.substring(1, 3), 16) / 255;
        const g = parseInt(hex.substring(3, 5), 16) / 255;
        const b = parseInt(hex.substring(5, 7), 16) / 255;
        return rgb(r, g, b);
    }

    /**
     * Defines multiple card layout sections to be rendered sequentially in a single PDF.
     * Each section includes its own layout, template, and data.
     *
     * @returns {Array<Object>} sections - each with { layoutConfig, cardTemplate, cardDataArray }
     */
    getCardSections() {
        return []; // override in subclass
    }


}

export default baseMapping;