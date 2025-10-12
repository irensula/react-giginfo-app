import './App.css';
import { Routes, Route, useNavigate  } from "react-router-dom";
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import gigsServices from './components/services/gigsService';
import validateUser from './utils/validateUser';

import Home from './pages/Home';
import Uusi_keikka from './pages/Uusi_keikka';
import Login from './pages/Login';
import Register from './pages/Register';
import GigDetails from './pages/GigDetails';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';

function App() {
  const loginURL = "/api/login";
  const registerURL = "/api/register";
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [gigs, setGigs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newGig, setNewGig] = useState({
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
    artist_link: ""
})
// show all gigs
useEffect(() => {
  gigsServices.getAll()
    .then(response => {
      const gigs = response
      setGigs(gigs);
    })
    .catch(error => {
      console.error("Error fetching gigs:", error);
    });
}, []);

useEffect(() => {
    if (gigs.length > 0) {
      const timer = setTimeout(() => {
        document.getElementById("header")?.scrollIntoView({ behavior: 'smooth' });
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [gigs]);
// set token
useEffect(() => {
  const loggedUserJSON = window.localStorage.getItem('keikkainfouser');
  if(loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);
    const now = new Date().getTime();
    if(user.expiresAt && now > user.expiresAt) {
      localStorage.removeItem('keikkainfouser');
      setToken(null);
    } else {
      setToken(user.token);
      gigsServices.setToken(user.token);
      setUser(user);
    }
  }
}, []);
// login
const loginHandler = async (userdata, setToken, setMessage) => {
  try {
      const response = await axios.post(loginURL, userdata);
      const data = response.data;

      window.localStorage.setItem('keikkainfouser', JSON.stringify(data));
      gigsServices.setToken(data.token);
      setMessage("Olet kirjautunut sisään onnistuneesti!");
      setToken(data.token);
      setTimeout(() => {
          navigate('/'); 
          setMessage("");
      }, 3000);

      return { success: true }; 
  } catch (error) {
      setMessage("Virheellinen käyttäjätunnus tai salasana.");
      return { error: true }; 
  }
};
// register
const registerHandler = (userdata) => {
  const error = validateUser(userdata);
  if(error) {
    setMessage(error);
    return;
  }
  axios.post(registerURL, userdata)
  .then(response => {
    if (response.data) {
      window.localStorage.setItem('keikkainfouser', JSON.stringify(response.data)); 
      gigsServices.setToken(response.data.token);
    }
    setMessage("Rekisteröinti onnistui! Voit nyt kirjautua sisään.");
    setTimeout (() => {
      navigate('/login');
      setMessage("");
    }, 3000);
  })
  .catch((error) => {
    console.error("Register failed: ", error);
    setMessage("Rekisteröinti epäonnistui. Tarkista tiedot tai yritä uudelleen.");
  });
}
// logout
const logout = () => {
  window.localStorage.removeItem('keikkainfouser')
  window.location.reload()
}
// adding a new gig
const addGig = async (gigName, gigArtist, gigImage, gigDescription, gigDate, gigTime, gigAddress, gigCity, gigTicketSale, gigGenre, gigArtistLink) => {
  
  const gig = {
    date: new Date().toISOString(),
    name: gigName,
    artist: gigArtist,
    add_image: gigImage,
    description: gigDescription,
    gig_date: gigDate,
    time: gigTime,
    address: gigAddress,
    city: gigCity,
    ticket_sale_link: gigTicketSale,
    genre: gigGenre,
    artist_link: gigArtistLink
  };
  const response = await gigsServices.add(gig);
  setGigs(prev => prev.concat(response));
  setMessage("Keikka on lisätty onnistuneesti");
  setTimeout(() => {
    setMessage(null);
  }, 5000);
  navigate('/');
};
// edit gig
const editGig = (e, id, updatedFields) => {
  e.preventDefault();
  const updatedGig = { ...updatedFields };

  return gigsServices.updateGig(id, updatedGig)
    .then((response) => {
      setGigs(gigs.map(gig =>
        gig.id === id ? { ...gig, ...updatedGig } : gig
      ));
      return response; 
    })
    .catch((error) => {
      console.error("Error updating gig: ", error.response?.data || error.message);
      throw error;
    });
};

  // delete gig
  const deleteGig = (id) => {
    gigsServices.remove(id, token)
    .then(() => {
        setGigs(gigs.filter(gig => gig.id !== id))
        setMessage("Keikka on poistettu onnistuneesti.");
        navigate("/#gigs", { replace: true });
        setTimeout(() => {
          setMessage("");
      }, 5000);
    })
    .catch(error => console.error("Error deleting gig: ", error.response?.data || error.message));
  }
  // update gig's rate
  const updateGigRate = (gigId, newRate) => {
    setGigs(prevGigs =>
        prevGigs.map(gig =>
            gig.id === gigId ? { ...gig, rate: newRate } : gig
        )
    );
};

  return (
      <div className='main-container'>
            <Routes>
              <Route path="/" 
                element={<Home 
                          gigs={gigs} 
                          setGigs={setGigs} 
                          editGig={editGig} 
                          deleteGig={deleteGig} 
                          updateGigRate={updateGigRate}
                          user={user} 
                          token={token}
                          logout={logout}
                          message={message}
                          onClose={() => {
                            setMessage('');
                            setErrorMessage('');
                          } }
                        />} />
              
                <Route path="uusi-keikka" element={
                  <ProtectedRoute token={token}>
                    <Uusi_keikka addGig={addGig} newGig={newGig} setNewGig={setNewGig} message={message} setMessage={setMessage} token={token} logout={logout} />
                  </ProtectedRoute>
                }/>
              <Route path="login" element={<Login loginHandler={loginHandler} message={message} setMessage={setMessage} setToken={setToken}/>} />
              <Route path="register" element={<Register registerHandler={registerHandler} message={message} setMessage={setMessage} />} />
              <Route 
                path="/gigs/:id" 
                element={<GigDetails 
                          gigs={gigs} 
                          user={user} 
                          token={token}
                          logout={logout} 
                          editGig={editGig} 
                          deleteGig={deleteGig} 
                          showModal={showModal}
                          setShowModal={setShowModal}
                          updateGigRate={updateGigRate}
                          message={message}
                          setMessage={setMessage}
                          onClose={() => {
                            setMessage('');
                            setErrorMessage('');
                          }}
                        />} 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
      </div>
  )
}
export default App;