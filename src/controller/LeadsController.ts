import { Handler } from "express";
import { prisma } from "../database";
import { CreateLeadRequestSchema } from "./schema/LeadsRequestSchema";
import { HttpError } from "../Error/httpError";

export class leadController {
  index: Handler = async (req, res, next) => {
    try {
      const leads = await prisma.lead.findMany();
      res.status(200).json(leads);
    } catch (error) {
      next(error);
    }
  };
  create: Handler = async (req, res, next) => {
    try {
      const body = CreateLeadRequestSchema.parse(req.body);
      const newLead = await prisma.lead.create({
        data: body,
      });
      res.status(201).json(newLead);
    } catch (error) {
      next(error);
    }
  };
  show: Handler = async (req, res, next) => {
    try {
      const lead = await prisma.lead.findUnique({
        where: {
          id: +req.params.id,
        },
        include: {
          groups: true,
          campaigns: true,
        },
      });
      if (!lead) throw new HttpError(404, "Lead não encontrado");
      res.json(lead);
    } catch (error) {
      next(error);
    }
  };
  update: Handler = async (req, res, next) => {
    try {
      const { name, email, phone, status } = req.body;
      const newLead = await prisma.lead.update({
        where: {
          id: +req.params.id,
        },
        data: {
          name,
          email,
          phone,
          status,
        },
      });
      res.json(newLead);
    } catch (error) {
      next(error);
    }
  };
  delete: Handler = async (req, res, next) => {
    const deletedLead = await prisma.lead.delete({
      where: { id: +req.params.id },
    });
    res.json(deletedLead);
  };
}
