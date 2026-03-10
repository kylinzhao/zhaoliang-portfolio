export default function Icon() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background with dark gradient */}
      <rect width="512" height="512" rx="128" fill="#0a0a0a" />

      {/* Subtle inner shadow/glow effect */}
      <rect
        width="512"
        height="512"
        rx="128"
        fill="url(#innerGlow)"
        opacity="0.5"
      />

      {/* Z Letter - Bold geometric */}
      <path
        d="M 140 140 L 140 180 L 220 180 L 120 280 L 120 320 L 240 320 L 240 280 L 160 280 L 260 180 L 260 140 Z"
        fill="white"
        stroke="white"
        strokeWidth="6"
        strokeLinejoin="round"
      />

      {/* L Letter - Bold geometric */}
      <path
        d="M 280 140 L 280 300 L 360 300 L 360 340 L 240 340 L 240 140 Z"
        fill="white"
        stroke="white"
        strokeWidth="6"
        strokeLinejoin="round"
      />

      {/* Accent dot for modern touch */}
      <circle cx="390" cy="160" r="12" fill="#3b82f6" />

      {/* Definitions */}
      <defs>
        <radialGradient id="innerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export const runtime = "edge";
