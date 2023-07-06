import React, { Component } from 'react'
import logo from '../images/quero_ingresso_logo.png';
import "./login.css";

export default class Login extends Component {
  render() {
    return (
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <form>
              <li className='logo' style={{float: 'center'}}>
                  <img src={logo} alt='home' />
              </li>
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
                <div className="custom-control custom-checkbox">
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
                  <a href="/home"> Entrar</a>
                  </button>
              </div>
            </form>
            
          </div>
        </div>
      </div>

    )
  }
}