import { lazy, Suspense, useLayoutEffect, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
const Silk = lazy(() => import("@/components/Silk"));
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import BlurText from "@/components/BlurText";
import { SilkFallback, SilkReveal } from "@/components/SilkReveal";
import WhatsappSvg from "@/assets/svg/WhatsappSvg";
import ResumeSvg from "@/assets/svg/ResumeSvg";
import SEOHead from "@/components/SEOHead";
import JsonLd from "@/components/JsonLd";

import WorkExperience from "./WorkExperience";
import About from "./About";
import Testimonials from "./Testimonials";
import HighlightedWork from "./HighlightedWork";
import Contact from "./Contact";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

const Home = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [introFinished, setIntroFinished] = useState(() => !!(window as any).__INTRO_PLAYED__);

  useEffect(() => {
    if (!introFinished) {
      const handleIntro = () => setIntroFinished(true);
      window.addEventListener("introComplete", handleIntro, { once: true });
      return () => window.removeEventListener("introComplete", handleIntro);
    }
  }, [introFinished]);

  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const text2Ref = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const leftAnimRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const rightAnimRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !leftRef.current || !rightRef.current) return;

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",

      endTrigger: rightRef.current,
      end: "bottom bottom",

      pin: leftRef.current,
      pinSpacing: false,
      invalidateOnRefresh: true,
    });

    // Smart ResizeObserver: refresca ScrollTrigger cuando el layout cambia (ej: cargan imágenes),
    // pero SOLO si el usuario no está scrolleando rápido, para evitar cortar el momentum en iOS.
    let debounceTimer: ReturnType<typeof setTimeout>;
    let scrollCheckTimer: ReturnType<typeof setTimeout>;
    let lastBodyHeight = document.body.scrollHeight;
    const THRESHOLD = 50;

    const doRefresh = () => {
      const smoother = ScrollSmoother.get();
      // Si está scrolleando, reintentar en 200ms
      if (smoother && Math.abs(smoother.velocity()) > 10) {
        clearTimeout(scrollCheckTimer);
        scrollCheckTimer = setTimeout(doRefresh, 200);
      } else {
        ScrollTrigger.refresh();
      }
    };

    const observer = new ResizeObserver(() => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        const newHeight = document.body.scrollHeight;
        if (Math.abs(newHeight - lastBodyHeight) > THRESHOLD) {
          lastBodyHeight = newHeight;
          doRefresh();
        }
      }, 300);
    });
    
    observer.observe(document.body);

    const handleRefresh = () => doRefresh();
    window.addEventListener("load", handleRefresh);
    if (document.fonts) {
      document.fonts.ready.then(handleRefresh);
    }

    return () => {
      clearTimeout(debounceTimer);
      clearTimeout(scrollCheckTimer);
      window.removeEventListener("load", handleRefresh);
      observer.disconnect();
      ScrollTrigger.getAll().forEach((t) => t.kill());
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
          paused: true,
        });

        const playIntro = () => mainTl.play();
        if ((window as any).__INTRO_PLAYED__) {
          playIntro();
        } else {
          window.addEventListener("introComplete", playIntro, { once: true });
        }

        if (isDesktop) {
          // Intro Layout Animation (Desktop)
          gsap.set(leftAnimRef.current, {
            xPercent: -3,
            opacity: 0,
          });
          gsap.set(rightAnimRef.current, {
            xPercent: 3,
            opacity: 0,
          });

          mainTl
            .to([leftAnimRef.current, rightAnimRef.current], {
              xPercent: 0,
              opacity: 1,
              duration: 2,
              ease: "power3.out",
            })
            .set([leftAnimRef.current, rightAnimRef.current], {
              clearProps: "xPercent,opacity",
            });
        }

        // Content Animations (only on mobile, desktop has the sliding intro)
        if (!isDesktop) {
          mainTl
            .from(
              subtitleRef.current,
              {
                opacity: 0,
                filter: "blur(14px)",
                duration: 1,
                ease: "power2.out",
              },
              0.2,
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
              text2Ref.current,
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
        }

        return () => {
          window.removeEventListener("introComplete", playIntro);
        };
      },
      sectionRef,
    );

    return () => mm.revert();
  }, []);

  const toggleLanguage = () => {
    const isEs = i18n.language === "es";
    let newPath = location.pathname;

    if (isEs) {
      newPath = `/en${newPath === '/' ? '' : newPath}`;
    } else {
      newPath = newPath.replace(/^\/en/, '') || '/';
    }

    navigate(newPath);
  };

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
    {
      name: i18n.language.toUpperCase(),
      onClick: toggleLanguage,
      icon: <span className="font-bold text-sm sm:text-base uppercase">{i18n.language}</span>
    }
  ];

  return (
    <>
      <SEOHead lang={i18n.language} />
      <JsonLd lang={i18n.language} />
      <section
        id="Home"
        ref={sectionRef}
        className="relative bg-main-black z-20 flex flex-col xl:flex-row pointer-events-auto"
      >
        {/* ===== LEFT ===== */}
        <div ref={leftRef} className="min-h-svh xl:min-h-0 xl:h-screen w-full xl:w-1/2 z-10 xl:z-40 p-2">
          <div ref={leftAnimRef} className="relative w-full h-full rounded-[28px] overflow-hidden ">
            {/* Fondo */}
            <div className="absolute inset-0">
              <SilkReveal>
                {(onReady: () => void) => (
                  <>
                    <SilkFallback />
                    <Suspense fallback={null}>
                      <Silk color="#8b7732" onReady={onReady} />
                    </Suspense>
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
              <div className="m-auto flex flex-col items-center justify-center gap-y-[clamp(1rem,4vh,2.5rem)] w-full h-full xl:h-auto pb-3 xl:min-h-max">
                
                <div className="flex flex-col gap-y-5">
                  <h1 className="mx-auto italic text-[3.2rem] xs:text-[4rem] sm:text-[5rem] 2sm:text-[5rem] xl:text-[clamp(3.5rem,9vh,6rem)] xxl:text-[clamp(4.5rem,11vh,7.5rem)] leading-tight shrink-0">
                    <div className="hidden xl:flex flex-col items-center justify-center w-full">
                      <p className="justify-center flex flex-wrap">Nazareno</p>
                      <p className="justify-center flex flex-wrap">Gutierrez</p>
                    </div>
                    <BlurText
                      text="Nazareno Gutierrez"
                      delay={50}
                      animateBy="letters"
                      direction="bottom"
                      className="justify-center hidden 2sm:block xl:hidden "
                      animate={introFinished}
                      startDelay={200}
                    />
                    <BlurText
                      text="Nazareno Gutierrez"
                      delay={50}
                      animateBy="words"
                      direction="bottom"
                      className="ms-4 mx-auto w-64 xs:w-78 sm:w-100 block 2sm:hidden"
                      animate={introFinished}
                      startDelay={200}
                    />
                  </h1>

                  <h2
                    ref={subtitleRef}
                    className="text-xl xs:text-2xl 2sm:text-[2rem] xl:text-[clamp(1.25rem,3.5vh,2rem)] font-light xl:mb-[clamp(1rem,2vh,1rem)] italic shrink-0 will-change-[filter]"
                  >
                    {t("home.title")}
                  </h2>
                </div>

                <div>
                  <p
                    ref={textRef}
                    className="mb-3 text-base xl:text-[clamp(1rem,2.5vh,1.25rem)] font-light sm:font-thin mx-auto max-w-90 sm:max-w-120 md:max-w-150 lg:max-w-155 text-pretty px-6 sm:px-10 shrink-0 will-change-[filter]"
                  >
                    {t("home.description_1")}
                  </p>
                  <p
                    ref={text2Ref}
                    className="xl:mt-[clamp(1rem,3vh,2rem)] sm:block hidden text-sm sm:text-base xl:text-[clamp(1rem,2.5vh,1.25rem)] font-light sm:font-thin mx-auto max-w-120 md:max-w-150 lg:max-w-155 text-pretty px-6 sm:px-10 shrink-0 will-change-[filter]"
                  >
                    {t("home.description_2")}
                  </p>

                  <div className="w-full flex justify-center items-center gap-x-3 sm:gap-x-5 mt-10 xl:mt-[clamp(1.5rem,5vh,5rem)] shrink-0">
                    {options.map(({ name, href, icon, onClick }, index) => {
                      const isLink = !!href;
                      const isLangBtn = index === options.length - 1;
                      
                      // El botón de idioma en desktop se renderiza via portal (fuera de este árbol DOM)
                      // para evitar el salto causado por position:fixed + transform del ancestro.
                      // En mobile sigue apareciendo inline.
                      if (isLangBtn) {
                        return (
                          <button
                            key={index}
                            onClick={onClick}
                            className="contact-item border-fade sm:hidden flex items-center justify-center w-12 h-12 rounded-xl bg-main-black text-main-white text-sm font-thin hover:border-main-yellow/50 transition-colors cursor-pointer"
                            title={name}
                          >
                            {icon}
                          </button>
                        );
                      }
                      
                      const commonClasses = `contact-item border-fade flex items-center justify-center w-14 h-12 sm:h-auto sm:w-30 lg:w-40 sm:py-3 sm:px-5 text-center rounded-xl bg-main-black text-main-white text-sm sm:text-base lg:text-lg font-thin hover:border-main-yellow/50 transition-colors cursor-pointer`;
                      
                      return isLink ? (
                        <a
                          href={href}
                          key={index}
                          target="_blank"
                          className={commonClasses}
                          title={name}
                        >
                          <span className="sm:hidden flex items-center justify-center w-full h-full">
                            {icon}
                          </span>
                          <span className="hidden sm:inline">
                            {name}
                          </span>
                        </a>
                      ) : (
                        <button
                          onClick={onClick}
                          key={index}
                          className={commonClasses}
                          title={name}
                        >
                          <span className={`flex items-center justify-center w-full h-full ${isLangBtn ? "" : "sm:hidden"}`}>
                            {icon}
                          </span>
                          <span className={`hidden ${isLangBtn ? "" : "sm:inline"}`}>
                            {name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== RIGHT ===== */}
        <div ref={rightRef} className="xl:w-1/2 w-full z-30 xl:z-20 min-h-screen px-2 xl:px-0 xl:m-2 xl:pr-0.5">
          <div ref={rightAnimRef} className="relative bg-main-black rounded-[28px] overflow-hidden">
            {/* Contenido */}
            <div className="relative w-full text-main-white space-y-3 sm:space-y-4.5 bg-main-black">
              <WorkExperience introFinished={introFinished} />
              <HighlightedWork introFinished={introFinished} />
              <About />
              <Testimonials />
            </div>
          </div>
        </div>

        <div className="xl:h-screen"></div>
      </section>

      {/* ===== BOTTOM SPACER ===== */}
      <div
        id="Contact"
        className="h-screen relative w-full pointer-events-none"
      ></div>

      {/* ===== FIXED CONTACT (Revealed from behind) ===== */}
      {createPortal(
        <div className="fixed bottom-0 left-0 w-full h-dvh z-0 pointer-events-auto">
          <Contact />
        </div>,
        document.body
      )}
      {/* Botón de idioma desktop via Portal: el nodo DOM queda en document.body,
          completamente fuera del árbol con transforms, por lo que position:fixed
          siempre es relativo al viewport sin importar las animaciones. */}
      {createPortal(
        (() => {
          const langOption = options[options.length - 1];
          return (
            <button
              onClick={langOption.onClick}
              className="border-fade contact-item hidden sm:flex fixed bottom-6 left-6 z-[9999] items-center justify-center w-12 h-12 rounded-xl bg-main-black text-main-white text-sm font-thin hover:border-main-yellow/50 transition-colors cursor-pointer"
              title={langOption.name}
            >
              {langOption.icon}
            </button>
          );
        })(),
        document.body,
      )}
    </>
  );
};

export default Home;