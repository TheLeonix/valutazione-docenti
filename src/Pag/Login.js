import React, { useState,useEffect } from 'react';
import {useNavigate} from "react-router-dom"
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [Dati, setDati] = useState({});
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

  return (
    <div className="container mt-5">
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
  );
};

export default Login;
