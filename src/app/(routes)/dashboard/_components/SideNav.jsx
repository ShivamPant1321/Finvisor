"use client"

import React, { useEffect } from "react";
import Image from "next/image";
import {
  LayoutGrid,
  PiggyBank,
  ReceiptText,
  ShieldCheck,
  CircleDollarSign,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useMountedTheme } from "@/hooks/use-mounted-theme";
import { motion } from "framer-motion";

const SideNav = () => {
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutGrid,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Incomes",
      icon: CircleDollarSign,
      path: "/dashboard/incomes",
    },
    {
      id: 3,
      name: "Budgets",
      icon: PiggyBank,
      path: "/dashboard/budgets",
    },
    {
      id: 4,
      name: "Expenses",
      icon: ReceiptText,
      path: "/dashboard/expenses",
    },
    {
      id: 5,
      name: "Upgrade",
      icon: ShieldCheck,
      path: "/dashboard/upgrade",
    },
  ];

  const path = usePathname();
  const { isDark, darkThemeColors, dashboardDarkColors } = useMountedTheme();
  const [logoSrc, setLogoSrc] = React.useState("/logo-light.png");

  useEffect(() => {
    setLogoSrc(isDark ? "/logo-dark.png" : "/logo-light.png");
  }, [isDark]);

  return (
    <motion.div 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`h-screen p-5 border-r shadow-sm flex flex-col ${
        isDark ? dashboardDarkColors.sidebar : 'bg-white border-slate-200'
      }`}
    >
      <div className="flex flex-row items-center justify-center mb-8">
        <Link href={'/'}>
          <Image src={logoSrc} alt="logo" width={140} height={40} priority className="mt-2" />
        </Link>
      </div>

      <div className="pt-2 flex-1">
        {menuList.map((menu, index) => {
          const isActive = path === menu.path;
          const MenuIcon = menu.icon;
          
          return (
            <Link href={menu.path} key={index}>
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div
                  className={`flex gap-3 items-center font-medium mb-3 p-3 cursor-pointer rounded-xl transition-all ${
                    isActive 
                      ? isDark 
                        ? `bg-gray-800/80 shadow-inner shadow-black/20` 
                        : "text-primary bg-blue-100/80"
                      : isDark 
                        ? "text-gray-400 hover:bg-gray-800/50" 
                        : "text-gray-600 hover:text-primary hover:bg-blue-50/80"
                  }`}
                >
                  <MenuIcon className={`w-5 h-5 ${isActive && isDark ? "text-blue-400" : ""}`} />
                  <span className={`${isActive && isDark 
                    ? `bg-gradient-to-r ${darkThemeColors.dashboard.menu} text-transparent bg-clip-text font-semibold` 
                    : ""
                  }`}>
                    {menu.name}
                  </span>
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>
      
      <div className={`p-4 rounded-xl mt-auto mb-6 ${
        isDark 
          ? "bg-gray-800/50 border border-gray-700/50" 
          : "bg-blue-50/50 border border-blue-100/50"
      }`}>
        <h3 className={`text-sm font-medium mb-2 ${
          isDark ? "text-gray-300" : "text-gray-700"
        }`}>
          Need Help?
        </h3>
        <p className={`text-xs ${
          isDark ? "text-gray-400" : "text-gray-600"
        }`}>
          Check our documentation or contact support for assistance.
        </p>
        <Button size="sm" className="mt-3 w-full rounded-lg">
          View Docs
        </Button>
      </div>
    </motion.div>
  );
};

// Add Button component to avoid import issues
const Button = ({ children, className, size = "md" }) => {
  const sizeClasses = {
    sm: "text-xs py-1.5 px-3",
    md: "text-sm py-2 px-4",
    lg: "text-base py-2.5 px-5"
  };
  
  return (
    <button className={`bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors ${sizeClasses[size]} ${className || ""}`}>
      {children}
    </button>
  );
};

export default SideNav;
