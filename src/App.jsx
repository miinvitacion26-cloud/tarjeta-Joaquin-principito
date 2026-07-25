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
      
      {/* PANTALLA 1: SOBRE CON TEXTO ADENTRO */}
      {pantalla === 1 && (
        <div 
          className={`relative w-full h-screen flex items-center justify-center cursor-pointer transition-all duration-700 ease-out ${abriendo ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`} 
          onClick={abrirInvitacion}
        >
          <img 
            src={imagenSobre} 
            alt="Toca para abrir" 
            className="w-full h-full object-contain"
          />

          <div className="absolute inset-0 flex items-center justify-center px-6 text-center pointer-events-none">
            <p className="text-yellow-100/90 text-lg md:text-xl font-serif tracking-wide animate-pulse bg-sky-950/40 px-4 py-2 rounded-xl backdrop-blur-xs shadow-lg border border-yellow-300/20">
              Toca el sobre para comenzar tu viaje
            </p>
          </div>
        </div>
      )}

      {/* PANTALLA 2: INVITACIÓN */}
      {pantalla === 2 && (
        <div className="w-full h-screen flex flex-col items-center justify-between py-6 animate-in fade-in zoom-in duration-700">
          <div className="w-full flex-1 flex items-center justify-center px-2">
            <img 
              src={imagenInvitacion} 
              alt="¡Un viaje mágico hacia mis 2 años!" 
              className="w-full h-full object-contain max-h-[80vh]" 
            />
          </div>
          
          <div className="my-4">
            <button 
              onClick={() => setPantalla(3)} 
              className="bg-yellow-400 hover:bg-yellow-500 text-sky-950 font-bold text-xl py-3 px-10 rounded-full shadow-lg transform hover:scale-105 transition-all"
            >
              ENTRAR
            </button>
          </div>
        </div>
      )}

      {/* PANTALLA 3: INFORMACIÓN */}
      {pantalla === 3 && (
        <div className="text-white text-center animate-in fade-in duration-1000 bg-sky-950/80 p-8 rounded-3xl max-w-md w-[90%] shadow-2xl backdrop-blur-md border border-yellow-300/30">
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