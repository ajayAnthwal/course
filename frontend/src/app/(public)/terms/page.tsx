"use client";

import { Badge } from "@/components/ui";
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-0">Legal</Badge>
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-xl text-primary-200 max-w-2xl">
            Please read these terms carefully before using our platform. By using EduPortal, you agree to these terms.
          </p>
          <p className="text-sm text-primary-300 mt-4">Last updated: April 2024</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">1. Acceptance of Terms</h2>
            <div className="space-y-4 text-neutral-600">
              <p>By accessing and using EduPortal (&quot;the Platform&quot;), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, you should not use our services.</p>
              <p>These Terms of Service constitute a legally binding agreement between you (&quot;User&quot;) and EduPortal Technologies Pvt Ltd (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;).</p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">2. Description of Service</h2>
            <div className="space-y-4 text-neutral-600">
              <p>EduPortal provides an online platform that enables students to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Search and browse colleges, courses, and entrance exams</li>
                <li>Compare colleges on various parameters</li>
                <li>Use college and rank predictor tools</li>
                <li>Submit inquiries and application forms to colleges</li>
                <li>Read and write reviews about colleges</li>
                <li>Access educational content, blogs, and news</li>
                <li>Chat with AI assistant for instant queries</li>
                <li>Connect with education counselors</li>
              </ul>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">3. User Accounts and Registration</h2>
            <div className="space-y-4 text-neutral-600">
              <p>To access certain features, you may need to create an account. You agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate, current, and complete information during registration</li>
                <li>Maintain and promptly update your account information</li>
                <li>Keep your password secure and confidential</li>
                <li>Accept responsibility for all activities that occur under your account</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
                <li>Be at least 13 years of age to create an account</li>
              </ul>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">4. User Conduct</h2>
            <div className="space-y-4 text-neutral-600">
              <p>You agree NOT to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Violate any applicable laws, regulations, or third-party rights</li>
                <li>Upload or transmit viruses, malware, or other harmful code</li>
                <li>Attempt to gain unauthorized access to any part of the platform</li>
                <li>Interfere with or disrupt the platform&apos;s functionality</li>
                <li>Collect or store personal data about other users without consent</li>
                <li>Post false, misleading, or defamatory content</li>
                <li>Impersonate any person or entity</li>
                <li>Use the platform for any illegal or unauthorized purpose</li>
              </ul>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">5. Content and Intellectual Property</h2>
            <div className="space-y-4 text-neutral-600">
              <p><strong>User-Generated Content:</strong> You retain ownership of content you submit to the platform (reviews, comments, questions). By submitting content, you grant us a worldwide, royalty-free license to use, display, and distribute such content.</p>
              <p><strong>Platform Content:</strong> All content on EduPortal, including text, graphics, logos, and software, is the property of EduPortal or its licensors and is protected by copyright and other intellectual property laws.</p>
              <p>You may not copy, modify, distribute, sell, or lease any part of our platform without prior written consent.</p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">6. College Information and Disclaimers</h2>
            <div className="space-y-4 text-neutral-600">
              <p>While we strive to provide accurate and up-to-date information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>We do not guarantee the accuracy, completeness, or reliability of college information</li>
                <li>College fees, rankings, and admission criteria may change without notice</li>
                <li>Placement statistics are based on historical data and may vary</li>
                <li>We recommend verifying all information directly with the college</li>
                <li>College rankings on our platform are based on multiple factors and may differ from other rankings</li>
              </ul>
              <p className="mt-4">We are not responsible for any decisions made based on information from our platform. Always verify with official college sources.</p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">7. Third-Party Services and Links</h2>
            <div className="space-y-4 text-neutral-600">
              <p>Our platform may contain links to third-party websites, services, or college portals. We are not responsible for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The content, accuracy, or practices of third-party websites</li>
                <li>Products or services offered by third parties</li>
                <li>Any damage or loss caused by third-party services</li>
              </ul>
              <p className="mt-4">Your interactions with third-party websites are governed by their respective terms and privacy policies.</p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">8. Premium Services and Payments</h2>
            <div className="space-y-4 text-neutral-600">
              <p>Some features on EduPortal require payment:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Prices are listed in Indian Rupees (INR) unless otherwise specified</li>
                <li>Payments are processed through secure third-party payment gateways</li>
                <li>We do not store your payment card details</li>
                <li>Premium plans are non-refundable unless specified</li>
                <li>Subscription renewals occur automatically unless cancelled</li>
                <li>You can cancel premium subscriptions at any time</li>
              </ul>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">9. Limitation of Liability</h2>
            <div className="space-y-4 text-neutral-600">
              <p>EduPortal shall not be liable for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Any indirect, incidental, special, consequential, or punitive damages</li>
                <li>Loss of profits, data, use, goodwill, or other intangible losses</li>
                <li>Errors or omissions in content</li>
                <li>Service interruptions or technical problems</li>
                <li>Decisions made based on information from the platform</li>
                <li>Actions of colleges or third parties</li>
              </ul>
              <p className="mt-4">Our total liability shall not exceed the amount paid by you, if any, for using our services.</p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">10. Indemnification</h2>
            <div className="space-y-4 text-neutral-600">
              <p>You agree to indemnify, defend, and hold harmless EduPortal and its officers, directors, employees, and agents from any claims, damages, losses, liabilities, costs, or expenses arising out of:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your use of the platform</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any third-party rights</li>
                <li>Content you submit to the platform</li>
              </ul>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">11. Termination</h2>
            <div className="space-y-4 text-neutral-600">
              <p>We may terminate or suspend your account and access to the platform:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>For violating these Terms of Service</li>
                <li>For illegal or unauthorized use</li>
                <li>At our sole discretion, with or without notice</li>
              </ul>
              <p className="mt-4">You may also terminate your account at any time by contacting us or using account deletion features.</p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">12. Governing Law</h2>
            <div className="space-y-4 text-neutral-600">
              <p>These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of courts in Bangalore, Karnataka, India.</p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">13. Changes to Terms</h2>
            <div className="space-y-4 text-neutral-600">
              <p>We reserve the right to modify these Terms at any time. We will notify users of material changes by posting the updated terms on this page. Your continued use of the platform after such changes constitutes acceptance of the new terms.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">14. Contact Information</h2>
            <div className="space-y-4 text-neutral-600">
              <p>For questions about these Terms of Service, please contact us:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Email:</strong> legal@eduportal.com</li>
                <li><strong>Phone:</strong> +91 1234567890</li>
                <li><strong>Address:</strong> EduPortal Technologies Pvt Ltd, Bangalore, Karnataka</li>
              </ul>
            </div>
          </section>
        </div>

        <div className="mt-8 text-center text-neutral-500 text-sm">
          <p>© 2024 EduPortal. All rights reserved.</p>
          <div className="flex gap-4 justify-center mt-4">
            <Link href="/privacy" className="text-primary-600 hover:underline">Privacy Policy</Link>
            <Link href="/faq" className="text-primary-600 hover:underline">FAQ</Link>
            <Link href="/contact" className="text-primary-600 hover:underline">Contact</Link>
          </div>
        </div>
      </div>
    </div>
  );
}