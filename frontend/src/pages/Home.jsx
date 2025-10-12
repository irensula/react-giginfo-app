import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronDown } from '@fortawesome/free-solid-svg-icons';

import Navbar from "../components/Navbar";
import Gigs from "../components/Gigs";

const Home = ({gigs, setGigs, editGig, deleteGig, updateGigRate, user, token, logout, message, onClose }) => {
    return (
        <main>
            <header id="header">
                <Navbar token={token} logout={logout} />
                <div className='title-wrap'>
                    <h1 className="main-title">KEIKKAINFO</h1>
                </div>
                <a href="#gigs" className="gigs-anchor">
                    <FontAwesomeIcon icon={faCircleChevronDown} />
                </a>
            </header>
            <Gigs 
                gigs={gigs}
                setGigs={setGigs}
                editGig={editGig}
                deleteGig={deleteGig}    
                user={user}
                message={message}
                updateGigRate={updateGigRate}
                onClose={onClose}
            />
        </main>
    )
}
export default Home;