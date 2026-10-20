import React from 'react';

export default function Product() {
  return (
    <section id="producto" className="relative py-20 lg:py-28 px-4 sm:px-6 bg-slate-50 dark:bg-[#0a0a0f] overflow-hidden transition-colors duration-300">
      
      {/* Luces y resplandores ambientales de fondo adaptables */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-300/60 dark:via-[#8257e6]/20 to-transparent"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] lg:w-[900px] h-[600px] lg:h-[900px] bg-[#8257e6]/[0.05] dark:bg-[#8257e6]/8 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* ENCABEZADOS PRINCIPALES */}
        <div className="text-center max-w-4xl mx-auto mb-14 lg:mb-20">
          <h2 className="font-poppins text-2xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight mb-4 transition-colors duration-300">
            Un <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8257e6] to-[#a87ffb]">empleado digital</span> que fortalece tu primera línea de atención.
          </h2>
          <p className="font-gilroy text-base sm:text-xl lg:text-2xl text-slate-600 dark:text-gray-300 font-medium leading-relaxed transition-colors duration-300">
            <span className="text-[#8257e6] font-bold">DOMA</span> brinda a tus clientes una atención{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8257e6] to-[#a87ffb] font-semibold">ágil, efectiva y consistente</span>{' '}
            en todos tus puntos de contacto físicos.
          </p>
        </div>

        {/* ESTRUCTURA DIAGRAMA: Tótem central con las 5 llamadas */}
        <div className="relative flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-0 max-w-5xl mx-auto">
          
          {/* ================= COLUMNA IZQUIERDA (01, 03, 05) ================= */}
          <div className="w-full lg:w-5/12 flex flex-col justify-between items-start lg:items-end gap-8 lg:gap-0 order-2 lg:order-1 h-auto lg:h-[620px] lg:py-6">
            
            {/* 01. Presencia */}
            <div className="flex flex-row-reverse lg:flex-row items-center justify-end lg:justify-end gap-4 lg:gap-3 text-left lg:text-right w-full">
              <div className="max-w-xs sm:max-w-[230px]">
                <h4 className="font-poppins text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-0.5 transition-colors duration-300">Presencia</h4>
                <p className="font-gilroy text-xs sm:text-sm text-slate-600 dark:text-gray-400 leading-snug transition-colors duration-300">
                  El tótem detecta a la persona y activa la conversación.
                </p>
              </div>
              <div className="hidden lg:block w-8 sm:w-14 border-b-2 border-dotted border-[#8257e6]/70"></div>
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#8257e6] text-white font-poppins font-bold text-lg sm:text-xl flex items-center justify-center shrink-0 shadow-[0_4px_16px_rgba(130,87,230,0.35)] leading-none select-none">
                01
              </div>
            </div>

            {/* 03. Contexto e información */}
            <div className="flex flex-row-reverse lg:flex-row items-center justify-end lg:justify-end gap-4 lg:gap-3 text-left lg:text-right w-full">
              <div className="max-w-xs sm:max-w-[230px]">
                <h4 className="font-poppins text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-0.5 transition-colors duration-300">Contexto e información</h4>
                <p className="font-gilroy text-xs sm:text-sm text-slate-600 dark:text-gray-400 leading-snug transition-colors duration-300">
                  DOMA interpreta la consulta según su rol y responde con información aprobada.
                </p>
              </div>
              <div className="hidden lg:block w-8 sm:w-14 border-b-2 border-dotted border-[#8257e6]/70"></div>
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#8257e6] text-white font-poppins font-bold text-lg sm:text-xl flex items-center justify-center shrink-0 shadow-[0_4px_16px_rgba(130,87,230,0.35)] leading-none select-none">
                03
              </div>
            </div>

            {/* 05. Resolución o derivación */}
            <div className="flex flex-row-reverse lg:flex-row items-center justify-end lg:justify-end gap-4 lg:gap-3 text-left lg:text-right w-full">
              <div className="max-w-xs sm:max-w-[230px]">
                <h4 className="font-poppins text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-0.5 transition-colors duration-300">Resolución o derivación</h4>
                <p className="font-gilroy text-xs sm:text-sm text-slate-600 dark:text-gray-400 leading-snug transition-colors duration-300">
                  Resuelve ahí mismo, o deriva con contexto si necesita a una persona.
                </p>
              </div>
              <div className="hidden lg:block w-8 sm:w-14 border-b-2 border-dotted border-[#8257e6]/70"></div>
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#8257e6] text-white font-poppins font-bold text-lg sm:text-xl flex items-center justify-center shrink-0 shadow-[0_4px_16px_rgba(130,87,230,0.35)] leading-none select-none">
                05
              </div>
            </div>

          </div>

          {/* ================= COLUMNA CENTRAL: EL TÓTEM ================= */}
          <div className="w-full lg:w-auto flex justify-center items-center order-1 lg:order-2 px-2 lg:px-4 my-4 lg:my-0">
            <div className="relative w-[220px] sm:w-[260px] lg:w-[320px] xl:w-[340px] flex items-center justify-center">
              
              {/* Resplandor suave sobre la pantalla */}
              <div className="absolute inset-0 bg-[#8257e6]/10 rounded-2xl blur-xl pointer-events-none"></div>

              {/* Imagen del tótem */}
              <img 
                src="/TOTEM DOMA SITIO.webp" 
                alt="Tótem DOMA — Empleado Digital"
                className="relative z-10 w-full h-auto object-contain max-h-[500px] sm:max-h-[600px] lg:max-h-[660px] drop-shadow-[0_15px_35px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_15px_35px_rgba(0,0,0,0.6)] select-none pointer-events-none transition-all duration-300"
              />
            </div>
          </div>

          {/* ================= COLUMNA DERECHA (02, 04) ================= */}
          <div className="w-full lg:w-5/12 flex flex-col justify-around items-start gap-8 lg:gap-0 order-3 h-auto lg:h-[620px] lg:py-16">
            
            {/* 02. Conversación */}
            <div className="flex items-center justify-start gap-4 lg:gap-3 text-left w-full">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#8257e6] text-white font-poppins font-bold text-lg sm:text-xl flex items-center justify-center shrink-0 shadow-[0_4px_16px_rgba(130,87,230,0.35)] leading-none select-none">
                02
              </div>
              <div className="hidden lg:block w-8 sm:w-14 border-b-2 border-dotted border-[#8257e6]/70"></div>
              <div className="max-w-xs sm:max-w-[230px]">
                <h4 className="font-poppins text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-0.5 transition-colors duration-300">Conversación</h4>
                <p className="font-gilroy text-xs sm:text-sm text-slate-600 dark:text-gray-400 leading-snug transition-colors duration-300">
                  Explica lo que necesita por voz, sin menús ni pasos previos.
                </p>
              </div>
            </div>

            {/* 04. Apoyo visual */}
            <div className="flex items-center justify-start gap-4 lg:gap-3 text-left w-full">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#8257e6] text-white font-poppins font-bold text-lg sm:text-xl flex items-center justify-center shrink-0 shadow-[0_4px_16px_rgba(130,87,230,0.35)] leading-none select-none">
                04
              </div>
              <div className="hidden lg:block w-8 sm:w-14 border-b-2 border-dotted border-[#8257e6]/70"></div>
              <div className="max-w-xs sm:max-w-[230px]">
                <h4 className="font-poppins text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-0.5 transition-colors duration-300">Apoyo visual</h4>
                <p className="font-gilroy text-xs sm:text-sm text-slate-600 dark:text-gray-400 leading-snug transition-colors duration-300">
                  Acompaña la respuesta con imágenes, mapas o QR cuando ayuda a resolver más rápido.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}