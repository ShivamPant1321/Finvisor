"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useUser, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Header = () => {
  const { user, isSignedIn } = useUser() || {};
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        scrolled ? 'bg-background/80 backdrop-blur-md shadow-sm dark:bg-gray-900/80' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/FinVisor.png"
                width={140}
                height={45}
                alt="FinVisor"
                priority
              />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-foreground"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <div className="flex gap-x-4 items-center">
                <Link href="/dashboard">
                  <Button variant="ghost" className="rounded-full hover:bg-primary/10 text-foreground">
                    Dashboard
                  </Button>
                </Link>
                <Link href="/sign-in">
                  <Button className="rounded-full bg-primary hover:bg-primary/90 shadow-md hover:shadow-primary/25">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background dark:bg-gray-900 border-b dark:border-gray-800"
          >
            <div className="space-y-1 px-4 py-4 flex flex-col items-center">
              <ThemeToggle />
              <Link href="/dashboard" className="w-full">
                <Button variant="ghost" className="w-full justify-center rounded-full my-1 text-foreground">
                  Dashboard
                </Button>
              </Link>
              <Link href="/sign-in" className="w-full">
                <Button className="w-full justify-center rounded-full my-1">
                  Get Started
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
