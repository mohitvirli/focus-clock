'use client';

import { useAnimate } from "framer-motion";
import { useEffect, useState } from "react";
import { useTimeStore } from "../stores/timeStore";

export const Progress = () => {
  const divs = new Array(60).fill(null);
  const [scope, animate] = useAnimate();
  const { second, minute } = useTimeStore();
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const newWidth = (window.innerWidth ?? 0) / divs.length;
      setWidth(newWidth);
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call to set width on mount
    return () => window.removeEventListener("resize", handleResize)
  }, []);

  useEffect(() => {
    [...scope.current.children].forEach((child, index) => {
      if (index < minute) {
        animate(child, {
          bottom: 0,
          opacity: 1,
          rotate: '180deg',
        }, { duration: 1, delay: index * 0.03, ease: "easeInOut" });
      } else if (minute === index) {
        animate(child, {
          bottom: 0,
          opacity: 1,
          rotate: '180deg',
        }, { duration: 60 - second, ease: "easeInOut" });
      } else {
        animate(child, {
          bottom: '400px',
          opacity: 0,
          rotate: `90deg`,
        }, { duration: 1,  delay: (60 - index) * 0.03, ease: "easeInOut" });
      }

    });
  }, [minute]);

  return (
    <div className="w-full flex fixed bottom-0 bg-emerald-900" style={{ height: `${width}px`}}ref={scope}>
      {divs.map((_, index) => (
        <div
          key={index}
          className="bg-emerald-400 border-emerald-400 border-1"
          style={{
            position: 'absolute',
            width: `${width}px`,
            height: `${width}px`,
            bottom: '400px',
            opacity: 0,
            boxSizing: 'content-box',
            left: `${index * width}px`,
          }}
        />
      ))}
    </div>
  )
}
