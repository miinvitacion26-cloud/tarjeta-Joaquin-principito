import { useState } from 'react';
import imagenSobre from './assets/Sobre.png';
import imagenInvitacion from './assets/invitacion_ingresar.png';
import foto2 from './assets/Joaquin_Sentado.jpeg'; // Cambia esto por el nombre de tu archivo
import foto3 from './assets/Joaquin_Pelotero.jpeg'; // Cambia esto por el nombre de tu archivo

function App() {
  const [pantalla, setPantalla] = useState(1);
  const [abriendo, setAbriendo] = useState(false);

  const abrirInvitacion = () => {
    setAbriendo(true);
    setTimeout(() => {
      setPantalla(2);
    }, 700);
  };

  // Arreglo con todas las fotos del carrusel
  const fotosCarrusel = [
    imagenInvitacion,
    foto2,
    foto3,
  ];

  const [fotoActual, setFotoActual] = useState(0);

  const siguienteFoto = () => {
    setFotoActual((prev) => (prev + 1) % fotosCarrusel.length);
  };

  const anteriorFoto = () => {
    setFotoActual((prev) => (prev - 1 + fotosCarrusel.length) % fotosCarrusel.length);
  };

  return (
    <div className="min-h-screen bg-[#070b19] w-full relative overflow-x-hidden">
      
      {/* PANTALLA 1: SOBRE */}
      {pantalla === 1 && (
        <div 
          className={`fixed inset-0 w-full h-screen flex items-center justify-center cursor-pointer transition-all duration-700 ease-out bg-[#070b19] z-50 ${abriendo ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`} 
          onClick={abrirInvitacion}
        >
          <img 
            src={imagenSobre} 
            alt="Toca para abrir" 
            className="w-full h-full object-contain absolute inset-0"
          />
          <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
          <div className="absolute inset-0 flex items-center justify-center px-6 text-center pointer-events-none z-10">
            <p className="text-yellow-100 text-base md:text-lg font-serif tracking-wider animate-pulse max-w-[75%] break-words drop-shadow-[0_0_1px_rgba(0,0,0,1)] drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
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
            className="w-full h-full object-contain absolute inset-0" 
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

      {/* PANTALLA 3: INFORMACIÓN Y CARRUSEL */}
      {pantalla === 3 && (
        <div className="w-full min-h-screen flex flex-col items-center justify-center p-4 relative bg-[#070b19] z-30 py-12">
          
          {/* ESTRELLITAS FLOTANTES */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <span className="absolute text-yellow-200 text-2xl animate-[ping_1.5s_ease-out_1] top-[15%] left-[20%] opacity-80">✨</span>
            <span className="absolute text-yellow-300 text-xl animate-[ping_1.8s_ease-out_1] top-[30%] right-[25%] opacity-90">⭐</span>
            <span className="absolute text-yellow-100 text-3xl animate-[ping_2s_ease-out_1] bottom-[25%] left-[30%] opacity-70">✨</span>
            <span className="absolute text-yellow-300 text-xl animate-[ping_1.6s_ease-out_1] top-[60%] right-[20%] opacity-85">⭐</span>
            <span className="absolute text-yellow-200 text-2xl animate-[ping_2.2s_ease-out_1] top-[10%] right-[40%] opacity-75">✨</span>
          </div>

          {/* TARJETA PRINCIPAL */}
          <div className="relative z-10 text-white text-center bg-sky-950/90 p-6 md:p-8 rounded-3xl max-w-lg w-[95%] shadow-2xl backdrop-blur-md border border-yellow-300/30 my-auto">
            
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-yellow-300 mb-2">¡Bienvenidos!</h1>
            <p className="text-sky-200 text-sm md:text-base italic mb-6">
              "Lo esencial es invisible a los ojos... ¡Acompañame a festejar mis 2 añitos en este viaje mágico!"
            </p>

            {/* CARRUSEL DE FOTOS */}
            <div className="mb-6 relative w-full h-56 md:h-64 bg-black/40 rounded-2xl overflow-hidden border border-yellow-300/20 flex items-center justify-center">
              <img 
                src={fotosCarrusel[fotoActual]} 
                alt="Recuerdo" 
                className="w-full h-full object-contain transition-all duration-500"
              />
              {/* Botones para cambiar de foto (flechas izquierda y derecha) */}
              {fotosCarrusel.length > 1 && (
                <>
                  <button onClick={anteriorFoto} className="absolute left-2 bg-black/50 text-yellow-300 p-2 rounded-full hover:bg-black/80 transition">❮</button>
                  <button onClick={siguienteFoto} className="absolute right-2 bg-black/50 text-yellow-300 p-2 rounded-full hover:bg-black/80 transition">❯</button>
                </>
              )}
            </div>

            {/* DATOS DEL EVENTO */}
            <div className="space-y-3 text-lg text-sky-100 mb-8 bg-sky-900/40 p-4 rounded-2xl border border-sky-700/40">
              <p>📅 <strong>¿Cuándo?</strong> [Fecha aquí]</p>
              <p>⏰ <strong>¿Hora?</strong> [Hora aquí]</p>
              <p>📍 <strong>¿Dónde?</strong> [Lugar aquí]</p>
            </div>

            {/* BOTONES DE ACCIÓN */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <a 
                href="AQUI_PEGAR_LINK_DE_GOOGLE_MAPS" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-yellow-400 hover:bg-yellow-500 text-sky-950 font-bold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-all text-sm md:text-base flex items-center justify-center gap-2"
              >
                🗺️ Cómo llegar (Maps)
              </a>

              <a 
                href="https://wa.me/TU_NUMERO_DE_TELEFONO?text=¡Hola!%20Confirmo%20mi%20asistencia%20al%20cumple%20de%20Joaquín." 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-all text-sm md:text-base flex items-center justify-center gap-2"
              >
                ✅ Confirmar Asistencia
              </a>
            </div>

            <button 
              onClick={() => setPantalla(2)} 
              className="text-yellow-200/80 hover:text-yellow-200 underline text-sm md:text-base transition"
            >
              Volver a la invitación
            </button>
          </div>

        </div>
      )}

    </div>
  );
}

export default App;