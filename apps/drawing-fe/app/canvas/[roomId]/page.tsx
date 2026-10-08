import { useEffect, useRef } from "react";

export default function canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
    }
  }, [canvasRef]);

  return (
    <div>
      <canvas ref={canvasRef} width={500} height={500}></canvas>
    </div>
  );
}
