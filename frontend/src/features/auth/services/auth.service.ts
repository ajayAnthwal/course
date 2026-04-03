import apiClient from "@/services/axios";
import type { ApiResponse, User } from "@/types";

interface LoginInput {
  email: string;
  password: string;
}

interface RegisterInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  phone?: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  async login(data: LoginInput): Promise<ApiResponse<AuthResponse>> {
    const response = await apiClient.post("/auth/login", data);
    return response.data;
  },

  async register(data: RegisterInput): Promise<ApiResponse<AuthResponse>> {
    const response = await apiClient.post("/auth/register", data);
    return response.data;
  },

  async logout(): Promise<void> {
    await apiClient.post("/auth/logout");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  async getMe(): Promise<ApiResponse<User>> {
    const response = await apiClient.get("/auth/me");
    return response.data;
  },

  async sendOTP(phone: string): Promise<ApiResponse<{ message: string }>> {
    const response = await apiClient.post("/auth/send-otp", { phone });
    return response.data;
  },

  async verifyOTP(phone: string, otp: string): Promise<ApiResponse<AuthResponse>> {
    const response = await apiClient.post("/auth/verify-otp", { phone, otp });
    return response.data;
  },

  async forgotPassword(email: string): Promise<ApiResponse<{ message: string }>> {
    const response = await apiClient.post("/auth/forgot-password", { email });
    return response.data;
  },

  async resetPassword(token: string, newPassword: string): Promise<ApiResponse<{ message: string }>> {
    const response = await apiClient.post("/auth/reset-password", { token, newPassword, confirmPassword: newPassword });
    return response.data;
  },

  async changePassword(currentPassword: string, newPassword: string): Promise<ApiResponse<{ message: string }>> {
    const response = await apiClient.post("/auth/change-password", { 
      currentPassword, 
      newPassword, 
      confirmNewPassword: newPassword 
    });
    return response.data;
  },

  setAuthData(token: string, user: User): void {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  },

  getStoredUser(): User | null {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  },

  getStoredToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
  },

  clearAuthData(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};
