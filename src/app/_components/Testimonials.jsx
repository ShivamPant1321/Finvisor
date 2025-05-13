"use client";

import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { useMountedTheme } from "@/hooks/use-mounted-theme";

const testimonials = [
  {
    name: "Alex Thompson",
    role: "Small Business Owner",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    content: "Since using FinVisor, I've been able to cut unnecessary expenses by 30% and identify growth opportunities I never noticed before.",
  },
  {
    name: "Sarah Chen",
    role: "Personal Investor",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    content: "The investment tracking features are incredible. I've optimized my portfolio and increased returns by following FinVisor's AI suggestions.",
  },
  {
    name: "Michael Roberts",
    role: "Freelancer",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
    content: "As someone with irregular income, FinVisor helps me budget effectively and prepare for tax season without stress.",
  },
];

const Testimonials = () => {
  const { isDark, darkThemeColors } = useMountedTheme();
  
  return (
    <section className="py-20 bg-slate-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'bg-gradient-to-r ' + darkThemeColors.secondary + ' text-transparent bg-clip-text' : 'text-slate-900'}`}>
            Trusted by Thousands
          </h2>
          <p className="text-lg text-slate-600 dark:text-purple-200">
            See why people choose FinVisor to manage their finances
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 dark:shadow-purple-900/10 dark:border dark:border-gray-800"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-slate-600 dark:text-pink-100 mb-6">"{testimonial.content}"</p>
              <div className="flex items-center">
                <div className="mr-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <h4 className={`font-semibold ${isDark ? 'bg-gradient-to-r ' + darkThemeColors.accent + ' text-transparent bg-clip-text' : 'text-slate-900'}`}>
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-blue-200">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
