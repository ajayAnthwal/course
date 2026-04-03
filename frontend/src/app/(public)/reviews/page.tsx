"use client";

import { useState } from "react";
import { Badge, Button, Card, Input } from "@/components/ui";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";

interface Review {
  _id: string;
  collegeName: string;
  collegeSlug: string;
  userName: string;
  userType: "student" | "parent" | "alumni";
  rating: number;
  title: string;
  content: string;
  pros: string[];
  cons: string[];
  helpful: number;
  date: string;
  course: string;
  batchYear: string;
}

const mockReviews: Review[] = [
  { _id: "1", collegeName: "IIT Bombay", collegeSlug: "iit-bombay", userName: "Rahul S.", userType: "student", rating: 5, title: "Best engineering college in India", content: "Excellent faculty, great infrastructure, and amazing placement opportunities. The campus life is vibrant with numerous technical and cultural festivals.", pros: ["Top placements", "Great faculty", "Vibrant campus"], cons: ["High competition"], helpful: 245, date: "2024-01-15", course: "B.Tech CSE", batchYear: "2020-2024" },
  { _id: "2", collegeName: "IIT Delhi", collegeSlug: "iit-delhi", userName: "Priya M.", userType: "student", rating: 4.5, title: "Good academics but high workload", content: "The academics are rigorous but rewarding. Faculty is highly qualified. Placements are excellent with top companies visiting.", pros: ["Excellent placements", "Good faculty", "Research opportunities"], cons: ["High workload", "Stressful at times"], helpful: 189, date: "2024-01-10", course: "B.Tech ECE", batchYear: "2019-2023" },
  { _id: "3", collegeName: "VIT Vellore", collegeSlug: "vit-vellore", userName: "Amit K.", userType: "alumni", rating: 4, title: "Good placement record and infrastructure", content: "Decent college with good infrastructure and decent placements. The crowd is competitive and there are many clubs and activities.", pros: ["Good placements", "Infrastructure", "Various clubs"], cons: ["High fees"], helpful: 156, date: "2024-01-05", course: "B.Tech IT", batchYear: "2018-2022" },
  { _id: "4", collegeName: "Delhi University", collegeSlug: "du-delhi", userName: "Sneha R.", userType: "student", rating: 4, title: "Great for humanities and commerce", content: "DU offers a wide range of courses with excellent faculty. The campus culture is diverse and there are many societies to join.", pros: ["Diverse courses", "Good faculty", "Cultural activities"], cons: ["Crowded campus"], helpful: 134, date: "2023-12-28", course: "B.A. Economics", batchYear: "2021-2024" },
  { _id: "5", collegeName: "BITS Pilani", collegeSlug: "bits-pilani", userName: "Vikram J.", userType: "alumni", rating: 4.5, title: "Excellent for engineering and science", content: "BITS offers a unique four-year degree with mandatory summer projects. The peer group is excellent and placements are good.", pros: ["Good curriculum", "Industry exposure", "Strong alumni"], cons: ["Expensive"], helpful: 178, date: "2023-12-20", course: "B.Tech Mechanical", batchYear: "2017-2021" },
];

const colleges = [
  { name: "IIT Bombay", slug: "iit-bombay", rating: 4.8, reviews: 2500 },
  { name: "IIT Delhi", slug: "iit-delhi", rating: 4.7, reviews: 2200 },
  { name: "IIT Madras", slug: "iit-madras", rating: 4.6, reviews: 2100 },
  { name: "VIT Vellore", slug: "vit-vellore", rating: 4.4, reviews: 3200 },
  { name: "BITS Pilani", slug: "bits-pilani", rating: 4.5, reviews: 1800 },
];

export default function ReviewsPage() {
  const [filterCollege, setFilterCollege] = useState("all");
  const [filterRating, setFilterRating] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  const filteredReviews = mockReviews.filter((review) => {
    if (filterCollege !== "all" && review.collegeSlug !== filterCollege) return false;
    if (filterRating !== "all" && review.rating < parseFloat(filterRating)) return false;
    return true;
  });

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={star <= rating ? "text-yellow-400" : "text-neutral-300"}>
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-0">Reviews</Badge>
          <h1 className="text-4xl font-bold mb-4">College Reviews & Ratings</h1>
          <p className="text-xl text-primary-200 max-w-2xl">
            Read honest reviews from students, alumni, and parents to make informed decisions about your education.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Top Rated Colleges */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Top Rated Colleges</h2>
          <div className="grid md:grid-cols-5 gap-4">
            {colleges.map((college) => (
              <Link key={college.slug} href={`/colleges/${college.slug}`}>
                <Card className="p-4 text-center hover:shadow-lg transition-shadow">
                  <div className="text-3xl mb-2">🎓</div>
                  <h4 className="font-semibold text-neutral-900 text-sm">{college.name}</h4>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <span className="text-yellow-500">★</span>
                    <span className="font-medium text-neutral-900">{college.rating}</span>
                  </div>
                  <p className="text-xs text-neutral-500">{college.reviews} reviews</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Select value={filterCollege} onValueChange={setFilterCollege}>
            <SelectTrigger className="w-48"><SelectValue placeholder="Filter by college" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Colleges</SelectItem>
              {colleges.map((c) => <SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={filterRating} onValueChange={setFilterRating}>
            <SelectTrigger className="w-40"><SelectValue placeholder="Rating" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ratings</SelectItem>
              <SelectItem value="5">5 Stars</SelectItem>
              <SelectItem value="4">4+ Stars</SelectItem>
              <SelectItem value="3">3+ Stars</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40"><SelectValue placeholder="Sort by" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="helpful">Most Helpful</SelectItem>
              <SelectItem value="high">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {filteredReviews.map((review) => (
            <Card key={review._id} className="p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Link href={`/colleges/${review.collegeSlug}`} className="text-lg font-semibold text-primary-600 hover:underline">
                    {review.collegeName}
                  </Link>
                  <p className="text-sm text-neutral-500">{review.course} • Batch {review.batchYear}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1">
                    {renderStars(review.rating)}
                    <span className="font-bold text-neutral-900">{review.rating}</span>
                  </div>
                  <p className="text-xs text-neutral-400">{review.date}</p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-neutral-900 mb-2">{review.title}</h3>
              <p className="text-neutral-600 mb-4">{review.content}</p>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-green-50 rounded-xl p-4">
                  <h4 className="font-medium text-green-800 mb-2">✓ Pros</h4>
                  <ul className="space-y-1">
                    {review.pros.map((pro, i) => (
                      <li key={i} className="text-sm text-green-700">• {pro}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50 rounded-xl p-4">
                  <h4 className="font-medium text-red-800 mb-2">✗ Cons</h4>
                  <ul className="space-y-1">
                    {review.cons.map((con, i) => (
                      <li key={i} className="text-sm text-red-700">• {con}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-medium">
                    {review.userName[0]}
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">{review.userName}</p>
                    <p className="text-xs text-neutral-500 capitalize">{review.userType}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button className="text-sm text-neutral-500 hover:text-primary-600 flex items-center gap-1">
                    👍 Helpful ({review.helpful})
                  </button>
                  <button className="text-sm text-neutral-500 hover:text-primary-600">
                    💬 Comment
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredReviews.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">No reviews found</h3>
            <p className="text-neutral-600">Try adjusting your filters</p>
          </div>
        )}

        {/* Write Review CTA */}
        <div className="mt-12 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Have you studied at any of these colleges?</h2>
          <p className="text-primary-100 mb-6">Share your experience and help other students make informed decisions.</p>
          <div className="flex gap-4 justify-center">
            <Button variant="secondary" size="lg">Write a Review</Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary-600">
              Browse Colleges
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}