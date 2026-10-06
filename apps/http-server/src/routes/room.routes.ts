import { Router } from "express";
import authMiddleware from "../middlewares/auth.middlewares";
import { createRoomHandler, getRoomId } from "../controllers/room.controllers";

const roomRouter = Router();

roomRouter.post("/create", authMiddleware, createRoomHandler);
roomRouter.get("/:slug", getRoomId);

export default roomRouter;
