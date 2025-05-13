"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { SparklesCore } from "@/components/ui/sparkles";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { useTheme } from "next-themes";

const Hero = () => {
  const [imageError, setImageError] = useState(false);
  const { theme, systemTheme } = useTheme();
  
  // Determine the current theme
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme === 'dark';
  
  // Choose dashboard image based on current theme
  const dashboardImage = isDark 
    ? "/dashboard-preview-dark.png" 
    : "/dashboard-preview-light.png";

  return (
    <section className="container mx-auto px-6 py-24 md:py-32 relative overflow-hidden">
      <BackgroundBeams className="opacity-20" />
      
      <div className="absolute inset-0 w-full h-full">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor={isDark ? "180, 180, 255" : "#8B5CF6"}
          particleOpacity={isDark ? 0.8 : 1}
        />
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
        <motion.div 
          className="max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 text-slate-900 dark:text-slate-50">
            <span className="block">Simplify Your</span>
            <span className="gradient-text bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-600">Financial Journey</span>
          </h1>
          
          <div className="mb-8">
            <TextGenerateEffect
              words="FinVisor helps you track expenses, manage investments, and plan your financial future with powerful AI-driven insights and analytics."
              className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Link href="/sign-up">
              <Button 
                size="lg" 
                className="rounded-md px-8 py-6 text-md shadow-lg bg-primary hover:bg-primary/90 transition-all duration-300 hover:shadow-primary/25"
              >
                Start Free Trial
              </Button>
            </Link>
            <Link href="#features">
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-md px-8 py-6 text-md border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary transition-all duration-300"
              >
                Learn More
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 border-2 border-white dark:border-gray-800 flex items-center justify-center text-white text-sm font-medium shadow-lg"
                >
                  {i}
                </motion.div>
              ))}
            </div>
            <p className="ml-4 text-sm text-slate-600 dark:text-slate-400 font-medium">
              Trusted by 10,000+ users worldwide
            </p>
          </div>
        </motion.div>
        
        <motion.div 
          className="w-full md:w-auto relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary to-purple-600 opacity-75 blur-lg"></div>
          {imageError ? (
            <div className="relative bg-white dark:bg-gray-800 w-full max-w-[600px] h-[400px] rounded-xl shadow-xl border border-white/20 dark:border-gray-800/50 flex items-center justify-center overflow-hidden">
              <div className="text-center p-8">
                <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-3">FinVisor Dashboard</h3>
                <p className="text-slate-600 dark:text-slate-400">Manage your finances with intelligent insights</p>
              </div>
            </div>
          ) : (
            <div className="relative">
              <Image 
                src={dashboardImage} 
                alt="FinVisor Dashboard Preview"
                width={500}
                height={300}
                className="rounded-xl shadow-xl relative z-10 border border-white/20 dark:border-gray-800/50 backdrop-blur-sm"
                priority
                onError={() => setImageError(true)}
              />
            </div>
          )}
        </motion.div>
      </div>

      <motion.div 
        className="mt-24 max-w-4xl mx-auto text-center relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {[
            { stat: "99.9%", label: "Uptime" },
            { stat: "2M+", label: "Transactions" },
            { stat: "$350M", label: "Processed" },
            { stat: "4.9/5", label: "Rating" },
          ].map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.6, duration: 0.5 }}
              className="bg-white dark:bg-gray-800 bg-opacity-10 backdrop-blur-lg dark:bg-opacity-30 p-6 rounded-xl border border-white/20 dark:border-gray-800/50 shadow-lg"
            >
              <p className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">{item.stat}</p>
              <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;