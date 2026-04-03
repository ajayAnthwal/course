"use client";

import { useState } from "react";
import { Badge, Button, Card, Input, Textarea } from "@/components/ui";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";

const admissionGuides = [
  { title: "BTech Admissions 2024", desc: "Complete guide to engineering admissions through JEE, state exams", icon: "🔧", color: "from-blue-500 to-blue-600" },
  { title: "MBA Admissions 2024", desc: "CAT, XAT, NMAT - everything you need to know about MBA admissions", icon: "📊", color: "from-purple-500 to-purple-600" },
  { title: "Medical Admissions", desc: "NEET UG/PG admissions, AYUSH courses, and medical college details", icon: "🩺", color: "from-red-500 to-red-600" },
  { title: "Law Admissions", desc: "CLAT, LSAT, and law college admissions explained", icon: "⚖️", color: "from-amber-500 to-amber-600" },
];

const deadlines = [
  { exam: "JEE Main Session 2", date: "April 2024", status: "Upcoming" },
  { exam: "CAT 2024", date: "November 2024", status: "Upcoming" },
  { exam: "NEET UG 2024", date: "May 2024", status: "Upcoming" },
  { exam: "CLAT 2024", date: "December 2024", status: "Upcoming" },
];

export default function AdmissionPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    state: "",
    marks: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you! Our counselor will contact you shortly.");
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-0">Admissions</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Apply for Admission 2024</h1>
          <p className="text-xl text-primary-200 max-w-2xl mb-8">
            Get expert guidance for your admission journey. Our counselors will help you find the best college and course.
          </p>
          <div className="flex gap-4">
            <Link href="#apply-form">
              <Button size="lg" variant="secondary">Apply Now</Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-700">
              Free Counseling
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-neutral-50 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { value: "10,000+", label: "Colleges" },
              { value: "5M+", label: "Students Admitted" },
              { value: "98%", label: "Success Rate" },
              { value: "500+", label: "Expert Counselors" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-primary-600">{stat.value}</div>
                <div className="text-neutral-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Admission Guides */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8">Admission Guides</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {admissionGuides.map((guide) => (
              <Link key={guide.title} href={`/courses/${guide.title.toLowerCase().replace(/ /g, "-")}`}>
                <Card className="p-6 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${guide.color} flex items-center justify-center text-2xl mb-4 text-white`}>
                    {guide.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2 group-hover:text-primary-600">{guide.title}</h3>
                  <p className="text-neutral-600 text-sm">{guide.desc}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Important Dates */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8">Important Admission Dates</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {deadlines.map((item) => (
              <Card key={item.exam} className="p-6">
                <Badge variant="success" className="mb-3">{item.status}</Badge>
                <h4 className="font-semibold text-neutral-900 mb-1">{item.exam}</h4>
                <p className="text-primary-600 font-medium">{item.date}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply-form" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Info */}
            <div>
              <Badge variant="secondary" className="mb-4">Get Started</Badge>
              <h2 className="text-3xl font-bold text-neutral-900 mb-6">Start Your Application Today</h2>
              <p className="text-neutral-600 mb-8">
                Fill out the form and our expert counselors will guide you through the entire admission process, completely free of cost.
              </p>
              <div className="space-y-4">
                {[
                  { icon: "✓", title: "Free Expert Counseling", desc: "Get personalized guidance from experienced counselors" },
                  { icon: "✓", title: "Application Assistance", desc: "Help with college applications and document submission" },
                  { icon: "✓", title: "Direct College Connect", desc: "Get direct admission links to partner colleges" },
                  { icon: "✓", title: "Scholarship Guidance", desc: "Information about scholarships and financial aid" },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-neutral-900">{item.title}</h4>
                      <p className="text-sm text-neutral-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="bg-neutral-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-neutral-900 mb-6">Apply Now - Free</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Full Name *</label>
                  <Input 
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Email *</label>
                    <Input 
                      type="email" 
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Phone *</label>
                    <Input 
                      type="tel" 
                      placeholder="+91 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Preferred Course *</label>
                    <Select value={formData.course} onValueChange={(v) => setFormData({...formData, course: v})}>
                      <SelectTrigger><SelectValue placeholder="Select course" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="btech">B.Tech</SelectItem>
                        <SelectItem value="mba">MBA</SelectItem>
                        <SelectItem value="mbbs">MBBS</SelectItem>
                        <SelectItem value="bca">BCA</SelectItem>
                        <SelectItem value="bcom">B.Com</SelectItem>
                        <SelectItem value="ba">BA</SelectItem>
                        <SelectItem value="bsc">B.Sc</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Preferred State</label>
                    <Select value={formData.state} onValueChange={(v) => setFormData({...formData, state: v})}>
                      <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="delhi">Delhi</SelectItem>
                        <SelectItem value="maharashtra">Maharashtra</SelectItem>
                        <SelectItem value="karnataka">Karnataka</SelectItem>
                        <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                        <SelectItem value="uttar-pradesh">Uttar Pradesh</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Academic Marks (%)</label>
                  <Input 
                    placeholder="e.g., 85"
                    value={formData.marks}
                    onChange={(e) => setFormData({...formData, marks: e.target.value})}
                  />
                </div>
                <Button type="submit" className="w-full" size="lg" variant="gradient">
                  Submit Application
                </Button>
                <p className="text-xs text-neutral-500 text-center">
                  By submitting, you agree to our Terms of Service and Privacy Policy
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Help? Talk to Our Experts</h2>
          <p className="text-xl text-primary-200 mb-8 max-w-2xl mx-auto">
            Our counseling team is available 24/7 to help you with your admission queries.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" variant="secondary">📞 Call Now</Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-700">
              💬 Chat
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}