"use client";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import Features from "./_components/Features";
import Testimonials from "./_components/Testimonials";
import FAQ from "./_components/FAQ";
import { useMountedTheme } from "@/hooks/use-mounted-theme";
import { SparklesCore } from "@/components/ui/sparkles";

export default function Home() {
  const { mounted, isDark } = useMountedTheme();

  // Handle initial server render
  if (!mounted) {
    return <div className="min-h-screen bg-slate-50 dark:bg-gray-950"></div>;
  }

  return (
    <main className={`min-h-screen relative ${
      isDark ? 'bg-gray-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    } transition-colors duration-300`}>
      {/* Background sparkles effect - Improved for dark mode visibility */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <SparklesCore
          id="global-sparkles"
          background="transparent"
          minSize={isDark ? 0.6 : 0.4}
          maxSize={isDark ? 1.8 : 1.0}
          particleDensity={isDark ? 20 : 15}
          speed={0.5}
          particleColor={isDark ? "120, 160, 255" : "100, 100, 255"}
          particleOpacity={isDark ? 1 : 0.5}
          className="w-full h-full"
        />
      </div>
      
      {/* Main content */}
      <div className="relative z-10">
        <Header />
        <Hero />
        <Features />
        <Testimonials />
        <FAQ />
      </div>
    </main>
  );
}
