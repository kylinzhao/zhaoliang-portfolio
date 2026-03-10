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

      {/* ZL Logo - scaled from 200x200 to 180x180 */}
      <g transform="translate(36, 36) scale(0.54)" stroke="white" stroke-width="12" fill="none" stroke-linecap="round">
        <path d="M0,8 L88,8" />
        <path d="M88,8 L48,56" />
        <path d="M40,68 L0,120" />
        <path d="M0,120 L88,120" />

        <path d="M120,8 L120,56" />
        <path d="M120,68 L120,120" />
        <path d="M120,120 L72,120" />
      </g>

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
