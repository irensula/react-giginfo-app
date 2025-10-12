import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MessageBox from "./MessageBox";
import validateGig from '../utils/validateGig';

const GigForm = ({ addGig, newGig, setNewGig }) => {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewGig(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requiredFields = [
            "name", "artist", "add_image", "description", "gig_date", "time",
            "address", "city", "ticket_sale_link", "genre", "artist_link"
          ];          
        const fieldLabels = {
            name: "Tapahtuma",
            artist: "Artisti",
            add_image: "Keikan kuva",
            description: "Keikkakuvaus",
            gig_date: "Keikkapäivä",
            time: "Alkamisaika",
            address: "Katuosoite",
            city: "Paikkakunta",
            ticket_sale_link: "Lipun myyntiin linkki",
            genre: "Musiikkityylilaji",
            artist_link: "Artistin sivu"
          };
        
        const missingFields = requiredFields.filter(field => !newGig[field]);
        if (missingFields.length > 0) {
            const fieldNames = missingFields.map(field => fieldLabels[field] || field);
            setMessage("Täytä kaikki pakolliset kentät: " + fieldNames.join(", "));
            return;
        } 
        const error = validateGig(newGig);
        if (error) {
            setMessage(error);
            return;
        }    
            try {
                await addGig(
                    newGig.name,
                    newGig.artist,
                    newGig.add_image,
                    newGig.description,
                    newGig.gig_date,
                    newGig.time,
                    newGig.address,
                    newGig.city,
                    newGig.ticket_sale_link,
                    newGig.genre,
                    newGig.artist_link,
                 );
                 setNewGig({
                    name: "",
                    artist: "",
                    add_image: "",
                    description: "",
                    gig_date: "",
                    time: "",
                    address: "",
                    city: "",
                    ticket_sale_link: "",
                    genre: "",
                    artist_link: "",
                });
                navigate("/#gigs");
            } catch (err) {
                setMessage("Virhe keikan lisäämisessä.");
                console.error("Error adding gig:", err);
              }
    };

    return (
        <div className="new-gig-container">
        <MessageBox 
                    message={message} 
                    onClose={() => {
                        setMessage('');
                    } }
                />
        <div className="form-wrap">
            <h2 className="inner-title">Lisää uusi keikka</h2> 
            <form onSubmit={handleSubmit} >
                <label>Tapahtuma:</label>  
                <input 
                    onChange={handleChange}
                    type="text"
                    value={newGig.name}
                    name="name"
                    id="newGigName"
                />
                <label>Artisti:</label>
                <input 
                    onChange={handleChange}
                    type="text"
                    value={newGig.artist}
                    name="artist" 
                    id="newGigArtist"
                />
                <label>Keikan kuva:</label>
                <input 
                    onChange={handleChange}
                    type="text"
                    value={newGig.add_image}
                    name="add_image"
                    id="newGigImage" 
                />
                <label>Keikkakuvaus:</label>
                <input 
                    type="text"
                    onChange={handleChange}
                    value={newGig.description}
                    name="description" 
                    id="newGigDesc"
                />
                <label>Keikkapäivä:</label>
                <input 
                    onChange={handleChange}
                    type="date"
                    value={newGig.gig_date}
                    name="gig_date" 
                    id="newGigDate"
                />
                <label>Alkamisaika:</label>
                <input 
                    onChange={handleChange}
                    type="text"
                    value={newGig.time}
                    name="time" 
                    id="newGigTime"
                    placeholder="00:00"
                />
                <label>Katuosoite:</label>
                <input 
                    onChange={handleChange}
                    type="text"
                    value={newGig.address}
                    name="address" 
                    id="newGigAddress"
                />
                <label>Paikkakunta:</label>
                <input 
                    onChange={handleChange}
                    type="text"
                    value={newGig.city}
                    name="city" 
                    id="newGigCity"
                />
                <label>Lippun myyntiin linkki:</label>
                <input 
                    onChange={handleChange}
                    type="text"
                    value={newGig.ticket_sale_link}
                    name="ticket_sale_link" 
                    id="newGigTicketSaleLink"
                />
                <label>Musiikkityylilaji:</label>
                <input 
                    onChange={handleChange}
                    type="text"
                    value={newGig.genre}
                    name="genre" 
                    id="newGigGenre"
                />
                <label>Artistin sivu:</label>
                <input 
                    onChange={handleChange}
                    type="text"
                    value={newGig.artist_link}
                    name="artist_link" 
                    id="newGigArtistLink"
                />
                <input className="button wide-button" type="submit" value="Tallenna" id="submit"/>
            </form>
        </div>
        </div>
    )
}
export default GigForm;