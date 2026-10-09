"use client";
import { initDraw } from "@/app/draw";
import { useEffect, useRef } from "react";

export default function Canvas({ roomId }: { roomId: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      initDraw(canvasRef.current, roomId);
    }
  }, [canvasRef]);

  return (
    <div>
      <canvas ref={canvasRef} width={1000} height={1000}></canvas>
    </div>
  );
}
