import React, { useEffect, useRef, useState } from 'react';

// --- BASE DE DATOS DE TEXTOS (Intacta, respetando tu información) ---
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
    roi: 'Sabes exactamente qué preguntan tus clientes, en qué horarios, y qué no están encontrando. Eso no lo tienes hoy.'
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
    roi: 'Cada pasajero que espera es data y oportunidad. Hoy no capturas ninguna de las dos.'
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
    roi: 'Un upgrade de $50 USD por cada 10 check-ins paga DOMA. El resto es margen puro.'
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
      'Registra qué productos generan más dudas, qué horarios saturan la sucursal, qué consultas se repiten.',
      'Extiende el horario de atención en vestíbulo sin costo adicional.'
    ],
    roi: 'Cada producto colocado desde DOMA tiene costo de adquisición cercano a cero. Y sabes exactamente qué está pidiendo tu cliente.'
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
    roi: 'El 78% de los adultos no tiene seguro. DOMA los educa sin costo de adquisición y te dice exactamente qué están buscando.'
  }
];

export default function Industries() {
  const [activeTab, setActiveTab] = useState(industriesData[0].id);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  // Estado para rastrear el progreso del scroll dentro de la sección
  const [scrollProgress, setScrollProgress] = useState(0);

  // 1. Observer para revelar la sección inicial
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

  // 2. Parallax Scroll Effect (La Magia)
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculamos cuánto ha avanzado la sección en la pantalla (0 a 1)
      if (rect.top < windowHeight && rect.bottom > 0) {
        // Normalizamos el progreso: 0 (entra por abajo) a 1 (sale por arriba)
        const progress = 1 - (rect.bottom / (windowHeight + rect.height));
        // Limitamos entre 0 y 1
        setScrollProgress(Math.max(0, Math.min(1, progress)));
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Calcular estado inicial
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeTab]); // Recalcular si cambia la pestaña para evitar saltos

  const activeData = industriesData.find(ind => ind.id === activeTab);

  // --- MATEMÁTICAS DEL PARALLAX ---
  // Hacemos que las tarjetas se muevan a diferentes velocidades
  const offsetMultiplier = (scrollProgress - 0.5) * 2; // Va de -1 a 1
  const card1Offset = offsetMultiplier * -40; // Se mueve hacia arriba/abajo 40px
  const card2Offset = offsetMultiplier * -80; // Se mueve el doble de rápido (80px)

  return (
    <section id="industrias" className="relative py-20 lg:py-32 px-4 sm:px-6 bg-[#0a0a0f] overflow-hidden" ref={sectionRef}>
      
      {/* Keyframes para la animación de cambio de pestaña (Fade Suave) */}
      <style>{`
        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateY(15px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-tab-content {
          animation: fadeSlideUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        /* Ocultar barra de scroll en tabs móviles */
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- HEADER --- */}
        <div className={`mb-12 lg:mb-16 transform transition-all duration-1000 text-center lg:text-left ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-gray-300 text-xs sm:text-sm font-gilroy font-bold uppercase tracking-widest mb-6 inline-block shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            Industrias
          </span>
          <h2 className="font-poppins text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 sm:mb-6">
            Tu Digital Sales Executive,<br className="hidden sm:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a100ff] to-[#437ceb] block sm:inline">
              listo para tu sector.
            </span>
          </h2>
          <p className="font-gilroy text-base sm:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto lg:mx-0 px-4 sm:px-0">
            Pre-entrenado para tu industria. Personalizado con el conocimiento de tu empresa.
          </p>
        </div>

        {/* --- TABS BAR (Scrollable en móvil) --- */}
        <div className={`flex overflow-x-auto hide-scrollbar gap-2 sm:gap-4 mb-12 lg:mb-16 pb-4 border-b border-white/10 snap-x snap-mandatory transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          {industriesData.map((ind) => (
            <button
              key={ind.id}
              onClick={() => setActiveTab(ind.id)}
              className={`snap-start whitespace-nowrap px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-gilroy font-semibold text-sm sm:text-[15px] transition-all duration-300 flex-shrink-0 ${
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
        <div key={activeTab} className="flex flex-col lg:flex-row gap-12 lg:gap-20 animate-tab-content">
          
          {/* COLUMNA IZQUIERDA: Textos, Problema/Solución, ROI */}
          <div className="w-full lg:w-7/12 flex flex-col">
            <h3 
              className="font-poppins text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8 lg:mb-12 leading-snug text-center lg:text-left"
              dangerouslySetInnerHTML={{ __html: activeData.headline }}
            />

            {/* Grid Comparativo Problema / Solución (PARALLAX APLICADO AQUÍ) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 relative">
              
              {/* Bloque: El Problema (Se mueve más lento) */}
              <div 
                className="bg-red-500/[0.03] border border-red-500/10 rounded-[24px] p-6 sm:p-8 backdrop-blur-sm will-change-transform"
                style={{ transform: `translateY(${card1Offset}px)`, transition: 'transform 0.1s ease-out' }}
              >
                <div className="flex items-center gap-2 mb-5 sm:mb-6">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 font-bold text-[10px] sm:text-xs">✕</div>
                  <p className="font-poppins font-semibold text-red-400 text-base sm:text-lg">El problema</p>
                </div>
                <ul className="flex flex-col gap-3 sm:gap-4">
                  {activeData.problems.map((prob, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-red-500/50 mt-1 font-bold text-xs sm:text-sm flex-shrink-0">✕</span>
                      <span className="font-gilroy text-gray-400 text-xs sm:text-sm leading-relaxed">{prob}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bloque: DOMA Resuelve (Se mueve más rápido - Profundidad) */}
              <div 
                className="bg-[#a100ff]/[0.05] border border-[#a100ff]/20 rounded-[24px] p-6 sm:p-8 backdrop-blur-sm shadow-[0_0_30px_rgba(161,0,255,0.05)] will-change-transform"
                style={{ transform: `translateY(${card2Offset}px)`, transition: 'transform 0.1s ease-out' }}
              >
                <div className="flex items-center gap-2 mb-5 sm:mb-6">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#a100ff]/20 flex items-center justify-center text-[#a100ff] font-bold text-[10px] sm:text-xs">✓</div>
                  <p className="font-poppins font-semibold text-white text-base sm:text-lg">Cómo resolvemos</p>
                </div>
                <ul className="flex flex-col gap-3 sm:gap-4">
                  {activeData.solutions.map((sol, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-[#a100ff] mt-1 font-bold text-xs sm:text-sm flex-shrink-0">✓</span>
                      <span className="font-gilroy text-gray-200 text-xs sm:text-sm leading-relaxed">{sol}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* ROI Box */}
            <div className="relative overflow-hidden bg-gradient-to-r from-white/[0.05] to-transparent border border-white/10 rounded-2xl p-6 sm:p-8 group hover:border-white/20 transition-colors mt-8 lg:mt-4">
              <div className={`absolute top-0 left-0 w-1 h-full ${activeData.glow} shadow-[0_0_15px_currentColor]`}></div>
              <p className="font-gilroy text-gray-300 italic text-sm sm:text-base leading-relaxed relative z-10">
                "{activeData.roi}"
              </p>
            </div>
          </div>

          {/* COLUMNA DERECHA: Imagen Completa del Tótem (Estilo PRO) */}
          <div className="w-full lg:w-5/12 flex justify-center items-end mt-10 lg:mt-0 relative min-h-[400px] lg:min-h-[500px]">
            <div className="relative w-full max-w-[280px] sm:max-w-[350px] lg:max-w-[450px] aspect-[4/5] flex items-center justify-center group z-10">

              {/* 1. Brillo dinámico de fondo (cambia de color según la pestaña) */}
              <div className={`absolute inset-0 bg-gradient-to-br ${activeData.color} rounded-full blur-[60px] lg:blur-[80px] opacity-30 group-hover:opacity-50 transition-all duration-700 animate-pulse pointer-events-none`}></div>

              {/* 2. Anillos de energía orbitales */}
              <div className="absolute w-[90%] h-[90%] border border-white/5 rounded-full animate-[spin_15s_linear_infinite] pointer-events-none"></div>
              <div className="absolute w-[70%] h-[70%] border border-white/5 rounded-full animate-[spin_20s_linear_infinite_reverse] pointer-events-none"></div>

              {/* 3. Plataforma de luz esmerilada en la base */}
              <div className="absolute bottom-5 w-[80%] h-24 lg:h-32 bg-gradient-to-t from-white/10 to-transparent rounded-full blur-2xl opacity-50 pointer-events-none"></div>

              {/* 4. IMAGEN PRINCIPAL (Sustituye la ruta por tu imagen real) */}
              <div 
                className="relative z-10 w-full h-full flex items-end justify-center"
                style={{ 
                  // Máscara para que se desvanezca en la base y no se vea cortada
                  maskImage: 'linear-gradient(to top, transparent 0%, black 15%, black 100%)', 
                  WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 15%, black 100%)'
                }}
              >
                {/* ---> AQUÍ PONES LA RUTA DE TU IMAGEN <--- */}
                <img 
                      src="/fondo.png" 
                      alt="DOMA — Digital Sales Executive Tótem Físico Pulido"
                      className="w-full h-full object-cover object-bottom p-6 group-hover:scale-[1.01] transition-transform duration-700 brightness-110 contrast-110 drop-shadow-[0_0_15px_rgba(161,0,255,0.3)]"
                      style={{ 
                        mixBlendMode: 'screen', // Solución al fondo negro
                      }}
                    />
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}