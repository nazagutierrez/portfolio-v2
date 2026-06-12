import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import BlurText from "@/components/BlurText";
import { useTranslation } from "react-i18next";
import LogoLoop from "@/components/LogoLoop";
import { skillLogos } from "@/constants/skillLogos";
import nazaImg from "@/assets/people/naza.webp";
import noiseImg from "@/assets/noise.webp";
import LoaderSvg from "@/assets/svg/LoaderSvg";

const About = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const logoLoopRef = useRef<HTMLDivElement>(null);
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
        filter: "blur(10px)",
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
        filter: "blur(10px)",
        duration: 1.2,
        delay: 0.5,
        ease: "power3.out",
      });

      // Efecto sutil de flotación para la imagen
      gsap.to(imageRef.current, {
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
        filter: "blur(8px)",
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
        filter: "blur(6px)",
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
        filter: "blur(8px)",
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
      className="min-h-screen flex items-center justify-center px-6 py-16 sm:px-5 sm:py-16 md:py-20 md:px-8 relative bg-linear-150 from-[#0d0d0d] via-[#120d0d] to-[#3a3202] rounded-[28px] overflow-hidden z-90"
    >
      {/* Fondo con Silk */}
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
            <div className="flex gap-y-4 sm:gap-y-2 justify-center flex-col">
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
              <div className="relative group">
                {/* Decoración de fondo para la imagen */}
                <div className="absolute -inset-2 sm:-inset-4 border border-main-yellow/30 rounded-[30px] sm:rounded-[40px] rotate-3 group-hover:rotate-0 transition-transform duration-500"></div>
                <div className="absolute -inset-2 sm:-inset-4 border border-main-white/20 rounded-[30px] sm:rounded-[40px] -rotate-3 group-hover:rotate-0 transition-transform duration-500"></div>

                <div className="relative flex items-center justify-center w-64 h-80 sm:w-72 sm:h-96 md:w-80 md:h-[480px] rounded-[24px] sm:rounded-[32px] overflow-hidden border border-main-white/20 bg-main-black group-hover:bg-main-yellow/60 transition-colors duration-500 shadow-2xl">
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
                </div>

                {/* Tag flotante */}
                <div className="absolute -bottom-4 -right-2 sm:-bottom-6 sm:-right-6 bg-main-yellow text-main-black px-4 py-2 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl text-sm sm:text-base font-bold shadow-xl rotate-6 group-hover:rotate-0 transition-transform duration-300">
                  {t("about.tag")}
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
