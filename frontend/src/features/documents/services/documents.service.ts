import apiClient from "@/services/axios";
import type { Document } from "@/types";

export const documentsService = {
  async getDocuments(): Promise<{ data: Document[] }> {
    const response = await apiClient.get("/documents");
    return response.data;
  },

  async uploadDocument(formData: FormData): Promise<Document> {
    const response = await apiClient.post("/documents", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data;
  },

  async deleteDocument(id: string): Promise<void> {
    await apiClient.delete(`/documents/${id}`);
  },

  async getDocumentById(id: string): Promise<Document> {
    const response = await apiClient.get(`/documents/${id}`);
    return response.data.data;
  },
};