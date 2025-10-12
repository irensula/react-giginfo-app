import { useState } from 'react';

import GigFilter from './GigFilter';
import GigsList from './GigsList';
import MessageBox from './MessageBox';

const Gigs = ({ gigs, setGigs, editGig, deleteGig, user, message, onClose, updateGigRate }) => {
    const today = new Date();
   
    const [filters, setFilters] = useState({
        city: "",
        artist: "",
        name: "",
        genre: "",
        month: "",
        filter: "",
    })
    const [activeTab, setActiveTab] = useState("");
    let filteredGigs = [...gigs];

    // past and future filter
    if (filters.filter === "past") {
        filteredGigs = gigs.filter(gig => new Date(gig.gig_date) < today);
    } else if (filters.filter === "future") {
        filteredGigs = gigs.filter(gig => new Date(gig.gig_date) >= today);
    }

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        setFilters({ ...filters, filter: tab });
    };

    const months = [
        "tammikuu", "helmikuu", "maaliskuu", "huhtikuu", "toukokuu", "kesäkuu", 
        "heinäkuu", "elokuu", "syyskuu", "lokakuu", "marraskuu", "joulukuu" 
    ]
    const cities = gigs ? [...new Set(gigs.map(gig => gig.city))] : [];
    const artists = filteredGigs ? [...new Set(filteredGigs.map(gig => gig.artist))] : [];
    const gigNames = filteredGigs ? [...new Set(filteredGigs.map(gig => gig.name))] : [];
    const genres = filteredGigs ? [...new Set(filteredGigs.map(gig => gig.genre))] : [];
   
    Object.keys(filters).forEach((key) => {
        if (filters[key] && key !== "filter") {
            if (key === "month") {
                filteredGigs = filteredGigs.filter(gig => {
                    const gigMonth = new Date(gig.gig_date).getMonth();
                    return months[gigMonth] === filters[key];
                });
            } else {
                filteredGigs = filteredGigs.filter(gig => gig[key] === filters[key]);
            }
        }
    });    

    const updateFilter = (key, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [key]: value
        }));
    };

    const clearFilters = () => {
        setFilters({
            city: "",
            artist: "",
            name: "",
            genre: "",
            month: "",
        });
    }

    return (
        <div id='gigs' className='gigs-container'>
            
            <MessageBox message={message} onClose={onClose} />
            
            <GigFilter 
                filters={filters} 
                updateFilter={updateFilter} 
                clearFilters={clearFilters}
                cities={cities}
                artists={artists}
                gigNames={gigNames}
                genres={genres}
                months={months}
                setFilters={setFilters}
                handleTabClick = {handleTabClick}
                activeTab={activeTab}
             />
            <GigsList 
                gigs={filteredGigs}
                editGig={editGig}
                deleteGig={deleteGig} 
                updateGigRate={updateGigRate} 
                user={user} 
            />
        </div>
    )
}
export default Gigs;