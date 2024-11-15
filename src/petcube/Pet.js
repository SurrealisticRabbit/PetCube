import { drawElements } from './Render';

class Pet {
  constructor(name, color, initialPosition, moveRange, imageSrc) {
    this.name = name;
    this.color = color;
    this.position = initialPosition;
    this.moveRange = moveRange;
    this.direction = true; // true for forward, false for backward
    this.speed = 1; // Movement speed
    this.image = new Image();
    this.image.src = imageSrc;
    this.imageLoaded = false;

    this.image.onload = () => {
      this.imageLoaded = true;
    };
  }

  runPhysics() {
    // Check if the pet has reached the boundaries of its movement range
    if (this.position.x >= this.moveRange.max || this.position.x <= this.moveRange.min) {
      // Reverse the direction
      this.direction = !this.direction;
    }
    // Update the position based on the current direction and speed
    this.position.x += this.direction ? this.speed : -this.speed;
  }

  render(context) {
    if (this.imageLoaded) {
      // Disable image smoothing to maintain pixelated look
      context.imageSmoothingEnabled = false;
      context.drawImage(this.image, this.position.x, this.position.y, 40, 40);
    } else {
      // Fallback to drawing a rectangle if the image is not loaded
      const petElements = [
        [this.position.x, this.position.y, 20, 20, this.color],
        [this.direction ? this.position.x + 10 : this.position.x - 10, this.position.y - 5, 20, 10, this.color],
        [this.direction ? this.position.x - 10 : this.position.x + 10, this.position.y + 10, 20, 5, this.color],
      ];
      drawElements(context, 0, 0, petElements);
    }
  }
}

export default Pet;
