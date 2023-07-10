import DownloadButton from '../components/Buttons/DownloadButton'
import FilterButton from '../components/Buttons/FilterButton'
import NavigationSideBar from '../components/NavigationSideBar/NavigationSideBar'
import NavigationTopBar from '../components/NavigationTopBar/NavigationTopBar'
import './home.css'

const evento = 'teste';
const data = '14/03/2023';
const local = 'Local'
const cidade = 'São José dos Campos - São Paulo';

export default function Home() {
    return (
        <div className="corpo">
            <div className="menu-superior">
                <NavigationTopBar />
            </div>
            <div className="menu-lateral">
                <NavigationSideBar />
            </div>
            <div className="conteudo">
                <div className='informacoes'>
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
                <div className="cards-group">
                <div className="card text-center" style={{height:'50vh', width:'35vh'}}>
                        <div className="card-header">
                            Situação do Evento
                        </div>
                        <div className="card-body">
                            <p className="card-text">Vendas iniciadas em: <br/>
                            02/05/2023<br/>
                            <strong>Iniciado há 61 dias</strong></p>
                        </div>
                        <div className="card-footer text-body-secondary">
                            Dias restantes para o evento <br />
                            Faltam 5 dias
                        </div>
                    </div>
                    <div className="card text-center" style={{height:'50vh', width:'35vh'}}>
                        <div className="card-header">
                            Ingressos Emitidos
                        </div>
                        <div className="card-body">
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        </div>
                    </div>
                    <div className="card text-center" style={{height:'50vh', width:'35vh'}}>
                        <div className="card-header">
                            Faturamentos
                        </div>
                        <div className="card-body">
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        </div>
                    </div>
                    <div className='card-container'>

                    <div className="card text-center" style={{height:'15vh', width:'35vh'}}>
                        <div className="card-header">
                            Ticket Médio
                        </div>
                        <div className="card-body">
                            <p className="card-text"></p>
                        </div>
                    </div>
                    <div className="card text-center" style={{height:'30vh', width:'35vh'}}>
                        <div className="card-header">
                            Média Diária
                        </div>
                        <div className="card-body">
                            <p className="card-text"></p>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}