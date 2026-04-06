import React, { useEffect, useRef, useState } from 'react';

export default function Qopa() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="qopa" className="relative py-20 lg:py-32 px-4 md:px-6 bg-[#0a0a0f] overflow-hidden" ref={sectionRef}>
      
      {/* Estilos para las animaciones de flujo de datos */}
      <style>{`
        @keyframes flowX {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes flowY {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-flow-x {
          animation: flowX 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-flow-y {
          animation: flowY 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>

      {/* Luces de fondo QOPA (Naranja/Rosa) */}
      <div className="absolute top-1/4 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#D900FF]/5 rounded-full blur-[100px] md:blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#FF5E00]/5 rounded-full blur-[100px] md:blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- HEADER ROW --- */}
        <div className={`flex flex-col lg:flex-row gap-10 md:gap-12 justify-between items-center mb-16 md:mb-24 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          
          {/* Texto Izquierda */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D900FF]/30 bg-[#D900FF]/10 text-[#D900FF] text-xs md:text-sm font-gilroy font-bold uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(217,0,255,0.2)]">
              QOPA — Motor de Inteligencia
            </div>
            <h3 className="font-poppins text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4 mx-auto lg:mx-0 max-w-2xl">
              Usamos nuestra propia tecnología: <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5E00] to-[#D900FF]">QOPA</span>
            </h3>
            <p className="font-gilroy text-base md:text-lg text-gray-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
              QOPA conecta DOMA a tu información en tiempo real. Cuando algo cambia, todos los puntos lo saben en segundos.
            </p>
          </div>

          {/* Bullets Derecha (Glass Card) */}
          <div className="w-full lg:w-5/12 bg-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-2xl hover:border-[#D900FF]/30 transition-colors duration-500">
            <ul className="flex flex-col gap-5 md:gap-6">
              {[
                "Tu data viva: documentos, bases de datos, APIs",
                "Actualización simultánea en todos los puntos",
                "Cada interacción genera inteligencia de negocio"
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3 md:gap-4">
                  <div className="mt-1 w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-br from-[#FF5E00] to-[#D900FF] flex items-center justify-center flex-shrink-0 shadow-[0_0_10px_rgba(217,0,255,0.3)]">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span className="font-gilroy text-gray-300 text-base md:text-lg leading-snug">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* --- DIAGRAMA DE ARQUITECTURA --- */}
        <div className={`flex flex-col xl:flex-row items-center justify-center gap-6 md:gap-8 xl:gap-6 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          
          {/* 1. FUENTES DE DATOS */}
          <div className="bg-[#0f0f15]/80 border border-white/10 rounded-[32px] p-5 md:p-6 w-full max-w-sm xl:w-72 xl:max-w-none backdrop-blur-md hover:border-white/20 transition-all group mx-auto">
            <div className="text-xs font-gilroy font-bold text-gray-500 uppercase tracking-widest mb-5 md:mb-6 text-center">Datos del cliente</div>
            <div className="flex flex-col gap-3 md:gap-4">
              {[
                { name: "Info estática", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6M9 16h6M9 8h6M5 4h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1z"/> },
                { name: "Repositorio", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h10a4 4 0 004-4 4 4 0 00-4-8h-.5A5.5 5.5 0 003 12v3z"/> },
                { name: "Bases de datos", icon: <><ellipse cx="12" cy="5" rx="9" ry="3" strokeWidth="2"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5v14a9 3 0 0018 0V5"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12a9 3 0 0018 0"/></> },
                { name: "API", icon: <><circle cx="12" cy="12" r="3" strokeWidth="2"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.6 9a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9"/></> }
              ].map((src, i) => (
                <div key={i} className="flex items-center gap-3 md:gap-4 p-2.5 md:p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] transition-colors border border-white/5 cursor-default">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gray-800/50 flex items-center justify-center text-gray-400 group-hover:text-[#437ceb] transition-colors flex-shrink-0">
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">{src.icon}</svg>
                  </div>
                  <span className="font-gilroy text-sm font-semibold text-gray-300">{src.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FLECHA 1 (Animada) */}
          <div className="relative w-1 h-8 md:h-12 xl:w-16 xl:h-1 bg-white/10 rounded-full overflow-hidden flex-shrink-0 mx-auto">
            <div className="absolute inset-0 bg-gradient-to-b xl:bg-gradient-to-r from-transparent via-[#D900FF] to-transparent w-full h-full xl:w-1/2 xl:h-full animate-flow-y xl:animate-flow-x"></div>
          </div>

          {/* 2. MOTOR QOPA */}
          <div className="relative bg-gradient-to-b from-[#0f0f15] to-[#0a0a0f] border border-[#D900FF]/40 rounded-[40px] p-1 w-full max-w-lg xl:max-w-none xl:w-[450px] mx-auto shadow-[0_0_40px_rgba(217,0,255,0.15)] group hover:shadow-[0_0_60px_rgba(217,0,255,0.25)] transition-all">
            {/* Resplandor interior */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF5E00]/10 to-[#D900FF]/10 rounded-[40px] opacity-50"></div>
            
            <div className="relative bg-[#0f0f15]/90 rounded-[38px] p-6 md:p-8 backdrop-blur-xl h-full">
              <div className="flex flex-col items-center text-center mb-6 md:mb-8">
                <span className="text-2xl md:text-3xl font-poppins font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF5E00] to-[#D900FF] tracking-tight">QOPA</span>
                <span className="text-[10px] md:text-xs font-gilroy text-gray-400 uppercase tracking-[2px] mt-1">Motor de inteligencia propietario</span>
              </div>

              <div className="flex flex-col gap-3 md:gap-4">
                {[
                  { num: "01", name: "RAG Engine", desc: "Recuperación semántica de contexto relevante" },
                  { num: "02", name: "Orquestación LLM", desc: "Coordinación de modelos de lenguaje" },
                  { num: "03", name: "Generación de respuesta", desc: "Síntesis y validación final" }
                ].map((step, i) => (
                  <div key={i} className="flex gap-3 md:gap-4 items-start p-3 md:p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] transition-colors border border-white/5 cursor-default group/step">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#D900FF]/10 border border-[#D900FF]/30 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/step:bg-[#D900FF] transition-colors duration-500">
                      <span className="font-poppins text-xs md:text-sm font-bold text-[#D900FF] group-hover/step:text-white transition-colors">{step.num}</span>
                    </div>
                    <div className="pt-0.5">
                      <h4 className="font-poppins text-sm md:text-base font-semibold text-white mb-0.5 md:mb-1">{step.name}</h4>
                      <p className="font-gilroy text-[11px] md:text-xs text-gray-400 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FLECHA 2 (Animada) */}
          <div className="relative w-1 h-8 md:h-12 xl:w-16 xl:h-1 bg-white/10 rounded-full overflow-hidden flex-shrink-0 mx-auto">
            <div className="absolute inset-0 bg-gradient-to-b xl:bg-gradient-to-r from-transparent via-[#D900FF] to-transparent w-full h-full xl:w-1/2 xl:h-full animate-flow-y xl:animate-flow-x"></div>
          </div>

          {/* 3. SALIDA */}
          <div className="bg-[#0f0f15]/80 border border-[#437ceb]/30 rounded-[32px] p-5 md:p-6 w-full max-w-[280px] xl:w-64 backdrop-blur-md shadow-[0_0_30px_rgba(67,124,235,0.1)] group hover:shadow-[0_0_40px_rgba(67,124,235,0.2)] transition-all mx-auto">
            <div className="text-xs font-gilroy font-bold text-[#437ceb] uppercase tracking-widest mb-5 md:mb-6 text-center">Salida</div>
            <div className="flex flex-col items-center justify-center py-4 md:py-6 gap-3 md:gap-4">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-[#437ceb] to-[#906ef7] p-[1px]">
                <div className="w-full h-full bg-[#0f0f15] rounded-2xl flex items-center justify-center group-hover:bg-[#437ceb]/10 transition-colors">
                  <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5 5 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.51-.73-1.51-1.51V9.76c0-.88.73-1.51 1.51-1.51h2.24z" />
                  </svg>
                </div>
              </div>
              <span className="font-gilroy text-sm md:text-base font-bold text-white text-center">Respuesta<br/>verificada</span>
            </div>
          </div>

        </div>

        {/* --- FEEDBACK LOOP PILL --- */}
        <div className={`mt-12 md:mt-16 flex justify-center transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-3 sm:gap-4 px-6 md:px-8 py-4 md:py-3 rounded-3xl sm:rounded-full bg-[#0f0f15] border border-white/10 shadow-2xl backdrop-blur-md hover:border-gray-500 transition-colors cursor-default max-w-sm sm:max-w-none">
            <svg className="w-5 h-5 text-[#a100ff] animate-[spin_4s_linear_infinite] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 4v6h6M23 20v-6h-6"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15"/>
            </svg>
            <span className="font-gilroy text-xs md:text-sm text-gray-300 leading-snug">
              Ciclo de verificación automática antes de entregar cada respuesta
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}