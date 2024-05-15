import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("Theme") === "true");
  const nav = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user: email, password })
      });

      const data = await response.json();

      if (response.ok) {
        if (data.credenziali_res==true) {
          localStorage.setItem('token', data.tuo_token);
          localStorage.setItem('isLoggedIn', 'true');
          console.log(data)
          nav("/home");
        }
        else
        {
          setError(data.messaggio)
        }
      } else {
        setError(data.messaggio);
      }
    } catch (error) {
      console.error('Errore durante il login:', error);
      setError('Errore durante il login');
    }
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("Theme", newMode.toString());
  };

  return (
    <div className={`login ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      <div className={`container mt-5 ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
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
        <div className="side-menu">
          <button className='Bottone BottoneS' onClick={toggleDarkMode}>
            {isDarkMode ? 'Tema Chiaro' : 'Tema Scuro'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
