import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Componente para solucionar el problema de scroll al cambiar de ruta
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const smoother = ScrollSmoother.get();
    if (!smoother) return;

    requestAnimationFrame(() => {
      smoother.scrollTo(0, true);
      ScrollTrigger.refresh();
    });
  }, [pathname]);

  return null;
}
