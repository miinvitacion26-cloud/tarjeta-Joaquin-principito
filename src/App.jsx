import { useState, useEffect } from 'react';
import imagenSobre from './assets/Sobre.png';
import imagenInvitacion from './assets/invitacion_ingresar.png';
import foto2 from './assets/Joaquin_Sentado.jpg'; 
import foto3 from './assets/Joaquin_Pelotero.jpg'; 

function App() {
  const [pantalla, setPantalla] = useState(1);
  const [abriendo, setAbriendo] = useState(false);

  const abrirInvitacion = () => {
    setAbriendo(true);
    setTimeout(() => {
      setPantalla(2);
    }, 700);
  };

  // --- LOGICA DEL CRONOMETRO ---
  const fechaEvento = new Date('2026-09-05T17:30:00').getTime();
  const [tiempoRestante, setTiempoRestante] = useState({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const ahora = new Date().getTime();
      const diferencia = fechaEvento - ahora;

      if (diferencia <= 0) {
        clearInterval(timer);
        setTiempoRestante({ dias: 0, horas: 0, minutos: 0, segundos: 0 });
      } else {
        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

        setTiempoRestante({ dias, horas, minutos, segundos });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [fechaEvento]);
  // -----------------------------

  const fotosCarrusel = [
    foto2,
    foto3,
  ];

  const [fotoActual, setFotoActual] = useState(0);

  const seleccionarFoto = (index) => {
    setFotoActual(index);
  };

  return (
    <div className="min-h-screen bg-[#070b19] w-full relative overflow-x-hidden flex flex-col items-center">
      
      {/* PANTALLA 1: SOBRE */}
      {pantalla === 1 && (
        <div 
          className={`fixed inset-0 w-full h-screen flex items-center justify-center cursor-pointer transition-all duration-700 ease-out bg-[#070b19] z-50 ${abriendo ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`} 
          onClick={abrirInvitacion}
        >
          <img 
            src={imagenSobre} 
            alt="Toca para abrir" 
            className="w-full h-full cover-contain absolute inset-0"
          />
          <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
          <div className="absolute inset-0 flex items-center justify-center px-6 text-center pointer-events-none z-10">
            <p className="text-yellow-100 text-base md:text-lg tracking-wider animate-pulse max-w-[75%] break-words drop-shadow-md">
              Toca el sobre para comenzar tu viaje
            </p>
          </div>
        </div>
      )}

      {/* PANTALLA 2: INVITACIÓN */}
      {pantalla === 2 && (
        <div className="fixed inset-0 w-full h-screen flex flex-col items-center justify-center bg-[#070b19] z-40 animate-in fade-in duration-500">
          <img 
            src={imagenInvitacion} 
            alt="¡Un viaje mágico hacia mis 2 años!" 
            className="w-full h-full cover-contain absolute inset-0" 
          />
          <button 
            onClick={() => setPantalla(3)} 
            className="absolute top-[51%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[55%] h-[7%] opacity-0 cursor-pointer z-50"
            aria-label="Ingresar"
          >
            INGRESAR
          </button>
        </div>
      )}

      {/* PANTALLA 3: INFORMACIÓN GENERAL */}
      {pantalla === 3 && (
        <div className="w-full min-h-screen flex flex-col items-center p-4 relative bg-[#070b19] z-30 py-12">
          
          {/* ESTRELLITAS FLOTANTES */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <span className="absolute text-yellow-200 text-2xl animate-[ping_1.5s_ease-out_1] top-[15%] left-[20%] opacity-80">✨</span>
            <span className="absolute text-yellow-300 text-xl animate-[ping_1.8s_ease-out_1] top-[30%] right-[25%] opacity-90">⭐</span>
            <span className="absolute text-yellow-100 text-3xl animate-[ping_2s_ease-out_1] bottom-[25%] left-[30%] opacity-70">✨</span>
            <span className="absolute text-yellow-300 text-xl animate-[ping_1.6s_ease-out_1] top-[60%] right-[20%] opacity-85">⭐</span>
            <span className="absolute text-yellow-200 text-2xl animate-[ping_2.2s_ease-out_1] top-[10%] right-[40%] opacity-75">✨</span>
          </div>

          {/* CONTENEDOR GENERAL */}
          <div className="relative z-10 w-full max-w-md flex flex-col space-y-10 my-auto">
            
            {/* BLOQUE 1: TÍTULO Y MENSAJE */}
            <div className="text-center bg-[#070b19] p-6 rounded-[2.5rem] shadow-2xl border-2 border-yellow-200/60 relative overflow-hidden">
              <span className="absolute top-2 left-4 text-yellow-300 text-sm animate-pulse">✦</span>
              <span className="absolute top-3 right-6 text-yellow-300 text-xs animate-pulse">✨</span>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-3 drop-shadow" style={{ color: '#fde047' }}>¡Bienvenidos!</h1>
              <p className="text-sm md:text-base italic font-light leading-relaxed" style={{ color: '#ffffff' }}>
                "Lo esencial es invisible a los ojos... ¡Acompañame a festejar mis 2 añitos en este viaje mágico!"
              </p>
              
              <span className="absolute bottom-2 left-6 text-yellow-300 text-xs animate-pulse">⭐</span>
              <span className="absolute bottom-2 right-4 text-yellow-300 text-sm animate-pulse">✦</span>
            </div>

            {/* BLOQUE 2: CRONÓMETRO */}
            <div className="text-center bg-[#070b19] p-6 rounded-[2.5rem] shadow-2xl border-2 border-white">
              <p className="text-xs md:text-sm font-semibold mb-4 tracking-widest uppercase" style={{ color: '#fde047' }}>
                ✨ ¡Falta muy poco para mi cumple! ✨
              </p>
              
              <div className="grid grid-cols-4 gap-2 justify-items-center">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 flex-shrink-0 bg-slate-800 rounded-full border border-white flex items-center justify-center shadow-md">
                    <span className="text-lg md:text-xl font-bold" style={{ color: '#ffffff' }}>{tiempoRestante.dias}</span>
                  </div>
                  <span className="text-[11px] mt-2 font-medium tracking-wide" style={{ color: '#ffffff' }}>Días</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 flex-shrink-0 bg-slate-800 rounded-full border border-white flex items-center justify-center shadow-md">
                    <span className="text-lg md:text-xl font-bold" style={{ color: '#ffffff' }}>{tiempoRestante.horas}</span>
                  </div>
                  <span className="text-[11px] mt-2 font-medium tracking-wide" style={{ color: '#ffffff' }}>Horas</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 flex-shrink-0 bg-slate-800 rounded-full border border-white flex items-center justify-center shadow-md">
                    <span className="text-lg md:text-xl font-bold" style={{ color: '#ffffff' }}>{tiempoRestante.minutos}</span>
                  </div>
                  <span className="text-[11px] mt-2 font-medium tracking-wide" style={{ color: '#ffffff' }}>Minutos</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 flex-shrink-0 bg-slate-800 rounded-full border border-white flex items-center justify-center shadow-md">
                    <span className="text-lg md:text-xl font-bold" style={{ color: '#ffffff' }}>{tiempoRestante.segundos}</span>
                  </div>
                  <span className="text-[11px] mt-2 font-medium tracking-wide" style={{ color: '#ffffff' }}>Segundos</span>
                </div>
              </div>
            </div>

            {/* BLOQUE 3: CARRUSEL DE FOTOS */}
            <div className="text-center bg-[#070b19] p-5 rounded-[2.5rem] shadow-2xl border-2 border-white flex flex-col items-center gap-4">
              <div className="relative w-full aspect-square max-h-80 rounded-2xl overflow-hidden border border-white/50 flex items-center justify-center shadow-inner bg-transparent">
                <img 
                  src={fotosCarrusel[fotoActual]} 
                  alt="Recuerdo de Joaquín" 
                  className="w-full h-full object-cover transition-all duration-700 ease-in-out"
                />
              </div>

              <div className="flex gap-2 items-center justify-center py-1">
                {fotosCarrusel.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => seleccionarFoto(index)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      fotoActual === index ? 'w-8 bg-yellow-300 shadow-md' : 'w-2.5 bg-slate-600 hover:bg-slate-400'
                    }`}
                    aria-label={`Ver foto ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* BLOQUE 4: DATOS DEL EVENTO */}
            <div className="text-center bg-[#070b19] p-6 rounded-[2.5rem] shadow-2xl border-2 border-white space-y-4 text-sm md:text-base text-left">
              <p className="flex items-start gap-3"><span>📅</span> <div><strong style={{ color: '#fde047' }}>¿Cuándo?</strong> <span style={{ color: '#ffffff' }}>5 de septiembre</span></div></p>
              <p className="flex items-start gap-3"><span>⏰</span> <div><strong style={{ color: '#fde047' }}>¿Hora?</strong> <span style={{ color: '#ffffff' }}>17:30hs a 20:00hs</span></div></p>
              <p className="flex items-start gap-3"><span>📍</span> <div><strong style={{ color: '#fde047' }}>¿Dónde?</strong> <span style={{ color: '#ffffff' }}>Independencia 638 (Rio de juegos y Cafe)</span></div></p>
            </div>

            {/* BLOQUE 5: MAPA Y UBICACIÓN */}
            <div className="text-center bg-[#070b19] p-5 rounded-[2.5rem] shadow-2xl border-2 border-white space-y-4">
              <div className="w-full h-48 rounded-2xl overflow-hidden border border-white/50">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3102.6385594217927!2d-68.05018729273549!3d-38.95508484363874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x960a33192492f059%3A0x331ea667299c7588!2sUsOtbyBqdWVnb3MgbcOhcyBjYWbDqQ!5e0!3m2!1ses-419!2sar!4v1785525783714!5m2!1ses-419!2sar" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Ubicación Río de juegos y Café"
                ></iframe>
              </div>
              <a 
                href="https://maps.google.com/?q=Independencia+638" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-sky-950 font-bold py-3 px-4 rounded-full shadow-lg transform hover:scale-105 transition-all text-xs md:text-sm flex items-center justify-center gap-2"
              >
                🗺️ Cómo llegar
              </a>
            </div>

            {/* BLOQUE 6: CONFIRMAR ASISTENCIA */}
            <div className="text-center bg-[#070b19] p-6 rounded-[2.5rem] shadow-2xl border-2 border-yellow-200/60 flex flex-col items-center space-y-4 relative overflow-hidden">
              <span className="text-yellow-300 text-sm tracking-widest">✦ ── ✨ ── ✦</span>
              
              <h3 className="text-xl md:text-2xl font-serif italic tracking-wide" style={{ color: '#fde047' }}>
                CONFIRMAR ASISTENCIA
              </h3>
              <p className="text-xs md:text-sm font-light italic leading-relaxed" style={{ color: '#ffffff' }}>
                Por favor, confirmá tu presencia antes del 29 de agosto.
              </p>

              <a 
                href="https://wa.me/5492995966349?text=¡Hola!%20Confirmo%20mi%20asistencia%20al%20cumple%20de%20Joaquín." 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-[#25d366] hover:bg-[#20ba5a] text-white font-bold py-3.5 px-6 rounded-full shadow-lg transform hover:scale-105 transition-all text-sm md:text-base flex items-center justify-center gap-2 border border-white/30"
              >
                💬 Confirmar por WhatsApp
              </a>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default App;