"use client";

import { useState } from "react";
import { Badge, Button, Card, Input, Textarea } from "@/components/ui";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    queryType: "",
    college: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  const contactInfo = [
    { icon: "📞", title: "Phone", details: ["+91 1234567890", "+91 0987654321"], desc: "Mon-Sat: 9AM - 7PM" },
    { icon: "📧", title: "Email", details: ["info@eduportal.com", "support@eduportal.com"], desc: "We reply within 24 hours" },
    { icon: "📍", title: "Address", details: ["EduPortal Technologies Pvt Ltd", "Bangalore, Karnataka"], desc: "Visit by appointment" },
  ];

  const faqs = [
    { q: "How do I apply to colleges through EduPortal?", a: "You can browse colleges, use our predictor tools, and directly apply through the college's official page on our platform." },
    { q: "Is there any fee for using EduPortal?", a: "No, our basic services are completely free for students. We also offer premium plans for additional benefits." },
    { q: "How can I get admission guidance?", a: "You can book a free counseling session through our contact form or call our helpline." },
  ];

  if (submitted) {
    return (
      <div className="min-h-screen py-20 bg-neutral-50">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="bg-white rounded-3xl p-12 shadow-xl">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center text-5xl">
              ✓
            </div>
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Thank You!</h2>
            <p className="text-neutral-600 mb-8">
              Your message has been received. Our team will get back to you within 24 hours.
            </p>
            <Button onClick={() => setSubmitted(false)} variant="gradient">
              Send Another Message
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-0">Contact Us</Badge>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">
              Get in Touch with Our Team
            </h1>
            <p className="text-xl text-primary-100">
              Have questions? We&apos;re here to help you find your dream college.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 -mt-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {contactInfo.map((info) => (
              <div key={info.title} className="bg-white rounded-2xl p-8 shadow-xl">
                <div className="w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center text-2xl mb-4">
                  {info.icon}
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">{info.title}</h3>
                {info.details.map((detail) => (
                  <p key={detail} className="text-neutral-600">{detail}</p>
                ))}
                <p className="text-sm text-neutral-500 mt-2">{info.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <div>
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-neutral-900 mb-6">Send us a Message</h2>
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
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Phone Number</label>
                      <Input
                        type="tel"
                        placeholder="+91 9876543210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Query Type</label>
                      <Select
                        value={formData.queryType}
                        onValueChange={(value) => setFormData({ ...formData, queryType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select query type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admission">Admission Query</SelectItem>
                          <SelectItem value="college">College Information</SelectItem>
                          <SelectItem value="course">Course Guidance</SelectItem>
                          <SelectItem value="technical">Technical Support</SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Interested College/Course</label>
                    <Input
                      placeholder="e.g., IIT Bombay - BTech"
                      value={formData.college}
                      onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Message *</label>
                    <Textarea
                      placeholder="Tell us more about your query..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg" disabled={loading}>
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>
            </div>

            {/* FAQ & Additional Info */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-neutral-900 mb-6">Quick Answers</h3>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <details key={index} className="group">
                      <summary className="flex items-center justify-between cursor-pointer p-4 rounded-xl bg-neutral-50 hover:bg-neutral-100 transition-colors">
                        <span className="font-medium text-neutral-900">{faq.q}</span>
                        <span className="ml-4 text-primary-600 group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <div className="mt-2 p-4 text-neutral-600">{faq.a}</div>
                    </details>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-neutral-900 mb-4">Need Instant Help?</h3>
                <p className="text-neutral-600 mb-6">
                  Chat with our AI assistant for quick answers to common questions.
                </p>
                <div className="flex gap-4">
                  <Button variant="gradient" className="flex-1">
                    💬 Start Chat
                  </Button>
                  <Button variant="outline" className="flex-1">
                    📱 WhatsApp
                  </Button>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-neutral-900 mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  {["Facebook", "Twitter", "Instagram", "LinkedIn"].map((social) => (
                    <button
                      key={social}
                      className="w-10 h-10 rounded-xl bg-neutral-100 hover:bg-primary-100 flex items-center justify-center text-neutral-600 hover:text-primary-600 transition-colors"
                    >
                      {social[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900">Visit Our Office</h2>
            <p className="text-neutral-600 mt-2">We welcome you to visit our headquarters</p>
          </div>
          <div className="bg-neutral-100 rounded-3xl h-96 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🗺️</div>
              <p className="text-neutral-600">Map will be integrated here</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}