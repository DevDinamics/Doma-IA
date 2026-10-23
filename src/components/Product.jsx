import React from 'react';

const steps = [
  {
    num: "01",
    title: "Presencia",
    desc: "El tótem detecta a la persona y activa la conversación."
  },
  {
    num: "02",
    title: "Conversación",
    desc: "Explica lo que necesita por voz, sin menús ni pasos previos."
  },
  {
    num: "03",
    title: "Contexto e información",
    desc: "DOMA interpreta la consulta según su rol y responde con información aprobada."
  },
  {
    num: "04",
    title: "Apoyo visual",
    desc: "Acompaña la respuesta con imágenes, mapas o QR cuando ayuda a resolver más rápido."
  },
  {
    num: "05",
    title: "Resolución o derivación",
    desc: "Resuelve ahí mismo, o deriva con contexto si necesita a una persona."
  }
];

export default function Product() {
  return (
    <section id="producto" className="relative py-20 lg:py-28 px-4 sm:px-6 bg-slate-50 dark:bg-[#0a0a0f] overflow-hidden">
      
      {/* Luces y resplandores ambientales de fondo */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-300/60 dark:via-[#8257e6]/20 to-transparent"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] lg:w-[900px] h-[600px] lg:h-[900px] bg-[#8257e6]/[0.05] dark:bg-[#8257e6]/8 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* ENCABEZADOS PRINCIPALES */}
        <div className="text-center max-w-4xl mx-auto mb-14 lg:mb-20">
          
          {/* Tag de cabecera */}
          <span className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#8a00ff] via-[#6340f2] to-[#3b82f6] text-white text-xs sm:text-sm font-gilroy font-bold uppercase tracking-widest mb-6 inline-block shadow-[0_0_24px_rgba(138,0,255,0.4)]">
            ¿CÓMO FUNCIONA?
          </span>

          {/* Subtítulo de sección: Poppins Bold */}
          <h2 className="font-poppins font-bold text-2xl sm:text-4xl lg:text-5xl text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
            Un <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8257e6] to-[#a87ffb]">empleado digital</span> que fortalece 
            <br/> tu primera línea de atención
          </h2>

          {/* Texto de cuerpo/intro: Gilroy Regular */}
          <p className="font-gilroy font-normal text-base sm:text-xl lg:text-2xl text-slate-600 dark:text-gray-300 leading-relaxed">
            <span className="text-[#8257e6] font-semibold">DOMA</span> brinda a tus clientes una atención{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8257e6] to-[#a87ffb] font-semibold">ágil, efectiva <br/> y consistente</span>{' '}
            en todos tus puntos de contacto físicos
          </p>
        </div>

        {/* ========================================================= */}
        {/* VERSIÓN MÓVIL (< lg)                                      */}
        {/* ========================================================= */}
        <div className="flex flex-col lg:hidden items-center gap-8 w-full max-w-md mx-auto">
          
          {/* Tótem en cabecera móvil */}
          <div className="relative w-[200px] sm:w-[240px] flex items-center justify-center my-2">
            <div className="absolute inset-0 bg-[#8257e6]/10 rounded-2xl blur-xl pointer-events-none"></div>
            <img 
              src="/TOTEM DOMA SITIO.webp" 
              alt="Tótem DOMA — Empleado Digital"
              className="relative z-10 w-full h-auto object-contain max-h-[380px] sm:max-h-[460px] drop-shadow-[0_12px_28px_rgba(0,0,0,0.18)] dark:drop-shadow-[0_15px_35px_rgba(0,0,0,0.6)] select-none pointer-events-none transition-all duration-300"
            />
          </div>

          {/* Lista ordenada del 01 al 05 */}
          <div className="flex flex-col gap-6 w-full">
            {steps.map((step) => (
              <div key={step.num} className="flex items-center gap-4 text-left w-full">
                {/* Número del paso: Poppins SemiBold */}
                <div className="w-12 h-12 rounded-2xl bg-[#8257e6] text-white font-poppins font-semibold text-lg flex items-center justify-center shrink-0 shadow-[0_4px_16px_rgba(130,87,230,0.35)] leading-none select-none">
                  {step.num}
                </div>
                <div className="flex-1">
                  {/* Título del paso (Sub-subtítulo): Poppins SemiBold */}
                  <h4 className="font-poppins font-semibold text-base text-slate-900 dark:text-white mb-0.5">
                    {step.title}
                  </h4>
                  {/* Descripción: Gilroy Regular */}
                  <p className="font-gilroy font-normal text-xs sm:text-sm text-slate-600 dark:text-gray-400 leading-snug">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* VERSIÓN ESCRITORIO (lg+): DISEÑO SIMÉTRICO CON TÓTEM     */}
        {/* ========================================================= */}
        <div className="hidden lg:flex flex-row items-center justify-center max-w-5xl mx-auto">
          
          {/* Columna Izquierda (01, 03, 05) */}
          <div className="w-5/12 flex flex-col justify-between items-end h-[620px] py-6">
            
            {/* 01. Presencia */}
            <div className="flex flex-row items-center justify-end gap-3 text-right w-full">
              <div className="max-w-[230px]">
                <h4 className="font-poppins font-semibold text-lg text-slate-900 dark:text-white mb-0.5">
                  {steps[0].title}
                </h4>
                <p className="font-gilroy font-normal text-sm text-slate-600 dark:text-gray-400 leading-snug">
                  {steps[0].desc}
                </p>
              </div>
              <div className="w-14 border-b-2 border-dotted border-[#8257e6]/70"></div>
              <div className="w-14 h-14 rounded-2xl bg-[#8257e6] text-white font-poppins font-semibold text-xl flex items-center justify-center shrink-0 shadow-[0_4px_16px_rgba(130,87,230,0.35)] leading-none select-none">
                {steps[0].num}
              </div>
            </div>

            {/* 03. Contexto e información */}
            <div className="flex flex-row items-center justify-end gap-3 text-right w-full">
              <div className="max-w-[230px]">
                <h4 className="font-poppins font-semibold text-lg text-slate-900 dark:text-white mb-0.5">
                  {steps[2].title}
                </h4>
                <p className="font-gilroy font-normal text-sm text-slate-600 dark:text-gray-400 leading-snug">
                  {steps[2].desc}
                </p>
              </div>
              <div className="w-14 border-b-2 border-dotted border-[#8257e6]/70"></div>
              <div className="w-14 h-14 rounded-2xl bg-[#8257e6] text-white font-poppins font-semibold text-xl flex items-center justify-center shrink-0 shadow-[0_4px_16px_rgba(130,87,230,0.35)] leading-none select-none">
                {steps[2].num}
              </div>
            </div>

            {/* 05. Resolución o derivación */}
            <div className="flex flex-row items-center justify-end gap-3 text-right w-full">
              <div className="max-w-[230px]">
                <h4 className="font-poppins font-semibold text-lg text-slate-900 dark:text-white mb-0.5">
                  {steps[4].title}
                </h4>
                <p className="font-gilroy font-normal text-sm text-slate-600 dark:text-gray-400 leading-snug">
                  {steps[4].desc}
                </p>
              </div>
              <div className="w-14 border-b-2 border-dotted border-[#8257e6]/70"></div>
              <div className="w-14 h-14 rounded-2xl bg-[#8257e6] text-white font-poppins font-semibold text-xl flex items-center justify-center shrink-0 shadow-[0_4px_16px_rgba(130,87,230,0.35)] leading-none select-none">
                {steps[4].num}
              </div>
            </div>

          </div>

          {/* Columna Central: Tótem */}
          <div className="w-auto flex justify-center items-center px-4">
            <div className="relative w-[320px] xl:w-[340px] flex items-center justify-center">
              <div className="absolute inset-0 bg-[#8257e6]/10 rounded-2xl blur-xl pointer-events-none"></div>
              <img 
                src="/TOTEM DOMA SITIO.webp" 
                alt="Tótem DOMA — Empleado Digital"
                className="relative z-10 w-full h-auto object-contain max-h-[660px] drop-shadow-[0_15px_35px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_15px_35px_rgba(0,0,0,0.6)] select-none pointer-events-none transition-all duration-300"
              />
            </div>
          </div>

          {/* Columna Derecha (02, 04) */}
          <div className="w-5/12 flex flex-col justify-around items-start h-[620px] py-16">
            
            {/* 02. Conversación */}
            <div className="flex items-center justify-start gap-3 text-left w-full">
              <div className="w-14 h-14 rounded-2xl bg-[#8257e6] text-white font-poppins font-semibold text-xl flex items-center justify-center shrink-0 shadow-[0_4px_16px_rgba(130,87,230,0.35)] leading-none select-none">
                {steps[1].num}
              </div>
              <div className="w-14 border-b-2 border-dotted border-[#8257e6]/70"></div>
              <div className="max-w-[230px]">
                <h4 className="font-poppins font-semibold text-lg text-slate-900 dark:text-white mb-0.5">
                  {steps[1].title}
                </h4>
                <p className="font-gilroy font-normal text-sm text-slate-600 dark:text-gray-400 leading-snug">
                  {steps[1].desc}
                </p>
              </div>
            </div>

            {/* 04. Apoyo visual */}
            <div className="flex items-center justify-start gap-3 text-left w-full">
              <div className="w-14 h-14 rounded-2xl bg-[#8257e6] text-white font-poppins font-semibold text-xl flex items-center justify-center shrink-0 shadow-[0_4px_16px_rgba(130,87,230,0.35)] leading-none select-none">
                {steps[3].num}
              </div>
              <div className="w-14 border-b-2 border-dotted border-[#8257e6]/70"></div>
              <div className="max-w-[230px]">
                <h4 className="font-poppins font-semibold text-lg text-slate-900 dark:text-white mb-0.5">
                  {steps[3].title}
                </h4>
                <p className="font-gilroy font-normal text-sm text-slate-600 dark:text-gray-400 leading-snug">
                  {steps[3].desc}
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}