import { z } from "zod";


// this is a custom schema 
export const createIssueSchema = z.object({
  // this is the schema of validation with zod
  title: z.string().min(1, "Title is required").max(255), // the second arg is the error-message
  description: z.string().min(1, "Description is required"),
});
