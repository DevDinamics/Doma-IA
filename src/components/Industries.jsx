import React, { useState, useEffect, useRef } from 'react';

// --- BASE DE DATOS DE LOS 5 ROLES CON INFORMACIÓN QUE GESTIONA ---
const rolesData = [
  {
    id: 'retail',
    role: 'DOMA Finder',
    sector: 'Retail',
    image: '/RECURSOS DOMA SITIOMesa de trabajo 8.webp',
    description: 'Asesora a clientes en comercios y tiendas departamentales. Ayuda a encontrar productos en tienda y recomienda opciones según lo que la persona necesita.',
    features: [
      'Catálogo de productos',
      'Ubicación por pasillo o sección',
      'Información y características',
      'Promociones vigentes'
    ],
    color: 'from-[#a100ff] to-[#437ceb]'
  },
  {
    id: 'banking',
    role: 'DOMA Guide',
    sector: 'Banca y seguros',
    image: '/RECURSOS DOMA SITIOMesa de trabajo 7.webp',
    description: 'Recibe a los usuarios en sucursales bancarias. Orienta sobre trámites, requisitos y los canaliza con el ejecutivo correspondiente para su atención.',
    features: [
      'Trámites y requisitos',
      'Filas, ventanillas y canales',
      'Horarios y ubicaciones',
      'Productos y promociones',
      'Avisos institucionales'
    ],
    color: 'from-[#437ceb] to-[#2563eb]'
  },
  {
    id: 'hospitality',
    role: 'DOMA Concierge',
    sector: 'Hoteles y hospitalidad',
    image: '/RECURSOS DOMA SITIOMesa de trabajo 5.webp',
    description: 'Brinda atención a huéspedes de hoteles y otros servicios de alojamiento. Da a conocer servicios, experiencias y promociones del lugar.',
    features: [
      'Horarios y catálogo de servicios',
      'Mapa de instalaciones',
      'Información de Wi-Fi y accesos',
      'Agenda de actividades',
      'Promociones y programas de lealtad'
    ],
    color: 'from-[#437ceb] to-[#a100ff]'
  },
  {
    id: 'health',
    role: 'DOMA Navigator',
    sector: 'Centros de salud',
    image: '/RECURSOS DOMA SITIOMesa de trabajo 6.webp',
    description: 'Orienta a pacientes y visitantes dentro de la institución, localiza consultorios y resuelve dudas de atención médica y hospitalaria.',
    features: [
      'Directorio de médicos y áreas administrativas',
      'Horarios de atención',
      'Mapas e indicaciones',
      'Información de trámites y requisitos'
    ],
    color: 'from-[#b656ff] to-[#437ceb]'
  },
  {
    id: 'corporate',
    role: 'DOMA Host',
    sector: 'Corporativos y empresas',
    image: '/RECURSOS DOMA SITIOMesa de trabajo 9.webp',
    description: 'Recibe a visitantes de oficinas y corporativos. Da la bienvenida en nombre de la organización, los orienta y registra su visita.',
    features: [
      'Formulario de registro',
      'Directorio de áreas y salas',
      'Accesos y estacionamiento',
      'Información institucional'
    ],
    color: 'from-[#a100ff] to-[#7c3aed]'
  }
];

// Subcomponente individual para móvil
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
      className={`relative w-full rounded-3xl overflow-hidden border border-white/10 bg-[#12111a] p-6 sm:p-8 flex flex-col justify-end min-h-[500px] transform transition-all duration-700 ease-out will-change-transform ${
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
      {/* Capa de contraste oscuro */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/85 to-transparent"></div>

      {/* Pill de sector */}
      <div className="absolute top-5 left-5 z-10">
        <span className="px-3.5 py-1.5 rounded-full text-xs font-gilroy font-semibold tracking-wide bg-white/10 border border-white/15 text-white backdrop-blur-md">
          {item.sector}
        </span>
      </div>

      {/* Información del Rol en móvil */}
      <div className="relative z-10 space-y-4">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <span className="w-1.5 h-6 bg-[#a100ff] shadow-[0_0_12px_rgba(161,0,255,0.85)] rounded-full"></span>
            <h3 className="font-poppins text-2xl font-bold text-white tracking-tight leading-none">
              {item.role}
            </h3>
          </div>
          <p className="font-gilroy text-sm text-gray-300 leading-relaxed mb-4">
            {item.description}
          </p>
        </div>

        {/* Tarjeta interna con la información que gestiona */}
        <div className="bg-[#181722]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-5">
          <h4 className="font-poppins text-xs font-bold uppercase tracking-wider text-[#437ceb] mb-3">
            Información que gestiona
          </h4>
          <ul className="space-y-2 text-left">
            {item.features.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs font-gilroy text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#a100ff] mt-1.5 shrink-0"></span>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Botón interactivo inferior */}
        <div className="pt-2">
          <div className="w-full py-3 px-4 rounded-full bg-gradient-to-r from-[#a100ff] to-[#437ceb] text-white font-gilroy font-bold text-xs text-center shadow-[0_0_20px_rgba(161,0,255,0.35)]">
            ¡Tú decides qué información consume DOMA!
          </div>
        </div>
      </div>

      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color}`}></div>
    </div>
  );
};

export default function RolesGallery() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="roles" className="relative py-20 lg:py-32 px-4 sm:px-6 bg-[#0a0a0f] overflow-hidden select-none">
      
      {/* Luces y ambientación de fondo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-px bg-gradient-to-r from-transparent via-[#a100ff]/20 to-transparent"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] lg:w-[900px] h-[500px] bg-[#a100ff]/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* ENCABEZADO */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-16">
          <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-gray-300 text-xs sm:text-sm font-gilroy font-bold uppercase tracking-widest mb-4 inline-block shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            PRODUCTOS
          </span>
          <h2 className="font-poppins text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
            Un catálogo de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a100ff] to-[#437ceb]">roles diferentes</span> por sector
          </h2>
          <p className="font-gilroy text-base sm:text-lg text-gray-400 max-w-xl mx-auto">
            Cada puesto tiene un rol, un alcance y una promesa claros desde el primer día.
          </p>
        </div>

        {/* ========================================================= */}
        {/* VERSIÓN DESKTOP: ACCORDION GALLERY AMPLIADO              */}
        {/* ========================================================= */}
        <div className="hidden lg:flex gap-3 h-[580px] w-full">
          {rolesData.map((item, idx) => {
            const isActive = activeIndex === idx;

            return (
              <div
                key={item.id}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => setActiveIndex(idx)}
                className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col justify-end p-8 ${
                  isActive ? 'flex-[5.5] bg-[#12111a]/40 border border-white/15' : 'flex-[1] bg-[#12111a]/20 border border-white/5'
                }`}
              >
                {/* Imagen con transición y filtro */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.role}
                    className={`w-full h-full object-cover object-top transition-all duration-700 ease-out ${
                      isActive ? 'grayscale-0 brightness-100 scale-100' : 'grayscale brightness-[0.35] contrast-125 scale-105'
                    }`}
                    onError={(e) => {
                      e.currentTarget.src =
                        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80';
                    }}
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent transition-opacity duration-600 ${
                      isActive ? 'opacity-90' : 'opacity-60'
                    }`}
                  ></div>
                </div>

                {/* Contenido inferior al hacer hover/active */}
                <div className="relative z-10 flex flex-col justify-end">
                  
                  {/* Barra morada + Título */}
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className={`w-1.5 h-7 rounded-full bg-[#a100ff] shadow-[0_0_14px_rgba(161,0,255,0.9)] transition-opacity duration-500 ${
                        isActive ? 'opacity-100' : 'opacity-0'
                      }`}
                    ></span>
                    <h3
                      className={`font-poppins font-bold text-white transition-all duration-500 whitespace-nowrap ${
                        isActive ? 'text-3xl opacity-100 translate-x-0' : 'text-xl opacity-0 -translate-x-3'
                      }`}
                    >
                      {item.role}
                    </h3>
                  </div>

                  {/* Detalles completos al estar activo */}
                  {isActive && (
                    <div className="animate-fadeIn pl-4 space-y-4 mt-2">
                      <p className="font-gilroy text-xs font-bold tracking-[2px] text-[#437ceb] uppercase">
                        {item.sector} <span className="text-gray-500">•</span> {item.avatarName}
                      </p>
                      <p className="font-gilroy text-sm text-gray-200 leading-relaxed max-w-lg">
                        {item.description}
                      </p>

                      {/* Tarjeta de información que gestiona en Desktop */}
                      <div className="bg-[#181722]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-5 max-w-md shadow-2xl">
                        <h4 className="font-poppins text-xs font-bold uppercase tracking-wider text-[#437ceb] mb-3">
                          Información que gestiona
                        </h4>
                        <ul className="grid grid-cols-1 gap-2 text-left">
                          {item.features.map((feat, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-xs font-gilroy text-gray-300">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#a100ff] mt-1.5 shrink-0"></span>
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Botón inferior institucional */}
                      <div className="inline-block pt-1">
                        <div className="py-2.5 px-5 rounded-full bg-gradient-to-r from-[#a100ff] to-[#437ceb] text-white font-gilroy font-bold text-xs tracking-wide shadow-[0_0_20px_rgba(161,0,255,0.4)]">
                          ¡Tú decides qué información consume DOMA!
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* VERSIÓN MÓVIL: TARJETAS VERTICALES                        */}
        {/* ========================================================= */}
        <div className="flex lg:hidden flex-col gap-6 w-full">
          {rolesData.map((item) => (
            <MobileScrollCard key={item.id} item={item} />
          ))}
        </div>

      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </section>
  );
}