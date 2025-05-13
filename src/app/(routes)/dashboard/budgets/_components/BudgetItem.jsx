import Link from "next/link";
import React from "react";
import { useMountedTheme } from "@/hooks/use-mounted-theme";

function BudgetItem({ budget }) {
  const { isDark, darkThemeColors, dashboardDarkColors } = useMountedTheme();
  
  const calculateProgressPerc = () => {
    if (!budget.totalSpend) return 0;
    const perc = (budget.totalSpend / budget.amount) * 100;
    return perc > 100 ? 100 : perc.toFixed(2);
  };
  
  const progressPercent = calculateProgressPerc();
  const isOverBudget = budget.totalSpend > budget.amount;
  const isNearLimit = progressPercent >= 80 && progressPercent < 100;
  
  // Determine progress bar color based on percentage
  const getProgressBarColor = () => {
    if (isOverBudget) {
      return isDark ? "bg-red-500" : "bg-red-500";
    } else if (isNearLimit) {
      return isDark ? "bg-amber-500" : "bg-amber-500";
    }
    return isDark ? "bg-blue-500" : "bg-primary";
  };
  
  return (
    <Link href={"/dashboard/expenses/" + budget?.id}>
      <div
        className={`p-5 rounded-xl transition-all duration-300 
          ${isDark 
            ? `${dashboardDarkColors.card} border border-gray-800/50 ${dashboardDarkColors.cardHover}`
            : "bg-white border hover:shadow-md hover:border-slate-300"
          }`}
      >
        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-3 items-center">
            <div
              className={`text-2xl p-3 rounded-xl
                ${isDark 
                  ? `bg-gray-800/70 text-gray-200 ${
                      isOverBudget
                        ? "text-red-300"
                        : isNearLimit
                          ? "text-amber-300" 
                          : "text-blue-300"
                    }`
                  : `bg-slate-100 ${
                      isOverBudget
                        ? "text-red-600"
                        : isNearLimit
                          ? "text-amber-600"
                          : "text-primary"
                    }`
                }`}
            >
              {budget?.icon}
            </div>
            <div>
              <h2 className={`font-bold ${isDark ? "text-gray-200" : ""}`}>
                {budget.name}
              </h2>
              <h2 className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                {budget.totalItem || 0} {budget.totalItem === 1 ? "Item" : "Items"}
              </h2>
            </div>
          </div>
          <h2 className={`font-bold text-lg ${
            isDark 
              ? `bg-gradient-to-r ${darkThemeColors.dashboard.budgetCard} text-transparent bg-clip-text`
              : "text-primary"
          }`}>
            ${budget.amount}
          </h2>
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between mb-2">
            <h2 className={`text-xs ${isDark ? "text-gray-400" : "text-slate-500"}`}>
              ${budget.totalSpend ? budget.totalSpend.toFixed(2) : "0"} Spent
            </h2>
            <h2 className={`text-xs font-medium ${
              isOverBudget
                ? isDark ? "text-red-400" : "text-red-600"
                : isDark ? "text-gray-400" : "text-slate-500"
            }`}>
              ${(budget.amount - (budget.totalSpend || 0)).toFixed(2)} Remaining
            </h2>
          </div>
          <div
            className={`w-full h-2.5 rounded-full ${isDark ? "bg-gray-800" : "bg-slate-200"}`}
          >
            <div
              className={`${getProgressBarColor()} h-2.5 rounded-full transition-all duration-500 ease-out`}
              style={{
                width: `${progressPercent}%`,
              }}
            ></div>
          </div>
          
          {/* Add percentage indicator */}
          <div className="mt-1.5 text-right">
            <span className={`text-xs font-medium ${
              isOverBudget
                ? isDark ? "text-red-400" : "text-red-600"
                : isNearLimit
                  ? isDark ? "text-amber-400" : "text-amber-600"
                  : isDark ? "text-blue-400" : "text-blue-600"
            }`}>
              {progressPercent}%
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BudgetItem;
