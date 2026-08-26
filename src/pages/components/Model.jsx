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
    <section id="modelo" className="relative py-24 md:py-32 px-6 bg-[#0a0a0f] overflow-hidden">
      
      {/* Ambient Lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#a100ff]/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* HEADER */}
        <div 
          ref={headerRef}
          className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
        >
          <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-gray-300 text-sm font-gilroy font-bold uppercase tracking-widest mb-6 inline-block">
            El modelo
          </span>
          <h2 className="font-poppins text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
            Siempre disponible.<br/>
            <span className="text-gray-500">Siempre preparado.</span><br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a100ff] to-[#437ceb]">
              Siempre consistente.
            </span>
          </h2>
          <p className="font-gilroy text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Un Digital Sales Executive que no descansa, no olvida y no improvisa.
          </p>
        </div>

      </div>
    </section>
  );
}