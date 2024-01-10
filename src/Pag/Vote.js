// Questionnaire.js
import React, { useState, useEffect } from 'react';
import {Link, useParams,useNavigate } from 'react-router-dom';

const Questionnaire = () => {
  const { professorId, userId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState(
    JSON.parse(localStorage.getItem(`Ris${professorId}-${userId}`)) || {}
  );
  const nav=useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const theme=(localStorage.getItem("Theme")==="true")
  const [isDarkMode, setIsDarkMode] = useState(!theme);

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
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const Reset=()=>{
    localStorage.clear()
    nav("/")
  }
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("Theme",isDarkMode)
  };

  return (
    <div className={`${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      <div className={`container mt-4 ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
          <div className={`side-menu ${isOpen ? 'open' : ''} ${isDarkMode ? 'dark-themeS' : 'light-themeS'}`}>
          <input type="button" value={"Menu"} className="toggle-btn Due" onClick={toggleMenu}/>
          <div className='BottoneS'>Benvenuto {userId}!</div>
          <Link className='Bottone BottoneS' to={"/"}>Log-Out</Link>
          <input className='Bottone BottoneS' type="button" value="Reset" onClick={Reset}/>
          <button className='Bottone BottoneS' onClick={toggleDarkMode}>
          {isDarkMode ? 'Tema Chiaro' : 'Tema Scuro'}
          </button>
          </div>
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
    </div>
  );
};

export default Questionnaire;
