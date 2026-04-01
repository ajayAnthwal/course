"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@/components/ui";
import { useCreateLead } from "../hooks/useLeads";
import { createLeadSchema, type CreateLeadInput } from "../schemas/lead.schema";

interface LeadFormProps {
  collegeId?: string;
  collegeName?: string;
  onSuccess?: () => void;
}

export function LeadForm({ collegeId, collegeName, onSuccess }: LeadFormProps) {
  const createLead = useCreateLead();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateLeadInput>({
    resolver: zodResolver(createLeadSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      college: collegeId || "",
      course: "",
      message: "",
    },
  });

  const onSubmit = (data: CreateLeadInput) => {
    createLead.mutate(data, {
      onSuccess: () => {
        reset();
        onSuccess?.();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {collegeName && (
        <div className="p-3 rounded-lg bg-primary-50 border border-primary-200 text-primary-700 text-sm">
          Enquiring for: <strong>{collegeName}</strong>
        </div>
      )}

      {createLead.isError && (
        <div className="p-3 rounded-lg bg-error-50 border border-error-200 text-error-600 text-sm">
          {createLead.error?.message || "Failed to submit enquiry"}
        </div>
      )}

      {createLead.isSuccess && (
        <div className="p-3 rounded-lg bg-secondary-50 border border-secondary-200 text-secondary-700 text-sm">
          Your enquiry has been submitted successfully!
        </div>
      )}

      <Input
        label="Full Name"
        placeholder="Enter your name"
        error={errors.name?.message}
        {...register("name")}
      />

      <Input
        label="Email"
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

      <Input
        label="Course of Interest"
        placeholder="e.g., B.Tech Computer Science"
        error={errors.course?.message}
        {...register("course")}
      />

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1.5">
          Message (Optional)
        </label>
        <textarea
          className="flex w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 min-h-[100px]"
          placeholder="Any specific questions or requirements..."
          {...register("message")}
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        size="lg"
        isLoading={createLead.isPending}
      >
        Submit Enquiry
      </Button>
    </form>
  );
}
