import BlurText from "@/components/BlurText";
import { Carousel } from "@/components/Carousel";
import LogoLoop from "@/components/LogoLoop";
import { logos } from "@/constants/logos";
import { raveDatesMedia, dymoMedia, freelanceMedia } from "@/constants/media";
import { useTranslation } from "react-i18next";

const HighlightedWork = () => {
  const { t } = useTranslation();

  return (
    <section id="Work" className="min-h-screen bg-linear-210 from-[#3a3202] via-[#120d0d] to-[#0d0d0d] rounded-[28px] overflow-hidden py-12 sm:py-20 relative">
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

      <p className="px-6 sm:px-10 md:px-20 text-base sm:text-lg md:text-xl max-w-[900px] mb-10 sm:mb-16 text-main-white font-thin text-center mx-auto">
        {t("highlighted_work.description")}
      </p>

      <div className="flex flex-col gap-y-10 sm:gap-y-16">
        <div className="px-4 sm:px-10 xl:px-0 flex relative w-full justify-center items-center">
          <img src="/logo-rave-dates.svg" alt="Rave Dates" className="xxl:block hidden w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain mr-5" />
          <Carousel logo="/logo-rave-dates.svg" title="Rave Dates" media={raveDatesMedia} borderColor="#9f3838" />
        </div>
        <div className="px-4 sm:px-10 xl:px-0 flex relative w-full justify-center items-center">
          <img src="/dymo-logo-small.png" alt="TPEOficial" className="xxl:block hidden w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain mr-5" />
          <Carousel logo="/dymo-logo-small.png" title="Dymo" media={dymoMedia} borderColor="#827f9b" />
        </div>
        <div className="px-4 sm:px-10 xl:px-0 flex relative w-full justify-center items-center">
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
