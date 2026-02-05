import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

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
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={16}
        freeMode
        pagination={{ clickable: true }}
        modules={[FreeMode, Pagination]}
        className="h-40"
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
    </>
  );
}
