"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import Magnet from "./components/Magnet";
import MorphText from "./components/Morph";
import { useTimeStore } from "./stores/timeStore";

const Digit = ({digits, width }: { digits: number, width: number }) => {
  const tenths = Math.floor(digits / 10);
  const units = digits % 10;
  const [config, setConfig] = useState({
    width,
    marginLeft: '-60px',
  });

  useEffect(() => {
    setConfig({
      width,
      marginLeft: `${-width * 0.45}px`,
    });
  }, [width]);

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
    function handleResize() {
      const sizeDesktop = Math.max(30, Math.min(window.innerWidth* 0.15, 156));
      const sizeMobile = Math.max(20, Math.min(window.innerWidth * 0.1, 30));
      setFontSize(isMobile ? sizeMobile : sizeDesktop);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <div className="flex flex-col items-center justify-center h-[100dvh] z-10">
      <div className="flex">
        <Digit digits={hour} width={fontSize}/>
        <div className="text-9xl mx-2" style={ { fontSize, opacity, transitionDuration: '0.5s', }}>:</div>
        <Digit digits={minute} width={fontSize}/>
        <div className="text-9xl mx-2" style={ { fontSize, opacity, transitionDuration: '0.5s', }}>:</div>
        <Digit digits={second} width={fontSize}/>
      </div>
    </div>
  );
}