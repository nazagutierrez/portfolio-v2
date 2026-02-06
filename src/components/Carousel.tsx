import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination, A11y, Navigation } from 'swiper/modules';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { IoIosArrowBack } from "react-icons/io";

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

import { useEffect } from 'react';
import { createPortal } from 'react-dom';

function MediaViewer({ item, onClose }: ViewerProps) {
  // ESC para cerrar
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return createPortal(
    <div onClick={onClose} className="fixed cursor-zoom-out inset-0 z-100 bg-black/80 flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute cursor-pointer top-6 right-6 text-white text-2xl"
      >
        ✕
      </button>

        <div onClick={e => e.stopPropagation()}>
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
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const paginationRef = useRef<HTMLDivElement | null>(null);

  const [activeItem, setActiveItem] = useState<MediaItem | null>(null);

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
      <button
        ref={prevRef}
        aria-label="Previous slide"
        className="
          absolute left-2 top-1/2 z-10 -translate-y-1/2
          hidden md:flex text-2xl
          h-10 w-10 items-center justify-center
          rounded-full bg-main-yellow/40 shadow-xl
          group cursor-pointer hover:bg-main-yellow/70
          transition-colors duration-200
        "
      >
       <IoIosArrowBack />
      </button>

      <button
        ref={nextRef}
        aria-label="Next slide"
        className="
          absolute right-2 top-1/2 z-10 -translate-y-1/2
          hidden md:flex text-2xl
          h-10 w-10 items-center justify-center
          rounded-full bg-main-yellow/40 shadow-xl
          group cursor-pointer hover:bg-main-yellow/70
          transition-colors duration-200
        "
      >
        <IoIosArrowBack className='rotate-180'/>
      </button>
      
      <div
        className="swiper-pagination absolute -bottom-13! h-10 left-0 w-full flex justify-center z-10"
      />

      <Swiper
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
          renderBullet: (_index, className) => {
            return `
              <button class="${className} custom-bullet">
                <span></span>
              </button>
            `;
          },
        }}
        onBeforeInit={(swiper) => {
          // @ts-expect-error Swiper typing
          swiper.params.navigation.prevEl = prevRef.current;
          // @ts-expect-error Swiper typing
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
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
        modules={[FreeMode, Pagination, Navigation, A11y]}
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
