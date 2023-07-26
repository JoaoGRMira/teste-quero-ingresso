import {
    caretDown,
} from '../../images/icons';
import "./buttonStyle.css"

const FilterButtonPos = () => {
    return (
        <button className='button button-blue bold align-center flex' style={{ height: '50px', fontSize: 14, margin: 5, padding: '7px 10px' }}>
            POS <img src={caretDown} alt='pos' style={{ width: '10px', height: '10px', marginLeft: '7px' }} />
        </button>
    )
}

export default FilterButtonPos;