// lib/image-type-detector.js

export async function detectImageType(url) {
    try {
        const response = await fetch(url);
        const buffer = await response.arrayBuffer();
        const bytes = new Uint8Array(buffer.slice(0, 12)); // Read first 12 bytes
        const text = new TextDecoder("utf-8").decode(buffer.slice(0, 100)).trim();

        // SVG detection: check for XML or <svg
        if (text.startsWith('<?xml') || text.startsWith('<svg')) {
            return 'svg';
        }
        
        // PNG: 89 50 4E 47 0D 0A 1A 0A
        if (
            bytes[0] === 0x89 &&
            bytes[1] === 0x50 &&
            bytes[2] === 0x4E &&
            bytes[3] === 0x47 &&
            bytes[4] === 0x0D &&
            bytes[5] === 0x0A &&
            bytes[6] === 0x1A &&
            bytes[7] === 0x0A
        ) {
            return 'png';
        }

        // JPEG: FF D8 FF
        if (bytes[0] === 0xFF && bytes[1] === 0xD8 && bytes[2] === 0xFF) {
            return 'jpg';
        }

        // GIF: GIF87a or GIF89a
        if (
            bytes[0] === 0x47 &&
            bytes[1] === 0x49 &&
            bytes[2] === 0x46 &&
            (bytes[3] === 0x38 && (bytes[4] === 0x37 || bytes[4] === 0x39) && bytes[5] === 0x61)
        ) {
            return 'gif';
        }

        // WebP: RIFF....WEBP
        if (
            bytes[0] === 0x52 &&
            bytes[1] === 0x49 &&
            bytes[2] === 0x46 &&
            bytes[3] === 0x46 &&
            bytes[8] === 0x57 &&
            bytes[9] === 0x45 &&
            bytes[10] === 0x42 &&
            bytes[11] === 0x50
        ) {
            return 'webp';
        }

        return 'unknown';
    } catch (error) {
        console.error('Error detecting image type:', error);
        return 'unknown';
    }
}
