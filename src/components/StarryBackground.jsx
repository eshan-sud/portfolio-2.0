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

    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createStars = () => {
      stars = [];
      const starCount = (canvas.width * canvas.height) / 1000; // More stars based on screen size
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5, // Random size
          opacity: Math.random(),
          opacityV: (Math.random() - 0.5) * 0.05, // Twinkle speed
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        // Update opacity for twinkling effect
        star.opacity += star.opacityV;
        if (star.opacity > 1 || star.opacity < 0) {
          star.opacityV *= -1; // Reverse twinkle direction
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      cancelAnimationFrame(animationFrameId);
      setCanvasDimensions();
      createStars();
      draw();
    };

    // Initial setup
    handleResize();

    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-10] bg-[#0D1A3C]">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default StarryBackground;
