'use client';

import { useEffect } from "react";
import { Progress } from "./components/Progress";
import { useTimeStore } from "./stores/timeStore";
import { Time } from "./Time";
import CursorFollower from "./components/CursorFollower";
import { formatTitle } from "./utils/title";

export default function Home() {
  const setTime = useTimeStore(store => store.setTime);

  useEffect(() => {
    const interval = setInterval(() => {
      const time = new Date();
      document.title = formatTitle(time);
      setTime(time);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-[100dvh] w-[100dvw] bg-black text-white">
      <CursorFollower/>
      <Time />
      <Progress />
    </div>
  );
}
