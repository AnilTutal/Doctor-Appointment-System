import { LiaUserCircleSolid } from "react-icons/lia";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineMedicalServices } from "react-icons/md";
import { LuAlarmClock } from "react-icons/lu";
import { BiCalendar } from "react-icons/bi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";


import { useLocation, Link } from 'react-router-dom';
import "../../styles/OrtakSayfa/DoctorOrtakSayfa.css";

import React, {useEffect, useState, useRef} from "react";

function DoctorOrtakSayfa({children}) {

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
                sessionStorage.setItem("profileImageD",imageData); // sessionStorage olursa açık kapattığında gidecek. local'da her zaman kalıyor.
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        const storedImage = sessionStorage.getItem("profileImageD");
        if (storedImage) {
            setImageSrc(storedImage);
        }

        const storedEmail = localStorage.getItem("userEmailDoctor");
        if (storedEmail) {
            setEmail(storedEmail);
        }

        const storedName = localStorage.getItem("userNameDoctor");
        if (storedName) {
            setName(storedName);
        }
    }, []);

    return (
        <div className="o3_body">
            <aside className="o3_left">
                <div className="o3_left_up">
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
                    <h4 className="o3_left_h">{name}</h4>
                    <p className="o3_left_p">{email}</p>
                    <Link to={"/"} className="o3_left_button">Log out</Link>
                </div>
                <div className="o3_left_down">
                    <Link to={"/doctor_dashboard"} className={location.pathname === "/doctor_dashboard" ? "dashboard_left_links active_link": "dashboard_left_links"}><LuLayoutDashboard /> Dashboard</Link>
                    <Link to={"/doctors_my_appointments"} className={location.pathname === "/doctors_my_appointments" ? "dashboard_left_links active_link": "dashboard_left_links"} ><MdOutlineMedicalServices /> My Appointments</Link>
                    <Link to={"/doctors_my_sessions"} className={location.pathname === "/doctors_my_sessions" ? "dashboard_left_links active_link": "dashboard_left_links" } ><LuAlarmClock /> My Sessions</Link>
                    <Link to={"/doctors_my_patients"} className={location.pathname === "/doctors_my_patients" ? "dashboard_left_links active_link": "dashboard_left_links" } ><BiCalendar /> My Patients</Link>
                    <Link to={"/doctor_profile"} className={location.pathname === "/doctor_profile" ? "dashboard_left_links active_link": "dashboard_left_links" } ><FaUserCircle/> Profile</Link>
                </div>
            </aside>

            <main className="o3_right">
                <div className="o3_right_header">
                    <input type="text" placeholder="Search Doctor name or Email" className="o3_input"/>
                    <Link to={"/doctor_dashboard"} dashboard_right_inbutton className="o3_header_link">Search</Link>
                    <div className="o3_date">
                        <div className="o3_date_div1">
                            <p className="o3_right_datep">Today's Date</p>
                            <h3 className="o3_right_dateh">{date.toLocaleDateString()} </h3>
                        </div>
                        <div className="o3_date_div2">
                            <div className="o3_date_link"><FaRegCalendarAlt size={25}/></div>
                        </div>
                    </div>
                </div>
            
                <div className="o3_right_content">
                   {children}
                </div>
            </main>
        </div>
    );
}

export default DoctorOrtakSayfa;