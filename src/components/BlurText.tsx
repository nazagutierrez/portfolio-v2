import { useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';

type BlurTextProps = {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Record<string, string | number>;
  animationTo?: Array<Record<string, string | number>>;
  onAnimationComplete?: () => void;
  stepDuration?: number;
};

const BlurText: React.FC<BlurTextProps> = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  onAnimationComplete,
  stepDuration = 1,
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const containerRef = useRef<HTMLParagraphElement>(null);
  const spansRef = useRef<(HTMLSpanElement | null)[]>([]);

  const defaultFrom = useMemo(
    () =>
      direction === 'top'
        ? { filter: 'blur(10px)', opacity: 0, y: -30 }
        : { filter: 'blur(10px)', opacity: 0, y: 30 },
    [direction]
  );

  const defaultTo = useMemo(
    () => [
      { filter: 'blur(0px)', opacity: 1, y: 0 },
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  useEffect(() => {
    const spans = spansRef.current.filter(Boolean) as HTMLSpanElement[];
    if (!containerRef.current || spans.length === 0) return;

    // Set initial state for all spans
    gsap.set(spans, fromSnapshot);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(containerRef.current as Element);

        // Animate each span with a single keyframe tween to avoid mid-animation jumps
        const totalDuration = stepDuration * toSnapshots.length;
        spans.forEach((span, index) => {
          gsap.to(span, {
            keyframes: toSnapshots,
            duration: totalDuration,
            ease: 'power4.out',
            delay: (index * delay) / 1000,
            onComplete: index === spans.length - 1 ? onAnimationComplete : undefined,
          });
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [
    fromSnapshot,
    toSnapshots,
    delay,
    stepDuration,
    threshold,
    rootMargin,
    onAnimationComplete,
  ]);

  return (
    <p ref={containerRef} className={`blur-text ${className} flex flex-wrap`}>
      {elements.map((segment, index) => (
        <span
          key={index}
          ref={(el) => { spansRef.current[index] = el; }}
          style={{ display: 'inline-block', willChange: 'transform, filter, opacity' }}
        >
          {segment === ' ' ? '\u00A0' : segment}
          {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
        </span>
      ))}
    </p>
  );
};

export default BlurText;
