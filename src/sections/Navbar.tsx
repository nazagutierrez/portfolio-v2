import GlassSurface from "@/components/GlassSurface";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import ScrollToPlugin from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

// const scrollToSection = (
//   e: React.MouseEvent<HTMLButtonElement>,
//   element: string
// ) => {
//   e.preventDefault();

//   const smoother = ScrollSmoother.get();
//   if (!smoother) return;

//   smoother.scrollTo(element, true, "top 1%");
// };

let scrollTween: gsap.core.Tween | null = null;

const scrollToSection = (
  e: React.MouseEvent<HTMLButtonElement>,
  element: string
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
  console.log(document.querySelector("#About"))
  return (
    <GlassSurface
      width={400}
      height={70}
      borderRadius={20}
      displace={2}
      distortionScale={-50}
      redOffset={0}
      greenOffset={10}
      blueOffset={20}
      brightness={50}
      opacity={0.93}
      mixBlendMode="screen"
    >
      <ul className="flex text-main-white gap-x-8 px-10">
        <button   
          onClick={(e) => {scrollToSection(e, "#Home")}}
          className="inline-block hover-underline text-lg cursor-pointer">
          Home
        </button>
        <button   
          onClick={(e) => {scrollToSection(e, "#About")}}
          className="inline-block hover-underline text-lg cursor-pointer">
          About
        </button>
        <button   
          onClick={(e) => {scrollToSection(e, "#Work")}}
          className="inline-block hover-underline text-lg cursor-pointer">
          Work
        </button>
        <button   
          onClick={(e) => {scrollToSection(e, "#Contact")}}
          className="inline-block hover-underline text-lg cursor-pointer">
          Contact
        </button>
      </ul>
    </GlassSurface>
  );
};

export default Navbar;
