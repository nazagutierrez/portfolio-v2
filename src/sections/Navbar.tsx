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
  return (
    <nav className="fixed top-5 right-1/2 translate-x-1/2 text-main-white z-90">
      <GlassSurface
        width={390}
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
        <ul className="flex gap-x-3">
          <button
            className="cursor-pointer hover:text-main-yellow transition-all p-2"
            onClick={(e) => scrollToSection(e, "#Home")}
          >
            Home
          </button>
          <button
            className="cursor-pointer hover:text-main-yellow transition-all p-2"
            onClick={(e) => scrollToSection(e, "#Work")}
          >
            Work
          </button>
          <button
            className="cursor-pointer hover:text-main-yellow transition-all p-2"
            onClick={(e) => scrollToSection(e, "#About")}
          >
            About
          </button>
          <button
            className="cursor-pointer hover:text-main-yellow transition-all p-2"
            onClick={(e) => scrollToSection(e, "#Contact")}
          >
            Contact
          </button>
        </ul>
      </GlassSurface>
    </nav>
  );
};

export default Navbar;
