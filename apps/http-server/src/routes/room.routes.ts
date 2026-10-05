import { Router } from "express";
import authMiddleware from "../middlewares/auth.middlewares";
import { createRoomHandler } from "../controllers/room.controllers";

const roomRouter = Router();

roomRouter.post("/create", authMiddleware, createRoomHandler);

export default roomRouter;
