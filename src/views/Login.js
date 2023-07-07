import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/quero_ingresso_logo.png';
import "./login.css";

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/home');
  };

  return (
    <div className="App">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={handleSubmit}>
            <img src={logo} alt='home' />

            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Login"
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Senha"
              />
            </div>

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
