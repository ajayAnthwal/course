"use client";

import { Badge, Button, Card } from "@/components/ui";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  const stats = [
    { value: "10,000+", label: "Colleges Listed" },
    { value: "5M+", label: "Students Helped" },
    { value: "500+", label: "Expert Counselors" },
    { value: "98%", label: "Satisfaction Rate" },
  ];

  const team = [
    { name: "Dr. Rajesh Kumar", role: "CEO & Founder", icon: "👨‍💼" },
    { name: "Priya Sharma", role: "Chief Operating Officer", icon: "👩‍💼" },
    { name: "Amit Patel", role: "Head of Technology", icon: "👨‍💻" },
    { name: "Sneha Gupta", role: "Head of Counseling", icon: "👩‍🏫" },
  ];

  const values = [
    { title: "Student First", desc: "Every decision we make prioritizes the best interests of students.", icon: "🎯" },
    { title: "Transparency", desc: "We provide honest, unbiased information to help students make informed choices.", icon: "🔍" },
    { title: "Innovation", desc: "We continuously improve our platform with cutting-edge technology.", icon: "💡" },
    { title: "Excellence", desc: "We strive for the highest quality in everything we do.", icon: "⭐" },
  ];

  const milestones = [
    { year: "2015", title: "Founded", desc: "Started with a vision to simplify college admissions" },
    { year: "2018", title: "1M Users", desc: "Reached our first million students on the platform" },
    { year: "2020", title: "50 States", desc: "Expanded operations across all states in India" },
    { year: "2023", title: "Series B Funding", desc: "Raised $50M to accelerate growth and innovation" },
    { year: "2024", title: "5M+ Students", desc: "Helped over 5 million students find their dream college" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-0">About Us</Badge>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">
              Empowering Students to Find Their Dream College
            </h1>
            <p className="text-xl text-primary-100 leading-relaxed">
              We are on a mission to make quality education accessible to every student in India by providing comprehensive information, expert guidance, and innovative tools.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">{stat.value}</div>
                <div className="text-neutral-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">Our Story</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-6 tracking-tight">
                From a Small Start to India&apos;s Leading Education Platform
              </h2>
              <div className="space-y-4 text-neutral-600 leading-relaxed">
                <p>
                  Founded in 2015, EduPortal started with a simple idea: make college admissions stress-free for every student in India. What began as a small team with a big vision has grown into the country&apos;s most trusted education portal.
                </p>
                <p>
                  Today, we help over 5 million students annually find their perfect college through our comprehensive database, AI-powered tools, and expert counseling services. We partner with 10,000+ colleges and universities to bring the best opportunities directly to students.
                </p>
                <p>
                  Our team of 500+ education experts works around the clock to ensure every student gets personalized guidance tailored to their unique needs and aspirations.
                </p>
              </div>
              <div className="mt-8 flex gap-4">
                <Link href="/colleges">
                  <Button variant="gradient">Explore Colleges</Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline">Get in Touch</Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 rounded-3xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                    <div className="text-4xl mb-2">🎓</div>
                    <div className="text-2xl font-bold text-primary-600">10K+</div>
                    <div className="text-sm text-neutral-500">Colleges</div>
                  </div>
                  <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                    <div className="text-4xl mb-2">👥</div>
                    <div className="text-2xl font-bold text-primary-600">5M+</div>
                    <div className="text-sm text-neutral-500">Students</div>
                  </div>
                  <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                    <div className="text-4xl mb-2">🏆</div>
                    <div className="text-2xl font-bold text-primary-600">98%</div>
                    <div className="text-sm text-neutral-500">Satisfaction</div>
                  </div>
                  <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                    <div className="text-4xl mb-2">⭐</div>
                    <div className="text-2xl font-bold text-primary-600">4.8</div>
                    <div className="text-sm text-neutral-500">Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center text-3xl mb-6">🎯</div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Our Mission</h3>
              <p className="text-neutral-600 leading-relaxed">
                To democratize access to quality education by providing transparent, comprehensive, and personalized guidance to every student in India, helping them find the college that best fits their aspirations and potential.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-16 h-16 rounded-2xl bg-secondary-100 flex items-center justify-center text-3xl mb-6">👁️</div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Our Vision</h3>
              <p className="text-neutral-600 leading-relaxed">
                To become the most trusted companion for every Indian student on their education journey, ensuring that no student misses out on their dream college due to lack of information or guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Our Values</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
              What Drives Us Forward
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center p-8 rounded-2xl bg-neutral-50 hover:bg-primary-50 transition-colors">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">{value.title}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Our Journey</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
              Milestones That Define Us
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary-200 hidden md:block" />
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className={`flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="flex-1 md:text-right">
                    <div className="bg-white rounded-2xl p-6 shadow-lg inline-block">
                      <div className="text-2xl font-bold text-primary-600 mb-2">{milestone.year}</div>
                      <h4 className="text-lg font-semibold text-neutral-900 mb-1">{milestone.title}</h4>
                      <p className="text-neutral-600 text-sm">{milestone.desc}</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-primary-600 border-4 border-white shadow-lg hidden md:block" />
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Leadership</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
              Meet Our Team
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center text-5xl">
                  {member.icon}
                </div>
                <h4 className="text-xl font-semibold text-neutral-900 mb-1">{member.name}</h4>
                <p className="text-neutral-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Find Your Dream College?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join millions of students who trusted EduPortal for their education journey.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/colleges">
              <Button variant="secondary" size="lg">Browse Colleges</Button>
            </Link>
            <Link href="/register">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary-600">
                Create Free Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}