import { useState, useEffect, useRef } from 'react';
import imagenSobre from './assets/Sobre.jpg';
import imagenInvitacion from './assets/invitacion_ingresar.jpg';
import foto1 from './assets/Joaquin_bebe.jpg';
import foto2 from './assets/Joaquin_bebe2.jpg';
import foto3 from './assets/Joaquin_papas.jpg';
import foto4 from './assets/Joaquin_unaño.jpg';
import foto5 from './assets/Joaquin_unaño2.jpg';
import foto6 from './assets/Joaquin_auto.jpg';
import foto7 from './assets/Joaquin_Sentado.jpg';
import foto8 from './assets/Joaquin_Pelotero.jpg';
import archivoMusica from './assets/musica.mp3';

function App() {
  const [pantalla, setPantalla] = useState(1);
  const [abriendo, setAbriendo] = useState(false);
  const [reproduciendo, setReproduciendo] = useState(false);
  const [mostrarEstrellas, setMostrarEstrellas] = useState(false);
  const audioRef = useRef(null);

  // Definimos el borde unificado en color BLANCO para todos los bloques principales
  const estiloBorde = { border: '2px solid #ffffff' };

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

  // Control estricto del tiempo: se detiene exactamente a los 120 segundos de reproducción
  const handleTimeUpdate = () => {
    if (audioRef.current && audioRef.current.currentTime >= 120) {
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
    foto1,
    foto2,
    foto3,
    foto4,
    foto5,
    foto6,
    foto7,
    foto8,
  ];

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
          className="fixed bottom-6 right-6 z-50 bg-yellow-300 text-slate-900 p-3.5 rounded-full shadow-2xl border-2 border-white flex items-center justify-center transform hover:scale-110 transition-all cursor-pointer"
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
        <div className="w-full min-h-[100dvh] flex flex-col items-center p-4 relative bg-[#070b19] z-30 py-20 pb-96">
          
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

          {/* CONTENEDOR GENERAL CON ESPACIADO MÁXIMO (space-y-32) */}
          <div className="relative z-10 w-full max-w-md flex flex-col space-y-32 mt-10">
            
            {/* BLOQUE 1: TÍTULO Y MENSAJE */}
            <div 
              className="text-center bg-[#070b19] p-6 rounded-[2.5rem] shadow-2xl relative overflow-hidden"
              style={estiloBorde}
            >
              <span className="absolute top-2 left-4 text-yellow-300 text-sm animate-pulse">✦</span>
              <span className="absolute top-3 right-6 text-yellow-300 text-xs animate-pulse">✨</span>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-3 drop-shadow" style={{ color: '#fde047' }}>¡Hola! soy Joaquin. 👑</h1>
              <p className="text-sm md:text-base italic font-light leading-relaxed mb-2" style={{ color: '#ffffff' }}>
                "Que alegria que hayas recibido mi invitaciòn. ✨ 
              </p>
              <p className="text-sm md:text-base italic font-light leading-relaxed" style={{ color: '#ffffff' }}>
                Te invito a que me acompañes a celebrar mis 2 añitos y a vivir un viaje lleno de magia, sonrisas y momentos inolvidables. 🚀 <br />
                ¡Te espero para compartir un dia de cuento!
              </p>
              
              <span className="absolute bottom-2 left-6 text-yellow-300 text-xs animate-pulse">⭐</span>
              <span className="absolute bottom-2 right-4 text-yellow-300 text-sm animate-pulse">✦</span>
            </div>

            {/* BLOQUE 2: CARRUSEL DESLIZABLE HORIZONTAL */}
            <div 
              className="text-center bg-[#070b19] p-5 rounded-[2.5rem] shadow-2xl flex flex-col items-center gap-4"
              style={estiloBorde}
            >
              {/* Contenedor con scroll horizontal táctil y barra oculta */}
              <div 
                className="w-full flex gap-4 overflow-x-auto snap-x snap-mandatory rounded-[2rem] pb-2" 
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {fotosCarrusel.map((foto, index) => (
                  <div 
                    key={index} 
                    className="relative w-full flex-shrink-0 aspect-square max-h-80 rounded-[2rem] overflow-hidden flex items-center justify-center shadow-inner bg-slate-900 snap-center"
                  >
                    <img 
                      src={foto} 
                      alt={`Recuerdo de Joaquín ${index + 1}`} 
                      // Usamos object-contain global pero permitimos que cubra bien sin deformarse, 
                      // o si es la foto 1 (index === 0), la anclamos con object-center para que no corte la cabeza
                      className={`w-full h-full ${index === 0 ? 'object-contain bg-slate-900' : 'object-cover'}`}
                    />
                  </div>
                ))}
              </div>
              
              {/* Indicador visual en color BLANCO */}
              <p className="text-xs tracking-widest uppercase mt-1" style={{ color: '#ffffff' }}>
                ↔ Desliza para ver más fotos ↔
              </p>

              <h1 className="text-xl md:text-2xl font-bold mb-2 drop-shadow" style={{ color: '#f3e5a1' }}>"Hoy soy el principito de esta gran aventura". 👑</h1>
            </div>

             {/* BLOQUE 3: CRONÓMETRO */}
            <div 
              className="text-center bg-[#070b19] p-6 rounded-[2.5rem] shadow-2xl"
              style={estiloBorde}
            >
              <p className="text-xs md:text-sm font-semibold mb-4 tracking-widest uppercase" style={{ color: '#fde047' }}>
                ✨ Cada segundo nos acerca a un dia magico ✨
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
            
            {/* BLOQUE 4: DATOS DEL EVENTO */}
            <div 
              className="bg-[#070b19] p-6 rounded-[2.5rem] shadow-xl space-y-5 text-center mx-auto w-full flex flex-col items-center"
              style={estiloBorde}
            >
              {/* Fecha */}
              <div className="flex flex-col items-center space-y-1 pb-4 border-b border-gray-800 w-full">
                <span className="text-3xl mb-2">📅</span>
                <p style={{ color: '#fde047', fontSize: '15px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>EL GRAN DIA ES: </p>
                <p style={{ color: '#ffffff', fontSize: '22px', fontWeight: '500' }}>5 de septiembre</p>
              </div>

              {/* Hora */}
              <div className="flex flex-col items-center space-y-1 pb-4 border-b border-gray-800 w-full">
                <span className="text-2xl mb-1">⏰</span>
                <p style={{ color: '#fde047', fontSize: '15px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>LA HORA DEL FESTEJO ES: </p>
                <p style={{ color: '#ffffff', fontSize: '22px', fontWeight: '500' }}>17:30hs a 20:00hs</p>
              </div>

              {/* Lugar */}
              <div className="flex flex-col items-center space-y-1 w-full">
                <span className="text-2xl mb-1">📌</span>
                <p style={{ color: '#fde047', fontSize: '15px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>MI CASTILLO TE ESPERA EN: </p>
                <p style={{ color: '#ffffff', fontSize: '20px', fontWeight: '500', lineHeight: '1.3' }}>
                  Independencia 638 <span style={{ color: '#9ca3af', display: 'block', fontSize: '14px', fontWeight: 'normal', marginTop: '2px' }}>(Rio de juegos y Cafe)</span>
                </p>
              </div>
            </div>

            {/* BLOQUE DE MAPA / CÓMO LLEGAR */}
            <div 
              className="text-center bg-[#070b19] p-6 rounded-[2.5rem] shadow-2xl space-y-5 mx-auto w-full"
              style={estiloBorde}
            >
              {/* Título de sección */}
              <h3 className="text-xl font-bold tracking-wide uppercase" style={{ color: '#fde047' }}>
                ✨  Ubicación 
              </h3>

              {/* Botón para "Cómo llegar" */}
              <a 
                href="https://maps.google.com/?q=Independencia+638" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-slate-800 hover:bg-slate-700 text-yellow-300 font-semibold py-3.5 px-6 rounded-2xl shadow-lg border border-yellow-300/40 flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] no-underline text-base cursor-pointer"
                style={{ textDecoration: 'none', color: '#fde047' }}
              >
                <span className="text-xl">🗺️</span>
                <span className="font-semibold" style={{ color: '#fde047' }}>Abrir en Google Maps</span>
              </a>

              {/* Contenedor del mapa */}
              <div className="w-full h-48 rounded-[2rem] overflow-hidden shadow-inner bg-slate-900">
                <iframe
                  title="Mapa de ubicación"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3105.1!2d-68.05!3d-38.95!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sMzjCsDU3JzAwLjAiUyA2OMKwMDMnMDAuMCJX!5e0!3m2!1ses!2sar!4v1600000000000!5m2!1ses!2sar"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            {/* BLOQUE 6: CONFIRMAR ASISTENCIA */}
            <div 
              className="text-center bg-[#070b19] p-6 md:p-8 rounded-[2.5rem] shadow-2xl flex flex-col items-center space-y-6 relative overflow-hidden mb-20"
              style={estiloBorde}
            >
              {/* Separador temático */}
              <span className="text-yellow-300 text-lg tracking-[0.5em] opacity-90">✦ ✨ ✦</span>
              
              {/* Título principal */}
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: '#fde047' }}>
              ✨  ¿Me acompañas en esta aventura? ✨
              </h3>
              
               {/* BOTÓN DE WHATSAPP */}
              <a 
                href="https://wa.me/5492995966349?text=¡Hola!%20Confirmo%20mi%20asistencia%20al%20cumple%20de%20Joaquín." 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-11/12 max-w-xs bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-4 px-6 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-base flex items-center justify-center gap-3 no-underline border-0 cursor-pointer"
                style={{ textDecoration: 'none', color: '#ffffff' }}
              >
                <span className="text-2xl">💚</span>
                <span className="text-white no-underline font-bold" style={{ color: '#ffffff' }}>Confirmar por WhatsApp</span>
              </a>

              {/* Mensaje tierno */}
              <p className="text-sm md:text-base italic leading-relaxed max-w-xs" style={{ color: '#ffffff' }}>
                Prepare este dia con mucha ilusion y me haria muy feliz compartirlo con vos. ¡Espero tu confirmaciòn, antes del 29 de agosto!
              </p>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default App;