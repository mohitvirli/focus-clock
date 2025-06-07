"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import MorphText from "./component/morph";

const Digit = ({digits }: { digits: number }) => {
  const tenths = Math.floor(digits / 10);
  const units = digits % 10;
  return (
    <motion.div className="flex items-center justify-center"
      animate={ { opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 1.5 }}>
      <MorphText text={tenths} />
      <div className="ml-[-30px]">
        <MorphText text={units} />
      </div>
    </motion.div>
  );

}
export const Time = () => {
  const [time, setTime] = useState(new Date());
  const [opacity, setOpacity] = useState(0.3);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now);
      setOpacity(prev => prev === 0.3 ? 0.7 : 0.3);
    }, 1000);
    return () => clearInterval(interval);
  }, []);


  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex">
        <Digit digits={time.getHours()} />
        <div className="text-9xl mx-2" style={ { opacity, transitionDuration: '0.5s', }}>:</div>
        <Digit digits={time.getMinutes()} />
        <div className="text-9xl mx-2" style={ { opacity, transitionDuration: '0.5s', }}>:</div>
        <Digit digits={time.getSeconds()} />
      </div>
    </div>
  );
}