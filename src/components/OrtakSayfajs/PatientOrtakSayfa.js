import { LiaUserCircleSolid } from "react-icons/lia";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineMedicalServices } from "react-icons/md";
import { LuAlarmClock } from "react-icons/lu";
import { BiCalendar } from "react-icons/bi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

import { useLocation, Link } from 'react-router-dom';
import "../../styles/OrtakSayfa/PatientOrtakSayfa.css"
import React, {useEffect, useState, useRef} from "react";

function PatientOrtakSayfa({children}) {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const location = useLocation();
    const [date] = useState(new Date());
    const [imageSrc, setImageSrc] = useState(null);
    const fileInputRef = useRef(null);
    
    const handleClick = () => {
        fileInputRef.current.click();
    };
    
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const imageData = reader.result;
                setImageSrc(imageData);
                sessionStorage.setItem("profileImageP",imageData);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        const storedImage = sessionStorage.getItem("profileImageP");
        if (storedImage) {
            setImageSrc(storedImage);
        }

        const storedEmail = localStorage.getItem("userEmailPatient");
        if (storedEmail) {
            setEmail(storedEmail);
        }

        const storedName = localStorage.getItem("userNamePatient");
        if (storedName) {
            setName(storedName);
        }
    }, []);

    return (
        <div className="dashboard_body">
            <aside className="dashboard_left">
                <div className="dashboard_left_up">
                    <div>
                        {imageSrc ? (
                            <img  src={imageSrc} alt="Seçilen" style={{ width: "200px", height: "200px", objectFit: "contain" }} />
                            ) : (
                                <div>
                                    <button onClick={handleClick} className="o3_admin_button"  ><LiaUserCircleSolid size={50}/></button>
                                    <input onChange={handleFileChange} accept="image/*" ref={fileInputRef} type="file" style={{ display: "none" }}></input>
                                </div>
                            )}
                    </div>
                    <h4 className="dashboard_left_h">{name}</h4>
                    <p className="dashboard_left_p">{email}</p>
                    <Link to={"/"} className="dashboard_left_button">Log out</Link>
                </div>
                <div className="dashboard_left_down">
                    <Link to={"/patient_dashboard"} className={location.pathname === "/patient_dashboard" ? "dashboard_left_links active_link": "dashboard_left_links"}><LuLayoutDashboard /> Dashboard</Link>
                    <Link to={"/patient_all_doctors"} className={location.pathname === "/patient_all_doctors" ? "dashboard_left_links active_link": "dashboard_left_links"} ><MdOutlineMedicalServices /> All Doctors</Link>
                    <Link to={"/patient_schedule"} className={location.pathname === "/patient_schedule" ? "dashboard_left_links active_link": "dashboard_left_links" } ><LuAlarmClock /> Schedule</Link>
                    <Link to={"/patient_my_bookings"} className={location.pathname === "/patient_my_bookings" ? "dashboard_left_links active_link": "dashboard_left_links" } ><BiCalendar /> My Bookings</Link>
                    <Link to={"/patient_profile"} className={location.pathname === "/patient_profile" ? "dashboard_left_links active_link": "dashboard_left_links" } ><FaUserCircle/> Profile</Link>
                </div>
            </aside>

            <main className="dashboard_right">
                <div className="dashboard_right_header">
                    <input type="text" placeholder="Search Doctor name or Email" className="dashboard_input"/>
                    <Link to={"/patient_dashboard"} dashboard_right_inbutton className="dashboard_header_link">Search</Link>
                    <div className="date">
                        <div className="date_div1">
                            <p className="dashboard_right_datep">Today's Date</p>
                            <h3 className="dashboard_right_dateh">{date.toLocaleDateString()} </h3>
                        </div>
                        <div className="date_div2">
                            <div className="date_link"><FaRegCalendarAlt size={25}/></div>
                        </div>
                    </div>
                </div>
            
                <div className="dashboard_right_content">
                   {children}
                </div>
            </main>
        </div>
    );
}

export default PatientOrtakSayfa;