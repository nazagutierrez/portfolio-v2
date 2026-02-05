import GlassSurface from "@/components/GlassSurface";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import ScrollToPlugin from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

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

  scrollTween = gsap.to(smoother, {
    scrollTop: target,
    duration: 2,
    ease: "power2.out", // NADA de expo / elastic
    overwrite: "auto",
  });
};

const Navbar = () => {
  return (
    <div className="fixed top-1/2 right-10 -translate-y-1/2 z-100">
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
            className="flex flex-col -space-y-2.5"
          >
            <span>H</span>
            <span>O</span>
            <span>M</span>
            <span>E</span>
          </button>
          <button
            onClick={(e) => { scrollToSection(e, "#About") }}
            className="flex flex-col -space-y-2.5"
          >
            <span>A</span>
            <span>B</span>
            <span>O</span>
            <span>U</span>
            <span>T</span>
          </button>
          <button
            onClick={(e) => { scrollToSection(e, "#Work") }}
            className="flex flex-col -space-y-2.5"
          >
            <span>W</span>
            <span>O</span>
            <span>R</span>
            <span>K</span>
          </button>
          <button
            onClick={(e) => { scrollToSection(e, "#Contact") }}
            className="flex flex-col -space-y-2.5"
          >
            <span>C</span>
            <span>O</span>
            <span>N</span>
            <span>T</span>
            <span>A</span>
            <span>C</span>
            <span>T</span>
          </button>
        </ul>
      </GlassSurface>
    </div>
  );
};

export default Navbar;
