import Stars from "./Stars";
import { Link } from "react-router-dom";

const GigsList = ({gigs, updateGigRate}) => {
    
return (
        <div className="gigs-list">
            {gigs.map(gig => (
                <ul key={gig.id} className="gig-wrap">
                    <Link to={`/gigs/${gig.id}`}>
                        <h2 className="artist-title">{gig.artist}</h2>
                        <li> 
                            <img className="gigImage" src={gig.add_image} alt="" />
                        </li>
                    </Link>
                    <li>Tapahtuma: {gig.name}</li>
                    <li className="description">Keikkakuvaus: {gig.description}</li>
                    <li>Keikkapäivä: {new Date(gig.gig_date).toISOString().split('T')[0].split('-').reverse().join('.')}</li>
                    <li>Alkamisaika: {gig.time}</li>
                    <li>Katuosoite: {gig.address}</li>
                    <li>Paikkakunta: {gig.city}</li>
                    <li>Lippun myyntiin: <a href={gig.ticket_sale_link}>{gig.ticket_sale_link}</a></li>
                    <li>Musiikkityylilaji: {gig.genre}</li>
                    <li>Artistin sivu: {gig.artist_link}</li>            
                    <li><Stars gigRate={gig.rate} onRateChange={(newRate) => updateGigRate(gig.id, newRate)}/></li>
                    <Link to={`/gigs/${gig.id}`}>
                        <button className="button-seemore">Katso kaikki tiedot</button>
                    </Link>
                </ul>
            ))}
        </div>
    );
};

export default GigsList;