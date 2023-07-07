import NavigationTopBar from "../components/NavigationTopBar/NavigationTopBar";
import NavigationSideBar from "../components/NavigationSideBar/NavigationSideBar";
import "./home.css";
import DownloadButton from "../components/Buttons/DownloadButton";
import FilterButton from "../components/Buttons/FilterButton";

export default function Home() {
    return (
        <div className="corpo">
            <div className="menu-superior">
                <NavigationTopBar />
            </div>
            <div className="menu-lateral">
                <NavigationSideBar />
            </div>
            <div className="area-informacoes">
                <div className="evento">
                    <div className='evento-header'>
                        Relatório Geral
                    </div>
                    <div className='evento-informacoes'>
                        <div className='evento-nome'>Evento: </div>
                        <div className='evento-detalhe'>Data: </div>
                        <div className='evento-detalhe'>Local: </div>
                        <div className='evento-detalhe'>Cidade: </div>
                    </div>
                </div>
                <div className="botoes">
                    <FilterButton />
                    <DownloadButton/>
                </div>
            </div>
            <div className="conteudo">Conteúdo</div>
        </div>
    );
}