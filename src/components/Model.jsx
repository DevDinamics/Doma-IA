import React, { useEffect, useRef, useState } from 'react';
import ScrollFloat from './ScrollFloat.jsx';

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
    <section 
      id="modelo" 
      className="relative pt-10 pb-16 md:pt-14 md:pb-20 px-6 bg-slate-50 dark:bg-[#0a0a0f] overflow-hidden transition-colors duration-300"
    >
      {/* Luces ambientales */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[250px] bg-[#a100ff]/[0.05] dark:bg-[#a100ff]/10 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div 
          ref={headerRef}
          className={`text-center transform transition-all duration-700 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          {/* Bloque de las 3 frases */}
          <div className="font-poppins text-4xl md:text-5xl lg:text-[58px] font-bold leading-[1.18] mb-5 flex flex-col items-center justify-center gap-1 sm:gap-1.5 select-none tracking-tight">
            
            {/* Frase 1: Blanco / Slate oscuro */}
            <ScrollFloat
              effect="float"
              splitBy="chars"
              direction="up"
              order="start"
              fromColor="currentColor"
              animationDuration={1}
              ease="back.inOut(2)"
              scrollStart="center bottom+=50%"
              scrollEnd="bottom bottom-=40%"
              stagger={0.03}
              distance={120}
              stretch={2.3}
              smoothing={0}
              containerClassName="!m-0 !overflow-visible"
              textClassName="text-slate-900 dark:text-white transition-colors duration-300 inline-block py-0.5"
            >
              Siempre disponible
            </ScrollFloat>
            
            {/* Frase 2: Gris */}
            <ScrollFloat
              effect="float"
              splitBy="chars"
              direction="up"
              order="start"
              fromColor="currentColor"
              animationDuration={1}
              ease="back.inOut(2)"
              scrollStart="center bottom+=50%"
              scrollEnd="bottom bottom-=40%"
              stagger={0.03}
              distance={120}
              stretch={2.3}
              smoothing={0}
              containerClassName="!m-0 !overflow-visible"
              textClassName="text-slate-500 dark:text-[#60606a] transition-colors duration-300 inline-block py-0.5"
            >
              Siempre preparado
            </ScrollFloat>
            
            {/* Frase 3: Degradado continuo */}
            <div className="gradient-phrase-wrapper inline-block py-0.5">
              <ScrollFloat
                effect="float"
                splitBy="chars"
                direction="up"
                order="start"
                fromColor="currentColor"
                animationDuration={1}
                ease="back.inOut(2)"
                scrollStart="center bottom+=50%"
                scrollEnd="bottom bottom-=40%"
                stagger={0.03}
                distance={120}
                stretch={2.3}
                smoothing={0}
                containerClassName="!m-0 !overflow-visible"
                textClassName="inline-block"
              >
                Siempre consistente
              </ScrollFloat>
            </div>

          </div>
          
          <p className="font-gilroy text-base sm:text-lg md:text-xl text-slate-600 dark:text-gray-400 max-w-xl mx-auto transition-colors duration-300 mt-5 leading-relaxed">
            Doma trabaja 24/7, siempre está actualizado y responde de forma consistente.
          </p>
        </div>
      </div>

      <style>{`
        .gradient-phrase-wrapper .scroll-float-text {
          display: inline-block;
          position: relative;
        }

        .gradient-phrase-wrapper .scroll-float-word {
          display: inline-block;
        }

        /* 1. Asignamos el degradado exacto que pediste, pero lo hacemos 20 veces más ancho */
        .gradient-phrase-wrapper .scroll-float-char {
          display: inline-block;
          background-image: linear-gradient(90deg, #a100ff 0%, #7033ff 38%, #4f5bfa 68%, #38bdf8 100%) !important;
          background-size: 2000% 100% !important;
          -webkit-background-clip: text !important;
          background-clip: text !important;
          -webkit-text-fill-color: transparent !important;
          color: transparent !important;
          will-change: transform, opacity;
        }

        /* 2. Mapeo matemático letra por letra para un degradado CONTINUO perfecto e irrompible */
        
        /* Palabra 1: "Siempre" (7 letras) - Tonos Morados */
        .gradient-phrase-wrapper .scroll-float-word:nth-of-type(1) .scroll-float-char:nth-child(1) { background-position: 0% 50% !important; }
        .gradient-phrase-wrapper .scroll-float-word:nth-of-type(1) .scroll-float-char:nth-child(2) { background-position: 5% 50% !important; }
        .gradient-phrase-wrapper .scroll-float-word:nth-of-type(1) .scroll-float-char:nth-child(3) { background-position: 10% 50% !important; }
        .gradient-phrase-wrapper .scroll-float-word:nth-of-type(1) .scroll-float-char:nth-child(4) { background-position: 15% 50% !important; }
        .gradient-phrase-wrapper .scroll-float-word:nth-of-type(1) .scroll-float-char:nth-child(5) { background-position: 20% 50% !important; }
        .gradient-phrase-wrapper .scroll-float-word:nth-of-type(1) .scroll-float-char:nth-child(6) { background-position: 25% 50% !important; }
        .gradient-phrase-wrapper .scroll-float-word:nth-of-type(1) .scroll-float-char:nth-child(7) { background-position: 30% 50% !important; }

        /* Palabra 2: "consistente." (12 letras) - Transición a Azul Celeste */
        .gradient-phrase-wrapper .scroll-float-word:nth-of-type(2) .scroll-float-char:nth-child(1) { background-position: 40% 50% !important; }
        .gradient-phrase-wrapper .scroll-float-word:nth-of-type(2) .scroll-float-char:nth-child(2) { background-position: 45.4% 50% !important; }
        .gradient-phrase-wrapper .scroll-float-word:nth-of-type(2) .scroll-float-char:nth-child(3) { background-position: 50.9% 50% !important; }
        .gradient-phrase-wrapper .scroll-float-word:nth-of-type(2) .scroll-float-char:nth-child(4) { background-position: 56.3% 50% !important; }
        .gradient-phrase-wrapper .scroll-float-word:nth-of-type(2) .scroll-float-char:nth-child(5) { background-position: 61.8% 50% !important; }
        .gradient-phrase-wrapper .scroll-float-word:nth-of-type(2) .scroll-float-char:nth-child(6) { background-position: 67.2% 50% !important; }
        .gradient-phrase-wrapper .scroll-float-word:nth-of-type(2) .scroll-float-char:nth-child(7) { background-position: 72.7% 50% !important; }
        .gradient-phrase-wrapper .scroll-float-word:nth-of-type(2) .scroll-float-char:nth-child(8) { background-position: 78.1% 50% !important; }
        .gradient-phrase-wrapper .scroll-float-word:nth-of-type(2) .scroll-float-char:nth-child(9) { background-position: 83.6% 50% !important; }
        .gradient-phrase-wrapper .scroll-float-word:nth-of-type(2) .scroll-float-char:nth-child(10) { background-position: 89% 50% !important; }
        .gradient-phrase-wrapper .scroll-float-word:nth-of-type(2) .scroll-float-char:nth-child(11) { background-position: 94.5% 50% !important; }
        .gradient-phrase-wrapper .scroll-float-word:nth-of-type(2) .scroll-float-char:nth-child(12) { background-position: 100% 50% !important; }
      `}</style>
    </section>
  );
}