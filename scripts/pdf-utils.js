/**
 * Draws single-line centered text in a rectangle.
 */
export function drawCenteredText(page, text, { x, y, width, height, font, size = 12, color }) {
  const textWidth = font.widthOfTextAtSize(text, size);
  const textHeight = font.heightAtSize(size);
  console.log("drawCenteredText")
  console.log(`y: ${y}`)

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
export function drawLeftAlignedParagraph_Old(page, text, { x, y, width, height, font, size = 12, lineHeight = 1.2, color }) {
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


export function drawLeftAlignedParagraph(page, text, {
  x, y, width, height, font, size = 12, lineHeight = 1.2, color
}) {
  const rawLines = text.split(/\r?\n/); // support \n and \r\n
  const wrappedLines = [];

  for (const rawLine of rawLines) {
    const words = rawLine.split(' ');
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const testWidth = font.widthOfTextAtSize(testLine, size);
      if (testWidth > width) {
        if (currentLine) wrappedLines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) wrappedLines.push(currentLine);
  }

  const actualLineHeight = size * lineHeight;
  const totalHeight = wrappedLines.length * actualLineHeight;
  let cursorY = y + (height - totalHeight) / 2 + (actualLineHeight * (wrappedLines.length - 1));

  for (const line of wrappedLines) {
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

export function drawTopLeftAlignedParagraph(page, text, {
  x, y, width, height, font, size = 12, lineHeight = 1.2, color
}) {
  const rawLines = text.split(/\r?\n/);
  const wrappedLines = [];

  for (const rawLine of rawLines) {
    const words = rawLine.split(' ');
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const testWidth = font.widthOfTextAtSize(testLine, size);
      if (testWidth > width) {
        if (currentLine) wrappedLines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) wrappedLines.push(currentLine);
  }

  const actualLineHeight = size * lineHeight;
  const maxLines = Math.floor(height / actualLineHeight);
  let cursorY = y + height - actualLineHeight;

  const linesToDraw = wrappedLines.slice(0, maxLines);

  // If we had to cut lines, add ellipsis to last line
  if (wrappedLines.length > maxLines && linesToDraw.length > 0) {
    let lastLine = linesToDraw[linesToDraw.length - 1];
    const ellipsisWidth = font.widthOfTextAtSize("...", size);
    let shortened = lastLine;

    while (font.widthOfTextAtSize(shortened, size) + ellipsisWidth > width && shortened.length > 0) {
      shortened = shortened.slice(0, -1);
    }

    linesToDraw[linesToDraw.length - 1] = `${shortened}...`;
  }

  for (const line of linesToDraw) {
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
