import { LiaUserCircleSolid } from "react-icons/lia";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineMedicalServices } from "react-icons/md";
import { LuAlarmClock } from "react-icons/lu";
import { BiCalendar } from "react-icons/bi";
import { FaWheelchairMove } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

import { useLocation, Link } from 'react-router-dom';
import "../../styles/OrtakSayfa/AdminOrtakSayfa.css"
import { useEffect, useRef, useState } from "react";

function AdminOrtakSayfa({children}) {

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
                sessionStorage.setItem("profileImageA",imageData);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        const storedImage = sessionStorage.getItem("profileImageA");
        if (storedImage) {
            setImageSrc(storedImage);
        }

        const storedEmail = localStorage.getItem("userEmailAdmin");
        if (storedEmail) {
            setEmail(storedEmail);
        }

        const storedName = localStorage.getItem("userNameAdmin");
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
                                    <button onClick={handleClick} className="dashboard_admin_button"  ><LiaUserCircleSolid size={50}/></button>
                                    <input onChange={handleFileChange} accept="image/*" ref={fileInputRef} type="file" style={{ display: "none" }}></input>
                                </div>
                            )}
                    </div>
                    
                    <h4 className="dashboard_left_h">{name}</h4>
                    <p className="dashboard_left_p">{email}</p>
                    <Link to={"/"} className="dashboard_left_button">Log out</Link>
                </div>
                <div className="dashboard_left_down">
                    <Link to={"/admin-dashboard"} className={location.pathname === "/admin-dashboard" ? "dashboard_left_links active_link": "dashboard_left_links"}><LuLayoutDashboard /> Dashboard</Link>
                    <Link to={"/admin_doctors"} className={location.pathname === "/admin_doctors" ? "dashboard_left_links active_link": "dashboard_left_links"} ><MdOutlineMedicalServices /> Doctors</Link>
                    <Link to={"/admin_schedule"} className={location.pathname === "/admin_schedule" ? "dashboard_left_links active_link": "dashboard_left_links" } ><LuAlarmClock /> Schedule</Link>
                    <Link to={"/admin_appointment"} className={location.pathname === "/admin_appointment" ? "dashboard_left_links active_link": "dashboard_left_links" } ><BiCalendar /> Appointment</Link>
                    <Link to={"/admin_patients"} className={location.pathname === "/admin_patients" ? "dashboard_left_links active_link": "dashboard_left_links" } ><FaWheelchairMove /> Patients</Link>
                    <Link to={"/admin_profiles"} className={location.pathname === "/admin_profiles" ? "dashboard_left_links active_link": "dashboard_left_links" } ><FaUserCircle/> Profiles</Link>
                </div>
            </aside>

            <main className="dashboard_right">
                <div className="dashboard_right_header">
                    <input type="text" placeholder="Search Doctor name or Email" className="dashboard_input"/>
                    <Link to={"/admin-dashboard"} dashboard_right_inbutton className="dashboard_header_link">Search</Link>
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

export default AdminOrtakSayfa;