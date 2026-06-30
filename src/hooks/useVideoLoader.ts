import { useEffect, useRef, useState } from "react";
import type { RefObject, CSSProperties } from "react";

interface UseVideoLoaderOptions {
  /**
   * Whether to use IntersectionObserver to defer loading until the element
   * is near the viewport. Ideal for off-screen videos (e.g. Contact section).
   */
  lazy?: boolean;
  /** Root margin for the IntersectionObserver. Default: "200px" */
  rootMargin?: string;
}

interface UseVideoLoaderReturn {
  videoRef: RefObject<HTMLVideoElement | null>;
  /** True once the browser can start playing the video */
  isReady: boolean;
  /** Inline style to apply to the container for the fade-in effect */
  videoStyle: CSSProperties;
}

/**
 * Centralised video loading hook.
 *
 * - When `lazy = true` the `src` attribute is only set once the container
 *   element enters the viewport (IntersectionObserver), so the browser does
 *   not download the file upfront.
 * - Once the video fires the `canplay` event, `isReady` flips to `true` and
 *   the video fades in with a smooth opacity transition.
 */
export function useVideoLoader(
  src: string,
  { lazy = false, rootMargin = "200px" }: UseVideoLoaderOptions = {}
): UseVideoLoaderReturn {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => setIsReady(true);
    video.addEventListener("canplay", handleCanPlay, { once: true });

    if (!lazy) {
      // Non-lazy: src is already set via the JSX attribute, just listen.
      // If the browser already buffered enough before we attached the listener,
      // check readyState directly.
      if (video.readyState >= 3) setIsReady(true);
      return () => video.removeEventListener("canplay", handleCanPlay);
    }

    // Lazy: only inject the src once the element is near the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          video.src = src;
          video.load();
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(video);

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      observer.disconnect();
    };
  }, [src, lazy, rootMargin]);

  const videoStyle: CSSProperties = {
    opacity: isReady ? 1 : 0,
    transition: "opacity 0.8s ease",
  };

  return { videoRef, isReady, videoStyle };
}
