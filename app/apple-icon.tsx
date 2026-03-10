export default function AppleIcon() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 180 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background */}
      <rect width="180" height="180" rx="40" fill="#0a0a0a" />

      {/* Inner glow */}
      <rect
        width="180"
        height="180"
        rx="40"
        fill="url(#glow)"
        opacity="0.5"
      />

      {/* Z Letter */}
      <path
        d="M 50 50 L 50 65 L 85 65 L 35 115 L 35 130 L 95 130 L 95 115 L 60 115 L 110 65 L 110 50 Z"
        fill="white"
        stroke="white"
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* L Letter */}
      <path
        d="M 120 50 L 120 110 L 150 110 L 150 125 L 105 125 L 105 50 Z"
        fill="white"
        stroke="white"
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* Accent dot */}
      <circle cx="160" cy="60" r="5" fill="#3b82f6" />

      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export const runtime = "edge";