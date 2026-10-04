/**
 * Curved section edge. Place it at the top or bottom of a tinted band; `fill`
 * should match the band's colour so the curve reads as the band's own edge.
 * Two layered paths: a soft back wave that drifts slowly, and a solid front.
 */
export function Wave({
  position,
  fill,
  className,
}: {
  position: "top" | "bottom";
  fill: string;
  className?: string;
}) {
  const mirrored = position === "bottom";
  return (
    <div
      aria-hidden
      className={`pointer-events-none h-[48px] w-full overflow-hidden sm:h-[72px] ${className ?? "relative"}`}
      style={mirrored ? { transform: "scaleY(-1)" } : undefined}
    >
      {/* Back layer: 200% wide so the drift loops seamlessly. */}
      <svg
        className="wave-drift absolute bottom-0 left-0 h-full w-[200%]"
        viewBox="0 0 2880 72"
        preserveAspectRatio="none"
      >
        <path
          d="M0 40 C 360 0 1080 80 1440 40 C 1800 0 2520 80 2880 40 V72 H0 Z"
          fill={fill}
          opacity="0.45"
        />
      </svg>
      <svg className="absolute bottom-0 left-0 h-full w-full" viewBox="0 0 1440 72" preserveAspectRatio="none">
        <path d="M0 48 C 320 8 640 8 960 36 S 1300 70 1440 30 V72 H0 Z" fill={fill} />
      </svg>
    </div>
  );
}
