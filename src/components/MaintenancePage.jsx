// src/components/MaintenancePage.jsx

"use client";

import { motion } from "framer-motion";
import { Wrench } from "lucide-react";

const MaintenancePage = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0D1A3C] text-white">
      <div className="flex flex-col items-center transform scale-100 xl:scale-120 2xl:scale-200 2xl:m-50 2xl:text-xl transition-transform duration-500 ease-in-out">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "linear",
          }}
          className="w-24 h-24 mb-8 border-4 border-gray-700 rounded-full flex items-center justify-center"
        >
          <Wrench size={48} className="text-gray-500" />
        </motion.div>
        <h1 className="text-3xl font-bold mb-2 text-center">
          Tinkering with some stuff...
        </h1>
        <p className="text-gray-400 text-center">
          Be right back! We're making things even better.
        </p>
      </div>
    </div>
  );
};

export default MaintenancePage;
