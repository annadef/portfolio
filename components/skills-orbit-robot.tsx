"use client";

import Image from "next/image";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { SkillsRobot } from "@/components/robot";

type SkillBubble = {
  name: string;
  icon: string;
};

const DESKTOP_SKILL_BUBBLES: SkillBubble[] = [
  { name: "Next.js", icon: "/skills/nextjs-icon.svg" },
  { name: "React", icon: "/skills/react.svg" },
  { name: "TypeScript", icon: "/skills/typescript.svg" },
  { name: "Tailwind", icon: "/skills/tailwindcss-icon.svg" },
  { name: "JavaScript", icon: "/skills/javascript.svg" },
  { name: "UI / UX", icon: "/skills/website-ui-ux-icon.svg" },
  { name: "Node.js", icon: "/skills/nodejs.svg" },
  { name: "Laravel", icon: "/skills/laravel-icon.svg" },
  { name: "PHP", icon: "/skills/php-icon.svg" },
  { name: "Database", icon: "/skills/postgresql.svg" },
  { name: "WordPress", icon: "/skills/wordpress-icon.svg" },
  { name: "Figma", icon: "/skills/figma-icon.svg" },
];

const DESKTOP_RING_RADIUS = 300;
const RING_ROTATION_SECONDS = 56;

const BUBBLE_BG =
  "radial-gradient(circle at 30% 24%, #c3a0ff 0%, #a975f7 22%, #9158ef 45%, #8338EC 66%, #722dcf 100%)";
const BUBBLE_SHADOW = "0 9px 14px rgba(35, 19, 90, 0.28)";

function round3(value: number) {
  return Number(value.toFixed(3));
}

export function SkillsOrbitRobot() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const activePointerRef = useRef<number | null>(null);
  const lastPointerAngleRef = useRef(0);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isSectionVisible, setIsSectionVisible] = useState(true);
  const [robotLoaded, setRobotLoaded] = useState(false);
  const [stageWidth, setStageWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const rotation = useMotionValue(0);
  const counterRotation = useTransform(rotation, (value) => -value);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 900px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncMediaState = () => {
      setIsMobile(mobileQuery.matches);
      setPrefersReducedMotion(motionQuery.matches);
    };

    syncMediaState();
    mobileQuery.addEventListener("change", syncMediaState);
    motionQuery.addEventListener("change", syncMediaState);

    return () => {
      mobileQuery.removeEventListener("change", syncMediaState);
      motionQuery.removeEventListener("change", syncMediaState);
    };
  }, []);

  useEffect(() => {
    const target = sectionRef.current;
    if (!target) return;

    const syncStageWidth = () => {
      setStageWidth(target.clientWidth);
    };

    syncStageWidth();
    const observer = new ResizeObserver(syncStageWidth);
    observer.observe(target);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const target = sectionRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsSectionVisible(entry.isIntersecting),
      {
        threshold: 0.08,
      },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const activeBubbles = DESKTOP_SKILL_BUBBLES;
  const mobileBubbleSize = Math.min(62, Math.max(48, stageWidth * 0.14));
  const mobileStageSize = Math.min(stageWidth * 0.9, 520);
  const ringRadius = isMobile
    ? Math.max(52, mobileStageSize / 2 - mobileBubbleSize / 2 - 14)
    : DESKTOP_RING_RADIUS;
  const orbitStep = useMemo(
    () => (Math.PI * 2) / activeBubbles.length,
    [activeBubbles.length],
  );
  const bubblePositions = useMemo(
    () =>
      activeBubbles.map((_, index) => {
        const angle = orbitStep * index - Math.PI / 2;
        const x = round3(Math.cos(angle) * ringRadius);
        const y = round3(Math.sin(angle) * ringRadius);
        return { x, y };
      }),
    [activeBubbles, orbitStep, ringRadius],
  );

  const shouldAnimate = !prefersReducedMotion && isSectionVisible;
  const shouldRenderRobot = isSectionVisible;
  const shouldShowSkills = prefersReducedMotion || robotLoaded;

  useAnimationFrame((_, delta) => {
    if (!shouldAnimate || isDragging) return;
    rotation.set(
      rotation.get() + (360 / (RING_ROTATION_SECONDS * 1000)) * delta,
    );
  });

  const getPointerAngle = (clientX: number, clientY: number) => {
    const stage = stageRef.current;
    if (!stage) return 0;

    const bounds = stage.getBoundingClientRect();
    return Math.atan2(
      clientY - (bounds.top + bounds.height / 2),
      clientX - (bounds.left + bounds.width / 2),
    );
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    activePointerRef.current = event.pointerId;
    lastPointerAngleRef.current = getPointerAngle(event.clientX, event.clientY);
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (activePointerRef.current !== event.pointerId) return;

    const angle = getPointerAngle(event.clientX, event.clientY);
    let delta = angle - lastPointerAngleRef.current;

    if (delta > Math.PI) delta -= Math.PI * 2;
    if (delta < -Math.PI) delta += Math.PI * 2;

    rotation.set(rotation.get() + (delta * 180) / Math.PI);
    lastPointerAngleRef.current = angle;
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (activePointerRef.current !== event.pointerId) return;
    activePointerRef.current = null;
    setIsDragging(false);
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <div
      ref={sectionRef}
      className="relative w-full overflow-hidden rounded-4xl md:mt-8"
      style={{
        height: isMobile ? "640px" : "860px",
        contain: "layout paint",
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(131,56,236,0.15)_0%,rgba(0,187,249,0.08)_45%,transparent_75%)]" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div
          ref={stageRef}
          className="relative z-20 overflow-visible"
          style={{
            width: isMobile ? mobileStageSize : 560,
            height: isMobile ? mobileStageSize : 560,
          }}
        >
          <SkillsRobot
            className="h-full overflow-visible bg-transparent md:h-full"
            active={shouldRenderRobot}
            onLoad={() => setRobotLoaded(true)}
          />

          <motion.div
            className="pointer-events-none absolute inset-0 z-30 select-none"
            initial={{ x: "110%", opacity: 0 }}
            animate={{
              x: shouldShowSkills ? "0%" : "110%",
              opacity: shouldShowSkills ? 1 : 0,
            }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : {
                    delay: 0.9,
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1],
                  }
            }
            style={{ willChange: "transform, opacity" }}
          >
            <motion.div
              className="absolute inset-0"
              style={{ rotate: rotation, willChange: "transform" }}
            >
              {activeBubbles.map((skill, index) => {
                const { x, y } = bubblePositions[index];

                return (
                  <div
                    key={skill.name}
                    className="pointer-events-auto absolute left-1/2 top-1/2 cursor-grab touch-none active:cursor-grabbing"
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                    style={{
                      transform: `translate3d(-50%, -50%, 0) translate3d(${x}px, ${y}px, 0)`,
                    }}
                  >
                    <div
                      className="relative flex items-center justify-center rounded-full"
                      style={{
                        width: isMobile ? mobileBubbleSize : 96,
                        height: isMobile ? mobileBubbleSize : 96,
                        background: BUBBLE_BG,
                        boxShadow: BUBBLE_SHADOW,
                        backfaceVisibility: "hidden",
                      }}
                      title={skill.name}
                      aria-label={skill.name}
                    >
                      <motion.div
                        className="flex flex-col items-center justify-center gap-1.5"
                        style={{
                          rotate: counterRotation,
                          backfaceVisibility: "hidden",
                        }}
                      >
                        <Image
                          src={skill.icon}
                          alt={skill.name}
                          width={42}
                          height={42}
                          className="object-contain brightness-0 invert"
                          style={{
                            width: isMobile ? mobileBubbleSize * 0.36 : 42,
                            height: isMobile ? mobileBubbleSize * 0.36 : 42,
                          }}
                        />
                        <span className="text-center text-[7px] font-semibold uppercase leading-tight tracking-[0.06em] text-white md:text-[9px] md:tracking-[0.12em]">
                          {skill.name}
                        </span>
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-4xl ring-1 ring-white/20" />
    </div>
  );
}
