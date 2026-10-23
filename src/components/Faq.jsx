import React, { useState } from 'react';

const FaqItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div 
      className={`group border-b border-slate-200/80 dark:border-white/10 ${
        isOpen ? 'bg-slate-100/60 dark:bg-white/[0.03]' : 'hover:bg-slate-50/50 dark:hover:bg-white/[0.01]'
      }`}
    >
      <button
        onClick={onClick}
        className="w-full py-7 px-4 flex items-center justify-between text-left transition-all cursor-pointer"
      >
        {/* Pregunta: Poppins SemiBold según manual */}
        <span className={`font-poppins text-lg md:text-xl font-semibold pr-8 ${
          isOpen ? 'text-[#a100ff]' : 'text-slate-900/90 dark:text-white/90 group-hover:text-black dark:group-hover:text-white'
        }`}>
          {question}
        </span>
        
        {/* PARCHE SAFARI 1: transform-gpu en el ícono */}
        <div className={`relative flex-shrink-0 w-6 h-6 transition-transform duration-500 transform-gpu text-slate-800 dark:text-white ${
          isOpen ? 'rotate-180 text-[#a100ff] dark:text-[#a100ff]' : ''
        }`}>
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-current"></div>
          <div className={`absolute top-0 left-1/2 h-full w-[2px] bg-current transition-opacity duration-300 ${
            isOpen ? 'opacity-0' : 'opacity-100'
          }`}></div>
        </div>
      </button>
      
      {/* PARCHE SAFARI 2: transform-gpu en el contenedor colapsable */}
      <div 
        className={`transform-gpu overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {/* Respuesta: Gilroy Regular según manual */}
        <div className="px-4 pb-8 font-gilroy font-normal text-slate-600 dark:text-gray-400 text-lg leading-relaxed max-w-3xl">
          {answer}
        </div>
      </div>
    </div>
  );
};

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "¿Qué pasa cuando el cliente necesita hablar con una persona?",
      a: "DOMA detecta cuándo escalar y transfiere la conversación a un humano con todo el contexto. No reemplaza a tu equipo, lo libera de lo repetitivo."
    },
    {
      q: "¿Funciona en espacios ruidosos?",
      a: "Sí. El tótem está diseñado para operar en tiendas, lobbies, terminales y sucursales con ruido ambiental constante. Usamos hardware optimizado para captura de audio direccional."
    },
    {
      q: "¿Cómo se actualiza cuando cambian precios, políticas o inventarios?",
      a: "DOMA se conecta directo a tu información en la nube. Cuando algo cambia en tu sistema, DOMA lo sabe en tiempo real. No hay actualizaciones manuales."
    },
    {
      q: "¿Cuánto tiempo tarda la instalación?",
      a: "Dependiendo de la complejidad de integración, un piloto puede estar operando en 4-8 semanas. El hardware se instala en un día."
    },
    {
      q: "¿Qué datos recibo sobre las interacciones?",
      a: "Todo: qué preguntan tus clientes, qué productos buscan, qué no encuentran, a qué hora interactúan más, qué objeciones repiten. Información que hoy no tienes."
    },
    {
      q: "¿Se integra con mi CRM, ERP o sistemas internos?",
      a: "Sí. DOMA se conecta a la infraestructura que ya tienes en la nube: inventarios, catálogos, CRM, bases de conocimiento. La integración es parte del despliegue."
    },
    {
      q: "¿Cómo funciona el modelo comercial?",
      a: "DOMA es un empleado digital por suscripción mensual. Incluye hardware, software, IA, mantenimiento y soporte. No compras licencias, contratas capacidad operativa."
    },
    {
      q: "¿Puede vender o solo informa?",
      a: "Ambas. DOMA recomienda productos, ofrece upgrades, detecta oportunidades de cross-sell y puede cerrar transacciones simples. No es un FAQ con cara, es un punto de venta activo."
    },
    {
      q: "¿Qué pasa si mi operación tiene cientos de sucursales?",
      a: "Escala. Tu información ya está centralizada en la nube, así que DOMA en la sucursal 1 sabe lo mismo que DOMA en la sucursal 500. Misma experiencia, mismo conocimiento, cero variabilidad."
    },
    {
      q: "¿Qué tan rápido veo resultados?",
      a: "Desde el primer mes tienes datos de comportamiento que antes no existían. El ROI en ahorro o ventas adicionales típicamente se demuestra en el primer trimestre de operación."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-slate-50 dark:bg-[#0a0a0f] relative overflow-hidden">
      
      {/* PARCHE SAFARI 3: transform-gpu en el glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#437ceb]/5 rounded-full blur-[120px] pointer-events-none transform-gpu"></div>

      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16">
          
          <div className="lg:w-1/3">
            <div className="sticky top-32">
              {/* Badge: Poppins SemiBold */}
              <span className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#8a00ff] via-[#6340f2] to-[#3b82f6] text-white text-xs sm:text-sm font-poppins font-semibold uppercase tracking-widest mb-6 inline-block shadow-[0_0_24px_rgba(138,0,255,0.4)]">
                FAQ
              </span>
              {/* Subtítulo de Sección H2: Poppins Bold */}
              <h2 className="font-poppins font-bold text-4xl md:text-5xl text-slate-900 dark:text-white mb-6 leading-tight">
                Preguntas<br/>frecuentes.
              </h2>
              {/* Texto de introducción: Gilroy Regular */}
              <p className="font-gilroy font-normal text-xl text-slate-600 dark:text-gray-400">
                Todo lo que necesitas saber antes de agendar tu demo.
              </p>
            </div>
          </div>

          <div className="lg:w-2/3 border-t border-slate-200/80 dark:border-white/10">
            {faqs.map((faq, index) => (
              <FaqItem
                key={index}
                question={faq.q}
                answer={faq.a}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}