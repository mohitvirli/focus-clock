'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import CursorFollower from "./components/CursorFollower";
import Magnet from "./components/Magnet";
import { Progress } from "./components/Progress";
import { useTimeStore } from "./stores/timeStore";
import { Time } from "./Time";
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
      <a href="https://github.com/mohitvirli/focus-clock" target="_blank" className="absolute top-4 right-4">
        <Magnet magnetStrength={10}>
          <motion.div whileHover={{ scale: 1.5 }} whileTap={{ scale: 0.9 }}>
            <Image src="./github.svg" width="24" height="24" alt="github"/>
          </motion.div>
        </Magnet>
      </a>
    </div>
  );
}
