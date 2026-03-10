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

      {/* ZL Logo - scaled from 200x200 to 512x512 */}
      <g transform="translate(102.4, 102.4) scale(1.536)" stroke="white" stroke-width="12" fill="none" stroke-linecap="round">
        <path d="M0,8 L88,8" />
        <path d="M88,8 L48,56" />
        <path d="M40,68 L0,120" />
        <path d="M0,120 L88,120" />

        <path d="M120,8 L120,56" />
        <path d="M120,68 L120,120" />
        <path d="M120,120 L72,120" />
      </g>

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
