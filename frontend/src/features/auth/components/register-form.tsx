"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@/components/ui";
import { useAuth } from "../hooks/useAuth";
import { registerSchema, type RegisterInput } from "../schemas/auth.schema";
import Link from "next/link";
import { cn } from "@/lib/utils";

const roleOptions = [
  {
    label: "Student",
    value: "student" as const,
    description: "Find colleges, compare courses, track applications",
    icon: "🎓",
  },
  {
    label: "College Admin",
    value: "college" as const,
    description: "Manage your college listing and view enquiries",
    icon: "🏛️",
  },
];

export function RegisterForm() {
  const { register: registerUser, isRegistering, registerError } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
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

  const selectedRole = watch("role");

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

      {/* Role Selection - Radio Cards */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-3">
          I am a
        </label>
        <div className="grid grid-cols-2 gap-3">
          {roleOptions.map((option) => (
            <label
              key={option.value}
              className={cn(
                "relative flex flex-col items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200",
                selectedRole === option.value
                  ? "border-primary-500 bg-primary-50 shadow-sm"
                  : "border-neutral-200 bg-white hover:border-neutral-300"
              )}
            >
              <input
                type="radio"
                value={option.value}
                className="sr-only"
                {...register("role")}
              />
              <span className="text-2xl mb-2">{option.icon}</span>
              <span className="text-sm font-semibold text-neutral-900">
                {option.label}
              </span>
              <span className="text-xs text-neutral-500 text-center mt-1 leading-tight">
                {option.description}
              </span>
              {selectedRole === option.value && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </label>
          ))}
        </div>
        {errors.role && (
          <p className="mt-1.5 text-sm text-error-500">{errors.role.message}</p>
        )}
      </div>

      <Input
        label="Password"
        type="password"
        placeholder="Min 8 characters (uppercase, lowercase, number)"
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
