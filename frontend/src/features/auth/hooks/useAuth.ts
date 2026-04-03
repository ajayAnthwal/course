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

  useEffect(() => {
    const storedUser = authService.getStoredUser();
    const token = authService.getStoredToken();
    if (storedUser && token) {
      setUser(storedUser);
      setIsAuthenticated(true);
    }
    setIsInitialized(true);
  }, []);

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

  const sendOTPMutation = useMutation({
    mutationFn: ({ phone }: { phone: string }) => authService.sendOTP(phone),
  });

  const verifyOTPMutation = useMutation({
    mutationFn: ({ phone, otp }: { phone: string; otp: string }) => authService.verifyOTP(phone, otp),
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

  const forgotPasswordMutation = useMutation({
    mutationFn: ({ email }: { email: string }) => authService.forgotPassword(email),
  });

  const resetPasswordMutation = useMutation({
    mutationFn: ({ token, newPassword }: { token: string; newPassword: string }) => 
      authService.resetPassword(token, newPassword),
  });

  const changePasswordMutation = useMutation({
    mutationFn: ({ currentPassword, newPassword }: { currentPassword: string; newPassword: string }) =>
      authService.changePassword(currentPassword, newPassword),
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

  const sendOTP = useCallback(
    (phone: string) => {
      sendOTPMutation.mutate({ phone });
    },
    [sendOTPMutation]
  );

  const verifyOTP = useCallback(
    (phone: string, otp: string) => {
      verifyOTPMutation.mutate({ phone, otp });
    },
    [verifyOTPMutation]
  );

  const forgotPassword = useCallback(
    (email: string) => {
      forgotPasswordMutation.mutate({ email });
    },
    [forgotPasswordMutation]
  );

  const resetPassword = useCallback(
    (token: string, newPassword: string) => {
      resetPasswordMutation.mutate({ token, newPassword });
    },
    [resetPasswordMutation]
  );

  const changePassword = useCallback(
    (currentPassword: string, newPassword: string) => {
      changePasswordMutation.mutate({ currentPassword, newPassword });
    },
    [changePasswordMutation]
  );

  const refreshUser = useCallback(async () => {
    const response = await authService.getMe();
    if (response.success && response.data) {
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
    }
  }, []);

  return {
    user,
    isAuthenticated,
    isLoading: !isInitialized || isUserLoading,
    login,
    register,
    logout,
    sendOTP,
    verifyOTP,
    forgotPassword,
    resetPassword,
    changePassword,
    refreshUser,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    isSendingOTP: sendOTPMutation.isPending,
    isVerifyingOTP: verifyOTPMutation.isPending,
    isForgotPassword: forgotPasswordMutation.isPending,
    isResettingPassword: resetPasswordMutation.isPending,
    isChangingPassword: changePasswordMutation.isPending,
    loginError: loginMutation.error?.message,
    registerError: registerMutation.error?.message,
  };
}
