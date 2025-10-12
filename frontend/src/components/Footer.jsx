import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faSquareFacebook,  faSquareInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer>
            <div className="icons">
                <FontAwesomeIcon icon={faSquareFacebook} />
                <FontAwesomeIcon icon={faSquareInstagram} />
                <FontAwesomeIcon icon={faEnvelope} />
            </div>  
            <p>{currentYear} &copy; All rights reserved</p>  
        </footer>
    )
}
export default Footer;