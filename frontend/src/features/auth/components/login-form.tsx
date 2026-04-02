"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@/components/ui";
import { useAuth } from "../hooks/useAuth";
import { loginSchema, type LoginInput } from "../schemas/auth.schema";
import Link from "next/link";

export function LoginForm() {
  const { login, isLoggingIn, loginError } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginInput) => {
    login(data.email, data.password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {loginError && (
        <div className="p-3 rounded-lg bg-error-50 border border-error-200 text-error-600 text-sm">
          {loginError}
        </div>
      )}

      <Input
        label="Email Address"
        type="email"
        placeholder="you@example.com"
        error={errors.email?.message}
        {...register("email")}
      />

      <Input
        label="Password"
        type="password"
        placeholder="Enter your password"
        error={errors.password?.message}
        {...register("password")}
      />

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm text-text-secondary">
          <input
            type="checkbox"
            className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
          />
          Remember me
        </label>
        <a href="#" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
          Forgot password?
        </a>
      </div>

      <Button type="submit" className="w-full" size="lg" isLoading={isLoggingIn}>
        Sign In
      </Button>

      <p className="text-center text-sm text-text-secondary">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-primary-600 hover:text-primary-700 font-medium">
          Sign Up
        </Link>
      </p>
    </form>
  );
}
