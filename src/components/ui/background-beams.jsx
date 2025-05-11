"use client";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({ className }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  useEffect(() => {
    const updateMousePosition = (ev) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      setMousePosition({
        x: ev.clientX - rect.left,
        y: ev.clientY - rect.top,
      });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let animationFrameId;
    const render = () => {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create a radial gradient from the mouse position
      const gradient = ctx.createRadialGradient(
        mousePosition.x,
        mousePosition.y,
        0,
        mousePosition.x,
        mousePosition.y,
        canvas.width * 0.5
      );

      // Add color stops for the gradient
      gradient.addColorStop(0, "rgba(255, 255, 255, 0.12)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

      // Fill with gradient
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [mousePosition]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <canvas
        ref={canvasRef}
        className="h-full w-full opacity-30 bg-blend-screen"
      />
    </div>
  );
};
