"use client";

import { useState } from "react";
import { Badge, Button, Card, Input, Textarea } from "@/components/ui";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";

export default function InquiryPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interestedCourse: "",
    interestedCollege: "",
    qualification: "",
    preferredMode: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen py-20 bg-neutral-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center bg-white rounded-3xl p-12 shadow-xl">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center text-5xl text-green-600">
            ✓
          </div>
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">Inquiry Submitted!</h2>
          <p className="text-neutral-600 mb-8">
            Thank you for your inquiry. Our team will contact you within 24 hours with the information you requested.
          </p>
          <Link href="/">
            <Button variant="gradient">Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const benefits = [
    { icon: "📚", title: "Course Details", desc: "Get complete information about courses" },
    { icon: "💰", title: "Fee Structure", desc: "Detailed fee breakdown and payment options" },
    { icon: "🎯", title: "Eligibility Check", desc: "Know if you qualify for your desired course" },
    { icon: "🏫", title: "College Options", desc: "Best colleges matching your profile" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-r from-secondary-600 to-secondary-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Badge variant="primary" className="mb-4 bg-white/20 text-white border-0">Inquiry</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Get Free Information</h1>
          <p className="text-xl text-secondary-200 max-w-2xl">
            Submit your inquiry and get detailed information about colleges, courses, fees, and admissions - completely free!
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-neutral-900 mb-6">Submit Your Inquiry</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Full Name *</label>
                    <Input
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Email *</label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Phone *</label>
                    <Input
                      type="tel"
                      placeholder="+91 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Interested Course *</label>
                    <Select
                      value={formData.interestedCourse}
                      onValueChange={(value) => setFormData({ ...formData, interestedCourse: value })}
                    >
                      <SelectTrigger><SelectValue placeholder="Select course" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="btech">B.Tech / Engineering</SelectItem>
                        <SelectItem value="mba">MBA / Management</SelectItem>
                        <SelectItem value="mbbs">MBBS / Medical</SelectItem>
                        <SelectItem value="bca">BCA</SelectItem>
                        <SelectItem value="bsc">B.Sc</SelectItem>
                        <SelectItem value="bcom">B.Com</SelectItem>
                        <SelectItem value="ba">BA</SelectItem>
                        <SelectItem value="llb">LLB / Law</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Interested College</label>
                    <Input
                      placeholder="College name (optional)"
                      value={formData.interestedCollege}
                      onChange={(e) => setFormData({ ...formData, interestedCollege: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Qualification</label>
                    <Select
                      value={formData.qualification}
                      onValueChange={(value) => setFormData({ ...formData, qualification: value })}
                    >
                      <SelectTrigger><SelectValue placeholder="Current qualification" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12th">12th Class</SelectItem>
                        <SelectItem value="diploma">Diploma</SelectItem>
                        <SelectItem value="graduate">Graduate</SelectItem>
                        <SelectItem value="postgraduate">Post Graduate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Preferred Mode</label>
                  <Select
                    value={formData.preferredMode}
                    onValueChange={(value) => setFormData({ ...formData, preferredMode: value })}
                  >
                    <SelectTrigger><SelectValue placeholder="Select mode" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="online">Online</SelectItem>
                      <SelectItem value="offline">Offline / Campus Visit</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Additional Message</label>
                  <Textarea
                    placeholder="Any specific questions or requirements..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" variant="gradient">
                  Submit Inquiry
                </Button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-bold text-neutral-900 mb-4">What You&apos;ll Get</h3>
              <div className="space-y-4">
                {benefits.map((benefit) => (
                  <div key={benefit.title} className="flex gap-3">
                    <div className="text-2xl">{benefit.icon}</div>
                    <div>
                      <h4 className="font-medium text-neutral-900">{benefit.title}</h4>
                      <p className="text-sm text-neutral-500">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-secondary-50 to-secondary-100/50">
              <h3 className="text-lg font-bold text-neutral-900 mb-2">Need Instant Help?</h3>
              <p className="text-neutral-600 mb-4 text-sm">
                Chat with our AI assistant for quick answers.
              </p>
              <div className="space-y-2">
                <Button className="w-full" variant="secondary">💬 Start Live Chat</Button>
                <Button className="w-full" variant="outline">📱 WhatsApp Us</Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-bold text-neutral-900 mb-4">Why Trust Us?</h3>
              <div className="space-y-3 text-sm text-neutral-600">
                <p>✓ 5M+ students helped</p>
                <p>✓ 10,000+ colleges partner</p>
                <p>✓ 98% satisfaction rate</p>
                <p>✓ Free for students</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}