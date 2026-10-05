import { prisma } from "@repo/database/prisma";
import { createRoomSchema } from "@repo/validation/user";
import { Request, Response } from "express";
const createRoomHandler = async function (req: Request, res: Response) {
  const response = createRoomSchema.safeParse(req.body);
  if (!response.success) {
    res.status(400).json("Invalid Input");
    return;
  }
  //@ts-ignore
  const userId = req.userId;
  try {
    const room = await prisma.room.create({
      data: { slug: response.data.name, adminId: userId },
    });
    res.status(201).json({ RoomId: room.id });
  } catch (error) {
    res.status(411).json({ message: "Room already exists with this name" });
  }
};

export { createRoomHandler };
