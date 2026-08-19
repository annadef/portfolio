"use client";

/**
 * Note: Use position fixed according to your needs
 * Desktop navbar is better positioned at the bottom
 * Mobile navbar is better positioned at bottom right.
 **/

import { cn } from "@/lib/utils";
import { PanelRightClose } from "lucide-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("fixed bottom-5 right-5 z-50 md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute right-0 bottom-full mb-2 flex flex-col gap-2"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                style={{
                  marginBottom: item.title === "Github" ? "8px" : undefined,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: {
                    delay: idx * 0.05,
                  },
                }}
                transition={{
                  delay: (items.length - 1 - idx) * 0.05,
                }}
              >
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex size-10 items-center justify-center rounded-full border border-white/30 bg-[#00BBF9]/22 text-[#8338EC] shadow-[0_10px_30px_rgba(131,56,236,0.28)] backdrop-blur-md transition-colors hover:bg-[#8338EC] hover:text-white"
                >
                  <div className="flex h-5 w-5 items-center justify-center text-inherit transition-colors">
                    {item.icon}
                  </div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen(!open)}
        className="flex size-10 items-center justify-center rounded-full border border-white/30 bg-[#00BBF9]/22 text-[#8338EC] shadow-[0_10px_30px_rgba(131,56,236,0.28)] backdrop-blur-md transition-colors hover:bg-[#8338EC] hover:text-white"
      >
        <PanelRightClose className="h-5 w-5 text-inherit transition-colors" />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "fixed right-5 bottom-5 z-40 hidden h-12 max-w-3xl items-center gap-2 rounded-full border border-white/30 bg-[#00BBF9]/22 shadow-[0_10px_30px_rgba(131,56,236,0.28)] backdrop-blur-md md:flex",
        className,
      )}
      style={{
        paddingInline: "20px",
        paddingBlock: "8px",
      }}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: 0,
    };

    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  const widthTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20],
  );

  const heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20],
  );

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="group">
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`relative flex aspect-square items-center justify-center rounded-full transition-colors ${
          hovered ? "bg-[#8338EC]" : ""
        }`}
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 2 }}
              className="absolute -top-10 left-1/2 -translate-x-1/2 w-fit rounded-full border border-[#8338EC]/20 bg-[#8338EC] text-[11px] font-medium uppercase tracking-[0.2em] whitespace-nowrap text-white shadow-sm"
              style={{
                fontFamily: "var(--syne)",
                paddingInline: "12px",
                paddingBlock: "6px",
              }}
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          style={{
            width: widthIcon,
            height: heightIcon,
          }}
          className={`flex items-center justify-center text-[#8338EC] transition-colors ${
            hovered ? "text-white" : ""
          }`}
        >
          {icon}
        </motion.div>
      </motion.div>
    </a>
  );
}
