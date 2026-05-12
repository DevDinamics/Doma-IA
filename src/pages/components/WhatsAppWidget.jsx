import React, { useState } from 'react';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  
  // Aquí pones el número real de ventas de DOMA (con código de país, sin el +)
  const phoneNumber = "5213310736395"; 
  const defaultMessage = "¡Hola! Me interesa agendar una demo de DOMA.";
  const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end font-gilroy">
      
      {/* LA VENTANA DE CHAT (Glassmorphism DOMA Style) */}
      <div 
        className={`mb-4 w-72 sm:w-80 bg-[#0f0f15]/95 backdrop-blur-3xl border border-white/10 rounded-[24px] shadow-[0_10px_50px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-300 origin-bottom-right
        ${isOpen ? 'scale-100 opacity-100' : 'scale-50 opacity-0 pointer-events-none'}`}
      >
        {/* Cabecera del Chat */}
        <div className="bg-gradient-to-r from-[#25D366] to-[#1DA851] p-4 flex items-center gap-3 relative overflow-hidden">
           {/* Resplandor decorativo */}
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
           
           {/* Avatar */}
           <div className="relative z-10">
             <div className="w-10 h-10 rounded-full bg-[#0a0a0f] flex items-center justify-center p-2 border border-white/20 shadow-lg">
                {/* Usamos el iconito blanco de DOMA */}
                <span className="text-white font-poppins font-bold text-lg leading-none">d</span>
             </div>
             <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#44ff7b] border-2 border-[#1DA851] rounded-full"></span>
           </div>
           
           <div className="z-10">
             <h4 className="text-white font-poppins font-bold text-sm tracking-wide">Equipo Comercial</h4>
             <p className="text-white/90 text-xs font-medium">DOMA · En línea</p>
           </div>
           
           <button onClick={() => setIsOpen(false)} className="ml-auto text-white/80 hover:text-white transition-colors z-10 p-1">
             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
             </svg>
           </button>
        </div>

        {/* Cuerpo del Chat */}
        <div className="p-5 bg-gradient-to-b from-[#0a0a0f]/50 to-[#0f0f15]/50 relative">
           {/* Patrón sutil de fondo (Opcional, le da el toque WhatsApp) */}
           <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
           
           <div className="relative bg-white/[0.05] border border-white/10 rounded-2xl rounded-tl-sm p-4 max-w-[90%] shadow-lg backdrop-blur-sm animate-fade-in-up">
             <p className="text-sm text-gray-200 leading-relaxed">
               ¡Hola! 👋 ¿Listo para conocer a tu primer <span className="font-bold text-white">Digital Sales Executive</span>? Escríbenos para agendar tu demo.
             </p>
             <span className="text-[10px] text-gray-500 font-medium block text-right mt-2">Ahora</span>
           </div>
        </div>

        {/* Footer con Botón de Acción */}
        <div className="p-4 bg-[#0f0f15] border-t border-white/5">
           <a 
            href={waLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-center font-bold text-sm py-3 px-4 rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:scale-[1.02] active:scale-95"
           >
             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
             </svg>
             Ir a WhatsApp
           </a>
        </div>
      </div>

      {/* EL BOTÓN FLOTANTE */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-[0_4px_20px_rgba(37,211,102,0.4)]
        ${isOpen ? 'bg-[#0f0f15] border border-white/10 hover:bg-[#1a1a24] text-white' : 'bg-[#25D366] hover:bg-[#20bd5a] hover:scale-110 text-white'}`}
      >
         {isOpen ? (
           // Icono de Cerrar (X) cuando está abierto
           <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
           </svg>
         ) : (
           // Icono de WhatsApp cuando está cerrado
           <svg className="w-8 h-8 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
             <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
           </svg>
         )}
      </button>
      
    </div>
  );
}