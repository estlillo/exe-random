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

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    // Aquí puedes agregar cualquier efecto deseado al cambiar el estado de randomizedList
    // Por ejemplo, puedes reiniciar el contador cuando se actualiza la lista randomizada
    // handleCountdown();
  }, [randomizedList]);

  return (
    <div className="container" style={{ padding: '20px' }}>
      <div className='row'>
        <div className="col-md-12">
          <h1>EXE-RANDOM</h1>
          <h2>Randomizador de reuniones</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">

        <div className="form-group">
          <label>Tiempo máximo (minutos)</label>
          <input id="inputTiempo" type="text" className="form-control" value={tiempoMaximo} onChange={handleTiempoMaximoChange} />
        </div>

        <div className="form-group">
          <label>Participantes</label>
          <textarea id="inputParticipantes" className="form-control" style={{marginTop:"10px"}} rows="5" value={inputValue} onChange={handleInputChange} />
        </div>
         
          <button className="btn btn-primary" style={{marginTop:"10px"}} onClick={randomizeList}>Randomizar!</button>
        </div>
        <div className="col-md-6">
          <ul>
            {randomizedList.map((line, index) => (
             <Opcion 
              key={index}
              tiempoMaximo={tiempoMaximo}
              index={index}
              line={line}
             />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RandomizeList;
