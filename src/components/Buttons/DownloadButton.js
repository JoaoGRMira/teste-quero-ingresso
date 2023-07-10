import {
    print,
} from '../../images/icons';
import "./buttonStyle.css"

const DownloadButton = () => {
    return (
        <button className='button button-blue button-cube' style={{height:'3.5vw', width:'3.5vw'}}>
            <img src={print} alt="download" />
        </button>
    )
}

export default DownloadButton;