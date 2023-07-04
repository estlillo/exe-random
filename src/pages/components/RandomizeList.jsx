import React, { useState, useEffect } from 'react';
import Opcion from './Opcion.jsx'

function RandomizeList() {
  const [inputValue, setInputValue] = useState('');
  const [randomizedList, setRandomizedList] = useState([]);
  const [tiempoMaximo, setTiempoMaximo] = useState(10);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleTiempoMaximoChange = (event) => {
    setTiempoMaximo(event.target.value);
  };

  const randomizeList = () => {
    const lines = inputValue.trim().split('\n');
    const randomizedLines = shuffleArray(lines);
    setRandomizedList(randomizedLines);
  };

  const orderList = () => {
    const lines = inputValue.trim().split('\n');
    const orderedLines = lines;
    setRandomizedList(orderedLines);
  };

  const randomizeExenianos = () => {
    const lines = "Enrique Ibañez\nLuciano Hernandez\nMarcelo Azar\nRobert Jaure \nEsteban Lillo\nRicardo Fuentes\nJuan Pablo Norambuena\nRaul Neira\nFernando Gelcich";
    const randomizedLines = shuffleArray(lines.split('\n'));
    setRandomizedList(randomizedLines);
  }

  const handleLimpiar = () => {
    setInputValue('');
    setRandomizedList([]);
  };


  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {

  }, [randomizedList]);


  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1>EXE-RANDOM</h1>
          <h2>Randomizador de reuniones</h2>
        </div>
      </div>
      <div
        className="row"
        style={{
          width: "100%",
        }}
      >
        <div className="col-md-6">
          <div className="form-group">
            <label>Tiempo máximo (minutos)</label>
            <input
              id="inputTiempo"
              type="text"
              className="form-control"
              value={tiempoMaximo}
              onChange={handleTiempoMaximoChange}
            />
          </div>

          <div className="form-group">
            <label>Participantes</label>
            <textarea
              id="inputParticipantes"
              className="form-control"
              style={{ marginTop: "10px" }}
              rows="5"
              value={inputValue}
              onChange={handleInputChange}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              alignContent: "flex-start",
            }}
          >
            <button
              className="btn btn-dark btn-sm"
              style={{ marginTop: "10px" }}
              onClick={randomizeList}
              title='Randomizar lista'
            >
              Random
            </button>
            <button
              className="btn btn-dark btn-sm"
              style={{ marginTop: "10px", marginLeft: "5px" }}
              onClick={orderList}
              title='Ordenar lista'
            >
              Ordenar
            </button>
            <button
              className="btn btn-dark btn-sm"
              style={{ marginTop: "10px", marginLeft: "5px" }}
              onClick={randomizeExenianos}
              title='Randomizar lista de exenianos'
            >
              Random Exe
            </button>
            <button
              className="btn btn-dark btn-sm"
              style={{ marginTop: "10px", marginLeft: "5px" }}
              onClick={handleLimpiar}
              title='Limpiar lista'
            >
              Limpiar
            </button>
          </div>
        </div>
        <div className="col-md-6">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              alignContent: "flex-start",
              marginTop: "10px",
            }}
          >
            {randomizedList.map((line, index) => (
              <Opcion
                key={index}
                maxTime={tiempoMaximo}
                index={index}
                line={line}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RandomizeList;
