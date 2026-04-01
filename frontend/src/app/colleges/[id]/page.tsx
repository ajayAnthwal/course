"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useCollege, useCollegeBySlug } from "@/features/colleges";
import { LeadForm } from "@/features/leads";
import { Card, CardContent, Badge, Button, LoadingPage, Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui";
import { formatCurrency, formatDate } from "@/lib/utils";

const typeColors: Record<string, "success" | "primary" | "warning" | "secondary"> = {
  government: "success",
  private: "primary",
  deemed: "warning",
  autonomous: "secondary",
};

const levelLabels: Record<string, string> = {
  undergraduate: "UG",
  postgraduate: "PG",
  diploma: "Diploma",
  doctorate: "PhD",
};

export default function CollegeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const collegeId = params.id as string;

  const isObjectId = /^[a-f\d]{24}$/i.test(collegeId);
  const byId = useCollege(isObjectId ? collegeId : "");
  const bySlug = useCollegeBySlug(!isObjectId ? collegeId : "");

  const { data, isLoading, isError } = isObjectId ? byId : bySlug;
  const college = data?.data;

  if (isLoading) {
    return <LoadingPage message="Loading college details..." />;
  }

  if (isError || !college) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-neutral-100 flex items-center justify-center">
            <svg className="w-10 h-10 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">College Not Found</h2>
          <p className="text-neutral-500 mb-6">
            The college you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <Button onClick={() => router.push("/colleges")}>Browse All Colleges</Button>
        </div>
      </div>
    );
  }

  const lowestFee = college.courses?.reduce((min, c) => {
    return c.fees?.min && c.fees.min < min ? c.fees.min : min;
  }, Infinity);

  const highestFee = college.courses?.reduce((max, c) => {
    return c.fees?.max && c.fees.max > max ? c.fees.max : max;
  }, 0);

  return (
    <div className="bg-neutral-50 min-h-screen">
      {/* ═══ Hero Section ═══ */}
      <div className="relative bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 text-white overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-[500px] h-[500px] bg-primary-600/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-accent-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-3xl" />
        </div>

        {/* Cover image overlay */}
        {college.coverImage && (
          <div className="absolute inset-0">
            <img
              src={college.coverImage}
              alt={college.name}
              className="w-full h-full object-cover opacity-15"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-950/95 via-primary-900/90 to-primary-800/85" />
          </div>
        )}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-primary-300/60 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/colleges" className="hover:text-white transition-colors">Colleges</Link>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-primary-200 truncate max-w-[200px]">{college.name}</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end gap-8">
            {/* College Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge variant={typeColors[college.type] || "default"}>
                  {college.type.charAt(0).toUpperCase() + college.type.slice(1)}
                </Badge>
                {college.verified && (
                  <Badge variant="success">
                    <svg className="w-3 h-3 mr-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Verified
                  </Badge>
                )}
                {college.featured && (
                  <Badge variant="warning">
                    <svg className="w-3 h-3 mr-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Featured
                  </Badge>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-3">
                {college.name}
              </h1>

              <div className="flex items-center gap-1.5 text-primary-200/80 mb-3">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm">
                  {college.location.address && `${college.location.address}, `}
                  {college.location.city}, {college.location.state}, {college.location.country}
                  {college.location.pincode && ` - ${college.location.pincode}`}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-primary-300/70">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Est. {college.establishedYear}
                </span>
                {college.approvedBy?.length > 0 && (
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    {college.approvedBy.join(", ")}
                  </span>
                )}
              </div>
            </div>

            {/* Quick Stats Cards */}
            <div className="flex gap-3 flex-wrap lg:flex-nowrap">
              <div className="glass-dark rounded-2xl px-5 py-4 text-center min-w-[110px]">
                <div className="flex items-center justify-center gap-1 mb-0.5">
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-xl font-bold">{college.rating}</span>
                </div>
                <p className="text-[11px] text-primary-300">{college.reviewCount} reviews</p>
              </div>

              <div className="glass-dark rounded-2xl px-5 py-4 text-center min-w-[110px]">
                <p className="text-xl font-bold">{college.courses?.length || 0}</p>
                <p className="text-[11px] text-primary-300">Courses</p>
              </div>

              {lowestFee !== Infinity && (
                <div className="glass-dark rounded-2xl px-5 py-4 text-center min-w-[110px]">
                  <p className="text-base font-bold">{formatCurrency(lowestFee)}</p>
                  <p className="text-[11px] text-primary-300">Starting from</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ═══ Main Content ═══ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Tabbed Content */}
          <div className="lg:col-span-2 min-w-0">
            <Tabs defaultValue="overview">
              <TabsList className="mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="courses" count={college.courses?.length}>Courses</TabsTrigger>
                <TabsTrigger value="fees">Fees</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              {/* ── Overview Tab ── */}
              <TabsContent value="overview">
                <div className="space-y-6">
                  {/* About */}
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                        <span className="w-1 h-5 bg-primary-500 rounded-full" />
                        About {college.name}
                      </h2>
                      <p className="text-neutral-600 leading-relaxed whitespace-pre-line text-[15px]">
                        {college.description}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Quick Info Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-5">
                        <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">College Type</p>
                        <p className="text-base font-semibold text-neutral-900 capitalize">{college.type}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-5">
                        <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">Established</p>
                        <p className="text-base font-semibold text-neutral-900">{college.establishedYear}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-5">
                        <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">Location</p>
                        <p className="text-base font-semibold text-neutral-900">{college.location.city}, {college.location.state}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-5">
                        <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">Approval</p>
                        <p className="text-base font-semibold text-neutral-900">{college.approvedBy?.join(", ") || "N/A"}</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* NIRF Rankings */}
                  {college.nirf && Object.values(college.nirf).some((v) => v > 0) && (
                    <Card>
                      <CardContent className="p-6">
                        <h2 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                          <span className="w-1 h-5 bg-accent-500 rounded-full" />
                          NIRF Rankings
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {Object.entries(college.nirf)
                            .filter(([, value]) => value > 0)
                            .map(([key, value]) => (
                              <div key={key} className="text-center p-4 rounded-xl bg-neutral-50 border border-neutral-100">
                                <p className="text-2xl font-bold text-primary-600">#{value}</p>
                                <p className="text-xs text-neutral-500 mt-1 capitalize">{key}</p>
                              </div>
                            ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Facilities */}
                  {college.facilities?.length > 0 && (
                    <Card>
                      <CardContent className="p-6">
                        <h2 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                          <span className="w-1 h-5 bg-secondary-500 rounded-full" />
                          Facilities
                        </h2>
                        <div className="flex flex-wrap gap-2">
                          {college.facilities.map((facility, index) => (
                            <span
                              key={index}
                              className="px-3.5 py-1.5 text-sm bg-secondary-50 text-secondary-700 rounded-lg border border-secondary-100"
                            >
                              {facility}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Entrance Exams */}
                  {college.entranceExams?.length > 0 && (
                    <Card>
                      <CardContent className="p-6">
                        <h2 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                          <span className="w-1 h-5 bg-primary-500 rounded-full" />
                          Entrance Exams Accepted
                        </h2>
                        <div className="flex flex-wrap gap-2">
                          {college.entranceExams.map((exam, index) => (
                            <Badge key={index} variant="primary" size="sm">
                              {exam}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Rankings */}
                  {college.rankings?.length > 0 && (
                    <Card>
                      <CardContent className="p-6">
                        <h2 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                          <span className="w-1 h-5 bg-accent-500 rounded-full" />
                          Rankings
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {college.rankings.map((ranking, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-4 rounded-xl bg-neutral-50 border border-neutral-100"
                            >
                              <div>
                                <p className="text-sm font-medium text-neutral-900">{ranking.source}</p>
                                <p className="text-xs text-neutral-500">{ranking.year}</p>
                              </div>
                              <span className="text-2xl font-bold text-primary-600">#{ranking.rank}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>

              {/* ── Courses Tab ── */}
              <TabsContent value="courses">
                {college.courses?.length > 0 ? (
                  <div className="space-y-3">
                    {college.courses.map((course, index) => (
                      <Card key={index} hover>
                        <CardContent className="p-5">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-neutral-900 text-[15px] mb-2">{course.name}</h3>
                              <div className="flex flex-wrap items-center gap-2">
                                {course.level && (
                                  <Badge variant="outline" size="sm">
                                    {levelLabels[course.level] || course.level}
                                  </Badge>
                                )}
                                {course.duration && (
                                  <span className="flex items-center gap-1 text-xs text-neutral-500">
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {course.duration}
                                  </span>
                                )}
                              </div>
                            </div>
                            {course.fees && (
                              <div className="text-right shrink-0">
                                <p className="font-bold text-neutral-900">
                                  {formatCurrency(course.fees.min)}
                                  {course.fees.max !== course.fees.min && (
                                    <span className="font-normal text-neutral-400"> - {formatCurrency(course.fees.max)}</span>
                                  )}
                                </p>
                                <p className="text-xs text-neutral-400">per year</p>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <div className="text-4xl mb-3">📚</div>
                      <p className="text-neutral-500">No course information available yet.</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* ── Fees Tab ── */}
              <TabsContent value="fees">
                {college.courses?.length > 0 ? (
                  <div className="space-y-6">
                    {/* Fee Summary */}
                    {lowestFee !== Infinity && (
                      <Card className="bg-gradient-to-br from-primary-50 to-white border-primary-100">
                        <CardContent className="p-6">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                            <div>
                              <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-1">Lowest Fee</p>
                              <p className="text-2xl font-bold text-primary-700">{formatCurrency(lowestFee)}</p>
                            </div>
                            <div>
                              <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-1">Highest Fee</p>
                              <p className="text-2xl font-bold text-primary-700">{formatCurrency(highestFee || lowestFee)}</p>
                            </div>
                            <div>
                              <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-1">Total Courses</p>
                              <p className="text-2xl font-bold text-primary-700">{college.courses.length}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Fee Table */}
                    <Card padding="none">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-neutral-100">
                              <th className="text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider px-6 py-4">Course</th>
                              <th className="text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider px-6 py-4">Level</th>
                              <th className="text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider px-6 py-4">Duration</th>
                              <th className="text-right text-xs font-semibold text-neutral-500 uppercase tracking-wider px-6 py-4">Annual Fees</th>
                            </tr>
                          </thead>
                          <tbody>
                            {college.courses.map((course, index) => (
                              <tr key={index} className="border-b border-neutral-50 last:border-0 hover:bg-neutral-50/50 transition-colors">
                                <td className="px-6 py-4">
                                  <p className="font-medium text-neutral-900 text-sm">{course.name}</p>
                                </td>
                                <td className="px-6 py-4">
                                  {course.level ? (
                                    <Badge variant="outline" size="sm">
                                      {levelLabels[course.level] || course.level}
                                    </Badge>
                                  ) : (
                                    <span className="text-neutral-400 text-sm">--</span>
                                  )}
                                </td>
                                <td className="px-6 py-4 text-sm text-neutral-600">
                                  {course.duration || "--"}
                                </td>
                                <td className="px-6 py-4 text-right">
                                  {course.fees ? (
                                    <p className="font-semibold text-neutral-900 text-sm">
                                      {formatCurrency(course.fees.min)}
                                      {course.fees.max !== course.fees.min && (
                                        <span className="font-normal text-neutral-400"> - {formatCurrency(course.fees.max)}</span>
                                      )}
                                    </p>
                                  ) : (
                                    <span className="text-neutral-400 text-sm">--</span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </Card>
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <div className="text-4xl mb-3">💰</div>
                      <p className="text-neutral-500">No fee information available yet.</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* ── Reviews Tab ── */}
              <TabsContent value="reviews">
                <div className="space-y-6">
                  {/* Rating Summary */}
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row items-center gap-6">
                        <div className="text-center">
                          <p className="text-5xl font-bold text-neutral-900">{college.rating}</p>
                          <div className="flex items-center gap-0.5 mt-2 justify-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <svg
                                key={i}
                                className={`w-5 h-5 ${i < Math.round(college.rating) ? "text-yellow-400" : "text-neutral-200"}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <p className="text-sm text-neutral-500 mt-1">{college.reviewCount} reviews</p>
                        </div>
                        <div className="flex-1 w-full">
                          <p className="text-sm text-neutral-500 text-center sm:text-left">
                            Reviews are collected from students, alumni, and verified sources.
                            Ratings reflect overall academic quality, infrastructure, placements, and campus life.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Placeholder reviews */}
                  <Card>
                    <CardContent className="p-12 text-center">
                      <div className="text-4xl mb-3">⭐</div>
                      <p className="text-neutral-500">Detailed reviews coming soon.</p>
                      <p className="text-sm text-neutral-400 mt-1">Be the first to share your experience!</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* ═══ Right Sidebar: Sticky Enquiry ═══ */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Contact Info */}
              <Card>
                <CardContent className="p-5">
                  <h3 className="text-sm font-semibold text-neutral-900 mb-3">Contact Information</h3>
                  <div className="space-y-2.5">
                    {college.website && (
                      <a
                        href={college.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-2.5 rounded-xl bg-neutral-50 hover:bg-primary-50 transition-colors group"
                      >
                        <svg className="w-4 h-4 text-neutral-400 group-hover:text-primary-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                        <span className="text-sm text-neutral-600 group-hover:text-primary-600 truncate">
                          {college.website.replace(/^https?:\/\//, "")}
                        </span>
                      </a>
                    )}
                    {college.email && (
                      <a
                        href={`mailto:${college.email}`}
                        className="flex items-center gap-3 p-2.5 rounded-xl bg-neutral-50 hover:bg-primary-50 transition-colors group"
                      >
                        <svg className="w-4 h-4 text-neutral-400 group-hover:text-primary-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm text-neutral-600 group-hover:text-primary-600 truncate">
                          {college.email}
                        </span>
                      </a>
                    )}
                    {college.phone && (
                      <a
                        href={`tel:${college.phone}`}
                        className="flex items-center gap-3 p-2.5 rounded-xl bg-neutral-50 hover:bg-primary-50 transition-colors group"
                      >
                        <svg className="w-4 h-4 text-neutral-400 group-hover:text-primary-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="text-sm text-neutral-600 group-hover:text-primary-600">
                          {college.phone}
                        </span>
                      </a>
                    )}
                    {!college.website && !college.email && !college.phone && (
                      <p className="text-sm text-neutral-400 text-center py-2">No contact info available</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Enquiry Form */}
              <Card className="border-primary-100 shadow-md shadow-primary-500/5">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
                      <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-neutral-900">Enquire Now</h3>
                      <p className="text-xs text-neutral-500">Get details & admission support</p>
                    </div>
                  </div>
                  <LeadForm
                    collegeId={college._id}
                    collegeName={college.name}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
