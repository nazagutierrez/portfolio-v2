import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import BlurText from "@/components/BlurText";
import { SilkFallback, SilkReveal } from "@/components/SilkReveal";
import Silk from "@/components/Silk";
import GithubSvg from "@/assets/svg/GithubSvg";
import LinkedinSvg from "@/assets/svg/LinkedinSvg";
import WhatsappSvg from "@/assets/svg/WhatsappSvg";
import ResumeSvg from "@/assets/svg/ResumeSvg";

const Contact = ({
  size,
}: {
  size?: number;
}) => {
  const SIZE = size || 1000;
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/nazarenojunin",
      icon: <LinkedinSvg className="w-7 h-7" />,
    },
    {
      name: "GitHub",
      href: "https://github.com/nazarenojunin",
      icon: <GithubSvg className="w-7 h-7" />,
    },
    {
      name: "WhatsApp",
      href: "https://api.whatsapp.com/send?phone=542364329720",
      icon: <WhatsappSvg className="w-8 h-8" />,
    },
    {
      name: "Ver CV",
      href: "https://docs.google.com/document/d/1EqLsHFxXghg_7N9ZkMPCujrz_Su4o-KTL7avZmoiBys/edit?usp=sharing",
      icon: <ResumeSvg className="w-6.5 h-6.5" />,
    },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animación de entrada para el contenedor principal
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 60,
        filter: "blur(12px)",
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });

      // Animación escalonada para los links y botones sociales
      gsap.fromTo(".contact-social-btn, .contact-link", 
        {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        delay: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="h-full w-full relative overflow-hidden">
      {/* Fondo con Silk */}
      <div
        className="absolute inset-0"
        style={{ clipPath: "url(#clip-bottom)" }}
      >
        <div
          className="absolute inset-0 text-[#423c11]"
          style={{ clipPath: "url(#clip-bottom)" }}
        >
          <SilkReveal>
            {(onReady: () => void) => (
              <>
                <SilkFallback />
                <Silk 
                  color="#423c11" // Color oscuro para coherencia con About
                  onReady={onReady} 
                />
              </>
            )}
          </SilkReveal>
        </div>
      </div>

      {/* Contenido Centrado */}
      <div ref={containerRef} className="relative z-10 p-10 md:p-20 flex flex-col justify-center items-center h-full text-main-white text-center">
        
        <h1 className="text-6xl md:text-9xl italic font-light mb-6 tracking-tight">
          <BlurText
            text="Hablemos"
            delay={50}
            animateBy="letters"
            direction="bottom"
          />
        </h1>

        <p className="text-xl md:text-2xl font-extralight text-main-white/70 max-w-2xl mb-12 leading-relaxed">
          ¿Tienes un proyecto en mente o simplemente quieres saludar? <br />
          Estoy a un mensaje de distancia.
        </p>

        {/* Email Principal */}
        <a 
          href="mailto:nazarenojunin@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl will-change-transform md:text-4xl text-main-yellow font-light hover:scale-105 transition-transform duration-300 mb-12 border-b border-main-yellow/20 pb-2 hover:border-main-yellow/100"
        >
          nazarenojunin@gmail.com
        </a>

        {/* Botones de Redes Sociales (Iconos) */}
        <div className="flex gap-6 mb-20">
          {socialLinks.map((social) => (
            <a
              key={`social-${social.name}`}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social-btn group relative w-14 h-14 flex items-center justify-center rounded-full bg-main-white/10 border border-main-white/20 transition-all duration-500 hover:border-main-yellow/50 hover:bg-main-yellow/10"
              title={social.name}
            >
              <div className="relative z-10 text-main-white will-change-transform group-hover:scale-110 transition-all duration-300">
                {social.icon}
              </div>
              <div className="absolute inset-0 rounded-full bg-main-yellow/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </a>
          ))}
        </div>

        {/* Footer simple */}
        <div className="text-main-white/30 font-light text-sm tracking-widest uppercase">
          © {new Date().getFullYear()} · Hecho con ❤️
        </div>
      </div>

      {/* Frame SVG */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox={`0 0 ${SIZE} ${SIZE}`}
      >
        <defs>
          <clipPath id="clip-bottom" clipPathUnits="objectBoundingBox">
            <rect
              x={0.005}
              y={0.01}
              width={0.99}
              height={0.98}
              rx={0.02}
              ry={0.03}
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default Contact;
