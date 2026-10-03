import { WebSocketServer } from "ws";
import * as cookie from "cookie";

const wss = new WebSocketServer({ port: 3001 });

wss.on("connection", function (socket, request) {
  const cookies = cookie.parseCookie(request.headers.cookie || "");
  const token = cookies.token;
  if (!token) {
    wss.close();
  } else {
    console.log(token);
    socket.on("message", function () {
      console.log("User connected");
    });
  }
});
