import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import BlurText from "@/components/BlurText";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animación para el contenido de texto
      gsap.from(contentRef.current, {
        opacity: 0,
        x: -50,
        filter: "blur(10px)",
        duration: 1.2,
        delay: 0.5,
        ease: "power3.out",
      });

      // Animación para la imagen
      gsap.from(imageRef.current, {
        opacity: 0,
        x: 50,
        scale: 0.9,
        filter: "blur(10px)",
        duration: 1.2,
        delay: 0.8,
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="About"
      ref={sectionRef}
      className="min-h-screen flex items-center mb-2 p-6 sm:p-10 md:p-20 relative bg-linear-0 from-[#2b2401] via-[#120d0d] to-[#0d0d0d] rounded-[28px] overflow-hidden z-90"
    >
      {/* Fondo con Silk */}
      <div className="absolute inset-0 opacity-30 bg-[url('/noise.png')]"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Lado Izquierdo: Texto */}
        <div ref={contentRef} className="flex-1 space-y-6 sm:space-y-8">
          <h2 className="text-5xl md:text-8xl italic font-light leading-tight xl:text-center xl:w-fit xl:mx-auto">
            <BlurText
              text={t("about.title")}
              delay={50}
              animateBy="letters"
              direction="bottom"
            />
          </h2>

          <div className="space-y-6 text-base sm:text-lg md:text-xl text-main-white/90 font-light leading-relaxed max-w-2xl text-start xl:mx-auto">
            <p>
              {t("about.p1")}
              <span className="text-main-yellow font-normal">{t("about.p1_highlight")}</span>{" "}
              {t("about.p1_2")}
            </p>
            <div className="flex-1 gap-8 sm:gap-5 flex flex-col xl:flex-row will-change-transform justify-center xl:justify-center xl:items-center">
              <div className="flex gap-y-4 sm:gap-y-2 justify-center flex-col">
                <p>
                  {t("about.p2")}
                  <span className="italic">{t("about.p2_highlight1")}</span>
                  {t("about.p2_2")}
                  <span className="italic">{t("about.p2_highlight2")}</span>
                  {t("about.p2_3")}
                </p>
                <p>
                  {t("about.p2")}
                  <span className="italic">{t("about.p2_highlight1")}</span>
                  {t("about.p2_2")}
                  <span className="italic">{t("about.p2_highlight2")}</span>
                  {t("about.p2_3")}
                </p>
              </div>
              <div
                ref={imageRef}
                className="flex-1 gap-5 flex will-change-transform justify-center xl:justify-center mt-6 xl:mt-0"
              >
                <div className="relative group mx-auto">
                  {/* Decoración de fondo para la imagen */}
                  <div className="absolute -inset-2 sm:-inset-4 border border-main-yellow/30 rounded-[30px] sm:rounded-[40px] rotate-3 group-hover:rotate-0 transition-transform duration-500"></div>
                  <div className="absolute -inset-2 sm:-inset-4 border border-main-white/20 rounded-[30px] sm:rounded-[40px] -rotate-3 group-hover:rotate-0 transition-transform duration-500"></div>

                  <div className="relative w-64 h-80 sm:w-72 sm:h-96 md:w-80 md:h-[480px] rounded-[24px] sm:rounded-[32px] overflow-hidden border border-main-white/20 bg-main-black group-hover:bg-main-yellow/60 transition-colors duration-500 shadow-2xl">
                    <img
                      src="/naza.png"
                      alt="Nazareno Gutierrez"
                      className="w-full h-full object-cover hover:grayscale-0 transition-all duration-700 group-hover:scale-100 scale-105"
                    />
                  </div>

                  {/* Tag flotante */}
                  <div className="absolute -bottom-4 -right-2 sm:-bottom-6 sm:-right-6 bg-main-yellow text-main-black px-4 py-2 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl text-sm sm:text-base font-bold shadow-xl rotate-6 group-hover:rotate-0 transition-transform duration-300">
                    {t("about.tag")}
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-12">
              {t("about.p3")}
              <span className="text-main-yellow font-normal">{t("about.p3_highlight")}</span>
              {t("about.p3_2")}
            </p>
          </div>

          <div className="pt-4 xl:text-center">
            <div className="inline-block px-6 py-3 border border-main-yellow/30 rounded-full text-main-yellow hover:bg-main-yellow hover:text-main-black transition-colors duration-300 cursor-pointer">
              {t("about.btn_cv")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
