import { drawElements, drawPixelArtWithScale } from './Render';
import Pet from './Pet';
import lampData from './graphics/lamp.json'; // Import the JSON file
import windowData from './graphics/window.json'; // Import the JSON file

class Environment {
    constructor(props) {
        this.props = props;
        this.windowColor = "#f0f0f0"; // Initial color
        this.doggo = new Pet('Doggo', 'brown', { x: 50, y: 170 }, { min: 20, max: 150 }, 'path/to/doggo.png');

        this.environmentBackground = [
            {
                // Floor and walls
                baseX: 0,
                baseY: 0,
                elements: [
                    [0, 180, props.width, 20, "#bec3c4"],
                    [0, 0, props.width, 180, "#fce695"],
                ],
            },
        ];
    }

    getWindowColor() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const totalMinutes = hours * 60 + minutes;

        const blend = (start, end, percentage) => {
            return Math.round(start + (end - start) * percentage);
        };

        const dayColor = { r: 176, g: 235, b: 255 }; // Light blue
        const nightColor = { r: 44, g: 62, b: 80 }; // Dark blue

        let percentage;
        if (totalMinutes >= 0 && totalMinutes < 720) {
            // From 0 to 12 hours: dark to light
            percentage = totalMinutes / 720;
        } else {
            // From 12 to 24 hours: light to dark
            percentage = 1 - ((totalMinutes - 720) / 720);
        }

        const r = blend(nightColor.r, dayColor.r, percentage);
        const g = blend(nightColor.g, dayColor.g, percentage);
        const b = blend(nightColor.b, dayColor.b, percentage);

        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    }

    updateWindowColor() {
        this.windowColor = this.getWindowColor();
        windowData.forEach(pixel => {
            if (pixel.color === null){
                pixel.color = this.windowColor;
            }
        });
    }

    runPhysics() {
        // Update window color
        this.updateWindowColor();

        // Update doggo position
        this.doggo.runPhysics();
    }

    render(context) {
        // Render environment background
        this.environmentBackground.forEach(({ baseX, baseY, elements }) => {
            drawElements(context, baseX, baseY, elements);
        });

        // Render window
        drawPixelArtWithScale(context, 50, 50, windowData, 3);

        // Render lamp
        drawPixelArtWithScale(context, 100, 63, lampData, 4);

        // Render doggo
        this.doggo.render(context);
    }
}

export default Environment;
