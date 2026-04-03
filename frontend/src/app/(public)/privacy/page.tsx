"use client";

import { Badge } from "@/components/ui";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-0">Legal</Badge>
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl text-primary-200 max-w-2xl">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <p className="text-sm text-primary-300 mt-4">Last updated: April 2024</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">1. Information We Collect</h2>
            <div className="space-y-4 text-neutral-600">
              <p>We collect information you provide directly to us, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Account Information:</strong> Name, email address, phone number, and profile details when you create an account</li>
                <li><strong>Educational Information:</strong> Academic qualifications, exam scores, preferred courses, and college preferences</li>
                <li><strong>Communication Data:</strong> Messages you send through our platform, feedback, and support inquiries</li>
                <li><strong>Usage Data:</strong> Pages visited, time spent, features used, and interactions on our platform</li>
                <li><strong>Device Information:</strong> IP address, browser type, device identifiers, and operating system</li>
              </ul>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">2. How We Use Your Information</h2>
            <div className="space-y-4 text-neutral-600">
              <p>We use the collected information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide personalized college recommendations and admission guidance</li>
                <li>Process your applications and communicate with colleges on your behalf</li>
                <li>Send you relevant updates about colleges, courses, and admission deadlines</li>
                <li>Improve our services and develop new features based on user feedback</li>
                <li>Protect against fraud, abuse, and ensure platform security</li>
                <li>Comply with legal obligations and resolve any disputes</li>
              </ul>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">3. Information Sharing</h2>
            <div className="space-y-4 text-neutral-600">
              <p>We may share your information with:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Colleges and Institutions:</strong> To process your applications and provide admission-related services</li>
                <li><strong>Service Providers:</strong> Third-party vendors who help us operate our platform (hosting, analytics, customer support)</li>
                <li><strong>Legal Requirements:</strong> When required by law, court order, or government regulations</li>
                <li><strong>Business Transfers:</strong> In case of merger, acquisition, or sale of company assets</li>
              </ul>
              <p className="mt-4">We <strong>never sell</strong> your personal information to third parties for marketing purposes.</p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">4. Data Security</h2>
            <div className="space-y-4 text-neutral-600">
              <p>We implement appropriate security measures to protect your information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Encryption of sensitive data using industry-standard protocols</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Access controls limiting employee access to personal information</li>
                <li>Secure data storage with regular backups</li>
              </ul>
              <p className="mt-4">While we strive to protect your information, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.</p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">5. Your Rights</h2>
            <div className="space-y-4 text-neutral-600">
              <p>You have the following rights regarding your personal information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal requirements)</li>
                <li><strong>Opt-out:</strong> Unsubscribe from promotional communications at any time</li>
                <li><strong>Data Portability:</strong> Request your data in a structured, machine-readable format</li>
              </ul>
              <p className="mt-4">To exercise these rights, contact us at <strong>privacy@eduportal.com</strong></p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">6. Cookies and Tracking Technologies</h2>
            <div className="space-y-4 text-neutral-600">
              <p>We use cookies and similar technologies to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Keep you logged in and remember your preferences</li>
                <li>Analyze site traffic and improve user experience</li>
                <li>Personalize content and recommendations</li>
                <li>Deliver relevant advertisements</li>
              </ul>
              <p className="mt-4">You can manage cookie preferences through your browser settings. However, disabling cookies may limit some features of our platform.</p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">7. Third-Party Links</h2>
            <div className="space-y-4 text-neutral-600">
              <p>Our platform may contain links to third-party websites, services, or applications. We are not responsible for the privacy practices of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.</p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">8. Children&apos;s Privacy</h2>
            <div className="space-y-4 text-neutral-600">
              <p>Our services are not intended for users under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.</p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">9. Changes to This Policy</h2>
            <div className="space-y-4 text-neutral-600">
              <p>We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the &quot;Last updated&quot; date. We encourage you to review this policy periodically.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">10. Contact Us</h2>
            <div className="space-y-4 text-neutral-600">
              <p>If you have any questions or concerns about this Privacy Policy, please contact us:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Email:</strong> privacy@eduportal.com</li>
                <li><strong>Phone:</strong> +91 1234567890</li>
                <li><strong>Address:</strong> EduPortal Technologies Pvt Ltd, Bangalore, Karnataka</li>
              </ul>
            </div>
          </section>
        </div>

        <div className="mt-8 text-center text-neutral-500 text-sm">
          <p>© 2024 EduPortal. All rights reserved.</p>
          <div className="flex gap-4 justify-center mt-4">
            <Link href="/terms" className="text-primary-600 hover:underline">Terms of Service</Link>
            <Link href="/faq" className="text-primary-600 hover:underline">FAQ</Link>
            <Link href="/contact" className="text-primary-600 hover:underline">Contact</Link>
          </div>
        </div>
      </div>
    </div>
  );
}