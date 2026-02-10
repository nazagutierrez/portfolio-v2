import { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination, A11y } from 'swiper/modules';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { createPortal } from 'react-dom';
import gsap from 'gsap';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

type MediaItem = {
  id: number;
  type: 'image' | 'video';
  src: string;
  thumbnail?: string;
};

const media: MediaItem[] = [
  {
    id: 1,
    type: 'image',
    src: '/a1.jpg',
  },
  {
    id: 2,
    type: 'image',
    src: '/a1.jpg',
  },
  {
    id: 3,
    type: 'image',
    src: '/a1.jpg',
  },
  {
    id: 2,
    type: 'video',
    src: '/v1.mp4',
    thumbnail: '/a1.jpg',
  },
  {
    id: 3,
    type: 'image',
    src: '/a2.jpg',
  },
];


type ViewerProps = {
  item: MediaItem;
  onClose: () => void;
};

function MediaViewer({ item, onClose }: ViewerProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const closeWithAnimation = () => {
    gsap.to(contentRef.current, {
      opacity: 0,
      scale: 0.95,
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
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' },
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
      >
        {item.type === 'image' ? (
          <img
            src={item.src}
            alt=""
            className="max-w-[90vw] max-h-[90vh] object-contain"
          />
        ) : (
          <video
            src={item.src}
            controls
            autoPlay
            className="max-w-[90vw] max-h-[90vh]"
          />
        )}
      </div>
    </div>,
    document.body
  );
}

export function Carousel() {
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
    <div className='relative text-main-white'>
      <div
        ref={paginationRef}
        className="swiper-pagination absolute -bottom-13! h-10 left-0 w-full flex justify-center z-10"
      />
      
      {/* FADE IZQUIERDO */}
      <div className="pointer-events-none absolute shadow-[-20px_0_30px_-5px_#000] left-0 top-0 h-full w-16 z-20
        bg-gradient-to-r from-black/70 to-transparent
        " />

      {/* FADE DERECHO */}
      <div className="pointer-events-none absolute shadow-[20px_0px_30px_-5px_#000] right-0 top-0 h-full w-16 z-20
        bg-gradient-to-l from-black/60 to-transparent
        " />

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
        className="h-40 w-160 m-0!"
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
        <MediaViewer item={activeItem} onClose={() => setActiveItem(null)} />
      )}
    </div>
  );
}
