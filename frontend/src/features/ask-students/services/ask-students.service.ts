import axios from "@/services/axios";

export interface StudentQuestion {
  _id: string;
  question: string;
  college: {
    _id: string;
    name: string;
  };
  course?: string;
  askedBy: {
    _id: string;
    name: string;
  };
  createdAt: string;
}

export interface StudentAnswer {
  _id: string;
  questionId: string;
  answer: string;
  answeredBy: {
    _id: string;
    name: string;
    avatar?: string;
    currentYear?: number;
    course?: string;
    isAlumni?: boolean;
  };
  helpful: number;
  createdAt: string;
}

export interface AskStudentResponse {
  data: StudentQuestion[];
  total: number;
}

export const askStudentsService = {
  getQuestions: async (params?: {
    collegeId?: string;
    course?: string;
    page?: number;
    limit?: number;
  }): Promise<AskStudentResponse> => {
    const response = await axios.get("/ask-students/questions", { params });
    return response.data;
  },

  getQuestion: async (id: string): Promise<{ question: StudentQuestion; answers: StudentAnswer[] }> => {
    const response = await axios.get(`/ask-students/questions/${id}`);
    return response.data;
  },

  askQuestion: async (data: {
    question: string;
    collegeId: string;
    course?: string;
  }): Promise<{ data: StudentQuestion }> => {
    const response = await axios.post("/ask-students/questions", data);
    return response.data;
  },

  answerQuestion: async (questionId: string, answer: string): Promise<{ data: StudentAnswer }> => {
    const response = await axios.post(`/ask-students/questions/${questionId}/answers`, { answer });
    return response.data;
  },

  markHelpful: async (answerId: string): Promise<{ helpful: number }> => {
    const response = await axios.post(`/ask-students/answers/${answerId}/helpful`);
    return response.data;
  },
};