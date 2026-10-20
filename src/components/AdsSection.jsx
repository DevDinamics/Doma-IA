import React, { useEffect, useState, useRef } from 'react';

// Ícono minimalista de Check circular con trazado SVG nítido y blindado
const CheckIcon = ({ active, delay = 0 }) => (
  <svg 
    className={`w-5 h-5 text-[#8257e6] shrink-0 mt-0.5 transition-transform duration-500 ${
      active ? 'scale-100' : 'scale-75'
    }`} 
    style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)', transitionDelay: `${delay}ms` }}
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    strokeWidth="2.2"
  >
    <circle 
      cx="12" 
      cy="12" 
      r="9" 
      className="transition-opacity duration-500"
      style={{ stroke: 'rgba(130, 87, 230, 0.35)', opacity: active ? 1 : 0.2 }}
    />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M8.5 12.5l2.5 2.5 4.5-5.5"
      style={{
        strokeDasharray: 20,
        strokeDashoffset: active ? 0 : 20,
        transition: `stroke-dashoffset 0.55s cubic-bezier(0.16, 1, 0.3, 1) ${delay + 120}ms`
      }}
    />
  </svg>
);

// Sub-componente para cada tarjeta con Scroll-Scrubbing 3D Nítido y optimizado para GPU
const AdModeCard = ({ 
  badge, 
  title, 
  features, 
  videoSrc, 
  posterSrc, 
  index = 0 
}) => {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isEntered, setIsEntered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let rafId = null;

    const updateScroll = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const start = windowHeight * 0.96;
      const end = windowHeight * 0.38;
      const rawProgress = (start - rect.top) / (start - end);
      const clamped = Math.max(0, Math.min(1, rawProgress));

      const eased = 1 - Math.pow(1 - clamped, 3);
      setScrollProgress(eased);

      if (clamped > 0.2) {
        setIsEntered(true);
        if (videoRef.current && videoRef.current.paused) {
          videoRef.current.play().catch(() => {});
        }
      } else {
        setIsEntered(false);
        if (videoRef.current && !videoRef.current.paused) {
          videoRef.current.pause();
        }
      }
    };

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateScroll);
    };

    updateScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    const rotateY = ((x - 50) / 50) * 3; 
    const rotateX = ((50 - y) / 50) * 3; 

    setMousePos({ x, y });
    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  const staggerOffset = index === 0 ? 50 : 80;
  const translateY = (1 - scrollProgress) * staggerOffset;
  const scale = 0.94 + scrollProgress * 0.06;
  const scrollRotateX = (1 - scrollProgress) * 8; 
  const opacity = Math.min(1, 0.2 + scrollProgress * 0.8);
  const videoParallaxY = (1 - scrollProgress) * 16;

  return (
    <div style={{ perspective: '1200px' }}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `translate3d(0, ${translateY}px, 0) scale(${scale}) rotateX(${scrollRotateX + tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          opacity: opacity,
          willChange: 'transform, opacity',
          transition: isHovered 
            ? 'transform 0.1s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.15s linear, border-color 0.3s ease' 
            : 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.15s linear, border-color 0.3s ease',
        }}
        className="group relative rounded-[28px] sm:rounded-[32px] p-5 sm:p-7 bg-[#12121c] border border-white/[0.09] hover:border-[#8257e6]/50 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
      >
        {/* Spotlight interactivo optimizado */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-0"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(420px circle at ${mousePos.x}% ${mousePos.y}%, rgba(130, 87, 230, 0.12), rgba(67, 124, 235, 0.04) 40%, transparent 70%)`,
          }}
        />

        {/* Línea de luz superior ligada al scroll */}
        <div 
          style={{
            transform: `scaleX(${scrollProgress})`,
            opacity: scrollProgress
          }}
          className="absolute top-0 inset-x-8 h-[1.5px] bg-gradient-to-r from-transparent via-[#a100ff] to-transparent origin-center transition-transform duration-100"
        />

        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-stretch gap-6 sm:gap-7">
          
          {/* Contenedor del Video con Parallax opuesto */}
          <div className="w-full sm:w-[200px] md:w-[220px] shrink-0 flex justify-center">
            <div 
              style={{
                transform: `translate3d(0, ${videoParallaxY}px, 0)`,
                transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              className="relative w-full max-w-[230px] sm:max-w-none aspect-[9/16] rounded-2xl overflow-hidden bg-[#0a0a0f] border border-white/15 shadow-[0_12px_30px_rgba(0,0,0,0.7)] group-hover:border-[#437ceb]/50 transition-colors duration-500"
            >
              <video
                ref={videoRef}
                src={videoSrc}
                poster={posterSrc}
                muted
                loop
                playsInline
                preload="auto"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />

              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none"></div>
            </div>
          </div>

          {/* Columna de Información */}
          <div className="flex-1 flex flex-col justify-center w-full py-2 sm:py-4 text-left">
            
            {/* Pastilla Azul */}
            <div 
              style={{
                transform: `translate3d(0, ${isEntered ? 0 : 14}px, 0)`,
                opacity: isEntered ? 1 : 0,
                transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1) 60ms, opacity 0.35s ease 60ms'
              }}
              className="mb-4"
            >
              <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-poppins font-semibold bg-[#437ceb] text-white shadow-[0_4px_14px_rgba(67,124,235,0.4)]">
                {badge}
              </span>
            </div>

            {/* Título */}
            <h3 
              style={{
                transform: `translate3d(0, ${isEntered ? 0 : 16}px, 0)`,
                opacity: isEntered ? 1 : 0,
                transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) 120ms, opacity 0.4s ease 120ms'
              }}
              className="font-poppins text-xl sm:text-2xl font-bold text-white tracking-tight mb-5"
            >
              {title}
            </h3>

            {/* Lista de características */}
            <ul className="space-y-4">
              {features.map((item, idx) => {
                const itemDelay = 180 + idx * 90;
                return (
                  <li 
                    key={idx}
                    style={{
                      transform: `translate3d(${isEntered ? 0 : 18}px, 0, 0)`,
                      opacity: isEntered ? 1 : 0,
                      transition: `transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${itemDelay}ms, opacity 0.4s ease ${itemDelay}ms`,
                    }}
                    className="group/item flex items-start gap-3"
                  >
                    <CheckIcon active={isEntered} delay={itemDelay} />
                    <span className="font-gilroy text-sm sm:text-[15px] text-gray-300 leading-snug group-hover/item:text-white transition-colors duration-200">
                      {item}
                    </span>
                  </li>
                );
              })}
            </ul>

          </div>

        </div>
      </div>
    </div>
  );
};

// Componente Principal de la Sección Ads
export default function AdsSection() {
  const sectionRef = useRef(null);
  const [headerProgress, setHeaderProgress] = useState(0);

  useEffect(() => {
    let rafId = null;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const start = windowHeight * 0.92;
      const end = windowHeight * 0.42;
      const rawProgress = (start - rect.top) / (start - end);
      const clamped = Math.max(0, Math.min(1, rawProgress));
      const eased = 1 - Math.pow(1 - clamped, 3);

      setHeaderProgress(eased);
    };

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    handleScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const headerTranslateY = (1 - headerProgress) * 35;
  const headerScale = 0.97 + headerProgress * 0.03;

  return (
    <section 
      ref={sectionRef}
      id="ads" 
      className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 bg-[#0a0a0f] overflow-hidden"
    >
      {/* Línea divisoria superior con expansión ligada al scroll */}
      <div 
        style={{ transform: `translateX(-50%) scaleX(${0.2 + headerProgress * 0.8})` }}
        className="absolute top-0 left-1/2 w-full max-w-[1000px] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent origin-center"
      />

      {/* Resplandor ambiental de fondo optimizado */}
      <div 
        style={{
          transform: `translate(-50%, -50%) scale(${0.85 + headerProgress * 0.2})`,
          opacity: headerProgress * 0.75,
        }}
        className="absolute top-1/3 left-1/2 w-[500px] lg:w-[850px] h-[400px] bg-[#a100ff]/[0.06] rounded-full blur-[130px] pointer-events-none transition-transform duration-150 ease-out"
      />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* ENCABEZADO Y DESCRIPCIÓN VINCULADOS AL SCROLL */}
        <div 
          style={{
            transform: `translate3d(0, ${headerTranslateY}px, 0) scale(${headerScale})`,
            opacity: Math.min(1, 0.15 + headerProgress * 0.85),
            transformOrigin: 'left bottom',
            willChange: 'transform, opacity'
          }}
          className="max-w-3xl mb-12 sm:mb-16"
        >
          <h2 className="font-poppins text-2xl sm:text-4xl lg:text-[42px] font-bold text-white tracking-tight leading-tight mb-5">
            Tu nuevo <span className="text-[#a100ff]">canal de comunicación</span>
          </h2>

          <p className="font-gilroy text-base sm:text-lg lg:text-[19px] text-gray-300 leading-relaxed">
            <span className="text-[#a100ff] font-bold">DOMA</span> está presente justo en el momento en que tu cliente interactúa con tu marca y donde es más receptivo a información. En este momento Doma puede mostrarles{' '}
            <span className="text-[#a100ff] font-semibold">promociones</span>,{' '}
            <span className="text-[#a100ff] font-semibold">lanzamientos</span> o{' '}
            <span className="text-[#a100ff] font-semibold">campañas</span> de acuerdo a tus necesidades. Además, cuenta con dos modalidades para no interrumpir la interacción con el usuario.
          </p>
        </div>

        {/* ETIQUETA SUPERIOR DEL DIAGRAMA CON BARRA DE PROGRESO */}
        <div 
          style={{
            transform: `translate3d(0, ${(1 - headerProgress) * 18}px, 0)`,
            opacity: headerProgress,
          }}
          className="mb-6 flex items-center gap-4"
        >
          <span className="font-poppins text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#8257e6]">
            Dos momentos, dos formatos
          </span>
          <div className="h-[2px] flex-1 max-w-[140px] bg-white/10 overflow-hidden rounded-full">
            <div 
              style={{ width: `${headerProgress * 100}%` }}
              className="h-full bg-gradient-to-r from-[#a100ff] to-[#437ceb] transition-all duration-75"
            />
          </div>
        </div>

        {/* GRID DE LAS 2 MODALIDADES (Estado A y Estado B) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Tarjeta 1: Estado A */}
          <AdModeCard
            index={0}
            badge="Estado A"
            title="En conversación"
            videoSrc="/ASSET 2 SITIO DOMA.mp4" 
            posterSrc="/TOTEM DOMA SITIO.webp"
            features={[
              "Franja inferior de la pantalla",
              "Corre en paralelo, sin interrumpir",
              "Máximo 2 piezas por conversación"
            ]}
          />

          {/* Tarjeta 2: Estado B */}
          <AdModeCard
            index={1}
            badge="Estado B"
            title="En reposo"
            videoSrc="/ASSET 1 SITIO DOMA.mp4"
            posterSrc="/TOTEM DOMA SITIO.webp"
            features={[
              "Pantalla completa",
              "Solo cuando nadie está frente al tótem",
              "Rotación continua en ciclos cortos"
            ]}
          />

        </div>

      </div>
    </section>
  );
}