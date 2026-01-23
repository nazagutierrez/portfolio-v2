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

  const BORDER = 12;
  const RADIUS = 28;
  const SIZE = 1000;

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

          <h3 className="ms-5 font-thin max-w-[500px] text-pretty">
            Buscás un desarrollador con Semi-Senior experto en React, Next.js y Typescript,
            con buen trabajo en equipo, buen ojo para el diseño y muchas ganas de
            trabajar? ¡Hablemos!
          </h3>
        </div>

        {/* Frame */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox={`0 0 ${SIZE} ${SIZE}`}
        >
          <defs>
            <clipPath id="clip-left" clipPathUnits="userSpaceOnUse">
              <rect
                x={BORDER}
                y={BORDER}
                width={945}
                height={903}
                rx={RADIUS}
              />
            </clipPath>
          </defs>
        </svg>
      </div>

      {/* ===== RIGHT ===== */}
      <div className="w-1/2 relative">
        <div className="min-h-screen bg-main-black relative">
          {/* Fondo */}
          <div
            className="absolute inset-0 z-0"
            style={{ clipPath: "url(#clip-right)" }}
          >
            <Silk color="#4b4b4b" />
          </div>

          <div ref={navbarRef} className="relative h-[90px] z-50 w-full">
            {/* Navbar real */}
            <div className="absolute top-14 left-1/2 -translate-x-1/2">
              <Navbar />
            </div>
          </div>

          {/* Contenido */}
          <div className="relative z-10 p-20 text-main-white space-y-40">
            <About />
            <Work />
            <section className="h-screen">More</section>
          </div>

          {/* Frame */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox={`0 0 ${SIZE} ${SIZE}`}
          >
            <defs>
              <clipPath id="clip-right" clipPathUnits="userSpaceOnUse">
                <rect
                  x={BORDER}
                  y={BORDER}
                  width="920"
                  height={SIZE - BORDER * 2}
                  rx={RADIUS}
                />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Home;
