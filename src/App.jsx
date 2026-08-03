import { useState, useEffect, useRef } from 'react';
import imagenSobre from './assets/Sobre.jpg';
import imagenInvitacion from './assets/invitacion_ingresar.jpg';
import foto2 from './assets/Joaquin_Sentado.jpg'; 
import foto3 from './assets/Joaquin_Pelotero.jpg'; 
import archivoMusica from './assets/musica.mp3';

function App() {
  const [pantalla, setPantalla] = useState(1);
  const [abriendo, setAbriendo] = useState(false);
  const [reproduciendo, setReproduciendo] = useState(false);
  const [mostrarEstrellas, setMostrarEstrellas] = useState(false);
  const audioRef = useRef(null);

  const abrirInvitacion = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; 
      audioRef.current.play().then(() => {
        setReproduciendo(true);
      }).catch(error => {
        console.log("El navegador bloqueó la reproducción automática o falta el archivo de audio:", error);
      });
    }

    setAbriendo(true);
    setTimeout(() => {
      setPantalla(2);
    }, 700);
  };

  // Función para pasar a la pantalla 3, activar estrellas y ocultarlas a los 4.5 segundos
  const irAPantalla3 = () => {
    setPantalla(3);
    setMostrarEstrellas(true);

    setTimeout(() => {
      setMostrarEstrellas(false);
    }, 4500);
  };

  // Control estricto del tiempo: se detiene exactamente a los 32 segundos de reproducción
  const handleTimeUpdate = () => {
    if (audioRef.current && audioRef.current.currentTime >= 32) {
      audioRef.current.pause();
      audioRef.current.currentTime = 32; 
      setReproduciendo(false);
    }
  };

  // Función para el botón flotante de play/pause manual
  const toggleMusica = () => {
    if (audioRef.current) {
      if (reproduciendo) {
        audioRef.current.pause();
        setReproduciendo(false);
      } else {
        audioRef.current.play();
        setReproduciendo(true);
      }
    }
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
      
      {/* Elemento de Audio con control de tiempo nativo (sin loop) */}
      <audio 
        ref={audioRef} 
        src={archivoMusica} 
        onTimeUpdate={handleTimeUpdate} 
      />

      {/* BOTÓN FLOTANTE DE MÚSICA (Aparece desde la pantalla 2 en adelante) */}
      {pantalla > 1 && (
        <button 
          onClick={toggleMusica}
          className="fixed bottom-6 right-6 z-50 bg-yellow-300 text-slate-900 p-3.5 rounded-full shadow-2xl border-2 border-white flex items-center justify-center transform hover:scale-110 transition-all"
          aria-label="Controlar música"
        >
          {reproduciendo ? '🔊' : '🔇'}
        </button>
      )}

      {/* PANTALLA 1: SOBRE */}
      {pantalla === 1 && (
        <div 
          className={`fixed inset-0 w-full h-screen flex items-center justify-center cursor-pointer transition-all duration-700 ease-out bg-[#070b19] z-50 ${abriendo ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`} 
          onClick={abrirInvitacion}
        >
          <img 
            src={imagenSobre} 
            alt="Toca para abrir" 
            className="w-full h-full object-contain object-center absolute inset-0 -top-1 scale-[1.03]"
          />
          <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
          <div className="absolute inset-0 flex items-center justify-center px-6 text-center pointer-events-none z-10">
            <p className="text-yellow-100 text-base md:text-lg tracking-wider animate-pulse max-w-[75%] break-words drop-shadow-md">
            </p>
          </div>
        </div>
      )}

      {/* PANTALLA 2: INVITACIÓN (Toda la pantalla es clickeable) */}
      {pantalla === 2 && (
        <div 
          onClick={irAPantalla3}
          className="fixed inset-0 w-full h-screen flex flex-col items-center justify-center bg-[#070b19] z-40 animate-in fade-in duration-500 cursor-pointer"
        >
          <img 
            src={imagenInvitacion} 
            alt="¡Un viaje mágico hacia mis 2 años!" 
            className="w-full h-full object-cover object-center absolute inset-0 -top-1 scale-[1.03] pointer-events-none"
          />
        </div>
      )}

      {/* PANTALLA 3: INFORMACIÓN GENERAL */}
      {pantalla === 3 && (
        <div className="w-full min-h-[100dvh] flex flex-col items-center p-4 relative bg-[#070b19] z-30 py-12 pb-52">
          
          {/* ESTRELLITAS TEMPORALES */}
          {mostrarEstrellas && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-20 transition-opacity duration-1000">
              <span className="absolute text-yellow-200 text-3xl animate-[ping_1.2s_ease-out_infinite] top-[10%] left-[15%]">✨</span>
              <span className="absolute text-yellow-300 text-2xl animate-[ping_1.5s_ease-out_infinite] top-[25%] right-[20%]">⭐</span>
              <span className="absolute text-yellow-100 text-4xl animate-[ping_1.8s_ease-out_infinite] top-[40%] left-[10%]">✨</span>
              <span className="absolute text-yellow-300 text-3xl animate-[ping_1.3s_ease-out_infinite] top-[60%] right-[15%]">⭐</span>
              <span className="absolute text-yellow-200 text-2xl animate-[ping_1.6s_ease-out_infinite] top-[80%] left-[25%]">✨</span>
              <span className="absolute text-yellow-300 text-3xl animate-[ping_1.4s_ease-out_infinite] top-[5%] right-[40%]">⭐</span>
            </div>
          )}

          {/* CONTENEDOR GENERAL */}
          <div className="relative z-10 w-full max-w-md flex flex-col space-y-10 mt-6">
            
            {/* BLOQUE 1: TÍTULO Y MENSAJE */}
            <div className="text-center bg-[#070b19] p-6 rounded-[2.5rem] shadow-2xl border-2 border-yellow-200/60 relative overflow-hidden">
              <span className="absolute top-2 left-4 text-yellow-300 text-sm animate-pulse">✦</span>
              <span className="absolute top-3 right-6 text-yellow-300 text-xs animate-pulse">✨</span>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-3 drop-shadow" style={{ color: '#fde047' }}>¡Hola soy yo, Joaquin!</h1>
              <p className="text-sm md:text-base italic font-light leading-relaxed" style={{ color: '#ffffff' }}>
                "🌟Que lindo que hayas recibido mi invitaciòn. ¡Acompañame a festejar mis 2 añitos en este viaje mágico!🌟"
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
               <h1 className="text-2xl md:text-2xl font-bold mb-2 drop-shadow" style={{ color: '#f3e5a1' }}>¡Soy un principe 👑!</h1>
            </div>
            
            {/* BOTONES DE NAVEGACIÓN DEL CARRUSEL */}
            <div className="flex gap-6 items-center justify-center py-3">
              {fotosCarrusel.map((_, index) => (
                <button
                  key={index}
                  onClick={() => seleccionarFoto(index)}
                  className={`w-12 h-12 rounded-full font-bold text-lg transition-all duration-300 flex items-center justify-center shadow-lg border-2 ${
                    fotoActual === index 
                      ? 'bg-yellow-300 text-slate-900 border-white scale-110' 
                      : 'bg-slate-800 text-yellow-300 border-yellow-300/40 hover:bg-slate-700'
                  }`}
                  aria-label={`Ver foto ${index + 1}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            
          {/* BLOQUE 4: DATOS DEL EVENTO */}
          <div className="bg-[#070b19] p-6 rounded-3xl border border-yellow-200/40 shadow-xl space-y-5 text-center mx-auto w-full flex flex-col items-center">
            
            {/* Fecha */}
            <div className="flex flex-col items-center space-y-1 pb-4 border-b border-gray-800 w-full">
              <span className="text-2xl mb-1">📅</span>
              <p style={{ color: '#fde047', fontSize: '15px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>¿Cuándo?</p>
              <p style={{ color: '#ffffff', fontSize: '22px', fontWeight: '500' }}>5 de septiembre</p>
            </div>

            {/* Hora */}
            <div className="flex flex-col items-center space-y-1 pb-4 border-b border-gray-800 w-full">
              <span className="text-2xl mb-1">⏰</span>
              <p style={{ color: '#fde047', fontSize: '15px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>¿Hora?</p>
              <p style={{ color: '#ffffff', fontSize: '22px', fontWeight: '500' }}>17:30hs a 20:00hs</p>
            </div>

            {/* Lugar */}
            <div className="flex flex-col items-center space-y-1 w-full">
              <span className="text-2xl mb-1">📌</span>
              <p style={{ color: '#fde047', fontSize: '15px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>¿Dónde?</p>
              <p style={{ color: '#ffffff', fontSize: '20px', fontWeight: '500', lineHeight: '1.3' }}>
                Independencia 638 <span style={{ color: '#9ca3af', display: 'block', fontSize: '14px', fontWeight: 'normal', marginTop: '2px' }}>(Rio de juegos y Cafe)</span>
              </p>
            </div>

          </div>

            {/* BLOQUE DE MAPA / CÓMO LLEGAR */}
          <div className="text-center bg-[#070b19] p-6 rounded-[2.5rem] shadow-2xl border border-yellow-200/40 space-y-5 mx-auto w-full">
            
            {/* Título de sección */}
            <h3 className="text-xl font-bold tracking-wide uppercase" style={{ color: '#fde047' }}>
              ✨  Ubicación 
            </h3>

            {/* Botón para "Cómo llegar" */}
            <a 
              href="https://maps.google.com/?q=Independencia+638" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full bg-slate-800 hover:bg-slate-700 text-yellow-300 font-semibold py-3.5 px-6 rounded-2xl shadow-lg border border-yellow-300/40 flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] no-underline text-base"
            >
              <span className="text-xl">🗺️</span>
              <span>Abrir en Google Maps</span>
            </a>

            {/* Contenedor del mapa */}
            <div className="w-full h-48 rounded-2xl overflow-hidden border border-gray-700 shadow-inner">
              <iframe
                title="Mapa de ubicación"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3105.1!2d-68.05!3d-38.95!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDU3JzAwLjAiUyA2OMKwMDMnMDAuMCJX!5e0!3m2!1ses!2sar!4v1600000000000!5m2!1ses!2sar"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>

          </div>

            {/* BLOQUE 6: CONFIRMAR ASISTENCIA */}
          <div className="text-center bg-[#070b19] p-6 md:p-8 rounded-[2.5rem] shadow-2xl border-2 border-yellow-300/70 flex flex-col items-center space-y-6 relative overflow-hidden mb-12">
            
            {/* Separador temático */}
            <span className="text-yellow-300 text-lg tracking-[0.5em] opacity-90">✦ ✨ ✦</span>
            
            {/* Título principal */}
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: '#fde047' }}>
              ¡CONFIRMÁ TU ASISTENCIA!
            </h3>
            
            {/* Mensaje tierno */}
            <p className="text-sm md:text-base italic leading-relaxed max-w-xs" style={{ color: '#ffffff' }}>
              ¡No te quedes afuera de este viaje mágico! Por favor, confirmá antes del 29 de agosto.
            </p>

            {/* BOTÓN DE WHATSAPP */}
            <a 
              href="https://wa.me/5492995966349?text=¡Hola!%20Confirmo%20mi%20asistencia%20al%20cumple%20de%20Joaquín." 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-11/12 max-w-xs bg-gradient-to-r from-[#25d366] to-[#1da851] text-white font-bold py-3.5 px-6 rounded-full shadow-lg transform hover:scale-105 transition-all text-sm md:text-base flex items-center justify-center gap-3 border border-white/30 no-underline my-2"
            >
              <span className="text-xl">💚</span>
              Confirmar por WhatsApp
            </a>

          </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default App;