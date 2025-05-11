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
import { useTheme } from "next-themes";

const features = [
  {
    icon: <PieChart className="h-10 w-10 text-blue-500" />,
    title: "Expense Tracking",
    description: "Automatically categorize and visualize where your money goes each month."
  },
  {
    icon: <LineChart className="h-10 w-10 text-blue-500" />,
    title: "Investment Analysis",
    description: "Track performance of your investments with detailed analytics and insights."
  },
  {
    icon: <Wallet className="h-10 w-10 text-blue-500" />,
    title: "Budget Management",
    description: "Create budgets, set financial goals, and receive alerts when you exceed limits."
  },
  {
    icon: <Bot className="h-10 w-10 text-blue-500" />,
    title: "AI Financial Advisor",
    description: "Get personalized financial advice powered by advanced AI algorithms."
  },
];

const Features = () => {
  const { theme } = useTheme();

  return (
    <section id="features" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Powerful Features for Your Financial Success
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Our comprehensive tools help you manage every aspect of your financial life
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-slate-50 dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg w-fit mb-5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WelcomeSection = () => {
  return (
    <section className="relative hidden lg:flex lg:col-span-5 xl:col-span-6">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 z-10"></div>
      <div className="relative z-20 flex flex-col justify-center items-center h-full p-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-white max-w-md text-center"
        >
          <h1 className="text-4xl font-bold mb-4">Welcome back to FinVisor</h1>
          <p className="text-lg opacity-90">
            Track expenses, manage budgets, and take control of your financial future with AI-powered insights.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
