"use client";

import React, { useEffect, useRef } from "react";

interface Node3D {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  radius: number;
  colorDark: string;
  colorLight: string;
}

export const InteractiveHeroCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    let isDark = document.documentElement.classList.contains("dark");

    // Observe theme toggle in real-time
    const observer = new MutationObserver(() => {
      isDark = document.documentElement.classList.contains("dark");
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const resizeHandler = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", resizeHandler);

    // Mouse interactive target
    let targetRotX = 0;
    let targetRotY = 0;
    let rotX = 0;
    let rotY = 0;

    const mouseMoveHandler = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      targetRotY = (x / rect.width) * 0.8;
      targetRotX = -(y / rect.height) * 0.8;
    };

    window.addEventListener("mousemove", mouseMoveHandler, { passive: true });

    // Generate 3D Digital Architecture Nodes (Nested Hexagonal / Cube Lattice)
    const nodes: Node3D[] = [];
    const layers = 3;
    const radiusStep = Math.min(width, height) * 0.28;

    // Center core
    nodes.push({
      x: 0,
      y: 0,
      z: 0,
      baseX: 0,
      baseY: 0,
      baseZ: 0,
      radius: 4.5,
      colorDark: "#FFFFFF",
      colorLight: "#0F172A",
    });

    // Outer geometric vertices
    for (let layer = 1; layer <= layers; layer++) {
      const r = (layer / layers) * radiusStep;
      const count = layer * 6;
      for (let i = 0; i < count; i++) {
        const theta = (i / count) * Math.PI * 2;
        const phi = (i % 2 === 0 ? 0.3 : -0.3) * Math.PI * (layer / layers);
        const x = r * Math.cos(theta) * Math.cos(phi);
        const y = r * Math.sin(theta) * Math.cos(phi);
        const z = r * Math.sin(phi);

        nodes.push({
          x,
          y,
          z,
          baseX: x,
          baseY: y,
          baseZ: z,
          radius: layer === layers ? 2.5 : 3.2,
          colorDark: layer === 1 ? "#38BDF8" : layer === 2 ? "#818CF8" : "#4F46E5",
          colorLight: layer === 1 ? "#0284C7" : layer === 2 ? "#4F46E5" : "#312E81",
        });
      }
    }

    let time = 0;

    // Render loop
    const render = () => {
      time += 0.006;
      ctx.clearRect(0, 0, width, height);

      // Smooth interpolation to mouse
      rotX += (targetRotX - rotX) * 0.04;
      rotY += (targetRotY - rotY) * 0.04;

      const currentRotY = rotY + time * 0.3;
      const currentRotX = rotX + Math.sin(time * 0.5) * 0.15;

      const cosX = Math.cos(currentRotX);
      const sinX = Math.sin(currentRotX);
      const cosY = Math.cos(currentRotY);
      const sinY = Math.sin(currentRotY);

      const fov = 400;
      const projectedNodes: { x: number; y: number; z: number; r: number; color: string }[] = [];

      // Project 3D to 2D
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Organic pulse movement
        const wave = Math.sin(time * 2 + i * 0.5) * 6;
        const bx = node.baseX + (node.baseX !== 0 ? (node.baseX / radiusStep) * wave : 0);
        const by = node.baseY + (node.baseY !== 0 ? (node.baseY / radiusStep) * wave : 0);
        const bz = node.baseZ + wave * 0.5;

        // Y-axis rotation
        const x1 = bx * cosY + bz * sinY;
        const z1 = -bx * sinY + bz * cosY;

        // X-axis rotation
        const y2 = by * cosX - z1 * sinX;
        const z2 = by * sinX + z1 * cosX;

        // Camera perspective distance
        const distance = fov + z2;
        if (distance <= 0) continue;

        const scale = fov / distance;
        const projX = width / 2 + x1 * scale;
        const projY = height / 2 + y2 * scale;

        projectedNodes.push({
          x: projX,
          y: projY,
          z: z2,
          r: node.radius * scale,
          color: isDark ? node.colorDark : node.colorLight,
        });
      }

      // Draw connecting vector conduits
      const maxDistance = 90;
      ctx.lineWidth = isDark ? 1 : 1.2;

      for (let i = 0; i < projectedNodes.length; i++) {
        for (let j = i + 1; j < projectedNodes.length; j++) {
          const p1 = projectedNodes[i];
          const p2 = projectedNodes[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const rawAlpha = 1 - dist / maxDistance;
            const alpha = isDark ? rawAlpha * 0.35 : rawAlpha * 0.55;
            const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);

            if (isDark) {
              grad.addColorStop(0, `rgba(99, 102, 241, ${alpha})`);
              grad.addColorStop(1, `rgba(56, 189, 248, ${alpha})`);
            } else {
              grad.addColorStop(0, `rgba(79, 70, 229, ${alpha})`);
              grad.addColorStop(1, `rgba(2, 132, 199, ${alpha})`);
            }

            ctx.strokeStyle = grad;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw Nodes
      for (const p of projectedNodes) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1, p.r), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        if (isDark) {
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 10;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, []);

  return (
    <div className="relative w-full h-[450px] sm:h-[520px] lg:h-[600px] flex items-center justify-center pointer-events-none select-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full max-w-[650px] max-h-[600px]"
        aria-hidden="true"
      />
      {/* Ambient background glow ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] bg-brand-500/10 dark:bg-brand-500/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] bg-cyan-500/10 dark:bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none" />
    </div>
  );
};
