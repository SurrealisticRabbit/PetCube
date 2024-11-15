import { drawElement } from './Render';

class Pet {
    constructor(name, color, initialPosition, moveRange) {
        this.name = name;
        this.color = color;
        this.position = initialPosition;
        this.moveRange = moveRange;
        this.direction = true; // true for forward, false for backward
        this.speed = 1; // Movement speed
        this.physicsCounter = 0;
        this.wag = 0; // Amount of pixels for a tail wag
    }

    runPhysics() {

        // Check if the pet has reached the boundaries of its movement range
        if (this.position.x >= this.moveRange.max || this.position.x <= this.moveRange.min) {
            // Reverse the direction
            this.direction = !this.direction;
        }
        // Update the position based on the current direction and speed
        this.position.x += this.direction ? this.speed : -this.speed;
        
        // Tail wagging animation
        if (this.physicsCounter % 3 === 0) {
            this.wag += 1;

            // Limit how big the tail wag can be
            if (this.wag >= 5) {

                // Reset to 0 so tail doesnt grow indefinitely
                this.wag = 0;
            }
        }

        // Increment the physics counter
        this.physicsCounter++;
    }

    render(context) {

        // Defining the pet elements
        const petElements = [

            // Body
            [this.position.x, this.position.y, 20, 20, this.color],

            // Head (Updates based on direction)
            [this.direction ? this.position.x + 10 : this.position.x - 10, this.position.y - 5, 20, 10, this.color],

            // Tail (Updates based on direction and runs tail wagging animation)
            [this.direction ? this.position.x - (10+this.wag) : this.position.x + (10+this.wag), this.position.y + 10, 20, 5, this.color],
        ];

        // Draw the pet elements
        drawElement(context, 0, 0, petElements);
    }
}

export default Pet;