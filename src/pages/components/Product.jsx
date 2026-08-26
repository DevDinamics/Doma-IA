import React, { useEffect, useRef, useState } from 'react';

// --- 1. COMPONENTE DE TARJETA INDIVIDUAL (GLASSMORPHISM) ---
const ProductCard = ({ number, title, description, colorClasses, index, totalCards }) => {
  const cardRef = useRef(null);
  const trackerRef = useRef(null); 
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [stickyConfig, setStickyConfig] = useState({ top: 120, offset: 40 });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setStickyConfig({ top: 80, offset: 25 }); 
      } else {
        setStickyConfig({ top: 160, offset: 40 }); 
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!trackerRef.current) return;
      const rect = trackerRef.current.getBoundingClientRect();
      
      const stickyTop = stickyConfig.top + (index * stickyConfig.offset);
      
      if (rect.top < stickyTop) {
        const overScroll = stickyTop - rect.top;
        const progress = Math.min(overScroll / 350, 1); 
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, [index, stickyConfig]);

  const isLast = index === totalCards - 1;
  const scale = 1 - (scrollProgress * 0.06); 
  const translateY = scrollProgress * -25; 
  const brightness = 1 - (scrollProgress * 0.3); 

  return (
    <div className="relative w-full">
      <div ref={trackerRef} className="absolute w-full h-px -top-8 pointer-events-none" />
      
      <div 
        className="sticky z-10 w-full" 
        style={{ top: `${stickyConfig.top + index * stickyConfig.offset}px` }}
      >
        <div 
          className="w-full origin-top will-change-transform"
          style={{
            transform: isLast ? 'none' : `scale(${scale}) translateY(${translateY}px)`,
            filter: isLast ? 'none' : `brightness(${brightness})`,
            transition: 'transform 0.1s ease-out, filter 0.1s ease-out',
          }}
        >
          <div
            ref={cardRef}
            className={`relative p-8 sm:p-10 md:p-12 rounded-[32px] overflow-hidden transform transition-all duration-1000 ease-out group
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'}
              bg-white/[0.03] backdrop-blur-3xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]
              hover:bg-white/[0.05] hover:border-white/20
            `}
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <div className={`absolute -top-24 -right-24 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-bl ${colorClasses.bg} to-transparent rounded-full blur-[80px] opacity-20 pointer-events-none z-0 transition-opacity duration-500 group-hover:opacity-40`}></div>

            <span className={`relative z-10 font-gilroy text-xs sm:text-sm font-bold tracking-[3px] uppercase mb-5 block ${colorClasses.text}`}>
              {number}
            </span>
            <h3 className="relative z-10 font-poppins text-2xl sm:text-3xl font-semibold text-white mb-4 leading-tight">
              {title}
            </h3>
            <p className="relative z-10 font-gilroy text-gray-300 leading-relaxed text-base sm:text-lg">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


// --- 2. SECCIÓN PRINCIPAL (La que se te había borrado jeje) ---
export default function Product() {
  // Asegúrate de que todas tengan el campo 'number'
 const cards = [
    {
      tag: "PILAR 01",
      title: "Tótem físico diseñado para entornos reales",
      description: "Hardware universal equipado con un arreglo de micrófonos direccionales que capturan la voz humana con precisión en lugares concurridos y ruidosos.",
      colorClasses: { bg: "from-[#a100ff]/50", text: "text-[#a100ff]", border: "hover:border-[#a100ff]/40" }
    },
    {
      tag: "PILAR 02",
      title: "Conversación natural por voz y pantalla",
      description: "Un avatar con la voz y personalidad de tu marca que responde al instante, proyecta imágenes de productos y guía al cliente en su decisión.",
      colorClasses: { bg: "from-[#437ceb]/50", text: "text-[#437ceb]", border: "hover:border-[#437ceb]/40" }
    },
    {
      tag: "PILAR 03",
      title: "Integración directa a tu información en la nube",
      description: "DOMA se conecta a tus inventarios, bases de datos y sistemas CRM. Cualquier cambio de precio o política se refleja de inmediato en todos tus tótems.",
      colorClasses: { bg: "from-[#906ef7]/50", text: "text-[#906ef7]", border: "hover:border-[#906ef7]/40" }
    }
  ];

  return (
    <section id="producto" className="relative py-20 lg:py-32 px-4 sm:px-6 bg-[#0a0a0f] overflow-hidden">     
      {/* Efectos de luz de fondo globales */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#a100ff]/20 to-transparent"></div>
      <div className="absolute top-1/4 -left-[10%] lg:-left-[20%] w-[300px] lg:w-[800px] h-[300px] lg:h-[800px] bg-[#a100ff]/5 rounded-full blur-[100px] lg:blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative items-start">
          
          {/* COLUMNA IZQUIERDA: Textos y Tótem */}
          <div className="w-full lg:w-5/12 flex flex-col items-center text-center lg:items-start lg:text-left lg:sticky lg:top-32 z-10 mb-10 lg:mb-0">
            <span className="px-4 py-1.5 rounded-full border border-[#a100ff]/30 bg-[#a100ff]/10 text-[#a100ff] text-xs sm:text-sm font-gilroy font-bold uppercase tracking-widest mb-6 lg:mb-8 inline-block shadow-[0_0_15px_rgba(161,0,255,0.2)]">
              El producto
            </span>
            
            <h2 className="font-poppins text-4xl sm:text-5xl lg:text-[52px] font-bold text-white leading-[1.1] mb-4 lg:mb-6 tracking-tighter">
              No es un chatbot.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a100ff] to-[#437ceb]">
                Es un Digital Sales Executive.
              </span>
            </h2>
            
            <p className="font-gilroy text-lg sm:text-xl text-gray-400 mb-8 lg:mb-6 max-w-md lg:max-w-none">
              Tres capacidades que ningún competidor global tiene juntas.
            </p>

            {/* Tótem DOMA  */}
<div className="relative animate-fade-in delay-300 w-full max-w-[320px] sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto lg:mx-0 select-none">
  <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] flex items-center justify-center group">
    
    {/* 1. ONDAS DE RADAR / DETECCIÓN SENSOR (Fondo) */}
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="w-[110%] h-[110%] rounded-full border border-white/[0.04] animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>
      <div className="w-[85%] h-[85%] rounded-full border border-[#a100ff]/15 animate-[spin_25s_linear_infinite]"></div>
      <div className="w-[60%] h-[60%] rounded-full border border-dashed border-[#437ceb]/20 animate-[spin_35s_linear_infinite_reverse]"></div>
    </div>

    {/* 2. GLOW DE PANTALLA Y VOLUMEN */}
    <div className="absolute top-12 sm:top-16 w-48 sm:w-64 h-64 bg-gradient-to-tr from-[#a100ff]/30 via-[#b656ff]/20 to-[#437ceb]/25 rounded-full blur-[80px] lg:blur-[100px] pointer-events-none"></div>

    {/* 3. PLATAFORMA DE PISO (Anclaje al suelo) */}
    <div className="absolute bottom-4 sm:bottom-6 w-[80%] h-12 bg-gradient-to-t from-[#a100ff]/30 via-[#437ceb]/10 to-transparent rounded-[100%] blur-xl opacity-80 pointer-events-none"></div>
    <div className="absolute bottom-6 sm:bottom-8 w-[65%] h-5 border border-white/10 bg-white/[0.02] backdrop-blur-sm rounded-[100%] pointer-events-none shadow-[0_0_20px_rgba(161,0,255,0.2)]"></div>

    

    

    {/* 6. IMAGEN PRINCIPAL */}
    <div 
      className="relative z-10 w-full h-full flex items-center justify-center"
      style={{ 
        maskImage: 'linear-gradient(to top, transparent 0%, black 8%, black 100%)', 
        WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 8%, black 100%)'
      }}
    >
      <img 
        src="/TOTEM DOMA SITIO 2.webp" 
        alt="DOMA — Digital Sales Executive Tótem Físico Pulido"
        className="w-full h-full object-contain object-bottom group-hover:scale-[1.02] transition-transform duration-700 brightness-105 contrast-110 drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
        style={{ mixBlendMode: 'screen' }}
      />
    </div>

  </div>
</div>
          </div>

          {/* COLUMNA DERECHA: Las Tarjetas Stacking */}
          <div className="w-full lg:w-7/12 flex flex-col gap-8 lg:gap-16 z-10 relative">
            {cards.map((card, idx) => (
              <ProductCard 
                key={idx}
                index={idx}
                totalCards={cards.length}
                number={card.number}
                title={card.title}
                description={card.description}
                colorClasses={card.colorClasses}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}