import GlassSurface from "@/components/GlassSurface";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import ScrollToPlugin from "gsap/ScrollToPlugin";

import { ScrollTrigger } from "gsap/ScrollTrigger";

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

  const target = smoother.offset(element, "top 1%");

  // The recommended way to scroll with ScrollSmoother is to use the ScrollToPlugin
  // on the window object. ScrollSmoother will automatically intercept and smooth it.
  scrollTween = gsap.to(window, {
    scrollTo: { y: target, autoKill: true },
    duration: 2,
    ease: "power2.out",
    overwrite: true,
  });
};

import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleLanguage = () => {
    const isEs = i18n.language === "es";
    let newPath = location.pathname;

    if (isEs) {
      // Estamos en español (ej. /, /about), vamos a inglés (/en, /en/about)
      newPath = `/en${newPath === '/' ? '' : newPath}`;
    } else {
      // Estamos en inglés (ej. /en, /en/about), vamos a español (/, /about)
      newPath = newPath.replace(/^\/en/, '') || '/';
    }

    navigate(newPath);
  };

  return (
    <nav className="fixed top-5 right-1/2 translate-x-1/2 text-main-white z-90">
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
        <ul className="flex gap-x-3 xs:px-2">
          <button
            className="cursor-pointer hover:text-main-yellow transition-all p-2"
            onClick={(e) => scrollToSection(e, "#Home")}
          >
            {t("nav.home", "Home")}
          </button>
          <button
            className="cursor-pointer hover:text-main-yellow transition-all p-2"
            onClick={(e) => scrollToSection(e, "#Work")}
          >
            {t("nav.work", "Work")}
          </button>
          <button
            className="cursor-pointer hover:text-main-yellow transition-all p-2"
            onClick={(e) => scrollToSection(e, "#About")}
          >
            {t("nav.about", "About")}
          </button>
          <button
            className="cursor-pointer hover:text-main-yellow transition-all p-2"
            onClick={(e) => scrollToSection(e, "#Contact")}
          >
            {t("nav.contact", "Contact")}
          </button>
          
          <div className="w-px bg-main-white/20 my-2 mx-1"></div>
          
          <button
            onClick={toggleLanguage}
            className="cursor-pointer font-bold hover:text-main-yellow transition-all p-2 uppercase"
          >
            {i18n.language}
          </button>
        </ul>
      </GlassSurface>
    </nav>
  );
};

export default Navbar;
