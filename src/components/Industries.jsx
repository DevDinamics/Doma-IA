import React, { useState, useEffect, useRef } from 'react';

// --- BASE DE DATOS DE LOS 5 ROLES ---
const rolesData = [
  {
    id: 'retail',
    role: 'Product finder',
    sector: 'Retail',
    avatarName: 'TINA',
    image: '/roles/retail.webp',
    description: 'Ayuda a encontrar productos, entender sus características y saber exactamente dónde localizarlos en tienda.',
    color: 'from-[#a100ff] to-[#437ceb]'
  },
  {
    id: 'hospitality',
    role: 'Concierge 24/7',
    sector: 'Hoteles y hospitalidad',
    avatarName: 'LINDA',
    image: '/roles/hospitality.webp',
    description: 'Atiende consultas frecuentes de huéspedes, agiliza solicitudes y da a conocer servicios, amenidades y promociones.',
    color: 'from-[#437ceb] to-[#a100ff]'
  },
  {
    id: 'health',
    role: 'Hospital navigator',
    sector: 'Centros de salud',
    avatarName: 'FRIDA',
    image: '/roles/health.webp',
    description: 'Orienta a pacientes y visitantes dentro de la institución, localiza consultorios y resuelve dudas de atención pública.',
    color: 'from-[#b656ff] to-[#437ceb]'
  },
  {
    id: 'banking',
    role: 'Orientador de trámites',
    sector: 'Banca y seguros',
    avatarName: 'NINA',
    image: '/roles/banking.webp',
    description: 'Guía a clientes de sucursal hacia el trámite, la fila o el canal digital correcto, evitando saturación en ventanillas.',
    color: 'from-[#437ceb] to-[#2563eb]'
  },
  {
    id: 'corporate',
    role: 'Host corporativo',
    sector: 'Corporativos y empresas',
    avatarName: 'ALEX',
    image: '/roles/corporate.webp',
    description: 'Recibe visitas en recepción, gestiona accesos, notifica a los anfitriones y brinda soporte de bienvenida 24/7.',
    color: 'from-[#a100ff] to-[#7c3aed]'
  }
];

// Subcomponente individual para móvil con animación de scroll
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
      className={`relative w-full rounded-2xl overflow-hidden border border-white/10 bg-[#12111a] p-6 flex flex-col justify-end min-h-[340px] transform transition-all duration-700 ease-out will-change-transform ${
        isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'
      }`}
    >
      {/* Imagen de fondo */}
      <img
        src={item.image}
        alt={item.role}
        className="absolute inset-0 w-full h-full object-cover object-top"
        onError={(e) => {
          e.currentTarget.src =
            'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80';
        }}
      />
      {/* Capa de contraste */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/75 to-transparent"></div>

      {/* Pill de sector */}
      <div className="absolute top-4 left-4 z-10">
        <span className="px-3 py-1 rounded-full text-[11px] font-gilroy font-semibold tracking-wide bg-white/10 border border-white/15 text-white backdrop-blur-md">
          {item.sector}
        </span>
      </div>

      {/* Información del Rol en móvil con color DOMA */}
      <div className="relative z-10">
        <span className="text-[11px] font-gilroy font-extrabold tracking-[2px] text-[#a100ff] uppercase block mb-1">
          {item.sector} • {item.avatarName}
        </span>
        <div className="flex items-center gap-2.5 mb-2">
          <span className="w-1.5 h-5 bg-[#a100ff] shadow-[0_0_10px_rgba(161,0,255,0.7)] rounded-full"></span>
          <h3 className="font-poppins text-xl font-bold text-white tracking-tight leading-none">
            {item.role}
          </h3>
        </div>
        <p className="font-gilroy text-xs text-gray-300 leading-relaxed">
          {item.description}
        </p>
      </div>

      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color}`}></div>
    </div>
  );
};

export default function RolesGallery() {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <section id="roles" className="relative py-20 lg:py-32 px-4 sm:px-6 bg-[#0a0a0f] overflow-hidden select-none">
      
      {/* Luces y ambientación de fondo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-px bg-gradient-to-r from-transparent via-[#a100ff]/20 to-transparent"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] lg:w-[900px] h-[500px] bg-[#a100ff]/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* ENCABEZADO */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-16">
          <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-gray-300 text-xs sm:text-sm font-gilroy font-bold uppercase tracking-widest mb-4 inline-block shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            Especialización
          </span>
          <h2 className="font-poppins text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
            Un catálogo de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a100ff] to-[#437ceb]">roles diferentes</span> por sector
          </h2>
          <p className="font-gilroy text-base sm:text-lg text-gray-400 max-w-xl mx-auto">
            Cada puesto tiene un rol, un alcance y una promesa claros desde el primer día.
          </p>
        </div>

        {/* ========================================================= */}
        {/* VERSIÓN DESKTOP: ACCORDION GALLERY CON COLORES DOMA       */}
        {/* ========================================================= */}
        <div className="hidden lg:flex gap-2.5 h-[480px] w-full">
          {rolesData.map((item, idx) => {
            const isActive = activeIndex === idx;

            return (
              <div
                key={item.id}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => setActiveIndex(idx)}
                className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-600 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col justify-end p-7 ${
                  isActive ? 'flex-[4.5]' : 'flex-[1]'
                }`}
              >
                {/* Imagen con centrado y filtro blanco y negro en paneles inactivos */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.role}
                    className={`w-full h-full object-cover object-center transition-all duration-700 ease-out ${
                      isActive ? 'grayscale-0 brightness-100 scale-100' : 'grayscale brightness-[0.38] contrast-125 scale-105'
                    }`}
                    onError={(e) => {
                      e.currentTarget.src =
                        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80';
                    }}
                  />
                  <div
                    className={`absolute inset-0 bg-[#060010] transition-opacity duration-600 ${
                      isActive ? 'opacity-20' : 'opacity-40'
                    }`}
                  ></div>
                </div>

                {/* Contenido inferior con el color de acento morado DOMA */}
                <div className="relative z-10 flex flex-col justify-end">
                  
                  {/* Barra morada (#a100ff) + Título */}
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-1.5 h-6 rounded-full bg-[#a100ff] shadow-[0_0_12px_rgba(161,0,255,0.85)] transition-opacity duration-500 ${
                        isActive ? 'opacity-100' : 'opacity-0'
                      }`}
                    ></span>
                    <h3
                      className={`font-poppins font-bold text-white transition-all duration-500 whitespace-nowrap ${
                        isActive ? 'text-2xl sm:text-3xl opacity-100 translate-x-0' : 'text-xl opacity-0 -translate-x-3'
                      }`}
                    >
                      {item.role}
                    </h3>
                  </div>

                  {/* Subtítulo de sector + avatar en morado DOMA y descripción */}
                  {isActive && (
                    <div className="animate-fadeIn mt-2 pl-4">
                      <p className="font-gilroy text-xs font-bold tracking-[2px] text-[#a100ff] uppercase mb-1.5">
                        {item.sector} <span className="text-gray-500">•</span> {item.avatarName}
                      </p>
                      <p className="font-gilroy text-sm text-gray-200 leading-relaxed max-w-md">
                        {item.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* VERSIÓN MÓVIL: SCROLL ANIMADO AL BAJAR                    */}
        {/* ========================================================= */}
        <div className="flex lg:hidden flex-col gap-4 w-full">
          {rolesData.map((item) => (
            <MobileScrollCard key={item.id} item={item} />
          ))}
        </div>

      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </section>
  );
}