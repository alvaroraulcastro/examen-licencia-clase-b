import React, { useState } from 'react';

const questions = [
  {
    question: '¿Cuál es la velocidad máxima permitida en zona urbana?',
    options: [
      '30 km/h',
      '50 km/h',
      '60 km/h',
      '70 km/h'
    ],
    answer: 1
  },
  {
    question: '¿Qué debe hacer si ve una luz roja en el semáforo?',
    options: [
      'Acelerar',
      'Detenerse',
      'Doblar a la derecha',
      'Tocar la bocina'
    ],
    answer: 1
  },
  {
    question: '¿Qué significa una señal de tránsito con un círculo rojo y una línea diagonal?',
    options: [
      'Prohibición',
      'Advertencia',
      'Obligación',
      'Información'
    ],
    answer: 0
  }
];

function ExamSimulator() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(Array(questions.length).fill(null));
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(null);

  const handleOption = (idx) => {
    const updated = [...selected];
    updated[current] = idx;
    setSelected(updated);
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    }
  };

  const handlePrev = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  const handleFinish = () => {
    let points = 0;
    selected.forEach((sel, idx) => {
      if (sel === questions[idx].answer) points++;
    });
    setScore(points);
    setFinished(true);
    localStorage.setItem('examResult', JSON.stringify({ score: points, date: new Date() }));
  };

  if (finished) {
    return (
      <div className="exam-result">
        <h2>Resultado del Examen</h2>
        <p>Tu puntaje: {score} de {questions.length}</p>
        <button onClick={() => window.location.reload()}>Reintentar</button>
      </div>
    );
  }

  return (
    <div className="exam-simulator">
      <h2>Simulador Examen Clase B</h2>
      <div className="question-block">
        <p><b>Pregunta {current + 1}:</b> {questions[current].question}</p>
        <ul>
          {questions[current].options.map((opt, idx) => (
            <li key={idx}>
              <label>
                <input
                  type="radio"
                  name={`q${current}`}
                  checked={selected[current] === idx}
                  onChange={() => handleOption(idx)}
                />
                {opt}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="navigation">
        <button onClick={handlePrev} disabled={current === 0}>Anterior</button>
        {current < questions.length - 1 ? (
          <button onClick={handleNext} disabled={selected[current] === null}>Siguiente</button>
        ) : (
          <button onClick={handleFinish} disabled={selected[current] === null}>Finalizar</button>
        )}
      </div>
    </div>
  );
}

export default ExamSimulator;
