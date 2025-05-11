import React from "react";
import { UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion } from "framer-motion";
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const DashboardHeader = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-5 shadow-sm border-b flex justify-between bg-background/95 backdrop-blur-sm sticky top-0 z-30"
    >
      <div className="hidden sm:flex relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input 
          placeholder="Search..." 
          className="pl-10 w-[250px] rounded-full bg-background border-muted" 
        />
      </div>
      
      <div className="sm:hidden"></div>
      
      <div className="flex items-center gap-3">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button variant="ghost" size="icon" className="rounded-full relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full"></span>
          </Button>
        </motion.div>
        
        <ThemeToggle />
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <UserButton 
            appearance={{
              elements: {
                avatarBox: "h-9 w-9 rounded-full border-2 border-primary/20"
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
