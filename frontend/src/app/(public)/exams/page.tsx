"use client";

import Link from "next/link";
import { Button, Badge, Card, CardContent } from "@/components/ui";
import { cn } from "@/lib/utils";

const exams = [
  {
    name: "JEE Main",
    fullName: "Joint Entrance Examination Main",
    category: "Engineering",
    level: "National",
    conductingBody: "NTA",
    mode: "Computer Based",
    frequency: "Twice a year",
    eligibility: "12th Pass with PCM",
    registrationDate: "Nov - Dec 2025",
    examDate: "Jan & Apr 2026",
    applicants: "12 Lakh+",
    icon: "📐",
    color: "from-blue-500 to-indigo-600",
    popular: true,
  },
  {
    name: "JEE Advanced",
    fullName: "Joint Entrance Examination Advanced",
    category: "Engineering",
    level: "National",
    conductingBody: "IITs",
    mode: "Computer Based",
    frequency: "Once a year",
    eligibility: "JEE Main Qualified",
    registrationDate: "May 2026",
    examDate: "Jun 2026",
    applicants: "2 Lakh+",
    icon: "🏆",
    color: "from-amber-500 to-orange-600",
    popular: true,
  },
  {
    name: "NEET",
    fullName: "National Eligibility cum Entrance Test",
    category: "Medical",
    level: "National",
    conductingBody: "NTA",
    mode: "Pen & Paper",
    frequency: "Once a year",
    eligibility: "12th Pass with PCB",
    registrationDate: "Dec 2025 - Jan 2026",
    examDate: "May 2026",
    applicants: "20 Lakh+",
    icon: "🩺",
    color: "from-rose-500 to-pink-600",
    popular: true,
  },
  {
    name: "CAT",
    fullName: "Common Admission Test",
    category: "Management",
    level: "National",
    conductingBody: "IIMs",
    mode: "Computer Based",
    frequency: "Once a year",
    eligibility: "Graduate",
    registrationDate: "Aug - Sep 2026",
    examDate: "Nov 2026",
    applicants: "3 Lakh+",
    icon: "📊",
    color: "from-emerald-500 to-teal-600",
    popular: true,
  },
  {
    name: "GATE",
    fullName: "Graduate Aptitude Test in Engineering",
    category: "Engineering",
    level: "National",
    conductingBody: "IITs",
    mode: "Computer Based",
    frequency: "Once a year",
    eligibility: "Graduate in Engineering",
    registrationDate: "Aug - Oct 2026",
    examDate: "Feb 2027",
    applicants: "9 Lakh+",
    icon: "⚙️",
    color: "from-purple-500 to-violet-600",
    popular: false,
  },
  {
    name: "CUET",
    fullName: "Common University Entrance Test",
    category: "UG Admissions",
    level: "National",
    conductingBody: "NTA",
    mode: "Computer Based",
    frequency: "Once a year",
    eligibility: "12th Pass",
    registrationDate: "Feb - Mar 2026",
    examDate: "May 2026",
    applicants: "15 Lakh+",
    icon: "🎓",
    color: "from-cyan-500 to-blue-600",
    popular: false,
  },
  {
    name: "CLAT",
    fullName: "Common Law Admission Test",
    category: "Law",
    level: "National",
    conductingBody: "Consortium of NLUs",
    mode: "Computer Based",
    frequency: "Once a year",
    eligibility: "12th Pass",
    registrationDate: "Jul - Nov 2026",
    examDate: "Dec 2026",
    applicants: "75,000+",
    icon: "⚖️",
    color: "from-slate-500 to-slate-700",
    popular: false,
  },
  {
    name: "BITSAT",
    fullName: "BITS Admission Test",
    category: "Engineering",
    level: "University",
    conductingBody: "BITS Pilani",
    mode: "Computer Based",
    frequency: "Once a year",
    eligibility: "12th Pass with PCM",
    registrationDate: "Jan - Mar 2026",
    examDate: "May - Jun 2026",
    applicants: "2 Lakh+",
    icon: "🔬",
    color: "from-teal-500 to-emerald-600",
    popular: false,
  },
];

export default function ExamsPage() {
  return (
    <div className="bg-neutral-50 min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-r from-accent-900 via-accent-800 to-amber-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Badge className="mb-3 bg-white/10 text-white border-white/20">Entrance Exams</Badge>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
            Entrance Exams Guide
          </h1>
          <p className="text-accent-200/80 max-w-xl">
            Complete information about top entrance exams in India. Get dates, eligibility, syllabus, and preparation tips.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Popular Exams */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
            <span className="text-accent-500">🔥</span> Popular Exams
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {exams.filter((e) => e.popular).map((exam) => (
              <Card key={exam.name} hover className="group cursor-pointer overflow-hidden">
                <div className={cn("h-2 bg-gradient-to-r", exam.color)} />
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className={cn("w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300", exam.color)}>
                      {exam.icon}
                    </div>
                    <Badge variant="primary" size="sm">{exam.level}</Badge>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-0.5">{exam.name}</h3>
                  <p className="text-xs text-neutral-500 mb-4">{exam.fullName}</p>

                  <div className="space-y-2.5 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-400">Conducted by</span>
                      <span className="font-medium text-neutral-700">{exam.conductingBody}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-400">Mode</span>
                      <span className="font-medium text-neutral-700">{exam.mode}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-400">Exam Date</span>
                      <span className="font-medium text-primary-600">{exam.examDate}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-400">Applicants</span>
                      <span className="font-medium text-neutral-700">{exam.applicants}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-neutral-100">
                    <Link href="#" className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">
                      View Details →
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Exams */}
        <div>
          <h2 className="text-xl font-bold text-neutral-900 mb-6">All Entrance Exams</h2>
          <div className="space-y-4">
            {exams.map((exam) => (
              <Card key={exam.name} hover className="group cursor-pointer">
                <CardContent className="p-5">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className={cn("w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform duration-300", exam.color)}>
                      {exam.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-neutral-900 group-hover:text-primary-600 transition-colors">{exam.name}</h3>
                        <Badge variant="outline" size="sm">{exam.category}</Badge>
                        {exam.popular && <Badge variant="warning" size="sm">Popular</Badge>}
                      </div>
                      <p className="text-sm text-neutral-500 mb-2">{exam.fullName}</p>
                      <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-neutral-500">
                        <span>📋 {exam.conductingBody}</span>
                        <span>💻 {exam.mode}</span>
                        <span>📅 {exam.frequency}</span>
                        <span>👥 {exam.applicants}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <div className="text-right">
                        <p className="text-xs text-neutral-400">Exam Date</p>
                        <p className="text-sm font-semibold text-primary-600">{exam.examDate}</p>
                      </div>
                      <Button size="sm" variant="outline">View Details</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
