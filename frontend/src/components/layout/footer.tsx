import Link from "next/link";

const footerLinks = {
  explore: [
    { label: "Top Colleges", href: "/colleges?featured=true" },
    { label: "Colleges by City", href: "/cities" },
    { label: "Government Colleges", href: "/colleges?type=government" },
    { label: "Private Colleges", href: "/colleges?type=private" },
    { label: "Compare Colleges", href: "/compare" },
  ],
  courses: [
    { label: "B.Tech", href: "/courses" },
    { label: "MBA", href: "/courses" },
    { label: "MBBS", href: "/courses" },
    { label: "BBA", href: "/courses" },
    { label: "BCA", href: "/courses" },
  ],
  exams: [
    { label: "JEE Main", href: "/exams" },
    { label: "NEET", href: "/exams" },
    { label: "CAT", href: "/exams" },
    { label: "GATE", href: "/exams" },
    { label: "CUET", href: "/exams" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "/news" },
    { label: "FAQ", href: "/faq" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "#" },
    { label: "Disclaimer", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-400">
      {/* Newsletter */}
      <div className="border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-1">Stay updated with EduPortal</h3>
              <p className="text-neutral-400 text-sm">Get the latest college updates, exam dates, and admission news.</p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-72 h-11 px-4 rounded-xl bg-neutral-900 border border-neutral-700 text-white placeholder:text-neutral-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <button className="h-11 px-6 bg-primary-600 hover:bg-primary-500 text-white text-sm font-semibold rounded-xl transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-sm">EP</span>
              </div>
              <span className="text-lg font-bold text-white">EduPortal</span>
            </Link>
            <p className="text-sm text-neutral-400 leading-relaxed mb-6">
              India&apos;s most trusted education platform helping millions of students find the right college and course.
            </p>
            <div className="flex items-center gap-3">
              {[
                { name: "Twitter", icon: "𝕏" },
                { name: "LinkedIn", icon: "in" },
                { name: "YouTube", icon: "▶" },
                { name: "Instagram", icon: "📷" },
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-600 hover:bg-neutral-800 transition-all text-sm"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-500">
            © {new Date().getFullYear()} EduPortal. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
