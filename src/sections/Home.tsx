import Silk from "@/components/Silk";
import WorkExperience from "./WorkExperience";
import About from "./About";

import { useLayoutEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BlurText from "@/components/BlurText";
import { SilkFallback, SilkReveal } from "@/components/SilkReveal";
import HighlightedWork from "./HighlightedWork";
import Contact from "./Contact";
import WhatsappSvg from "@/assets/svg/WhatsappSvg";
import ResumeSvg from "@/assets/svg/ResumeSvg";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const { t } = useTranslation();
  
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !leftRef.current || !rightRef.current) return;

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",

      endTrigger: rightRef.current,
      end: "bottom bottom",

      pin: leftRef.current,
      pinSpacing: false,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  useLayoutEffect(() => {
    if (!rightRef.current || !bottomRef.current) return;
    gsap.set(bottomRef.current, {
      yPercent: -100,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        id: "contact-reveal",
        trigger: rightRef.current,
        start: "bottom bottom",
        end: "+=101%",
        scrub: true,
        pin: false,
        anticipatePin: 1,
      },
    });

    tl.to(bottomRef.current, {
      yPercent: 0,
      ease: "none",
    });

    tl.fromTo(
      bottomRef.current,
      { filter: "blur(12px)" },
      { filter: "blur(0px)" },
      0,
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 1280px)",
        isMobile: "(max-width: 1279px)",
      },
      (context) => {
        const { isDesktop } = context.conditions as { isDesktop: boolean };
        const mainTl = gsap.timeline({
          defaults: { ease: "power4.inOut" },
        });

        if (isDesktop) {
          // Intro Layout Animation (Desktop)
          // Usamos xPercent para el solapamiento sin romper el flujo de Tailwind
          gsap.set(leftRef.current, { zIndex: 30 });
          gsap.set(rightRef.current, {
            xPercent: -99,
            zIndex: 20,
          });

          mainTl
            .to(rightRef.current, {
              xPercent: 0,
              duration: 2.2,
              delay: 0.5,
              ease: "power4.inOut",
            })
            .set([leftRef.current, rightRef.current], {
              clearProps: "zIndex,xPercent",
            })
            .call(() => ScrollTrigger.refresh());
        }

        // Content Animations (Synced)
        mainTl
          .from(
            subtitleRef.current,
            {
              opacity: 0,
              filter: "blur(14px)",
              duration: 1,
              ease: "power2.out",
            },
            isDesktop ? "-=1" : 0.7,
          )
          .from(
            textRef.current,
            {
              opacity: 0,
              filter: "blur(14px)",
              duration: 1,
              ease: "power2.out",
            },
            "-=0.8",
          )
          .from(
            ".contact-item",
            {
              opacity: 0,
              x: -80,
              duration: 0.6,
              ease: "power2.out",
              stagger: 0.2,
            },
            "-=1",
          );
      },
      sectionRef,
    );

    return () => mm.revert();
  }, []);

  const SIZE = 1000;

  const options = [
    { 
      name: t("home.btn_mail"), 
      href: "mailto:nazarenojunin@gmail.com",
      icon: <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
    },
    { 
      name: t("home.btn_cv"), 
      href: "https://docs.google.com/document/d/1EqLsHFxXghg_7N9ZkMPCujrz_Su4o-KTL7avZmoiBys/edit?usp=sharing",
      icon: <ResumeSvg className="w-5 h-5 sm:w-6 sm:h-6" />
    },
    {
      name: "Whatsapp",
      href: "https://api.whatsapp.com/send?phone=542364329720",
      icon: <WhatsappSvg className="w-6 h-6 sm:w-7 sm:h-7" />
    },
  ];

  return (
    <>
      <section
        id="Home"
        ref={sectionRef}
        className="relative bg-main-black z-20 flex flex-col xl:flex-row"
      >
        {/* ===== LEFT ===== */}
        <div ref={leftRef} className="min-h-[100svh] xl:min-h-0 xl:h-screen w-full xl:w-1/2 overflow-hidden z-20 p-2">
          <div className="relative w-full h-full rounded-[28px] overflow-hidden">
            {/* Fondo */}
            <div className="absolute inset-0">
              <SilkReveal>
                {(onReady: () => void) => (
                  <>
                    <SilkFallback />
                    <Silk color="#8b7732" onReady={onReady} />
                  </>
                )}
              </SilkReveal>
            </div>

            {/* Contenido */}
            <div 
              className="relative z-20 text-center flex flex-col h-full w-full text-main-white xl:overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              onWheel={(e) => { if(window.innerWidth >= 1280) e.stopPropagation() }}
              onTouchMove={(e) => { if(window.innerWidth >= 1280) e.stopPropagation() }}
            >
              <div className="m-auto flex flex-col items-center justify-center gap-y-10 xl:gap-y-10 w-full h-full xl:h-auto py-5 xl:min-h-max">
                
                <div className="flex flex-col gap-y-5">
                  <h1 className="mx-auto italic text-[3rem] xs:text-[3.5rem] sm:text-[4rem] lg:text-[6rem] xxl:text-[7.5rem] leading-tight xl:leading-30 shrink-0">
                    <BlurText
                      text="NazarenoGutierrez"
                      delay={50}
                      animateBy="letters"
                      direction="bottom"
                      className="w-[540px] xxl:w-[630px] justify-center xl:block hidden"
                    />
                    <BlurText
                      text="Nazareno Gutierrez"
                      delay={50}
                      animateBy="letters"
                      direction="bottom"
                      className="justify-center hidden sm:block xl:hidden "
                    />
                    <BlurText
                      text="Nazareno Gutierrez"
                      delay={50}
                      animateBy="words"
                      direction="bottom"
                      className="ms-4 mx-auto w-[245px] xs:w-[283px] block sm:hidden"
                    />
                  </h1>

                  <h2
                    ref={subtitleRef}
                    className="text-xl sm:text-[2rem] font-thin xl:mb-8 italic shrink-0"
                  >
                    {t("home.title")}
                  </h2>
                </div>

                <div>
                  <p
                    ref={textRef}
                    className="mb-3 text-base xl:text-xl font-thin max-w-[600px] lg:max-w-[650px] text-pretty px-6 sm:px-10 shrink-0"
                  >
                    {t("home.description_1")}
                  </p>
                  <p
                    className="xl:mt-8 xs:block hidden text-sm sm:text-base xl:text-xl font-thin max-w-[600px] lg:max-w-[650px] text-pretty px-6 sm:px-10 shrink-0"
                  >
                    {t("home.description_2")}
                  </p>
                </div>

                <div className="w-full flex justify-center items-center gap-x-3 sm:gap-x-5 xl:mt-10 xxl:mt-20 shrink-0">
                  {options.map(({ name, href, icon }, index) => (
                    <a
                      href={href}
                      key={index}
                      target="_blank"
                      className="contact-item border-fade flex items-center justify-center px-4 py-3 w-14 sm:w-40 sm:px-5 text-center h-full rounded-xl bg-main-black text-main-white text-sm sm:text-lg font-thin hover:border-main-yellow/50 transition-colors"
                      title={name}
                    >
                      <span className="sm:hidden flex items-center justify-center w-full h-full">
                        {icon}
                      </span>
                      <span className="hidden sm:inline">
                        {name}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== RIGHT ===== */}
        <div ref={rightRef} className="xl:w-1/2 w-full z-40 min-h-screen m-2 pr-0.5">
          <div className="relative bg-main-black rounded-[28px] overflow-hidden">
            {/* Contenido */}
            <div className="relative w-full text-main-white space-y-2.5 bg-main-black">
              <WorkExperience />
              <HighlightedWork />
              <About />
            </div>
          </div>
        </div>

        <div className="xl:h-screen"></div>
      </section>

      {/* ===== BOTTOM ===== */}
      <div
        id="Contact"
        className="h-screen relative w-full overflow-hidden z-0"
      >
        <div ref={bottomRef} className="h-full w-full">
          <Contact size={SIZE} />
        </div>
      </div>
    </>
  );
};

export default Home;
