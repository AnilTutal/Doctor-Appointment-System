import "../styles/Register.css";
import React, { useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom"; 

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        number: "",
        address: "",
        date_of_birth: "",
        password: "",
        role: ""
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("http://localhost/doctor_app/register.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                navigate(formData.role === "doctor" ? "/doctor_dashboard" : "/patient_dashboard");
                handleReset(); 
            } else {
                alert("Hata: " + data.error);
            }
        })
        .catch(err => console.error("Kayıt hatası:", err));
    };

    const handleReset = () => {
        setFormData({
            name: "",
            email: "",
            number: "",
            address: "",
            date_of_birth: "",
            password: "",
            role: ""
        });
    };

    return (
        <div className="register_body">
            <div className="register_div">
                <h2 className="register_h">Let's Get Started</h2>
                <p  className="register_p">Add Your Personal Details to Continue</p>
                <form onSubmit={handleSubmit} className="register_div">
                    <div className="register_input_napa">
                        <p className="register_input_p">Name:</p>
                        <p className="register_input_p">Password:</p>
                    </div>
                    <div className="register_ns">
                        <input type="text" className="register_input" placeholder="Name" name="name" value={formData.name} onChange={handleChange}/>
                        <input type="text" className="register_input" placeholder="Password" name="password" value={formData.password} onChange={handleChange}/>
                    </div>

                    <p className="register_input_p">Email:</p>
                    <input type="email" className="register_input" placeholder="Email" name="email" value={formData.email} onChange={handleChange}/>

                    <p className="register_input_p">Address:</p>
                    <input type="text" className="register_input" placeholder="Address" name="address" value={formData.address} onChange={handleChange}/>

                    <p className="register_input_p">Number</p>
                    <input type="text" className="register_input" placeholder="Telephone Number" name="number" value={formData.number} onChange={handleChange}/>

                    <div className="register_downdiv">
                        <p className="register_input_p">Date of Birth:</p>
                        <p className="register_input_p">Role</p>
                    </div>
                    <div className="register_downdiv2">
                        <input type="date" className="register_input" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange}/>
                        <input type="text" className="register_input" placeholder="doctor/patient" name="role" value={formData.role} onChange={handleChange}/>
                    </div>
                    
                    <div className="register_button_div">
                        <button type="button" onClick={handleReset}  className="register_button">Reset</button>
                        <button type="submit" className="register_button">Next</button>
                    </div>

                    <p className="register_p">Already have account? <Link to={"/login"}className="register_link">Login</Link></p>
                </form>
            </div>
        </div>
    );
}

export default Register;
