import {
    print,
} from '../../images/icons';
import "./buttonStyle.css"

const DownloadButton = () => {
    return (
        <button className='button button-blue button-cube'>
            <img src={print} alt="download" />
        </button>
    )
}

export default DownloadButton;