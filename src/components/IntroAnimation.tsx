import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";

// n-mask.svg (el nuevo que pasaste, es una línea continua, perfecto)
const N_MASK_D =
  "M108.885 13.4602C99.5478 22.7936 73.7802 78.6469 72.3151 81.4438C70.8501 84.2407 66.5684 85.2156 67.0466 82.5678C67.5249 79.92 69.0776 9.66445 67.8311 5.69125C66.5846 1.71804 61.142 7.21957 61.142 7.21957C61.142 7.21957 21.311 80.3021 17.3155 85.2297C13.32 90.1574 25.7146 62.7582 25.7146 62.7582C25.7146 62.7582 26.17 58.7167 24.5838 57.1353C22.7812 55.3382 0.563965 58.3158 0.563965 58.3158";

// n.svg
const N_FILL_D =
  "M59.904 80.448C59.136 82.432 58.016 83.872 56.544 84.768C55.136 85.728 53.824 86.208 52.608 86.208C50.048 86.208 48.768 83.136 48.768 76.992L49.152 10.944C49.152 8.76799 49.12 7.456 49.056 7.008C48.992 6.56 48.832 6.336 48.576 6.336C47.808 6.336 46.848 7.488 45.696 9.792L8.448 80.448C7.68 81.984 6.464 83.136 4.8 83.904C3.392 84.608 2.432 85.28 1.92 85.92C1.408 86.624 0.96 86.976 0.576 86.976C0.192 86.976 0 86.848 0 86.592C0 86.336 0.192 85.76 0.576 84.864C5.568 73.792 8.064 66.176 8.064 62.016C8.064 57.792 7.552 55.68 6.528 55.68C6.208 55.68 5.76 55.84 5.184 56.16C4.672 56.48 4.288 56.64 4.032 56.64C3.776 56.64 3.648 56.448 3.648 56.064L6.72 54.144C7.04 53.952 7.424 53.696 7.872 53.376C8.768 52.736 9.472 52.416 9.984 52.416C10.496 52.416 11.2 52.736 12.096 53.376C13.888 54.656 14.784 56.896 14.784 60.096L44.352 5.76C45.12 4.16 46.304 2.848 47.904 1.824C49.568 0.735996 51.584 0.191994 53.952 0.191994C56.128 0.191994 57.216 2.112 57.216 5.952L56.64 76.8C58.752 71.552 64.768 59.296 74.688 40.032C84.608 20.704 91.008 9.66399 93.888 6.91199C97.344 3.45599 100.16 1.34399 102.336 0.575996C103.296 0.191998 104.288 0 105.312 0C106.4 0 107.424 0.256001 108.384 0.767998C109.344 1.216 109.824 1.696 109.824 2.208C109.824 2.72 109.344 3.39199 108.384 4.22399C107.424 5.11999 106.464 6.016 105.504 6.91199C103.392 8.76799 102.304 9.664 102.24 9.6C101.92 9.6 101.76 9.40799 101.76 9.02399C101.76 8.64 101.536 8.256 101.088 7.87199C100.64 7.488 100.096 7.296 99.456 7.296C97.6 7.296 95.936 8.38399 94.464 10.56C89.408 17.92 83.04 29.696 75.36 45.888C67.744 62.016 62.592 73.536 59.904 80.448Z";

// REVERTÍ G_MASK_D a la versión original tuya porque la que pegaste recién estaba expandida.
// Para que GSAP anime correctamente (y no de todos lados a la vez), el SVG tiene que ser un solo trazo (línea) sin cerrar.
const G_MASK_D =
  "M123.579 63.803C123.579 63.803 106.651 82.03 93.4496 88.7967C79.9609 95.7105 55.9938 98.9699 55.9938 98.9699C55.9938 98.9699 37.096 102.606 26.8615 108.912C19.5573 113.412 14.9119 116.068 10.2145 123.247C5.46027 130.513 3.87665 135.897 4.7131 144.54C5.58918 153.592 6.69581 161.317 15.0699 164.864C22.219 167.893 27.9318 165.623 34.7226 161.859C41.4982 158.103 42.9758 152.992 47.6703 146.83C58.7167 132.33 70.4209 106.072 70.4209 106.072C70.4209 106.072 93.4657 56.1909 108.232 24.2292C108.232 24.2292 111.928 14.1134 115.594 16.2451C118.538 17.9566 116.84 24.8756 116.84 24.8756C116.84 24.8756 114.425 31.0446 112.326 34.714C110.072 38.6548 108.42 40.6368 105.613 44.2052C95.4151 57.1699 73.8141 72.0055 73.8141 72.0055C73.8141 72.0055 53.8711 89.5312 38.4805 89.4617C34.6119 89.4442 32.1563 89.9218 28.6421 88.3042C24.9537 86.6066 23.0765 84.6852 21.1186 81.128C18.6611 76.6631 18.9048 72.3981 19.6139 68.1645C20.3231 63.931 22.8821 54.2067 26.6744 47.5618C30.4668 40.9169 52.1385 19.0883 52.1385 19.0883C52.1385 19.0883 70.0814 6.44084 83.3716 5.21102C87.9218 4.78996 90.8289 3.71742 95.071 5.41628C98.9288 6.96126 102.297 8.28406 103.14 12.3532C103.782 15.4488 100.917 20.1369 100.917 20.1369";
  // g.svg

  const G_FILL_D =
  "M67.7236 93.0745C51.9156 95.8265 42.176 98.72 35.712 101.28C29.312 103.84 23.872 107.424 19.392 112.032C14.912 116.64 11.776 121.408 9.984 126.336C8.192 131.328 7.296 136.576 7.296 142.08C7.296 154.496 11.584 160.704 20.16 160.704C29.696 160.704 37.568 155.264 43.776 144.384C50.88 132.16 57.9316 114.899 67.7236 93.0745ZM98.88 15.36L99.072 12.096C99.072 9.536 98.144 7.168 96.288 4.992C94.432 2.816 91.84 1.728 88.512 1.728C82.944 1.728 75.776 4.256 67.008 9.312C58.24 14.304 50.432 20.224 43.584 27.072C38.016 32.512 33.152 39.2 28.992 47.136C24.832 55.072 22.72 62.208 22.656 68.544C22.656 73.472 23.84 77.408 26.208 80.352C28.64 83.232 32 84.672 36.288 84.672C40.512 84.672 46.016 82.944 52.8 79.488C63.936 73.728 74.816 65.92 85.44 56.064C87.68 53.824 91.328 48.288 96.384 39.456C101.504 30.624 105.856 22.208 109.44 14.208C110.336 12.032 111.104 10.944 111.744 10.944C112.448 10.944 113.792 11.52 115.776 12.672C117.824 13.824 118.848 14.912 118.848 15.936C118.848 18.048 117.664 21.248 115.296 25.536C112.928 29.824 110.144 33.792 106.944 37.44C104.32 40.512 102.24 43.488 100.704 46.368C99.168 49.184 97.632 52.064 96.096 55.008C94.624 57.952 93.696 59.776 93.312 60.48L78.9132 89.7699C91.2012 86.2499 101.696 80 111.936 71.232C116.224 67.456 119.36 64.064 121.344 61.056C121.6 60.672 121.856 60.48 122.112 60.48C122.368 60.48 122.496 60.576 122.496 60.768C122.496 60.96 122.432 61.184 122.304 61.44C118.848 66.048 115.392 69.856 111.936 72.864C108.544 75.872 104.576 78.72 100.032 81.408C91.84 86.144 84.9603 89.7704 77.7923 91.8184C76.9603 93.4824 74.2245 99.1347 69.8725 108.351C65.5205 117.631 60.928 124.864 57.408 130.944C52.032 139.52 48.288 144.96 46.176 147.264C44.064 149.632 41.984 151.776 39.936 153.696C37.888 155.616 35.904 157.152 33.984 158.304C29.312 161.056 24.64 162.432 19.968 162.432C13.952 162.432 9.12 160.256 5.472 155.904C1.824 151.552 0 146.048 0 139.392C0.064 134.464 1.248 129.728 3.552 125.184C5.792 120.64 8.832 116.672 12.672 113.28C20.416 106.368 28.992 101.376 38.4 98.304C44.16 96.384 53.6125 93.888 68.8445 91.2C73.1965 82.112 79.68 71.744 86.208 59.712C81.664 63.488 76.832 67.2 71.712 70.848C66.592 74.496 60.416 78.112 53.184 81.696C46.016 85.216 39.84 86.976 34.656 86.976C29.472 86.976 24.8 85.312 20.64 81.984C16.48 78.592 14.4 73.792 14.4 67.584C14.4 62.72 15.488 57.504 17.664 51.936C23.808 36.32 36.512 22.688 55.776 11.04C68 3.68 79.68 0 90.816 0C93.312 0 96.192 0.607998 99.456 1.824C102.784 2.976 104.448 4.60801 104.448 6.72001C104.448 7.16801 104.128 7.904 103.488 8.928C102.848 9.952 102.4 10.752 102.144 11.328C101.888 11.84 101.632 12.544 101.376 13.44C100.8 15.104 100.352 15.936 100.032 15.936C99.264 15.936 98.88 15.744 98.88 15.36Z";
// 
export default function IntroAnimation() {
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const nMaskRef = useRef<SVGPathElement>(null);
  const gMaskRef = useRef<SVGPathElement>(null);
  const sparkleRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!nMaskRef.current || !gMaskRef.current || !sparkleRef.current || !containerRef.current) return;

    window.scrollTo(0, 0);
    let smoother: ScrollSmoother | undefined;
    setTimeout(() => {
      smoother = ScrollSmoother.get();
      if (smoother) smoother.paused(true);
    }, 50);

    const nMask = nMaskRef.current;
    const gMask = gMaskRef.current;
    const nLen = nMask.getTotalLength();
    const gLen = gMask.getTotalLength();
    const sparkle = sparkleRef.current;

    // El pedacito que se ve es por culpa del `strokeLinecap="round"`.
    // La "tapa" redondeada del trazo invisible sobresale unos píxeles hacia adentro del área visible.
    // Para arreglarlo, hacemos que el "espacio vacío" (gap) del dash sea más largo que la letra (+ 40px),
    // y arrancamos la animación más lejos (-(len + 20)).
    // Así, la punta redondeada arranca bien lejos y no se asoma.
    gsap.set(nMask, { strokeDasharray: `${nLen} ${nLen + 40}`, strokeDashoffset: -(nLen + 20) });
    gsap.set(gMask, { strokeDasharray: `${gLen} ${gLen + 40}`, strokeDashoffset: -(gLen + 20) });
    
    // Reveal the SVG now that the masks are correctly positioned
    if (svgRef.current) gsap.set(svgRef.current, { opacity: 1 });
    
    // Configuramos el destello con centro dinámico
    gsap.set(sparkle, { opacity: 0, scale: 0, rotation: 0, transformOrigin: "50% 50%" });

    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false);
        if (smoother) smoother.paused(false);
      },
    });

    tl.to(nMask, { strokeDashoffset: 0, duration: 1.2, ease: "power2.in" })
      .to(gMask, { strokeDashoffset: 0, duration: 1.5, ease: "power2.out" })
      // Destello justo al terminar de escribirse la G
      .to(sparkle, {
        opacity: 1,
        scale: 1.5,
        rotation: 90,
        duration: 0.3,
        ease: "back.out(1.7)"
      }, "-=0.1")
      .to(sparkle, {
        opacity: 0,
        scale: 0,
        rotation: 180,
        duration: 0.3,
        ease: "power2.in"
      }, "-=0.15")
      .to(containerRef.current, {
        yPercent: 100,
        duration: 1,
        ease: "power3.inOut",
        delay: 0.1,
        onStart: () => {
          (window as any).__INTRO_PLAYED__ = true;
          window.dispatchEvent(new CustomEvent("introComplete"));
        },
      });

    return () => {
      tl.kill();
      if (smoother) smoother.paused(false);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center pointer-events-auto"
    >
      {/* 
        AUMENTÉ la altura total a 215 y modifiqué el viewBox para que la G no se corte por abajo.
        La G baja hasta Y=211 (171 de alto + 40 de offset en Y).
      */}
      <svg
        ref={svgRef}
        viewBox="0 0 230 215"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-56 h-auto"
        style={{ overflow: 'visible', opacity: 0 }}
      >
        {/* ── Letra "n" ──────────────────────────────────────────────────── */}
        <svg x="0" y="40" width="114" height="90" viewBox="0 0 114 90">
          <defs>
            <mask id="mask-n">
              <path
                ref={nMaskRef}
                d={N_MASK_D}
                stroke="white"
                className="-translate-x-[14px] -translate-y-[2px]"
                strokeWidth="14"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </mask>
          </defs>
          <path
            fill="white"
            mask="url(#mask-n)"
            d={N_FILL_D}
          />
        </svg>

        {/* ── Letra "g" ──────────────────────────────────────────────────── */}
        {/* ACHIQUÉ el x="100" para que estén más juntos como pediste (antes era 126) */}
        <svg x="80" y="40" width="127" height="171" viewBox="0 0 127 171">
          <defs>
            <mask id="mask-g">
              <path
                ref={gMaskRef}
                d={G_MASK_D}
                stroke="white"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                // Aplico tu translate que lograste (con la nueva máscara original se ajusta igual)
                className="-translate-x-[1px] -translate-y-[4px]"
              />
            </mask>
          </defs>
          <path
            fill="white"
            mask="url(#mask-g)"
            d={G_FILL_D}
          />
        </svg>

        {/* ── Destello (Sparkle) ─────────────────────────────────────────── */}
        {/* Coordenadas calculadas en base a la punta de la G: x=80 + 122.5, y=40 + 60.8 */}
        <path
          ref={sparkleRef}
          d="M 202.5 88 Q 202.5 100.8 215.3 100.8 Q 202.5 100.8 202.5 113.6 Q 202.5 100.8 189.7 100.8 Q 202.5 100.8 202.5 88 Z"
          fill="white"
          style={{ opacity: 0 }}
        />
      </svg>
    </div>
  );
}
