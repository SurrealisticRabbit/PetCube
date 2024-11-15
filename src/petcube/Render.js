// Function to draw a single box on the canvas
export function drawBox(context, x, y, l, w, colour) {
    // Check if the context is valid
    if (!context) {
        console.error('Invalid context');
        return;
    }
    // Set the fill color
    context.fillStyle = colour;
    // Draw the rectangle
    context.fillRect(x, y, l, w);
}

// Function to draw multiple elements on the canvas
export function drawElement(context, baseX, baseY, elements) {
    // Check if the context is valid
    if (!context) {
        console.error('Invalid context');
        return;
    }
    // Check if elements is a valid array
    if (!Array.isArray(elements)) {
        console.error('Invalid elements array');
        return;
    }
    // Iterate over each element in the array
    elements.forEach(element => {
        // Check if the element is a valid array with 5 items
        if (Array.isArray(element) && element.length === 5) {
            // Destructure the element array into individual variables
            const [x, y, l, w, colour] = element;
            // Draw the box with the calculated coordinates
            drawBox(context, baseX + x, baseY + y, l, w, colour);
        } else {
            // Log an error if the element format is invalid
            console.error('Invalid element format', element);
        }
    });
}