import logo from "../../images/quero_ingresso_logo.png";
import "./navBarStyle.css"

export default function NavigationTopBar() {
  // Nome de usuário fictício para exemplo
  const username = "Usuário Exemplo";

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img src={logo} alt="Quero Ingressos"></img>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-between" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-link active" aria-current="page" href="/">Home</a>
            <a className="nav-link" href="/">Saldo PDV</a>
          </div>
          <div className="navbar-nav">
            <a className="nav-link" href="#">{username}</a>
            <a className="nav-link" href="#">Sair</a>
          </div>
        </div>
      </div>
    </nav>
  );
}