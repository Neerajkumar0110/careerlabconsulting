import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
}

const SpaceBackground = ({ speed }: { speed: number }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const speedRef  = useRef<number>(speed);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let raf: number;
    let stars: Star[] = [];

    const setup = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;

      stars = Array.from({ length: 500 }, () => ({
        x: Math.random() * canvas.width  - canvas.width  / 2,
        y: Math.random() * canvas.height - canvas.height / 2,
        z: Math.random() * canvas.width,
      }));
    };

    const draw = () => {
      ctx.fillStyle = "#020617";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      for (const s of stars) {
        s.z -= speedRef.current;

        if (s.z <= 0) {
          s.z = canvas.width;
          s.x = Math.random() * canvas.width  - cx;
          s.y = Math.random() * canvas.height - cy;
        }

        const sx = (s.x / s.z) * cx + cx;
        const sy = (s.y / s.z) * cy + cy;
        const r  = (1 - s.z / canvas.width) * 2.5;

        if (sx >= 0 && sx < canvas.width && sy >= 0 && sy < canvas.height) {
          ctx.beginPath();
          ctx.globalAlpha = 1 - s.z / canvas.width;
          ctx.fillStyle   = "white";
          ctx.arc(sx, sy, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    setup();
    draw();

    window.addEventListener("resize", setup);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", setup);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  );
};

export default SpaceBackground;
