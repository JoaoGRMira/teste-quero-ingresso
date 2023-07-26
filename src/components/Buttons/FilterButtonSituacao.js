import {
    caretDown,
} from '../../images/icons';
import "./buttonStyle.css"

const FilterButtonSituacao = () => {
    return (
        <button className='button button-blue bold align-center flex' style={{ height: '50px', fontSize: 14, margin: 5, padding: '7px 10px' }}>
            Situação <img src={caretDown} alt='situacao' style={{ width: '10px', height: '10px', marginLeft: '7px' }} />
        </button>
    )
}

export default FilterButtonSituacao;