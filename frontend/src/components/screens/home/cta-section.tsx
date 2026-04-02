"use client";

import Link from "next/link";
import { Button } from "@/components/ui";

export default function CTASection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-64 h-64 bg-primary-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-accent-400/10 rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight text-balance">
          Ready to Start Your Journey?
        </h2>
        <p className="text-lg text-primary-200/80 mb-8 max-w-2xl mx-auto">
          Join thousands of students who have already found their dream college through EduPortal. Your future starts with a single step.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register">
            <Button size="xl" className="bg-white text-primary-700 hover:bg-primary-50 shadow-xl shadow-black/10 w-full sm:w-auto">
              Create Free Account
            </Button>
          </Link>
          <Link href="/colleges">
            <Button size="xl" variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white/10 w-full sm:w-auto">
              Browse Colleges
            </Button>
          </Link>
        </div>
        <p className="text-sm text-primary-300/60 mt-6">No credit card required · Free forever</p>
      </div>
    </section>
  );
}
