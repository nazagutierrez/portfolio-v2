import Silk from "@/components/Silk";
import Work from "./Work";
import About from "./About";
import Navbar from "./Navbar";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !leftRef.current) return;

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: leftRef.current,
      pinSpacing: false,
    });
    
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: navbarRef.current,
      pinSpacing: false,
    });

    return () => ScrollTrigger.killAll();
  }, []);

  const SIZE = 1000;

  const options = [
    { name: "Enviar mail", href: "mailto:nazarenojunin@gmail.com" },
    { name: "Ver CV", href: "https://nazareno.io/cv" },
    { name: "Whatsapp", href: "https://api.whatsapp.com/send?phone=542364329720" },
  ]

  return (
    // 🔥 ESTA ALTURA DEFINE CUÁNTO TIEMPO QUEDA PEGADO
    <section ref={sectionRef} className="relative min-h-[300vh] flex">
      
      {/* ===== LEFT ===== */}
      <div ref={leftRef} className="h-screen w-1/2 overflow-hidden">
        {/* Fondo */}
        <div
          className="absolute inset-0"
          style={{ clipPath: "url(#clip-left)" }}
        >
          <Silk color="#8b7732" />
        </div>

        {/* Contenido */}
        <div className="relative z-10 p-20 flex flex-col h-full text-main-white">
          <h1 className="flex mt-16 flex-col mb-10 italic text-[8rem] leading-[7.5rem]">
            <span>Nazareno</span>
            <span>Gutierrez</span>
          </h1>

          <h2 className="text-[2rem] font-thin mb-8 italic ms-5">
            Frontend Developer SSR
          </h2>

          <h3 className="ms-5 text-lg font-thin max-w-[600px] text-pretty">
            Buscás un desarrollador Semi-Senior experto en React, Next.js y Typescript,
            con buen trabajo en equipo, buen ojo para el diseño y muchas ganas de
            trabajar? ¡Hablemos!
          </h3>

          <div className="w-full  flex justify-center items-center gap-x-5 mt-34">
            {options.map(({ name, href }, index) => (
              <a
                key={index}
                href={href}
                target="_blank"
                className="flex border-fade items-center justify-center w-40 h-14 rounded-xl bg-main-black text-main-white text-lg font-thin"
              >
                {name}
              </a>
            ))}
          </div>
        </div>

        {/* Frame */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox={`0 0 ${SIZE} ${SIZE}`}

        >
          <defs>
            <clipPath id="clip-left" clipPathUnits="objectBoundingBox">
              <rect
                x={0.01}
                y={0.01}
                width={0.99}
                height={0.98}
                rx={0.03}
                ry={0.03}
              />
            </clipPath>
          </defs>
        </svg>
      </div>

      {/* ===== RIGHT ===== */}
      <div className="w-1/2  m-2">
        <div className="relative bg-main-black rounded-[28px] overflow-hidden">
          {/* Fondo */}
          <div className="absolute inset-0 z-0">
            <Silk color="#4b4b4b" />
          </div>

          {/* Navbar */}
          <div ref={navbarRef} className="relative h-[90px] z-50 w-full">
            <div className="absolute top-14 left-1/2 -translate-x-1/2">
              <Navbar />
            </div>
          </div>

          {/* Contenido */}
          <div className="relative z-10 p-20 text-main-white space-y-40">
            <Work />
            <About />
            <section className="h-screen">More</section>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
