"use client";

import { useState } from "react";
import { Card, CardContent, Button, Badge, Input } from "@/components/ui";
import { predictorService, type ExamType, type PredictedCollege } from "../services/predictor.service";
import Link from "next/link";

const examOptions: { value: ExamType; label: string; fullName: string }[] = [
  { value: "jee-main", label: "JEE Main", fullName: "Joint Entrance Examination Main" },
  { value: "jee-advanced", label: "JEE Advanced", fullName: "Joint Entrance Examination Advanced" },
  { value: "cat", label: "CAT", fullName: "Common Admission Test" },
  { value: "neet", label: "NEET", fullName: "National Eligibility cum Entrance Test" },
  { value: "cmat", label: "CMAT", fullName: "Common Management Admission Test" },
  { value: "mat", label: "MAT", fullName: "Management Aptitude Test" },
  { value: "xat", label: "XAT", fullName: "Xavier Aptitude Test" },
  { value: "snap", label: "SNAP", fullName: "Symbiosis National Aptitude Test" },
];

const examMaxScores: Record<ExamType, number> = {
  "jee-main": 300,
  "jee-advanced": 372,
  "cat": 198,
  "neet": 720,
  "cmat": 400,
  "mat": 200,
  "xat": 100,
  "snap": 60,
  "gmat": 800,
};

export default function CollegePredictor() {
  const [examType, setExamType] = useState<ExamType>("jee-main");
  const [score, setScore] = useState("");
  const [category, setCategory] = useState("general");
  const [predictions, setPredictions] = useState<PredictedCollege[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasPredicted, setHasPredicted] = useState(false);

  const maxScore = examMaxScores[examType];

  const handlePredict = async () => {
    if (!score || parseInt(score) <= 0) return;
    setIsLoading(true);
    try {
      const result = await predictorService.predictColleges({
        examType,
        score: parseInt(score),
        category,
      });
      setPredictions(result.predictions);
      setHasPredicted(true);
    } catch (error) {
      console.error("Prediction error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getProbabilityColor = (prob: string) => {
    switch (prob) {
      case "high": return "success";
      case "medium": return "warning";
      case "low": return "danger";
      default: return "secondary";
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-neutral-900 mb-4">College Predictor</h3>
        <p className="text-neutral-500 text-sm mb-6">
          Enter your {examOptions.find(e => e.value === examType)?.fullName} score to predict your chances of getting into top colleges
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-2 block">Exam</label>
            <select
              className="w-full h-11 px-3 rounded-xl border border-neutral-200 bg-white text-sm"
              value={examType}
              onChange={(e) => { setExamType(e.target.value as ExamType); setHasPredicted(false); }}
            >
              {examOptions.map((exam) => (
                <option key={exam.value} value={exam.value}>{exam.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-2 block">Your Score</label>
            <Input
              type="number"
              placeholder={`0 - ${maxScore}`}
              value={score}
              onChange={(e) => setScore(e.target.value)}
              max={maxScore}
            />
            <p className="text-xs text-neutral-400 mt-1">Max: {maxScore}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-2 block">Category</label>
            <select
              className="w-full h-11 px-3 rounded-xl border border-neutral-200 bg-white text-sm"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="general">General</option>
              <option value="obc">OBC</option>
              <option value="sc">SC</option>
              <option value="st">ST</option>
              <option value="ews">EWS</option>
            </select>
          </div>
        </div>

        <Button
          onClick={handlePredict}
          disabled={isLoading || !score}
          className="w-full"
        >
          {isLoading ? "Predicting..." : "Predict My Chances"}
        </Button>

        {hasPredicted && predictions.length > 0 && (
          <div className="mt-8">
            <h4 className="font-semibold text-neutral-900 mb-4">Your Predictions</h4>
            <div className="space-y-3">
              {predictions.map((pred, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
                  <div>
                    <p className="font-medium text-neutral-900">{pred.collegeName}</p>
                    <p className="text-sm text-neutral-500">{pred.course}</p>
                    <p className="text-xs text-neutral-400 mt-1">Cutoff: {pred.cutoff}</p>
                  </div>
                  <Badge variant={getProbabilityColor(pred.probability) as "success" | "warning" | "danger" | "secondary"}>
                    {pred.probability === "high" ? "High" : pred.probability === "medium" ? "Medium" : "Low"} Chance
                  </Badge>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link href="/colleges" className="text-sm text-primary-600 hover:text-primary-700">
                View All Colleges →
              </Link>
            </div>
          </div>
        )}

        {hasPredicted && predictions.length === 0 && !isLoading && (
          <div className="mt-8 text-center py-6">
            <p className="text-neutral-500">No colleges match your score criteria</p>
            <p className="text-sm text-neutral-400 mt-1">Try with a higher score or different category</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}