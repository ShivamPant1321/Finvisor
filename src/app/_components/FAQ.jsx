"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { useTheme } from "next-themes";

const faqs = [
  {
    question: "How does FinVisor protect my financial data?",
    answer: "We use bank-level 256-bit encryption and never store your banking credentials..."
  },
  {
    question: "Can I connect all my financial accounts?",
    answer: "Yes, FinVisor integrates with over 10,000 financial institutions worldwide..."
  },
  {
    question: "Is there a mobile app available?",
    answer: "Absolutely! Our mobile apps are available for both iOS and Android devices..."
  },
  {
    question: "How accurate are the AI-powered insights?",
    answer: "Our AI models are trained on millions of financial transactions..."
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes, you can cancel your subscription at any time..."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(-1);
  const { theme } = useTheme();

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle(index);
    }
  };

  return (
    <section className="py-20 bg-slate-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Everything you need to know about FinVisor
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <div
                role="button"
                className={`cursor-pointer flex justify-between items-center w-full text-left p-6 ${
                  openIndex === index 
                    ? "bg-white dark:bg-gray-800 rounded-t-xl" 
                    : "bg-white dark:bg-gray-800 rounded-xl"
                } shadow-sm hover:bg-slate-100 dark:hover:bg-gray-700 transition-colors duration-200`}
                onClick={() => handleToggle(index)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
                tabIndex={0}
              >
                <h3 className="text-lg font-medium text-slate-900 dark:text-white">
                  {faq.question}
                </h3>
                <div className="cursor-pointer text-blue-500">
                  {openIndex === index ? (
                    <Minus className="h-5 w-5" />
                  ) : (
                    <Plus className="h-5 w-5" />
                  )}
                </div>
              </div>
              {openIndex === index && (
                <div
                  id={`faq-answer-${index}`}
                  className="bg-white dark:bg-gray-800 p-6 rounded-b-xl shadow-sm border-t border-slate-100 dark:border-gray-700"
                >
                  <p className="text-slate-600 dark:text-slate-300">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
