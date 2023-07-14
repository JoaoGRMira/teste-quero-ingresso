import {
    caretDown,
} from '../../images/icons';
import "./buttonStyle.css"

const FilterButtonIngresso = () => {
    return (
        <button className='button button button-cube bold align-center flex' style={{height:'50px', fontSize:14}}>
            Ingresso <img src={caretDown} alt='filtro por data' style={{width: '1vw', height: '1vw', marginLeft:'7px'}}/>
        </button>
    )
}

export default FilterButtonIngresso;