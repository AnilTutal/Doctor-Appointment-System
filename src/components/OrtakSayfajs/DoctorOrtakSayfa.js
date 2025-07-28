import { LiaUserCircleSolid } from "react-icons/lia";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineMedicalServices } from "react-icons/md";
import { LuAlarmClock } from "react-icons/lu";
import { BiCalendar } from "react-icons/bi";
import { FaRegCalendarAlt } from "react-icons/fa";

import { useLocation, Link } from 'react-router-dom';
import "../../styles/OrtakSayfa/DoctorOrtakSayfa.css";

function DoctorOrtakSayfa({children}) {

    const location = useLocation();

    return (
        <div className="o3_body">
            <aside className="o3_left">
                <div className="o3_left_up">
                    <button className="o3_admin_button">
                        <LiaUserCircleSolid size={50} />
                    </button>
                    <h4 className="o3_left_h">Test Doctor</h4>
                    <p className="o3_left_p">xxxxx@edoc.com</p>
                    <Link to={"/"} className="o3_left_button">Log out</Link>
                </div>
                <div className="o3_left_down">
                    <Link to={"/doctor_dashboard"} className={location.pathname === "/doctor_dashboard" ? "dashboard_left_links active_link": "dashboard_left_links"}><LuLayoutDashboard /> Dashboard</Link>
                    <Link to={"/doctors_my_appointments"} className={location.pathname === "/doctors_my_appointments" ? "dashboard_left_links active_link": "dashboard_left_links"} ><MdOutlineMedicalServices /> My Appointments</Link>
                    <Link to={"/doctors_my_sessions"} className={location.pathname === "/doctors_my_sessions" ? "dashboard_left_links active_link": "dashboard_left_links" } ><LuAlarmClock /> My Sessions</Link>
                    <Link to={"/doctors_my_patients"} className={location.pathname === "/doctors_my_patients" ? "dashboard_left_links active_link": "dashboard_left_links" } ><BiCalendar /> My Patients</Link>
                </div>
            </aside>

            <main className="o3_right">
                <div className="o3_right_header">
                    <input type="text" placeholder="Search Doctor name or Email" className="o3_input"/>
                    <Link to={"/patient_dashboard"} dashboard_right_inbutton className="o3_header_link">Search</Link>
                    <div className="o3_date">
                        <div className="o3_date_div1">
                            <p className="o3_right_datep">Today's Date</p>
                            <h3 className="o3_right_dateh">21.07.2025 </h3>
                        </div>
                        <div className="o3_date_div2">
                            <Link className="o3_date_link" to={"/"}><FaRegCalendarAlt size={25}/></Link>
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