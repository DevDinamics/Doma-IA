import React, { useEffect, useState, useRef } from 'react';

// Sub-componente para cada tarjeta individual con estética Apple Bento
const MetricCard = ({ 
  target, 
  prefix = "", 
  suffix = "", 
  unit = "",
  text, 
  isGradient = false, 
  glowColor = "from-[#a100ff]/20", 
  delay = 0 
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime = null;
    const duration = 2000; // 2 segundos exactos con curva suave Apple

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Apple-style Custom Ease Out Expo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(Math.floor(easeProgress * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    const timer = setTimeout(() => {
      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timer);
  }, [isVisible, target, delay]);

  return (
    <div
      ref={cardRef}
      style={{ 
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
      }}
      className={`group relative p-7 sm:p-8 xl:p-9 rounded-[28px] sm:rounded-[32px] bg-[#12121a]/70 backdrop-blur-xl border border-white/[0.07] flex flex-col items-center justify-between text-center overflow-hidden transition-all duration-1000 will-change-transform
        ${isVisible 
          ? 'translate-y-0 scale-100 opacity-100 blur-0' 
          : 'translate-y-12 scale-[0.94] opacity-0 blur-md'}
        hover:border-white/[0.15] hover:bg-[#161622]/90 hover:-translate-y-1.5 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)]
      `}
    >
      {/* Reflejo especular superior (Estilo cristal Apple) */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Resplandor ambiental interno sutil */}
      <div className={`absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-gradient-to-b ${glowColor} to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}></div>

      {/* Contenedor de la cifra principal (nunca se desborda) */}
      <div className="relative z-10 flex items-baseline justify-center gap-1.5 my-2 sm:my-3 w-full">
        <span 
          className={`font-poppins text-4xl sm:text-5xl lg:text-[44px] xl:text-[54px] font-bold tracking-tighter leading-none tabular-nums transition-transform duration-500 ease-out group-hover:scale-[1.03] ${
            isGradient 
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#a100ff] via-[#b656ff] to-[#437ceb]' 
              : 'text-white'
          }`}
        >
          {prefix}{count}{suffix}
        </span>

        {/* Unidad opcional (ej. MXN) estilizada para que no rompa la caja */}
        {unit && (
          <span className="font-poppins text-lg sm:text-xl xl:text-2xl font-bold tracking-tight text-[#b656ff]">
            {unit}
          </span>
        )}
      </div>

      {/* Copy descriptivo minimalista */}
      <p className="relative z-10 font-gilroy text-gray-400 text-[11px] sm:text-xs uppercase tracking-[0.16em] leading-relaxed max-w-[230px] mt-3 group-hover:text-gray-200 transition-colors duration-300">
        {text}
      </p>
    </div>
  );
};

// Componente Principal
export default function MetricsGrid() {
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="metrics" className="relative py-20 sm:py-28 lg:py-36 px-4 sm:px-6 bg-[#0a0a0f] overflow-hidden">
      
      {/* Línea divisoria superior minimalista */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      <div className="max-w-6xl xl:max-w-7xl mx-auto relative z-10">
        
        {/* Encabezado introductorio con revelado tipo Keynote */}
        <div 
          ref={headerRef}
          style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
          className={`text-center max-w-4xl mx-auto mb-14 sm:mb-20 transition-all duration-1000 transform
            ${headerVisible ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-8 opacity-0 blur-sm'}
          `}
        >
          <h2 className="font-poppins text-2xl sm:text-3xl lg:text-[40px] font-bold text-white tracking-tight leading-[1.25] sm:leading-[1.2]">
            En el <span className="text-[#a100ff]">mundo digital</span>, las empresas aprendieron cómo estar siempre disponibles... en el{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a100ff] via-[#b656ff] to-[#437ceb]">
              mundo físico no.
            </span>
          </h2>
        </div>

        {/* Retícula Bento Responsiva (1 col en móvil, 2 en tablet, 4 en desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Tarjeta 1: 78% */}
          <MetricCard 
            target={78} 
            suffix="%" 
            text="De los clientes elige a la marca que responde primero" 
            glowColor="from-[#ff498b]/25"
            delay={100}
          />
          
          {/* Tarjeta 2: 70% */}
          <MetricCard 
            target={70} 
            suffix="%" 
            text="De las consultas en sucursal nunca reciben respuesta" 
            glowColor="from-[#a100ff]/25"
            delay={220}
          />
          
          {/* Tarjeta 3: ~30% */}
          <MetricCard 
            target={30} 
            prefix="~"
            suffix="%" 
            text="Rotación anual de personal operativo" 
            glowColor="from-[#a100ff]/25"
            delay={340}
          />
          
          {/* Tarjeta 4: $200K MXN (Ahora también anima de $0K a $200K MXN y cabe perfecto) */}
          <MetricCard 
            target={200} 
            prefix="$"
            suffix="K"
            unit="MXN"
            text="Costo promedio por reemplazar una posición" 
            isGradient={true}
            glowColor="from-[#437ceb]/30"
            delay={460}
          />

        </div>
      </div>
    </section>
  );
}