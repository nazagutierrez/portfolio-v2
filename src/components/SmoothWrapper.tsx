import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function SmoothWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.5,
      effects: true,
      smoothTouch: 0.1,
    });

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

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        {children}
      </div>
    </div>
  );
}
