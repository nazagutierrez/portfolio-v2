import { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination, A11y, Navigation } from 'swiper/modules';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import type { MediaItem } from '@/constants/media';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
// @ts-expect-error - Swiper CSS imports don't have type definitions
import 'swiper/css/navigation';

import noiseImg from "@/assets/noise.png?url";


import LoaderSvg from '@/assets/svg/LoaderSvg';
import ExternalLinkSvg from '@/assets/svg/ExternalLinkSvg';
import PlaySvg from '@/assets/svg/PlaySvg';

type ViewerProps = {
  media: MediaItem[];
  initialSlideIndex: number;
  onClose: () => void;
  href?: string | string[];
};

function SlideVideo({ src, isActive, className = "", blurBg }: { src: string, isActive: boolean, className?: string, blurBg?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isActive) {
      videoRef.current?.play().catch(() => {});
      bgVideoRef.current?.play().catch(() => {});
    } else {
      videoRef.current?.pause();
      bgVideoRef.current?.pause();
    }
  }, [isActive]);

  return (
    <>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center rounded-lg z-0">
          <LoaderSvg className="w-6 h-6 text-white/50 animate-spin" />
        </div>
      )}
      {blurBg && isLoaded && (
        <video
          ref={bgVideoRef}
          src={src}
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover blur-[12px] opacity-50 scale-110 z-0 pointer-events-none"
        />
      )}
      <video
        ref={videoRef}
        src={src}
        controls
        playsInline
        onLoadedData={() => setIsLoaded(true)}
        className={`${className} relative z-10 transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </>
  );
}

function MediaViewer({ media, initialSlideIndex, onClose, href }: ViewerProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Bloquear scroll del body
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

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

  // Dispatch custom event to pause background videos
  useEffect(() => {
    const event = new CustomEvent('mediaViewerState', { detail: { isOpen: true } });
    window.dispatchEvent(event);
    return () => {
      window.dispatchEvent(new CustomEvent('mediaViewerState', { detail: { isOpen: false } }));
    };
  }, []);

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
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target.closest('.swiper-button-next, .swiper-button-prev, .swiper-pagination, video')) return;
        closeWithAnimation();
      }}
      className="fixed cursor-zoom-out inset-0 z-[9999] bg-black/80 flex items-center justify-center"
    >
      <button
        onClick={closeWithAnimation}
        className="absolute cursor-pointer p-2 top-10 right-10 sm:top-6 sm:right-6 text-white text-2xl z-99"
      >
        ✕
      </button>

      <div
        ref={contentRef}
        className="flex flex-col items-center justify-center relative w-full h-full max-h-dvh"
      >
        <Swiper
          initialSlide={initialSlideIndex}
          navigation={true}
          nested={true}
          modules={[Navigation, A11y]}
          className="w-full h-auto [&>.swiper-wrapper]:items-stretch [--swiper-navigation-color:#fff] [--swiper-navigation-size:2rem] [--swiper-navigation-sides-offset:1rem] md:[--swiper-navigation-sides-offset:3rem]"
        >
          {media.map((item, index) => {
            const currentHref = Array.isArray(href) ? href[index] : href;
            return (
            <SwiperSlide key={item.id} className="!h-auto flex content-center justify-center p-4 sm:p-8 box-border">
              {({ isActive }) => (
                <div 
                  onClick={e => e.stopPropagation()}
                  className="relative rounded-xl overflow-hidden bg-[#120d0d] shadow-2xl ring-1 ring-white/10 flex flex-col items-stretch w-full max-w-[90vw] md:max-w-4xl lg:max-w-4xl h-full max-h-[90dvh] mx-auto cursor-default"
                >
                  <div className="absolute inset-0 opacity-30 bg-[url('/noise.png?url')] pointer-events-none z-0"></div>
                  {item.type === 'image' ? (
                    <div className="relative w-full aspect-video max-h-[45dvh] md:max-h-[60dvh] flex items-center justify-center overflow-hidden shrink-0 bg-black/40">
                      <SlideImage
                        src={item.src}
                        alt=""
                        blurBg={isActive}
                        className="relative z-10 w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="relative w-full aspect-video max-h-[45dvh] md:max-h-[60dvh] flex items-center justify-center overflow-hidden shrink-0 bg-black/40">
                      <SlideVideo 
                        src={item.src} 
                        isActive={isActive} 
                        blurBg={isActive}
                        className="relative z-10 w-full h-full object-contain"
                      />
                    </div>
                  )}
                  
                  {(item.description || item.technologies || currentHref) && (
                    <div className="relative w-full flex-1 bg-linear-30 from-[#3a3202] via-[#120d0d] to-[#0d0d0d] border-t border-white/10 min-h-0 overflow-hidden flex flex-col">
                      <div className="absolute inset-0 opacity-30 pointer-events-none z-0" style={{ backgroundImage: `url(${noiseImg})` }}></div>
                      <div className="relative z-10 p-6 flex flex-col gap-y-4 overflow-y-auto h-full [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.2)_transparent]">
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
                              <div key={idx} className="flex items-center gap-1.5 text-white/60 transition-colors duration-300">
                                <Icon className="w-5 h-5" />
                                <span className="text-xs font-medium tracking-wide uppercase">{tech.name}</span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      {currentHref && (
                        <a
                          href={`https://${currentHref}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="relative z-10 flex items-center gap-2 text-xs font-medium tracking-wide uppercase text-white/50 hover:text-white transition-colors duration-300 w-fit border-t border-white/10 pt-4 mt-0"
                        >
                          <ExternalLinkSvg className="w-3.5 h-3.5" />
                          {currentHref}
                        </a>
                      )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </SwiperSlide>
            );
          })}
        </Swiper>
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
  href?: string | string[];
};

function SlideImage({ src, alt, className, blurBg }: { src: string, alt: string, className: string, blurBg?: boolean }) {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/5 rounded-lg z-0">
          <LoaderSvg className="w-6 h-6 text-white/50 animate-spin" />
        </div>
      )}
      {blurBg && isLoaded && (
        <img
          src={src}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-[2px] opacity-80 scale-110 z-0 pointer-events-none"
        />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        className={`${className} transition-opacity duration-300 relative z-10 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </>
  );
}

export function Carousel({ title, media, borderColor, logo, href }: CarouselProps) {
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);
  const parentSwiperRef = useRef<any>(null);

  // Disable outer swiper when modal is open
  useEffect(() => {
    if (activeItemIndex !== null) {
      parentSwiperRef.current?.disable();
    } else {
      parentSwiperRef.current?.enable();
    }
  }, [activeItemIndex]);
  const paginationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const smoother = ScrollSmoother.get();

    if (activeItemIndex !== null) {
      smoother?.paused(true);
    } else {
      smoother?.paused(false);
    }
  }, [activeItemIndex]);

  return (
    <div className='relative text-main-white w-full md:w-160 max-w-full mx-auto md:mx-0'>
      {title && (
        <p className="flex xxl:pl-3 pl-0 gap-x-2 items-center mb-2 text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium border-l" style={borderColor ? { borderColor } : undefined}>
          <img src={logo} alt="Logo" loading="lazy" decoding="async" className="block xxl:hidden pl-2 w-6 h-6 object-contain" />
          {title}
        </p>
      )}
      <div
        ref={paginationRef}
        className="swiper-pagination xl:absolute -bottom-13! h-10 left-0 w-full flex justify-center z-10"
      />
      <Swiper
        onSwiper={(swiper) => (parentSwiperRef.current = swiper)}
        pagination={{
          clickable: true,
          renderBullet: (_index, className) => {
            return `
              <button class="${className} custom-bullet" aria-label="Go to slide ${_index + 1}">
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
        className="h-full w-full m-0! rounded-lg"
      >
        {media.map((item, index) => (
          <SwiperSlide className='h-auto!' key={item.id}>
            <button
              onClick={() => setActiveItemIndex(index)}
              className="w-full aspect-4/3 relative cursor-zoom-in"
              aria-label="View media full screen"
            >
              {item.type === 'image' ? (
                <SlideImage
                  src={item.src}
                  alt=""
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="relative w-full h-full">
                  <SlideImage
                    src={item.thumbnail || ''}
                    alt=""
                    className="w-full h-full object-cover rounded-lg"
                  />
                  {/* play icon */}
                  <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                    <i className='bg-black/80 p-3 rounded-full'>
                      <PlaySvg className='w-4 h-4' />
                    </i>
                  </div>
                </div>
              )}
            </button>
          </SwiperSlide>
        ))}
      </Swiper>

      {activeItemIndex !== null && (
        <MediaViewer media={media} initialSlideIndex={activeItemIndex} onClose={() => setActiveItemIndex(null)} href={href} />
      )}
    </div>
  );
}
