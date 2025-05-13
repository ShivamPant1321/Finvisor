"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export function useMountedTheme() {
  const [mounted, setMounted] = useState(false);
  const themeContext = useTheme();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Enhanced dark theme colors for text gradients
  const darkThemeColors = {
    primary: "from-blue-400 to-purple-500",
    secondary: "from-pink-400 to-orange-400",
    accent: "from-emerald-400 to-cyan-400",
    heading: "from-indigo-400 to-pink-400",
    // New dashboard specific colors with improved gradients
    dashboard: {
      primary: "from-violet-400 to-cyan-500", 
      secondary: "from-rose-400 to-amber-400",
      success: "from-green-400 to-teal-500",
      warning: "from-amber-400 to-orange-500",
      danger: "from-red-400 to-pink-500",
      info: "from-blue-400 to-indigo-500",
      text: "from-slate-100 to-white",
      menu: "from-purple-300 to-blue-400",
      header: "from-cyan-300 to-blue-500",
      chart: "from-indigo-500 to-purple-400",
      budgetCard: "from-violet-300 to-blue-400",
    }
  };

  // Dashboard-specific background colors with improved styling
  const dashboardDarkColors = {
    background: "bg-gray-950", 
    card: "bg-gray-900/90",
    sidebar: "bg-gray-950 border-gray-800/50",
    header: "bg-gray-950/90 backdrop-blur-md border-gray-800/50",
    hover: "hover:bg-gray-800/70",
    cardHover: "hover:bg-gray-800/50 hover:border-gray-700/80",
    glassCard: "bg-gray-900/70 backdrop-blur-md border-gray-800/50",
    gradientBg: "bg-gradient-to-br from-gray-900 to-gray-950",
  };

  return {
    ...themeContext,
    mounted,
    darkThemeColors,
    dashboardDarkColors,
    isDark: mounted && themeContext.resolvedTheme === 'dark'
  };
}
