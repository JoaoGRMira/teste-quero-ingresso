import logo from "../images/quero_ingresso_logo.png";

export default function NavigationTopBar() {
  // Nome de usuário fictício para exemplo
  const username = "Usuário Exemplo";

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          width: "20%",
          backgroundColor: "blue",
          color: "white",
          height: "100vh",
        }}
      >
        {/* Conteúdo do menu lateral */}
        <ul>
          <li>Opção 1</li>
          <li>Opção 2</li>
          <li>Opção 3</li>
          <li>Opção 4</li>
        </ul>
      </div>
      <div style={{ width: "80%" }}>
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: 'white' }}>
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              <img src={logo} alt="Quero Ingressos" style={{ height: '70px' }}></img>
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
      </div>
    </div>
  );
}
