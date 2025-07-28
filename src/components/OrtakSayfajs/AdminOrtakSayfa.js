import { LiaUserCircleSolid } from "react-icons/lia";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineMedicalServices } from "react-icons/md";
import { LuAlarmClock } from "react-icons/lu";
import { BiCalendar } from "react-icons/bi";
import { FaWheelchairMove } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";


import { useLocation, Link } from 'react-router-dom';
import "../../styles/OrtakSayfa/AdminOrtakSayfa.css"

function AdminOrtakSayfa({children}) {

    const location = useLocation();

    return (
        <div className="dashboard_body">
            <aside className="dashboard_left">
                <div className="dashboard_left_up">
                    <button className="dashboard_admin_button">
                        <LiaUserCircleSolid size={50} />
                    </button>
                    <h4 className="dashboard_left_h">Administrator</h4>
                    <p className="dashboard_left_p">xxxxx@edoc.com</p>
                    <Link to={"/"} className="dashboard_left_button">Log out</Link>
                </div>
                <div className="dashboard_left_down">
                    <Link to={"/admin-dashboard"} className={location.pathname === "/admin-dashboard" ? "dashboard_left_links active_link": "dashboard_left_links"}><LuLayoutDashboard /> Dashboard</Link>
                    <Link to={"/admin_doctors"} className={location.pathname === "/admin_doctors" ? "dashboard_left_links active_link": "dashboard_left_links"} ><MdOutlineMedicalServices /> Doctors</Link>
                    <Link to={"/admin_schedule"} className={location.pathname === "/admin_schedule" ? "dashboard_left_links active_link": "dashboard_left_links" } ><LuAlarmClock /> Schedule</Link>
                    <Link to={"/admin_appointment"} className={location.pathname === "/admin_appointment" ? "dashboard_left_links active_link": "dashboard_left_links" } ><BiCalendar /> Appointment</Link>
                    <Link to={"/admin_patients"} className={location.pathname === "/admin_patients" ? "dashboard_left_links active_link": "dashboard_left_links" } ><FaWheelchairMove /> Patients</Link>
                </div>
            </aside>

            <main className="dashboard_right">
                <div className="dashboard_right_header">
                    <input type="text" placeholder="Search Doctor name or Email" className="dashboard_input"/>
                    <Link to={"/admin_dashboard"} dashboard_right_inbutton className="dashboard_header_link">Search</Link>
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

export default AdminOrtakSayfa;