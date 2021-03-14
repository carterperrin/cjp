import React from 'react';

function useCanvas(draw) {
  const canvasRef = React.useRef(null);

  const preDraw = ({ context, canvas }) => {
    const { height, width } = canvas.getBoundingClientRect();
    resizeCanvasToDisplaySize({ canvas, width, height });
    context.clearRect(0, 0, width, height);
  };

  const resizeCanvasToDisplaySize = ({ canvas, width, height }) => {
    if (canvas.height !== height || canvas.width !== width) {
      const { devicePixelRatio: ratio = 1 } = window;
      const context = canvas.getContext('2d');
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.scale(ratio, ratio);
    }
  };

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    let frameCount = 0;
    let animationFrameId;

    const render = () => {
      frameCount++;
      preDraw({ context, canvas });
      const { height, width } = canvas.getBoundingClientRect();
      draw({ context, width, height, frameCount });
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  return canvasRef;
}

export default function Canvas({ draw, ...rest }) {
  const canvasRef = useCanvas(draw);
  return <canvas ref={canvasRef} {...rest} />;
}
