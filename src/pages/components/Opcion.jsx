import React, { useState, useEffect } from 'react';

const Opcion = ({ maxTime, index, line }) => {
  const [time, setTime] = useState(maxTime * 60); // Convertir los minutos a segundos
  const [running, setRunning] = useState(false);

  const [observaciones, setObservaciones] = useState("");
  const [showObservaciones, setShowObservaciones] = useState(false);

  useEffect(() => {
    let timerId;

    if (running) {
      timerId = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            clearInterval(timerId);
            setRunning(false);
            return 0;
          }
        });
      }, 1000);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [running]);

  useEffect(() => {
    setTime(maxTime * 60); // Restablecer el tiempo cuando cambia maxTime
    setRunning(false); // Detener el temporizador al restablecer el tiempo
  }, [maxTime]);

  const formatTime = () => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const handleStart = () => {
    setRunning(true);
  };

  const handlePause = () => {
    setRunning(false);
  };

  const handleReset = () => {
    setTime(maxTime * 60);
    setRunning(false);
  };

  const handleStop = () => {
    setTime(0);
    setRunning(false);
  };

  const handleAddTime = () => {
    setTime(time + 60);
  };

  const handleExportObservaciones = () => {
    //export to txt file and download
    const element = document.createElement("a");
    const file = new Blob([observaciones], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);

    const currentDate = new Date();

    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = String(currentDate.getFullYear());

    const filename = `observaciones ${line} ${day}-${month}-${year}.txt`;


    element.download = filename;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };



  return (
    <div
      key={index}
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        alignContent: "flex-start",
        width: "100%",
        marginTop: "5px",
      }}
    >
      <div className="card" style={{ width: "100%" }}>
        <div className="card-body">
          <h5 style={{ color: "#444444" }}>{line}</h5>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "flex-start",
            }}
          >
            <h3 className="card-subtitle mb-2 text-muted">{formatTime()}</h3>
            <p
              className="card-subtitle mb-2 text-muted"
              style={{
                marginLeft: "10px",
              }}
            >
              {running && (
                <span className="badge badge-success">En tiempo</span>
              )}
              {!running && time > 0 && (
                <span className="badge badge-warning">Pausado</span>
              )}
              {time <= 0 && (
                <span className="badge badge-danger">Finalizado</span>
              )}
            </p>
          </div>

          <div
            className="btn-group"
            role="group"
            aria-label="Basic example"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "flex-start",
              marginTop: "10px",
            }}
          >
            <button
              type="button"
              className="btn btn-dark btn-sm"
              onClick={handleStart}
              disabled={running}
              title="Iniciar"
            >
              <i className="bi bi-play-fill"></i>
            </button>
            <button
              type="button"
              className="btn btn-dark btn-sm"
              onClick={handlePause}
              disabled={!running}
              title="Pausar"
            >
              <i className="bi bi-pause-fill"></i>
            </button>
            <button
              type="button"
              className="btn btn-dark btn-sm"
              onClick={handleStop}
              disabled={running}
              title="Detener"
            >
              <i className="bi bi-stop-fill"></i>
            </button>
            <button
              type="button"
              className="btn btn-dark btn-sm"
              onClick={handleReset}
              disabled={running}
              title="Reiniciar"
            >
              <i className="bi bi-arrow-counterclockwise"></i>
            </button>
            <button
              type="button"
              className="btn btn-dark btn-sm"
              onClick={handleAddTime}
              title="Agregar 1 minuto"
            >
              <i className="bi bi-plus"></i> 1
            </button>
            <button
              type="button"
              className="btn btn-dark btn-sm"
              title="Agregar observaciones"
              onClick={() => setShowObservaciones(!showObservaciones)}
            >
              <i className="bi bi-chat-left-text"></i>
            </button>
          </div>
        </div>

        {showObservaciones && (
          <div style={{ width: "100%" }}>
            <div className="card-body">
              <h5 style={{ color: "#444444" }}>Observaciones</h5>
              <textarea
                id="inputObservacion"
                className="form-control"
                style={{ marginTop: "10px" }}
                rows="10"
                value={observaciones}
                onChange={(e) => {
                  setObservaciones(e.target.value);
                }}
              />
              <button
                className="btn btn-dark btn-sm"
                style={{ marginTop: "10px" }}
                onClick={handleExportObservaciones}
              >
                <i class="bi bi-download"></i> Exportar a txt
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Opcion;
