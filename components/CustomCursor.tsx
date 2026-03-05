
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 400, mass: 0.1 }; 
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      if (!target) return;

      const clickable = target.closest('button') || 
                        target.closest('a') || 
                        target.closest('[data-hover="true"]');
      setIsHovering(!!clickable);

      // Check if we should hide the cursor (e.g. over cross-origin iframes)
      const hideArea = target.closest('[data-hide-cursor="true"]');
      setIsHidden(!!hideArea);
    };

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference flex items-center justify-center hidden md:flex will-change-transform"
      style={{ x, y, translateX: '-50%', translateY: '-50%' }}
    >
      <motion.div
        className="relative rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.4)] flex items-center justify-center"
        style={{ width: 80, height: 80 }}
        animate={{
          scale: isHovering ? 1.6 : 1, 
          opacity: isHidden ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
      >
        <motion.span 
          className="z-10 text-black font-bold uppercase tracking-widest text-[10px] overflow-hidden whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: isHovering && !isHidden ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          ANSEHEN
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

export default CustomCursor;
