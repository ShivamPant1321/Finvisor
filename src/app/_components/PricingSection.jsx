import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for beginners",
    features: [
      "Basic expense tracking",
      "Monthly budget planning",
      "Financial dashboard",
      "Limited transaction history",
      "Mobile app access",
    ],
    buttonText: "Get Started",
    buttonVariant: "outline",
    popular: false,
  },
  {
    name: "Pro",
    price: "$9.99",
    period: "/month",
    description: "For serious personal finance",
    features: [
      "All Free features",
      "Unlimited transaction history",
      "Investment portfolio tracking",
      "AI-powered insights",
      "Tax preparation tools",
      "Custom categories and tags",
    ],
    buttonText: "Start Free Trial",
    buttonVariant: "default",
    popular: true,
  },
  {
    name: "Business",
    price: "$24.99",
    period: "/month",
    description: "For small businesses",
    features: [
      "All Pro features",
      "Multiple user accounts",
      "Business expense categorization",
      "Invoice and payment tracking",
      "Financial projections",
      "API access",
      "Priority support",
    ],
    buttonText: "Contact Sales",
    buttonVariant: "outline",
    popular: false,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-slate-600">
            Choose the plan that fits your financial needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white border ${
                plan.popular ? "border-blue-500" : "border-slate-200"
              } rounded-xl shadow-sm p-8 relative`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-6 transform -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {plan.name}
              </h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">{plan.price}</span>
                {plan.period && (
                  <span className="text-slate-600">{plan.period}</span>
                )}
              </div>
              <p className="text-slate-600 mb-6">{plan.description}</p>
              <ul className="mb-8 space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-slate-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/sign-up">
                <Button
                  variant={plan.buttonVariant}
                  className={`w-full ${
                    plan.popular ? "bg-blue-500 hover:bg-blue-600" : ""
                  }`}
                >
                  {plan.buttonText}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
