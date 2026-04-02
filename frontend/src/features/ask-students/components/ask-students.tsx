"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Badge, Input } from "@/components/ui";
import { askStudentsService, type StudentQuestion } from "../services/ask-students.service";

interface AskStudentCardProps {
  question: StudentQuestion;
}

function AskStudentCard({ question }: AskStudentCardProps) {
  return (
    <div className="bg-white rounded-xl p-5 border border-neutral-200 hover:border-primary-200 transition-colors">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold">
          {question.askedBy.name[0]}
        </div>
        <div className="flex-1">
          <Link href={`/ask-students/${question._id}`}>
            <h3 className="font-semibold text-neutral-900 hover:text-primary-600 mb-2 line-clamp-2">
              {question.question}
            </h3>
          </Link>
          <div className="flex items-center gap-3 text-xs text-neutral-500">
            <Badge variant="secondary" size="sm">{question.college.name}</Badge>
            {question.course && <span>{question.course}</span>}
            <span>•</span>
            <span>{new Date(question.createdAt).toLocaleDateString("en-IN")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface AskStudentsWidgetProps {
  collegeId?: string;
  limit?: number;
}

export function AskStudentsWidget({ collegeId, limit = 5 }: AskStudentsWidgetProps) {
  const [questions, setQuestions] = useState<StudentQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // In real implementation, use useQuery here
  // const { data } = useQuery({
  //   queryKey: ["askStudents", collegeId],
  //   queryFn: () => askStudentsService.getQuestions({ collegeId, limit }),
  // });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-neutral-900">Ask Current Students</h3>
        <Link href="/ask-students" className="text-sm text-primary-600 hover:text-primary-700">
          View All →
        </Link>
      </div>
      <div className="space-y-3">
        {questions.length > 0 ? (
          questions.map((q) => <AskStudentCard key={q._id} question={q} />)
        ) : (
          <div className="text-center py-8 text-neutral-400">
            <p>No questions yet</p>
            <p className="text-sm mt-1">Be the first to ask!</p>
          </div>
        )}
      </div>
      <Link href={collegeId ? `/ask-students/ask?college=${collegeId}` : "/ask-students/ask"}>
        <Button variant="outline" className="w-full mt-4">
          Ask a Question
        </Button>
      </Link>
    </div>
  );
}

export default function AskStudentsPage() {
  // Full page implementation would be similar to discussions page
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="bg-gradient-to-r from-secondary-500 to-secondary-600 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-4">Ask Current Students</h1>
          <p className="text-secondary-100 mb-6">
            Get real answers from students studying in these colleges
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Full page content would go here */}
        <p className="text-center text-neutral-500 py-12">
          Ask Students page coming soon...
        </p>
      </div>
    </div>
  );
}