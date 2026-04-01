"use client";

import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { Card, CardContent, CardHeader, CardTitle, Badge } from "@/components/ui";

const mockReviews = [
  { id: 1, name: "Rahul S.", rating: 5, comment: "Excellent infrastructure and faculty. Great placement support.", date: "Mar 2026" },
  { id: 2, name: "Priya M.", rating: 4, comment: "Good academics but hostel facilities need improvement.", date: "Feb 2026" },
  { id: 3, name: "Amit K.", rating: 4, comment: "Strong curriculum with practical exposure. Industry connections are valuable.", date: "Jan 2026" },
];

function CollegeReviewsContent() {
  const { user } = useAuth();
  const avgRating = mockReviews.reduce((sum, r) => sum + r.rating, 0) / mockReviews.length;

  return (
    <DashboardLayout role="college" userName={user?.name}>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Reviews</h1>
          <p className="text-neutral-500 mt-1">Monitor student reviews and feedback.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card><CardContent className="p-5 text-center">
            <p className="text-3xl font-bold text-neutral-900">{avgRating.toFixed(1)}</p>
            <div className="flex justify-center gap-0.5 mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className={`w-4 h-4 ${i < Math.round(avgRating) ? "text-yellow-400" : "text-neutral-200"}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              ))}
            </div>
            <p className="text-xs text-neutral-500 mt-1">{mockReviews.length} reviews</p>
          </CardContent></Card>
          <Card><CardContent className="p-5 text-center">
            <p className="text-3xl font-bold text-neutral-900">{mockReviews.filter((r) => r.rating >= 4).length}</p>
            <p className="text-xs text-neutral-500">Positive Reviews</p>
          </CardContent></Card>
          <Card><CardContent className="p-5 text-center">
            <p className="text-3xl font-bold text-neutral-900">{mockReviews.filter((r) => r.rating < 4).length}</p>
            <p className="text-xs text-neutral-500">Needs Attention</p>
          </CardContent></Card>
        </div>

        <Card>
          <CardHeader><CardTitle>All Reviews</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockReviews.map((review) => (
                <div key={review.id} className="p-4 rounded-xl border border-neutral-100 hover:border-neutral-200 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="text-xs font-semibold text-primary-700">{review.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-neutral-900">{review.name}</p>
                        <p className="text-xs text-neutral-400">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg key={i} className={`w-3.5 h-3.5 ${i < review.rating ? "text-yellow-400" : "text-neutral-200"}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-neutral-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default function CollegeReviewsPage() {
  return <ProtectedRoute allowedRoles={["college"]}><CollegeReviewsContent /></ProtectedRoute>;
}
