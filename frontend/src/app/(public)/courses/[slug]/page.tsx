"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Head from "next/head";
import { useCourseBySlug } from "@/features/courses";
import { Card, CardContent, Badge, Button, LoadingPage, Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui";
import { formatCurrency } from "@/lib/utils";

const levelLabels: Record<string, string> = {
  undergraduate: "Undergraduate",
  postgraduate: "Postgraduate",
  diploma: "Diploma",
  doctorate: "Doctorate",
  certificate: "Certificate",
};

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const { data, isLoading, isError } = useCourseBySlug(slug);
  const course = data?.data;

  if (isLoading) return <LoadingPage message="Loading course details..." />;

  if (isError || !course) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-neutral-100 flex items-center justify-center">
            <svg className="w-10 h-10 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">Course Not Found</h2>
          <p className="text-neutral-500 mb-6">The course you&apos;re looking for doesn&apos;t exist.</p>
          <Button onClick={() => router.push("/courses")}>Browse All Courses</Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{course.name} - Course Details | EduPortal</title>
        <meta name="description" content={course.description.slice(0, 160)} />
      </Head>

      <div className="bg-neutral-50 min-h-screen">
        {/* Hero */}
        <div className="relative bg-gradient-to-br from-secondary-950 via-secondary-900 to-secondary-800 text-white overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute -top-24 -right-24 w-[500px] h-[500px] bg-secondary-600/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-primary-500/10 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <nav className="flex items-center gap-2 text-sm text-secondary-300/60 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>›</span>
              <Link href="/courses" className="hover:text-white transition-colors">Courses</Link>
              <span>›</span>
              <span className="text-secondary-200 truncate max-w-[200px]">{course.name}</span>
            </nav>

            <div className="flex flex-col lg:flex-row lg:items-end gap-8">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <Badge variant="primary" className="bg-white/10 text-white border-white/20">
                    {levelLabels[course.level] || course.level}
                  </Badge>
                  {course.featured && <Badge variant="warning">Featured</Badge>}
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-3">{course.name}</h1>
                {course.shortName && <p className="text-secondary-200/70 mb-3">Also known as: {course.shortName}</p>}
                <div className="flex flex-wrap items-center gap-4 text-sm text-secondary-300/70">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                    {course.collegeCount || 0} Colleges
                  </span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex gap-3 flex-wrap lg:flex-nowrap">
                <div className="glass-dark rounded-2xl px-5 py-4 text-center min-w-[110px]">
                  <div className="flex items-center justify-center gap-1 mb-0.5">
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    <span className="text-xl font-bold">{course.rating}</span>
                  </div>
                  <p className="text-[11px] text-secondary-300">Rating</p>
                </div>
                {course.fees && (
                  <div className="glass-dark rounded-2xl px-5 py-4 text-center min-w-[130px]">
                    <p className="text-base font-bold">{formatCurrency(course.fees.min)}</p>
                    <p className="text-[11px] text-secondary-300">Starting fees/yr</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs defaultValue="overview">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
              <TabsTrigger value="careers">Careers</TabsTrigger>
              <TabsTrigger value="colleges">Colleges</TabsTrigger>
            </TabsList>

            {/* Overview */}
            <TabsContent value="overview">
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                      <span className="w-1 h-5 bg-primary-500 rounded-full" />About {course.name}
                    </h2>
                    <p className="text-neutral-600 leading-relaxed whitespace-pre-line text-[15px]">{course.description}</p>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card><CardContent className="p-5">
                    <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">Duration</p>
                    <p className="text-base font-semibold text-neutral-900">{course.duration}</p>
                  </CardContent></Card>
                  <Card><CardContent className="p-5">
                    <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">Level</p>
                    <p className="text-base font-semibold text-neutral-900">{levelLabels[course.level]}</p>
                  </CardContent></Card>
                  <Card><CardContent className="p-5">
                    <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">Category</p>
                    <p className="text-base font-semibold text-neutral-900">{course.category}</p>
                  </CardContent></Card>
                </div>

                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                      <span className="w-1 h-5 bg-accent-500 rounded-full" />Eligibility
                    </h2>
                    <p className="text-neutral-600 leading-relaxed text-[15px]">{course.eligibility}</p>
                  </CardContent>
                </Card>

                {course.admissionProcess && (
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                        <span className="w-1 h-5 bg-secondary-500 rounded-full" />Admission Process
                      </h2>
                      <p className="text-neutral-600 leading-relaxed text-[15px]">{course.admissionProcess}</p>
                    </CardContent>
                  </Card>
                )}

                {course.entranceExams?.length > 0 && (
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                        <span className="w-1 h-5 bg-primary-500 rounded-full" />Entrance Exams
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {course.entranceExams.map((exam) => (
                          <Badge key={exam} variant="primary" size="sm">{exam}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {course.specializations?.length > 0 && (
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                        <span className="w-1 h-5 bg-accent-500 rounded-full" />Specializations
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {course.specializations.map((spec) => (
                          <span key={spec} className="px-3.5 py-1.5 text-sm bg-accent-50 text-accent-700 rounded-lg border border-accent-100">{spec}</span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* Syllabus */}
            <TabsContent value="syllabus">
              {course.syllabus?.length > 0 ? (
                <div className="space-y-4">
                  {course.syllabus.map((sem, i) => (
                    <Card key={i}>
                      <CardContent className="p-5">
                        <h3 className="font-semibold text-neutral-900 mb-3">{sem.semester}</h3>
                        <div className="flex flex-wrap gap-2">
                          {sem.subjects.map((subject) => (
                            <span key={subject} className="px-3 py-1.5 text-sm bg-neutral-50 text-neutral-700 rounded-lg border border-neutral-100">{subject}</span>
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

            {/* Careers */}
            <TabsContent value="careers">
              <div className="space-y-6">
                {course.careerOpportunities?.length > 0 && (
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-lg font-semibold text-neutral-900 mb-4">Career Opportunities</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {course.careerOpportunities.map((career) => (
                          <div key={career} className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                            <div className="w-2 h-2 rounded-full bg-primary-500" />
                            <span className="text-sm font-medium text-neutral-800">{career}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {course.averageSalary && course.averageSalary.max > 0 && (
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-lg font-semibold text-neutral-900 mb-4">Average Salary Range</h2>
                      <div className="flex items-center gap-6">
                        <div>
                          <p className="text-xs text-neutral-400 uppercase">Minimum</p>
                          <p className="text-xl font-bold text-neutral-900">{formatCurrency(course.averageSalary.min)}/yr</p>
                        </div>
                        <div className="w-px h-10 bg-neutral-200" />
                        <div>
                          <p className="text-xs text-neutral-400 uppercase">Maximum</p>
                          <p className="text-xl font-bold text-primary-600">{formatCurrency(course.averageSalary.max)}/yr</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {course.topRecruiters?.length > 0 && (
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-lg font-semibold text-neutral-900 mb-4">Top Recruiters</h2>
                      <div className="flex flex-wrap gap-2">
                        {course.topRecruiters.map((r) => (
                          <Badge key={r} variant="outline">{r}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* Colleges */}
            <TabsContent value="colleges">
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="text-4xl mb-3">🏛️</div>
                  <p className="text-neutral-500 mb-4">{course.collegeCount || 0} colleges offer this course</p>
                  <Link href={`/colleges?course=${encodeURIComponent(course.name)}`}>
                    <Button>Browse Colleges Offering {course.name}</Button>
                  </Link>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Fees Table */}
          {course.fees && (
            <div className="mt-8">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                    <span className="w-1 h-5 bg-secondary-500 rounded-full" />Fee Structure
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                    <div>
                      <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Minimum</p>
                      <p className="text-2xl font-bold text-secondary-700">{formatCurrency(course.fees.min)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Maximum</p>
                      <p className="text-2xl font-bold text-secondary-700">{formatCurrency(course.fees.max)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Duration</p>
                      <p className="text-2xl font-bold text-secondary-700">{course.duration}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
