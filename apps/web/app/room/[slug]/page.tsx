import { BACKEND_URL } from "./config";
import axios from "axios";
import ChatRoom from "../../../components/ChatRoom";

async function getRoom(slug: string) {
  const response = await axios.get(`${BACKEND_URL}/api/room/${slug}`);
  return response.data.id;
}

export default async function Chatroom({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const roomId = await getRoom(slug);
  return <ChatRoom id={roomId} />;
}
