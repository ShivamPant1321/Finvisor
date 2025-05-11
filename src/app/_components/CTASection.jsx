import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CTASection = () => {
  return (
    <section className="py-20 bg-blue-600">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Financial Life?
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Join thousands of users who've improved their financial health with FinVisor.
            Start your free 14-day trial today — no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/sign-up">
              <Button size="lg" className="rounded-full px-8 py-6 text-lg bg-white text-blue-600 hover:bg-blue-50">
                Get Started For Free
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="rounded-full px-8 py-6 text-lg border-white text-white hover:bg-blue-700">
                Schedule a Demo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
