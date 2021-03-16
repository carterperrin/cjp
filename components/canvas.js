import React from 'react';

export default function Canvas({ draw, ...rest }) {
  const canvasRef = React.useRef(null);

  const preDraw = ({ context, canvas }) => {
    resizeCanvasToDisplaySize(canvas);
    const { height, width } = canvas.getBoundingClientRect();
    context.clearRect(0, 0, width, height);
  };

  const resizeCanvasToDisplaySize = (canvas) => {
    if (
      canvas.height !== window.innerHeight ||
      canvas.width !== window.innerWidth
    ) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  };

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    let animationFrameId;

    const render = () => {
      preDraw({ context, canvas });
      const { height, width } = canvas;
      draw({ context, width, height });
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);
  return <canvas ref={canvasRef} {...rest} />;
}
