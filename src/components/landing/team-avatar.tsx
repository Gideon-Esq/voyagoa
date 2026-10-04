"use client";

import Image from "next/image";
import { useState } from "react";

const SIZES = {
  md: { box: "size-24 text-[1.6rem]", px: "96px" },
  lg: { box: "size-36 text-[2.4rem] sm:size-40", px: "160px" },
} as const;

/**
 * Team headshot with an initials fallback, so a missing or not-yet-added photo
 * in /public/assets/team never shows a broken image. Zooms gently when an
 * ancestor with `group` is hovered.
 */
export function TeamAvatar({
  src,
  initials,
  name,
  size = "md",
  className,
}: {
  src: string;
  initials: string;
  name: string;
  size?: keyof typeof SIZES;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const s = SIZES[size];

  return (
    <div
      className={`relative mx-auto grid place-items-center overflow-hidden rounded-full border-4 border-white font-black text-white shadow-[0_20px_45px_rgba(17,103,241,0.24)] ${s.box} ${className ?? ""}`}
    >
      {failed ? (
        initials
      ) : (
        <Image
          src={src}
          alt={`Photo of ${name}`}
          fill
          sizes={s.px}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
