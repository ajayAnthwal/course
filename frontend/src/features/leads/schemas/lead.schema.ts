import { z } from "zod";

export const createLeadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  college: z.string().min(1, "Please select a college"),
  course: z.string().optional(),
  message: z.string().max(1000).optional(),
});

export type CreateLeadInput = z.infer<typeof createLeadSchema>;
