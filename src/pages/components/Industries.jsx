import React, { useEffect, useRef, useState } from 'react';

// --- BASE DE DATOS DE TEXTOS (Intacta) ---
const industriesData = [
  {
    id: 'retail',
    name: 'Retail',
    color: 'from-[#FF5E00] to-[#a100ff]',
    glow: 'bg-[#FF5E00]',
    eyebrow: 'Home Depot · Farmacias del Ahorro · Walmart',
    headline: 'El cliente está en tu tienda.<br/>¿Alguien lo está atendiendo?',
    problems: [
      'Rotación 80–120% anual — el conocimiento se va con cada empleado',
      'Horas pico: 15–25% de ventas perdidas por falta de atención',
      '40,000+ SKUs — ningún empleado puede saberlos todos'
    ],
    solutions: [
      'QOPA conectado a catálogo completo en tiempo real',
      'Misma experiencia en todas las sucursales, siempre',
      'Datos de comportamiento del cliente antes invisibles'
    ],
    roi: 'Con 9,500 sucursales, si DOMA reduce el costo de orientación en 30%, el ahorro es de decenas de millones al año.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  },
  {
    id: 'transporte',
    name: 'Transporte',
    color: 'from-[#437ceb] to-[#a100ff]',
    glow: 'bg-[#437ceb]',
    eyebrow: 'ADO · 469 terminales',
    headline: 'El pasajero tiene 10 minutos.<br/>No puede perder tiempo buscando información.',
    problems: [
      'Semana Santa: el flujo se triplica, el personal no',
      'Cambios de andén llegan tarde — pasajero recibe información incorrecta',
      '60–70% de la fila de taquilla son solo preguntas, no compras'
    ],
    solutions: [
      'QOPA sabe los cambios antes que cualquier empleado en el piso',
      'DOMA en Semana Santa opera igual que un martes normal',
      'Reduce la fila de taquilla a transacciones reales'
    ],
    roi: 'En terminales de alta afluencia, reducir el tiempo de orientación es reducir el tiempo de operación. Con DOMA, el personal se enfoca en servicios de valor.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  },
  {
    id: 'hospitality',
    name: 'Hospitality',
    color: 'from-[#D900FF] to-[#437ceb]',
    glow: 'bg-[#D900FF]',
    eyebrow: 'Grupo Posadas · Live Aqua · Fiesta Americana',
    headline: 'La experiencia premium no puede depender<br/>del turno que toque ese día.',
    problems: [
      'El turno de madrugada no es igual al del sábado al mediodía',
      'Solo 30% de huéspedes usa completamente sus beneficios de lealtad',
      'Visitantes internacionales reciben atención de segunda clase'
    ],
    solutions: [
      'Mismo estándar de marca a las 3am que a las 12pm',
      'Identifica al huésped y activa sus beneficios proactivamente',
      'Soporte nativo multiidioma — sin brecha de servicio'
    ],
    roi: 'Un huésped que conoce y usa sus beneficios de lealtad tiene 3x más probabilidad de regresar. DOMA activa esa conversación en cada visita.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  },
  {
    id: 'gobierno',
    name: 'Gobierno',
    color: 'from-[#00E5FF] to-[#437ceb]',
    glow: 'bg-[#00E5FF]',
    eyebrow: 'Estado de NL · CDMX · Jalisco · Aeropuertos',
    headline: 'El ciudadano llega sin saber qué necesita.<br/>La ventanilla procesa cero trámites.',
    problems: [
      '40–60% del tiempo en ventanilla es orientación, no trámite',
      'El sitio web, el letrero y el empleado dan tres versiones distintas',
      'El titular necesita resultados visibles antes del próximo informe'
    ],
    solutions: [
      'Pre-diagnóstico antes de la fila — el ciudadano llega listo',
      'QOPA actualiza requisitos en todos los puntos en segundos',
      'El dato exacto: "DOMA atendió 14,000 ciudadanos este mes"'
    ],
    roi: 'Si DOMA pre-filtra 50% de las visitas a ventanilla, cada punto de atención ciudadana duplica su capacidad efectiva sin nuevo personal.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
  },
  {
    id: 'banca',
    name: 'Banca y Seguros',
    color: 'from-[#a100ff] to-[#FF5E00]',
    glow: 'bg-[#a100ff]',
    eyebrow: 'GNP · Banco Azteca (1,900 suc.) · Seguros Afirme',
    headline: 'Ejecutivos certificados respondiendo<br/>\'¿cuál es mi saldo?\'',
    problems: [
      '60–70% de visitas son consultas que no necesitan ejecutivo',
      'La póliza tiene 40 páginas — el cliente no entiende hasta que lo necesita',
      'Cada empleado que improvisa una respuesta es un riesgo regulatorio'
    ],
    solutions: [
      'DOMA absorbe consultas simples, el ejecutivo se enfoca en valor real',
      'Explica productos sin presión — el cliente decide con información completa',
      'Solo comunica lo aprobado en QOPA — auditable, sin riesgo regulatorio'
    ],
    roi: 'En una cadena de 1,900 sucursales, si DOMA libera 2 horas diarias de ejecutivo en cada una, el sistema gana 1.4 millones de horas-ejecutivo al año.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  }
];

export default function Industries() {
  const [activeTab, setActiveTab] = useState(industriesData[0].id);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Intersection Observer para animar la entrada de la sección
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

  const activeData = industriesData.find(ind => ind.id === activeTab);

  return (
    <section id="industrias" className="relative py-32 px-6 bg-[#0a0a0f] overflow-hidden" ref={sectionRef}>
      
      {/* Keyframes para la animación de cambio de pestaña */}
      <style>{`
        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-tab-content {
          animation: fadeSlideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- HEADER --- */}
        <div className={`mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-gray-300 text-sm font-gilroy font-bold uppercase tracking-widest mb-6 inline-block">
            Industrias
          </span>
          <h2 className="font-poppins text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Tu Digital Sales Executive,<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a100ff] to-[#437ceb]">
              listo para tu sector.
            </span>
          </h2>
          <p className="font-gilroy text-xl text-gray-400 max-w-2xl">
            Pre-entrenado para tu industria. Personalizado con el conocimiento de tu empresa.
          </p>
        </div>

        {/* --- TABS BAR (Scrollable en móvil) --- */}
        <div className={`flex overflow-x-auto hide-scrollbar gap-2 mb-16 pb-4 border-b border-white/10 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          {industriesData.map((ind) => (
            <button
              key={ind.id}
              onClick={() => setActiveTab(ind.id)}
              className={`whitespace-nowrap px-6 py-3 rounded-full font-gilroy font-semibold text-[15px] transition-all duration-300 ${
                activeTab === ind.id 
                ? 'bg-white text-[#0a0a0f] shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
                : 'bg-transparent text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {ind.name}
            </button>
          ))}
        </div>

        {/* --- CONTENIDO ACTIVO --- */}
        {/* El "key" ayuda a React a reiniciar la animación cada vez que cambia el activeTab */}
        <div key={activeTab} className="flex flex-col lg:flex-row gap-12 lg:gap-20 animate-tab-content">
          
          {/* COLUMNA IZQUIERDA: Textos, Problema/Solución, ROI */}
          <div className="lg:w-7/12 flex flex-col">
            <p className="font-gilroy text-sm font-bold text-[#437ceb] uppercase tracking-widest mb-4">
              {activeData.eyebrow}
            </p>
            <h3 
              className="font-poppins text-3xl md:text-4xl font-bold text-white mb-12 leading-snug"
              dangerouslySetInnerHTML={{ __html: activeData.headline }}
            />

            {/* Grid Comparativo Problema / Solución */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              
              {/* Bloque: El Problema */}
              <div className="bg-red-500/[0.03] border border-red-500/10 rounded-[24px] p-6 md:p-8 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 font-bold text-xs">✕</div>
                  <p className="font-poppins font-semibold text-red-400 text-lg">El problema</p>
                </div>
                <ul className="flex flex-col gap-4">
                  {activeData.problems.map((prob, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-red-500/50 mt-1 font-bold text-sm">✕</span>
                      <span className="font-gilroy text-gray-400 text-sm leading-relaxed">{prob}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bloque: DOMA Resuelve */}
              <div className="bg-[#a100ff]/[0.05] border border-[#a100ff]/20 rounded-[24px] p-6 md:p-8 backdrop-blur-sm shadow-[0_0_30px_rgba(161,0,255,0.05)]">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-6 h-6 rounded-full bg-[#a100ff]/20 flex items-center justify-center text-[#a100ff] font-bold text-xs">✓</div>
                  <p className="font-poppins font-semibold text-white text-lg">DOMA resuelve</p>
                </div>
                <ul className="flex flex-col gap-4">
                  {activeData.solutions.map((sol, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-[#a100ff] mt-1 font-bold text-sm">✓</span>
                      <span className="font-gilroy text-gray-200 text-sm leading-relaxed">{sol}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* ROI Box */}
            <div className="relative overflow-hidden bg-gradient-to-r from-white/[0.05] to-transparent border border-white/10 rounded-2xl p-6 md:p-8 group hover:border-white/20 transition-colors">
              <div className={`absolute top-0 left-0 w-1 h-full ${activeData.glow} shadow-[0_0_15px_currentColor]`}></div>
              <p className="font-gilroy text-gray-300 italic text-base leading-relaxed relative z-10">
                "{activeData.roi}"
              </p>
            </div>
          </div>

          {/* COLUMNA DERECHA: Holograma Visual 3D Abstracto */}
          <div className="lg:w-5/12 flex justify-center items-center">
            <div className="relative w-full aspect-square max-w-[400px] flex items-center justify-center group perspective-1000">
              
              {/* Brillo dinámico según la industria */}
              <div className={`absolute inset-0 bg-gradient-to-br ${activeData.color} rounded-full blur-[80px] opacity-30 group-hover:opacity-50 transition-all duration-700 animate-pulse`}></div>
              
              {/* Caja de cristal central */}
              <div className="relative z-10 w-3/4 h-3/4 rounded-[40px] border border-white/10 bg-white/[0.02] backdrop-blur-xl shadow-2xl flex flex-col items-center justify-center transform-gpu transition-all duration-700 group-hover:scale-105 overflow-hidden">
                
                {/* Rejilla técnica de fondo en el holograma */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:1rem_1rem] opacity-20"></div>

                {/* Ícono Dinámico */}
                <div className={`relative w-24 h-24 mb-6 rounded-full bg-gradient-to-b ${activeData.color} p-[1px]`}>
                  <div className="w-full h-full bg-[#0a0a0f] rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-white group-hover:scale-110 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {activeData.icon}
                    </svg>
                  </div>
                </div>

                <div className="text-center relative z-10">
                  <span className="font-gilroy font-bold text-xs uppercase tracking-[3px] text-gray-500">Módulo</span>
                  <h4 className="font-poppins text-2xl font-bold text-white mt-1">{activeData.name}</h4>
                  <div className={`mt-3 w-12 h-1 rounded-full mx-auto ${activeData.glow}`}></div>
                </div>

              </div>
              
              {/* Anillos orbitales flotantes */}
              <div className="absolute w-full h-full border border-white/5 rounded-full animate-[spin_10s_linear_infinite]"></div>
              <div className="absolute w-[85%] h-[85%] border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}