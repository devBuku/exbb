import { useEffect, useState } from "react";
import { WS_URL } from "../app/room/[slug]/config";

export function useSocket() {
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<WebSocket>();

  useEffect(() => {
    // TODO: temp hardcoded token, replace with real auth flow
    document.cookie =
      "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5ZjEyMjRjYS1kOGYwLTQzMGEtYWYxOS1lODEyZGRjYjI0NzAiLCJpYXQiOjE3OTEyOTMxNTZ9.TcO29Nno0SOIhWjyuPvFRyRHRAyWPAq8uOa0jeXGH6o; Path=/";
    const ws = new WebSocket(WS_URL);
    ws.onopen = () => {
      setLoading(false);
      setSocket(ws);
    };
  }, []);

  return {
    socket,
    loading,
  };
}
