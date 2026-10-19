import React, { useEffect, useState, useRef } from 'react';

// Sub-componente para cada tarjeta individual
const MetricCard = ({ 
  target, 
  prefix = "", 
  suffix = "", 
  text, 
  textColor = "text-white", 
  glowColor, 
  delay = 0, 
  isStatic = false 
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
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || isStatic) return;

    let startTime = null;
    const duration = 2200; // Duración fluida de conteo

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Función de desaceleración suave "Ease-Out Expo"
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(Math.floor(easeProgress * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, target, isStatic]);

  const displayValue = isStatic ? target : `${prefix}${count}${suffix}`;

  return (
    <div
      ref={cardRef}
      className={`relative p-8 lg:p-10 rounded-[32px] bg-white/[0.02] border border-white/5 flex flex-col items-center justify-center text-center group overflow-hidden transform transition-all duration-1000 ease-out will-change-transform
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}
        hover:bg-white/[0.04] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Línea de resplandor superior al hacer hover */}
      <div className={`absolute top-0 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent ${glowColor} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
      
      {/* Brillo ambiental de fondo */}
      <div className={`absolute inset-0 bg-gradient-to-b ${glowColor.replace('via-', 'from-').replace('to-transparent', '')} opacity-0 group-hover:opacity-10 transition-opacity duration-700 blur-2xl pointer-events-none`}></div>

      {/* Cifra de la métrica */}
      <span className={`relative z-10 font-poppins text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 drop-shadow-xl transition-transform duration-500 group-hover:scale-105 whitespace-nowrap ${textColor}`}>
        {displayValue}
      </span>

      {/* Copy descriptivo */}
      <p className="relative z-10 font-gilroy text-gray-400 text-xs uppercase tracking-[2px] leading-relaxed max-w-[220px] group-hover:text-gray-200 transition-colors duration-300">
        {text}
      </p>
    </div>
  );
};

// Componente Principal
export default function MetricsGrid() {
  return (
    <section id="metrics" class="relative py-24 lg:py-32 px-6 bg-[#0a0a0f] overflow-hidden">
      
      {/* Línea divisoria superior con degradado */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Encabezado introductorio */}
        <div className="text-center max-w-4xl mx-auto mb-16 lg:mb-20">
          <h2 className="font-poppins text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-snug">
            En el <span className="text-[#a100ff]">mundo digital</span>, las empresas aprendieron cómo estar siempre disponibles... en el <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a100ff] to-[#437ceb]">mundo físico no</span>
          </h2>
        </div>

        {/* Retícula con las 4 tarjetas de métricas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Tarjeta 1: 78% */}
          <MetricCard 
            target={78} 
            suffix="%" 
            text="De los clientes elige a la marca que responde primero" 
            textColor="text-white group-hover:text-white"
            glowColor="via-[#ff498b]"
            delay={0}
          />
          
          {/* Tarjeta 2: 70% */}
          <MetricCard 
            target={70} 
            suffix="%" 
            text="De las consultas en sucursal nunca reciben respuesta" 
            textColor="text-white group-hover:text-white"
            glowColor="via-[#a100ff]"
            delay={150}
          />
          
          {/* Tarjeta 3: ~30% */}
          <MetricCard 
            target={30} 
            prefix="~"
            suffix="%" 
            text="Rotación anual de personal operativo" 
            textColor="text-white group-hover:text-white"
            glowColor="via-[#a100ff]"
            delay={300}
          />
          
          {/* Tarjeta 4: $200K MXN */}
          <MetricCard 
            target="$200K MXN" 
            text="Costo promedio por reemplazar una posición" 
            textColor="text-transparent bg-clip-text bg-gradient-to-r from-[#a100ff] to-[#b656ff]"
            glowColor="via-[#437ceb]"
            delay={450}
            isStatic={true}
          />

        </div>
      </div>
    </section>
  );
}