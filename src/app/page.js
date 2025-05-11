"use client";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import Features from "./_components/Features";
import Testimonials from "./_components/Testimonials";
import FAQ from "./_components/FAQ";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  
  // Wait until mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle initial server render
  if (!mounted) {
    return <div className="min-h-screen bg-slate-50 dark:bg-gray-900"></div>;
  }

  return (
    <main className={`min-h-screen ${
      theme === 'dark' ? 'bg-gray-900 text-slate-100' : 'bg-slate-50 text-slate-900'
    } transition-colors duration-300`}>
      <Header />
      <Hero />
      <Features />
      <Testimonials />
      <FAQ />
    </main>
  );
}
