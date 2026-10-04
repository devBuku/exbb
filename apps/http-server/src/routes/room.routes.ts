import { Router } from "express";
import authMiddleware from "../middlewares/auth.middlewares";

const roomRouter = Router();

roomRouter.post("/create", authMiddleware, function (req, res) {
  // @ts-ignore
  res.json({ userId: req.userId, message: "Room created" });
});

export default roomRouter;
