import React, { useEffect, useState, useRef } from 'react';

// Ícono minimalista de Check circular con trazado SVG nítido
const CheckIcon = ({ active, delay = 0 }) => (
  <svg 
    className={`w-5 h-5 text-[#8257e6] shrink-0 mt-0.5 transition-transform duration-300 ${
      active ? 'scale-100' : 'scale-75'
    }`} 
    style={{ transitionDelay: `${delay}ms` }}
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    strokeWidth="2.2"
  >
    <circle 
      cx="12" 
      cy="12" 
      r="9" 
      className="transition-opacity duration-300"
      style={{ stroke: 'rgba(130, 87, 230, 0.35)', opacity: active ? 1 : 0.2 }}
    />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M8.5 12.5l2.5 2.5 4.5-5.5"
      style={{
        strokeDasharray: 20,
        strokeDashoffset: active ? 0 : 20,
        transition: `stroke-dashoffset 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${delay + 80}ms`
      }}
    />
  </svg>
);

// Sub-componente para cada tarjeta con Scroll-Scrubbing acelerado por hardware
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
  const [isEntered, setIsEntered] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const cardEl = cardRef.current;
    if (!cardEl) return;

    // IntersectionObserver para pausar y reproducir video sin costo de CPU
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
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
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(cardEl);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    const rotateY = ((x - 50) / 50) * 2.5; 
    const rotateX = ((50 - y) / 50) * 2.5; 

    setMousePos({ x, y });
    cardRef.current.style.setProperty('--card-rot-x', `${rotateX}deg`);
    cardRef.current.style.setProperty('--card-rot-y', `${rotateY}deg`);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardRef.current) {
      cardRef.current.style.setProperty('--card-rot-x', '0deg');
      cardRef.current.style.setProperty('--card-rot-y', '0deg');
    }
  };

  return (
    <div style={{ perspective: '1000px' }}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `translate3d(0, ${isEntered ? '0px' : '24px'}, 0) rotateX(var(--card-rot-x, 0deg)) rotateY(var(--card-rot-y, 0deg))`,
          opacity: isEntered ? 1 : 0.6,
          willChange: 'transform, opacity',
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden'
        }}
        className="group relative rounded-[28px] sm:rounded-[32px] p-5 sm:p-7 bg-white/95 dark:bg-[#12121c]/95 border border-slate-200/90 dark:border-white/[0.09] hover:border-[#8257e6]/50 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.5)] transition-[transform,opacity,border-color] duration-500 ease-out"
      >
        {/* Spotlight interactivo optimizado */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-200 z-0"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(350px circle at ${mousePos.x}% ${mousePos.y}%, rgba(130, 87, 230, 0.1), transparent 70%)`,
          }}
        />

        {/* Línea de luz superior decorativa */}
        <div 
          className="absolute top-0 inset-x-8 h-[1.5px] bg-gradient-to-r from-transparent via-[#a100ff]/60 to-transparent origin-center"
        />

        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-stretch gap-6 sm:gap-7">
          
          {/* Contenedor del Video */}
          <div className="w-full sm:w-[200px] md:w-[220px] shrink-0 flex justify-center">
            <div 
              style={{ transform: 'translateZ(0)' }}
              className="relative w-full max-w-[230px] sm:max-w-none aspect-[9/16] rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/50 dark:border-white/15 shadow-md group-hover:border-[#437ceb]/50 transition-colors duration-300"
            >
              <video
                ref={videoRef}
                src={videoSrc}
                poster={posterSrc}
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />

              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/10 dark:ring-white/10 pointer-events-none"></div>
            </div>
          </div>

          {/* Columna de Información */}
          <div className="flex-1 flex flex-col justify-center w-full py-2 sm:py-4 text-left">
            
            {/* Pastilla Azul */}
            <div 
              style={{
                transform: `translate3d(0, ${isEntered ? 0 : 10}px, 0)`,
                opacity: isEntered ? 1 : 0,
                transition: 'transform 0.4s ease 40ms, opacity 0.3s ease 40ms'
              }}
              className="mb-4"
            >
              <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-poppins font-semibold bg-[#437ceb] text-white shadow-[0_4px_12px_rgba(67,124,235,0.3)]">
                {badge}
              </span>
            </div>

            {/* Título */}
            <h3 
              style={{
                transform: `translate3d(0, ${isEntered ? 0 : 12}px, 0)`,
                opacity: isEntered ? 1 : 0,
                transition: 'transform 0.45s ease 80ms, opacity 0.35s ease 80ms'
              }}
              className="font-poppins font-semibold text-xl sm:text-2xl text-slate-900 dark:text-white tracking-tight mb-5"
            >
              {title}
            </h3>

            {/* Lista de características */}
            <ul className="space-y-3.5">
              {features.map((item, idx) => {
                const itemDelay = 120 + idx * 70;
                return (
                  <li 
                    key={idx}
                    style={{
                      transform: `translate3d(${isEntered ? 0 : 12}px, 0, 0)`,
                      opacity: isEntered ? 1 : 0,
                      transition: `transform 0.45s ease ${itemDelay}ms, opacity 0.35s ease ${itemDelay}ms`,
                    }}
                    className="group/item flex items-start gap-3"
                  >
                    <CheckIcon active={isEntered} delay={itemDelay} />
                    <span className="font-gilroy font-normal text-sm sm:text-[15px] text-slate-600 dark:text-gray-300 leading-snug group-hover/item:text-slate-900 dark:group-hover/item:text-white transition-colors duration-200">
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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="ads" 
      className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 bg-slate-50 dark:bg-[#0a0a0f] overflow-hidden"
    >
      {/* Línea divisoria superior */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-px bg-gradient-to-r from-transparent via-slate-300/60 dark:via-white/15 to-transparent origin-center pointer-events-none"
      />

      {/* Resplandor ambiental de fondo */}
      <div 
        style={{ transform: 'translate3d(-50%, -50%, 0)' }}
        className="absolute top-1/3 left-1/2 w-[500px] lg:w-[850px] h-[400px] bg-[#a100ff]/[0.04] dark:bg-[#a100ff]/[0.05] rounded-full blur-[100px] pointer-events-none"
      />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Encabezado */}
        <div 
          style={{
            transform: `translate3d(0, ${isVisible ? '0px' : '20px'}, 0)`,
            opacity: isVisible ? 1 : 0,
            willChange: 'transform, opacity'
          }}
          className="text-center sm:text-left max-w-3xl mb-12 sm:mb-16 mx-auto sm:mx-0 transition-[transform,opacity] duration-500 ease-out"
        >
          <span className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#8a00ff] via-[#6340f2] to-[#3b82f6] text-white text-xs sm:text-sm font-poppins font-semibold uppercase tracking-widest mb-6 inline-block shadow-[0_0_24px_rgba(138,0,255,0.4)]">
            DOMA ADS
          </span>

          <h2 className="font-poppins font-bold text-3xl sm:text-4xl lg:text-[42px] text-slate-900 dark:text-white tracking-tight leading-tight mb-5">
            Tu nuevo <span className="text-[#a100ff]">canal de comunicación</span>
          </h2>

          <p className="font-gilroy font-normal text-base sm:text-lg lg:text-[19px] text-slate-600 dark:text-gray-300 leading-relaxed max-w-2xl text-pretty">
            <span className="text-[#a100ff] font-bold">DOMA</span> está presente en el momento en que un usuario interactúa con tu marca. <span className="text-[#a100ff] font-bold">DOMA</span> puede mostrar{' '}
            <span className="text-[#a100ff] font-semibold">promociones</span> o{' '}
            <span className="text-[#a100ff] font-semibold">campañas</span> de acuerdo a tus necesidades sin interrumpir la conversación.
          </p>
        </div>

        {/* Etiqueta superior de las modalidades */}
        <div 
          style={{
            transform: `translate3d(0, ${isVisible ? '0px' : '15px'}, 0)`,
            opacity: isVisible ? 1 : 0,
          }}
          className="mb-6 flex items-center gap-4 transition-[transform,opacity] duration-500 delay-100 ease-out"
        >
          <span className="font-poppins font-semibold text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#8257e6]">
            Dos momentos, dos formatos
          </span>
          <div className="h-[2px] flex-1 max-w-[140px] bg-slate-200 dark:bg-white/10 overflow-hidden rounded-full">
            <div 
              style={{ width: isVisible ? '100%' : '0%' }}
              className="h-full bg-gradient-to-r from-[#a100ff] to-[#437ceb] transition-[width] duration-700 ease-out"
            />
          </div>
        </div>

        {/* Grid de las 2 modalidades */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
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