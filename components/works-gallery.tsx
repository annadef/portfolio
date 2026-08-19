"use client";

import { useState } from "react";
import { VideoCard } from "@/components/video-card";

const projects = [
  {
    id: 1,
    title: "STACK PC",
    category: "FULL STACK PROJECT",
    year: "2026",
    thumbnail: "/projects/stack-pc.png",
    description:
      "I developed an application that allows users to assemble a PC verifying component compatibility, calculating the price in real time, and managing the entire process.",
    skills: ["React", "TypeScript", "Tailwind CSS", "Laravel", "PostgreSQL"],
    linkedin:
      "https://www.linkedin.com/posts/anna-de-feo-201715235_react-typescript-laravel-ugcPost-7483838578951782401-TIe-/?utm_source=share&utm_medium=member_desktop&rcm=ACoAADqpF-EBGIvk6CidjnLerntu33I7fJsnr54",
    linkType: "linkedin" as const,
  },
  {
    id: 2,
    title: "ANGELO CORNACCHIA",
    category: "LANDING PAGE",
    year: "2026",
    thumbnail: "/projects/angelo-cornacchia.png",
    description:
      "Developed a landing page for Angelo Cornacchia, a professional therapist, using WordPress and Elementor. The website provides information about his services.",
    skills: ["Wordpress", "Elementor", "HTML", "CSS", "JavaScript"],
    figma: "https://angelocornacchia.it/",
    linkType: "figma" as const,
  },
  {
    id: 3,
    title: "INFOBASIC CONSULTING",
    category: "LANDING PAGE INFOBASIC",
    year: "2026",
    thumbnail: "/projects/infobasic.png",
    description:
      "Developed the consulting landing page for Infobasic using WordPress and Elementor.",
    skills: ["Wordpress", "Elementor", "HTML", "CSS", "JavaScript"],
    figma: "https://www.infobasic.it/consulenza-2/",
    linkType: "figma" as const,
  },
  {
    id: 4,
    title: "TOURNAMENT MANAGER",
    category: "FULL STACK PROJECT",
    year: "2025",
    thumbnail: "/projects/tournament-manager.png",
    description:
      "Sports tournament management app. Key features: Create, edit, and delete teams and tournaments, add or edit match results, tournament and results history.",
    skills: ["React", "Tailwind CSS", "PHP", "API REST", "PostgreSQL"],
    linkedin:
      "https://www.linkedin.com/posts/anna-de-feo-201715235_react-typescript-php-ugcPost-7432017585321213952-y_qF/?utm_source=share&utm_medium=member_desktop&rcm=ACoAADqpF-EBGIvk6CidjnLerntu33I7fJsnr54",
    linkType: "linkedin" as const,
  },
  {
    id: 5,
    title: "GB GRAFICA",
    category: "GB GRAFICA WEBSITE",
    year: "2025",
    thumbnail: "/projects/gb-grafica.png",
    description:
      "Designed the visual identity and website layout for GB Grafica.",
    skills: ["Figma", "WordPress", "Elementor", "HTML", "CSS", "JavaScript"],
    figma:
      "https://www.figma.com/design/eJwYbPXlvbUNIqrfAWivD2/GB-Grafica?node-id=0-1&t=i8E9bkN3tEvSlELr-1",
    linkType: "figma" as const,
  },
  {
    id: 6,
    title: "NÉMIS",
    category: "TERME & SPA WEBSITE",
    year: "2025",
    thumbnail: "/projects/némis.png",
    description:
      "Designed the visual identity and logo of the brand. Created the website layout in Figma and developed it in WordPress using the Astra theme and Elementor page builder.",
    skills: ["Illustrator", "Figma", "WordPress", "HTML", "CSS", "JavaScript"],
    figma:
      "https://www.figma.com/design/1LgE9L4uDrF4TyUIJ3p7bs/Brief-esame-finale?node-id=0-1&t=iimo0neINN4WOPSr-1",
    linkType: "figma" as const,
  },
  {
    id: 7,
    title: "CMDR",
    category: "TECH GADGETS REVIEW PLATFORM",
    year: "2025",
    thumbnail: "/projects/cmdr.png",
    description:
      "Designed the logo, wireframes, and final prototype. Built an interactive review platform using Vite, Just-DOM, JSON Server and Fetch API for dynamic data.",
    skills: ["Illustrator", "Figma", "Vite", "Tailwind CSS", "JavaScript"],
    figma:
      "https://www.figma.com/design/JMQgjjH9htBeVCOpXNR2vy/CmdR?node-id=0-1&t=fOumgNekhEAdNtfN-1",
    linkType: "figma" as const,
  },
  {
    id: 8,
    title: "MIA CREAZIONE",
    category: "JEWELRY E-COMMERCE WEBSITE",
    year: "2024",
    thumbnail: "/projects/mia-creazione.png",
    description:
      "Developed a jewelry store website including a wishlist feature with persistent data using localStorage.",
    skills: ["Illustrator", "Figma", "Bootstrap", "HTML", "CSS", "JavaScript"],
    figma:
      "https://www.figma.com/design/WF3dLdhCeJyZx9OEGrzJmX/Mia-Creazione?node-id=0-1&t=cVuGnMhWJF3RtlvN-1",
    linkType: "figma" as const,
  },
];

export function WorksGallery() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const rows = [];

  for (let i = 0; i < projects.length; i += 4) {
    rows.push(projects.slice(i, i + 4));
  }

  return (
    <div className="container mx-auto px-6">
      {/* =========================================================
          DESKTOP — 4 PROGETTI PER RIGA
      ========================================================= */}

      <div className="hidden space-y-3 md:block">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex w-full min-w-0 items-start gap-6">
            {row.map((project) => (
              <VideoCard
                key={project.id}
                project={project}
                isHovered={hoveredId === project.id}
                isDimmed={hoveredId !== null && hoveredId !== project.id}
                onHoverChange={(hovered) =>
                  setHoveredId(hovered ? project.id : null)
                }
              />
            ))}
          </div>
        ))}
      </div>

      {/* =========================================================
          MOBILE
      ========================================================= */}

      <div className="flex flex-col gap-6 md:hidden">
        {projects.map((project) => (
          <VideoCard
            key={project.id}
            project={project}
            isHovered={hoveredId === project.id}
            isDimmed={hoveredId !== null && hoveredId !== project.id}
            onHoverChange={(hovered) =>
              setHoveredId(hovered ? project.id : null)
            }
          />
        ))}
      </div>
    </div>
  );
}
