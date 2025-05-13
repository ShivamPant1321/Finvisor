import React from "react";
import { UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion } from "framer-motion";
import { Bell, Search, Menu as MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMountedTheme } from "@/hooks/use-mounted-theme";
import Link from "next/link";

const DashboardHeader = () => {
  const { isDark, dashboardDarkColors } = useMountedTheme();

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`p-4 sm:p-5 border-b flex justify-between items-center sticky top-0 z-20 ${
        isDark 
          ? `${dashboardDarkColors.header} shadow-lg shadow-black/10` 
          : "bg-white/95 backdrop-blur-sm shadow-sm"
      }`}
    >
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full md:hidden"
        >
          <MenuIcon className="h-5 w-5" />
        </Button>
        
        <div className="hidden sm:flex relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="Search..." 
            className={`pl-10 w-[250px] rounded-full ${
              isDark ? "bg-gray-800/50 border-gray-700/50" : "bg-slate-100/70 border-slate-200"
            }`}
          />
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            variant="ghost" 
            size="icon" 
            className={`rounded-full relative ${
              isDark ? "text-blue-400 hover:text-blue-300 hover:bg-blue-900/20" : ""
            }`}
          >
            <Bell className="h-5 w-5" />
            <span className={`absolute top-1.5 right-1.5 w-2 h-2 rounded-full ${
              isDark ? "bg-blue-400" : "bg-primary"
            }`}></span>
          </Button>
        </motion.div>
        
        <Link href="/" className="hidden sm:block">
          <Button 
            variant="ghost" 
            size="sm" 
            className={`text-xs rounded-full gap-2 ${
              isDark 
                ? "hover:bg-gray-800/70 text-gray-300" 
                : "hover:bg-slate-100 text-slate-600"
            }`}
          >
            Home
          </Button>
        </Link>
        
        <ThemeToggle />
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <UserButton 
            appearance={{
              elements: {
                avatarBox: `h-9 w-9 rounded-full border-2 ${
                  isDark ? "border-blue-500/30" : "border-primary/20"
                }`
              }
            }} 
            redirectUrl="/" 
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DashboardHeader;
