"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Head from "next/head";
import { useExamBySlug } from "@/features/exams";
import { Card, CardContent, Badge, Button, LoadingPage, Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui";
import { cn } from "@/lib/utils";

const levelColors: Record<string, string> = {
  national: "from-blue-500 to-indigo-600",
  state: "from-emerald-500 to-teal-600",
  university: "from-purple-500 to-violet-600",
};

const modeLabels: Record<string, string> = {
  "computer-based": "Computer Based Test (CBT)",
  "pen-paper": "Pen & Paper (OMR)",
  both: "Both CBT & Pen-Paper",
};

export default function ExamDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const { data, isLoading, isError } = useExamBySlug(slug);
  const exam = data?.data;

  if (isLoading) return <LoadingPage message="Loading exam details..." />;

  if (isError || !exam) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-neutral-100 flex items-center justify-center">
            <svg className="w-10 h-10 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">Exam Not Found</h2>
          <p className="text-neutral-500 mb-6">The exam you&apos;re looking for doesn&apos;t exist.</p>
          <Button onClick={() => router.push("/exams")}>Browse All Exams</Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{exam.name} - {exam.fullName} | EduPortal</title>
        <meta name="description" content={exam.description.slice(0, 160)} />
      </Head>

      <div className="bg-neutral-50 min-h-screen">
        {/* Hero */}
        <div className={cn("relative text-white overflow-hidden", `bg-gradient-to-br ${levelColors[exam.level] || levelColors.national}`)}>
          <div className="absolute inset-0">
            <div className="absolute -top-24 -right-24 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <nav className="flex items-center gap-2 text-sm text-white/50 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>›</span>
              <Link href="/exams" className="hover:text-white transition-colors">Exams</Link>
              <span>›</span>
              <span className="text-white/80 truncate max-w-[200px]">{exam.name}</span>
            </nav>

            <div className="flex flex-col lg:flex-row lg:items-end gap-8">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <Badge className="bg-white/15 text-white border-white/20">{exam.level.charAt(0).toUpperCase() + exam.level.slice(1)}</Badge>
                  <Badge className="bg-white/15 text-white border-white/20">{exam.category}</Badge>
                  {exam.featured && <Badge variant="warning">Popular</Badge>}
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-2">{exam.name}</h1>
                <p className="text-white/70 mb-4">{exam.fullName}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
                  <span className="flex items-center gap-1.5">📋 {exam.conductingBody}</span>
                  <span className="flex items-center gap-1.5">💻 {modeLabels[exam.mode] || exam.mode}</span>
                  <span className="flex items-center gap-1.5">📅 {exam.frequency}</span>
                </div>
              </div>

              <div className="flex gap-3 flex-wrap lg:flex-nowrap">
                <div className="glass-dark rounded-2xl px-5 py-4 text-center min-w-[100px]">
                  <p className="text-xl font-bold">{exam.applicants || "N/A"}</p>
                  <p className="text-[11px] text-white/50">Applicants</p>
                </div>
                {exam.totalMarks && (
                  <div className="glass-dark rounded-2xl px-5 py-4 text-center min-w-[100px]">
                    <p className="text-xl font-bold">{exam.totalMarks}</p>
                    <p className="text-[11px] text-white/50">Total Marks</p>
                  </div>
                )}
                {exam.duration && (
                  <div className="glass-dark rounded-2xl px-5 py-4 text-center min-w-[100px]">
                    <p className="text-xl font-bold">{exam.duration}</p>
                    <p className="text-[11px] text-white/50">Duration</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs defaultValue="overview">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="dates">Important Dates</TabsTrigger>
              <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
              <TabsTrigger value="pattern">Exam Pattern</TabsTrigger>
            </TabsList>

            {/* Overview */}
            <TabsContent value="overview">
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                      <span className="w-1 h-5 bg-primary-500 rounded-full" />About {exam.name}
                    </h2>
                    <p className="text-neutral-600 leading-relaxed whitespace-pre-line text-[15px]">{exam.description}</p>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card><CardContent className="p-5">
                    <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">Conducting Body</p>
                    <p className="text-base font-semibold text-neutral-900">{exam.conductingBody}</p>
                  </CardContent></Card>
                  <Card><CardContent className="p-5">
                    <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">Mode</p>
                    <p className="text-base font-semibold text-neutral-900">{modeLabels[exam.mode] || exam.mode}</p>
                  </CardContent></Card>
                  <Card><CardContent className="p-5">
                    <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">Frequency</p>
                    <p className="text-base font-semibold text-neutral-900">{exam.frequency}</p>
                  </CardContent></Card>
                </div>

                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                      <span className="w-1 h-5 bg-accent-500 rounded-full" />Eligibility
                    </h2>
                    <p className="text-neutral-600 leading-relaxed text-[15px]">{exam.eligibility}</p>
                  </CardContent>
                </Card>

                {exam.registrationFee?.amount > 0 && (
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                        <span className="w-1 h-5 bg-secondary-500 rounded-full" />Registration Fee
                      </h2>
                      <p className="text-2xl font-bold text-secondary-700">₹{exam.registrationFee.amount.toLocaleString("en-IN")}</p>
                    </CardContent>
                  </Card>
                )}

                {exam.languages?.length > 0 && (
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-lg font-semibold text-neutral-900 mb-4">Available Languages</h2>
                      <div className="flex flex-wrap gap-2">
                        {exam.languages.map((lang) => (
                          <Badge key={lang} variant="outline">{lang}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {exam.website && (
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-lg font-semibold text-neutral-900 mb-4">Official Website</h2>
                      <a href={exam.website} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        {exam.website.replace(/^https?:\/\//, "")} →
                      </a>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* Important Dates */}
            <TabsContent value="dates">
              {exam.importantDates?.length > 0 ? (
                <Card padding="none">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-neutral-100">
                          <th className="text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider px-6 py-4">Event</th>
                          <th className="text-right text-xs font-semibold text-neutral-500 uppercase tracking-wider px-6 py-4">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {exam.importantDates.map((item, i) => (
                          <tr key={i} className="border-b border-neutral-50 last:border-0 hover:bg-neutral-50/50 transition-colors">
                            <td className="px-6 py-4">
                              <p className="font-medium text-neutral-900 text-sm">{item.event}</p>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <Badge variant="primary" size="sm">{item.date}</Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              ) : (
                <Card><CardContent className="p-12 text-center">
                  <div className="text-4xl mb-3">📅</div>
                  <p className="text-neutral-500">Important dates will be announced soon.</p>
                </CardContent></Card>
              )}
            </TabsContent>

            {/* Syllabus */}
            <TabsContent value="syllabus">
              {exam.syllabus?.length > 0 ? (
                <div className="space-y-4">
                  {exam.syllabus.map((subject, i) => (
                    <Card key={i}>
                      <CardContent className="p-5">
                        <h3 className="font-semibold text-neutral-900 mb-3 flex items-center gap-2">
                          <span className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center text-sm font-bold text-primary-700">{i + 1}</span>
                          {subject.subject}
                        </h3>
                        <div className="flex flex-wrap gap-2 ml-10">
                          {subject.topics.map((topic) => (
                            <span key={topic} className="px-3 py-1.5 text-sm bg-neutral-50 text-neutral-700 rounded-lg border border-neutral-100">{topic}</span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card><CardContent className="p-12 text-center">
                  <div className="text-4xl mb-3">📚</div>
                  <p className="text-neutral-500">Syllabus details coming soon.</p>
                </CardContent></Card>
              )}
            </TabsContent>

            {/* Exam Pattern */}
            <TabsContent value="pattern">
              {exam.examPattern?.length > 0 ? (
                <Card padding="none">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-neutral-100">
                          <th className="text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider px-6 py-4">Section</th>
                          <th className="text-right text-xs font-semibold text-neutral-500 uppercase tracking-wider px-6 py-4">Questions</th>
                          <th className="text-right text-xs font-semibold text-neutral-500 uppercase tracking-wider px-6 py-4">Marks</th>
                          <th className="text-right text-xs font-semibold text-neutral-500 uppercase tracking-wider px-6 py-4">Duration</th>
                        </tr>
                      </thead>
                      <tbody>
                        {exam.examPattern.map((section, i) => (
                          <tr key={i} className="border-b border-neutral-50 last:border-0 hover:bg-neutral-50/50 transition-colors">
                            <td className="px-6 py-4"><p className="font-medium text-neutral-900 text-sm">{section.section}</p></td>
                            <td className="px-6 py-4 text-right text-sm text-neutral-700">{section.questions}</td>
                            <td className="px-6 py-4 text-right text-sm font-semibold text-neutral-900">{section.marks}</td>
                            <td className="px-6 py-4 text-right text-sm text-neutral-500">{section.duration}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              ) : (
                <Card><CardContent className="p-12 text-center">
                  <div className="text-4xl mb-3">📝</div>
                  <p className="text-neutral-500">Exam pattern details coming soon.</p>
                </CardContent></Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
