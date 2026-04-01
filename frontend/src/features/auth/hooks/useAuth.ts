"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/auth.service";
import { useState, useEffect, useCallback } from "react";
import type { User } from "@/types";

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Check stored auth on mount
  useEffect(() => {
    const storedUser = authService.getStoredUser();
    const token = authService.getStoredToken();
    if (storedUser && token) {
      setUser(storedUser);
      setIsAuthenticated(true);
    }
  }, []);

  // Get current user query
  const { isLoading: isUserLoading } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      const response = await authService.getMe();
      if (response.success && response.data) {
        setUser(response.data);
        setIsAuthenticated(true);
        return response.data;
      }
      throw new Error("Failed to get user");
    },
    enabled: isAuthenticated,
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (response) => {
      if (response.success && response.data) {
        authService.setAuthData(response.data.token, response.data.user);
        setUser(response.data.user);
        setIsAuthenticated(true);
        queryClient.invalidateQueries({ queryKey: ["auth"] });
        router.push(`/dashboard/${response.data.user.role}`);
      }
    },
  });

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: (response) => {
      if (response.success && response.data) {
        authService.setAuthData(response.data.token, response.data.user);
        setUser(response.data.user);
        setIsAuthenticated(true);
        queryClient.invalidateQueries({ queryKey: ["auth"] });
        router.push(`/dashboard/${response.data.user.role}`);
      }
    },
  });

  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      authService.clearAuthData();
      setUser(null);
      setIsAuthenticated(false);
      queryClient.clear();
      router.push("/");
    },
  });

  const login = useCallback(
    (email: string, password: string) => {
      loginMutation.mutate({ email, password });
    },
    [loginMutation]
  );

  const register = useCallback(
    (data: {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
      role: "student" | "college" | "teacher";
      phone?: string;
    }) => {
      registerMutation.mutate(data);
    },
    [registerMutation]
  );

  const logout = useCallback(() => {
    logoutMutation.mutate();
  }, [logoutMutation]);

  return {
    user,
    isAuthenticated,
    isLoading: isUserLoading,
    login,
    register,
    logout,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    loginError: loginMutation.error?.message,
    registerError: registerMutation.error?.message,
  };
}
