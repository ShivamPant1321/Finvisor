"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import CardInfo from "./_components/CardInfo";
import { desc, getTableColumns, sql, eq } from "drizzle-orm"; // ✅ Imported eq
import { Budgets, Expenses, Incomes } from "../../../../utils/schema";
import { BarChart } from "lucide-react";
import BarChartDashboard from "./_components/BarChartDashboard";
import BudgetItem from "./budgets/_components/BudgetItem";
import { db } from "../../../../utils/dbConfig";

export default function Dashboard() {
  const { user, isLoaded } = useUser();

  const [budgetList, setbudgetList] = useState([]);
  const [incomeList, setincomeList] = useState([]);
  const [expenseList, setexpenseList] = useState([]);

  useEffect(() => {
    user && getBudgetList();
  }, [user]);

  const getBudgetList = async () => {
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
    }
  };

  const getIncomeList = async () => {
    try {
      const result = await db
        .select({
          ...getTableColumns(Expenses),
          totalAmount: sql`SUM(cast(${Expenses.amount} as numeric()))`.mapWith(
            Number
          ),
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
    <div className="p-8">
      <h2 className="font-bold text-4xl">Hi, {user?.firstName || "Guest"}</h2>
      <p className="text-gray-500">
        Here's what happening with your money. Let's manage your expenses
      </p>
      <CardInfo budgetList={budgetList} incomeList={incomeList} />
      <div className="grid grid-cols-1 lg:grid-cols-3 mt-6 gap-5">
        <div className="lg:col-span-2">
          <BarChartDashboard budgetList={budgetList} />
        </div>
        <div className="grid gap-5">
          <h2 className="font-bold text-lg">Latest Budgets</h2>
          {budgetList?.length > 0 ? (
            budgetList.map((budget) => (
              <BudgetItem key={budget.id} budget={budget} /> // ✅ Fixed key
            ))
          ) : (
            [1, 2, 3, 4].map((_, index) => (
              <div
                key={index} // ✅ Added key here as well
                className="h-[180px] w-full bg-slate-200 lg animate-pulse"
              ></div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
