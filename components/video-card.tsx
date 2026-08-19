"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { MagneticButton } from "./ui/magnetic-button";
import { Badge } from "./ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";

interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  thumbnail: string;
  description: string;
  skills: string[];
  figma?: string;
  linkedin?: string;
  linkType: "figma" | "linkedin";
}

interface VideoCardProps {
  project: Project;
  isHovered: boolean;
  isDimmed?: boolean;
  onHoverChange: (hovered: boolean) => void;
}

const SYNE_FONT = "var(--font-syne), var(--syne)";

const EASE = [0.22, 1, 0.36, 1] as const;

export function VideoCard({
  project,
  isHovered,
  isDimmed = false,
  onHoverChange,
}: VideoCardProps) {
  const isMobile = useIsMobile();
  const [isTouchOpen, setIsTouchOpen] = useState(false);
  const isActive = isHovered || (isMobile && isTouchOpen);
  const layoutInset = isActive || isDimmed ? "28px" : "12px";
  const link =
    project.linkType === "linkedin" ? project.linkedin : project.figma;

  const linkLabel = project.linkType === "linkedin" ? "LinkedIn" : "View Figma";

  const ariaLabel =
    project.linkType === "linkedin"
      ? `Apri il progetto LinkedIn di ${project.title}`
      : `Apri il layout Figma di ${project.title}`;

  return (
    <motion.div
      className={cn(
        "relative flex min-h-0 min-w-0 w-full flex-none basis-auto self-start flex-col",
        "overflow-visible",
        "cursor-default md:cursor-none",
        "transition-[flex] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "transition-[filter,opacity,flex] duration-500 ease-out",
        "md:w-0 md:flex-1 md:basis-0 md:self-start",
        isHovered && "md:flex-[1.6]",
        isDimmed && "md:blur-[2px] md:opacity-60",
      )}
      style={{
        zIndex: isActive ? 30 : 1,
      }}
      initial={{
        x: -80,
        opacity: 0,
      }}
      whileInView={{
        x: 0,
        opacity: 1,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.8,
        delay: (project.id - 1) * 0.1,
        ease: EASE,
      }}
      onMouseEnter={() => {
        if (!isMobile) onHoverChange(true);
      }}
      onMouseLeave={() => {
        if (!isMobile) onHoverChange(false);
      }}
      onClick={() => {
        if (isMobile) {
          const next = !isTouchOpen;
          setIsTouchOpen(next);
          onHoverChange(next);
        }
      }}
    >
      {/* =========================================================
    HOVER CARD — EDITORIAL STYLE
========================================================= */}

      <motion.div
        className={cn(
          "absolute inset-3 z-10 overflow-hidden",
          "rounded-[30px]",
          "border border-[#8338EC]/30",
          "bg-[#F4F6F8]",
          "shadow-[0_24px_60px_rgba(24,32,45,0.16)]",
          "will-change-transform",
        )}
        initial={false}
        animate={{
          opacity: isActive ? 1 : 0,
        }}
        transition={{
          duration: 0.4,
          ease: EASE,
        }}
      >
        {/* Soft purple gradient */}

        <div
          className="
      pointer-events-none
      absolute
      inset-0
      bg-[radial-gradient(circle_at_0%_0%,rgba(131,56,236,0.14),transparent_38%),
          radial-gradient(circle_at_100%_100%,rgba(0,187,249,0.10),transparent_38%)]
    "
        />

        {/* Very subtle light center */}

        <div
          className="
      pointer-events-none
      absolute
      left-1/2
      top-1/2
      size-105
      -translate-x-1/2
      -translate-y-1/2
      rounded-full
      bg-white/50
      blur-[100px]
    "
        />

        {/* Inner border */}

        <div
          className="
      pointer-events-none
      absolute
      inset-0
      rounded-[30px]
      border
      border-white/70
    "
        />
      </motion.div>

      {/* =========================================================
          CONTENT AREA
      ========================================================= */}

      <motion.div
        className="relative z-20 flex flex-col"
        initial={false}
        animate={{
          marginTop: layoutInset,
          marginRight: layoutInset,
          marginBottom: layoutInset,
          marginLeft: layoutInset,
        }}
        transition={{
          duration: 0.5,
          ease: EASE,
        }}
      >
        <motion.div
          className="relative flex min-h-0 flex-col rounded-[30px]"
          style={{
            fontFamily: SYNE_FONT,
          }}
          initial={false}
          animate={{
            scale: 1,
          }}
          transition={{
            duration: 0.5,
            ease: EASE,
          }}
        >
          {/* =======================================================
              TOP BAR — SKILLS + ARROW
          ======================================================= */}

          <div className="mb-4! md:mb-0! flex min-h-11 shrink-0 items-center justify-between px-4!">
            {/* SKILLS */}

            <motion.div
              className="flex flex-1 flex-wrap items-center gap-1.5"
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                x: isActive ? 0 : -20,
              }}
              transition={{
                duration: 0.45,
                delay: isActive ? 0.08 : 0,
                ease: EASE,
              }}
            >
              {project.skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    x: isActive ? 0 : -10,
                    scale: isActive ? 1 : 0.9,
                  }}
                  transition={{
                    duration: 0.35,
                    delay: isActive ? 0.08 + index * 0.04 : 0,
                    ease: EASE,
                  }}
                >
                  <Badge
                    className={cn(
                      "rounded-full",
                      "border border-[#8338EC]/70 bg-[#8338EC]/90",
                      "px-2! py-1!",
                      "text-[7px] font-medium uppercase",
                      "tracking-[0.08em]",
                      "text-white",
                      "shadow-none",
                      "md:text-[8px]",
                    )}
                  >
                    {skill}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>

            {/* ARROW */}

            <motion.div
              className={cn(
                "relative flex size-10 shrink-0 items-center justify-center rounded-full",
                "transition-colors duration-300 ms-3!",
                isActive
                  ? "border border-dashed border-[#8338EC] bg-[#DCEBFF] text-[#8338EC]"
                  : "bg-[#8338EC] text-white",
              )}
              animate={{
                y: isActive ? 0 : 16,
                rotate: isActive ? 90 : 0,
              }}
              transition={{
                duration: 0.5,
                ease: EASE,
              }}
            >
              <ArrowUpRight
                className="size-4"
                strokeWidth={2}
                aria-hidden="true"
              />
            </motion.div>
          </div>

          {/* =======================================================
    IMAGE
======================================================= */}

          <div className="flex h-[clamp(190px,25vw,270px)] w-full shrink-0 items-end justify-center overflow-hidden px-2 sm:px-0">
            <motion.img
              src={project.thumbnail}
              alt={project.title}
              className="block max-h-full max-w-full object-contain object-bottom will-change-transform"
              initial={false}
              animate={{
                scale: 1,
                filter: isActive
                  ? "grayscale(0) brightness(1.06) contrast(1.03)"
                  : "grayscale(1) brightness(0.75)",
              }}
              transition={{
                scale: {
                  duration: 0.7,
                  ease: EASE,
                },
                filter: {
                  duration: 0.5,
                  ease: EASE,
                },
              }}
            />
          </div>

          {/* =======================================================
              TITLE + CATEGORY
          ======================================================= */}

          <motion.div
            className="mt-4! shrink-0 px-4! pb-2!"
            initial={false}
            animate={{
              y: isActive ? 0 : 4,
            }}
            transition={{
              duration: 0.45,
              ease: EASE,
            }}
          >
            <h3 className="text-sm font-bold uppercase leading-tight tracking-[0.2em] text-[#8338EC] md:text-base">
              {project.title}
            </h3>

            <p className="mt-2 text-[9px] font-medium uppercase leading-tight tracking-[0.18em] text-[#8338EC] md:text-[10px]">
              {project.category}

              <span className="mx-1 text-[#8338EC]"> • </span>

              {project.year}
            </p>
          </motion.div>

          {/* =======================================================
              HOVER CONTENT
          ======================================================= */}

          {isActive && (
            <div className="relative flex flex-col overflow-visible">
              <motion.div
                className="flex flex-col px-4! pb-1!"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.12,
                  ease: EASE,
                }}
              >
                {/* DESCRIPTION */}

                <motion.p
                  className="max-w-[38ch] pt-0 text-sm font-medium leading-normal tracking-[0.01em] text-[#8338EC]/80"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.16,
                    ease: EASE,
                  }}
                >
                  {project.description}
                </motion.p>

                {/* CTA */}

                <motion.div
                  className="relative z-30 mt-4! flex justify-start overflow-visible"
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.22,
                    ease: EASE,
                  }}
                >
                  <MagneticButton>
                    <div className="rounded-full border-2 border-[#8338EC] text-[#8338EC] transition-colors duration-300 hover:bg-[#8338EC] hover:text-white">
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={ariaLabel}
                        className="inline-flex max-w-full items-center justify-center gap-2 whitespace-nowrap text-sm font-medium uppercase tracking-[0.25em]"
                        style={{
                          paddingInline: "20px",
                          paddingBlock: "10px",
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {linkLabel}

                        <ArrowUpRight
                          className="size-4"
                          strokeWidth={2.5}
                          aria-hidden="true"
                        />
                      </a>
                    </div>
                  </MagneticButton>
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
