import axios from "@/services/axios";

export interface Discussion {
  _id: string;
  title: string;
  content: string;
  author: {
    _id: string;
    name: string;
    avatar?: string;
  };
  college?: {
    _id: string;
    name: string;
  };
  course?: string;
  tags: string[];
  views: number;
  answers: number;
  createdAt: string;
  isResolved: boolean;
}

export interface DiscussionAnswer {
  _id: string;
  discussionId: string;
  content: string;
  author: {
    _id: string;
    name: string;
    avatar?: string;
    isAlumni?: boolean;
  };
  upvotes: number;
  isAccepted: boolean;
  createdAt: string;
}

export interface CreateDiscussionDTO {
  title: string;
  content: string;
  collegeId?: string;
  course?: string;
  tags: string[];
}

export interface DiscussionsResponse {
  data: Discussion[];
  total: number;
  page: number;
  limit: number;
}

export const discussionsService = {
  getDiscussions: async (params?: {
    collegeId?: string;
    course?: string;
    tag?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<DiscussionsResponse> => {
    const response = await axios.get("/discussions", { params });
    return response.data;
  },

  getDiscussion: async (id: string): Promise<{ data: Discussion; answers: DiscussionAnswer[] }> => {
    const response = await axios.get(`/discussions/${id}`);
    return response.data;
  },

  createDiscussion: async (data: CreateDiscussionDTO): Promise<{ data: Discussion }> => {
    const response = await axios.post("/discussions", data);
    return response.data;
  },

  answerDiscussion: async (discussionId: string, content: string): Promise<{ data: DiscussionAnswer }> => {
    const response = await axios.post(`/discussions/${discussionId}/answers`, { content });
    return response.data;
  },

  upvoteAnswer: async (answerId: string): Promise<{ upvotes: number }> => {
    const response = await axios.post(`/discussions/answers/${answerId}/upvote`);
    return response.data;
  },

  acceptAnswer: async (answerId: string): Promise<void> => {
    await axios.post(`/discussions/answers/${answerId}/accept`);
  },
};