import { z } from "zod";

export const followupValidation = {
  create: z.object({
    lead: z.string().min(1, "Lead ID is required"),
    type: z.enum(["call", "meeting", "email", "reminder", "note"]).optional(),
    subject: z.string().min(1, "Subject is required"),
    description: z.string().optional(),
    dueDate: z.string().min(1, "Due date is required"),
    priority: z.enum(["low", "medium", "high"]).optional(),
  }),
  update: z.object({
    type: z.enum(["call", "meeting", "email", "reminder", "note"]).optional(),
    subject: z.string().optional(),
    description: z.string().optional(),
    status: z.enum(["pending", "completed", "cancelled", "missed"]).optional(),
    dueDate: z.string().optional(),
    outcome: z.string().optional(),
    priority: z.enum(["low", "medium", "high"]).optional(),
  }),
};