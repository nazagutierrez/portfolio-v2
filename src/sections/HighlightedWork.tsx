import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import BlurText from "@/components/BlurText";
import { Carousel } from "@/components/Carousel";
import LogoLoop from "@/components/LogoLoop";
import { logos } from "@/constants/logos";
import { raveDatesMedia, dymoMedia, freelanceMedia } from "@/constants/media";
import { useTranslation } from "react-i18next";
import { ScrollTrigger } from "gsap/all";

const HighlightedWork = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".highlighted-desc", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        opacity: 0,
        filter: "blur(10px)",
        y: 20,
        duration: 1,
        ease: "power2.out",
      });

      gsap.set(".highlighted-item", { opacity: 0 });
      ScrollTrigger.batch(".highlighted-item", {
        start: "top 85%",
        onEnter: (batch) => {
          gsap.fromTo(batch, {
            opacity: 0,
            y: 40,
            filter: "blur(10px)",
          }, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.1,
          });
        },
        once: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="Showcase" className="min-h-screen bg-linear-210 from-[#3a3202] via-[#120d0d] to-[#0d0d0d] rounded-[28px] overflow-hidden py-16 sm:pt-20 sm:pb-28 relative">
      {/* Fondo */}
      <div className="absolute inset-0 opacity-30 bg-[url('/noise.png')]"></div>

      <h2 className="px-6 sm:px-10 md:px-20 text-center text-5xl sm:text-6xl md:text-7xl italic mb-4 sm:mb-6">
        <BlurText
        className="justify-self-center justify-center"
          text={t("highlighted_work.title")}
          delay={50}
          animateBy="words"
          direction="bottom"
        />
      </h2>

      <p className="highlighted-desc px-6 sm:px-10 md:px-20 text-base sm:text-lg md:text-xl max-w-[900px] mb-10 sm:mb-16 text-main-white font-thin text-center mx-auto">
        {t("highlighted_work.description")}
      </p>

      <div className="flex flex-col gap-y-10 sm:gap-y-16">
        <div className="highlighted-item px-4 sm:px-10 xl:px-0 flex relative w-full justify-center items-center">
          <img src="/logo-rave-dates.svg" alt="Rave Dates" className="xxl:block hidden w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain mr-5" />
          <Carousel logo="/logo-rave-dates.svg" title="Rave Dates" media={raveDatesMedia} borderColor="#9f3838" />
        </div>
        <div className="highlighted-item px-4 sm:px-10 xl:px-0 flex relative w-full justify-center items-center">
          <img src="/dymo-logo-small.png" alt="TPEOficial" className="xxl:block hidden w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain mr-5" />
          <Carousel logo="/dymo-logo-small.png" title="Dymo" media={dymoMedia} borderColor="#827f9b" />
        </div>
        <div className="highlighted-item px-4 sm:px-10 xl:px-0 flex relative w-full justify-center items-center">
          <LogoLoop
            className="xxl:block! hidden! h-8 sm:h-20! mr-5 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]"
            logos={[ 
              ...logos,
              { src: "/logo-piso-fuerte-small.png", alt: "Piso Fuerte" }
            ]}
            speed={40}
            direction="up"
            logoHeight={80}
            gap={5}
            hoverSpeed={0}
          />
          <Carousel logo="/logo-piso-fuerte-small.png" title="Freelance Projects" media={freelanceMedia} borderColor="#a5913b" />
        </div>
      </div>
    </section>
  );
};

export default HighlightedWork;
