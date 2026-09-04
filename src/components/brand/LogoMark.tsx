import React from "react";

interface LogoMarkProps {
  size?: number;
  className?: string;
}

export const LogoMark: React.FC<LogoMarkProps> = ({ size = 36, className = "" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-transform duration-300 group-hover:scale-105 ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="logo-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="50%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#4F46E5" />
        </linearGradient>
        <linearGradient id="logo-grad-2" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4338CA" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
      </defs>

      <g transform="translate(50, 50)">
        {/* Outer orbital wireframe */}
        <path
          d="M0 -34 L29.4 -17 L29.4 17 L0 34 L-29.4 17 L-29.4 -17 Z"
          stroke="url(#logo-grad-1)"
          strokeWidth="2"
          strokeDasharray="4 3"
          strokeLinejoin="round"
          opacity="0.45"
        />

        {/* Top Facet */}
        <path
          d="M0 -26 L22.5 -13 L0 0 L-22.5 -13 Z"
          fill="url(#logo-grad-1)"
          fillOpacity="0.95"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="0.8"
        />

        {/* Right Facet */}
        <path
          d="M0 0 L22.5 -13 L22.5 13 L0 26 Z"
          fill="url(#logo-grad-1)"
          fillOpacity="0.75"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="0.8"
        />

        {/* Left Facet */}
        <path
          d="M0 0 L0 26 L-22.5 13 L-22.5 -13 Z"
          fill="url(#logo-grad-2)"
          fillOpacity="0.6"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="0.8"
        />

        {/* Core Node & Vertex Anchors */}
        <circle cx="0" cy="0" r="3.5" fill="#FFFFFF" />
        <circle cx="0" cy="0" r="7" stroke="#38BDF8" strokeWidth="1.2" opacity="0.85" />
        <circle cx="0" cy="-26" r="2" fill="#38BDF8" />
        <circle cx="22.5" cy="13" r="2" fill="#6366F1" />
        <circle cx="-22.5" cy="13" r="2" fill="#06B6D4" />
      </g>
    </svg>
  );
};
