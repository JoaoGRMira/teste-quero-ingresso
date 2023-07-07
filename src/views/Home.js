import NavigationTopBar from "../components/NavigationTopBar/NavigationTopBar";
import NavigationSideBar from "../components/NavigationSideBar/NavigationSideBar";
import "./home.css";
import DownloadButton from "../components/Buttons/DownloadButton";
import FilterButton from "../components/Buttons/FilterButton";


export default function Home() {
    const evento = 'teste';
    const data = '14/03/2023';
    const local = 'Local'
    const cidade = 'São José dos Campos - São Paulo';

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
                        <div className='evento-nome'>Evento: {evento} </div>
                        <div className='evento-detalhe'>Data: {data}</div>
                        <div className='evento-detalhe'>Local: {local}</div>
                        <div className='evento-detalhe'>Cidade: {cidade}</div>
                    </div>
                </div>
                <div className="botoes">
                    <FilterButton />
                    <DownloadButton />
                </div>
            </div>
            <div className="conteudo">
                <div className="cards-group">
                    <div className="card text-center">
                        <div className="card-header">
                            Featured
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Special title treatment</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        </div>
                        <div className="card-footer text-body-secondary">
                            2 days ago
                        </div>
                    </div>
                    <div className="card text-center">
                        <div className="card-header">
                            Featured
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Special title treatment</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        </div>
                        <div className="card-footer text-body-secondary">
                            2 days ago
                        </div>
                    </div>
                    <div className="card text-center">
                        <div className="card-header">
                            Featured
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Special title treatment</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        </div>
                        <div className="card-footer text-body-secondary">
                            2 days ago
                        </div>
                    </div>
                    <div className="card small text-center">
                        <div className="card-header">
                            Featured
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Special title treatment</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        </div>
                    </div>
                    <div className="card small text-center">
                        <div className="card-header">
                            Featured
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Special title treatment</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        </div>
                        <div className="card-footer text-body-secondary">
                            2 days ago
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}