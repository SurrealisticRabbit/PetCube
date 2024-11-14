import React, { useRef, useEffect } from "react";

function col(d) {
  if (d) {
    return "red";
  } else {
    return "blue";
  }
}

const Emulator = (props) => {
  const canvasRef = useRef(null);
  var doggoDirection = true;
  var doggoMove = 150;
  var isRed = true;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const updateCanvas = () => {
        runPetCube();
    };

    function runPetCube(){
        const background = () => {

            //Floor & Walls
            context.fillStyle = '#bec3c4';
            context.fillRect(0, 180, props.width, 20);
            context.fillStyle = '#fce695';
            context.fillRect(0, 0, props.width, 180);

            //Window
            context.fillStyle = '#b0ebff';
            context.fillRect(40, 40, 40, 40);
            context.fillStyle = 'grey';
            context.fillRect(40, 40, 5, 40);
            context.fillRect(60, 40, 5, 40);
            context.fillRect(80, 40, 5, 40);
            context.fillRect(40, 60, 40, 5);
            context.fillRect(40, 40, 40, 5);
            context.fillRect(40, 80, 45, 5);

            //Lamp (So it doesn't look so empty)
            context.fillStyle = 'grey';
            context.fillRect(150, 175, 25, 5);
            context.fillRect(160, 100, 5, 80);
            context.fillStyle = '#d9b1e3';
            context.fillRect(150, 90, 25, 10);
            context.fillRect(153, 80, 19, 10); 
            context.fillRect(156, 70, 13, 10); 
        };

        const doggo = () => {
            context.fillStyle = 'brown';
            context.fillRect(doggoMove, 170, 20, 20);

            if (doggoMove >= 180) {
                doggoDirection = !doggoDirection;
            } else if (doggoMove <= 20) {
                doggoDirection = !doggoDirection;
            }

            if (doggoDirection) {
            doggoMove += 1;
        }else{
            doggoMove -= 1;
        }
        };

        background();
        doggo();
    }

    updateCanvas();

    const intervalId = setInterval(updateCanvas, 100);
    return () => clearInterval(intervalId);
  }, []);

  return <canvas ref={canvasRef} width={props.width} height={props.height} />;
};

export default Emulator;
