import React, { useState, useEffect } from 'react';

export default function Opcion({
  tiempoMaximo = 10,
  index,
  line
}) {

const [tiempo, setTiempo] = useState("");
const [isCounting, setIsCounting] = useState(false);
const [finished, setFinished] = useState(false);
const [remainingSeconds, setRemainingSeconds] = useState(0);

 const handleCountdown = () => {
    setIsCounting(true);
    // Iniciar la cuenta regresiva de 10 minutos (600 segundos)
    let minutos = tiempoMaximo;
    let seconds = minutos * 60;

    const countdownInterval = setInterval(() => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      setRemainingSeconds(remainingSeconds);
      // Actualizar la cuenta regresiva en el estado o en algún otro lugar necesario
      // ...
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        setFinished(true);
        // Realizar acciones adicionales cuando se complete el contador
        // ...
      } else {
        seconds--;
      }

      setTiempo(getFormatoReloj(minutes)+":"+getFormatoReloj(remainingSeconds));
    }, 1000);
  };

  const getFormatoReloj = (n) => {
    return (n < 10 ? "0" : "") + n;
  }

return (
  <>
  <li key={index} style={{
    display:"flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems:"center",
    alignContent:"flex-start",
  }}>



  <div className="card" style={{width: "18rem"}}>
  <div className="card-body">
    <h5 className="card-title">{line}</h5>
   
    <h4 className="card-subtitle mb-2 text-muted">
    <button className="btn btn-success btn-sm" onClick={handleCountdown} disabled={isCounting}>Go!</button>
      <span style={{
        marginLeft: "10px",
      }}>{tiempo}</span></h4>
    <p className="card-text">
      {finished && <p style={{color:'red'}}>Terminado</p>}
      {isCounting && !finished && <p style={{color:'green'}}>En Tiempo</p>}
    </p>
  </div>
</div>

  </li>
  </>
);
}