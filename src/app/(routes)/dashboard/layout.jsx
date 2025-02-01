"use client";

import React, { useEffect } from "react";
import DashboardHeader from "../dashboard/_components/DashboardHeader"
import SideNav from "../dashboard/_components/SideNav"
import { db } from "../../../../utils/dbConfig";
import { Budgets } from "../../../../utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";

const DashboardLayout = ({ children }) => {
  const { user, isLoaded } = useUser();
  const router = useRouter();

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
    <div className="flex">
      <div className="fixed md:w-64 hidden md:block">
        <SideNav />
      </div>
      <div className="md:ml-64 w-full">
        <DashboardHeader />
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
