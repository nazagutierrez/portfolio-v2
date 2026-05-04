import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useLayoutEffect, useRef } from "react";
import Home from "./sections/Home";
import CustomCursor from "./components/CustomCursor";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import Navbar from "./sections/Navbar";
import GlassSurface from "./components/GlassSurface";
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

  const iconRef = useRef<HTMLDivElement>(null);

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
    }, iconRef);

    return () => ctx.revert();
  }, []);


  return (
    <Router>
      {/* ⚠️ Cursor SIEMPRE fuera del wrapper */}
      {/* <CustomCursor /> */}
      {/* Navbar */}
      <Navbar />
      <div
        ref={iconRef}
        className="fixed bottom-10 right-10 -translate-x-1/2 z-50 pointer-events-none"
      >
        <HandScrollSvg className="w-11 h-11 text-main-white/70 rotate-320" />
      </div>

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="min-h-screen flex flex-col">
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
