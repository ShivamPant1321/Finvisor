"use client";

import React from 'react';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Loading = () => {
  const pulseVariants = {
    initial: { scale: 0.9, opacity: 0.6 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 1.2
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          variants={pulseVariants}
          initial="initial"
          animate="animate"
          className="inline-block mb-6"
        >
          <Loader2 className="h-16 w-16 text-blue-600 animate-spin" />
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
        >
          Loading your dashboard...
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-slate-500 dark:text-slate-400 mt-3"
        >
          Preparing your financial insights
        </motion.p>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-10 max-w-md"
      >
        <div className="space-y-3">
          <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-full w-full animate-pulse"></div>
          <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-full w-5/6 animate-pulse"></div>
          <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-full w-4/6 animate-pulse"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default Loading;