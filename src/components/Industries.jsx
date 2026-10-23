import React, { useState } from 'react';

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

export default function RolesGallery() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="roles" className="relative py-20 lg:py-32 px-4 sm:px-6 bg-slate-50 dark:bg-[#0a0a0f] overflow-hidden select-none">
      
      {/* Fondo ambiental estático optimizado */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-px bg-gradient-to-r from-transparent via-slate-300/60 dark:via-[#a100ff]/20 to-transparent pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] lg:w-[900px] h-[500px] bg-[#a100ff]/[0.03] dark:bg-[#a100ff]/5 rounded-full blur-[100px] pointer-events-none transform-gpu"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Encabezado */}
        <div className="text-center max-w-4xl mx-auto mb-12 lg:mb-16">
          <span className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#8a00ff] via-[#6340f2] to-[#3b82f6] text-white text-xs sm:text-sm font-poppins font-semibold uppercase tracking-widest mb-5 inline-block shadow-[0_0_24px_rgba(138,0,255,0.4)]">
            PRODUCTOS
          </span>
          
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 dark:text-white tracking-tight leading-[1.35] lg:leading-[1.3] py-1 mb-4">
            La <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#906ef1] to-[#906ef1]">misma experiencia </span> de servicio adaptada a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#437ceb] to-[#437ceb]"> diferentes necesidades </span> 
          </h2>
          
          <p className="font-gilroy font-normal text-base sm:text-xl lg:text-2xl text-slate-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto text-center">
            Contamos con un <span className="text-[#906ef1] font-bold">catálogo de productos</span> que resuelve las necesidades más comunes de <span className="text-[#8257e6] font-bold">diferentes industrias.</span>
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
                style={{
                  willChange: 'flex-grow',
                  transform: 'translateZ(0)',
                  WebkitBackfaceVisibility: 'hidden'
                }}
                className={`group relative rounded-3xl overflow-hidden cursor-pointer transition-[flex-grow,border-color,background-color] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col p-8 ${
                  isActive 
                    ? 'flex-[6.5] bg-white dark:bg-[#12111a] border-2 border-slate-200 dark:border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.12)]' 
                    : 'flex-[1] bg-slate-200/50 dark:bg-[#12111a]/40 border-2 border-slate-300 dark:border-white/10 hover:border-[#a100ff]/60 hover:bg-slate-200 dark:hover:bg-[#12111a]/60'
                }`}
              >
                {/* Contenedor del Avatar */}
                <div 
                  style={{ transform: 'translateZ(0)' }}
                  className={`absolute bottom-0 transition-[width,height,right] duration-500 ease-out z-0 pointer-events-none ${
                    isActive ? 'right-0 w-[45%] h-[95%]' : 'inset-0 w-full h-full'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.role}
                    loading="lazy"
                    decoding="async"
                    style={{ transform: 'translateZ(0)' }}
                    className={`w-full h-full object-cover transition-opacity duration-500 ease-out ${
                      isActive 
                        ? 'object-bottom opacity-100' 
                        : 'object-top opacity-80 group-hover:opacity-100'
                    }`}
                  />
                  
                  {/* Overlay en tarjeta inactiva (sin filtros CSS pesados) */}
                  <div 
                    className={`absolute inset-0 bg-slate-200/50 dark:bg-[#0a0a0f]/60 transition-opacity duration-300 ${
                      isActive ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'
                    }`}
                  />

                  {/* Gradiente en tarjeta activa */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent dark:from-[#12111a] dark:via-transparent dark:to-transparent w-[25%] pointer-events-none"></div>
                  )}
                </div>

                {/* Título inactivo */}
                <div 
                  className={`absolute inset-0 flex items-center justify-center z-10 pointer-events-none transition-opacity duration-300 ${
                    isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  }`}
                >
                  <h3 className="font-poppins font-semibold text-slate-800 dark:text-gray-200 text-2xl -rotate-90 whitespace-nowrap tracking-wider group-hover:text-[#a100ff] dark:group-hover:text-[#b656ff] transition-colors duration-200">
                    {item.role}
                  </h3>
                </div>

                {/* Contenido de tarjeta activa */}
                {isActive && (
                  <div className="relative z-10 flex flex-col h-full w-[60%] justify-center animate-fadeInLeft">
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="w-1.5 h-8 rounded-full bg-[#a100ff] shadow-[0_0_14px_rgba(161,0,255,0.9)]"></span>
                        <h3 className="font-poppins font-semibold text-slate-900 dark:text-white text-4xl tracking-tight">{item.role}</h3>
                      </div>
                      <h4 className="font-gilroy font-normal text-lg text-[#437ceb] mt-3 mb-4">{item.subtitle}</h4>
                      <p className="font-gilroy font-normal text-base text-slate-600 dark:text-gray-300 leading-relaxed max-w-md">{item.description}</p>
                    </div>

                    {/* Contenedor de características: opacidad sólida en Safari en vez de backdrop-blur extremo */}
                    <div className="bg-slate-50/90 dark:bg-[#1a1826]/85 border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm mb-6 max-w-lg">
                      <h4 className="font-poppins font-semibold text-xs uppercase tracking-widest text-slate-500 dark:text-gray-400 mb-4">¿Qué puede hacer?</h4>
                      <ul className="grid grid-cols-1 gap-3 text-left">
                        {item.features.map((feat, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm font-gilroy font-normal text-slate-700 dark:text-gray-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#a100ff] mt-1.5 shrink-0 shadow-[0_0_8px_rgba(161,0,255,0.6)]"></span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="inline-block">
                      <div className="inline-flex py-3 px-6 rounded-full bg-gradient-to-r from-[#a100ff] to-[#437ceb] text-white font-poppins font-semibold text-sm tracking-wide shadow-[0_0_20px_rgba(161,0,255,0.3)] hover:shadow-[0_0_25px_rgba(161,0,255,0.5)] transition-shadow cursor-default">
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
                style={{
                  willChange: 'flex-grow',
                  transform: 'translateZ(0)',
                  WebkitBackfaceVisibility: 'hidden'
                }}
                className={`group relative rounded-3xl overflow-hidden cursor-pointer transition-[flex-grow,border-color] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col w-full ${
                  isActive 
                    ? 'flex-[7.5] bg-[#0a0a0f] border border-white/15 shadow-[0_12px_36px_rgba(0,0,0,0.3)]' 
                    : 'flex-[1] bg-slate-900/80 dark:bg-[#12111a]/60 border border-slate-700/50 dark:border-white/10'
                }`}
              >
                <div 
                  style={{ transform: 'translateZ(0)' }}
                  className={`absolute inset-0 transition-opacity duration-500 ease-out z-0 pointer-events-none ${
                    isActive ? 'opacity-100' : 'opacity-40'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.role}
                    loading="lazy"
                    decoding="async"
                    className={`absolute top-0 right-0 w-full object-cover transition-[height,opacity] duration-500 ease-out ${
                      isActive 
                        ? 'h-[65%] object-top opacity-70' 
                        : 'h-[110%] object-center opacity-40'
                    }`}
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80';
                    }}
                  />
                  {isActive ? (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/95 to-transparent"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/80 via-transparent to-[#0a0a0f]/40"></div>
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-slate-900/50 dark:bg-[#0a0a0f]/70"></div>
                  )}
                </div>

                {/* Título móvil inactivo */}
                <div 
                  className={`absolute inset-0 flex items-center justify-center z-10 pointer-events-none transition-opacity duration-300 ${
                    isActive ? 'opacity-0' : 'opacity-100'
                  }`}
                >
                  <h3 className="font-poppins font-semibold text-slate-300 dark:text-gray-400 text-lg sm:text-xl tracking-wide group-hover:text-[#a100ff] dark:group-hover:text-white transition-colors duration-200">
                    {item.role}
                  </h3>
                </div>

                {/* Contenido móvil activo */}
                {isActive && (
                  <div className="relative z-10 flex flex-col justify-end h-full p-5 pt-32 animate-fadeInUp">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="w-1.5 h-5 bg-[#a100ff] shadow-[0_0_10px_rgba(161,0,255,0.85)] rounded-full"></span>
                        <h3 className="font-poppins font-semibold text-2xl text-white tracking-tight leading-none">
                          {item.role}
                        </h3>
                      </div>
                      <h4 className="font-gilroy font-normal text-xs text-[#437ceb] mb-2">{item.subtitle}</h4>
                      <p className="font-gilroy font-normal text-xs text-gray-300 leading-relaxed mb-3 max-w-[95%]">{item.description}</p>
                    </div>

                    <div className="space-y-3 mt-1">
                      <div className="bg-[#12111a]/90 border border-white/10 rounded-2xl p-3.5 shadow-inner">
                        <h4 className="font-poppins font-semibold text-[10px] uppercase tracking-widest text-gray-400 mb-2">¿Qué puede hacer?</h4>
                        <ul className="space-y-1.5 text-left">
                          {item.features.map((feat, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs font-gilroy font-normal text-gray-200 leading-snug">
                              <span className="w-1.25 h-1.25 rounded-full bg-[#a100ff] mt-1 shrink-0 shadow-[0_0_6px_rgba(161,0,255,0.6)]"></span>
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="w-full py-3 px-4 rounded-full bg-gradient-to-r from-[#a100ff] to-[#437ceb] text-white font-poppins font-semibold text-xs text-center shadow-[0_0_15px_rgba(161,0,255,0.35)]">
                        ¡Tú controlas qué información consume DOMA!
                      </div>
                    </div>
                  </div>
                )}

                <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-r ${item.color} z-10 transition-all duration-300 ${isActive ? 'h-1.5 opacity-100' : 'h-1 opacity-40'}`}></div>

              </div>
            );
          })}
        </div>

      </div>

      <style>{`
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translate3d(-12px, 0, 0); }
          to { opacity: 1; transform: translate3d(0, 0, 0); }
        }
        .animate-fadeInLeft {
          animation: fadeInLeft 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
          will-change: transform, opacity;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translate3d(0, 12px, 0); }
          to { opacity: 1; transform: translate3d(0, 0, 0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
          will-change: transform, opacity;
        }
      `}</style>
    </section>
  );
}