import { z } from "zod";

const leadStatusSchema = z.enum(["New", "Contacted", "Qualified", "Converted", "Unresponsive", "Disqualified", "Archived"]);

const base = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  status: leadStatusSchema,
});

export const getLeadsRequestSchema = z.object({
  page: z.string().optional(),
  pageSize: z.string().optional(),
  name: z.string().optional(),
  status: leadStatusSchema.optional(),
  email: z.string().optional(),
  sortBy: z.enum(["name", "status", "createdAt"]).optional(),
  order: z.enum(["asc", "desc"]).optional(),
});

export const CreateLeadRequestSchema = base;

export const UpdateLeadRequestSchema = base.partial();
