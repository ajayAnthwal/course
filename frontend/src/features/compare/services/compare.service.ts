import axios from "@/services/axios";

export interface CompareCollege {
  _id: string;
  name: string;
  slug: string;
  logo?: string;
  type: string;
  rating: number;
  fees: {
    annual: number;
    total: number;
  };
  placement: {
    avgPackage: number;
    highestPackage: number;
    topRecruiters: string[];
  };
  admission: {
    exam: string;
    cutoff: string;
  };
  facilities: string[];
  NIRFRanking?: number;
}

interface CompareResponse {
  data: CompareCollege[];
}

export const compareService = {
  compareColleges: async (collegeIds: string[]): Promise<CompareResponse> => {
    const response = await axios.post("/colleges/compare", { collegeIds });
    return response.data;
  },
};