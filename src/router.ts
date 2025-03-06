import { Router } from "express";
import { HttpError } from "./Error/httpError";

const router = Router();

router.get("/status", async (req, res, next) => {
  try {
    throw new HttpError(401, "Não autorizado");
    res.json({ message: "ok" });
  } catch (error) {
    next(error);
  }
});
export { router };
