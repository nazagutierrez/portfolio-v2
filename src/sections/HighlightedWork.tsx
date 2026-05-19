import BlurText from "@/components/BlurText";
import { Carousel } from "@/components/Carousel";
import { useTranslation } from "react-i18next";

const HighlightedWork = () => {
  const { t } = useTranslation();

  return (
    <section id="Work" className="min-h-screen bg-linear-210 from-[#3a3202] via-[#120d0d] to-[#0d0d0d] rounded-[28px] overflow-hidden py-12 sm:py-20 relative">
      {/* Fondo */}
      <div className="absolute inset-0 opacity-30 bg-[url('/noise.png')]"></div>

      <h2 className="px-6 sm:px-10 md:px-20 text-5xl sm:text-6xl md:text-7xl italic mb-4 sm:mb-6">
        <BlurText
          text={t("highlighted_work.title")}
          delay={50}
          animateBy="letters"
          direction="bottom"
        />
      </h2>

      <p className="px-6 sm:px-10 md:px-20 text-base sm:text-lg md:text-xl max-w-[900px] mb-10 sm:mb-16 text-main-white font-thin">
        {t("highlighted_work.description")}
      </p>

      <div className="flex flex-col gap-y-10 sm:gap-y-16">
        <div className="ps-4 sm:ps-10 flex relative w-full justify-start items-center">
          <img src="/logo-piso-fuerte.png" alt="piso fuerte" className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 object-contain" />
          <Carousel />
        </div>
        <div className="ps-4 sm:ps-10 flex relative w-full justify-start items-center">
          <img src="/logo-piso-fuerte.png" alt="piso fuerte" className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 object-contain" />
          <Carousel />
        </div>
        <div className="ps-4 sm:ps-10 flex relative w-full justify-start items-center">
          <img src="/logo-piso-fuerte.png" alt="piso fuerte" className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 object-contain" />
          <Carousel />
        </div>
      </div>
    </section>
  );
};

export default HighlightedWork;
