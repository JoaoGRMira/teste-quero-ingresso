import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/quero_ingresso_logo.png';
import Connection from '../../model/index';
import { useToken } from '../../model/tokenContext'; // Importe o hook useToken
import "./login.css";

export default function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ login: '', senha: '' });
  const [error, setError] = useState('');
  const { setToken } = useToken(); // Use o hook useToken para acessar setToken do contexto

  const handleLoginChange = (event) => {
    setLoginData({ ...loginData, login: event.target.value });
  };

  const handlePasswordChange = (event) => {
    setLoginData({ ...loginData, senha: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const conn = Connection();
      const response = await conn.post('/user/login', loginData);

      if (response.status === 200) {
        // Salvar o token no contexto
        setToken(response.data.token);
        navigate('/eventos');
      } else {
        setError('Credenciais inválidas. Por favor, tente novamente.');
      }
    } catch (error) {
      setError('Ocorreu um erro ao fazer login. Por favor, tente novamente.');
    }
  };

  return (
    <div className="App">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={handleSubmit}>
            <img src={logo} alt='home' />

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Login"
                value={loginData.login}
                onChange={handleLoginChange}
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Senha"
                value={loginData.senha}
                onChange={handlePasswordChange}
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            <div className="mb-3">
              <div className="custom-control custom-checkbox d-flex align-items-center">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Lembrar-me
                </label>
              </div>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
