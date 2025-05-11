"use client";

import { SignUp } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/theme-toggle";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, LockIcon, TrendingUp, LineChart, Wallet, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { cn } from "@/lib/utils";

const FloatingShape = ({ children, className, size = "lg", delay = 0 }) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
    xl: 'w-24 h-24'
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: delay,
        duration: 0.8,
        type: "spring",
        stiffness: 50
      }}
      className={cn(
        "absolute hidden lg:flex items-center justify-center rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg text-white",
        sizeClasses[size],
        className
      )}
    >
      {children}
    </motion.div>
  );
};

const page = () => {
  return (
    <section className="bg-background min-h-screen flex flex-col relative overflow-hidden">
      <BackgroundGradientAnimation
        gradientBackgroundStart="rgb(0, 6, 80)" 
        gradientBackgroundEnd="rgb(0, 17, 53)"
        firstColor="18, 113, 255"
        secondColor="100, 60, 255"
        thirdColor="64, 97, 237"
        fourthColor="39, 50, 127"
        fifthColor="20, 24, 82"
        pointerColor="140, 100, 255"
        size="40%"
        blendingValue="hard-light"
        className="absolute top-0 left-0 right-0 bottom-0 z-0"
      />
      
      <header className="p-4 flex justify-between items-center w-full z-10">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-2 text-white backdrop-blur-sm bg-white/10 border border-white/10 hover:bg-white/20">
            <ArrowLeft size={16} />
            Back to Home
          </Button>
        </Link>
        <ThemeToggle />
      </header>

      <div className="flex-1 lg:grid lg:grid-cols-12 z-10">
        <section className="relative hidden lg:flex lg:col-span-5 xl:col-span-6">
          <div className="relative h-full w-full flex flex-col items-center justify-center p-12">
            {/* Floating elements */}
            <FloatingShape className="top-20 left-16" delay={0.2}>
              <LockIcon size={30} />
            </FloatingShape>
            <FloatingShape className="bottom-32 left-24" size="md" delay={0.5}>
              <Wallet size={24} />
            </FloatingShape>
            <FloatingShape className="top-1/3 right-20" size="xl" delay={0.3}>
              <TrendingUp size={32} />
            </FloatingShape>
            <FloatingShape className="bottom-20 right-32" size="sm" delay={0.7}>
              <LineChart size={20} />
            </FloatingShape>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-white max-w-md p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl"
            >
              <h1 className="text-4xl font-bold mb-4">Join FinVisor today</h1>
              <p className="text-lg opacity-90 mb-6">
                Start your journey to financial freedom with smart budgeting and AI-driven insights.
              </p>
              
              <div className="space-y-4 mt-8">
                {[
                  "Track expenses automatically",
                  "Get personalized financial insights",
                  "Plan for future financial goals",
                  "Exclusive investment recommendations"
                ].map((feature, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + (index * 0.1) }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/30 flex items-center justify-center">
                      <ChevronRight size={14} className="text-primary" />
                    </div>
                    <p className="text-white/90">{feature}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <main className="flex items-center justify-center p-6 sm:p-8 md:p-10 lg:col-span-7 xl:col-span-6">
          <div className="max-w-sm w-full">
            <div className="mb-6 text-center lg:hidden">
              <h1 className="text-3xl font-bold text-white mb-2">Create your account</h1>
              <p className="text-white/70">Sign up to start your financial journey</p>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="backdrop-blur-md bg-white/10 dark:bg-black/20 p-6 sm:p-8 rounded-xl border border-white/20 dark:border-gray-800/30 shadow-xl"
            >
              <SignUp 
                appearance={{
                  elements: {
                    formButtonPrimary: 'bg-primary hover:bg-primary/90 text-primary-foreground',
                    card: 'bg-transparent shadow-none border-0',
                    headerTitle: 'text-white text-2xl',
                    headerSubtitle: 'text-white/70',
                    socialButtonsBlockButton: 'border border-white/20 text-white hover:bg-white/10',
                    formFieldLabel: 'text-white/90',
                    footerActionText: 'text-white/70',
                    footerActionLink: 'text-primary-foreground hover:text-primary-foreground/80',
                    dividerLine: 'bg-white/20',
                    dividerText: 'text-white/50',
                    formFieldInput: 'bg-white/5 backdrop-blur-sm border-white/10 text-white placeholder:text-white/40',
                    identityPreviewText: 'text-white',
                    identityPreviewEditButtonIcon: 'text-primary',
                  }
                }}
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-center mt-6"
            >
              <p className="text-sm text-white/50">
                By signing up, you agree to our{" "}
                <Link href="#" className="text-primary-foreground underline hover:text-primary-foreground/80">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-primary-foreground underline hover:text-primary-foreground/80">
                  Privacy Policy
                </Link>
              </p>
            </motion.div>
          </div>
        </main>
      </div>
      
      <FloatingNav />
    </section>
  );
};

export default page;