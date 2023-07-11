import NavigationTopBar from "../../components/NavigationTopBar/NavigationTopBar";
import Table from "../../components/Event/Table";
import "./eventos.css";

export default function Evento() {
    return (
        <div className="corpoEventos">
            <div className="menu-superior">
                <NavigationTopBar />
            </div>
            <div className="conteudoEventos">
                <Table />
            </div>
        </div>
    );
}