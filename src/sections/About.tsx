import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import BlurText from "@/components/BlurText";

const About = () => {
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
      className="min-h-screen flex items-center p-10 md:p-20 relative  bg-linear-0 from-[#2b2401] via-[#120d0d] to-[#0d0d0d] rounded-[28px] overflow-hidden "
    >
      {/* Fondo con Silk */}
      <div className="absolute inset-0 opacity-30 bg-[url('/noise.png')]"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* Lado Izquierdo: Texto */}
        <div ref={contentRef} className="flex-1 space-y-8">
          <h2 className="text-6xl md:text-8xl italic font-light leading-tight">
            <BlurText
              text="Sobre mí"
              delay={50}
              animateBy="letters"
              direction="bottom"
            />
          </h2>
          
          <div className="space-y-6 text-lg md:text-xl text-main-white/90 font-light leading-relaxed max-w-2xl">
            <p>
              Soy un desarrollador <span className="text-main-yellow font-normal">Frontend SSR</span> apasionado por crear experiencias digitales que no solo funcionen a la perfección, sino que también cautiven visualmente.
            </p>
            <p>
              Mi enfoque se centra en la intersección del diseño y la ingeniería. Creo firmemente que la <span className="italic">performance</span> y la <span className="italic">estética</span> deben ir de la mano para lograr productos excepcionales.
            </p>
            <p>
              Con años de experiencia en el ecosistema de <span className="text-main-yellow font-normal">React</span>, me especializo en construir interfaces dinámicas, animaciones fluidas y arquitecturas escalables que elevan la propuesta de valor de cada proyecto.
            </p>
          </div>

          <div className="pt-4">
            <div className="inline-block px-6 py-3 border border-main-yellow/30 rounded-full text-main-yellow hover:bg-main-yellow hover:text-main-black transition-colors duration-300 cursor-pointer">
              Descargar CV
            </div>
          </div>
        </div>

        {/* Lado Derecho: Imagen */}
        <div ref={imageRef} className="flex-1 flex will-change-transform justify-center lg:justify-end">
          <div className="relative group">
            {/* Decoración de fondo para la imagen */}
            <div className="absolute -inset-4 border border-main-yellow/30 rounded-[40px] rotate-3 group-hover:rotate-0 transition-transform duration-500"></div>
            <div className="absolute -inset-4 border border-main-white/20 rounded-[40px] -rotate-3 group-hover:rotate-0 transition-transform duration-500"></div>
            
            <div className="relative w-72 h-96 md:w-80 md:h-[480px] rounded-[32px] overflow-hidden border border-main-white/20 bg-main-black group-hover:bg-main-yellow/60 transition-colors duration-500  shadow-2xl">
              <img 
                src="/naza.png" 
                alt="Nazareno Gutierrez" 
                className="w-full h-full object-cover hover:grayscale-0 transition-all duration-700 group-hover:scale-100 scale-105"
              />
            </div>
            
            {/* Tag flotante */}
            <div className="absolute -bottom-6 -right-6 bg-main-yellow text-main-black px-6 py-3 rounded-2xl font-bold shadow-xl rotate-6 group-hover:rotate-0 transition-transform duration-300">
              Frontend Dev
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
