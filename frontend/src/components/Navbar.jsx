import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse,faSquarePlus, faUserPlus, faRightToBracket, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({token, logout}) => {
    return(
        <nav>
            
                
                 <Link to="/" className="nav-item">
                    <FontAwesomeIcon icon={faHouse} className="mobile-icon" />
                        <span className="navspan">Etusivu</span>
                </Link>
                
         
                {token && <Link to="/uusi-keikka" className="nav-item">
                            <FontAwesomeIcon icon={faSquarePlus} className="mobile-icon"/>
                                <span className="navspan">Lisä uusi keikka</span>
                        </Link>
                        }
           
                {!token && <Link to="/login" className="nav-item">
                            <FontAwesomeIcon icon={faRightToBracket} className="mobile-icon" />
                                <span className="navspan">Kirjaudu</span>
                        </Link>}
            
                {!token && <Link to="/register" className="nav-item">
                            <FontAwesomeIcon icon={faUserPlus} className="mobile-icon" />
                                <span className="navspan">Rekisteröidy</span>
                        </Link>
                        }
            
                 {token && <Link to="/" onClick={logout} className="nav-item"><button className="navbutton" id="logout" onClick={logout}>
                            <FontAwesomeIcon icon={faRightFromBracket} className="mobile-icon" />
                                <span className="navspan">Kirjaudu ulos</span></button></Link>}
            
        </nav>
    )
}

export default Navbar;