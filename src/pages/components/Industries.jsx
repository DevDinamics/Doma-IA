import React, { useEffect, useRef, useState } from 'react';

// --- BASE DE DATOS DE TEXTOS (Intacta) ---
const industriesData = [
  {
    id: 'retail',
    name: 'Retail',
    color: 'from-[#FF5E00] to-[#a100ff]',
    glow: 'bg-[#FF5E00]',
    eyebrow: '',
    headline: 'El cliente está en tu tienda.<br/>¿Alguien lo está atendiendo?',
    problems: [
      'Rotación anual de 80–120%, el conocimiento se va con cada empleado',
      'Horas pico: ventas perdidas por falta de atención',
      'Miles de SKUs y ningún empleado domina todos'
    ],
    solutions: [
      'Domina todo tu catálogo, promociones y disponibilidad por sucursal.',
      'Recomienda productos complementarios y cierra ventas en el punto de decisión.',
      'Registra cada interacción: qué buscan, qué no encuentran, a qué hora llegan.',
      'Opera 24/7 sin rotación, sin ausentismo, sin curva de aprendizaje.'
      
    ],
    roi: 'Sabes exactamente qué preguntan tus clientes, en qué horarios, y qué no están encontrando. Eso no lo tienes hoy.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  },
  {
    id: 'transporte',
    name: 'Transporte',
    color: 'from-[#437ceb] to-[#a100ff]',
    glow: 'bg-[#437ceb]',
    eyebrow: '',
    headline: '153 millones de pasajeros al año. ¿Quién les está vendiendo?',
    problems: [
      'Rotación de 50% anual en personal de información.',
      'Pasajeros desorientados que no conocen servicios adicionales.',
      'Cero visibilidad de qué información piden y cuándo.'
    ],
    solutions: [
      'Domina rutas, horarios, conexiones, políticas y servicios.',
      'Vende upgrades, acceso a salas VIP, seguros, transporte terrestre, en el momento exacto.',
      'Registra patrones: qué preguntan, qué destinos generan más dudas, en qué horarios colapsa la demanda.',
      'Cero rotación, cero capacitación repetida, cero inconsistencias entre turnos.'
    ],
    roi: 'Cada pasajero que espera es data y oportunidad. Hoy no capturas ninguna de las dos.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  },
  {
    id: 'hospitality',
    name: 'Hospitality',
    color: 'from-[#D900FF] to-[#437ceb]',
    glow: 'bg-[#D900FF]',
    eyebrow: '',
    headline: 'Tu huésped espera 5 minutos. Tu satisfacción cae 47%.',
    problems: [
      'Rotación de 60–80% que destruye la consistencia del servicio.',
      'Check-in manual que genera filas en horas pico.',
      'Oportunidades de upsell que el front desk no tiene tiempo de ofrecer.'
    ],
    solutions: [
      'Conoce todas las habitaciones, amenidades, políticas y servicios sin entrenamiento.',
      'Ofrece upgrades, late checkout, reservaciones en restaurante, tours.',
      'Registra preferencias y patrones: qué piden, qué rechazan, qué servicios desconocen.',
      'Atiende el lobby a las 3 AM igual que a las 3 PM.'
    ],
    roi: 'Un upgrade de $50 USD por cada 10 check-ins paga DOMA. El resto es margen puro.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  },
  {
    id: 'banca',
    name: 'Banca',
    color: 'from-[#00E5FF] to-[#437ceb]',
    glow: 'bg-[#00E5FF]',
    eyebrow: '',
    headline: '150,000 quejas al año. El 80% eran preguntas simples.',
    problems: [
      'Cada transacción en ventanilla cuesta 25x más que en canal digital.',
      'Ejecutivos saturados que no tienen tiempo de detectar oportunidades.',
      'Rotación constante en posiciones de atención.'
    ],
    solutions: [
      'Resuelve el 80% de consultas sin ejecutivo: saldos, movimientos, requisitos, ubicaciones.',
      'Detecta oportunidades en la conversación: créditos pre-aprobados, cuentas de ahorro, tarjetas.',
      'Registra qué productos generan más dudas, qué horarios saturan la sucursal, qué consultas se repiten."',
      'Extiende el horario de atención en vestíbulo sin costo adicional.'
    ],
    roi: 'Cada producto colocado desde DOMA tiene costo de adquisición cercano a cero. Y sabes exactamente qué está pidiendo tu cliente.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
  },
  {
    id: 'Seguros',
    name: 'Seguros',
    color: 'from-[#a100ff] to-[#FF5E00]',
    glow: 'bg-[#a100ff]',
    eyebrow: '',
    headline: 'Solo 22% de los adultos tiene un seguro. Nadie les ha explicado bien.',
    problems: [
      'Agentes que no duran más de 3 años en el oficio.',
      'Estigma del "vendedor agresivo" que ahuyenta prospectos.',
      'Productos complejos que nadie tiene paciencia de explicar.'
    ],
    solutions: [
      'Explica coberturas, simula cotizaciones y responde dudas, sin presión, sin prisa.',
      'Detecta momento de interés y escala a un agente humano solo cuando el cliente está listo.',
      'Registra qué productos generan más preguntas, qué objeciones se repiten, qué perfil convierte mejor.',
      'Disponible en sucursal, en punto de venta, en evento, donde el cliente esté.'
    ],
    roi: 'El 78% de los adultos no tiene seguro. DOMA los educa sin costo de adquisición y te dice exactamente qué están buscando.',
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
                  <p className="font-poppins font-semibold text-white text-lg">Cómo resolvemos</p>
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