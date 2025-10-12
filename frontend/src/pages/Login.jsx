import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InnerHeader from "../components/InnerHeader";
import MessageBox from "../components/MessageBox";

const Login = ({loginHandler, setToken, message, setMessage}) => {
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!username) {
            setMessage("Käyttäjätunnus vaaditaan.");
            return;
        }
        if (!password) {
            setMessage("Salasana vaaditaan.");
            return;
        }
    
        const response = await loginHandler({ username, password }, setToken, setMessage);
    
        if (response.error) {
            setMessage("Virheellinen käyttäjätunnus tai salasana.");  
        } else {
            setMessage("Kirjautuminen onnistui!");
        }        
    
        setTimeout(() => {
            setMessage("");
        }, 5000);
    };
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
                    <h2 className="inner-title">Kirjaudu</h2>
                    <form 
                        action="" 
                        // onSubmit={e=>loginHandler(e, {"username":username, "password":password})}
                        onSubmit={handleSubmit}
                        className="login-form"
                    >
                        <label htmlFor="username">Käyttäjätunnus</label>
                        <input 
                            type="text" 
                            id="username" 
                            value={username} 
                            onChange={e=>setUsername(e.target.value)} 
                            className="note-input"
                        />
                        <label htmlFor="password">Salasana</label>
                        <input 
                            type="password" 
                            id="password" 
                            value={password} 
                            onChange={e=>setPassword(e.target.value)} 
                            className="note-input"
                        />
                        <input className="button button-submit" type="submit" value="Kirjaudu" />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;