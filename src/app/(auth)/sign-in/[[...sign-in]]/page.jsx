"use client";

import { SignIn } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/theme-toggle";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { TracingBeam } from "@/components/ui/tracing-beam";

export default function Page() {
  return (
    <section className="bg-background min-h-screen flex flex-col relative overflow-hidden">
      <BackgroundBeams className="opacity-20" />
      
      <header className="p-4 flex justify-between items-center w-full z-10">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-2 backdrop-blur-sm bg-background/30">
            <ArrowLeft size={16} />
            Back to Home
          </Button>
        </Link>
        <ThemeToggle />
      </header>

      <div className="flex-1 lg:grid lg:grid-cols-12 z-10">
        <section className="relative hidden lg:flex lg:col-span-5 xl:col-span-6">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary dark:from-primary/20 dark:to-primary/40 z-10"></div>
          <Image
            alt="Finance management illustration"
            src="/images/auth/signin-bg.jpg"
            fill
            className="absolute inset-0 object-cover"
            priority
          />
          <TracingBeam className="h-full">
            <div className="relative z-20 flex flex-col justify-center items-center h-full p-12">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-white max-w-md text-center"
              >
                <h1 className="text-4xl font-bold mb-4">Welcome back to FinVisor</h1>
                <p className="text-lg opacity-90">
                  Track expenses, manage budgets, and take control of your financial future with AI-powered insights.
                </p>
              </motion.div>
            </div>
          </TracingBeam>
        </section>

        <main className="flex items-center justify-center p-6 sm:p-8 md:p-10 lg:col-span-7 xl:col-span-6">
          <div className="max-w-sm w-full">
            <div className="mb-6 text-center lg:hidden">
              <h1 className="text-2xl font-bold text-foreground mb-2">Welcome to FinVisor</h1>
              <p className="text-muted-foreground">Sign in to continue your financial journey</p>
            </div>
            
            <div className="backdrop-blur-sm bg-white/10 dark:bg-black/10 p-6 sm:p-8 rounded-xl border border-white/20 dark:border-gray-800/30 shadow-lg">
              <SignIn 
                appearance={{
                  elements: {
                    formButtonPrimary: 'bg-primary hover:bg-primary/90 text-primary-foreground',
                    card: 'bg-transparent shadow-none border-0',
                    headerTitle: 'text-foreground',
                    headerSubtitle: 'text-muted-foreground',
                    socialButtonsBlockButton: 'border-border text-foreground',
                    formFieldLabel: 'text-foreground',
                    footerActionText: 'text-muted-foreground',
                    footerActionLink: 'text-primary',
                    dividerText: 'text-muted-foreground',
                    formFieldInput: 'bg-background/50 backdrop-blur-sm border-border',
                  }
                }}
              />
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
