"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Select } from "@/components/ui";
import { useAuth } from "../hooks/useAuth";
import { registerSchema, type RegisterInput } from "../schemas/auth.schema";
import Link from "next/link";

const roleOptions = [
  { label: "Student", value: "student" },
  { label: "College Admin", value: "college" },
  { label: "Teacher", value: "teacher" },
];

export function RegisterForm() {
  const { register: registerUser, isRegistering, registerError } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "student",
      phone: "",
    },
  });

  const onSubmit = (data: RegisterInput) => {
    registerUser(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {registerError && (
        <div className="p-3 rounded-lg bg-error-50 border border-error-200 text-error-600 text-sm">
          {registerError}
        </div>
      )}

      <Input
        label="Full Name"
        type="text"
        placeholder="John Doe"
        error={errors.name?.message}
        {...register("name")}
      />

      <Input
        label="Email Address"
        type="email"
        placeholder="you@example.com"
        error={errors.email?.message}
        {...register("email")}
      />

      <Input
        label="Phone Number"
        type="tel"
        placeholder="+91 9876543210"
        error={errors.phone?.message}
        {...register("phone")}
      />

      <Select
        label="I am a"
        options={roleOptions}
        placeholder="Select your role"
        error={errors.role?.message}
        {...register("role")}
        onChange={(e) => setValue("role", e.target.value as RegisterInput["role"])}
      />

      <Input
        label="Password"
        type="password"
        placeholder="Min 8 characters"
        error={errors.password?.message}
        {...register("password")}
      />

      <Input
        label="Confirm Password"
        type="password"
        placeholder="Confirm your password"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      <Button type="submit" className="w-full" size="lg" isLoading={isRegistering}>
        Create Account
      </Button>

      <p className="text-center text-sm text-neutral-600">
        Already have an account?{" "}
        <Link href="/login" className="text-primary-600 hover:text-primary-700 font-medium">
          Sign In
        </Link>
      </p>
    </form>
  );
}
