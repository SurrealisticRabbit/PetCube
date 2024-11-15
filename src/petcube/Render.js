// Function to draw a single rectangle on the canvas
export function drawRectangle(context, x, y, width, height, color) {
    if (!context) {
        console.error("Invalid context");
        return;
    }
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}

// Function to draw multiple elements on the canvas
export function drawElements(context, baseX, baseY, elements) {
    if (!context) {
        console.error("Invalid context");
        return;
    }
    if (!Array.isArray(elements)) {
        console.error("Invalid elements array");
        return;
    }
    elements.forEach(element => {
        if (Array.isArray(element) && element.length === 5) {
            const [x, y, width, height, color] = element;
            drawRectangle(context, baseX + x, baseY + y, width, height, color);
        } else {
            console.error("Invalid element format", element);
        }
    });
}

// Function to draw pixel art on the canvas with a scale factor
export function drawPixelArtWithScale(context, baseX, baseY, pixelData, scaleFactor = 1, baseColor = 'rgba(0,0,0,0)') {
    if (!context) {
        console.error("Invalid context");
        return;
    }
    if (!Array.isArray(pixelData)) {
        console.error("Invalid pixel data array");
        return;
    }
    pixelData.forEach(pixel => {
            const x = pixel.x * scaleFactor;
            const y = pixel.y * scaleFactor;
            const size = scaleFactor;
            drawRectangle(context, baseX + x, baseY + y, size, size, pixel.color || baseColor);
    });
}
