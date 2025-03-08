import { Router } from "express";
import { HttpError } from "./Error/httpError";
import { leadController } from "./controller/LeadsController";
import { groupsController } from "./controller/groupsController";

const router = Router();

const groupController = new groupsController();
const leadsController = new leadController();

router.get("/leads", leadsController.index);
router.post("/leads", leadsController.create);
router.get("/leads/:id", leadsController.show);
router.put("/leads/:id", leadsController.update);
router.delete("/leads/:id", leadsController.delete);

router.get("/groups", groupController.index);
router.get("/groups/:id", groupController.show);
router.post("/groups", groupController.create);
router.put("/groups/:id", groupController.update);
router.delete("/groups/:id", groupController.delete);

router.get("/status", async (req, res, next) => {
  try {
    res.json({ message: "Servidor rodando sem problemas." });
  } catch (error) {
    next(error);
  }
});
export { router };
