// CursorFollower.jsx
import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CursorFollower = () => {
  // Create motion values for x and y coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Create spring-based motion values for smooth following
  // Adjust stiffness and damping for more or less "lag"
  const springConfig = {
    damping: 20,   // Controls the oscillation (lower = more oscillation)
    stiffness: 200 // Controls the speed of the spring (lower = slower)
  };

  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    // Add event listener to the window
    window.addEventListener('mousemove', handleMouseMove);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]); // Dependencies to re-run effect if motion values change

  return (
    <motion.div
      className="cursor-follower"
      style={{
        translateX: cursorX,
        translateY: cursorY,
        position: 'fixed',
        top: '-15px',
        left: '-15px',
        pointerEvents: 'none', // Important: Ensures the follower doesn't block clicks
        zIndex: 9999, // Ensure it's above other content
        width: '30px', // Example size
        height: '30px', // Example size
        borderRadius: '50%', // Example shape (circle)
        backgroundColor: 'rgba(255, 255, 255, 0.3)', // Example color
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // Optional: You can hide the default cursor for a cleaner look
        // cursor: 'none',
      }}
    />
  );
};

export default CursorFollower;