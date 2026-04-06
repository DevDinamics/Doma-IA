import React, { useState } from 'react';

const FaqItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div 
      className={`group border-b border-white/10 transition-all duration-500 ${isOpen ? 'bg-white/[0.03]' : 'hover:bg-white/[0.01]'}`}
    >
      <button
        onClick={onClick}
        className="w-full py-7 px-4 flex items-center justify-between text-left transition-all"
      >
        <span className={`font-poppins text-lg md:text-xl font-medium pr-8 transition-colors duration-300 ${isOpen ? 'text-[#a100ff]' : 'text-white/90 group-hover:text-white'}`}>
          {question}
        </span>
        <div className={`relative flex-shrink-0 w-6 h-6 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`}>
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-current"></div>
          <div className={`absolute top-0 left-1/2 h-full w-[2px] bg-current transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></div>
        </div>
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="px-4 pb-8 font-gilroy text-gray-400 text-lg leading-relaxed max-w-3xl">
          {answer}
        </div>
      </div>
    </div>
  );
};

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0); // La primera abierta por defecto para invitar a la interacción

  const faqs = [
    {
      q: "¿Qué pasa cuando el cliente necesita hablar con una persona?",
      a: "DOMA complementa, no reemplaza. El 60–70% de consultas se resuelven solas. Para el resto, DOMA alerta al asesor o agenda la cita. El equipo humano se enfoca en lo que realmente requiere intervención humana."
    },
    {
      q: "¿Funciona en espacios ruidosos?",
      a: "Sí. Micrófonos direccionales propios, optimizados para ese entorno. La competencia depende del hardware del cliente. Nosotros controlamos el hardware completo: posicionamiento, dirección, altura y aislamiento."
    },
    {
      q: "¿Cómo se actualiza cuando cambian precios o políticas?",
      a: "QOPA actualiza todos los puntos en segundos. Sin intervención manual, sin desactualización. Cuando tú cambias algo en la fuente, todos los Digital Sales Executives lo saben de inmediato."
    },
    {
      q: "¿Cuánto tiempo tarda la instalación?",
      a: "2 a 4 semanas de contrato a Digital Sales Executive operativo. Esto incluye configuración, carga de conocimiento y pruebas. La instalación física del tótem toma menos de un día."
    },
    {
      q: "¿Qué datos recibo?",
      a: "Dashboard completo: interacciones, preguntas frecuentes, patrones por horario, satisfacción. Inteligencia del punto de venta que antes simplemente no existía."
    },
    {
      q: "¿Se integra con mi CRM o ERP?",
      a: "Sí. QOPA tiene API abierta para HubSpot, Salesforce, Oracle, SAP y sistemas propios. Cada interacción puede generar un registro automático y disparar flujos de seguimiento."
    },
    {
      q: "¿Cómo funciona el modelo comercial?",
      a: "Digital Sales Executive por mes. Tarifa fija sin capex. Incluye todo: tótem, IA, QOPA, soporte. Piloto primero, escalamiento después. Sin proyecto largo, sin riesgo inicial."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-[#0a0a0f] relative overflow-hidden">
      {/* Glow de fondo decorativo */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#437ceb]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* LADO IZQUIERDO: Header */}
          <div className="lg:w-1/3">
            <div className="sticky top-32">
              <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[#a100ff] text-xs font-gilroy font-bold uppercase tracking-widest mb-6 inline-block">
                FAQ
              </span>
              <h2 className="font-poppins text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Preguntas<br/>frecuentes.
              </h2>
              <p className="font-gilroy text-xl text-gray-400">
                Todo lo que necesitas saber antes de agendar tu demo.
              </p>
            </div>
          </div>

          {/* LADO DERECHO: Lista Acordeón */}
          <div className="lg:w-2/3 border-t border-white/10">
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