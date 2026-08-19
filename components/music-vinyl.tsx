"use client";

import { AnimatePresence, motion } from "motion/react";
import { AudioLines } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const SPOTIFY_EMBED_URL =
  "https://open.spotify.com/embed/album/79dL7FLiJFOO0EoehUHQBv?utm_source=generator&theme=0";
const NOW_PLAYING_TITLE = "Currents - Tame Impala";

export function MusicVinyl() {
  const widgetRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(true);
      setIsOpen(false);
    };

    const handleOutsidePointerDown = (event: PointerEvent) => {
      if (!widgetRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleProjectHover = () => {
      setIsOpen(false);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("pointerdown", handleOutsidePointerDown);
    window.addEventListener("portfolio:project-hover", handleProjectHover);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("pointerdown", handleOutsidePointerDown);
      window.removeEventListener("portfolio:project-hover", handleProjectHover);
    };
  }, []);

  const handleVinylClick = () => {
    setHasScrolled(false);
    setIsOpen((open) => !open);
  };

  return (
    <div ref={widgetRef} className="music-widget">
      <motion.div
        className="music-panel"
        initial={{ opacity: 0, x: -18, y: 12, scale: 0.94 }}
        animate={
          isOpen
            ? { opacity: 1, x: 0, y: 0, scale: 1, pointerEvents: "auto" }
            : { opacity: 0, x: -18, y: 12, scale: 0.94, pointerEvents: "none" }
        }
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden={!isOpen}
      >
        <iframe
          src={SPOTIFY_EMBED_URL}
          title="Spotify music player"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </motion.div>

      <div className="music-widget-control">
        <motion.button
          type="button"
          className="music-vinyl"
          aria-label={isOpen ? "Chiudi musica" : "Apri musica"}
          aria-expanded={isOpen}
          onClick={handleVinylClick}
          whileTap={{ scale: 0.92 }}
        >
          <span className="music-vinyl-grooves" />
          <span className="music-vinyl-label">
            <AudioLines size={18} strokeWidth={1.8} aria-hidden="true" />
          </span>
        </motion.button>

        <AnimatePresence>
          {hasScrolled && !isOpen && (
            <motion.div
              className="music-now-playing"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.22 }}
            >
              <span>Now playing</span>
              <strong>{NOW_PLAYING_TITLE}</strong>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
