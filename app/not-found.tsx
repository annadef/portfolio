"use client";

import Link from "next/link";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { useCursorBlob } from "@/hooks/use-cursor-blob";

export default function NotFound() {
  useCursorBlob("cursor-blob");

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
