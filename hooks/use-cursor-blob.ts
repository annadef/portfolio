"use client";

import { useEffect } from "react";

export function useCursorBlob(elementId: string) {
  useEffect(() => {
    const blob = document.getElementById(elementId);
    let animationFrame = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      if (!blob || animationFrame) return;

      animationFrame = window.requestAnimationFrame(() => {
        blob.style.transform = `translate(${mouseX - 140}px, ${
          mouseY - 128
        }px)`;
        animationFrame = 0;
      });
    };

    document.addEventListener("mousemove", handleMouseMove, {
      passive: true,
    });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);

      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, [elementId]);
}
