import axios from "@/services/axios";

export type ExamType = "jee-main" | "jee-advanced" | "cat" | "neet" | "cmat" | "mat" | "xat" | "snap" | "gmat";

export interface PredictorRequest {
  examType: ExamType;
  score: number;
  category?: string;
  gender?: string;
  homeState?: string;
}

export interface PredictedCollege {
  collegeId: string;
  collegeName: string;
  course: string;
  probability: "high" | "medium" | "low";
  cutoff: number;
  round?: number;
}

export interface PredictorResponse {
  success: boolean;
  predictions: PredictedCollege[];
  userRank?: number;
  userPercentile?: number;
}

export const predictorService = {
  predictColleges: async (data: PredictorRequest): Promise<PredictorResponse> => {
    const response = await axios.post("/predictor/colleges", data);
    return response.data;
  },

  getPredictorDetails: async (examType: ExamType) => {
    const response = await axios.get(`/predictor/details/${examType}`);
    return response.data;
  },

  calculatePercentile: async (examType: ExamType, score: number): Promise<{ percentile: number; rank: number }> => {
    const response = await axios.post(`/predictor/percentile`, { examType, score });
    return response.data;
  },
};