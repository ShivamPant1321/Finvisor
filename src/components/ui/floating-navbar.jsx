"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useMountedTheme } from "@/hooks/use-mounted-theme";
import Image from "next/image";
import Link from "next/link";

export function FloatingNav() {
  const { isDark, mounted } = useMountedTheme();
  
  if (!mounted) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
    >
      <div className={`flex items-center gap-2 px-4 py-2 rounded-full 
        ${isDark ? 'bg-gray-950/80' : 'bg-white/60'} 
        backdrop-blur-md 
        ${isDark ? 'border-gray-800' : 'border-white/20'} 
        border shadow-lg ${isDark ? 'shadow-indigo-900/20' : ''}`}>
        <Link href="/">
          <div className="flex items-center">
            <Image
              src={`${isDark ? "/logo-dark.png" : "/logo-light.png"}`}
              width={80}
              height="auto"
              alt="FinVisor"
              className={`${isDark ? 'brightness-[1.5] contrast-[1.3]' : 'brightness-[1.2] contrast-[1.2]'}`}
            />
          </div>
        </Link>
        <div className={`w-px h-5 ${isDark ? 'bg-indigo-800/50' : 'bg-white/20'}`}></div>
        <Link href="/sign-in">
          <div className={`px-3 py-1 text-sm ${isDark ? 'text-indigo-300 hover:text-indigo-100' : 'text-gray-700 hover:text-gray-900'} transition-colors`}>
            Sign In
          </div>
        </Link>
        <Link href="/sign-up">
          <div className="px-3 py-1 text-sm text-white hover:text-white/80 font-medium bg-primary/80 hover:bg-primary rounded-full transition-colors">
            Sign Up
          </div>
        </Link>
      </div>
    </motion.div>
  );
}
