// CursorFollower.jsx
import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CursorFollower = () => {
  // Create motion values for x and y coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Create spring-based motion values for smooth following
  const springConfig = {
    damping: 20,   // Controls the oscillation (lower = more oscillation)
    stiffness: 200 // Controls the speed of the spring (lower = slower)
  };

  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Function to handle both mouse and touch events
    const handlePointerMove = (e: any) => {
      let clientX, clientY;

      // Check if it's a touch event and get the first touch point
      if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        // Otherwise, it's a mouse event
        clientX = e.clientX;
        clientY = e.clientY;
      }

      mouseX.set(clientX);
      mouseY.set(clientY);
    };

    // Add event listeners to the window
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove, { passive: true }); // Use passive: true for better scroll performance on touch

    // Clean up event listeners on component unmount
    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, [mouseX, mouseY]); // Dependencies to re-run effect if motion values change

  return (
    <motion.div
      className="cursor-follower mix-blend-difference"
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
        backgroundColor: '#00D492', // Example color
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'none',
      }}
    />
  );
};

export default CursorFollower;