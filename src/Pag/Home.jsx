import React, { useState, useEffect } from 'react';
import {Link, useNavigate } from "react-router-dom";

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [docenti, setDocenti] = useState([]);
  const [consolle, setConsolle] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');
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
              localStorage.setItem("Role",data.tipo)
              Role=data.tipo
              console.log(Role)
              if(Role==="S")
                getDocenti()
              else if (Role==="D")
                console.log("TODO")
              else if (Role==="A")
                //getConsolle()
                getDocentiA()
            })
          
    };
  
    fetchData();
  }, []);
  const setDocentiA=()=>
    {
      fetch('http://localhost:3001/carica_docenti', {
      method: 'POST',
      body: JSON.stringify({ token }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      setError(data.messaggio)
    })
    }
  const setStudenti=()=>
    {
      fetch('http://localhost:3001/carica_studenti', {
        method: 'POST',
        body: JSON.stringify({ token }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        setError(data.messaggio)
      })
    }

  const getConsolle=()=>
    {
      fetch("http://localhost:3001/admin_console", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({token})
    })
    .then(testo=>testo.json())
    .then((data)=>{
        console.log(data)
        setConsolle(data)
    })
    }

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
      if (data.docenti) {
        console.log(data)
        setDocenti(data.docenti);
      } else {
        console.error('Errore durante il recupero dei docenti:', data.messaggio);
      }
    })
    .catch(error => console.error('Errore durante il recupero dei docenti:', error));
  };
    const getDocentiA = () => {
      console.log("Ciao")
    fetch('http://localhost:3001/get_docenti', {
      method: 'POST',
      body: JSON.stringify({ token }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.docenti) {
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
  const InitValu=()=>
    {
      fetch("http://localhost:3001/start_stop_valutazioni", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({token})
        })
        .then(response => response.json())
        .then(data => {
          setError(data.messaggio)
    })
    }

  return (
    <div className={`${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      <h1>Valutazione Docenti</h1>
      {error && <div className="alert alert-success">{error}</div>}
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
              <div className='row'>
                <div className='col-3'>{localStorage.getItem("Role") === 'A' && (<input type='button' className='btn btn-success' value={"Start/Stop Valutazioni"} onClick={InitValu}/>)}</div>
                <div className='col-2 mx-3'>{localStorage.getItem("Role") === 'A' && (<input type='button' className='btn btn-success' value={"Carica Docenti"} onClick={setDocentiA} />)}</div>
                <div className='col-2 mx-3'>{localStorage.getItem("Role") === 'A' && (<input type='button' className='btn btn-success' value={"Carica Studenti"} onClick={setStudenti}/>)}</div>
                <ul className={`list-group`}>
                  {docenti.map((docente, index) => (
                    <li className={`list-group-item DIV ${isDarkMode ? 'dark-theme' : 'light-theme'}`} key={index}>
                      <h5>{docente.nome} {docente.cognome}</h5>
                      <p>{localStorage.getItem("Role") === 'S' && (docente.materie.join(" - "))}{localStorage.getItem("Role") === 'A' && (docente.email)}</p>
                      <div>{localStorage.getItem("Role") === 'S' && ( <input type='button' className='Bottone' value={"Valuta"} onClick={()=>{GoDomande(docente.nome,docente.cognome)}}/>)}{localStorage.getItem("Role") === 'A' && ( <input type='button' className='Bottone' value={"Vedi"} onClick={()=>{GoDomande(docente.nome,docente.cognome)}}/>)}</div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
    </div>
  );
}

export default App;
