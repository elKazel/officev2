
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

const FluidBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#080808] pointer-events-none">
      
      {/* Blob 1: Corporate Blue - Statisches Licht zur Vermeidung von Scroll-Artefakten */}
      <div
        className="absolute top-[-10%] left-[-10%] w-[100vw] h-[100vw] bg-[#0ea5e9] rounded-full mix-blend-screen filter blur-[140px] opacity-[0.06]"
        style={{ transform: 'translate3d(0,0,0)' }}
      />

      {/* Blob 2: Deep Navy */}
      <div
        className="absolute top-[30%] right-[-20%] w-[80vw] h-[80vw] bg-[#1a365d] rounded-full mix-blend-screen filter blur-[140px] opacity-[0.12]"
        style={{ transform: 'translate3d(0,0,0)' }}
      />

      {/* Blob 3: White Glow */}
      <div
        className="absolute bottom-[-20%] left-[10%] w-[60vw] h-[60vw] bg-white rounded-full mix-blend-screen filter blur-[140px] opacity-[0.02]"
        style={{ transform: 'translate3d(0,0,0)' }}
      />
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-[#080808] opacity-80" />
    </div>
  );
};

export default FluidBackground;
