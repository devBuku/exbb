import { Router } from "express";
import authMiddleware from "../middlewares/auth.middlewares";

const roomRouter = Router();

roomRouter.post("/create", authMiddleware, function (req, res) {
  res.send("Room created");
});

export default roomRouter;
