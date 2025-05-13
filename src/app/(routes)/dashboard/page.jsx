"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import CardInfo from "./_components/CardInfo";
import { desc, getTableColumns, sql, eq } from "drizzle-orm";
import { Budgets, Expenses, Incomes } from "../../../../utils/schema";
import { BarChart, LayoutGrid, Clock, ArrowRight, Wallet } from "lucide-react";
import BarChartDashboard from "./_components/BarChartDashboard";
import BudgetItem from "./budgets/_components/BudgetItem";
import { db } from "../../../../utils/dbConfig";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useMountedTheme } from "@/hooks/use-mounted-theme";

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const { isDark, dashboardDarkColors, darkThemeColors } = useMountedTheme();

  const [budgetList, setbudgetList] = useState([]);
  const [incomeList, setincomeList] = useState([]);
  const [expenseList, setexpenseList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    user && getBudgetList();
  }, [user]);

  const getBudgetList = async () => {
    setIsLoading(true);
    try {
      const result = await db
        .select({
          ...getTableColumns(Budgets),
          totalSpend: sql`SUM(${Expenses.amount})`.mapWith(Number),
          totalItem: sql`COUNT(${Expenses.id})`.mapWith(Number),
        })
        .from(Budgets)
        .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
        .groupBy(Budgets.id)
        .orderBy(desc(Budgets.id));

      setbudgetList(result);
      getAllExpenses();
      getIncomeList();
    } catch (error) {
      console.error("Error fetching budgets:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getIncomeList = async () => {
    try {
      const result = await db
        .select({
          ...getTableColumns(Expenses),
          totalAmount: sql`SUM(cast(${Expenses.amount} as numeric()))`.mapWith(Number),
        })
        .from(Incomes)
        .groupBy(Incomes.id);
      setincomeList(result);
    } catch (error) {
      console.error("Error fetching incomes:", error);
    }
  };

  const getAllExpenses = async () => {
    try {
      const result = await db
        .select({
          id: Expenses.id,
          name: Expenses.name,
          amount: Expenses.amount,
          createdAt: Expenses.createdAt,
        })
        .from(Budgets)
        .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(Expenses.id));
      setexpenseList(result);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  if (!isLoaded) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h2 className={`font-bold text-3xl md:text-4xl mb-2 ${
          isDark && `bg-gradient-to-r ${darkThemeColors.dashboard.header} bg-clip-text text-transparent`
        }`}>
          Welcome back, {user?.firstName || "Guest"}
        </h2>
        <p className={isDark ? "text-gray-400" : "text-gray-500"}>
          Here's what's happening with your finances today
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <CardInfo budgetList={budgetList} incomeList={incomeList} />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 mt-8 gap-6">
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className={`rounded-2xl overflow-hidden ${
            isDark ? dashboardDarkColors.glassCard : "bg-white border shadow-sm"
          }`}>
            <div className="p-5 flex justify-between items-center border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg ${isDark ? "bg-blue-900/30" : "bg-blue-50"}`}>
                  <BarChart className={`w-5 h-5 ${isDark ? "text-blue-400" : "text-blue-600"}`} />
                </div>
                <h2 className="font-semibold text-lg">Financial Activity</h2>
              </div>
              <Link href="/dashboard/budgets">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`text-xs rounded-full ${isDark ? "text-blue-400 hover:bg-blue-900/20" : ""}`}
                >
                  View All
                </Button>
              </Link>
            </div>
            <BarChartDashboard budgetList={budgetList} />
          </div>
        </motion.div>
        
        <motion.div 
          className="flex flex-col gap-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className={`rounded-2xl p-5 ${
            isDark ? dashboardDarkColors.glassCard : "bg-white border shadow-sm"
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg ${isDark ? "bg-purple-900/30" : "bg-purple-50"}`}>
                  <Wallet className={`w-4 h-4 ${isDark ? "text-purple-400" : "text-purple-600"}`} />
                </div>
                <h2 className="font-semibold">Latest Budgets</h2>
              </div>
              <Link href="/dashboard/budgets">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`h-8 w-8 rounded-full ${isDark ? "text-blue-400 hover:bg-blue-900/20" : ""}`}
                >
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            
            <div className="space-y-4">
              {isLoading ? (
                [1, 2].map((_, index) => (
                  <div
                    key={index}
                    className={`h-[130px] w-full rounded-xl animate-pulse ${
                      isDark ? "bg-gray-800" : "bg-slate-200"
                    }`}
                  ></div>
                ))
              ) : budgetList?.length > 0 ? (
                budgetList.slice(0, 2).map((budget) => (
                  <motion.div 
                    key={budget.id}
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <BudgetItem budget={budget} />
                  </motion.div>
                ))
              ) : (
                <div className={`p-4 text-center rounded-xl ${
                  isDark ? "bg-gray-800/50" : "bg-slate-100"
                }`}>
                  <p className={isDark ? "text-gray-400" : "text-gray-500"}>No budgets found</p>
                  <Link href="/dashboard/budgets">
                    <Button size="sm" className="mt-2 rounded-lg">Create Budget</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
          
          <div className={`rounded-2xl p-5 ${
            isDark ? dashboardDarkColors.glassCard : "bg-white border shadow-sm"
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg ${isDark ? "bg-emerald-900/30" : "bg-emerald-50"}`}>
                  <Clock className={`w-4 h-4 ${isDark ? "text-emerald-400" : "text-emerald-600"}`} />
                </div>
                <h2 className="font-semibold">Recent Activity</h2>
              </div>
            </div>
            
            <div className="space-y-3">
              {expenseList?.length > 0 ? (
                expenseList.slice(0, 3).map((expense, index) => (
                  <div 
                    key={expense.id || index}
                    className={`p-3 rounded-xl flex items-center justify-between ${
                      isDark ? "bg-gray-800/50 hover:bg-gray-800/70" : "bg-slate-50 hover:bg-slate-100"
                    } transition-colors`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isDark ? "bg-gray-700" : "bg-slate-200"
                      }`}>
                        <span className="text-xs">
                          {expense.name ? expense.name.charAt(0).toUpperCase() : '#'}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">{expense.name}</h3>
                        <p className="text-xs text-gray-500">{
                          expense.createdAt ? new Date(expense.createdAt).toLocaleDateString() : 'N/A'
                        }</p>
                      </div>
                    </div>
                    <span className={`font-medium ${isDark ? "text-red-400" : "text-red-600"}`}>
                      -${expense.amount || 0}
                    </span>
                  </div>
                ))
              ) : (
                <div className={`p-4 text-center rounded-xl ${
                  isDark ? "bg-gray-800/50" : "bg-slate-100"
                }`}>
                  <p className={isDark ? "text-gray-400" : "text-gray-500"}>No recent expenses</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
