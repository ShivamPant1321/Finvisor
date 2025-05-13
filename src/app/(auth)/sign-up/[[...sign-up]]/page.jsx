"use client";

import { SignUp } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/theme-toggle";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  LockIcon,
  TrendingUp,
  LineChart,
  Wallet,
  ChevronRight,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { cn } from "@/lib/utils";

const FloatingShape = ({ children, className, size = "lg", delay = 0 }) => {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-20 h-20",
    xl: "w-24 h-24",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: delay,
        duration: 0.8,
        type: "spring",
        stiffness: 50,
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
        gradientBackgroundStart="rgb(0, 1, 40)"
        gradientBackgroundEnd="rgb(20, 20, 45)"
        firstColor="18, 113, 255"
        secondColor="80, 50, 255"
        thirdColor="64, 97, 237"
        fourthColor="39, 50, 127"
        fifthColor="20, 24, 82"
        pointerColor="140, 100, 255"
        size="30%"
        blendingValue="hard-light"
        className="absolute top-0 left-0 right-0 bottom-0 z-0"
      />

      <header className="p-4 flex justify-between items-center w-full z-10">
        <Link href="/">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-white backdrop-blur-sm bg-white/10 border border-white/10 hover:bg-white/20 transition-all duration-300"
          >
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
            <FloatingShape
              className="top-20 left-16 shadow-lg shadow-primary/20"
              delay={0.2}
            >
              <LockIcon size={30} className="text-primary" />
            </FloatingShape>
            <FloatingShape
              className="bottom-32 left-24 shadow-lg shadow-primary/20"
              size="md"
              delay={0.5}
            >
              <Wallet size={24} className="text-primary" />
            </FloatingShape>
            <FloatingShape
              className="top-1/3 right-20 shadow-lg shadow-primary/20"
              size="xl"
              delay={0.3}
            >
              <TrendingUp size={32} className="text-primary" />
            </FloatingShape>
            <FloatingShape
              className="bottom-20 right-32 shadow-lg shadow-primary/20"
              size="sm"
              delay={0.7}
            >
              <LineChart size={20} className="text-primary" />
            </FloatingShape>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-white max-w-md p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/10 shadow-2xl"
            >
              <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                Join FinVisor today
              </h1>
              <p className="text-lg opacity-90 mb-6">
                Start your journey to financial freedom with smart budgeting and
                AI-driven insights.
              </p>

              <div className="space-y-5 mt-8">
                {[
                  "Track expenses automatically",
                  "Get personalized financial insights",
                  "Plan for future financial goals",
                  "Exclusive investment recommendations",
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shadow-md shadow-primary/30">
                      <CheckCircle size={14} className="text-primary" />
                    </div>
                    <p className="text-white/90">{feature}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <main className="flex items-center justify-center p-6 sm:p-8 md:p-10 lg:col-span-7 xl:col-span-6">
          <div className="w-full max-w-md mx-auto">
            <div className="mb-8 text-center lg:text-left">
              <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold text-white mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200"
              >
                Create your account
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-white/70 text-lg"
              >
                Sign up to start your financial journey
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 dark:from-black/20 dark:to-black/10 p-4 sm:p-6 rounded-3xl border border-white/20 dark:border-gray-800/30 shadow-xl overflow-hidden"
            >
              <SignUp
                appearance={{
                  baseTheme: "dark",
                  layout: {
                    showOptionalFields: false,
                    socialButtonsVariant: "blockButton",
                    socialButtonsPlacement: "top",
                  },
                  variables: {
                    colorPrimary: "#3b82f6",
                    colorBackground: "transparent",
                    colorText: "#ffffff",
                    colorTextOnPrimaryBackground: "#ffffff",
                    colorTextSecondary: "rgba(255, 255, 255, 0.7)",
                    fontFamily: "var(--font-sans)",
                    borderRadius: "0.75rem",
                    spacingUnit: "4px",
                  },
                  elements: {
                    card: "bg-transparent shadow-none border-none py-6 px-5",
                    main: "w-full",
                    form: "w-full space-y-4",
                    formContainer: "p-0 space-y-4",
                    formFieldRow: "mb-4",
                    formHeader: "mb-6",
                    formHeaderTitle: "text-2xl font-bold text-white mb-2",
                    formHeaderSubtitle: "text-white/70 text-base",

                    formFieldLabel:
                      "text-white/90 font-medium mb-1 block text-sm",
                    formFieldInput:
                      "bg-white/10 text-white placeholder:text-white/50 border border-white/20 rounded-xl py-2.5 px-3 focus:border-primary/80 focus:ring focus:ring-primary/30 transition-all w-full backdrop-blur-sm shadow-sm shadow-black/5 text-sm",
                    formFieldInputShowPasswordButton:
                      "text-white/80 hover:text-white",
                    formFieldErrorText: "text-red-400 text-xs mt-1",
                    formFieldSuccessText: "text-green-400 text-xs mt-1",
                    formFieldHintText: "text-white/50 text-xs mt-1",

                    otpCodeField: "gap-1",
                    otpCodeFieldInput:
                      "bg-white/10 border border-white/20 text-white rounded-lg aspect-square !p-2 text-sm",

                    formHeaderTitleLogo: "mb-2",
                    formButtonPrimary:
                      "bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary text-white font-semibold py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 w-full mt-2 text-sm",
                    identityPreviewEditButtonIcon: "text-primary",
                    identityPreviewText: "text-white text-sm",
                    identityPreview:
                      "mb-4 bg-white/5 p-2 rounded-xl border border-white/10",

                    alternativeMethods:
                      "text-primary hover:text-primary/80 mt-4 text-sm",
                    userPreview: "border border-white/20 bg-white/5 rounded-xl",
                    userPreviewTextContainer: "text-white text-sm",
                    userButtonPopoverActionButton:
                      "hover:bg-white/5 text-white text-sm",

                    dividerLine: "bg-white/20",
                    dividerText: "text-white/60 text-xs mx-3",

                    socialButtonsProviderIcon:
                      "!w-5 !h-5 !max-w-[15px] !max-h-[15px] mr-2",
                    socialButtonsBlockButton:
                      "border border-white/20 text-white hover:bg-white/10 transition-all rounded-xl py-2.5 shadow-sm shadow-black/5 w-full flex items-center justify-center gap-2 mb-3 text-sm",
                    socialButtonsBlockButtonText: "font-medium text-sm",
                    socialButtonsBlockButtonArrow: "text-white",

                    footerActionText: "text-white/70 text-xs",
                    footerActionLink:
                      "text-primary hover:text-primary/80 font-medium",
                    footerAction: "mt-4",

                    verificationLinkStatusText: "text-white/80 text-sm",
                    alert:
                      "bg-white/10 border border-white/20 text-white rounded-xl p-2 text-sm",
                  },
                }}
                signInUrl="/sign-in"
              />
            </motion.div>

            {/* <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-center mt-8"
            >
              <p className="text-sm text-white/60">
                By signing up, you agree to our{" "}
                <Link
                  href="#"
                  className="text-primary underline hover:text-primary/80 transition-colors"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="#"
                  className="text-primary underline hover:text-primary/80 transition-colors"
                >
                  Privacy Policy
                </Link>
              </p>
            </motion.div> */}
          </div>
        </main>
      </div>

      {/* <FloatingNav /> */}
    </section>
  );
};

export default page;
