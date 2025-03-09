import { z } from "zod";

const base = z.object({
  name: z.string(),
  description: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional(),
});

export const createCampaignRequestSchema = base;

export const updateCampaignRequestSchema = base.partial();

export const getCampaignRequestSchema = base.partial();
