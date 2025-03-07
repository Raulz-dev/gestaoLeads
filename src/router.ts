import { Router } from "express";
import { HttpError } from "./Error/httpError";
import { leadController } from "./controller/LeadsController";

const router = Router();

const leadsController = new leadController();

router.get("/leads", leadsController.index);
router.post("/leads", leadsController.create);
router.get("/leads/:id", leadsController.show);
router.put("/leads/:id", leadsController.update);
router.delete("/leads/:id", leadsController.delete);

router.get("/status", async (req, res, next) => {
  try {
    throw new HttpError(401, "Não autorizado");
    res.json({ message: "ok" });
  } catch (error) {
    next(error);
  }
});
export { router };
