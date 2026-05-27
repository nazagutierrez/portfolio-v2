import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import BlurText from "@/components/BlurText";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Linkedin } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "John Doe",
    position: "Senior Frontend Developer",
    text: "Nazareno es un excelente profesional. Siempre dispuesto a ayudar y con una gran capacidad para resolver problemas complejos en React. Su sentido del diseño y la estética eleva cualquier proyecto.",
    linkedin: "https://linkedin.com/",
    image: "https://i.pravatar.cc/150?u=1"
  },
  {
    name: "Agustin Millan",
    position: "Backend Developer",
    text: "Trabajar con Nazareno fue un placer. Es un desarrollador Frontend con gran nivel técnico, proactivo y orientado al trabajo en equipo. Siempre propone mejoras, anticipa problemas y aporta soluciones de forma constante. Su disposición para colaborar, revisar código y ayudar al equipo lo convierten en un profesional muy valioso y altamente recomendable.",
    linkedin: "https://linkedin.com/",
    image: "/backend-dev.png"
  },
  {
    name: "Javier Romero González",
    position: "Founder & CEO of Dymo",
    text: "Tuve el placer de trabajar con Nazareno en el rediseño y desarrollo de nuestro Help Center. Demostró gran capacidad para entender necesidades, crear una experiencia intuitiva y ejecutar un desarrollo sólido y eficiente. Su enfoque proactivo, atención al detalle y compromiso con la calidad hicieron que el proyecto superara nuestras expectativas. Recomiendo a Nazareno sin reservas.",
    linkedin: "https://linkedin.com/",
    image: "/dymo-ceo.png"
  }
];

const Testimonials = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const swiperContainerRef = useRef<HTMLDivElement>(null);

  const onAutoplayTimeLeft = (s: any, time: number, progress: number) => {
    if (swiperContainerRef.current) {
      swiperContainerRef.current.style.setProperty("--slide-progress", progress.toString());
    }
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testimonial-header", {
        opacity: 0,
        y: 20,
        filter: "blur(10px)",
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });
      gsap.from(".swiper-container", {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="Testimonials"
      ref={sectionRef}
      className="min-h-[100vh] flex flex-col bg-linear-210 from-[#3a3202] via-[#120d0d] to-[#0d0d0d] justify-center mb-2 p-6 sm:p-10 md:p-20 relative bg-main-black rounded-[28px] overflow-hidden z-90"
    >
      <div className="absolute inset-0 opacity-20 bg-[url('/noise.png')] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
        <h2 className="testimonial-header text-5xl md:text-7xl italic font-light leading-tight text-center mb-4">
          <BlurText
            text={t("testimonials.title")}
            delay={50}
            animateBy="letters"
            direction="bottom"
          />
        </h2>
        <p className="testimonial-header text-main-white/60 text-lg md:text-xl text-center font-light mb-12">
          {t("testimonials.description")}
        </p>

        <div className="swiper-container w-full" ref={swiperContainerRef}>
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            onAutoplayTimeLeft={onAutoplayTimeLeft}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            className="w-full pb-12"
          >
            {testimonials.map((testimonial, idx) => (
              <SwiperSlide key={idx} className="h-auto p-1 pb-12">
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 h-full flex flex-col justify-between hover:border-main-yellow/30 transition-colors duration-500">
                  <div className="mb-8">
                    <svg className="w-10 h-10 text-main-yellow/50 mb-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <p className="text-lg md:text-2xl font-light leading-relaxed text-main-white/90 italic">
                      "{testimonial.text}"
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-white/10 pt-6 mt-4">
                    <div className="flex items-center gap-4">
                      {/* Image with Progress Circle */}
                      <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
                        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="46" stroke="rgba(255,255,255,0.1)" strokeWidth="4" fill="none" />
                          <circle 
                            cx="50" cy="50" r="46" 
                            stroke="#facc15" 
                            strokeWidth="4" 
                            fill="none" 
                            strokeDasharray="289" 
                            className="progress-circle transition-none"
                            strokeLinecap="round"
                          />
                        </svg>
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className="w-11 h-11 object-cover rounded-full" 
                        />
                      </div>
                      <div>
                        <h4 className="text-xl font-medium text-main-white">{testimonial.name}</h4>
                        <p className="text-sm text-main-white/50 mt-1">{testimonial.position}</p>
                      </div>
                    </div>
                    <a 
                      href={testimonial.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 shrink-0 rounded-full bg-[#0A66C2]/10 flex items-center justify-center text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-colors duration-300"
                      aria-label="LinkedIn Profile"
                    >
                      <Linkedin size={20} />
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <style>{`
        .swiper-pagination-bullet {
          background-color: rgba(255,255,255,0.5);
        }
        .swiper-pagination-bullet-active {
          background-color: #facc15;
        }
        
        .swiper-slide .progress-circle {
          stroke-dashoffset: 289;
        }
        
        .swiper-slide-active .progress-circle {
          stroke-dashoffset: calc(289 * var(--slide-progress, 1));
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
