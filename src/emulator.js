import React, { useRef, useEffect } from "react";

const Emulator = (props) => {
    const canvasRef = useRef(null);
    var doggoDirection = true;
    var doggoMove = 150;

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        const updateCanvas = () => {
            runPetCube();
        };

        function drawBox(x, y, l, w, colour) {
            context.fillStyle = colour;
            context.fillRect(x, y, l, w);
        }

        function drawElement(baseX, baseY, elements) {
            elements.forEach(([x, y, l, w, colour]) => {
                drawBox(baseX + x, baseY + y, l, w, colour);
            });
        }

        function getWindowColor() {
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
            if (totalMinutes >= 360 && totalMinutes < 720) {
                // Morning: 6 AM to 12 PM
                percentage = (totalMinutes - 360) / 360;
            } else if (totalMinutes >= 720 && totalMinutes < 1080) {
                // Afternoon: 12 PM to 6 PM
                percentage = (totalMinutes - 720) / 360;
            } else if (totalMinutes >= 1080 && totalMinutes < 1440) {
                // Evening: 6 PM to 12 AM
                percentage = (totalMinutes - 1080) / 360;
            } else {
                // Night: 12 AM to 6 AM
                percentage = totalMinutes / 360;
            }

            const r = blend(nightColor.r, dayColor.r, percentage);
            const g = blend(nightColor.g, dayColor.g, percentage);
            const b = blend(nightColor.b, dayColor.b, percentage);

            return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
        }

        function runPetCube() {
            const windowColor = getWindowColor();

            const floorAndWalls = [
                [0, 180, props.width, 20, "#bec3c4"],
                [0, 0, props.width, 180, "#fce695"],
            ];

            const window = [
                [0, 0, 40, 40, windowColor],
                [0, 0, 5, 40, "grey"],
                [20, 0, 5, 40, "grey"],
                [40, 0, 5, 40, "grey"],
                [0, 20, 40, 5, "grey"],
                [0, 0, 40, 5, "grey"],
                [0, 40, 45, 5, "grey"],
            ];

            const lamp = [
                [0, 105, 25, 5, "grey"],
                [10, 30, 5, 80, "grey"],
                [0, 20, 25, 10, "#d9b1e3"],
                [3, 10, 19, 10, "#d9b1e3"],
                [6, 0, 13, 10, "#d9b1e3"],
            ];

            const environmentItems = [
                { baseX: 0, baseY: 0, elements: floorAndWalls },
                { baseX: 40, baseY: 40, elements: window },
                { baseX: 150, baseY: 70, elements: lamp },
            ];

            const background = () => {
                environmentItems.forEach(({ baseX, baseY, elements }) => {
                    drawElement(baseX, baseY, elements);
                });
            };

            const doggoBasePosition = { x: 0, y: 0 };

            const doggo = () => {
                const dog = [
                    [doggoMove, 170, 20, 20, "brown"],
                    [doggoDirection ? doggoMove + 10 : doggoMove - 10, 165, 20, 10, "brown"],
                    [doggoDirection ? doggoMove - 10 : doggoMove + 10, 180, 20, 5, "brown"],
                ];

                drawElement(doggoBasePosition.x, doggoBasePosition.y, dog);

                if (doggoMove >= 180 || doggoMove <= 20) {
                    doggoDirection = !doggoDirection;
                }

                doggoMove += doggoDirection ? 1 : -1;
            };

            background();
            doggo();
        }

        const intervalId = setInterval(updateCanvas, 1000 / 60);
        return () => clearInterval(intervalId);
    }, [props.width, props.height]);

    return <canvas ref={canvasRef} width={props.width} height={props.height} />;
};

export default Emulator;
