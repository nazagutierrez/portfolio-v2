import { useState, useRef, useLayoutEffect } from "react";
import GlassSurface from "@/components/GlassSurface";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

let scrollTween: gsap.core.Tween | null = null;

const scrollToSection = (
  e: React.MouseEvent<HTMLButtonElement>,
  element: string,
) => {
  e.preventDefault();

  const smoother = ScrollSmoother.get();
  if (!smoother) return;

  // matar animación anterior
  scrollTween?.kill();

  // Para Contact (última sección con reveal animation), scrollear al final
  // de la página, ya que smoother.offset calcula mal por el yPercent transform.
  const target =
    element === "#Contact"
      ? document.documentElement.scrollHeight
      : smoother.offset(element, "top 1%");

  scrollTween = gsap.to(window, {
    scrollTo: { y: target, autoKill: false },
    duration: 2,
    ease: "power2.out",
    overwrite: true,
  });
};

const Navbar = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isInitialRender = useRef(true);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    if (!menuRef.current) return;
    const ctx = gsap.context(() => {
      tl.current = gsap.timeline({ paused: true });
      
      tl.current.to(menuRef.current, { autoAlpha: 1, duration: 0.4, ease: "power2.out" })
                .fromTo(".mobile-link", 
                  { y: 30, opacity: 0 }, 
                  { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: "power2.out" },
                  "-=0.2"
                );
    }, menuRef);
    
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    if (isOpen) {
      tl.current?.play();
      document.body.style.overflow = "hidden";
      ScrollSmoother.get()?.paused(true);
    } else {
      tl.current?.reverse();
      document.body.style.overflow = "";
      ScrollSmoother.get()?.paused(false);
    }

    return () => {
      document.body.style.overflow = "";
      ScrollSmoother.get()?.paused(false);
    };
  }, [isOpen]);

  const handleMobileClick = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    setIsOpen(false);
    setTimeout(() => {
      scrollToSection(e, id);
    }, 100);
  };

  return (
    <>
      {/* DESKTOP NAVBAR (hidden on xs/sm, visible on md+) */}
      <nav className="hidden md:block fixed top-5 right-1/2 translate-x-1/2 text-main-white z-90">
        <GlassSurface
          width={""}
          height={60}
          borderRadius={20}
          displace={1}
          distortionScale={-50}
          redOffset={20}
          greenOffset={40}
          blueOffset={50}
          brightness={50}
          opacity={0.33}
          mixBlendMode="screen"
        >
          <ul className="flex gap-x-3 px-2">
            <li>
              <button
              className="cursor-pointer hover:text-main-yellow transition-all p-2"
              onClick={(e) => scrollToSection(e, "#Home")}
            >
              {t("nav.home", "Inicio")}
            </button>
            </li>
            <li>
              <button
              className={`block xl:hidden cursor-pointer hover:text-main-yellow transition-all p-2`}
              onClick={(e) => scrollToSection(e, "#Work")}
            >
              {t("nav.work", "Trabajo")}
            </button>
            </li>
            <li>
              <button
              className="cursor-pointer hover:text-main-yellow transition-all p-2"
              onClick={(e) => scrollToSection(e, "#Showcase")}
            >
              {t("nav.showcase", "Showcase")}
            </button>
            </li>
            <li>
              <button
              className="cursor-pointer hover:text-main-yellow transition-all p-2"
              onClick={(e) => scrollToSection(e, "#About")}
            >
              {t("nav.about", "Bio")}
            </button>
            </li>
            <li>
              <button
              className="cursor-pointer hover:text-main-yellow transition-all p-2"
              onClick={(e) => scrollToSection(e, "#Testimonials")}
            >
              {t("nav.testimonials", "Testimonios")}
            </button>
            </li>
            <li>
              <button
              className="cursor-pointer hover:text-main-yellow transition-all p-2"
              onClick={(e) => scrollToSection(e, "#Contact")}
            >
              {t("nav.contact", "Contacto")}
            </button>
            </li>
          </ul>
        </GlassSurface>
      </nav>

      {/* MOBILE NAVBAR TOGGLE (visible on xs/sm, hidden on md+) */}
      <div className="md:hidden fixed top-5 right-5 z-[100]">
        <GlassSurface
          width={54}
          height={54}
          borderRadius={27}
          displace={1}
          distortionScale={-50}
          redOffset={20}
          greenOffset={40}
          blueOffset={50}
          brightness={50}
          opacity={0.33}
          mixBlendMode="screen"
        >
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="w-full h-full absolute inset-0 flex items-center justify-center text-main-white z-20 cursor-pointer"
            aria-label="Toggle Menu"
          >
             <div className="flex flex-col justify-center items-center gap-[5px] w-6 h-6">
               <span className={`block w-6 h-[2px] bg-main-white transition-all duration-300 origin-center ${isOpen ? "rotate-45 translate-y-[7px]" : ""}`}></span>
               <span className={`block w-6 h-[2px] bg-main-white transition-all duration-300 origin-center ${isOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"}`}></span>
               <span className={`block w-6 h-[2px] bg-main-white transition-all duration-300 origin-center ${isOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}></span>
             </div>
          </button>
        </GlassSurface>
      </div>

      {/* MOBILE FULLSCREEN MENU OVERLAY */}
      <div 
        ref={menuRef} 
        className="md:hidden fixed inset-0 uppercase z-[95] bg-[#0c0c0c]/70 backdrop-blur-xl flex flex-col items-center justify-center invisible opacity-0"
      >
        <ul className="flex flex-col items-end w-full px-2 gap-y-10 text-3xl text-main-white text-right tracking-wide">
          <button className="mobile-link group cursor-pointer hover:text-main-yellow transition-colors flex items-start" onClick={(e) => handleMobileClick(e, "#Home")}>
            {t("nav-mobile.home", "Inicio")}
            <span className="text-sm font-light text-main-yellow relative -top-2 ml-1">01</span>
          </button>
          <button className="mobile-link group cursor-pointer hover:text-main-yellow transition-colors flex items-start" onClick={(e) => handleMobileClick(e, "#Work")}>
            {t("nav-mobile.work", "Trabajo")}
            <span className="text-sm font-light text-main-yellow relative -top-2 ml-1">02</span>
          </button>
          <button className="mobile-link group cursor-pointer hover:text-main-yellow transition-colors flex items-start" onClick={(e) => handleMobileClick(e, "#Showcase")}>
            {t("nav-mobile.showcase", "Showcase")}
            <span className="text-sm font-light text-main-yellow relative -top-2 ml-1">03</span>
          </button>
          <button className="mobile-link group cursor-pointer hover:text-main-yellow transition-colors flex items-start" onClick={(e) => handleMobileClick(e, "#About")}>
            {t("nav-mobile.about", "Bio")}
            <span className="text-sm font-light text-main-yellow relative -top-2 ml-1">05</span>
          </button>
          <button className="mobile-link group cursor-pointer hover:text-main-yellow transition-colors flex items-start" onClick={(e) => handleMobileClick(e, "#Testimonials")}>
            {t("nav-mobile.testimonials", "Testimonios")}
            <span className="text-sm font-light text-main-yellow relative -top-2 ml-1">04</span>
          </button>
          <button className="mobile-link group cursor-pointer hover:text-main-yellow transition-colors flex items-start" onClick={(e) => handleMobileClick(e, "#Contact")}>
            {t("nav-mobile.contact", "Contacto")}
            <span className="text-sm font-light text-main-yellow relative -top-2 ml-1">06</span>
          </button>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
