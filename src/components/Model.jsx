import React, { useEffect, useRef, useState } from 'react';

export default function Model() {
  const [isVisible, setIsVisible] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="modelo" className="relative py-24 md:py-32 px-6 bg-slate-50 dark:bg-[#0a0a0f] overflow-hidden transition-colors duration-300">
      
      {/* Ambient Lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#a100ff]/[0.06] dark:bg-[#a100ff]/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* HEADER */}
        <div 
          ref={headerRef}
          className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
        >
          <span className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#8a00ff] via-[#6340f2] to-[#3b82f6] text-white text-xs sm:text-sm font-gilroy font-bold uppercase tracking-widest mb-6 inline-block shadow-[0_0_24px_rgba(138,0,255,0.4)]">
            El modelo
          </span>
          
          <h2 className="font-poppins text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-[1.1] mb-6 transition-colors duration-300">
            Siempre disponible.<br/>
            <span className="text-slate-400 dark:text-gray-500 transition-colors duration-300">Siempre preparado.</span><br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a100ff] to-[#437ceb]">
              Siempre consistente.
            </span>
          </h2>
          
          <p className="font-gilroy text-lg md:text-xl text-slate-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors duration-300">
            Doma trabaja 24/7, siempre está actualizado y responde de forma consistente.
          </p>
        </div>

      </div>
    </section>
  );
}