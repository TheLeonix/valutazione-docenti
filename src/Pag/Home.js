import React, { useState, useEffect } from 'react';
import {Link, useNavigate } from "react-router-dom";

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loggedIn, setLoggedIn] = useState(true);
  const [docenti, setDocenti] = useState([]);
  const [domande, setDomande] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const theme=(localStorage.getItem("Theme")==="true")
  const [isDarkMode, setIsDarkMode] = useState(!theme);
  const nav=useNavigate()
  let Role

  useEffect(() => {
    const fetchData = async () => {
      const storedToken = localStorage.getItem('token');
          await is_valid_token(storedToken);
          fetch("http://localhost:3001/ruolo_utente", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({token})
            })
            .then(response => response.json())
            .then(data => {
              Role=data
              console.log(Role)
            })
        if(Role==="S")
          getDocenti()
        else if (Role==="D")
          console.log("TODO")
        else if (Role==="A")
          getDocentiA()
          
    };
  
    fetchData();
  }, []);

  const is_valid_token =(token)=>{
    return new Promise((resolve, reject) => {
        fetch("http://localhost:3001/token_valido", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token})
        })
        .then(testo=>testo.json())
        .then((data)=>{
            resolve(data)
        })
    })
}

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("Theme", newMode.toString());
  };

  const logout = () => {
    fetch('http://localhost:3001/logout', {
      method: 'POST',
      body: JSON.stringify({ token }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.successo) {
        // Rimuovi il token dallo storage
        localStorage.removeItem('token');
        setLoggedIn(false);
        setToken('');
        nav("/")
      } else {
        console.error('Errore durante il logout:', data.messaggio);
      }
    })
    .catch(error => console.error('Errore durante il logout:', error));
  };

  const getDocenti = () => {
    fetch('http://localhost:3001/get_docenti_classe', {
      method: 'POST',
      body: JSON.stringify({ token }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.valuta) {
        console.log(data)
        setDocenti(data.docenti);
      } else {
        console.error('Errore durante il recupero dei docenti:', data.messaggio);
      }
    })
    .catch(error => console.error('Errore durante il recupero dei docenti:', error));
  };
    const getDocentiA = () => {
    fetch('http://localhost:3001//get_docenti', {
      method: 'POST',
      body: JSON.stringify({ token }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.valuta) {
        console.log(data)
        setDocenti(data.docenti);
      } else {
        console.error('Errore durante il recupero dei docenti:', data.messaggio);
      }
    })
    .catch(error => console.error('Errore durante il recupero dei docenti:', error));
  };

  const GoDomande=(nome,cognome)=>
    {
      nav(`/Vote/${nome}/${cognome}`)
    }

  return (
    <div className={`${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      <h1>Applicazione Studente</h1>
      {loggedIn ? (
        <div className={`container mt-5 ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
          <div className={`side-menu ${isOpen ? 'open' : ''} ${isDarkMode ? 'dark-themeS' : 'light-themeS'}`}>
        <input type="button" value={"Menu"} className="toggle-btn Due" onClick={toggleMenu}/>
          <div className='BottoneS'>Benvenuto {}!</div>
          <input className='Bottone BottoneS' type="button" value="LogOut" onClick={logout}/>
          <button className='Bottone BottoneS' onClick={toggleDarkMode}>
          {isDarkMode ? 'Tema Chiaro' : 'Tema Scuro'}
          </button>
        </div>
          <div>
            {docenti.length > 0 && (
              <div>
                <h2>Docenti:</h2>
                <ul className={`list-group`}>
                  {docenti.map((docente, index) => (
                    <li className={`list-group-item DIV ${isDarkMode ? 'dark-theme' : 'light-theme'}`} key={index}>
                      <h5>{docente.nome} {docente.cognome}</h5>
                      <p>{docente.materie.join(" - ")}</p>
                      <input type='button' className='Bottone' value={"Valuta"} onClick={()=>{GoDomande(docente.nome,docente.cognome)}}/>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {domande.length > 0 && (
              <div>
                <h2>Domande:</h2>
                <ul>
                  {domande.map((domanda, index) => (
                    <li key={index}>{domanda.domanda}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <p>Effettua il login per accedere.</p>
          <button>Login</button>
        </div>
      )}
    </div>
  );
}

export default App;
