import { useState } from 'react';
import imagenSobre from './assets/Sobre.png';
import imagenInvitacion from './assets/invitacion_ingresar.png';

function App() {
  const [pantalla, setPantalla] = useState(1);
  // Estado para controlar la animación de apertura
  const [abriendo, setAbriendo] = useState(false);

  const abrirInvitacion = () => {
    setAbriendo(true);
    // Esperamos 700ms (lo que dura la animación) antes de cambiar de pantalla
    setTimeout(() => {
      setPantalla(2);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-sky-950 flex items-center justify-center p-4">
      
      {/* PANTALLA 1: TU IMAGEN DEL SOBRE (Portada) */}
      {pantalla === 1 && (
        <div 
          className={`cursor-pointer transition-all duration-700 ease-out ${abriendo ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`} 
          onClick={abrirInvitacion}
        >
          <img 
           src={imagenSobre}
            alt="Invitación al espacio - Toca para abrir" 
            className="max-w-lg w-full h-auto rounded-3xl shadow-2xl border-4 border-yellow-300/30 transform hover:scale-105 transition-transform"
          />
          <p className="mt-6 text-center text-white/80 text-xl font-serif animate-pulse">Toca el sobre para comenzar tu viaje</p>
        </div>
      )}

      {/* PANTALLA 2: LA INVITACIÓN CON FOTO (La que creaste en Canva) */}
      {pantalla === 2 && (
        <div className="text-center animate-in fade-in zoom-in duration-700">
          {/* Aquí asegúrate de poner el nombre exacto de tu imagen con la foto de Joaquín */}
          <img 
           src={imagenInvitacion} 
            alt="¡Un viaje mágico hacia mis 2 años!" 
            className="max-w-xs mx-auto rounded-3xl shadow-2xl mb-8 border-4 border-yellow-200" 
          />
          
          <button 
            onClick={() => setPantalla(3)} 
            className="bg-yellow-500 hover:bg-yellow-600 text-sky-950 font-bold text-2xl py-4 px-12 rounded-full shadow-lg transform hover:scale-105 transition-all"
          >
            ENTRAR
          </button>
        </div>
      )}

      {/* PANTALLA 3: INFORMACIÓN DETALLADA */}
      {pantalla === 3 && (
        <div className="text-white text-center animate-in fade-in duration-1000 bg-white/10 p-10 rounded-3xl max-w-2xl w-full shadow-xl backdrop-blur-sm">
          <h1 className="text-5xl font-serif font-bold text-yellow-300 mb-6">¡Te esperamos!</h1>
          <div className="space-y-4 text-2xl text-sky-100">
            <p><strong>¿Cuándo?</strong> [Fecha aquí]</p>
            <p><strong>¿Hora?</strong> [Hora aquí]</p>
            <p><strong>¿Dónde?</strong> [Lugar aquí]</p>
          </div>
          <button onClick={() => setPantalla(2)} className="mt-10 text-yellow-200 underline">Volver a la portada</button>
        </div>
      )}
      
    </div>
  );
}

export default App;