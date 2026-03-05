
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';
import { motion } from 'framer-motion';

interface GradientTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const GradientText: React.FC<GradientTextProps> = ({ text, as: Component = 'span', className = '' }) => {
  return (
    <Component className={`relative inline-block font-black tracking-tighter isolate ${className}`}>
      {/* Main Gradient Text - Updated to use the consistent Blue theme */}
      <motion.span
        className="absolute inset-0 z-10 block bg-gradient-to-r from-white via-[#7dd3fc] via-[#0ea5e9] via-[#0369a1] to-white bg-[length:200%_auto] bg-clip-text text-transparent will-change-[background-position]"
        animate={{
          backgroundPosition: ['0% center', '200% center'],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
        }}
        aria-hidden="true"
        style={{ 
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      >
        {text}
      </motion.span>
      
      {/* Base layer for solid white fallback */}
      <span 
        className="block text-white"
        style={{ 
          opacity: 0.95
        }}
      >
        {text}
      </span>
      
      {/* Blur Glow Effect - Updated with matching blues */}
      <span
        className="absolute inset-0 -z-10 block bg-gradient-to-r from-[#7dd3fc] via-[#0ea5e9] via-[#0369a1] to-[#7dd3fc] bg-[length:200%_auto] bg-clip-text text-transparent blur-xl md:blur-2xl opacity-40"
        style={{ 
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          transform: 'translateZ(0)' 
        }}
      >
        {text}
      </span>
    </Component>
  );
};

export default GradientText;
