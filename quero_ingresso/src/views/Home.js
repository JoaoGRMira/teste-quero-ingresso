import NavigationTopBar from "../components/NavigationTopBar/NavigationTopBar";
import NavigationSideBar from "../components/NavigationSideBar/NavigationSideBar";
import "./home.css";

export default function Home() {
  return (
    <div className="corpo">
      <div className="menu-superior">
        <NavigationTopBar/>
      </div>
      <div className="menu-lateral">
        <NavigationSideBar />
      </div>
      <div className="area-informacoes">Área de Informações</div>
      <div className="conteudo">Conteúdo</div>
    </div>
  );
}
