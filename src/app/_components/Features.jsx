"use client";

import React from "react";
import { 
  PieChart, 
  LineChart, 
  Wallet, 
  Briefcase,
  Bot,
  Bell
} from "lucide-react";
import { useMountedTheme } from "@/hooks/use-mounted-theme";


const Features = () => {
  const { isDark, darkThemeColors } = useMountedTheme();
  const features = [
    {
      icon: PieChart,
      title: "Expense Tracking",
      description: "Automatically categorize and visualize where your money goes each month."
    },
    {
      icon: LineChart,
      title: "Investment Analysis",
      description: "Track performance of your investments with detailed analytics and insights."
    },
    {
      icon: Wallet,
      title: "Budget Management",
      description: "Create budgets, set financial goals, and receive alerts when you exceed limits."
    },
    {
      icon: Bot,
      title: "AI Financial Advisor",
      description: "Get personalized financial advice powered by advanced AI algorithms."
    },
  ];
  
  return (
    <section id="features" className="py-20 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'bg-gradient-to-r ' + darkThemeColors.heading + ' text-transparent bg-clip-text' : 'text-slate-900'}`}>
            Powerful Features for Your Financial Success
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Our comprehensive tools help you manage every aspect of your financial life
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            
            return (
              <div 
                key={index}
                className="bg-slate-50 dark:bg-gray-900 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 dark:shadow-blue-900/10 dark:border dark:border-gray-800"
              >
                <div className={`p-3 rounded-lg w-fit mb-5 ${isDark ? 'bg-gray-800' : 'bg-blue-50'}`}>
                  <div className={`${isDark ? "text-blue-400" : "text-blue-500"} w-10 h-10`}>
                    <IconComponent className="h-10 w-10" strokeWidth={1.75} />
                  </div>
                </div>
                <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'bg-gradient-to-r ' + darkThemeColors.primary + ' text-transparent bg-clip-text' : 'text-slate-900'}`}>
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-indigo-200">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
