import React, { useState, useEffect } from 'react';
import {Link, useNavigate } from "react-router-dom";
function Home() {
  console.clear()
  const nav=useNavigate()
  const [docenti, setDocenti] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const theme=(localStorage.getItem("Theme")==="true")
  const [isDarkMode, setIsDarkMode] = useState(!theme);
  const utente=JSON.parse(localStorage.getItem("userData"))
  console.log(theme)
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/1Lg20/ValutazioneDocenti/main/ProfJSON.json')
      .then(response => response.json())
      .then(data => {
        const docentiFiltrati = data.filter(docente => docente.materie[utente.classe]);
        setDocenti(docentiFiltrati);
      })
      .catch(error => console.error('Errore durante il recupero dei dati:', error));
  }, [utente.classe]);
  const setTrue = (docenteId) => {
    nav(`/Vote/${docenteId}/${utente.username}`)
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
      <div className={`container mt-5 ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
        <div className={`side-menu ${isOpen ? 'open' : ''} ${isDarkMode ? 'dark-themeS' : 'light-themeS'}`}>
        <input type="button" value={"Menu"} className="toggle-btn Due" onClick={toggleMenu}/>
          <div className='BottoneS'>Benvenuto {utente.username}!</div>
          <Link className='Bottone BottoneS' to={"/"}>Log-Out</Link>
          <input className='Bottone BottoneS' type="button" value="Reset" onClick={Reset}/>
          <button className='Bottone BottoneS' onClick={toggleDarkMode}>
          {isDarkMode ? 'Tema Chiaro' : 'Tema Scuro'}
          </button>
        </div>
        <h1 className="mb-4">Valutazione Docenti</h1>
        <ul className={`list-group`}>
          {docenti.map(docente => (
            <li className={`list-group-item DIV ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
              <h5>{docente.nome}</h5>
              <p>{docente.materie[utente.classe].join(" - ")}</p>
              <input type='button' className='Bottone' value={"Valuta"} onClick={()=>setTrue(docente.nome)}/>
              {console.log(docente.valutato)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default Home;
