import Canvas from "@/app/components/Canvas";

interface CanvasPageProps {
  params: Promise<{ roomId: string }>;
}

export default async function CanvasPage({ params }: CanvasPageProps) {
  const { roomId } = await params;
  console.log(roomId);
  return <Canvas roomId={roomId} />;
}
