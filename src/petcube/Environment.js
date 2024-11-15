import { drawElement } from "./Render";

class Environment {
  constructor(props) {
    this.props = props;
    this.doggoDirection = true;
    this.doggoMove = 150;
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
      {
        // Window
        baseX: 40,
        baseY: 40,
        elements: [
          [0, 0, 40, 40, "#f0f0f0"],
          [0, 0, 5, 40, "grey"],
          [20, 0, 5, 40, "grey"],
          [40, 0, 5, 40, "grey"],
          [0, 20, 40, 5, "grey"],
          [0, 0, 40, 5, "grey"],
          [0, 40, 45, 5, "grey"],
        ],
      },
      {
        // Lamp
        baseX: 150,
        baseY: 73,
        elements: [
          [0, 105, 25, 5, "grey"],
          [10, 30, 5, 80, "grey"],
          [0, 20, 25, 10, "#d9b1e3"],
          [3, 10, 19, 10, "#d9b1e3"],
          [6, 0, 13, 10, "#d9b1e3"],
        ],
      },
    ];
  }

  updateWindowColor(Time, Hours, Minutes) {
    // Calculate the window color based on the time of day
    const dayColour = { r: 176, g: 224, b: 230 };
    const nightColour = { r: 25, g: 25, b: 112 };
    const blend = (start, end, percentage) => {
        return Math.round(start + (end - start) * percentage);
    };

    let percentage;
    if (Hours >= 0 && Hours < 12) {
        percentage = Hours / 12;
    } else {
        percentage = 1 - (Hours - 12) / 12;
    }

    const r = blend(nightColour.r, dayColour.r, percentage);
    const g = blend(nightColour.g, dayColour.g, percentage);
    const b = blend(nightColour.b, dayColour.b, percentage);
    this.environmentBackground[1].elements[0][4] = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }

  runPhysics() {
    //Physics Function
    const currentTime = new Date();
    const currentHours = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
    this.updateWindowColor(currentTime, currentHours, currentMinutes);
    


    if (this.doggoMove >= 180 || this.doggoMove <= 20) {
      this.doggoDirection = !this.doggoDirection;
    }

    this.doggoMove += this.doggoDirection ? 1 : -1;
  }

  render(context) {
    //Render Function
    this.environmentBackground.forEach(({ baseX, baseY, elements }) => {
      drawElement(context, baseX, baseY, elements);
    });

    const doggoBasePosition = { x: 0, y: 0 };
    const dog = [
        [this.doggoMove, 170, 20, 20, "brown"],
        [this.doggoDirection ? this.doggoMove + 10 : this.doggoMove - 10, 165, 20, 10, "brown"],
        [this.doggoDirection ? this.doggoMove - 10 : this.doggoMove + 10, 180, 20, 5, "brown"],
    ];
    drawElement(context, doggoBasePosition.x, doggoBasePosition.y, dog);
  }
}

export default Environment;
