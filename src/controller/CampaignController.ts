import { Handler } from "express";
import { prisma } from "../database";
import { createCampaignRequestSchema, updateCampaignRequestSchema } from "./schema/CampaignRequestSchema";
import { HttpError } from "../Error/httpError";

export class CampaignController {
  index: Handler = async (req, resizeBy, next) => {
    try {
      const campaigns = await prisma.campaign.findMany();
      resizeBy.json(campaigns);
    } catch (error) {
      next(error);
    }
  };
  create: Handler = async (req, res, next) => {
    try {
      const campaignsBody = createCampaignRequestSchema.parse(req.body);
      const campaign = await prisma.campaign.create({ data: campaignsBody });
      res.status(201).json(campaign);
    } catch (error) {
      next(error);
    }
  };
  update: Handler = async (req, res, next) => {
    try {
      const campaignUpdate = updateCampaignRequestSchema.parse(req.body);

      const id = +req.params.id;
      if (!id) throw new HttpError(401, "Id não encontrado");
      const updatedCampaign = await prisma.campaign.update({
        where: {
          id: +req.params.id,
        },
        data: {
          ...campaignUpdate,
        },
      });
      res.json(updatedCampaign);
    } catch (error) {
      next(error);
    }
  };

  show: Handler = async (req, res, next) => {
    try {
      const campaign = await prisma.campaign.findUnique({
        where: {
          id: +req.params.id,
        },

        include: {
          leads: true,
        },
      });
      res.json(campaign);
    } catch (error) {
      next(error);
    }
  };

  delete: Handler = async (req, res, next) => {
    try {
      const deletedCampaign = await prisma.campaign.delete({
        where: {
          id: +req.params.id,
        },
      });
      res.json(deletedCampaign);
    } catch (error) {
      next(error);
    }
  };
}
