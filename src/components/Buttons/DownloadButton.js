import {
    print,
} from '../../images/icons';
import "./buttonStyle.css"

const DownloadButton = () => {
    return (
        <button className='button button-blue' style={{ height: '50px', width: '50px', margin: 5, padding: '7px 10px' }}>
            <img src={print} alt="download" style={{ height: '25px', width: '25px' }} />
        </button>
    )
}

export default DownloadButton;