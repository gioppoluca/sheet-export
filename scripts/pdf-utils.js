/**
 * Draws single-line centered text in a rectangle.
 */
export function drawCenteredText(page, text, { x, y, width, height, font, size = 12, color }) {
  const textWidth = font.widthOfTextAtSize(text, size);
  const textHeight = font.heightAtSize(size);

  const textX = x + (width - textWidth) / 2;
  const textY = y + (height - textHeight) / 2;

  page.drawText(text, {
    x: textX,
    y: textY,
    size,
    font,
    color,
  });
}

/**
 * Draws wrapped and horizontally centered text inside a rectangle,
 * and vertically centers the block of text.
 */
export function drawCenteredParagraph(page, text, { x, y, width, height, font, size = 12, lineHeight = 1.2, color }) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  for (let word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const testWidth = font.widthOfTextAtSize(testLine, size);
    if (testWidth > width) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) lines.push(currentLine);

  const actualLineHeight = size * lineHeight;
  const totalHeight = lines.length * actualLineHeight;
  let cursorY = y + (height - totalHeight) / 2 + (actualLineHeight * (lines.length - 1));

  for (let line of lines) {
    const lineWidth = font.widthOfTextAtSize(line, size);
    const lineX = x + (width - lineWidth) / 2;
    page.drawText(line, {
      x: lineX,
      y: cursorY,
      size,
      font,
      color,
    });
    cursorY -= actualLineHeight;
  }
}

/**
 * Draws left-aligned, wrapped text block vertically centered in a rectangle.
 */
export function drawLeftAlignedParagraph(page, text, { x, y, width, height, font, size = 12, lineHeight = 1.2, color }) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  for (let word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const testWidth = font.widthOfTextAtSize(testLine, size);
    if (testWidth > width) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) lines.push(currentLine);

  const actualLineHeight = size * lineHeight;
  const totalHeight = lines.length * actualLineHeight;
  let cursorY = y + (height - totalHeight) / 2 + (actualLineHeight * (lines.length - 1));

  for (let line of lines) {
    page.drawText(line, {
      x,
      y: cursorY,
      size,
      font,
      color,
    });
    cursorY -= actualLineHeight;
  }
}
