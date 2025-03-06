import cors from "cors";
import express from "express";
import { router } from "./router";
import { errorHandlerMiddleware } from "./middlewares/error-handler";

const app = express();

app.use(cors());
app.use("/api", router);
app.use(errorHandlerMiddleware);

app.listen(3000, () => console.log(`Rodando na porta 3000`));
