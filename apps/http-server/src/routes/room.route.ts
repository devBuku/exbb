import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
const roomRouter = Router();

roomRouter.post("/create", authMiddleware, function (req, res) {
  res.send("Hello World");
});

export default roomRouter;
