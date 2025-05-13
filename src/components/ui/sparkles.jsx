"use client";
import React, { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export const SparklesCore = ({
  id,
  background,
  minSize,
  maxSize,
  speed,
  particleColor,
  className,
  particleDensity,
  particleOpacity,
  minOpacity,
  maxOpacity,
  particleLife,
  children,
}) => {
  const particlesRef = useRef([]);
  const [canvasConfig, setCanvasConfig] = useState({
    width: 0,
    height: 0,
  });
  const { theme, systemTheme } = useTheme();
  
  // Determine the effective theme
  const currentTheme = theme === 'system' ? systemTheme : theme;
  
  // Calculate particle color based on theme if not explicitly provided
  const effectiveParticleColor = particleColor || (currentTheme === 'dark' ? "180, 180, 255" : "100, 100, 255");

  // 1) resize + (re)generate particles
  useEffect(() => {
    const canvas = document.getElementById(id);
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width; canvas.height = rect.height;
      setCanvasConfig({ width: rect.width, height: rect.height });
      // regenerate
      const count = Math.min(Math.floor((rect.width * rect.height) / 10000) * particleDensity, 300);
      const arr = [];
      for (let i = 0; i < count; i++) {
        arr.push({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          size: Math.random() * (maxSize - minSize) + minSize,
          opacity: Math.random() * (maxOpacity - minOpacity) + minOpacity,
          life: Math.random() * particleLife,
          speedX: (Math.random() - 0.5) * speed,
          speedY: (Math.random() - 0.5) * speed,
        });
      }
      particlesRef.current = arr;
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [id, minSize, maxSize, speed, particleDensity, minOpacity, maxOpacity, particleLife]);

  // 2) animation loop
  useEffect(() => {
    const canvas = document.getElementById(id);
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf;
    const animate = () => {
      ctx.clearRect(0, 0, canvasConfig.width, canvasConfig.height);
      const ps = particlesRef.current;
      for (let p of ps) {
        p.x += p.speedX; p.y += p.speedY; p.life -= 0.01;
        if (p.life <= 0 || p.x < 0 || p.x > canvasConfig.width || p.y < 0 || p.y > canvasConfig.height) {
          p.x = Math.random() * canvasConfig.width;
          p.y = Math.random() * canvasConfig.height;
          p.life = Math.random() * particleLife;
        }
        ctx.fillStyle = `rgba(${effectiveParticleColor}, ${p.opacity * particleOpacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(animate);
    };
    if (canvasConfig.width && canvasConfig.height) animate();
    return () => cancelAnimationFrame(raf);
  }, [id, canvasConfig.width, canvasConfig.height, effectiveParticleColor, particleOpacity, particleLife, currentTheme]);

  return (
    <div className={cn("relative h-full w-full", className)}>
      <canvas
        id={id}
        style={{ background }}
        className="absolute inset-0 h-full w-full"
      />
      {children}
    </div>
  );
};

SparklesCore.defaultProps = {
  id: "sparkles-canvas",
  background: "transparent",
  minSize: 0.5,
  maxSize: 2,
  speed: 1,
  className: "",
  particleDensity: 1,
  particleOpacity: 1,
  minOpacity: 0.1,
  maxOpacity: 1,
  particleLife: 2,
};
