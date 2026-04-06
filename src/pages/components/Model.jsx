import React, { useEffect, useRef, useState } from 'react';

// --- SUB-COMPONENTE: Fila de Especificación ---
const SpecRow = ({ label, value, delay, icon }) => {
  const [isVisible, setIsVisible] = useState(false);
  const rowRef = useRef(null);

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
    if (rowRef.current) observer.observe(rowRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rowRef}
      className={`group relative flex flex-col md:flex-row md:items-center justify-between p-6 md:p-8 border-b border-white/10 transition-all duration-700 ease-out will-change-transform
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
        hover:bg-white/[0.02] cursor-default overflow-hidden
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Resplandor sutil de fondo en Hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#a100ff]/0 via-[#a100ff]/5 to-[#437ceb]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      
      {/* Línea láser inferior en Hover */}
      <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-[#a100ff] to-[#437ceb] group-hover:w-full transition-all duration-700 ease-out"></div>

      {/* Etiqueta (Característica) */}
      <div className="flex items-center gap-4 mb-2 md:mb-0 relative z-10 w-full md:w-1/3">
        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-[#a100ff] group-hover:border-[#a100ff]/30 group-hover:bg-[#a100ff]/10 transition-all duration-500">
          {icon}
        </div>
        <span className="font-gilroy text-lg font-medium text-gray-400 group-hover:text-gray-200 transition-colors">
          {label}
        </span>
      </div>

      {/* Valor (DOMA) */}
      <div className="relative z-10 w-full md:w-2/3 md:text-right pl-14 md:pl-0">
        <span className="font-poppins text-xl md:text-2xl font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all">
          {value}
        </span>
      </div>
    </div>
  );
};

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

  const specs = [
    {
      label: "Costo mensual",
      value: "Tarifa mensual fija, todo incluido",
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    },
    {
      label: "Capacitación",
      value: "$0 — QOPA lo sabe desde el día 1",
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
    },
    {
      label: "Rotación",
      value: "0% — nunca renuncia",
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
    },
    {
      label: "Horario",
      value: "24/7, 365 días",
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    },
    {
      label: "Consistencia",
      value: "100% consistente en todos los puntos",
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    },
    {
      label: "Datos del cliente",
      value: "Cada interacción es un dato medible",
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
    },
    {
      label: "Escalabilidad",
      value: "Costo fijo sin importar cuántos puntos",
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
    }
  ];

  return (
    <section id="modelo" className="relative py-32 px-6 bg-[#0a0a0f] overflow-hidden">
      
      {/* Ambient Lights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#437ceb]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* HEADER */}
        <div 
          ref={headerRef}
          className={`text-center mb-20 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
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
          <p className="font-gilroy text-xl text-gray-400 max-w-2xl mx-auto">
            Un Digital Sales Executive que no descansa, no olvida y no improvisa.
          </p>
        </div>

        {/* COMPARISON TABLE / TECH SPECS */}
        <div className="relative bg-[#0f0f15]/80 backdrop-blur-xl border border-white/10 rounded-[40px] shadow-2xl overflow-hidden">
          
          {/* Fila de Encabezado (Sticky-like feel) */}
          <div className="hidden md:flex justify-between px-8 py-6 border-b border-white/10 bg-white/[0.02]">
            <div className="w-1/3">
              <span className="font-gilroy font-bold text-xs uppercase tracking-widest text-gray-500">Característica</span>
            </div>
            <div className="w-2/3 text-right">
              <span className="font-gilroy font-bold text-xs uppercase tracking-widest text-[#a100ff]">DOMA Digital Sales Executive</span>
            </div>
          </div>

          {/* Filas de Datos */}
          <div className="flex flex-col">
            {specs.map((spec, idx) => (
              <SpecRow 
                key={idx}
                label={spec.label}
                value={spec.value}
                icon={spec.icon}
                delay={idx * 100} // Cascada de animación
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}