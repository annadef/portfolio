"use client";

import { useEffect } from "react";
import Link from "next/link";
import { MagneticButton } from "@/components/ui/magnetic-button";

export default function NotFound() {
  useEffect(() => {
    let mouseRaf = 0;

    const blob = document.getElementById("cursor-blob");

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!blob || mouseRaf) return;

      mouseRaf = window.requestAnimationFrame(() => {
        blob.style.transform = `translate(${mouseX - 140}px, ${mouseY - 128}px)`;
        mouseRaf = 0;
      });
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (mouseRaf) window.cancelAnimationFrame(mouseRaf);
    };
  }, []);

  return (
    <>
      <div className="blob" id="cursor-blob" />

      <main className="flex min-h-screen flex-col items-center justify-center gap-10 px-6 pt-20 text-center md:gap-16">
        <div className="select-none">
          <span
            className="block font-extrabold uppercase leading-none tracking-tight text-[#8338EC]"
            style={{
              fontFamily: "var(--inter)",
              fontSize: "clamp(3.5rem, 10vw, 6rem)",
            }}
          >
            404
          </span>
          <span
            className="outline-text block font-extrabold uppercase leading-none tracking-tight"
            style={{
              fontFamily: "var(--inter)",
              fontSize: "clamp(1.75rem, 5vw, 3rem)",
            }}
          >
            NOT FOUND
          </span>
        </div>

        <MagneticButton>
          <div className="rounded-full border-2 border-[#8338EC] px-10 py-5 text-[#8338EC] transition-colors hover:bg-[#8338EC] hover:text-white">
            <Link
              href="/"
              className="inline-flex items-center justify-center text-sm font-medium uppercase tracking-[0.3em] whitespace-nowrap"
              style={{
                paddingInline: "20px",
                paddingBlock: "10px",
              }}
            >
              Back to home
            </Link>
          </div>
        </MagneticButton>
      </main>
    </>
  );
}
