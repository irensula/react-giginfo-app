import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const MessageBox = ({ message, onClose }) => {
    if (!message) return null;

    return (
        <div className="message-box">
            <span>{message}</span>
            <button onClick={onClose} className="close-message">
                <FontAwesomeIcon icon={faXmark} />
            </button>
        </div>
    )
}

export default MessageBox;