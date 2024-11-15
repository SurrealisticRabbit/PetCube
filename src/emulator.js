import React, { useRef, useEffect } from "react";
import Environment from "./petcube/Environment";

const Emulator = (props) => {
  const canvasRef = useRef(null);
  const environment = React.useMemo(() => new Environment(props), [props]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const updateCanvas = () => {
      environment.runPhysics();
      environment.render(context);
    };

    const intervalId = setInterval(updateCanvas, 1000 / 60);
    return () => clearInterval(intervalId);
  }, [props.width, props.height, environment]);

  return (
      <canvas ref={canvasRef} width={props.width} height={props.height} />
  );
};

export default Emulator;
