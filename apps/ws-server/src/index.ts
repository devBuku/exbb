import { WebSocketServer } from "ws";
import * as cookie from "cookie";
import jwt, { JwtPayload } from "jsonwebtoken";

const wss = new WebSocketServer({ port: 3001 });

wss.on("connection", function (socket, request) {
  const cookies = cookie.parseCookie(request.headers.cookie || "");
  const token = cookies.token;
  if (!token) {
    wss.close();
  } else {
    console.log(token);
    const decoded = jwt.verify(token, "123124");
    if (!decoded || !(decoded as JwtPayload).userId) {
      wss.close();
      return;
    }
    const userId = (decoded as JwtPayload).userId;
    socket.on("message", function () {
      console.log("User connected with id: " + userId);
      socket.send(userId + " :this is your userId");
    });
  }
});
