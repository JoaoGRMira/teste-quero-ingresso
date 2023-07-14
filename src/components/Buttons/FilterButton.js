import {
    caretDown,
} from '../../images/icons';
import "./buttonStyle.css"

const FilterButton = () => {
    return (
        <button className='button button button-cube bold align-center flex' style={{ height: '50px', fontSize: 14 }}>
            Filtro por data <img src={caretDown} alt='filtro por data' style={{ width: '1vw', height: '1vw', marginLeft: '7px' }} />
        </button>
    )
}

export default FilterButton;