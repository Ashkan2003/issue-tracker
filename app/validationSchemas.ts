import { z } from "zod";

// this is a custom schema
export const issueSchema = z.object({
  // this is the schema of validation with zod
  title: z.string().min(1, "Title is required").max(255), // the second arg is the error-message
  description: z.string().min(1, "Description is required").max(65535),
});

// this is a custom schema
export const patchIssueSchema = z.object({
  // this is the schema of validation with zod
  title: z.string().min(1, "Title is required").max(255).optional(), // the second arg is the error-message
  description: z
    .string()
    .min(1, "Description is required")
    .max(65535)
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, "AssignedToUserId is required")
    .max(255)
    .optional()
    .nullable(),
});
