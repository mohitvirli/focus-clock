"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import MorphText from "./components/Morph";
import Magnet from "./components/Magnet";

const Digit = ({digits }: { digits: number }) => {
  const tenths = Math.floor(digits / 10);
  const units = digits % 10;
  const [config, setConfig] = useState({
    width: 256,
    margin: '-30px',
  });

  useEffect(() => {
    if (isMobile) {
      setConfig({
        width: 40,
        margin: '-29px',
      });
    } else {
      setConfig({
        width: 150,
        margin: '-30px',
      });
    }
  }, []);
  return (
    <motion.div className="flex items-center justify-center"
      animate={ { opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 1.5 }}>
      <Magnet padding={80} disabled={false} magnetStrength={20}>
        <MorphText text={tenths} width={config.width}/>
      </Magnet>
      <div className={`ml-[${config.margin}]`}>
        <Magnet padding={80} disabled={false} magnetStrength={20}>
          <MorphText text={units} width={config.width}/>
        </Magnet>
      </div>
    </motion.div>
  );

}
export const Time = () => {
  const [time, setTime] = useState(new Date());
  const [opacity, setOpacity] = useState(0.3);
  const [fontSize, setFontSize] = useState(156);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now);
      setOpacity(prev => prev === 0.3 ? 0.7 : 0.3);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setFontSize(30);
    } else {
      setFontSize(156);
    }
  }, []);


  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex">
        <Digit digits={time.getHours()} />
        <div className="text-9xl mx-2" style={ { fontSize, opacity, transitionDuration: '0.5s', }}>:</div>
        <Digit digits={time.getMinutes()} />
        <div className="text-9xl mx-2" style={ { fontSize, opacity, transitionDuration: '0.5s', }}>:</div>
        <Digit digits={time.getSeconds()} />
      </div>
    </div>
  );
}