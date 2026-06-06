/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  type: "heart" | "petal" | "sparkle";
  color: string;
  opacity: number;
}

interface BackgroundHeartsProps {
  density?: number;
  intensity?: "gentle" | "rich";
}

export default function BackgroundHearts({ density = 70, intensity = "gentle" }: BackgroundHeartsProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const colors = {
      heart: ["#e11d48", "#f43f5e", "#ff85a1", "#fb7185", "#f472b6"],
      petal: ["#fb7185", "#f472b6", "#fda4af", "#ffb3c1"],
      sparkle: ["#fbbf24", "#fef08a", "#ffffff"],
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const createParticle = (isInit = false): Particle => {
      const types: ("heart" | "petal" | "sparkle")[] = ["heart", "petal", "sparkle"];
      const type = types[Math.floor(Math.random() * types.length)];
      const sizeList = type === "heart" ? [10, 15, 8] : type === "petal" ? [12, 16, 10] : [4, 6, 3];
      const size = sizeList[Math.floor(Math.random() * sizeList.length)];

      const colorArray = colors[type];
      const color = colorArray[Math.floor(Math.random() * colorArray.length)];

      return {
        x: Math.random() * canvas.width,
        y: isInit ? Math.random() * canvas.height : -20,
        size,
        speedY: (Math.random() * 1.2 + 0.5) * (intensity === "rich" ? 1.5 : 1),
        speedX: Math.random() * 0.8 - 0.4,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() * 0.02 - 0.01) * 2,
        type,
        color,
        opacity: Math.random() * 0.4 + 0.3,
      };
    };

    const limit = intensity === "rich" ? density * 1.5 : density;
    for (let i = 0; i < limit; i++) {
      particles.push(createParticle(true));
    }

    const drawHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.beginPath();
      ctx.moveTo(x, y + size / 4);
      ctx.quadraticCurveTo(x, y, x + size / 2, y);
      ctx.quadraticCurveTo(x + size, y, x + size, y + size / 3);
      ctx.quadraticCurveTo(x + size, y + (size * 2) / 3, x + size / 2, y + size);
      ctx.quadraticCurveTo(x, y + (size * 2) / 3, x, y + size / 3);
      ctx.quadraticCurveTo(x, y, x, y + size / 4);
      ctx.closePath();
      ctx.fill();
    };

    const drawPetal = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.quadraticCurveTo(x + size, y - size / 2, x + size, y + size / 2);
      ctx.quadraticCurveTo(x, y + size, x, y);
      ctx.closePath();
      ctx.fill();
    };

    const drawSparkle = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        ctx.lineTo(x + Math.cos((i * Math.PI) / 2) * size, y + Math.sin((i * Math.PI) / 2) * size);
        ctx.lineTo(x + Math.cos(((i + 0.5) * Math.PI) / 2) * (size / 3), y + Math.sin(((i + 0.5) * Math.PI) / 2) * (size / 3));
      }
      ctx.closePath();
      ctx.fill();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, index) => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;

        if (p.type === "heart") {
          drawHeart(ctx, -p.size / 2, -p.size / 2, p.size);
        } else if (p.type === "petal") {
          drawPetal(ctx, -p.size / 2, -p.size / 2, p.size);
        } else {
          drawSparkle(ctx, 0, 0, p.size);
        }

        ctx.restore();

        // Update position
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;

        // Oscillating horizontal motion
        p.speedX += Math.sin(p.y * 0.01) * 0.01;

        // Reset if went off screen
        if (p.y > canvas.height + 20 || p.x < -20 || p.x > canvas.width + 20) {
          particles[index] = createParticle(false);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [density, intensity]);

  return (
    <canvas
      id="falling-particles-canvas"
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
