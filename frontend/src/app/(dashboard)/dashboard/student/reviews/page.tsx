"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Badge, Textarea, Modal, useToast, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui";
import { useColleges } from "@/features/colleges";
import apiClient from "@/services/axios";
import { formatDate } from "@/lib/utils";
import { FiStar, FiMessageCircle, FiPlus, FiEdit3, FiCheckCircle, FiClock, FiAlertCircle } from "react-icons/fi";

interface Review {
  _id: string;
  college: { _id: string; name: string };
  rating: number;
  content: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

interface Question {
  _id: string;
  college: { _id: string; name: string };
  question: string;
  answer?: string;
  status: "pending" | "answered";
  createdAt: string;
}

function StudentReviewsPage() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<"reviews" | "questions">("reviews");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState("");
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");
  const [questionCollege, setQuestionCollege] = useState("");
  const [questionText, setQuestionText] = useState("");
  
  const { data: collegesData } = useColleges({ limit: 50 });

  useEffect(() => {
    fetchMyReviews();
    fetchMyQuestions();
  }, []);

  const fetchMyReviews = async () => {
    try {
      const response = await apiClient.get("/reviews/reviews/my");
      setReviews(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyQuestions = async () => {
    try {
      const response = await apiClient.get("/reviews/questions/my");
      setQuestions(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch questions:", error);
    } finally {
      setLoading(false);
    }
  };

  const submitReview = async () => {
    if (!selectedCollege || !content.trim()) {
      showToast("Please fill all fields", "error");
      return;
    }
    try {
      await apiClient.post("/reviews", {
        collegeId: selectedCollege,
        rating,
        content,
      });
      showToast("Review submitted for approval", "success");
      setIsModalOpen(false);
      setContent("");
      setSelectedCollege("");
      fetchMyReviews();
    } catch (error) {
      showToast("Failed to submit review", "error");
    }
  };

  const submitQuestion = async () => {
    if (!questionCollege || !questionText.trim()) {
      showToast("Please fill all fields", "error");
      return;
    }
    try {
      await apiClient.post("/reviews/questions", {
        collegeId: questionCollege,
        question: questionText,
      });
      showToast("Question submitted", "success");
      setQuestionText("");
      setQuestionCollege("");
      fetchMyQuestions();
    } catch (error) {
      showToast("Failed to submit question", "error");
    }
  };

  const statusBadge = (status: string) => {
    const variants: Record<string, { label: string; variant: "success" | "warning" | "danger" }> = {
      pending: { label: "Pending", variant: "warning" },
      approved: { label: "Approved", variant: "success" },
      rejected: { label: "Rejected", variant: "danger" },
      answered: { label: "Answered", variant: "success" },
    };
    return variants[status] || variants.pending;
  };

  return (
    <DashboardLayout role="student" userName={user?.name}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reviews & Q&A</h1>
            <p className="text-sm text-gray-600">Your reviews and questions for colleges</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)} leftIcon={<FiPlus className="w-4 h-4" />}>Add Review</Button>
        </div>

        <div className="flex gap-2 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === "reviews"
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            My Reviews ({reviews.length})
          </button>
          <button
            onClick={() => setActiveTab("questions")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === "questions"
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            My Questions ({questions.length})
          </button>
        </div>

        {activeTab === "reviews" && (
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-8 text-gray-500">Loading...</div>
            ) : reviews.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                    <FiStar className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 mb-4">No reviews yet</p>
                  <Button onClick={() => setIsModalOpen(true)}>Write a Review</Button>
                </CardContent>
              </Card>
            ) : (
              reviews.map((review) => (
                <Card key={review._id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">{review.college.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((r) => (
                              <FiStar key={r} className={`w-4 h-4 ${r <= review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">{review.rating}/5</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{review.content}</p>
                        <p className="text-xs text-gray-400 mt-2">{formatDate(review.createdAt)}</p>
                      </div>
                      <Badge variant={statusBadge(review.status).variant} size="sm">
                        {statusBadge(review.status).label}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {activeTab === "questions" && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Ask a Question</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select value={questionCollege} onValueChange={setQuestionCollege}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select college" />
                  </SelectTrigger>
                  <SelectContent>
                    {((collegesData as any)?.data || []).map((college: any) => (
                      <SelectItem key={college._id} value={college._id}>{college.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Textarea
                  placeholder="Ask your question..."
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  rows={3}
                />
                <Button onClick={submitQuestion}>Submit Question</Button>
              </CardContent>
            </Card>

            {questions.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center text-gray-500">
                  No questions asked yet
                </CardContent>
              </Card>
            ) : (
              questions.map((q) => (
                <Card key={q._id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{q.college.name}</p>
                        <p className="text-gray-600 mt-1">Q: {q.question}</p>
                        {q.answer && (
                          <p className="text-gray-600 mt-2 bg-gray-50 p-2 rounded">A: {q.answer}</p>
                        )}
                        <p className="text-xs text-gray-400 mt-2">{formatDate(q.createdAt)}</p>
                      </div>
                      <Badge variant={statusBadge(q.status).variant} size="sm">
                        {statusBadge(q.status).label}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Write a Review" size="md">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">College</label>
              <Select value={selectedCollege} onValueChange={setSelectedCollege}>
                <SelectTrigger>
                  <SelectValue placeholder="Select college" />
                </SelectTrigger>
                <SelectContent>
                  {((collegesData as any)?.data || []).map((college: any) => (
                    <SelectItem key={college._id} value={college._id}>{college.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((r) => (
                  <button
                    key={r}
                    onClick={() => setRating(r)}
                    className="text-2xl"
                  >
                    <FiStar className={`w-6 h-6 ${r <= rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} />
                  </button>
                ))}
              </div>
            </div>
            <Textarea
              label="Your Review"
              placeholder="Share your experience..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button onClick={submitReview}>Submit Review</Button>
            </div>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
}

export default function ReviewsPage() {
  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <StudentReviewsPage />
    </ProtectedRoute>
  );
}