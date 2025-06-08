'use client';

import { useEffect } from "react";
import { Progress } from "./components/Progress";
import { useTimeStore } from "./stores/timeStore";
import { Time } from "./Time";

export default function Home() {
  const setTime = useTimeStore(store => store.setTime);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-[100dvw] bg-black text-white">
      <Time />
      <Progress />
    </div>
  );
}
