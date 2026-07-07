import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import BlurText from "@/components/BlurText";
import { useTranslation } from "react-i18next";
import LogoLoop from "@/components/LogoLoop";
import { skillLogos } from "@/constants/skillLogos";
import nazaImg from "@/assets/people/naza.webp?url";
import LoaderSvg from "@/assets/svg/LoaderSvg";
import noiseImg from "@/assets/noise.png?url";
import ChocolateSvg from "@/assets/svg/ChocolateSvg";

const About = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const logoLoopRef = useRef<HTMLDivElement>(null);
  const floatTweenRef = useRef<gsap.core.Tween | null>(null);
  const [logoGap, setLogoGap] = useState(48);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setLogoGap(window.innerWidth < 640 ? 20 : 48);
    };
    handleResize(); // set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animación para el contenido de texto
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        opacity: 0,
        x: -50,
        duration: 1.2,
        delay: 0.2,
        ease: "power3.out",
      });

      // Animación para la imagen
      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        opacity: 0,
        x: 50,
        scale: 0.9,
        duration: 1.2,
        delay: 0.5,
        ease: "power3.out",
      });

      // Efecto sutil de flotación para la imagen
      floatTweenRef.current = gsap.to(imageRef.current, {
        y: 15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Animación para el último párrafo
      gsap.from(".about-last-text", {
        scrollTrigger: {
          trigger: ".about-last-text",
          start: "top 90%",
        },
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power2.out",
      });

      // Animación para el botón CTA
      gsap.from(".about-cta", {
        scrollTrigger: {
          trigger: ".about-cta",
          start: "top 95%",
        },
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.2,
        ease: "power2.out",
      });

      // Animación para el LogoLoop
      gsap.from(logoLoopRef.current, {
        scrollTrigger: {
          trigger: logoLoopRef.current,
          start: "top 95%",
        },
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="About"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-6 py-16 sm:px-5 sm:py-16 md:py-20 md:px-8 relative bg-linear-150 from-gr-from-black via-gr-via to-gr-to-yellow rounded-[28px] overflow-hidden z-90"
    >
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `url(${noiseImg})` }}></div>


      {/* Lado Izquierdo: Texto */}
      <div  className="w-full space-y-6 flex flex-col items-center sm:space-y-8">
        <h2 className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl italic font-light leading-tight text-center w-fit">
          <BlurText
            text={t("about.title")}
            delay={50}
            animateBy="letters"
            direction="bottom"
          />
        </h2>

        <div ref={contentRef} className="space-y-6 text-base sm:text-lg md:text-xl text-main-white/90 font-light leading-relaxed max-w-2xl text-center xl:text-start">
          <p>
            {t("about.p1")}
            <span className="text-main-yellow font-normal">{t("about.p1_highlight")}</span>{" "}
            {t("about.p1_2")}
          </p>
          <div className="flex-1 gap-5 xl:gap-10 xxl:gap-5 flex flex-col xxl:flex-row will-change-transform">
            <div className="flex gap-y-4 sm:gap-y-6 justify-center flex-col">
              <p>
                {t("about.p2")}
              </p>
              <p>
                {t("about.p2_2")}
                <span className="text-main-yellow font-normal"> {t("about.p2_tech")}</span>
              </p>
            </div>
            <div
              ref={imageRef}
              className="flex-1 flex will-change-transform justify-center items-center mt-6 xl:mt-0"
            >
              <div
                className="relative group"
                onMouseEnter={() => floatTweenRef.current?.pause()}
                onMouseLeave={() => floatTweenRef.current?.resume()}
              >
                {/* Decoración de fondo para la imagen */}
                <ChocolateSvg className="absolute rotate-20 top-90 md:block hidden group-hover:top-50 left-14 w-6 h-6 duration-700 transition-all" />
                <ChocolateSvg className="absolute -rotate-20 top-90 md:block hidden group-hover:top-63 left-6 w-6 h-6 duration-700 transition-all" />

                <ChocolateSvg className="absolute -rotate-20 top-90 md:block hidden group-hover:top-54 right-13 w-6 h-6 duration-700 transition-all" />
                <ChocolateSvg className="absolute rotate-20 top-90 md:block hidden group-hover:top-66 right-7 w-6 h-6 duration-700 transition-all" />

                <div className="relative flex items-center justify-center w-64 h-80 sm:w-72 sm:h-96 md:w-80 md:h-[480px] rounded-[24px] sm:rounded-[32px] overflow-hidden border-2 border-main-white/20 bg-main-black group-hover:bg-main-yellow/20 transition-colors duration-500 shadow-2xl">
                  {!isImageLoaded && <LoaderSvg className="absolute w-8 h-8 text-main-yellow animate-spin z-10" />}
                  <img
                    src={nazaImg}
                    alt="Nazareno Gutierrez"
                    loading="lazy"
                    width={320}
                    height={480}
                    onLoad={() => setIsImageLoaded(true)}
                    className={`w-full h-full object-cover hover:grayscale-0 transition-all duration-700 group-hover:scale-100 scale-105 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  />
                {/* Tag flotante */}
                <div className="absolute -bottom-10 group-hover:bottom-0 transition-all duration-300 bg-main-yellow/20 text-main-white px-4 py-2 sm:px-5 sm:py-0.5 rounded-xl sm:rounded-2xl text-xs rounded-b-none! border-2 border-b-0! border-main-yellow/30 sm:text-base shadow-xl backface-hidden transform-[translateZ(0)]">
                  {t("about.tag")}
                </div>
                </div>

              </div>
            </div>
          </div>

          <p className="about-last-text mt-12">
            {t("about.p3")}
            <span className="text-main-yellow font-normal"> {t("about.p3_highlight")} </span>
            {t("about.p3_2")}
            <span className="text-main-yellow font-normal"> {t("about.p3_highlight_2")}.</span>
          </p>
          <p className="about-last-text mt-6 text-sm text-main-white/70 italic">
              {t("about.p4")}
          </p>
        </div>

        <div 
          ref={logoLoopRef} 
          className="w-full max-w-2xl xl:max-w-3xl mb-8 opacity-80"
        >
          <LogoLoop 
            className="[mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)] pt-10"
            logos={skillLogos} 
            speed={40} 
            gap={logoGap} 
            logoHeight={32} 
            pauseOnHover={false}
          />
        </div>


      </div>
    </section>
  );
};

export default About;
