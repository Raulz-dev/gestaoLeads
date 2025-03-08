import { z } from "zod";

export const createGroupRequestSchema = z.object({
  name: z.string(),
  description: z.string(),
});
export const UpdateGroupRequestSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
});
