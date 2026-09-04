import React from "react";

interface LogoMarkProps {
  size?: number;
  className?: string;
}

export const LogoMark: React.FC<LogoMarkProps> = ({ size = 32, className = "" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="admin-brand-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="50%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#4F46E5" />
        </linearGradient>
      </defs>

      <g transform="translate(32, 32)">
        <path
          d="M0 -22 L19.05 -11 L19.05 11 L0 22 L-19.05 11 L-19.05 -11 Z"
          stroke="url(#admin-brand-grad)"
          strokeWidth="2"
          strokeLinejoin="round"
          fill="none"
          opacity="0.35"
        />

        <path
          d="M0 -16 L14.5 -7.5 L0 1 L-14.5 -7.5 Z"
          fill="url(#admin-brand-grad)"
          opacity="0.95"
        />

        <path
          d="M0 1 L14.5 -7.5 L14.5 9.5 L0 18 Z"
          fill="url(#admin-brand-grad)"
          opacity="0.75"
        />

        <path
          d="M0 1 L0 18 L-14.5 9.5 L-14.5 -7.5 Z"
          fill="url(#admin-brand-grad)"
          opacity="0.55"
        />

        <circle cx="0" cy="1" r="2.8" fill="#FFFFFF" />
        <circle cx="0" cy="1" r="5.5" stroke="#38BDF8" strokeWidth="1" opacity="0.8" />
      </g>
    </svg>
  );
};
