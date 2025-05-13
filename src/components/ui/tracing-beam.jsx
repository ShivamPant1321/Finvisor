"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import { useMountedTheme } from "@/hooks/use-mounted-theme";

export const TracingBeam = ({
  children,
  className,
}) => {
  const { isDark } = useMountedTheme();
  const [active, setActive] = useState(false);
  const progressValue = useMotionValue(0);
  const scrollContainer = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    if (!scrollContainer.current) return;

    const handleScroll = () => {
      if (!scrollContainer.current) return;
      
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer.current;
      const scrollProgress = scrollTop / (scrollHeight - clientHeight);
      
      progressValue.set(scrollProgress);
      
      if (scrollTop > 0) {
        setActive(true);
        controls.start({
          pathLength: Math.min(scrollProgress + 0.05, 1),
          opacity: 1,
        });
      } else {
        setActive(false);
      }
    };

    const container = scrollContainer.current;
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [controls, progressValue]);

  // Enhanced beam color for dark theme
  const beamColor = isDark ? "#8B5CF6" : "#3B82F6"; // Purple for dark, blue for light

  return (
    <div
      ref={scrollContainer}
      className={`relative h-full w-full overflow-auto ${className}`}
    >
      <motion.div
        className={`absolute left-0 top-0 h-full w-1 ${active ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
      >
        <svg
          className="h-full w-20 stroke-primary"
          viewBox="0 0 20 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M10 0V800"
            stroke={beamColor}
            strokeWidth="2"
            strokeLinecap="round"
            animate={controls}
            style={{ pathLength: progressValue, opacity: progressValue }}
            initial={{ pathLength: 0, opacity: 0 }}
          />
          <motion.circle
            cx="10"
            cy="0"
            r="5"
            fill={beamColor}
            animate={controls}
            style={{ offsetDistance: `${progressValue.get() * 100}%` }}
          />
        </svg>
      </motion.div>
      {children}
    </div>
  );
};
