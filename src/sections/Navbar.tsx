import { useLayoutEffect, useRef } from "react";
import HandScrollSvg from "@/assets/svg/HandScrollSvg";
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

  let target: number | string = smoother.offset(element, "top 1%");

  if (element === "#Contact") {
    const st = ScrollTrigger.getById("contact-reveal");
    if (st) {
      target = st.end;
    } else {
      target = smoother.offset(element, "bottom bottom");
    }
  }

  scrollTween = gsap.to(smoother, {
    scrollTop: target,
    duration: 2,
    ease: "power2.out",
    overwrite: "auto",
  });
};

const Navbar = () => {
  const iconRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1 });
      tl.fromTo(
        iconRef.current,
        { y: 0, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
      )
        .to(
          iconRef.current,
          { y: -60, opacity: 0, duration: 1, ease: "power2.in" },
        )
        .to({}, { duration: 0.3 }); // Pausa al final
    }, iconRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed top-1/2 right-10 -translate-y-1/2 z-100">
      <div
        ref={iconRef}
        className="absolute -bottom-45 left-10 -translate-x-1/2 z-50 pointer-events-none"
      >
        <HandScrollSvg className="w-11 h-11 text-main-white/70 rotate-320" />
      </div>
      <GlassSurface
        width={80}
        height={390}
        borderRadius={20}
        displace={1}
        distortionScale={-250}
        redOffset={20}
        greenOffset={40}
        blueOffset={50}
        brightness={100}
        opacity={0.93}
        mixBlendMode="screen"
      >
        <ul className="flex w-full h-full flex-col text-center items-center justify-center gap-y-1 text-main-white px-10">
          <button
            onClick={(e) => { scrollToSection(e, "#Home") }}
            className="flex group flex-col -space-y-2.5 cursor-pointer"
          >
            <span className="group-hover:text-main-yellow group-hover:brightness-125 transition-all">H</span>
            <span>O</span>
            <span className="group-hover:text-main-yellow group-hover:brightness-125 transition-all">M</span>
            <span>E</span>
          </button>
          <button
            onClick={(e) => { scrollToSection(e, "#Work") }}
            className="flex group flex-col -space-y-2.5 cursor-pointer transition-all"
          >
            <span className="group-hover:text-main-yellow group-hover:brightness-125 transition-all">W</span>
            <span>O</span>
            <span className="group-hover:text-main-yellow group-hover:brightness-125 transition-all">R</span>
            <span>K</span>
          </button>
          <button
            onClick={(e) => { scrollToSection(e, "#About") }}
            className="flex group flex-col -space-y-2.5 cursor-pointer transition-all"
          >
            <span className="group-hover:text-main-yellow group-hover:brightness-125 transition-all">A</span>
            <span>B</span>
            <span className="group-hover:text-main-yellow group-hover:brightness-125 transition-all">O</span>
            <span>U</span>
            <span className="group-hover:text-main-yellow group-hover:brightness-125 transition-all">T</span>
          </button>
          <button
            onClick={(e) => { scrollToSection(e, "#Contact") }}
            className="flex group flex-col -space-y-2.5 cursor-pointer transition-all"
          >
            <span className="group-hover:text-main-yellow group-hover:brightness-125 transition-all">C</span>
            <span>O</span>
            <span className="group-hover:text-main-yellow group-hover:brightness-125 transition-all">N</span>
            <span>T</span>
            <span className="group-hover:text-main-yellow group-hover:brightness-125 transition-all">A</span>
            <span>C</span>
            <span className="group-hover:text-main-yellow group-hover:brightness-125 transition-all">T</span>
          </button>
        </ul>
      </GlassSurface>
    </div>
  );
};

export default Navbar;
