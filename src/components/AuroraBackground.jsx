// src/components/AuroraBackground.jsx

"use client";

import { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

const AuroraBackground = () => {
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, [color]);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;

  // iOS Safari fix: never use bottom/right on a fixed background.
  // `100vh` on iOS is the STABLE large-viewport height — it does not change
  // when the address bar slides in/out. `inset-0` includes `bottom:0` which
  // forces a per-frame recalculation every time the chrome shows/hides.
  const bgStyle = {
    height: "100vh", // stable — does NOT resize with address bar
    willChange: "transform", // GPU compositing layer
    transform: "translateZ(0)",
    WebkitTransform: "translateZ(0)",
  };

  return (
    // top-0 left-0 w-full avoids bottom:0 / right:0 — see comment above
    <div className="fixed top-0 left-0 w-full z-[-10]" style={bgStyle}>
      {/* Aurora Gradient — absolute fills the wrapper, not the viewport */}
      <motion.div style={{ backgroundImage }} className="absolute inset-0" />
      {/* 3D Starfield */}
      <div className="absolute inset-0">
        <Canvas>
          <Stars radius={50} count={2500} factor={4} fade speed={2} />
        </Canvas>
      </div>
    </div>
  );
};

export default AuroraBackground;
