import axios from "@/services/axios";

export interface ChatMessage {
  _id: string;
  conversationId: string;
  sender: {
    _id: string;
    name: string;
    role: string;
    avatar?: string;
  };
  content: string;
  attachments?: { name: string; url: string; type: string }[];
  isRead: boolean;
  createdAt: string;
}

export interface Conversation {
  _id: string;
  participants: {
    _id: string;
    name: string;
    role: string;
    avatar?: string;
  }[];
  lastMessage?: ChatMessage;
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface SendMessageDTO {
  receiverId: string;
  content: string;
  attachments?: File[];
}

export const chatService = {
  getConversations: async (): Promise<{ data: Conversation[] }> => {
    const response = await axios.get("/chat/conversations");
    return response.data;
  },

  getMessages: async (conversationId: string): Promise<{ data: ChatMessage[] }> => {
    const response = await axios.get(`/chat/conversations/${conversationId}/messages`);
    return response.data;
  },

  sendMessage: async (data: SendMessageDTO): Promise<{ data: ChatMessage }> => {
    const formData = new FormData();
    formData.append("receiverId", data.receiverId);
    formData.append("content", data.content);
    if (data.attachments) {
      data.attachments.forEach((file) => formData.append("attachments", file));
    }
    const response = await axios.post("/chat/messages", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  markAsRead: async (conversationId: string): Promise<void> => {
    await axios.post(`/chat/conversations/${conversationId}/read`);
  },

  startConversation: async (receiverId: string): Promise<{ data: Conversation }> => {
    const response = await axios.post("/chat/conversations", { receiverId });
    return response.data;
  },
};