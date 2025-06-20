'use client';
import { useEffect, useRef, useState } from 'react';
import { animate } from 'framer-motion';

const numbers = [
  "M185,131.2c0,25.5-5.1,45.6-15.4,60.3c-10.3,14.7-24.1,22-41.7,22c-17.5,0-31.4-7.3-41.5-22 c-10.1-14.7-15.2-34.8-15.2-60.3v-6.6c0-25.5,5.1-45.7,15.2-60.4C96.6,49.4,110.4,42,128,42c17.5,0,31.4,7.4,41.7,22.1c10.3,14.8,15.4,34.9,15.4,60.4V131.2z",
  "M87.9,79.2c1.1-0.4,53.7-39.2,54.9-39.1v180.5",
  "M81.7,85.7c-1.4-67,112.3-55.1,90.2,11.6c-12.6,32-70.6,83.7-88.8,113.7h105.8",
  "M74.8,178.5c3,39.4,63.9,46.7,88.6,23.7c34.3-35.1,5.4-75.8-41.7-77c29.9,5.5,68.7-43.1,36.5-73.7 c-23.4-21.5-76.5-11.1-78.6,25",
  "M161.9,220.8 161.9,41 72.6,170.9 208.2,170.9",
  "M183.2,43.7H92.1l-10,88.3c0,0,18.3-21.9,51-21.9s49.4,32.6,49.4,48.2c0,22.2-9.5,57-52.5,57s-51.4-36.7-51.4-36.7",
  "M177.4,71.6c0,0-4.3-30.3-44.9-30.3s-57.9,45.6-57.9,88.8s9,86.5,56.2,86.5c38.9,0,50.9-22.3,50.9-60.9c0-17.6-21-44.9-48.2-44.9c-36.2,0-55.2,29.6-55.2,58.2",
  "M73.3,43.7 177.7,43.7 97.9,220.6",
  "M126.8,122.8c0,0,48.2-1.3,48.2-42.2s-48.2-39.9-48.2-39.9s-45.9,0-45.9,40.9 c0,20.5,18.8,41.2,46.9,41.2c29.6,0,54.9,18,54.9,47.2c0,0,2,44.9-54.2,44.9c-55.5,0-54.2-43.9-54.2-43.9s-0.3-47.9,53.6-47.9",
  "M78.9,186.3c0,0,4.3,30.3,44.9,30.3s57.9-45.6,57.9-88.8s-9-86.5-56.2-86.5 c-38.9,0-50.9,22.3-50.9,60.9c0,17.6,21,44.9,48.2,44.9c36.2,0,55.2-29.6,55.2-58.2"
]

export default function MorphText(props: { text: number, width?: number }) {
  const [index, setIndex] = useState(props.text ?? 0);
  const circles = useRef<SVGCircleElement[]>([]);
  const paths = useRef<SVGPathElement[]>([]);
  const circleCount = 80;
  const radius = 10;

  useEffect(() => {
    setIndex(props.text)
  }, [props.text])

  useEffect(() => {
    const length = paths.current[index].getTotalLength();
    const step = length / circleCount;

    circles.current.forEach((circle, i) => {
      const { x, y } = paths.current[index].getPointAtLength(i * step);
      animate(circle,
        { cx: x, cy: y },
        { delay: i * 0.005, ease: "easeOut" }
      )
    })
  }, [index])

  return (
    <svg viewBox="0 0 256 256" 
      width={props.width ?? 128}
      height={props.width ?? 128}
    >
      <defs>
        <filter id="filter">
          <feGaussianBlur in="SourceAlpha" stdDeviation="20" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -15" result="filter" />
        </filter>
      </defs>
      <g>
        {
          numbers.map((path, i) => {
            return <path key={i} className="hidden" ref={ref => { if (ref) paths.current[i] = ref }} d={path} />
          })
        }
      </g>

      <g>
        {
          [...Array(circleCount)].map((_, i) => {
            return <circle key={i} className="fill-white" ref={ref => { if (ref) circles.current[i] = ref }} cx="128" cy="128" r={radius} />
          })
        }
      </g>
    </svg>
  )
}