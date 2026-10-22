import React, { useState } from 'react';

// --- BASE DE DATOS ACTUALIZADA CON COPIES DE CANVA ---
const rolesData = [
  {
    id: 'advisor',
    role: 'DOMA Advisor',
    subtitle: 'Mejores decisiones de compra, en el momento justo.',
    image: '/RECURSOS DOMA SITIO TRANSPARENTES (4).webp',
    description: 'Ideal para comercios y tiendas departamentales que manejan un catálogo de productos.',
    features: [
      'Indica pasillos o secciones de productos.',
      'Recomienda opciones del catálogo.',
      'Explica características y compara.'
    ],
    color: 'from-[#a100ff] to-[#437ceb]'
  },
  {
    id: 'guide',
    role: 'DOMA Guide',
    subtitle: 'Cada trámite, claro desde el primer paso.',
    image: '/RECURSOS DOMA SITIO TRANSPARENTES (3).webp',
    description: 'Ideal para edificios y sedes con múltiples puntos de atención y trámites.',
    features: [
      'Identifica necesidades del usuario.',
      'Muestra el camino exacto a oficinas.',
      'Lista requisitos y documentos.'
    ],
    color: 'from-[#437ceb] to-[#2563eb]'
  },
  {
    id: 'concierge',
    role: 'DOMA Concierge',
    subtitle: 'Todo lo que tu espacio ofrece, a la vista.',
    image: '/RECURSOS DOMA SITIO TRANSPARENTES (1).webp',
    description: 'Ideal para eventos, lobbies y complejos con agenda de servicios y experiencias.',
    features: [
      'Informa horarios y servicios.',
      'Muestra mapas de instalaciones.',
      'Sugiere opciones personalizadas.'
    ],
    color: 'from-[#437ceb] to-[#a100ff]'
  },
  {
    id: 'host',
    role: 'DOMA Host',
    subtitle: 'La primera impresión, resuelta.',
    image: '/RECURSOS DOMA SITIO TRANSPARENTES (5).webp',
    description: 'Ideal para accesos, recepciones y puntos de bienvenida corporativos.',
    features: [
      'Da la bienvenida institucional.',
      'Informa horarios y estacionamientos.',
      'Realiza registro de visitas.'
    ],
    color: 'from-[#a100ff] to-[#7c3aed]'
  }
];


// --- COMPONENTE PRINCIPAL ---
export default function RolesGallery() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="roles" className="relative py-20 lg:py-32 px-4 sm:px-6 bg-slate-50 dark:bg-[#0a0a0f] overflow-hidden select-none">
      
      {/* Luces y ambientación de fondo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-px bg-gradient-to-r from-transparent via-slate-300/60 dark:via-[#a100ff]/20 to-transparent"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] lg:w-[900px] h-[500px] bg-[#a100ff]/[0.03] dark:bg-[#a100ff]/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* ENCABEZADO */}
        <div className="text-center max-w-4xl mx-auto mb-12 lg:mb-16">
          <span className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#8a00ff] via-[#6340f2] to-[#3b82f6] text-white text-xs sm:text-sm font-gilroy font-bold uppercase tracking-widest mb-5 inline-block shadow-[0_0_24px_rgba(138,0,255,0.4)]">
            PRODUCTOS
          </span>
          <h2 className="font-poppins text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight leading-[1.35] lg:leading-[1.3] py-1 mb-4 ">
            La <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a100ff] to-[#437ceb]">misma experiencia de servicio</span> adaptada a diferentes <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a100ff] to-[#437ceb]">necesidades de atención</span>
          </h2>
          <p className="font-gilroy text-base sm:text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto ">
            Contamos con un catálogo de productos que resuelve las necesidades más comunes de diferentes industrias.
          </p>
        </div>

        {/* ========================================================= */}
        {/* VERSIÓN DESKTOP: ACORDEÓN HORIZONTAL                     */}
        {/* ========================================================= */}
        <div className="hidden lg:flex gap-4 h-[640px] w-full">
          {rolesData.map((item, idx) => {
            const isActive = activeIndex === idx;

            return (
              <div
                key={item.id}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => setActiveIndex(idx)}
                className={`group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col p-8 ${
                  isActive 
                    ? 'flex-[6.5] bg-white dark:bg-[#12111a]/60 border-2 border-slate-200 dark:border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.08)] dark:shadow-2xl' 
                    : 'flex-[1] bg-slate-200/50 dark:bg-[#12111a]/20 border-2 border-slate-300 dark:border-white/10 hover:border-[#a100ff]/60 dark:hover:border-[#a100ff]/60 hover:bg-slate-200 dark:hover:bg-[#12111a]/40'
                }`}
              >
                <div className={`absolute bottom-0 transition-all duration-700 ease-out z-0 ${
                  isActive ? 'right-0 w-[45%] h-[95%] opacity-100' : 'inset-0 w-full h-full opacity-60 dark:opacity-40'
                }`}>
                  <img
                    src={item.image}
                    alt={item.role}
                    className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                      isActive 
                        ? 'object-bottom grayscale-0 brightness-100 scale-100' 
                        : 'object-top grayscale brightness-[0.6] dark:brightness-[0.35] contrast-125 scale-105 group-hover:grayscale-0 group-hover:brightness-75'
                    }`}
                  />
                  {!isActive && <div className="absolute inset-0 bg-slate-900/30 dark:bg-[#0a0a0f]/60 group-hover:bg-slate-900/10 dark:group-hover:bg-[#0a0a0f]/40"></div>}
                  {isActive && <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent dark:from-[#12111a] dark:via-transparent dark:to-transparent w-[20%]"></div>}
                </div>

                {!isActive && (
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <h3 className="font-poppins font-bold text-slate-700 dark:text-gray-300 text-2xl -rotate-90 whitespace-nowrap tracking-wider group-hover:text-[#a100ff] dark:group-hover:text-[#b656ff] ">
                      {item.role}
                    </h3>
                  </div>
                )}

                {isActive && (
                  <div className="relative z-10 flex flex-col h-full w-[60%] justify-center animate-fadeInLeft">
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="w-1.5 h-8 rounded-full bg-[#a100ff] shadow-[0_0_14px_rgba(161,0,255,0.9)]"></span>
                        <h3 className="font-poppins font-bold text-slate-900 dark:text-white text-4xl tracking-tight">{item.role}</h3>
                      </div>
                      <h4 className="font-gilroy text-lg font-bold text-[#437ceb] mt-3 mb-4">{item.subtitle}</h4>
                      <p className="font-gilroy text-base text-slate-600 dark:text-gray-300 leading-relaxed max-w-md">{item.description}</p>
                    </div>

                    <div className="bg-slate-50 dark:bg-white/[0.03] backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm mb-6 max-w-lg">
                      <h4 className="font-poppins text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-gray-400 mb-4">¿Qué puede hacer?</h4>
                      <ul className="grid grid-cols-1 gap-3 text-left">
                        {item.features.map((feat, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm font-gilroy text-slate-700 dark:text-gray-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#a100ff] mt-1.5 shrink-0 shadow-[0_0_8px_rgba(161,0,255,0.6)]"></span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

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
        {/* VERSIÓN MÓVIL: ACORDEÓN VERTICAL FLUIDO                  */}
        {/* ========================================================= */}
        <div className="flex lg:hidden flex-col gap-3 h-[750px] sm:h-[850px] w-full max-w-md mx-auto">
          {rolesData.map((item, idx) => {
            const isActive = activeIndex === idx;

            return (
              <div
                key={item.id}
                onClick={() => setActiveIndex(idx)}
                className={`group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col w-full ${
                  isActive 
                    ? 'flex-[7.5] bg-[#0a0a0f] border border-white/15 shadow-[0_12px_36px_rgba(0,0,0,0.3)]' 
                    : 'flex-[1] bg-slate-900/60 dark:bg-[#12111a]/40 border border-slate-700/50 dark:border-white/10 hover:border-slate-500 dark:hover:border-white/20'
                }`}
              >
                {/* Imagen del Avatar en Móvil */}
                <div className={`absolute inset-0 transition-all duration-700 ease-out z-0 pointer-events-none ${
                  isActive ? 'opacity-100' : 'opacity-30 grayscale'
                }`}>
                  <img
                    src={item.image}
                    alt={item.role}
                    className={`absolute top-0 right-0 w-full object-cover transition-all duration-700 ease-out ${
                      isActive 
                        ? 'h-[65%] object-top opacity-70 contrast-110' 
                        : 'h-[120%] object-center scale-110 -translate-y-4'
                    }`}
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80';
                    }}
                  />
                  {/* Degradados Mágicos */}
                  {isActive ? (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/95 to-transparent"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/80 via-transparent to-[#0a0a0f]/40"></div>
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-slate-900/40 dark:bg-[#0a0a0f]/60"></div>
                  )}
                </div>

                {/* Título Horizontal Centrado cuando la tarjeta está cerrada (Inactiva) */}
                {!isActive && (
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <h3 className="font-poppins font-bold text-slate-300 dark:text-gray-400 text-lg sm:text-xl tracking-wide group-hover:text-[#a100ff] dark:group-hover:text-white transition-colors duration-300">
                      {item.role}
                    </h3>
                  </div>
                )}

                {/* Contenido Completo de la tarjeta activa (Expandida) */}
                {isActive && (
                  <div className="relative z-10 flex flex-col justify-end h-full p-5 pt-32 animate-fadeInUp">
                    
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="w-1.5 h-5 bg-[#a100ff] shadow-[0_0_10px_rgba(161,0,255,0.85)] rounded-full"></span>
                        <h3 className="font-poppins text-2xl font-bold text-white tracking-tight leading-none">
                          {item.role}
                        </h3>
                      </div>
                      <h4 className="font-gilroy text-xs font-bold text-[#437ceb] mb-2">{item.subtitle}</h4>
                      <p className="font-gilroy text-xs text-gray-300 leading-relaxed mb-3 max-w-[95%]">{item.description}</p>
                    </div>

                    <div className="space-y-3 mt-1">
                      {/* Sub-tarjeta: Qué puede hacer */}
                      <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-3.5 shadow-inner">
                        <h4 className="font-poppins text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">¿Qué puede hacer?</h4>
                        <ul className="space-y-1.5 text-left">
                          {item.features.map((feat, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs font-gilroy text-gray-200 leading-snug">
                              <span className="w-1.25 h-1.25 rounded-full bg-[#a100ff] mt-1 shrink-0 shadow-[0_0_6px_rgba(161,0,255,0.6)]"></span>
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Botón */}
                      <div className="w-full py-3 px-4 rounded-full bg-gradient-to-r from-[#a100ff] to-[#437ceb] text-white font-gilroy font-bold text-xs text-center shadow-[0_0_15px_rgba(161,0,255,0.35)]">
                        ¡Tú controlas qué información consume DOMA!
                      </div>
                    </div>

                  </div>
                )}

                {/* Línea de color inferior decorativa */}
                <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-r ${item.color} z-10 transition-all duration-500 ${isActive ? 'h-1.5 opacity-100' : 'h-1 opacity-40'}`}></div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Animaciones requeridas para las entradas de texto */}
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

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 0.15s;
          opacity: 0;
        }
      `}</style>
    </section>
  );
}