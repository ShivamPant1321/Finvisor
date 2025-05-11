"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

export function FloatingNav() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

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
        ${resolvedTheme === 'dark' ? 'bg-gray-900/70' : 'bg-white/60'} 
        backdrop-blur-md 
        ${resolvedTheme === 'dark' ? 'border-gray-800' : 'border-white/20'} 
        border shadow-lg`}>
        <Link href="/">
          <div className="flex items-center">
            <Image
              src="/FinVisor.png"
              width={80}
              height={30}
              alt="FinVisor"
              className="brightness-[1.2] contrast-[1.2]"
            />
          </div>
        </Link>
        <div className={`w-px h-5 ${resolvedTheme === 'dark' ? 'bg-gray-700' : 'bg-white/20'}`}></div>
        <Link href="/sign-in">
          <div className={`px-3 py-1 text-sm ${resolvedTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'} hover:text-white transition-colors`}>Sign In</div>
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
