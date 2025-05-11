"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export function useMountedTheme() {
  const [mounted, setMounted] = useState(false);
  const themeContext = useTheme();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return {
    ...themeContext,
    mounted
  };
}
