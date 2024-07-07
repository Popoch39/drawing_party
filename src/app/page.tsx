import CanvasComponent from "@/component/CanvasComponent";
import FloatingBar from "@/component/ui/FloatingBar";

export default function Home() {
  return (
    <main className="w-full h-full">
      <FloatingBar />
      <CanvasComponent />
    </main>
  );
}
