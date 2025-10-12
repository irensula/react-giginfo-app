import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const InnerHeader = ({ token, logout }) => {
    return (
        <div className="inner-header">
            <Link to="/"><h2 className="logo">KEIKKAINFO</h2></Link>
            <Navbar token={token} logout={logout} />
        </div>
    )
}
export default InnerHeader;