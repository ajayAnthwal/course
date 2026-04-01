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
