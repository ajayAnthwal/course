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
  const [isInitialized, setIsInitialized] = useState(false);

  // Check stored auth on mount
  useEffect(() => {
    const storedUser = authService.getStoredUser();
    const token = authService.getStoredToken();
    if (storedUser && token) {
      setUser(storedUser);
      setIsAuthenticated(true);
    }
    setIsInitialized(true);
  }, []);

  // Get current user query (validates token with backend)
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
    enabled: isAuthenticated && isInitialized,
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (response) => {
      const authData = response.data;
      if (response.success && authData?.user && authData?.token) {
        authService.setAuthData(authData.token, authData.user);
        setUser(authData.user);
        setIsAuthenticated(true);
        queryClient.invalidateQueries({ queryKey: ["auth"] });
        router.push(`/dashboard/${authData.user.role}`);
      }
    },
  });

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: (response) => {
      const authData = response.data;
      if (response.success && authData?.user && authData?.token) {
        authService.setAuthData(authData.token, authData.user);
        setUser(authData.user);
        setIsAuthenticated(true);
        queryClient.invalidateQueries({ queryKey: ["auth"] });
        router.push(`/dashboard/${authData.user.role}`);
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
      role: "student" | "teacher";
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
    isLoading: !isInitialized || isUserLoading,
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
