import "../styles/Register.css";
import { Link } from "react-router-dom"; 

function Register() {
    return (
        <div className="register_body">
            <div className="register_div">
                <h2 className="register_h">Let's Get Started</h2>
                <p  className="register_p">Add Your Personal Details to Continue</p>

                <p className="register_input_p">Name:</p>
                <div className="register_ns">
                    <input type="text" className="register_input" placeholder="First Name"/>
                    <input type="text" className="register_input" placeholder="Last Name"/>
                </div>

                <p className="register_input_p">Address:</p>
                <input type="text" className="register_input" placeholder="Address"/>

                <p className="register_input_p">Number</p>
                <input type="text" className="register_input" placeholder="Telephone Number"/>

                <p className="register_input_p">Date of Birth:</p>
                <input type="date" className="register_input"/>

                <div className="register_button_div">
                    <button type="reset" className="register_button">Reset</button>
                    <button type="submit" className="register_button">Next</button>
                </div>

                <p className="register_p">Already have account? <Link to={"/login"}className="register_link">Login</Link></p>
            </div>
        </div>
    );
}

export default Register;
