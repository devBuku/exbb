import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 3001 });

wss.on("connection", function connection(ws) {
  ws.on("message", function message(data) {
    ws.send(data + " :sent by server!");
    console.log("received: %s", data);
  });
});
