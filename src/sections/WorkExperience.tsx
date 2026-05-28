import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import BlurText from "@/components/BlurText";
import LogoLoop from "@/components/LogoLoop";
import type { LogoItem } from "@/components/LogoLoop";
import { useTranslation } from "react-i18next";
import { logos } from "@/constants/logos";

const WorkExperience = () => {
  const { t } = useTranslation();

  const experiences = [
    {
      title: "Piso Fuerte",
      role: "Frontend Developer",
      logo: "/logo-piso-fuerte-small.png",
      href: "https://pisofuerte.com.ar",
      logoLoop: false,
      description: t("work.exp1_desc"),
      year: "2025",
    },
    {
      title: "Rave Dates",
      role: "Frontend Developer",
      logo: "/logo-rave-dates.svg",
      href: "https://ravedates.proxising.com",
      logoLoop: false,
      description: t("work.exp2_desc"),
      year: "2024",
    },
    {
      title: "Dymo",
      role: "Frontend Developer",
      logo: "/dymo-logo-small.png",
      href: "https://dymo.tpeoficial.com",
      logoLoop: false,
      description: t("work.exp3_desc"),
      year: "2023",
    },
    {
      title: "Freelance",
      role: "Frontend Developer",
      logo: logos,
      logoLoop: true,
      description: t("work.exp4_desc"),
      year: "2022",
    },
  ];

  const sectionRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        descriptionRef.current,
        {
          opacity: 0,
          filter: "blur(14px)",
        },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
          opacity: 1,
          filter: "blur(0px)",
          delay: 0.2,
          duration: 1,
          ease: "power2.out",
        }
      );

      gsap.from(lineRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        height:0,
        delay: 0.4,
        duration: 2,
        ease: "power2.out",
      });

      gsap.from(".work-item", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        opacity: 0,
        y: 40,
        filter: "blur(10px)",
        duration: 0.6,
        delay: 0.6,
        ease: "power2.out",
        stagger: 0.3,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen text-center bg-linear-150 from-[#0d0d0d] via-[#120d0d] to-[#3a3202] rounded-b-[28px] overflow-hidden p-6 sm:p-10 md:p-20 pt-24 md:pt-32 relative">
      {/* Fondo */}
      <div className="absolute inset-0 opacity-30 bg-[url('/noise.png')]"></div>
      
      <h2 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl mx-auto w-fit italic mb-8 sm:mb-12">
        <BlurText
          text={t("work.title")}
          delay={50}
          animateBy="letters"
          direction="bottom"
        />
      </h2>

      <p ref={descriptionRef} className="text-base sm:text-lg md:text-xl max-w-[700px] mb-10 sm:mb-16 text-main-white font-thin mx-auto">
        {t("work.description")}
      </p>

      <div className="relative pl-8 sm:pl-10 text-start space-y-10 sm:space-y-14 max-w-4xl mx-auto">
        {/* Línea vertical */}
        <span ref={lineRef} className="absolute left-1 top-2 bottom-2 w-px bg-main-white/40" />

        {experiences.map((exp, index) => (
          <div key={index} className="work-item relative">
            {/* Punto */}
            <span className="absolute -left-[16px] sm:-left-[20px] top-3 w-2 h-2 rounded-full bg-main-yellow" />

            <div className="flex flex-col">
              <div className="text-xl sm:text-2xl italic flex items-center">
                {
                  exp.logoLoop ? 
                  <LogoLoop
                  className="h-8 sm:h-10! me-2 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]"
                    logos={exp.logo as LogoItem[]}
                    speed={30}
                    direction="up"
                    logoHeight={20}
                    gap={5}
                    hoverSpeed={0}
                  />
                  :
                  <img src={typeof exp.logo === "string" ? exp.logo : ""} alt="logo" className="w-8 h-8 sm:w-10 sm:h-10 p-1 sm:p-2 pt-0 object-contain" />
                }
                
                <h3>{exp.title}</h3>
              </div>
              <span className="text-xs sm:text-sm text-main-white/60 mb-2">
                {exp.role} · {exp.year} {" "}
                <span className={exp.logoLoop ? "hidden" : ""}>· </span>
                <a href={exp.href} className="underline hover:decoration-white/70 break-all sm:break-normal" target="_blank" rel="noopener noreferrer">
                    {exp.href} 
                </a>
              </span>
              <p className="text-sm sm:text-base text-main-white/90 max-w-[600px]">
                {exp.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkExperience;
