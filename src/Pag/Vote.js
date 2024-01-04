// Questionnaire.js
import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';

const Questionnaire = () => {
  const { professorId, userId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState(
    JSON.parse(localStorage.getItem(`Ris${professorId}-${userId}`)) || {}
  );
  const nav=useNavigate()

  useEffect(() => {
    fetch(`https://raw.githubusercontent.com/1Lg20/ValutazioneDocenti/main/domandeProf.json`)
      .then(response => response.json())
      .then(data => setQuestions(data))
      .catch(error => console.error('Errore durante il recupero delle domande:', error));
  }, []);

  const handleAnswer = (questionIndex, rating) => {
    setAnswers(prevAnswers => ({ ...prevAnswers, [questionIndex]: rating }));
  };

  const handleSubmit = () => {
    localStorage.setItem(`Ris${professorId}-${userId}`, JSON.stringify(answers));
    nav("/Home")
  };

  return (
    <div className="container mt-4">
      <h1>Questionario</h1>
      {questions.map((question, index) => (
        <div key={index} className="mb-3">
          <p>{question.question}</p>
          <div className="btn-group">
            {[1, 2, 3, 4, 5].map(rating => (
              <button
                key={rating}
                type="button"
                className={`btn btn-outline-primary ${answers[index] === rating ? 'active' : ''}`}
                onClick={() => handleAnswer(index, rating)}
              >
                {rating}
              </button>
            ))}
          </div>
        </div>
      ))}
      <button type="button" className="btn btn-success" onClick={handleSubmit}>
        Invia Risposte
      </button>
    </div>
  );
};

export default Questionnaire;
