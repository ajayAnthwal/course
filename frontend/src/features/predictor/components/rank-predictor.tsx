"use client";

import { useState } from "react";
import { Card, CardContent, Button, Input, Badge } from "@/components/ui";
import { predictorService, type ExamType } from "../services/predictor.service";

const examOptions: { value: ExamType; label: string; maxScore: number }[] = [
  { value: "jee-main", label: "JEE Main", maxScore: 300 },
  { value: "cat", label: "CAT", maxScore: 198 },
  { value: "neet", label: "NEET", maxScore: 720 },
  { value: "cmat", label: "CMAT", maxScore: 400 },
  { value: "mat", label: "MAT", maxScore: 200 },
];

interface PercentileResult {
  percentile: number;
  rank: number;
}

export default function RankPredictor() {
  const [examType, setExamType] = useState<ExamType>("jee-main");
  const [score, setScore] = useState("");
  const [result, setResult] = useState<PercentileResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const maxScore = examOptions.find(e => e.value === examType)?.maxScore || 300;

  const handlePredict = async () => {
    if (!score || parseInt(score) <= 0) return;
    setIsLoading(true);
    try {
      const data = await predictorService.calculatePercentile(examType, parseInt(score));
      setResult(data);
    } catch (error) {
      console.error("Error calculating percentile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPercentileColor = (percentile: number) => {
    if (percentile >= 95) return "success";
    if (percentile >= 80) return "primary";
    if (percentile >= 50) return "warning";
    return "danger";
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-neutral-900 mb-4">Rank & Percentile Predictor</h3>
        <p className="text-neutral-500 text-sm mb-6">
          Enter your score to predict your approximate rank and percentile
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-2 block">Exam</label>
            <select
              className="w-full h-10 px-3 rounded-lg border border-neutral-200 bg-white"
              value={examType}
              onChange={(e) => { setExamType(e.target.value as ExamType); setResult(null); }}
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
          </div>
        </div>

        <Button onClick={handlePredict} disabled={isLoading || !score} className="w-full">
          {isLoading ? "Calculating..." : "Calculate My Rank"}
        </Button>

        {result && (
          <div className="mt-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl">
                <p className="text-sm text-neutral-600 mb-1">Your Percentile</p>
                <p className="text-3xl font-bold text-primary-600">{result.percentile.toFixed(2)}%</p>
                <Badge variant={getPercentileColor(result.percentile)} className="mt-2">
                  {result.percentile >= 95 ? "Excellent" : result.percentile >= 80 ? "Good" : result.percentile >= 50 ? "Average" : "Below Average"}
                </Badge>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-accent-50 to-accent-100 rounded-xl">
                <p className="text-sm text-neutral-600 mb-1">Approximate Rank</p>
                <p className="text-3xl font-bold text-accent-600">#{result.rank.toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}