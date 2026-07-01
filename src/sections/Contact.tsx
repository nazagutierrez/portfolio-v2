import { useEffect, useLayoutEffect, useRef } from "react";
import { useVideoLoader } from "@/hooks/useVideoLoader";
import gsap from "gsap";
import BlurText from "@/components/BlurText";
import GithubSvg from "@/assets/svg/GithubSvg";
import LinkedinSvg from "@/assets/svg/LinkedinSvg";
import WhatsappSvg from "@/assets/svg/WhatsappSvg";
import ResumeSvg from "@/assets/svg/ResumeSvg";
import { useTranslation } from "react-i18next";
import HeartSvg from "@/assets/svg/HeartSvg";
import posterContact from "@/assets/poster-contact.webp?url";

const contactBg = "/videos/contact-bg.mp4";

const Contact = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Video optimisation: lazy load + fade-in on canplay
  const { videoRef: contactBgRef, videoStyle: contactBgStyle } = useVideoLoader(contactBg, {
    lazy: true,
    rootMargin: "300px",
  });

  const isViewerOpenRef = useRef(false);

  useEffect(() => {
    const spacer = document.getElementById('Contact');
    if (!spacer) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isViewerOpenRef.current) {
        contactBgRef.current?.play().catch(() => {});
      } else {
        contactBgRef.current?.pause();
      }
    });
    observer.observe(spacer);

    const handleMediaViewer = (e: Event) => {
      const customEvent = e as CustomEvent<{ isOpen: boolean }>;
      isViewerOpenRef.current = customEvent.detail.isOpen;
      
      if (customEvent.detail.isOpen) {
        contactBgRef.current?.pause();
      } else {
        const rect = spacer.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          contactBgRef.current?.play().catch(() => {});
        }
      }
    };
    window.addEventListener('mediaViewerState', handleMediaViewer);
    
    return () => {
      window.removeEventListener('mediaViewerState', handleMediaViewer);
      observer.disconnect();
    };
  }, [contactBgRef]);

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/nazarenogutierrez1",
      icon: <LinkedinSvg className="w-5 h-5 sm:w-7 sm:h-7" />,
    },
    {
      name: "GitHub",
      href: "https://github.com/nazagutierrez",
      icon: <GithubSvg className="w-5 h-5 sm:w-7 sm:h-7" />,
    },
    {
      name: "WhatsApp",
      href: "https://api.whatsapp.com/send?phone=542364329720",
      icon: <WhatsappSvg className="w-6 h-6 sm:w-8 sm:h-8" />,
    },
    {
      name: t("contact.btn_cv"),
      href: "https://docs.google.com/document/d/1EqLsHFxXghg_7N9ZkMPCujrz_Su4o-KTL7avZmoiBys/edit?usp=sharing",
      icon: <ResumeSvg className="w-5 h-5 sm:w-6.5 sm:h-6.5" />,
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
        },
      });

      // Animación escalonada para los links y botones sociales
      gsap.fromTo(
        ".contact-social-btn, .contact-link",
        {
          opacity: 0,
          y: 20,
          filter: "blur(8px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.1,
          duration: 0.8,
          delay: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        },
      );

      // Animación para el email
      gsap.from(".contact-email", {
        opacity: 0,
        y: 20,
        filter: "blur(8px)",
        duration: 1,
        delay: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Animación para el footer
      gsap.from(".contact-footer", {
        opacity: 0,
        filter: "blur(6px)",
        duration: 1.2,
        delay: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="h-full w-full relative overflow-hidden">
      {/* Fondo con Silk */}
      <div
        className="absolute inset-0"
        style={{ clipPath: "inset(clamp(10px, 1.5vw, 6px) round 28px)" }}
      >
        <div className="absolute inset-0">
          <video
            ref={contactBgRef}
            poster={posterContact}
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="absolute opacity-50! inset-0 w-full h-full object-cover"
            style={contactBgStyle}
          />
        </div>
      </div>

      {/* Contenido Centrado */}
      <div
        ref={containerRef}
        className="relative z-10 p-3 xs:p-6 sm:p-10 md:p-20 flex flex-col justify-center items-center h-full text-main-white text-center"
      >
        <h2 className="text-6xl sm:text-8xl md:text-9xl italic font-light mb-4 sm:mb-6 tracking-tight">
          <BlurText
            text={t("contact.title")}
            delay={50}
            animateBy="letters"
            direction="bottom"
          />
        </h2>

        <p className="text-lg sm:text-xl md:text-[1.375rem] font-light text-main-white/70 max-w-2xl mb-8 sm:mb-12 leading-relaxed px-4">
          {t("contact.subtitle1")} <br />
          {t("contact.subtitle2")}
        </p>

        {/* Email Principal */}
        <a
          href="mailto:nazarenojunin@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-email inline-block text-lg sm:text-2xl will-change-transform md:text-4xl text-main-yellow font-light transition-colors duration-300 mb-8 sm:mb-12 border-b border-main-yellow/20 pb-2 hover:border-main-yellow/100 break-all sm:break-normal px-2"
        >
          nazarenojunin@gmail.com
        </a>

        {/* Botones de Redes Sociales (Iconos) */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-12 sm:mb-20 px-2">
          {socialLinks.map((social) => (
            <a
              key={`social-${social.name}`}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social-btn group relative w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-main-white/10 border border-main-white/20 transition-colors duration-500 hover:border-main-yellow/50 hover:bg-main-yellow/10"
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
        <div className="contact-footer text-main-white/50 font-light text-sm tracking-widest uppercase flex items-center gap-2">
          © {new Date().getFullYear()} · {t("contact.footer")}
          <HeartSvg className="w-4 h-4 text-main-yellow animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default Contact;
