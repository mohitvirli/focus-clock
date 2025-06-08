import { Progress } from "./components/Progress";
import { Time } from "./Time";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-[100dvw] bg-black text-white">
      <Time />
      <Progress />
    </div>
  );
}
