import GigForm from '../components/GigForm';

import InnerHeader from "../components/InnerHeader";

const Uusi_keikka = ({ addGig, newGig, setNewGig, message, setMessage, token, logout}) => {

    return (
        <div>
            <InnerHeader token={token} logout={logout}/> 
            <GigForm addGig={addGig} newGig={newGig} setNewGig={setNewGig} message={message} setMessage={setMessage} />
        </div>
    )
}

export default Uusi_keikka;