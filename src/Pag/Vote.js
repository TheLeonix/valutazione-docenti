// Questionnaire.js
import React, { useState, useEffect } from 'react';
import {Link, useParams,useNavigate } from 'react-router-dom';

const Questionnaire = () => {
  const { professorName, professorSurname } = useParams();
  const [questions, setDomande] = useState([]);
  const [answers, setAnswers] = useState([]);
  const nav=useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const theme=(localStorage.getItem("Theme")==="true")
  const [isDarkMode, setIsDarkMode] = useState(!theme);
  const storedToken = localStorage.getItem('token');
  useEffect(() => {
    const fetchData = async () => {
      let Role=localStorage.getItem("Role")
      console.log(Role)
      if(Role==="S")
        getDomande()
      else if (Role==="D")
        console.log("TODO")
      else if (Role==="A")
        getVoti()
    };
  
    fetchData();
  }, []);

  const handleAnswer = (questionIndex, rating) => {
    const obj =
    {
      idDomanda:questionIndex,
      voto:rating
    }
    setAnswers(prevAnswers => ({ ...prevAnswers,obj  }));
    console.log(answers)
  };

  const handleSubmit = () => {
      fetch('http://localhost:3001/valuta_docente', {
        method: 'POST',
        body: JSON.stringify({professorName,professorSurname,storedToken, answers }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        nav("/Home")
      })
      .catch(error => console.error('Errore durante il logout:', error));
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
  const getDomande = () => {
    fetch('http://localhost:3001/get_domande')
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setDomande(data.domande);
    })
    .catch(error => console.error('Errore durante il recupero delle domande:', error));
  };
  const getVoti = () => {
    fetch('http://localhost:3001/view_docente', {
      method: 'POST',
      body: JSON.stringify({professorName,professorSurname,storedToken}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setDomande(data)
    })
    .catch(error => console.error('Errore durante il logout:', error));
  }

  return (
    <div className={`${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      <div className={`container mt-4 ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
          <div className={`side-menu ${isOpen ? 'open' : ''} ${isDarkMode ? 'dark-themeS' : 'light-themeS'}`}>
          <input type="button" value={"Menu"} className="toggle-btn Due" onClick={toggleMenu}/>
          <div className='BottoneS'>Benvenuto!</div>
          <Link className='Bottone BottoneS' to={"/"}>Log-Out</Link>
          <input className='Bottone BottoneS' type="button" value="Reset" onClick={Reset}/>
          <button className='Bottone BottoneS' onClick={toggleDarkMode}>
          {isDarkMode ? 'Tema Chiaro' : 'Tema Scuro'}
          </button>
          </div>
        <h1>Questionario</h1>
        {localStorage.getItem("Role") === 'S' && (questions.map((question, index) => (
          <div key={index} className="mb-3">
            <p>{question.domanda}</p>
            <div className="btn-group">
              {[1, 2, 3, 4, 5].map(rating => (
                <button
                  key={rating}
                  type="button"
                  className={`btn btn-outline-primary ${answers[index] === rating ? 'active' : ''}`}
                  onClick={() => handleAnswer(question.id, rating)}
                >
                  {rating}
                </button>
              ))}
            </div>
          </div>
        )))}
        <button type="button" className="btn btn-success" onClick={handleSubmit}>
          Invia Risposte
        </button>
      </div>
    </div>
  );
};

export default Questionnaire;
