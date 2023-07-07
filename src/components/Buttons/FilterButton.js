import {
    caretDown,
} from '../../images/icons';
import "./buttonStyle.css"

const FilterButton = () => {
    return (
        <button className='button button-blue button-cube bold align-center flex'>
            Filtro por data <img src={caretDown} alt='filtro por data' style={{width: '1vw', height: '1vw', marginLeft:'7px'}}/>
        </button>
    )
}

export default FilterButton;