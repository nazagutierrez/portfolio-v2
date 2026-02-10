import BlurText from "@/components/BlurText";
import { SilkFallback, SilkReveal } from "@/components/SilkReveal";
import Silk from "@/components/Silk";
import { Carousel } from "@/components/Carousel";

const HighlightedWork = () => {
  return (
    <section id="Work" className="min-h-screen mb-2 py-20 relative">
      {/* Fondo */}
      <div className="absolute rounded-[28px] overflow-hidden inset-0 -z-30">
        <SilkReveal>
          {(onReady: () => void) => (
            <>
              <SilkFallback />
              <Silk 
                color="#4b4b4b"         
                onReady={onReady} 
              />
            </>
          )}
        </SilkReveal>
      </div>

      <h2 className="ps-20 text-7xl italic mb-6">
        <BlurText
          text="Trabajo destacado"
          delay={50}
          animateBy="letters"
          direction="bottom"
        />
      </h2>

      <p className="ps-20 text-xl max-w-[700px] mb-16 text-main-white font-thin">
        Experiencia profesional y proyectos donde construí interfaces modernas,
        funcionales y estéticas.
      </p>

      <div className="flex flex-col gap-y-16">
        <div className="ps-10 flex relative w-full justify-start items-center">
          <img src="/logo-piso-fuerte.png" alt="piso fuerte" className=" w-32 h-32" />
          <Carousel />
        </div>
        <div className="ps-10 flex relative w-full justify-start items-center">
          <img src="/logo-piso-fuerte.png" alt="piso fuerte" className=" w-32 h-32" />
          <Carousel />
        </div>
        <div className="ps-10 flex relative w-full justify-start items-center">
          <img src="/logo-piso-fuerte.png" alt="piso fuerte" className=" w-32 h-32" />
          <Carousel />
        </div>
      </div>
    </section>
  );
};

export default HighlightedWork;
