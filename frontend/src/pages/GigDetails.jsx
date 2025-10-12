import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import InnerHeader from "../components/InnerHeader";
import Stars from "../components/Stars";
import ConfirmModal from "../components/ConfirmModal";
import MessageBox from "../components/MessageBox";
import validateGig from '../utils/validateGig';

const GigDetails = ({ user, token, logout, gigs, editGig, deleteGig, showModal, setShowModal, updateGigRate, message, setMessage, onClose}) => {
    const { id } = useParams(); // get gig's id from the url
    const [gig, setGig] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [updatedFields, setUpdatedFields] = useState({
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
        rate: ""
    })
    // fetch gig data
    useEffect(() => {
        const fetchGigDetails = async () => {
            try {
                const response = await axios.get(`/api/gigs/${id}`);
                setGig(response.data); // set the gig data to state
            } catch (error) {
                console.error("Error fetching gig details:", error);
            }
        }
            fetchGigDetails();
    }, [id]);
    if (!gig) {
        return (
          <>
            <InnerHeader token={token} logout={logout} />
            <div className="gig-container">Keikkaa ladataan...</div>
          </>
        );
      }
      
    
    // called on "muokata" click
    const handleEditClick = (id) => {
        let gig = gigs.find(g => g.id == id);
        setEditingId(gig.id);
        const formattedDate = new Date(gig.gig_date).toISOString().split('T')[0];
        setUpdatedFields({
            name: gig.name || "",
            artist: gig.artist || "",
            add_image: gig.add_image || "",
            description: gig.description || "",
            gig_date: formattedDate || "",
            time: gig.time || "",
            address: gig.address || "",
            city: gig.city || "",
            ticket_sale_link: gig.ticket_sale_link || "",
            genre: gig.genre || "",
            artist_link: gig.artist_link || "",
            rate: gig.rate || ""
        })
    }
    // called on every input change in the form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedFields(prevFields => ({
            ...prevFields,
            [name]: value
        }))
    }
    // called on submit "lähetä" click
    const handleSubmit = async (e, gigId) => {
        e.preventDefault();
        try {
            const error = validateGig(updatedFields);
            if (error) {
                setMessage(error);
                return;
            } 
            const updatedGig = await editGig(e, gigId, updatedFields);  
            setGig(updatedGig);
            setEditingId(null);
            setMessage("Keikka on muokattu onnistuneesti.");
            setTimeout(() => {
                setMessage(null);
            }, 3000);
        } catch (error) {
            console.error("Error submitting updated gig:", error);
        }
    };
    const handleDelete = () => {
        deleteGig(gig.id);
        setShowModal(false); // Close modal after action
    };
    const handleCancel = () => {
        setShowModal(false); // Close modal on cancel
    };
    return (
        <> 
            <InnerHeader token={token} logout={logout}/> 
            <div className="gig-container">   
                <MessageBox message={message} onClose={onClose} />         
                {editingId === gig.id ? (
                        <form onSubmit={(e) => handleSubmit(e, gig.id)}>
                            <li>Artisti:
                                <input 
                                    type="text"
                                    name="artist"
                                    value={updatedFields.artist}
                                    onChange={handleInputChange}
                                 />
                            </li>
                            <li>Keikan kuva: 
                                <input 
                                    type="text"
                                    name="add_image"
                                    value={updatedFields.add_image}
                                    onChange={handleInputChange}
                                />
                            </li>
                            <li>Keikan nimi:
                                <input 
                                    type="text"
                                    name="name"
                                    value={updatedFields.name}
                                    onChange={handleInputChange}
                                 />
                            </li>
                            <li>Keikkakuvaus: 
                                <input 
                                    type="text"
                                    name="description"
                                    value={updatedFields.description}
                                    onChange={handleInputChange} 
                                />
                            </li>
                            <li>Keikkapäivä: 
                                <input 
                                    type="date"
                                    name="gig_date"
                                    value={updatedFields.gig_date}
                                    onChange={handleInputChange} 
                                />
                            </li>
                            <li>Alkamisaika: 
                                <input 
                                    type="text" 
                                    name="time"
                                    value={updatedFields.time}
                                    onChange={handleInputChange} 
                                />
                            </li>
                            <li>Katuosoite: 
                                <input 
                                    type="text" 
                                    name="address"
                                    value={updatedFields.address}
                                    onChange={handleInputChange} 
                                />    
                            </li>
                            <li>Paikkakunta: 
                                <input 
                                    type="text" 
                                    name="city"
                                    value={updatedFields.city}
                                    onChange={handleInputChange} 
                                />
                            </li>
                            <li>Lippun myyntiin: 
                                <input 
                                    type="text" 
                                    name="ticket_sale_link"
                                    value={updatedFields.ticket_sale_link}
                                    onChange={handleInputChange} 
                                />
                            </li>
                            <li>Musiikkityylilaji: 
                                <input 
                                    type="text" 
                                    name="genre"
                                    value={updatedFields.genre}
                                    onChange={handleInputChange} 
                                />
                            </li>
                            <li>Artistin sivu: 
                                <input 
                                    type="text" 
                                    name="artist_link"
                                    value={updatedFields.artist_link}
                                    onChange={handleInputChange} 
                                />
                            </li>
                            <div>
                                <button className="button-edit" type="submit">Lähetä</button>
                                <button className="button-edit" type="button" onClick={() => setEditingId(null)}>Peruuta</button>
                            </div>
                    </form>) : (
                        <>
                            <h2 className="artist-title">{gig.artist}</h2>
                            <li> 
                                <img className="gig-image-details" src={gig.add_image} alt="" />
                            </li>
                            <li><span className="gig-span">Tapahtuma:</span> {gig.name}</li>
                            <li><span className="gig-span">Keikkakuvaus:</span> {gig.description}</li>
                            <li><span className="gig-span">Keikkapäivä:</span> {new Date(gig.gig_date).toISOString().split('T')[0].split('-').reverse().join('.')}</li>
                            <li><span className="gig-span">Alkamisaika:</span> {gig.time}</li>
                            <li><span className="gig-span">Katuosoite:</span> {gig.address}</li>
                            <li><span className="gig-span">Paikkakunta:</span> {gig.city}</li>
                            <li><span className="gig-span">Lippun myyntiin:</span> <a href={gig.ticket_sale_link}>{gig.ticket_sale_link}</a></li>
                            <li><span className="gig-span">Musiikkityylilaji:</span> {gig.genre}</li>
                            <li><span className="gig-span">Artistin sivu:</span> {gig.artist_link}</li>            
                            <li><Stars gigRate={gig.rate} onRateChange={(newRate) => updateGigRate(gig.id, newRate)}/></li>
                        </>
                        )}
                        { user && user.token && user.id === gig.user_id && !editingId && 
                            <div>
                                <button className="button-edit" onClick={() => handleEditClick(gig.id)}>Muokata</button>
                                {showModal && (
                                    <ConfirmModal 
                                        message="Are you sure you want to delete this gig?" 
                                        onConfirm={handleDelete} 
                                        onCancel={handleCancel} 
                                    />
                                )}
                                <button className="button-delete" onClick={() => setShowModal(true)}>Poista keikka</button>
                            </div>
                        }
            </div>
        </>
    )
}
export default GigDetails;