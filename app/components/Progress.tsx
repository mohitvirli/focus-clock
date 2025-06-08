'use client';

import { useAnimate } from "framer-motion";
import { useEffect, useState } from "react";

export const Progress = () => {
  const divs = new Array(60).fill(null);
  const [scope, animate] = useAnimate()
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const newWidth = (window.innerWidth ?? 0) / divs.length;
      setWidth(newWidth);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize)
  }, []);

  useEffect(() => {
    if (!scope.current) return;

    [...scope.current.children].slice(0, new Date().getMinutes()).forEach((child, index) => {
      animate(child, {
        bottom: 0,
        opacity: 1,
        rotate: '180deg',
      }, { duration: 1, delay: index * 0.03, ease: "easeInOut" });
    });

    const interval = setInterval(() => {
      const now = new Date();
      const seconds = now.getSeconds();
      const minutes = now.getMinutes();
      const progress = seconds / 59;
      animate(scope.current.children[minutes], {
        bottom: 400 * (1 - progress),
        opacity: 0.2 + seconds / 50,
        rotate: `${progress*90}deg`,
      }, { duration: 1 });

    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex fixed bottom-0 bg-emerald-900" style={{ height: `${width}px`}}ref={scope}>
      {divs.map((_, index) => (
        <div
          key={index}
          className="bg-emerald-400 border-emerald-400 border-2"
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
