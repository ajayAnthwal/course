"use client";

import { Badge, Button, Card } from "@/components/ui";

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <Badge variant="secondary" className="mb-4">Why EduPortal</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-6 tracking-tight">
              The Smarter Way to Find Your Perfect College
            </h2>
            <p className="text-neutral-500 mb-8 leading-relaxed">
              We combine technology with expert guidance to help millions of students make informed education decisions.
            </p>
            <div className="space-y-6">
              {[
                { title: "Comprehensive Database", desc: "Access detailed information about 10,000+ colleges including fees, placements, rankings, and reviews.", icon: "📊" },
                { title: "Expert Counseling", desc: "Get personalized guidance from 500+ education experts who understand your goals and aspirations.", icon: "🎯" },
                { title: "Compare & Decide", desc: "Compare colleges side-by-side on multiple parameters to make the best decision for your future.", icon: "⚖️" },
                { title: "Application Support", desc: "End-to-end support from college selection to admission, including document guidance and deadlines.", icon: "✅" },
              ].map((feature) => (
                <div key={feature.title} className="flex gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center text-xl shrink-0 group-hover:bg-primary-100 transition-colors">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-1">{feature.title}</h3>
                    <p className="text-sm text-neutral-500 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 rounded-3xl p-8 lg:p-12">
              <div className="bg-white rounded-2xl shadow-xl p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary-100 flex items-center justify-center text-xl">🎓</div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">College Predictor</p>
                    <p className="text-xs text-neutral-500">Based on your JEE rank</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {["IIT Bombay - CSE", "IIT Delhi - CSE", "IIT Madras - EE"].map((college, i) => (
                    <div key={college} className="flex items-center justify-between p-3 rounded-xl bg-neutral-50">
                      <span className="text-sm text-neutral-700">{college}</span>
                      <Badge variant={i === 0 ? "success" : i === 1 ? "primary" : "warning"} size="sm">
                        {i === 0 ? "High" : i === 1 ? "Medium" : "Safe"}
                      </Badge>
                    </div>
                  ))}
                </div>
                <Button className="w-full" variant="gradient">Get Your Predictions</Button>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent-400/20 rounded-2xl blur-xl" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-secondary-400/20 rounded-full blur-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
