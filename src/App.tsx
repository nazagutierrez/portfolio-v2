import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useLayoutEffect, useRef } from "react";
import Home from "./sections/Home";
import LanguageWrapper from "./components/LanguageWrapper";


import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import Navbar from "./sections/Navbar";

import HandScrollSvg from "./assets/svg/HandScrollSvg";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function App() {
  useEffect(() => {
    ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.5,
      effects: true,
      smoothTouch: 0.1,
    });
  }, []);

  
useEffect(() => {
  const stopScrollTween = () => {
    const smoother = ScrollSmoother.get();
    if (!smoother) return;

    gsap.killTweensOf(smoother);
  };

  window.addEventListener("wheel", stopScrollTween, { passive: true });
  window.addEventListener("touchstart", stopScrollTween, { passive: true });

  return () => {
    window.removeEventListener("wheel", stopScrollTween);
    window.removeEventListener("touchstart", stopScrollTween);
  };
}, []);

  const iconRef = useRef<SVGSVGElement>(null);
  const iconContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1 });
      tl.fromTo(
        iconRef.current,
        { y: 0, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
      )
        .to(iconRef.current, {
          y: -60,
          opacity: 0,
          duration: 1,
          ease: "power2.in",
        })
        .to({}, { duration: 0.3 }); // Pausa al final

      ScrollTrigger.create({
        trigger: document.body,
        start: "bottom 110%", // Se activa un poco antes de llegar al final absoluto
        onEnter: () => gsap.to(iconContainerRef.current, { opacity: 0, duration: 0.3, ease: "power2.out" }),
        onLeaveBack: () => gsap.to(iconContainerRef.current, { opacity: 1, duration: 0.3, ease: "power2.in" }),
      });
    });

    return () => ctx.revert();
  }, []);


  return (
    <Router>
      {/* ⚠️ Cursor SIEMPRE fuera del wrapper */}
      {/* <CustomCursor /> */}
      {/* Navbar */}
      <Navbar />
      <div
        ref={iconContainerRef}
        className="fixed bottom-10 right-10 -translate-x-1/2 z-50 pointer-events-none transition-opacity duration-300"
      >
        <HandScrollSvg ref={iconRef} className="w-11 h-11 text-main-white/70 rotate-320" />
      </div>

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="min-h-screen flex flex-col">
            <main className="flex-grow">
              <Routes>
                {/* Ruta principal (Raíz = Español por defecto) */}
                <Route 
                  path="/" 
                  element={<LanguageWrapper defaultLang="es"><Home /></LanguageWrapper>} 
                />

                {/* Rutas para otros idiomas (/en, etc) */}
                <Route path="/:lang" element={<LanguageWrapper />}>
                  <Route index element={<Home />} />
                  {/* Aquí agregarías más rutas en el futuro, ej: <Route path="portfolio" element={<Portfolio/>} /> */}
                </Route>
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
