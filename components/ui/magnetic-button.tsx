"use client";

import React, { useRef, useState } from "react";
import { motion } from "motion/react";

type MagneticChildProps = {
  className?: string;
  style?: React.CSSProperties;
};

export const MagneticButton = ({
  children,
  strength = 0.8,
  maxDistance = 100,
  onClick,
}: {
  children: React.ReactElement<MagneticChildProps>;
  strength?: number;
  maxDistance?: number;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);

  const isCoarsePointer =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const { clientX, clientY } = e;

    let x = (clientX - (left + width / 2)) * strength;
    let y = (clientY - (top + height / 2)) * strength;

    const distance = Math.hypot(x, y);
    if (distance > maxDistance) {
      const scale = maxDistance / distance;
      x *= scale;
      y *= scale;
    }

    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const resetPressedState = () => {
    if (isCoarsePointer) {
      setIsActive(false);
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isCoarsePointer) {
      setIsActive(true);
    }

    if (e.pointerType === "touch") {
      e.preventDefault();
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    resetPressedState();
    onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
  };

  const handlePointerLeave = () => {
    resetPressedState();
  };

  const handlePointerCancel = () => {
    resetPressedState();
  };

  const hasMoved = position.x !== 0 || position.y !== 0;
  const childProps = (children as unknown as { props: MagneticChildProps })
    .props;
  const mergedChildren = React.cloneElement(children as any, {
    className: [
      childProps.className,
      isActive && isCoarsePointer ? "bg-[#8338EC] text-white" : "",
    ]
      .filter(Boolean)
      .join(" "),
    style: {
      ...(childProps.style ?? {}),
      ...(isActive && isCoarsePointer
        ? {
            backgroundColor: "#8338EC",
            color: "#ffffff",
            borderColor: "#8338EC",
          }
        : {}),
    },
  });

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      onPointerCancel={handlePointerCancel}
      className="inline-flex cursor-pointer items-center justify-center rounded-2xl border border-dashed p-1 transition-colors duration-150 [--show-color:var(--color-blue-500)]"
      style={{
        borderColor:
          hasMoved || (isActive && isCoarsePointer) ? "#8338EC" : "transparent",
        backgroundColor:
          hasMoved || (isActive && isCoarsePointer)
            ? "rgba(131, 56, 236, 0.14)"
            : "transparent",
      }}
    >
      <motion.div
        ref={ref}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 150, damping: 25, mass: 0.1 }}
        className="inline-flex items-center justify-center"
        style={{ display: "inline-flex" }}
      >
        {mergedChildren}
      </motion.div>
    </div>
  );
};
