"use client";
import { useEffect, useRef } from "react";

const LABELS = [
  "OLLAMA",
  "TRUENAS",
  "ESXI",
  "UNIFI",
  "N8N",
  "VERCEL",
  "CLOUDFLARE",
  "GATEWAY",
  "IMMICH",
  "NEXTCLOUD",
  "UPTIME",
  "NPM",
];

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  label?: string;
};

export default function Constellation() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;

    let w = 0;
    let h = 0;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const nodes: Node[] = [];

    const seed = () => {
      nodes.length = 0;
      const count = w < 720 ? 26 : 46;
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          r: Math.random() * 1.6 + 0.7,
          label: i < LABELS.length && w >= 720 ? LABELS[i] : undefined,
        });
      }
    };

    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      if (reduced) draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const maxDist = w < 720 ? 110 : 150;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < maxDist) {
            const alpha = (1 - d / maxDist) * 0.16;
            ctx.strokeStyle = `rgba(18,122,102,${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      ctx.font = "9px 'IBM Plex Mono', monospace";
      for (const n of nodes) {
        ctx.fillStyle = n.label
          ? "rgba(18,122,102,0.85)"
          : "rgba(24,34,52,0.35)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.label ? n.r + 0.8 : n.r, 0, Math.PI * 2);
        ctx.fill();
        if (n.label) {
          ctx.fillStyle = "rgba(77,90,110,0.6)";
          ctx.fillText(n.label, n.x + 8, n.y + 3);
        }
      }
    };

    const tick = () => {
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = w + 20;
        if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20;
        if (n.y > h + 20) n.y = -20;
      }
      draw();
      raf = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    if (!reduced) raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="hero-canvas" aria-hidden="true" />;
}
