import { Request, Response, NextFunction } from "express";
import { ZodSchema, z } from "zod";
import AppError from "../utils/appError";

const validate = (schema: ZodSchema) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!result.success) {
      const errors = result.error.errors.map((e) => ({
        path: e.path.join("."),
        message: e.message,
      }));
      return next(new AppError(JSON.stringify(errors), 400));
    }

    next();
  };
};

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

export default validate;

export const validate = (schema: ZodSchema) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!result.success) {
      const errors = result.error.errors.map((e) => ({
        path: e.path.join("."),
        message: e.message,
      }));
      return next(new AppError(JSON.stringify(errors), 400));
    }

    next();
  };
};
