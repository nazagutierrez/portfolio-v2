import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import BlurText from "@/components/BlurText";

const experiences = [
  {
    title: "Piso Fuerte",
    role: "Frontend Developer",
    description:
      "Desarrollo de interfaces modernas con React y TailwindCSS, foco en performance y UX.",
    year: "2025",
  },
  {
    title: "Zergex",
    role: "Frontend Developer",
    description:
      "Construcción de vistas complejas, animaciones y componentes reutilizables en React.",
    year: "2024",
  },
  {
    title: "TPEOficial",
    role: "Frontend Developer",
    description:
      "Trabajo en productos SaaS, emails, herramientas con IA y colaboración directa con diseño y comunicación.",
    year: "2023",
  },
  {
    title: "Freelance",
    role: "Frontend Developer",
    description:
      "Desarrollo de soluciones a medida con React, Next.js y Firebase para distintos clientes.",
    year: "2022",
  },
];

const Work = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(descriptionRef.current, {
        opacity: 0,
        delay: 0.7,
        filter: "blur(14px)",
        duration: 1,
        ease: "power2.out",
      })

      gsap.from(lineRef.current, {
        height:0,
        delay: 0.9,
        duration: 2,
        ease: "power2.out",
      })

      gsap.from(".work-item", {
        opacity: 0,
        y: 40,
        duration: 0.6,
        delay: 1.7,
        ease: "power2.out",
        stagger: 0.4,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen">
      <h2 className="text-7xl italic mb-6">
        <BlurText
          text="Mi trabajo"
          delay={50}
          animateBy="letters"
          direction="bottom"
        />
      </h2>

      <p ref={descriptionRef} className="text-xl max-w-[700px] mb-16 text-main-white font-thin">
        Experiencia profesional y proyectos donde construí interfaces modernas,
        funcionales y muy estéticas.
      </p>

      <div className="relative pl-10 space-y-14">
        {/* Línea vertical */}
        <span ref={lineRef} className="absolute left-1 top-2 bottom-2 w-px bg-main-white/40" />

        {experiences.map((exp, index) => (
          <div key={index} className="work-item relative">
            {/* Punto */}
            <span className="absolute -left-[16px] top-3 w-2 h-2 rounded-full bg-main-yellow" />

            <div className="flex flex-col">
              <h3 className="text-2xl italic">{exp.title}</h3>
              <span className="text-sm text-main-white/60 mb-2">
                {exp.role} · {exp.year}
              </span>
              <p className="text-main-white max-w-[600px]">
                {exp.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Work;
