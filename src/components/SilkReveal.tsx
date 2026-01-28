import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

type SilkRevealProps = {
  children: (onReady: () => void) => React.ReactNode;
};

export const SilkReveal = ({ children }: SilkRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  // 👇 SOLO estado
  const handleReady = () => {
    setReady(true);
  };

  // 👇 GSAP vive acá (lugar correcto)
  useLayoutEffect(() => {
    if (!ready || !ref.current) return;

    gsap.fromTo(
      ref.current,
      {
        opacity: 0,
        filter: "blur(14px)",
        scale: 1.03,
      },
      {
        opacity: 1,
        filter: "blur(0px)",
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        clearProps: "filter",
      }
    );
  }, [ready]);

  return (
    <div ref={ref} className="absolute inset-0 opacity-0">
      {children(handleReady)}
    </div>
  );
};

export const SilkFallback = () => (
  <div className="absolute inset-0 bg-main-black" />
);