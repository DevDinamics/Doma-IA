import React, { useEffect, useState, useRef } from 'react';

// Sub-componente para cada tarjeta individual
const MetricCard = ({ target, suffix = "", text, textColor, glowColor, delay, isStatic }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    // El "vigilante" para saber cuándo la tarjeta entra en la pantalla
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Dejar de observar una vez que ya apareció
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
    const duration = 2500; // 2.5 segundos de animación

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Fórmula matemática "Ease-Out Expo" para que frene elegante al final
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

  const displayValue = isStatic ? target : `${count}${suffix}`;

  return (
    <div
      ref={cardRef}
      className={`relative p-10 rounded-[32px] bg-white/[0.02] border border-white/5 flex flex-col items-center text-center group overflow-hidden transform transition-all duration-1000 ease-out will-change-transform
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}
        hover:bg-white/[0.04] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Línea láser superior que brilla al hacer hover */}
      <div className={`absolute top-0 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent ${glowColor} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
      
      {/* Brillo de fondo difuminado en hover */}
      <div className={`absolute inset-0 bg-gradient-to-b ${glowColor.replace('via-', 'from-').replace('to-transparent', '')} opacity-0 group-hover:opacity-10 transition-opacity duration-700 blur-2xl pointer-events-none`}></div>

      <span className={`relative z-10 font-poppins text-6xl md:text-7xl font-bold mb-4 drop-shadow-xl transition-transform duration-500 group-hover:scale-110 ${textColor}`}>
        {displayValue}
      </span>
      <p className="relative z-10 font-gilroy text-gray-400 text-xs uppercase tracking-[2px] leading-relaxed max-w-[200px] group-hover:text-gray-200 transition-colors duration-300">
        {text}
      </p>
    </div>
  );
};

// Componente Principal que agrupa las 4 tarjetas
export default function MetricsGrid() {
  return (
    <section id="metrics" className="relative py-32 px-6 bg-[#0a0a0f] overflow-hidden">
      
      {/* Luz de ambiente de fondo para unir la sección con el Hero */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <MetricCard 
            target={78} 
            suffix="%" 
            text="De prospectos elige a quien responde primero" 
            textColor="text-white group-hover:text-white"
            glowColor="via-[#a100ff]"
            delay={0} // Sale primero
          />
          
          <MetricCard 
            target={70} 
            suffix="%" 
            text="De consultas en tienda nunca reciben respuesta" 
            textColor="text-white group-hover:text-white"
            glowColor="via-[#437ceb]"
            delay={200} // Sale segundo
          />
          
          <MetricCard 
            target="24/7" 
            text="Disponibilidad garantizada, sin turnos ni ausencias" 
            textColor="text-[#a100ff] group-hover:text-[#b433ff]" // Usamos el morado de doma
            glowColor="via-[#a100ff]"
            delay={400} // Sale tercero
            isStatic={true} // Este no cuenta porque tiene texto
          />
          
          <MetricCard 
            target={100} 
            suffix="%" 
            text="Del conocimiento de tu empresa en cada punto" 
            textColor="text-white group-hover:text-white"
            glowColor="via-white"
            delay={600} // Sale último
          />

        </div>
      </div>
    </section>
  );
}