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
          className="absolute inset-0"
          style={{ transform: "scale(0.88)", transformOrigin: "center center" }}
        >
          <Spline scene={sceneUrl} renderOnDemand onLoad={onLoad} />
        </div>
      ) : null}
    </div>
  );
}
