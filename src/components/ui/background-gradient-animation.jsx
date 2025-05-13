"use client";

import { useEffect, useRef, useState } from "react";
import { useMountedTheme } from "@/hooks/use-mounted-theme";
import { cn } from "@/lib/utils";

export const BackgroundGradientAnimation = ({
  gradientBackgroundStart = "rgb(108, 0, 162)",
  gradientBackgroundEnd = "rgb(0, 17, 82)",
  firstColor = "18, 113, 255",
  secondColor = "221, 74, 255",
  thirdColor = "100, 220, 255",
  fourthColor = "200, 50, 50",
  fifthColor = "180, 180, 50",
  pointerColor = "140, 100, 255",
  size = "80%",
  blendingValue = "hard-light",
  children,
  className,
  interactive = true,
  containerClassName,
}) => {
  const { isDark } = useMountedTheme();
  const interactiveRef = useRef(null);
  const [curX, setCurX] = useState(0);
  const [curY, setCurY] = useState(0);
  const [tgX, setTgX] = useState(0);
  const [tgY, setTgY] = useState(0);
  const [mounted, setMounted] = useState(false);
  
  // Enhanced dark theme colors for more vibrant gradients
  const darkThemeGradientStart = "rgb(10, 0, 30)"; // Darker than before
  const darkThemeGradientEnd = "rgb(0, 5, 20)"; // Darker than before
  const darkThemeFirstColor = "120, 60, 255";
  const darkThemeSecondColor = "240, 120, 255";
  const darkThemeThirdColor = "60, 180, 255";
  const darkThemeFourthColor = "230, 90, 140";
  const darkThemeFifthColor = "220, 220, 100";
  const darkThemePointerColor = "200, 120, 255";
  
  useEffect(() => {
    setMounted(true);
    
    // Use enhanced dark theme colors if in dark mode
    const bgStart = isDark ? darkThemeGradientStart : gradientBackgroundStart;
    const bgEnd = isDark ? darkThemeGradientEnd : gradientBackgroundEnd;
    const first = isDark ? darkThemeFirstColor : firstColor;
    const second = isDark ? darkThemeSecondColor : secondColor;
    const third = isDark ? darkThemeThirdColor : thirdColor;
    const fourth = isDark ? darkThemeFourthColor : fourthColor;
    const fifth = isDark ? darkThemeFifthColor : fifthColor;
    const pointer = isDark ? darkThemePointerColor : pointerColor;
    
    document.body.style.setProperty("--gradient-background-start", bgStart);
    document.body.style.setProperty("--gradient-background-end", bgEnd);
    document.body.style.setProperty("--first-color", first);
    document.body.style.setProperty("--second-color", second);
    document.body.style.setProperty("--third-color", third);
    document.body.style.setProperty("--fourth-color", fourth);
    document.body.style.setProperty("--fifth-color", fifth);
    document.body.style.setProperty("--pointer-color", pointer);
    document.body.style.setProperty("--size", size);
    document.body.style.setProperty("--blending-value", blendingValue);
  }, [isDark]);

  useEffect(() => {
    if (!interactive || !mounted) return;

    const move = () => {
      setCurX(curX + (tgX - curX) / 20);
      setCurY(curY + (tgY - curY) / 20);
      if (interactiveRef.current) {
        interactiveRef.current.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
      }
      requestAnimationFrame(move);
    };

    const handleMouseMove = (e) => {
      const rect = interactiveRef.current?.getBoundingClientRect();
      if (!rect) return;
      setTgX(e.clientX - rect.left - rect.width / 2);
      setTgY(e.clientY - rect.top - rect.height / 2);
    };

    const handleMouseLeave = () => {
      setTgX(0);
      setTgY(0);
    };

    move();

    if (interactiveRef.current) {
      interactiveRef.current.addEventListener("mousemove", handleMouseMove);
      interactiveRef.current.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (interactiveRef.current) {
        interactiveRef.current.removeEventListener("mousemove", handleMouseMove);
        interactiveRef.current.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [interactive, curX, curY, tgX, tgY, mounted]);

  if (!mounted) {
    return null;
  }

  const adjustedColor = isDark ? "rgba(0, 0, 0, 0.75)" : "rgba(255, 255, 255, 0.1)";

  return (
    <div
      className={cn(
        "overflow-hidden",
        containerClassName
      )}
    >
      <div
        className={cn(
          "absolute inset-0 w-full h-full bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]",
          className
        )}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background: adjustedColor,
            position: "absolute",
            width: "100%",
            height: "100%",
            zIndex: 1,
          }}
        ></div>

        <svg className="hidden">
          <defs>
            <filter id="blurMe">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="10"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
        <div className={cn("gradients-container h-full w-full")}
          ref={interactiveRef}
        >
          <div
            className={cn(
              "absolute h-[calc(var(--size)*1.2)] w-[calc(var(--size)*1.2)] left-[calc(50%-var(--size)/1.4)] top-[calc(50%-var(--size)/1.4)]",
              "bg-[radial-gradient(circle_at_center,_rgba(var(--first-color),_0.8)_0,_rgba(var(--first-color),_0)_70%)]",
              "mix-blend-var(--blending-value)"
            )}
          ></div>
          <div
            className={cn(
              "absolute h-[calc(var(--size)*1.3)] w-[calc(var(--size)*1.3)] left-[calc(42%-var(--size)/1.4)] top-[calc(40%-var(--size)/1.4)]",
              "bg-[radial-gradient(circle_at_center,_rgba(var(--second-color),_0.8)_0,_rgba(var(--second-color),_0)_70%)]",
              "mix-blend-var(--blending-value)"
            )}
          ></div>
          <div
            className={cn(
              "absolute h-[calc(var(--size)*1)] w-[calc(var(--size)*1)] left-[calc(60%-var(--size)/1)] top-[calc(55%-var(--size)/1)]",
              "bg-[radial-gradient(circle_at_center,_rgba(var(--third-color),_0.8)_0,_rgba(var(--third-color),_0)_70%)]",
              "mix-blend-var(--blending-value)"
            )}
          ></div>
          <div
            className={cn(
              "absolute h-[calc(var(--size)*0.8)] w-[calc(var(--size)*0.8)] left-[calc(35%-var(--size)/1.4)] top-[calc(65%-var(--size)/1)]",
              "bg-[radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.8)_0,_rgba(var(--fourth-color),_0)_70%)]",
              "mix-blend-var(--blending-value)"
            )}
          ></div>
          <div
            className={cn(
              "absolute h-[calc(var(--size)*0.8)] w-[calc(var(--size)*0.8)] left-[calc(60%-var(--size)/1.4)] top-[calc(35%-var(--size)/1)]",
              "bg-[radial-gradient(circle_at_center,_rgba(var(--fifth-color),_0.8)_0,_rgba(var(--fifth-color),_0)_70%)]",
              "mix-blend-var(--blending-value)"
            )}
          ></div>
          {interactive && (
            <div
              className={cn(
                "absolute h-[30px] w-[30px] left-0 top-0",
                "bg-[radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.8)_0,_rgba(var(--pointer-color),_0)_70%)]",
                "mix-blend-var(--blending-value)"
              )}
              style={{
                left: "calc(var(--x) * 1px)",
                top: "calc(var(--y) * 1px)",
              }}
            ></div>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};
