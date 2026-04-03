"use client";

import { useState } from "react";
import { Badge, Button, Card, Input } from "@/components/ui";
import Link from "next/link";

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  { question: "How do I apply to colleges through EduPortal?", answer: "You can browse colleges on our platform, use filters to find suitable options, and directly apply through the college's official page. Our application process is simple - just fill in your details and our team will guide you through the rest.", category: "Admissions" },
  { question: "Is EduPortal free for students?", answer: "Yes! Our basic services are completely free for students. We offer premium plans with additional benefits like instant updates, priority counseling, and verified admission assistance.", category: "General" },
  { question: "How accurate are the college rankings?", answer: "Our rankings are based on multiple factors including NIRF data, placement records, student reviews, infrastructure, and faculty quality. We strive to provide the most accurate and up-to-date information.", category: "Colleges" },
  { question: "What courses can I find on EduPortal?", answer: "We have information on 500+ courses including Engineering (B.Tech, M.Tech), Management (MBA, BBA), Medical (MBBS, MD), Science (B.Sc, M.Sc), Commerce (B.Com, M.Com), Arts (BA, MA), Law (LLB, LLM), and many more.", category: "Courses" },
  { question: "How does the College Predictor work?", answer: "Our AI-powered college predictor uses your exam rank, category, and preferences to suggest colleges where you're likely to get admission. It's based on historical cutoff data and current trends.", category: "Tools" },
  { question: "What documents do I need for college admission?", answer: "Common documents required include: Marksheets (10th, 12th), Rank Card, Category Certificate (if applicable), Income Certificate, Passport size photos, ID proof, and college-specific documents. Check individual college pages for exact requirements.", category: "Admissions" },
  { question: "How do I get admission guidance?", answer: "You can book a free counseling session through our contact form, call our helpline, or chat with our AI assistant. Our expert counselors will help you find the best colleges based on your profile and preferences.", category: "Counseling" },
  { question: "Are the college fees accurate?", answer: "We update fees regularly based on information from college official websites. However, fees may change, so we recommend checking the official college website for the latest fee structure.", category: "Colleges" },
  { question: "How do I compare colleges?", answer: "Use our Compare feature to add up to 4 colleges and compare them on parameters like fees, placements, ratings, infrastructure, and more. Visit any college page and click the 'Compare' button.", category: "Tools" },
  { question: "What is the refund policy for paid services?", answer: "We offer a 7-day refund policy for premium services if you're not satisfied. Contact our support team for assistance.", category: "Payments" },
  { question: "How do I write a college review?", answer: "Visit the college's page and scroll to the reviews section. Click 'Write a Review' and share your honest experience about academics, campus life, placements, and facilities.", category: "Reviews" },
  { question: "Can I get admission to colleges without entrance exams?", answer: "Some colleges offer direct admission based on 12th marks. We have a separate filter for 'Merit-Based' admissions. Check individual college pages for eligibility criteria.", category: "Admissions" },
];

const categories = ["All", "Admissions", "General", "Colleges", "Courses", "Tools", "Counseling", "Payments", "Reviews"];

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFAQs = faqs.filter((faq) => {
    const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-0">Help</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-primary-200 max-w-2xl mb-8">
            Find answers to common questions about admissions, colleges, courses, and our services.
          </p>
          <div className="max-w-xl">
            <Input
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 bg-white text-neutral-900"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === cat
                  ? "bg-primary-600 text-white"
                  : "bg-white text-neutral-600 hover:bg-primary-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 text-center">
            <div className="text-4xl mb-2">📚</div>
            <div className="text-3xl font-bold text-primary-600">{faqs.length}</div>
            <div className="text-neutral-600">Questions Answered</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-4xl mb-2">👥</div>
            <div className="text-3xl font-bold text-primary-600">5M+</div>
            <div className="text-neutral-600">Students Helped</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-4xl mb-2">🏫</div>
            <div className="text-3xl font-bold text-primary-600">10K+</div>
            <div className="text-neutral-600">Colleges Listed</div>
          </Card>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {filteredFAQs.map((faq, index) => (
            <details key={index} className="group bg-white rounded-2xl shadow-sm overflow-hidden">
              <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-neutral-50 transition-colors">
                <div className="flex items-center gap-4">
                  <Badge variant="secondary" size="sm">{faq.category}</Badge>
                  <span className="font-medium text-neutral-900 text-lg">{faq.question}</span>
                </div>
                <span className="ml-4 text-primary-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 pb-6">
                <p className="text-neutral-600 leading-relaxed pl-16">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>

        {filteredFAQs.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">No results found</h3>
            <p className="text-neutral-600 mb-6">Try different keywords or browse all categories</p>
            <Button onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }} variant="outline">
              Clear Filters
            </Button>
          </div>
        )}

        {/* Still Have Questions */}
        <div className="mt-16 bg-gradient-to-br from-primary-50 to-primary-100/50 rounded-2xl p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">Still have questions?</h2>
              <p className="text-neutral-600 mb-6">
                Can&apos;t find what you&apos;re looking for? Our support team is here to help you.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-green-500">✓</span>
                  <span className="text-neutral-600">Response within 24 hours</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-green-500">✓</span>
                  <span className="text-neutral-600">Expert guidance provided</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-green-500">✓</span>
                  <span className="text-neutral-600">Free for students</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Link href="/contact">
                <Button className="w-full" size="lg" variant="gradient">Contact Us</Button>
              </Link>
              <Button className="w-full" size="lg" variant="outline">💬 Chat with AI</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}