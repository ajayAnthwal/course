import CollegePredictor from "@/features/predictor/components/college-predictor";
import RankPredictor from "@/features/predictor/components/rank-predictor";

export default function PredictorPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-4">College & Rank Predictor</h1>
          <p className="text-primary-100">
            Predict your college admission chances and rank based on your exam scores
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CollegePredictor />
          <RankPredictor />
        </div>
      </div>
    </div>
  );
}