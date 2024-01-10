import React, { useState,useEffect } from 'react';
import {Link,useNavigate} from "react-router-dom"
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [Dati, setDati] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const theme=(localStorage.getItem("Theme")==="true")
  const [isDarkMode, setIsDarkMode] = useState(!theme);
  const nav=useNavigate()
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/1Lg20/ValutazioneDocenti/main/Credenziali.json')
      .then(response => response.json())
      .then(data => {
        setDati(data)
      })
      .catch(error => console.error('Errore durante il recupero dei dati:', error));
  }, []);
  const handleLogin = () => {
    const flag=Dati.find(user => user.username === email && user.password === password);
    console.log(flag);
    if(flag)
    {
      localStorage.setItem('userData',JSON.stringify(flag));
      nav("home")
    }
    else
      setError("Credenziali non valide")
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
    <div className={`login ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      <div className={`container mt-5 ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
        <div className={`side-menu ${isOpen ? 'open' : ''} ${isDarkMode ? 'dark-themeS' : 'light-themeS'}`}>
          <input type="button" value={"Menu"} className="toggle-btn Due" onClick={toggleMenu}/>

            <Link className='Bottone BottoneS' to={"/"}>Log-Out</Link>
            <input className='Bottone BottoneS' type="button" value="Reset" onClick={Reset}/>
            <button className='Bottone BottoneS' onClick={toggleDarkMode}>
            {isDarkMode ? 'Tema Chiaro' : 'Tema Scuro'}
            </button>
          </div>
        <h2>Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form>
          <div className="mb-3">
            <div className="form-label">
              Email
            </div>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <div className="form-label">
              Password
            </div>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button type="button" className="btn btn-primary" onClick={handleLogin}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
