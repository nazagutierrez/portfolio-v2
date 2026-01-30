import Silk from "@/components/Silk";
import Work from "./Work";
import About from "./About";
import Navbar from "./Navbar";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BlurText from "@/components/BlurText";
import { SilkFallback, SilkReveal } from "@/components/SilkReveal";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const contactLineRef = useRef<HTMLDivElement>(null);
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

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(subtitleRef.current, {
        opacity: 0,
        delay: 0.7,
        filter: "blur(14px)",
        duration: 1,
        ease: "power2.out",
      })
      
      gsap.from(textRef.current, {
        opacity: 0,
        delay: 0.8,
        filter: "blur(14px)",
        duration: 1,
        ease: "power2.out",
      })

      gsap.from(contactLineRef.current, {
        height:0,
        delay: 0.9,
        duration: 2,
        ease: "power2.out",
      })
      
      gsap.from(".contact-item", {
        opacity: 0,
        delay: 1,
        x: -80,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.3,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const SIZE = 1000;

  const options = [
    { name: "Enviar mail", href: "mailto:nazarenojunin@gmail.com" },
    { name: "Ver CV", href: "https://nazareno.io/cv" },
    { name: "Whatsapp", href: "https://api.whatsapp.com/send?phone=542364329720" },
  ]

  return (
    <section ref={sectionRef} className="relative min-h-[300vh] flex">
      {/* ===== LEFT ===== */}
      <div ref={leftRef} className="h-screen w-1/2 overflow-hidden z-999">
        {/* Fondo */}
        <div
          className="absolute inset-0"
          style={{ clipPath: "url(#clip-left)" }}
        >
          <div
            className="absolute inset-0"
            style={{ clipPath: "url(#clip-left)" }}
          >
            <SilkReveal>
              {(onReady: () => void) => (
                <>
                  <SilkFallback />
                  <Silk 
                    color="#8b7732"         
                    onReady={onReady} 
                  />
                </>
              )}
            </SilkReveal>
          </div>
        </div>

        {/* Contenido */}
        <div className="relative z-10 p-20 flex flex-col h-full text-main-white">
          <h1 className="flex mt-16 flex-col mb-10 italic text-[8rem] leading-[7.5rem]">
            <BlurText
              text="Nazareno Gutierrez"
              delay={50}
              animateBy="letters"
              direction="bottom"
              className="max-w-[660px]"
            />
          </h1>

          <h2 ref={subtitleRef} className="text-[2rem] font-thin mb-8 italic ms-5">
            Frontend Developer SSR
          </h2>

          <h3 ref={textRef} className="ms-5 text-lg font-thin max-w-[600px] text-pretty">
            Buscás un desarrollador Semi-Senior experto en React, Next.js y Typescript,
            con buen trabajo en equipo, buen ojo para el diseño y muchas ganas de
            trabajar? ¡Hablemos!
          </h3>

          <div className="w-full flex justify-start items-center gap-x-5 ms-7 mt-20">
            <div ref={contactLineRef} className="h-16 z-20 w-px bg-main-yellow absolute left-27"></div>
            
            <div
              className="overflow-hidden flex ps-7 gap-x-5"
            >
            {options.map(({ name, href }, index) => (
                <a
                  href={href}
                  key={index}
                  target="_blank"
                  className="contact-item border-fade w-40 px-5 text-center py-3  h-full rounded-xl bg-main-black text-main-white text-lg font-thin"
                >
                  {name}
                </a>
            ))}
            </div>
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
      <div className="w-1/2 m-2">
        <div className="relative bg-main-black rounded-[28px] overflow-hidden">
          {/* Navbar */}
          <div ref={navbarRef} className="relative  z-50 w-full">
            <div className="absolute top-10 left-1/2 -translate-x-1/2">
              <Navbar />
            </div>
          </div>

          {/* Contenido */}
          <div className="relative z-10 text-main-white space-y-5">
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
