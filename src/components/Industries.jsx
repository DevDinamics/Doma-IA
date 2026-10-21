import React, { useState, useEffect, useRef } from 'react';

// --- BASE DE DATOS ACTUALIZADA CON COPIES DE CANVA ---
const rolesData = [
  {
    id: 'advisor',
    role: 'DOMA Advisor',
    subtitle: 'Mejores decisiones de compra, en el momento justo.',
    sector: 'Retail',
    image: '/RECURSOS DOMA SITIOMesa de trabajo 8.webp',
    description: 'Ideal para comercios y tiendas departamentales que manejan un catálogo de productos. Ayuda a encontrar productos en tienda y brinda recomendaciones.',
    features: [
      'Indica en qué pasillo o sección se encuentra un producto.',
      'Detecta qué busca el cliente para recomendarle opciones del catálogo.',
      'Explica y compara características de los productos.',
      'Informa sobre promociones o descuentos.'
    ],
    color: 'from-[#a100ff] to-[#437ceb]'
  },
  {
    id: 'guide',
    role: 'DOMA Guide',
    subtitle: 'Cada trámite, claro desde el primer paso.',
    sector: 'Banca y Trámites',
    image: '/RECURSOS DOMA SITIOMesa de trabajo 7.webp',
    description: 'Ideal para edificios y sedes con muchas áreas y puntos de atención donde las personas realizan trámites o servicios. Informa sobre ubicaciones, requisitos, etc.',
    features: [
      'Identifica necesidades de los usuarios (a dónde va, qué trámite desea, etc.)',
      'Muestra el camino exacto hacia el edificio, piso u oficina.',
      'Lista los requisitos y documentos que el usuario debe tener a la mano.',
      'Dirige al visitante hacia la fila o ventanilla correcta.'
    ],
    color: 'from-[#437ceb] to-[#2563eb]'
  },
  {
    id: 'concierge',
    role: 'DOMA Concierge',
    subtitle: 'Todo lo que tu espacio ofrece, a la vista.',
    sector: 'Hospitalidad',
    image: '/RECURSOS DOMA SITIOMesa de trabajo 5.webp',
    description: 'Ideal para lugares de eventos, ferias, lobbies, complejos y espacios con agenda, servicios o experiencias. Orienta sobre ubicaciones, servicios, experiencias y promociones del lugar.',
    features: [
      'Informa sobre horarios y catálogo de servicios.',
      'Muestra el mapa de instalaciones.',
      'Brinda información de Wi-Fi y accesos.',
      'Sugiere opciones personalizadas según lo que le interesa al visitante.',
      'Informa canales de atención para gestionar servicios sobre su reserva.'
    ],
    color: 'from-[#437ceb] to-[#a100ff]'
  },
  {
    id: 'host',
    role: 'DOMA Host',
    subtitle: 'La primera impresión, resuelta.',
    sector: 'Corporativos',
    image: '/RECURSOS DOMA SITIOMesa de trabajo 9.webp',
    description: 'Ideal para accesos, recepciones y puntos de bienvenida de edificios, sedes y eventos. Registra, canaliza y direcciona visitantes.',
    features: [
      'Da la bienvenida en nombre de la empresa.',
      'Informa sobre horarios, accesos o estacionamientos.',
      'Realiza el registro de las visitas.',
      'Canaliza a las visitas hacia su destino.'
    ],
    color: 'from-[#a100ff] to-[#7c3aed]'
  }
];

// --- SUBCOMPONENTE PARA MÓVIL ---
const MobileScrollCard = ({ item }) => {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative w-full rounded-3xl overflow-hidden border border-slate-200/80 dark:border-white/10 bg-slate-900 dark:bg-[#12111a] p-6 sm:p-8 flex flex-col justify-start min-h-[600px] transform transition-all duration-700 ease-out will-change-transform shadow-[0_12px_36px_rgba(0,0,0,0.12)] dark:shadow-none ${
        isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'
      }`}
    >
      {/* Imagen de fondo adaptada: Avatar arriba, oscurecido abajo */}
      <img
        src={item.image}
        alt={item.role}
        className="absolute top-0 right-0 w-3/4 max-w-[280px] h-auto object-contain object-top opacity-90"
        onError={(e) => {
          e.currentTarget.src =
            'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80';
        }}
      />
      
      {/* Capa de contraste oscuro para legibilidad (siempre oscura en móvil para mantener el diseño UI) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f]/95 via-[#0a0a0f]/80 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent"></div>

      {/* Pill de sector */}
      <div className="relative z-10 mb-6 mt-2">
        <span className="px-3.5 py-1.5 rounded-full text-[11px] font-gilroy font-semibold tracking-widest uppercase bg-white/10 border border-white/20 text-white backdrop-blur-md">
          {item.sector}
        </span>
      </div>

      {/* Información del Rol */}
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <span className="w-1.5 h-6 bg-[#a100ff] shadow-[0_0_12px_rgba(161,0,255,0.85)] rounded-full"></span>
            <h3 className="font-poppins text-3xl font-bold text-white tracking-tight leading-none">
              {item.role}
            </h3>
          </div>
          
          <h4 className="font-gilroy text-sm font-bold text-[#437ceb] mb-3">
            {item.subtitle}
          </h4>
          
          <p className="font-gilroy text-sm text-gray-300 leading-relaxed mb-6 max-w-[85%]">
            {item.description}
          </p>
        </div>

        <div className="space-y-4">
          {/* Tarjeta interna: Qué puede hacer */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
            <h4 className="font-poppins text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-4">
              ¿Qué puede hacer?
            </h4>
            <ul className="space-y-3 text-left">
              {item.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-gilroy text-gray-200 leading-snug">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a100ff] mt-1.5 shrink-0 shadow-[0_0_8px_rgba(161,0,255,0.6)]"></span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Botón interactivo inferior */}
          <div className="w-full py-3.5 px-4 rounded-full bg-gradient-to-r from-[#a100ff] to-[#437ceb] text-white font-gilroy font-bold text-xs sm:text-sm text-center shadow-[0_0_20px_rgba(161,0,255,0.35)]">
            ¡Tú controlas qué información consume DOMA!
          </div>
        </div>
      </div>

      {/* Línea de color inferior decorativa */}
      <div className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${item.color}`}></div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL ---
export default function RolesGallery() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="roles" className="relative py-20 lg:py-32 px-4 sm:px-6 bg-slate-50 dark:bg-[#0a0a0f] overflow-hidden select-none transition-colors duration-300">
      
      {/* Luces y ambientación de fondo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-px bg-gradient-to-r from-transparent via-slate-300/60 dark:via-[#a100ff]/20 to-transparent"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] lg:w-[900px] h-[500px] bg-[#a100ff]/[0.03] dark:bg-[#a100ff]/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* ENCABEZADO CON COPY ACTUALIZADO */}
        <div className="text-center max-w-4xl mx-auto mb-12 lg:mb-16">
          <span className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#8a00ff] via-[#6340f2] to-[#3b82f6] text-white text-xs sm:text-sm font-gilroy font-bold uppercase tracking-widest mb-5 inline-block shadow-[0_0_24px_rgba(138,0,255,0.4)]">
            PRODUCTOS
          </span>
<h2 className="font-poppins text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight leading-[1.35] lg:leading-[1.3] py-1 mb-4 transition-colors duration-300">
  La <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a100ff] to-[#437ceb]">misma experiencia de servicio</span> adaptada a diferentes <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a100ff] to-[#437ceb]">necesidades de atención</span>
</h2>
          <p className="font-gilroy text-base sm:text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors duration-300">
            Contamos con un catálogo de productos que resuelve las necesidades más comunes de diferentes industrias.
          </p>
        </div>

        {/* ========================================================= */}
        {/* VERSIÓN DESKTOP: ACCORDION GALLERY PRO MAX               */}
        {/* ========================================================= */}
        <div className="hidden lg:flex gap-4 h-[640px] w-full">
          {rolesData.map((item, idx) => {
            const isActive = activeIndex === idx;

            return (
              <div
                key={item.id}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => setActiveIndex(idx)}
                className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col p-8 ${
                  isActive 
                    ? 'flex-[6.5] bg-white dark:bg-[#12111a]/60 border border-slate-200 dark:border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.08)] dark:shadow-2xl' 
                    : 'flex-[1] bg-slate-200/50 dark:bg-[#12111a]/20 border border-slate-200 dark:border-white/5 hover:bg-slate-200 dark:hover:bg-[#12111a]/40'
                }`}
              >
                {/* Imagen del Avatar - Posicionada a la derecha cuando está activo */}
                <div className={`absolute bottom-0 transition-all duration-700 ease-out z-0 ${
                  isActive ? 'right-0 w-[45%] h-[95%] opacity-100' : 'inset-0 w-full h-full opacity-60 dark:opacity-40'
                }`}>
                  <img
                    src={item.image}
                    alt={item.role}
                    className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                      isActive 
                        ? 'object-bottom grayscale-0 brightness-100 scale-100' 
                        : 'object-top grayscale brightness-[0.6] dark:brightness-[0.35] contrast-125 scale-105'
                    }`}
                  />
                  {/* Gradiente sutil para fusionar el avatar inactivo */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-slate-900/20 dark:bg-[#0a0a0f]/60"></div>
                  )}
                  {/* Gradiente en activo para difuminar bordes en modo oscuro */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent dark:from-[#12111a] dark:via-transparent dark:to-transparent w-[20%]"></div>
                  )}
                </div>

                {/* Título Rotado cuando está inactivo */}
                {!isActive && (
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 w-full flex justify-center">
                    <h3 className="font-poppins font-bold text-slate-800 dark:text-white text-xl -rotate-90 whitespace-nowrap origin-center tracking-widest uppercase opacity-60">
                      {item.sector}
                    </h3>
                  </div>
                )}

                {/* Contenido Principal al estar activo (Alineado a la izquierda) */}
                {isActive && (
                  <div className="relative z-10 flex flex-col h-full w-[60%] justify-center animate-fadeInLeft">
                    
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="w-1.5 h-8 rounded-full bg-[#a100ff] shadow-[0_0_14px_rgba(161,0,255,0.9)]"></span>
                        <h3 className="font-poppins font-bold text-slate-900 dark:text-white text-4xl tracking-tight">
                          {item.role}
                        </h3>
                      </div>
                      
                      <h4 className="font-gilroy text-lg font-bold text-[#437ceb] mt-3 mb-4">
                        {item.subtitle}
                      </h4>
                      
                      <p className="font-gilroy text-base text-slate-600 dark:text-gray-300 leading-relaxed max-w-md">
                        {item.description}
                      </p>
                    </div>

                    {/* Tarjeta "Qué puede hacer" */}
                    <div className="bg-slate-50 dark:bg-white/[0.03] backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm mb-6 max-w-lg">
                      <h4 className="font-poppins text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-gray-400 mb-4">
                        ¿Qué puede hacer?
                      </h4>
                      <ul className="grid grid-cols-1 gap-3 text-left">
                        {item.features.map((feat, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm font-gilroy text-slate-700 dark:text-gray-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#a100ff] mt-1.5 shrink-0 shadow-[0_0_8px_rgba(161,0,255,0.6)]"></span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Botón inferior institucional */}
                    <div className="inline-block">
                      <div className="inline-flex py-3 px-6 rounded-full bg-gradient-to-r from-[#a100ff] to-[#437ceb] text-white font-gilroy font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(161,0,255,0.3)] hover:shadow-[0_0_25px_rgba(161,0,255,0.5)] transition-shadow cursor-default">
                        ¡Tú controlas qué información consume DOMA!
                      </div>
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* VERSIÓN MÓVIL: TARJETAS VERTICALES                        */}
        {/* ========================================================= */}
        <div className="flex lg:hidden flex-col gap-6 w-full max-w-md mx-auto">
          {rolesData.map((item) => (
            <MobileScrollCard key={item.id} item={item} />
          ))}
        </div>

      </div>

      <style>{`
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-15px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeInLeft {
          animation: fadeInLeft 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 0.15s;
          opacity: 0;
        }
      `}</style>
    </section>
  );
}