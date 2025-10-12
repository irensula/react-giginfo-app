// validation is in the utils/validateUser.js
import { useState } from "react";
import { Link } from "react-router-dom";

import InnerHeader from "../components/InnerHeader";
import MessageBox from "../components/MessageBox";

const Register = ({ registerHandler, message, setMessage }) => {
    const [formValues, setFormValues] = useState({
        username: '',
        email: '',
        phone: '',
        password: ''
    });
    
    const handleInputChange = (e) =>{
        const {name, value} = e.target;
        setFormValues({...formValues,[name]:value}); 
    }
    const handleSubmit=(e)=> {
        e.preventDefault();
        registerHandler(formValues);
    }
    return (
        <div>
            <InnerHeader />
            <div className="inner-container">
            <MessageBox 
                message={message} 
                onClose={() => {
                    setMessage('');
                } }
            />
                <div className="form-wrap">
                    <h2 className="inner-title">Rekisteröidy</h2> 
                    
                    <form onSubmit={handleSubmit}>
                        <label>Username</label>
                        <input 
                            type="text"
                            placeholder="Kirjoita käyttäjännimi"
                            name="username" 
                            value={formValues.username}
                            onChange={handleInputChange}
                        />
                        <label>Email</label>
                        <input 
                            type="email"
                            placeholder="Kirjoita sähköposti" 
                            name="email"
                            value={formValues.email}
                            onChange={handleInputChange}
                        />
                        <label>Puhelinnumero</label>
                        <input 
                            type="tel"
                            placeholder="Kirjoita puhelinnumero" 
                            name="phone"
                            value={formValues.phone}
                            onChange={handleInputChange}
                        />
                        <label>Salasana</label>
                        <input 
                            type="password"
                            placeholder="Kirjoita salasana" 
                            name="password"
                            value={formValues.password}
                            onChange={handleInputChange}
                        />
                        <input className="button button-submit" type="submit" value={"Lähetä"} />
                    </form>
            </div>
            <p className="reference">Onko sinulla tili? <Link to="login">Kirjaudu</Link></p>
            </div>
        </div>
    )
} 
export default Register;