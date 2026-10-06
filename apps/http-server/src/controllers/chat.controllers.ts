import { prisma } from "@repo/database/prisma";
import { Request, Response } from "express";

const getAllChats = async function (req: Request, res: Response) {
  const roomId = Number(req.params.roomId);
  const messages = await prisma.chat.findMany({
    where: {
      roomId: roomId,
    },
    orderBy: {
      id: "desc",
    },
    take: 50,
  });

  res.json({
    messages: messages,
  });
};

export { getAllChats };
