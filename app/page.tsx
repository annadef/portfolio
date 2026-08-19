"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Lenis from "lenis";

import FoldText from "@/components/ui/fold-text";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { WorksGallery } from "@/components/works-gallery";
import { SkillsOrbitRobot } from "@/components/skills-orbit-robot";
import { MobileBubbleMenu } from "@/components/mobile-bubble-menu";
import { MusicVinyl } from "@/components/music-vinyl";
import Image from "next/image";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const timer = window.setTimeout(
      () => setIsLoading(false),
      prefersReducedMotion ? 0 : 850,
    );

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    let mouseRaf = 0;
    let scrollRaf = 0;
    let lenisRaf = 0;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const lenis = prefersReducedMotion
      ? null
      : new Lenis({
          autoRaf: false,
          lerp: 0.12,
          smoothWheel: true,
          syncTouch: false,
        });

    const runLenis = (time: number) => {
      lenis?.raf(time);
      lenisRaf = window.requestAnimationFrame(runLenis);
    };

    if (lenis) {
      lenisRaf = window.requestAnimationFrame(runLenis);
    }

    const blob = document.getElementById("cursor-blob");

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!blob || mouseRaf) return;

      mouseRaf = window.requestAnimationFrame(() => {
        blob.style.transform = `translate(${mouseX - 140}px, ${
          mouseY - 128
        }px)`;

        mouseRaf = 0;
      });
    };

    document.addEventListener("mousemove", handleMouseMove, {
      passive: true,
    });

    /*
     * ----------------------------------------------------------
     * PARALLAX EFFECT
     * ----------------------------------------------------------
     */

    const parallaxTexts = document.querySelectorAll(".parallax-text");

    const heroImg = document.getElementById("hero-img");

    const labels = document.querySelectorAll(".floating-label");

    const applyScrollEffects = (scroll = window.pageYOffset) => {
      /*
       * HERO TEXT
       */

      parallaxTexts.forEach((text) => {
        const speed = text.getAttribute("data-speed");

        if (speed) {
          (text as HTMLElement).style.transform = `translateX(${
            scroll * Number.parseFloat(speed) * 0.1
          }px)`;
        }
      });

      /*
       * HERO IMAGE
       */

      if (heroImg) {
        heroImg.style.transform = `translate(-50%, calc(-50% + ${
          scroll * 0.2
        }px)) scale(${1 + scroll * 0.0005})`;
      }

      /*
       * FLOATING LABELS
       */

      labels.forEach((label, index) => {
        const direction = index % 2 === 0 ? 1 : -1;

        (label as HTMLElement).style.transform = `translateY(${
          scroll * 0.1 * direction
        }px)`;
      });
    };

    const handleScroll = () => {
      if (scrollRaf) return;

      scrollRaf = window.requestAnimationFrame(() => {
        applyScrollEffects();
        scrollRaf = 0;
      });
    };

    if (lenis) {
      lenis.on("scroll", ({ scroll }) => {
        applyScrollEffects(scroll);
      });
    } else {
      window.addEventListener("scroll", handleScroll, {
        passive: true,
      });
    }

    /*
     * Sincronizzazione iniziale
     */

    applyScrollEffects();

    /*
     * ----------------------------------------------------------
     * SMOOTH ANCHOR SCROLL
     * ----------------------------------------------------------
     */

    const anchors = document.querySelectorAll('a[href^="#"]');

    const handleAnchorClick = (e: Event) => {
      e.preventDefault();

      const anchor = e.currentTarget as HTMLAnchorElement;

      const href = anchor.getAttribute("href");

      if (!href || href === "#") {
        if (lenis) {
          lenis.scrollTo(0);
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }

        return;
      }

      const targetId = href.slice(1);

      const target = targetId ? document.getElementById(targetId) : null;

      if (target) {
        if (lenis) {
          lenis.scrollTo(target, { offset: -20 });
        } else {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };

    anchors.forEach((anchor) => {
      anchor.addEventListener("click", handleAnchorClick);
    });

    /*
     * ----------------------------------------------------------
     * CLEANUP
     * ----------------------------------------------------------
     */

    return () => {
      if (mouseRaf) {
        window.cancelAnimationFrame(mouseRaf);
      }

      if (scrollRaf) {
        window.cancelAnimationFrame(scrollRaf);
      }

      if (lenisRaf) {
        window.cancelAnimationFrame(lenisRaf);
      }

      lenis?.destroy();

      document.removeEventListener("mousemove", handleMouseMove);

      if (!lenis) {
        window.removeEventListener("scroll", handleScroll);
      }

      anchors.forEach((anchor) => {
        anchor.removeEventListener("click", handleAnchorClick);
      });
    };
  }, []);

  /*
   * ------------------------------------------------------------
   * PAGE
   * ------------------------------------------------------------
   */

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="site-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            aria-label="Caricamento portfolio"
          >
            <motion.div
              className="site-loader-content"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src="/logo.png"
                alt="Anna De Feo"
                width={220}
                height={70}
                priority
                className="site-loader-logo"
              />
              <span className="site-loader-line" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CURSOR BLOB */}

      <div className="blob" id="cursor-blob" />

      {/* NAVIGATION */}

      <nav className="site-nav fixed top-0 left-0 right-0 z-40 flex-row! gap-0! flex w-full flex-wrap items-center justify-between rounded-none border-b border-white/30 bg-[#00BBF9]/22 px-6 py-3 shadow-[0_4px_14px_rgba(131,56,236,0.14)] backdrop-blur-md">
        <a
          href="/"
          aria-label="Anna De Feo - Home"
          className="flex items-center"
        >
          <Image
            src="/logo.png"
            alt="Anna De Feo"
            width={100}
            height={32}
            className="h-8 w-auto"
            priority
          />
        </a>

        <ul className="nav-links hidden gap-6 lg:flex">
          <li>
            <a href="#about" className="nav-link-reel" aria-label="About Me">
              <span className="nav-link-reel-track">
                <span>About Me</span>
                <span aria-hidden="true">About Me</span>
              </span>
            </a>
          </li>

          <li>
            <a href="#skills" className="nav-link-reel" aria-label="Skills">
              <span className="nav-link-reel-track">
                <span>Skills</span>
                <span aria-hidden="true">Skills</span>
              </span>
            </a>
          </li>

          <li>
            <a href="#work" className="nav-link-reel" aria-label="Projects">
              <span className="nav-link-reel-track">
                <span>Projects</span>
                <span aria-hidden="true">Projects</span>
              </span>
            </a>
          </li>

          <li>
            <a href="#contact" className="nav-link-reel" aria-label="Contact">
              <span className="nav-link-reel-track">
                <span>Contact</span>
                <span aria-hidden="true">Contact</span>
              </span>
            </a>
          </li>
        </ul>
      </nav>

      <MobileBubbleMenu />
      <MusicVinyl />

      <main className="mt-20">
        {/* =====================================================
            HERO
        ====================================================== */}

        <section id="hero">
          <img
            src="/profile.jpeg"
            alt="Profile"
            className="hero-img"
            id="hero-img"
          />

          <div className="hero-title-container container">
            <span className="huge-type parallax-text" data-speed="-2">
              WEB
            </span>

            <span
              className="huge-type outline-text parallax-text"
              data-speed="2"
              style={{
                paddingLeft: "200px",
              }}
            >
              DEVELOPER
            </span>
          </div>
        </section>

        {/* =====================================================
            ABOUT
        ====================================================== */}

        <section id="about">
          <div className="container">
            <div
              style={{
                maxWidth: "800px",
              }}
            >
              <h2
                style={{
                  fontSize: "3rem",
                  fontFamily: "var(--syne)",
                  marginBottom: "40px",
                }}
              >
                <FoldText
                  text="I DESIGN AND BUILD DIGITAL EXPERIENCES THAT WORK WELL."
                  splitBy="word"
                  hinge="top"
                  duration={0.58}
                  stagger={0.03}
                  trigger="scroll"
                  fontSize="3rem"
                  fontWeight={700}
                  color="#8338EC"
                  className="block"
                  style={{
                    fontFamily: "var(--syne)",
                    display: "block",
                    lineHeight: "1.05",
                    letterSpacing: "normal",
                  }}
                />
              </h2>

              <p
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 300,
                  color: "#8338EC",
                }}
              >
                <FoldText
                  text="I work across front-end and back-end to create thoughtful, reliable products with clear structure and a solid technical foundation."
                  splitBy="word"
                  hinge="top"
                  duration={0.58}
                  stagger={0.03}
                  trigger="scroll"
                  fontSize="1.5rem"
                  fontWeight={300}
                  color="#8338EC"
                  className="block leading-relaxed"
                  style={{
                    fontFamily: "var(--syne)",
                    display: "block",
                    lineHeight: "1.625",
                    letterSpacing: "normal",
                  }}
                />
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            MARQUEE
        ====================================================== */}

        <div className="scrolling-marquee">
          <div className="marquee-inner">
            <span className="huge-type outline-text">
              DESIGN — CODE — BUILD —{" "}
            </span>

            <span className="huge-type outline-text">
              DESIGN — CODE — BUILD —{" "}
            </span>
          </div>
        </div>

        {/* =====================================================
            SKILLS
        ====================================================== */}

        <section id="skills" className="container">
          <div className="sticky-type">SKILLS</div>

          <SkillsOrbitRobot />
        </section>

        {/* =====================================================
            PROJECTS
        ====================================================== */}

        <section id="work" className="container">
          <div className="sticky-type">PROJECTS</div>

          <WorksGallery />
        </section>

        {/* =====================================================
            FOOTER
        ====================================================== */}

        <footer id="contact">
          <div className="container">
            <div className="sticky-type">CONTACT</div>

            <div className="footer-cta">
              <a href="mailto:annadefeo91@outlook.it">
                <FoldText
                  text="LET'S — BUILD"
                  splitBy="word"
                  hinge="top"
                  duration={0.58}
                  stagger={0.03}
                  trigger="scroll"
                  fontSize="inherit"
                  fontWeight="inherit"
                  color="inherit"
                  className="inline-block"
                  style={{
                    fontFamily: "var(--inter)",
                    display: "inline-block",
                    lineHeight: "0.8",
                    letterSpacing: "normal",
                  }}
                />
              </a>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <MagneticButton>
                <div className="rounded-full border-2 border-[#8338EC] px-10 py-5 text-[#8338EC] transition-colors hover:bg-[#8338EC] hover:text-white">
                  <a
                    href="mailto:annadefeo91@outlook.it"
                    className="inline-flex items-center justify-center text-sm font-medium uppercase tracking-[0.3em] whitespace-nowrap"
                    style={{
                      paddingInline: "20px",
                      paddingBlock: "10px",
                    }}
                  >
                    Contact me
                  </a>
                </div>
              </MagneticButton>
            </div>

            <div className="divider" />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontFamily: "var(--syne)",
                fontSize: "0.8rem",
                textTransform: "uppercase",
                color: "#8338EC",
              }}
            >
              <div>© 2026 ANNA DE FEO</div>

              <div />

              <div>• AVAILABLE FOR WORK</div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
