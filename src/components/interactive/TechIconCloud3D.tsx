"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

// Production-ready, configurable 3D tech icon cloud.
// Uses Fibonacci sphere distribution + CSS transforms with perspective.
// Auto-rotates; switches to mouse-driven rotation on hover with damping.

// -----------------------
// Speed & behavior constants (easy to tweak)
// -----------------------
const AUTO_ROTATE_SPEED_X = 0.002; // radians per frame (default slow, elegant)
const AUTO_ROTATE_SPEED_Y = 0.0035; // radians per frame
const MOUSE_SENSITIVITY = 0.002; // radians per px delta (default subtle)
const DAMPING = 0.1; // 0..1, higher = snappier follow to target
const SPHERE_RADIUS = 180; // px logical radius for projection calculations
const PERSPECTIVE = 700; // px perspective distance for projection
const ICON_BASE_SIZE = 54; // px base card size (before depth scaling)
const SCALE_MIN = 0.65; // minimum depth scale factor
const SCALE_MAX = 1.25; // maximum depth scale factor
const OPACITY_MIN = 0.35; // furthest opacity
const OPACITY_MAX = 1.0;  // closest opacity
const BLUR_MAX_PX = 2.5; // subtle blur when far

// Brand colors for the requested tech stack
const techItems = [
  { key: "react", label: "React", color: "#61DAFB", src: "/assets/icons/Tech-Stack-Icons-Design-Stack-Icons-light-mode/react.svg" },
  { key: "nextjs", label: "Next.js", color: "#FFFFFF", src: "/assets/icons/Tech-Stack-Icons-Design-Stack-Icons-light-mode/nextjs.svg" },
  { key: "typescript", label: "TypeScript", color: "#3178C6", src: "/assets/icons/Tech-Stack-Icons-Design-Stack-Icons-light-mode/typescript.svg" },
  { key: "javascript", label: "JavaScript", color: "#F7DF1E", src: "/assets/icons/Tech-Stack-Icons-Design-Stack-Icons-light-mode/js.svg" },
  { key: "tailwind", label: "Tailwind", color: "#38BDF8", src: "/assets/icons/Tech-Stack-Icons-Design-Stack-Icons-light-mode/tailwindcss.svg" },
  { key: "node", label: "Node.js", color: "#68A063", src: "/assets/icons/Tech-Stack-Icons-Design-Stack-Icons-light-mode/nodejs.svg" },
  { key: "python", label: "Python", color: "#3776AB", src: "/assets/icons/Tech-Stack-Icons-Design-Stack-Icons-light-mode/python.svg" },
  { key: "git", label: "Git", color: "#F05032", src: "/assets/icons/Tech-Stack-Icons-Design-Stack-Icons-light-mode/git.svg" },
  { key: "docker", label: "Docker", color: "#2496ED", src: "/assets/icons/Tech-Stack-Icons-Design-Stack-Icons-light-mode/docker.svg" },
  { key: "postgres", label: "PostgreSQL", color: "#4169E1", src: "/assets/icons/Tech-Stack-Icons-Design-Stack-Icons-light-mode/postgresql.svg" },
  { key: "mongodb", label: "MongoDB", color: "#47A248", src: "/assets/icons/Tech-Stack-Icons-Design-Stack-Icons-light-mode/mongodb.svg" },
  { key: "graphql", label: "GraphQL", color: "#E10098", src: "/assets/icons/Tech-Stack-Icons-Design-Stack-Icons-light-mode/graphql.svg" },
  { key: "aws", label: "AWS", color: "#FF9900", src: "/assets/icons/Tech-Stack-Icons-Design-Stack-Icons-light-mode/aws.svg" },
  { key: "firebase", label: "Firebase", color: "#FFCA28", src: "/assets/icons/Tech-Stack-Icons-Design-Stack-Icons-light-mode/firebase.svg" },
  { key: "redux", label: "Redux", color: "#764ABC", src: "/assets/icons/Tech-Stack-Icons-Design-Stack-Icons-light-mode/redux.svg" },
];

// Optional: if an icon fails to load, fallback to label with a colored dot.
function useImageFallback() {
  const [failed, setFailed] = useState<Record<string, boolean>>({});
  const onError = (key: string) => () => setFailed((prev) => ({ ...prev, [key]: true }));
  return { failed, onError };
}

// Even distribution on a sphere using Fibonacci algorithm.
function generateFibonacciSpherePoints(count: number): Array<{ x: number; y: number; z: number; phi: number; theta: number }>{
  const points: Array<{ x: number; y: number; z: number; phi: number; theta: number }> = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2; // y from 1 to -1
    const radius = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    const x = Math.cos(theta) * radius;
    const z = Math.sin(theta) * radius;
    // phi is polar angle; derive from y = cos(phi)
    const phi = Math.acos(Math.min(1, Math.max(-1, y)));
    points.push({ x, y, z, phi, theta });
  }
  return points;
}

// Apply rotation around X and Y axes.
function rotatePointXYZ(
  point: { x: number; y: number; z: number },
  rotX: number,
  rotY: number
): { x: number; y: number; z: number } {
  // Rotate around X-axis
  const cosX = Math.cos(rotX);
  const sinX = Math.sin(rotX);
  let y = point.y * cosX - point.z * sinX;
  let z = point.y * sinX + point.z * cosX;

  // Rotate around Y-axis
  const cosY = Math.cos(rotY);
  const sinY = Math.sin(rotY);
  const x = point.x * cosY + z * sinY;
  z = -point.x * sinY + z * cosY;

  return { x, y, z };
}

// Perspective projection and depth-driven style values.
function projectAndStyle(
  point: { x: number; y: number; z: number },
  radius: number,
  perspective: number
) {
  // Convert unit sphere to pixel space
  const x = point.x * radius;
  const y = point.y * radius;
  const z = point.z * radius;

  // Simple perspective projection factor
  const depth = perspective / (perspective - z);

  // Depth-based scale
  const t = (z + radius) / (2 * radius); // 0..1 from far to near
  const scale = SCALE_MIN + (SCALE_MAX - SCALE_MIN) * t;
  const opacity = OPACITY_MIN + (OPACITY_MAX - OPACITY_MIN) * t;
  const blurPx = BLUR_MAX_PX * (1 - t);

  return { x, y, z, depth, scale, opacity, blurPx };
}

// Glassmorphic card styles
const glassCardClass =
  "rounded-xl backdrop-blur-md bg-white/5 border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] " +
  "transition-transform duration-200 ease-out will-change-transform";

// Background gradient container
const backgroundClass =
  "relative overflow-hidden rounded-2xl p-6 " +
  "bg-gradient-to-br from-slate-900 via-slate-900 to-purple-950";

// Container provides perspective; inner layer rotates
const rootClass = "relative mx-auto select-none";

export type TechIconCloud3DProps = {
  size?: number; // square container size in px, defaults 420
  autoRotateSpeedX?: number;
  autoRotateSpeedY?: number;
  mouseSensitivity?: number;
  className?: string;
};

export default function TechIconCloud3D({
  size = 420,
  autoRotateSpeedX = AUTO_ROTATE_SPEED_X,
  autoRotateSpeedY = AUTO_ROTATE_SPEED_Y,
  mouseSensitivity = MOUSE_SENSITIVITY,
  className,
}: TechIconCloud3DProps) {
  const { failed, onError } = useImageFallback();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<Array<HTMLDivElement | null>>([]);

  // Current rotation state and target for hover interaction
  const rotationRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0, y: 0 });
  const hoveringRef = useRef(false);
  const mousePosRef = useRef({ x: 0, y: 0 });

  // Precompute evenly distributed points on sphere
  const points = useMemo(() => generateFibonacciSpherePoints(techItems.length), []);

  // Ensure refs array matches items
  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, techItems.length);
  }, []);

  // Mouse events for hover-driven rotation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseEnter = () => {
      hoveringRef.current = true;
    };
    const handleMouseLeave = () => {
      hoveringRef.current = false;
    };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      mousePosRef.current = { x: dx, y: dy };
      // Map mouse offset to target rotation; invert Y for natural feel
      targetRotationRef.current = {
        x: dy * mouseSensitivity,
        y: dx * mouseSensitivity,
      };
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseSensitivity]);

  // Animation loop for auto rotation and rendering
  useEffect(() => {
    let rafId: number | null = null;

    const tick = () => {
      const { x, y } = rotationRef.current;

      let nextX = x;
      let nextY = y;

      if (hoveringRef.current) {
        // Smoothly follow target using damping towards mouse-defined rotation
        nextX = x + (targetRotationRef.current.x - x) * DAMPING;
        nextY = y + (targetRotationRef.current.y - y) * DAMPING;
      } else {
        // Elegant auto-rotation when not hovering
        nextX = x + autoRotateSpeedX;
        nextY = y + autoRotateSpeedY;
      }

      rotationRef.current = { x: nextX, y: nextY };

      // Update all items via direct style mutations for performance
      for (let i = 0; i < techItems.length; i++) {
        const itemEl = itemsRef.current[i];
        if (!itemEl) continue;
        const p = points[i];
        const rotated = rotatePointXYZ(p, nextX, nextY);
        const proj = projectAndStyle(rotated, SPHERE_RADIUS, PERSPECTIVE);

        // Position projected point at center of container; translate to CSS coordinates
        const screenX = proj.x * proj.depth;
        const screenY = proj.y * proj.depth;

        const translate = `translate3d(${screenX}px, ${screenY}px, 0)`;
        const scale = `scale(${proj.scale})`;

        itemEl.style.transform = `${translate} ${scale}`;
        itemEl.style.opacity = String(proj.opacity);
        itemEl.style.zIndex = String(Math.round((proj.z + SPHERE_RADIUS) * 100));
        itemEl.style.filter = `blur(${proj.blurPx.toFixed(2)}px)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [points, autoRotateSpeedX, autoRotateSpeedY]);

  // Container size and perspective setup
  const containerStyle: React.CSSProperties = {
    width: size,
    height: size,
    perspective: `${PERSPECTIVE}px`,
    transformStyle: "preserve-3d",
  };

  // Centering layer that we apply transforms relative to center
  const stageStyle: React.CSSProperties = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    transformStyle: "preserve-3d",
    width: 0,
    height: 0,
  };

  return (
    <div className={`${backgroundClass} ${className ?? ""}`}>
      <div
        ref={containerRef}
        className={rootClass}
        style={containerStyle}
        aria-label="Interactive 3D Tech Icon Cloud"
        role="group"
      >
        <div style={stageStyle}>
          {techItems.map((tech, idx) => (
            <div
              key={tech.key}
              ref={(el) => (itemsRef.current[idx] = el)}
              className={`${glassCardClass} group absolute flex items-center justify-center`} 
              style={{
                width: ICON_BASE_SIZE,
                height: ICON_BASE_SIZE,
                // Start centered; JS will place via transform every frame
                left: -ICON_BASE_SIZE / 2,
                top: -ICON_BASE_SIZE / 2,
                transform: "translate3d(0,0,0)",
              }}
            >
              <div
                className="flex items-center justify-center rounded-lg p-2"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                  boxShadow:
                    "0 10px 30px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.1)",
                }}
              >
                {failed[tech.key] ? (
                  <div
                    className="flex items-center gap-2 text-sm font-medium"
                    style={{ color: tech.color }}
                  >
                    <span
                      className="inline-block h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: tech.color }}
                    />
                    {tech.label}
                  </div>
                ) : (
                  <img
                    src={tech.src}
                    alt={tech.label}
                    width={36}
                    height={36}
                    className="pointer-events-none transition-transform duration-200 ease-out group-hover:scale-110"
                    style={{ filter: `drop-shadow(0 2px 8px ${tech.color}40)` }}
                    onError={onError(tech.key)}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
