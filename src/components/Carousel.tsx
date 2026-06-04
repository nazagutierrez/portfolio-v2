import { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination, A11y } from 'swiper/modules';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import type { MediaItem } from '@/constants/media';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';


import { ExternalLink } from 'lucide-react';

type ViewerProps = {
  item: MediaItem;
  onClose: () => void;
  href?: string;
};

function MediaViewer({ item, onClose, href }: ViewerProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const closeWithAnimation = () => {
    gsap.to(contentRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.2,
      onComplete: onClose,
    });

    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.2,
    });
  };

  // ESC para cerrar
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Animación de entrada
  useEffect(() => {
    if (!overlayRef.current || !contentRef.current) return;

    const tl = gsap.timeline();

    tl.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.25, ease: 'power1.out' }
    ).fromTo(
      contentRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
      '-=0.15'
    );

    return () => {
      tl.kill();
    };
  }, []);

  return createPortal(
    <div
      ref={overlayRef}
      onClick={closeWithAnimation}
      className="fixed cursor-zoom-out inset-0 z-[9999] bg-black/80 flex items-center justify-center"
    >
      <button
        onClick={closeWithAnimation}
        className="absolute cursor-pointer top-6 right-6 text-white text-2xl"
      >
        ✕
      </button>

      <div
        ref={contentRef}
        onClick={e => e.stopPropagation()}
        className="flex flex-col items-center justify-center relative"
      >
        <div className="relative rounded-xl overflow-hidden bg-[#120d0d] shadow-2xl ring-1 ring-white/10 flex flex-col items-center justify-center max-w-[90vw] max-h-[100vh] backdrop-blur-sm">
          <div className="absolute inset-0 opacity-30 bg-[url('/noise.webp')] pointer-events-none z-0"></div>
          {item.type === 'image' ? (
            <img
              src={item.src}
              alt=""
              className="relative z-10 max-w-[90vw] max-h-[75vh] object-contain"
            />
          ) : (
            <video
              src={item.src}
              controls
              autoPlay
              className="relative z-10 max-w-[90vw] max-h-[75vh]"
            />
          )}
          
          {(item.description || item.technologies || href) && (
            <div className="relative w-full bg-linear-30 from-[#3a3202] via-[#120d0d] to-[#0d0d0d] p-6 flex flex-col gap-y-4 border-t border-white/10 shrink-0 overflow-hidden">
              <div className="absolute inset-0 opacity-30 bg-[url('/noise.webp')] pointer-events-none z-0"></div>
              {item.description && (
                <p className="relative z-10 text-white/80 text-sm md:text-base leading-relaxed max-w-3xl">
                  {item.description}
                </p>
              )}
              {item.technologies && item.technologies.length > 0 && (
                <div className="relative z-10 flex flex-wrap items-center gap-4">
                  {item.technologies.map((tech, idx) => {
                    const Icon = tech.icon as any;
                    return (
                      <div key={idx} className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors duration-300">
                        <Icon className="w-5 h-5" />
                        <span className="text-xs font-medium tracking-wide uppercase">{tech.name}</span>
                      </div>
                    );
                  })}
                </div>
              )}
              {href && (
                <a
                  href={`https://${href}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="relative z-10 flex items-center gap-2 text-xs font-medium tracking-wide uppercase text-white/50 hover:text-white transition-colors duration-300 w-fit border-t border-white/10 pt-4 mt-0"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  {href}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

type CarouselProps = {
  title?: string;
  media: MediaItem[];
  borderColor?: string;
  logo?: string;
  href?: string;
};

export function Carousel({ title, media, borderColor, logo, href }: CarouselProps) {
  const [activeItem, setActiveItem] = useState<MediaItem | null>(null);
  const paginationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const smoother = ScrollSmoother.get();

    if (activeItem) {
      smoother?.paused(true);
    } else {
      smoother?.paused(false);
    }
  }, [activeItem]);

  return (
    <div className='relative text-main-white w-full md:w-160 max-w-full mx-auto md:mx-0'>
      {title && (
        <p className="flex xxl:pl-3 pl-0 gap-x-2 items-center mb-2 text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium border-l" style={borderColor ? { borderColor } : undefined}>
          <img src={logo} alt="Logo" className="block xxl:hidden pl-2 w-6 h-6 object-contain" />
          {title}
        </p>
      )}
      <div
        ref={paginationRef}
        className="swiper-pagination xl:absolute -bottom-13! h-10 left-0 w-full flex justify-center z-10"
      />
      <Swiper
        pagination={{
          clickable: true,
          renderBullet: (_index, className) => {
            return `
              <button class="${className} custom-bullet">
                <span></span>
              </button>
            `;
          },
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 16,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
        }}
        freeMode
        onBeforeInit={(swiper) => {
          // aseguramos que pagination sea un objeto
          if (typeof swiper.params.pagination === 'object') {
            swiper.params.pagination.el = paginationRef.current;
          }
        }}
        modules={[FreeMode, Pagination, A11y]}
        className="h-60 xs:h-75 sm:h-52 md:h-40 w-full m-0! rounded-lg"
      >
        {media.map(item => (
          <SwiperSlide key={item.id}>
            <button
              onClick={() => setActiveItem(item)}
              className="w-full h-full relative cursor-zoom-in"
            >
              {item.type === 'image' ? (
                <img
                  src={item.src}
                  alt=""
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="relative w-full h-full">
                  <img
                    src={item.thumbnail}
                    alt=""
                    className="w-full h-full object-cover rounded-lg"
                  />
                  {/* play icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    ▶️
                  </div>
                </div>
              )}
            </button>
          </SwiperSlide>
        ))}
      </Swiper>

      {activeItem && (
        <MediaViewer item={activeItem} onClose={() => setActiveItem(null)} href={href} />
      )}
    </div>
  );
}
