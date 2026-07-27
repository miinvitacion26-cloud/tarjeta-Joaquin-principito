import { useState } from 'react';
import imagenSobre from './assets/Sobre.png';
import imagenInvitacion from './assets/invitacion_ingresar.png';

function App() {
  const [pantalla, setPantalla] = useState(1);
  const [abriendo, setAbriendo] = useState(false);

  const abrirInvitacion = () => {
    setAbriendo(true);
    setTimeout(() => {
      setPantalla(2);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#070b19] flex flex-col items-center justify-center overflow-hidden">
      
      {/* PANTALLA 1: SOBRE CON TEXTO AL 75% Y ALTO CONTRASTE */}
      {pantalla === 1 && (
        <div 
          className={`relative w-full h-screen flex items-center justify-center cursor-pointer transition-all duration-700 ease-out ${abriendo ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`} 
          onClick={abrirInvitacion}
        >
          {/* Imagen del sobre */}
          <img 
            src={imagenSobre} 
            alt="Toca para abrir" 
            className="w-full h-full object-contain"
          />

          {/* Capa semitransparente oscura para mejorar el contraste */}
          <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>

          {/* Contenedor del texto al 75% con sombras profesionales */}
          <div className="absolute inset-0 flex items-center justify-center px-6 text-center pointer-events-none">
            <p className="text-yellow-100 text-base md:text-lg font-serif tracking-wider animate-pulse max-w-[75%] break-words drop-shadow-[0_0_1px_rgba(0,0,0,1)] drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
              Toca el sobre para comenzar tu viaje
            </p>
          </div>
        </div>
      )}

      {/* PANTALLA 2: INVITACIÓN Y BOTÓN DE INGRESAR */}
      {pantalla === 2 && (
        <div className="relative w-full h-screen flex flex-col items-center justify-center animate-in fade-in zoom-in duration-700">
          
          {/* Imagen de la invitación */}
          <img 
            src={imagenInvitacion} 
            alt="¡Un viaje mágico hacia mis 2 años!" 
            className="w-full h-full object-contain" 
          />
          
          {/* Botón táctil posicionado sobre el cartel "INGRESAR" */}
          <button 
            onClick={() => setPantalla(3)} 
            className="absolute top-[51%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[55%] h-[7%] opacity-0 cursor-pointer z-10"
            aria-label="Ingresar"
          >
            INGRESAR
          </button>

        </div>
      )}

      {/* PANTALLA 3: INFORMACIÓN */}
      {pantalla === 3 && (
        <div className="text-white text-center animate-in fade-in duration-1000 bg-sky-950/90 p-8 rounded-3xl max-w-md w-[90%] shadow-2xl backdrop-blur-md border border-yellow-300/30">
          <h1 className="text-4xl font-serif font-bold text-yellow-300 mb-6">¡Te esperamos!</h1>
          <div className="space-y-4 text-xl text-sky-100 mb-8">
            <p><strong>¿Cuándo?</strong> [Fecha aquí]</p>
            <p><strong>¿Hora?</strong> [Hora aquí]</p>
            <p><strong>¿Dónde?</strong> [Lugar aquí]</p>
          </div>
          <button onClick={() => setPantalla(2)} className="text-yellow-200 underline text-lg">Volver a la invitación</button>
        </div>
      )}

    </div>
  );
}

export default App;