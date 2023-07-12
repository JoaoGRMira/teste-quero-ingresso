import "./buttonStyle.css"

const FilterEventos = () => {
    return (
        <form>
            <select id="dropdown" className="dropdown">
              <option>Eventos ativos</option>
              <option>Eventos encerrados</option>
            </select>
          </form>
    )
}

export default FilterEventos;