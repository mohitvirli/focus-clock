"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import Magnet from "./components/Magnet";
import MorphText from "./components/Morph";
import { useTimeStore } from "./stores/timeStore";

const Digit = ({digits }: { digits: number }) => {
  const tenths = Math.floor(digits / 10);
  const units = digits % 10;
  const [config, setConfig] = useState({
    width: 256,
    marginLeft: '-60px',
  });

  useEffect(() => {
    if (isMobile) {
      setConfig({
        width: 40,
        marginLeft: '-20px',
      });
    } else {
      setConfig({
        width: 150,
        marginLeft: '-60px',
      });
    }
  }, [isMobile]);

  return (
    <motion.div className="flex items-center justify-center"
      animate={ { opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 1.5 }}>
      <Magnet padding={80} disabled={false} magnetStrength={20}>
        <MorphText text={tenths} width={config.width}/>
      </Magnet>
      <div style={ { marginLeft: config.marginLeft, display: 'inline-flex' }}>
        <Magnet padding={80} disabled={false} magnetStrength={20}>
          <MorphText text={units} width={config.width}/>
        </Magnet>
      </div>
    </motion.div>
  );

}
export const Time = () => {
  const { hour, minute, second } = useTimeStore();
  const [opacity, setOpacity] = useState(0.3);
  const [fontSize, setFontSize] = useState(156);

  useEffect(() => {
    setOpacity(prev => prev === 0.3 ? 0.7 : 0.3);
  }, [second]);

  useEffect(() => {
    setFontSize(isMobile ? 30 : 156);
  }, []);


  return (
    <div className="flex flex-col items-center justify-center h-[100dvh] z-10">
      <div className="flex">
        <Digit digits={hour} />
        <div className="text-9xl mx-2" style={ { fontSize, opacity, transitionDuration: '0.5s', }}>:</div>
        <Digit digits={minute} />
        <div className="text-9xl mx-2" style={ { fontSize, opacity, transitionDuration: '0.5s', }}>:</div>
        <Digit digits={second} />
      </div>
    </div>
  );
}