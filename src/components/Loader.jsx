// project/src/components/Loader.jsx

"use client";

import { motion } from "framer-motion";
import { SVGLetter } from "./LoaderSVGs";

const Loader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 2.5, duration: 0.5 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0D1A3C]"
    >
      <div className="loader">
        <span className="l">
          <SVGLetter letter="L" className="letter" />
        </span>
        <span className="o">
          <SVGLetter letter="O" className="letter" />
        </span>
        <span className="a">
          <SVGLetter letter="A" className="letter" />
        </span>
        <span className="d">
          <SVGLetter letter="D" className="letter" />
        </span>
        <span className="ispan">
          <SVGLetter letter="I" className="letter i" />
        </span>
        <span className="n">
          <SVGLetter letter="N" className="letter" />
        </span>
        <span className="g">
          <SVGLetter letter="G" className="letter" />
        </span>
      </div>
    </motion.div>
  );
};

export default Loader;
