import { triggerAsyncId } from "async_hooks";
import { Handler } from "express";
import { prisma } from "../database";
import { createGroupRequestSchema, UpdateGroupRequestSchema } from "./schema/GroupsRequestSchema";
import { HttpError } from "../Error/httpError";

export class groupsController {
  index: Handler = async (req, res, next) => {
    try {
      const groups = await prisma.group.findMany();
      res.json(groups);
    } catch (error) {
      next(error);
    }
  };
  create: Handler = async (req, res, next) => {
    try {
      const body = createGroupRequestSchema.parse(req.body);
      const newGroup = await prisma.group.create({ data: body });
      res.status(201).json(newGroup);
    } catch (error) {
      next(error);
    }
  };
  show: Handler = async (req, res, next) => {
    try {
      const group = await prisma.group.findUnique({
        where: {
          id: +req.params.id,
        },
        include: {
          Leads: true,
        },
      });

      if (!group) throw new HttpError(404, "Grupo não encontrado");

      res.json(group);
    } catch (error) {
      next(error);
    }
  };
  update: Handler = async (req, res, next) => {
    try {
      const id = +req.params.id;
      const findGroup = await prisma.group.findUnique({ where: { id } });
      const body = UpdateGroupRequestSchema.parse(req.body);

      if (!findGroup) throw new HttpError(404, "Grupo não encontrado");

      const updatedGroup = await prisma.group.update({
        data: body,
        where: {
          id,
        },
      });
      res.json(updatedGroup);
    } catch (error) {
      next(error);
    }
  };
  delete: Handler = async (req, res, next) => {
    try {
      const id = +req.params.id;
      const findGroup = await prisma.group.findUnique({ where: { id } });

      if (!findGroup) throw new HttpError(404, "Grupo não encontrado");

      const deletedGroup = await prisma.group.delete({
        where: { id },
      });
      res.json(deletedGroup);
    } catch (error) {
      next(error);
    }
  };
}
