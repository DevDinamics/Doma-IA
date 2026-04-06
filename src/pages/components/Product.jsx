import React, { useEffect, useRef, useState } from 'react';

// --- COMPONENTE DE TARJETA INDIVIDUAL (Ultra PRO) ---
const ProductCard = ({ number, title, description, colorClasses, index }) => {
  const cardRef = useRef(null);
  const trackerRef = useRef(null); // Nos sirve para medir el scroll real sin afectar el sticky
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // 1. Animación de entrada inicial (Fade + Slide)
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
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  // 2. Cálculo del Stacking 3D al hacer Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!trackerRef.current) return;
      const rect = trackerRef.current.getBoundingClientRect();
      
      // El punto donde la tarjeta se "pega" en la pantalla
      const stickyTop = 120 + (index * 30);
      
      // Si el usuario scrolleó más abajo del punto de pegado, calculamos cuánto para achicarla
      if (rect.top < stickyTop) {
        const overScroll = stickyTop - rect.top;
        const progress = Math.min(overScroll / 400, 1); // Normalizamos de 0 a 1
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [index]);

  // 3. Efecto Linterna (Spotlight) siguiendo el ratón
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  // Matemáticas para el efecto 3D
  const scale = 1 - scrollProgress * 0.05; // Se encoje hasta un 5%
  const opacity = 1 - scrollProgress * 0.5; // Se oscurece al quedar atrás

  return (
    <div className="relative w-full">
      {/* Tracker invisible que fluye con el documento para medir el scroll */}
      <div ref={trackerRef} className="absolute w-full h-px -top-8" />
      
      {/* Contenedor Sticky */}
      <div 
        className="sticky z-10 w-full" 
        style={{ top: `${120 + index * 30}px` }}
      >
        {/* Capa que aplica el Scale 3D hacia atrás */}
        <div 
          className="w-full origin-top"
          style={{
            transform: `scale(${scale})`,
            opacity: opacity,
            transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
          }}
        >
          {/* La Tarjeta Visual */}
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            className={`relative p-8 md:p-12 rounded-[32px] bg-[#0f0f15] border border-white/5 group overflow-hidden transform transition-all duration-1000 ease-out
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'}
              ${colorClasses.border} hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]
            `}
          >
            {/* Efecto Spotlight (Linterna Mágica) */}
            <div 
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
              style={{
                background: `radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(255,255,255,0.06), transparent 40%)`
              }}
            />

            {/* Brillo de fondo estático en la esquina */}
            <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${colorClasses.bg} to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}></div>

            {/* Contenido */}
            <span className={`relative z-10 font-gilroy text-sm font-bold tracking-[3px] uppercase mb-4 block ${colorClasses.text}`}>
              {number}
            </span>
            <h3 className="relative z-10 font-poppins text-2xl md:text-3xl font-semibold text-white mb-4 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-300">
              {title}
            </h3>
            <p className="relative z-10 font-gilroy text-gray-400 leading-relaxed text-lg">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


// --- SECCIÓN PRINCIPAL ---
export default function Product() {
  const cards = [
    {
      number: "01 — El Cerebro",
      title: "QOPA conecta el 100% de tu empresa en tiempo real",
      description: "No memoriza scripts. Accede a toda tu data viva: catálogos, políticas, inventarios, CRM. Actualización instantánea en todos los puntos.",
      colorClasses: { bg: "from-[#a100ff]/30", text: "text-[#a100ff]", border: "hover:border-[#a100ff]/30" }
    },
    {
      number: "02 — La Cara",
      title: "Conversación natural, no respuestas pregrabadas",
      description: "Un Digital Sales Executive con nombre, voz y personalidad de tu marca. Responde como un experto de tu equipo — en tiempo real, por voz y pantalla.",
      colorClasses: { bg: "from-[#437ceb]/30", text: "text-[#437ceb]", border: "hover:border-[#437ceb]/30" }
    },
    {
      number: "03 — La Presencia",
      title: "Hardware propio para el mundo real",
      description: "Micrófonos optimizados para entornos ruidosos. Llave en mano. La competencia depende del hardware del cliente. DOMA no.",
      colorClasses: { bg: "from-[#906ef7]/30", text: "text-[#906ef7]", border: "hover:border-[#906ef7]/30" }
    }
  ];

  return (
    <section id="producto" className="relative py-32 px-6 bg-[#0a0a0f] overflow-hidden">
      
      {/* Efectos de luz de fondo globales */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#a100ff]/20 to-transparent"></div>
      <div className="absolute -left-[20%] top-1/4 w-[800px] h-[800px] bg-[#a100ff]/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative items-start">
          
          {/* COLUMNA IZQUIERDA: Textos y Tótem (Sticky Scroll) */}
          <div className="lg:w-5/12 flex flex-col items-start lg:sticky lg:top-32 z-10">
            <span className="px-4 py-1.5 rounded-full border border-[#a100ff]/30 bg-[#a100ff]/10 text-[#a100ff] text-sm font-gilroy font-bold uppercase tracking-widest mb-8 inline-block shadow-[0_0_15px_rgba(161,0,255,0.2)]">
              El producto
            </span>
            
            <h2 className="font-poppins text-4xl md:text-5xl lg:text-[52px] font-bold text-white leading-[1.1] mb-6 tracking-tighter">
              No es un chatbot.<br/>
              <span className="text-gray-600">No es un kiosco.</span><br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a100ff] to-[#437ceb]">
                Es un Digital Sales Executive.
              </span>
            </h2>
            
            {/* Reducimos mb-12 a mb-6 para subir la imagen */}
            <p className="font-gilroy text-xl text-gray-400 mb-6">
              Tres capacidades que ningún competidor global tiene juntas.
            </p>

            {/* Tótem DOMA (Producto) - Realistic Vitrine */}
            <div className="flex-1 relative animate-fade-in delay-300 w-full max-w-sm mx-auto lg:mx-0">
                <div className="relative w-full aspect-[4/5] flex items-center justify-center group">
                  
                  {/* ANILLOS DE ENERGÍA Y ORBITAS (El Entorno Pro) */}
                  <div className="absolute w-[80%] h-[80%] border border-white/5 rounded-full animate-[spin_20s_linear_infinite] pointer-events-none"></div>
                  <div className="absolute w-[60%] h-[60%] border border-[#a100ff]/10 rounded-full animate-[spin_15s_linear_infinite_reverse] pointer-events-none"></div>
                  
                  {/* Plataforma de luz esmerilada en la base del tótem */}
                  <div className="absolute bottom-10 w-[60%] h-32 bg-gradient-to-t from-[#a100ff]/20 to-transparent rounded-full blur-2xl opacity-70 pointer-events-none"></div>
                  <div className="absolute bottom-20 w-[40%] h-4 bg-white/5 border border-white/10 backdrop-blur-sm rounded-full pointer-events-none"></div>

                  {/* The Realistic Totem Image (Static, Clean and Large) */}
                  <img 
                    src="/doma-product.png" 
                    alt="DOMA — Digital Sales Executive Tótem Físico Pulido"
                    className="relative z-10 w-full h-full object-contain object-bottom p-6 group-hover:scale-[1.01] transition-transform duration-700 brightness-110 contrast-110 drop-shadow-[0_0_15px_rgba(161,0,255,0.3)]"
                    style={{ 
                      mixBlendMode: 'screen', // <-- ¡Corregido! Sin el guion
                      maskImage: 'linear-gradient(to top, transparent 0%, black 15%)', 
                      WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 15%)' 
                    }}
                  />
                  {/* Efecto de brillo de fondo detrás del tótem (Vitrine Effect) */}
                  <div className="absolute inset-x-0 bottom-0 top-1/4 bg-gradient-to-t from-[#a100ff]/20 to-transparent rounded-[40px] blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: Las Tarjetas Stacking */}
          {/* Se le da un pb (padding-bottom) extra para tener espacio para hacer scroll y que se apilen */}
          <div className="lg:w-7/12 flex flex-col gap-24 pb-32 z-10 w-full">
            {cards.map((card, idx) => (
              <ProductCard 
                key={idx}
                index={idx}
                number={card.number}
                title={card.title}
                description={card.description}
                colorClasses={card.colorClasses}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}