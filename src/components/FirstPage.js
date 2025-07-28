import "../styles/FirstPage.css";
import { Link } from "react-router-dom";

function FirstPage() {
    return (
        <div className="main_div">
            <div className="header_div">
                <h3 className="header_h">eDoc.</h3>
                <nav>
                    <Link to="/doctor_dashboard" className="header_a">Doctor</Link>
                    <Link to="/patient_dashboard" className="header_a">Patient</Link>
                    <Link to="/admin-dashboard" className="header_a">Admin</Link>

                    <Link to="/login" className="header_a">LOGIN</Link>
                    <Link to="/register" className="header_a">REGISTER</Link>
                </nav> 
            </div>
            <div className="page_div">
                <h1 className="page_h">Avoid Hassles & Delays.</h1>
                <p className="page_p">How is health today, Sounds like not good! <br/>Don't wory. Find your doctor online Book as you wish with eDoc.<br/>We offer you a free doctor channeling service, Make your appointment now.</p>
                <Link to="/login" className="page_a">Make Appointment</Link>
            </div>
        </div>
    );
}

export default FirstPage;