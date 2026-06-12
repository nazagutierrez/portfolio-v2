import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import BlurText from "@/components/BlurText";
import { Carousel } from "@/components/Carousel";
import LogoLoop from "@/components/LogoLoop";
import { logos } from "@/constants/logos";
import { raveDatesMedia, dymoMedia, freelanceMedia } from "@/constants/media";
import { useTranslation } from "react-i18next";
import { ScrollTrigger } from "gsap/all";
import logoRaveDates from "@/assets/logos/logo-rave-dates.webp";
import logoDymo from "@/assets/logos/dymo-logo-small.webp";
import logoPisoFuerte from "@/assets/logos/logo-piso-fuerte-small.webp";
import noiseImg from "@/assets/noise.webp";
import LoaderSvg from "@/assets/svg/LoaderSvg";

function HighlightedImage({ src, alt, className }: { src: string, alt: string, className: string }) {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {!isLoaded && <LoaderSvg className="absolute w-6 h-6 text-white/50 animate-spin z-10" />}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-contain transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
}

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
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `url(${noiseImg})` }}></div>

      <h2 className="px-6 sm:px-10 md:px-20 text-center text-5xl sm:text-6xl md:text-7xl italic mb-4 sm:mb-6">
        <BlurText
        className="justify-self-center justify-center"
          text={t("highlighted_work.title")}
          delay={50}
          animateBy="letters"
          direction="bottom"
        />
      </h2>

      <p className="highlighted-desc px-6 sm:px-10 md:px-20 text-base sm:text-lg md:text-xl max-w-[900px] mb-10 sm:mb-16 text-main-white font-thin text-center mx-auto">
        {t("highlighted_work.description")}
      </p>

      <div className="flex flex-col gap-y-10 sm:gap-y-16">
        <div className="highlighted-item px-4 sm:px-10 xl:px-0 flex relative w-full justify-center items-center">
          <HighlightedImage src={logoRaveDates} alt="Rave Dates" className="xxl:block hidden w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mr-5" />
          <Carousel logo={logoRaveDates} title="Rave Dates" media={raveDatesMedia} borderColor="#9f3838" href="ravedates.proxising.com" />
        </div>
        <div className="highlighted-item px-4 sm:px-10 xl:px-0 flex relative w-full justify-center items-center">
          <HighlightedImage src={logoDymo} alt="TPEOficial" className="xxl:block hidden w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mr-5" />
          <Carousel logo={logoDymo} title="Dymo" media={dymoMedia} borderColor="#827f9b" href="dymo.tpeoficial.com" />
        </div>
        <div className="highlighted-item px-4 sm:px-10 xl:px-0 flex relative w-full justify-center items-center">
          <LogoLoop
            className="xxl:block! hidden! h-8 sm:h-20! mr-5 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]"
            logos={[ 
              ...logos,
              { src: logoPisoFuerte, alt: "Piso Fuerte" }
            ]}
            speed={40}
            direction="up"
            logoHeight={80}
            gap={5}
            pauseOnHover={false}
          />
          <Carousel logo={logoPisoFuerte} title="Freelance Projects" media={freelanceMedia} borderColor="#a5913b" href="www.pisofuerte.com.ar" />
        </div>
      </div>
    </section>
  );
};

export default HighlightedWork;
