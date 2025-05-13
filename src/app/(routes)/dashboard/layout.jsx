"use client";

import React, { useEffect } from "react";
import DashboardHeader from "../dashboard/_components/DashboardHeader"
import SideNav from "../dashboard/_components/SideNav"
import { db } from "../../../../utils/dbConfig";
import { Budgets } from "../../../../utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import { useMountedTheme } from "@/hooks/use-mounted-theme";
import { motion } from "framer-motion";

const DashboardLayout = ({ children }) => {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const { isDark, dashboardDarkColors } = useMountedTheme();

  useEffect(() => {
    if (isLoaded && user) {
      checkUserBudgets();
    }
  }, [isLoaded, user]);

  const checkUserBudgets = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    try {
      const result = await db
        .select()
        .from(Budgets)
        .where(eq(Budgets.createdBy, user.primaryEmailAddress.emailAddress));

      if (result.length === 0) {
        router.replace("/dashboard/budgets");
      }
    } catch (error) {
      console.error("Error fetching budgets:", error);
    }
  };

  return (
    <div className={`flex h-screen ${isDark ? dashboardDarkColors.background : "bg-slate-50"}`}>
      <div className="fixed md:w-64 hidden md:block h-screen z-30">
        <SideNav />
      </div>
      <div className="md:ml-64 w-full flex flex-col">
        <DashboardHeader />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`flex-1 overflow-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 ${
            isDark ? "bg-gradient-to-br from-gray-900 to-gray-950" : "bg-gradient-to-br from-slate-50 to-white"
          }`}
        >
          <div className="max-w-7xl mx-auto p-4 sm:p-6">{children}</div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardLayout;
