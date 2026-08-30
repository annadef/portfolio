"use client";

import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center text-sm text-[#8338EC]">
      Loading robot...
    </div>
  ),
});

// Final visual size of the robot relative to its container (unchanged from before).
const VISUAL_SCALE = 0.88;
// Spline sizes its canvas to the layout box, not the CSS transform, so rendering a
// full-size box and shrinking it with `transform: scale()` wastes GPU pixels. We
// render at a smaller intrinsic size instead and scale it back up to compensate,
// cutting rasterization cost (a major source of scroll jank) roughly in half.
const RENDER_SCALE = 0.7;
const COMPENSATING_SCALE = VISUAL_SCALE / RENDER_SCALE;

export function SkillsRobot({
  className,
  active = true,
  onLoad,
}: {
  className?: string;
  active?: boolean;
  onLoad?: () => void;
}) {
  const sceneUrl =
    process.env.NEXT_PUBLIC_SPLINE_ROBOT_SCENE ||
    "https://prod.spline.design/IO6cJclSwGSwlirc/scene.splinecode";

  return (
    <div
      className={cn(
        "relative h-90 w-full overflow-visible bg-transparent md:h-105",
        className,
      )}
    >
      {active ? (
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            width: `${RENDER_SCALE * 100}%`,
            height: `${RENDER_SCALE * 100}%`,
            transform: `translate(-50%, -50%) scale(${COMPENSATING_SCALE})`,
            transformOrigin: "center center",
          }}
        >
          <Spline scene={sceneUrl} renderOnDemand onLoad={onLoad} />
        </div>
      ) : null}
    </div>
  );
}
