import { BACKEND_URL } from "../app/room/[slug]/config";
import { ChatRoomClient } from "./ChatRoomClient";
import axios from "axios";

async function getChats(roomId: string) {
  const response = await axios.get(`${BACKEND_URL}/api/chat/${roomId}`);
  return response.data.messages;
}

export default async function ChatRoom({ id }: { id: string }) {
  const messages = await getChats(id);
  return <ChatRoomClient messages={messages} id={id} />;
}
