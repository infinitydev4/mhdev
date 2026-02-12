"use client"
import React, { useEffect, useRef, useState } from "react";
 
interface HackerBackgroundProps {
  color?: string;
  fontSize?: number;
  className?: string;
  speed?: number;
}
 
const HackerBackground: React.FC<HackerBackgroundProps> = ({
  color = "#0F0",
  fontSize = 14,
  className = "",
  speed = 0.5,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Delay animation start to improve initial load
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
 
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
 
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
 
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
 
    let animationFrameId: number;
 
    const columns = Math.floor(canvas.width / fontSize);
    const maxRows = Math.ceil(canvas.height / fontSize);
    const drops: number[] = Array.from({ length: columns }, () => Math.floor(Math.random() * maxRows));
 
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+";
 
    let lastTime = 0;
    const interval = 33; // ~30 fps
 
    const draw = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(draw);
 
      if (currentTime - lastTime < interval) return;
      lastTime = currentTime;
 
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
 
      ctx.fillStyle = color;
      ctx.font = `${fontSize}px monospace`;
 
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
 
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += speed;
      }
      
    };
 
    animationFrameId = requestAnimationFrame(draw);
 
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, fontSize, speed, isVisible]);
 
  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    />
  );
};
 
export default HackerBackground;