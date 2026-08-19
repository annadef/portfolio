"use client";

import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const ITEMS = [
  { label: "About Me", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export function MobileBubbleMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mobile-bubble-menu">
      <button
        type="button"
        aria-label={isOpen ? "Chiudi menu" : "Apri menu"}
        aria-expanded={isOpen}
        className="relative z-20 flex size-10 items-center justify-center rounded-full border border-white/30 bg-[#00BBF9]/22 text-[#8338EC] shadow-[0_10px_30px_rgba(131,56,236,0.28)] backdrop-blur-md transition-colors duration-300 hover:bg-[#8338EC] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8338EC]"
        onClick={() => setIsOpen((open) => !open)}
      >
        <motion.span
          className="flex items-center justify-center"
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {isOpen ? (
            <X className="size-5" aria-hidden="true" />
          ) : (
            <Menu className="size-5" aria-hidden="true" />
          )}
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            aria-label="Navigazione mobile"
            className="mobile-bubble-menu-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {ITEMS.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                aria-label={item.label}
                className="inline-flex min-h-11 items-center rounded-full border border-white/30 bg-[#00BBF9]/22 px-6! py-2! text-xs font-semibold uppercase tracking-[0.16em] text-[#8338EC] shadow-[0_10px_30px_rgba(131,56,236,0.28)] backdrop-blur-md transition-colors duration-300 hover:bg-[#8338EC] hover:text-white"
                initial={{ opacity: 0, x: 24, scale: 0.75 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 24, scale: 0.75 }}
                transition={{
                  duration: 0.42,
                  delay: index * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
