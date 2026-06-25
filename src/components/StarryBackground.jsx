// src/components/StarryBackground.jsx

"use client";

import { useEffect, useRef } from "react";

const StarryBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let stars = [];
    let animationFrameId;
    const paused = { current: false };
    const isMobile = () => window.innerWidth < 768;

    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createStars = () => {
      stars = [];
      // Reduce density on mobile to avoid scroll jank
      const divisor = isMobile() ? 4000 : 1000;
      const starCount = Math.floor((canvas.width * canvas.height) / divisor);
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5,
          opacity: Math.random(),
          opacityV: (Math.random() - 0.5) * 0.02, // Slower twinkle to reduce GPU load
        });
      }
    };

    const draw = () => {
      if (paused.current) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        star.opacity += star.opacityV;
        if (star.opacity > 1 || star.opacity < 0) {
          star.opacityV *= -1;
        }
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(draw);
    };

    // Pause animation when tab is hidden to save CPU/GPU
    const handleVisibilityChange = () => {
      paused.current = document.hidden;
    };

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        cancelAnimationFrame(animationFrameId);
        setCanvasDimensions();
        createStars();
        draw();
      }, 150);
    };

    // Initial setup
    setCanvasDimensions();
    createStars();
    draw();

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-10] bg-[#0D1A3C]">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ willChange: "transform", transform: "translateZ(0)" }}
      />
    </div>
  );
};

export default StarryBackground;
