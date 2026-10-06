import WebSocket, { WebSocketServer } from "ws";
import * as cookie from "cookie";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/env";
import { prisma } from "@repo/database/prisma";

const wss = new WebSocketServer({ port: 3001 });

type User = {
  userId: string;
  rooms: number[];
  ws: WebSocket;
};

const users: User[] = [];

const checkUser = function (token: string): string | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded === "string") return null;
    if (!decoded || !decoded.userId) return null;
    return decoded.userId;
  } catch (error) {
    console.log(error);
    return null;
  }
};

wss.on("connection", function connection(ws, request): void {
  const cookies = cookie.parseCookie(request.headers.cookie || "");
  const token = cookies.token;
  if (!token) {
    ws.send("Unauthorized: connection closed!");
    ws.close();
    return;
  } else {
    const userId = checkUser(token);

    if (!userId) {
      ws.close();
      return;
    }

    users.push({
      userId,
      rooms: [],
      ws,
    });

    ws.on("message", async function message(data) {
      const parsedData = JSON.parse(data as unknown as string); // {type: "join_room", id: 1}

      if (parsedData.type === "join_room") {
        const roomId = Number(parsedData.roomId);
        const user = users.find((x) => x.ws === ws);
        user?.rooms.push(roomId);
        console.log("join_room: " + user?.rooms);
      }

      if (parsedData.type === "leave_room") {
        const user = users.find((x) => x.ws === ws);
        if (!user) {
          return;
        }
        user.rooms = user.rooms.filter((x) => x !== Number(parsedData.roomId));
        console.log("leave_room: " + user.rooms);
      }

      if (parsedData.type === "chat") {
        // {type: "chat", "message": "hi there", "roomId": "123"}
        const roomId = Number(parsedData.roomId);
        const message = parsedData.message;

        // this is really slow should use queue and not boardcast to everyone and then store to the database also because what if after boardcasting database gets crashed???
        await prisma.chat.create({
          data: {
            message: message,
            roomId: roomId,
            userId: userId,
          },
        });

        users.forEach((user) => {
          if (user.rooms.includes(roomId)) {
            user.ws.send(
              JSON.stringify({
                type: "chat",
                message: message,
                roomId,
              }),
            );
          }
        });
      }
    });
  }
});
