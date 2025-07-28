import { LiaUserCircleSolid } from "react-icons/lia";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineMedicalServices } from "react-icons/md";
import { LuAlarmClock } from "react-icons/lu";
import { BiCalendar } from "react-icons/bi";
import { FaRegCalendarAlt } from "react-icons/fa";


import { useLocation, Link } from 'react-router-dom';
import "../../styles/OrtakSayfa/PatientOrtakSayfa.css"

function PatientOrtakSayfa({children}) {

    const location = useLocation();

    return (
        <div className="dashboard_body">
        
            <aside className="dashboard_left">
                <div className="dashboard_left_up">
                    <button className="dashboard_admin_button">
                        <LiaUserCircleSolid size={50} />
                    </button>
                    <h4 className="dashboard_left_h">Test Patient</h4>
                    <p className="dashboard_left_p">xxxxx@edoc.com</p>
                    <Link to={"/"} className="dashboard_left_button">Log out</Link>
                </div>
                <div className="dashboard_left_down">
                    <Link to={"/patient_dashboard"} className={location.pathname === "/patient_dashboard" ? "dashboard_left_links active_link": "dashboard_left_links"}><LuLayoutDashboard /> Home</Link>
                    <Link to={"/patient_all_doctors"} className={location.pathname === "/patient_all_doctors" ? "dashboard_left_links active_link": "dashboard_left_links"} ><MdOutlineMedicalServices /> All Doctors</Link>
                    <Link to={"/patient_schedule"} className={location.pathname === "/patient_schedule" ? "dashboard_left_links active_link": "dashboard_left_links" } ><LuAlarmClock /> Schedule</Link>
                    <Link to={"/patient_my_bookings"} className={location.pathname === "/patient_my_bookings" ? "dashboard_left_links active_link": "dashboard_left_links" } ><BiCalendar /> My Bookings</Link>
                </div>
            </aside>

            <main className="dashboard_right">
                <div className="dashboard_right_header">
                    <input type="text" placeholder="Search Doctor name or Email" className="dashboard_input"/>
                    <Link to={"/patient_dashboard"} dashboard_right_inbutton className="dashboard_header_link">Search</Link>
                    <div className="date">
                        <div className="date_div1">
                            <p className="dashboard_right_datep">Today's Date</p>
                            <h3 className="dashboard_right_dateh">21.07.2025 </h3>
                        </div>
                        <div className="date_div2">
                            <Link className="date_link" to={"/"}><FaRegCalendarAlt size={25}/></Link>
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