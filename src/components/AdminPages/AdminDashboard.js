import { MdOutlineMedicalServices } from "react-icons/md";
import { BiCalendar } from "react-icons/bi";
import { FaWheelchairMove } from "react-icons/fa6";
import { MdOutlineMonitorHeart } from "react-icons/md";

import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import "../../styles/Admincss/AdminDashboard.css";
import AdminOrtakSayfa from "../OrtakSayfajs/AdminOrtakSayfa";

function AdminDashboard({children}) {
    const [bookings, setBookings] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);

    const status = [
        { id : 1, name: "Doctors", icon: <MdOutlineMedicalServices size={25} />, number: doctors.length, link: "/admin_doctors"},
        { id : 2, name: "Patients", icon: <FaWheelchairMove size={25}/>, number: patients.length, link: "/admin_patients"},
        { id : 3, name: "Appointment", icon: <BiCalendar size={25} />, number: bookings.length, link: "/admin_appointment"},
        { id : 4, name: "Schedule", icon: <MdOutlineMonitorHeart size={25} />, number: schedules.length, link: "/admin_schedule"}
    ];

    useEffect(() => {
        fetchBookings();
        fetchSchedules();
        fetchDoctors();
        fetchPatients();
    }, []);

    const fetchBookings = () => {
        fetch("http://localhost/doctor_app/bookings.php")
        .then((res) => res.json())
        .then((data) => setBookings(data))
        .catch((err) => console.error("Error fetching bookings:", err));
    };

    const fetchSchedules = () => {
        fetch("http://localhost/doctor_app/schedules.php")
        .then((res) => res.json())
        .then((data) => {
            console.log("Schedules fetched:", data);
            setSchedules(data);
        })
        .catch((err) => console.error("Error fetching schedules:", err));
    };

    const fetchPatients = () => {
        fetch("http://localhost/doctor_app/patients.php")
        .then((res) => res.json())
        .then((data) => setPatients(data))
        .catch((err) => console.error("Error fetching patients:", err));
    };

    const fetchDoctors = () => {
        fetch("http://localhost/doctor_app/doctors.php")
        .then(res => res.json())
        .then(data => setDoctors(data))
        .catch(err => console.error("Error:", err));
    };

    return (
        <AdminOrtakSayfa>
            <h2 className="dashboard_right_status_h">Status</h2>

            <div className="dashboard_right_status">
                
                {status.map((statu) => (
                    <div key={statu.id} className="status_block">
                        <div className="status_block_iconwrite">
                            <p className="status_block_pnum">{statu.number}</p>
                            <p className="status_block_pname">{statu.name}</p>
                        </div>
                        <div className="status_block_icondiv">
                            <Link to={statu.link} className="status_block_icon">{statu.icon}</Link>
                        </div>                            
                    </div>
                ))}      
            </div>

                <div className="dashboard_right_other">
                    <div className="dashboard_right_other_l">
                        <h3 className="dashboard_right_other_h">Upcoming Appointments until Next Friday</h3>
                        <p className="dashboard_right_other_p">Here's Quick access to Upcoming Appointments until 7 days More details available in @Appointment section.</p>
                        <div className="dashboard_table_div">
                            <table className="dashboard_doctor_table">
                                <thead className="dashboard_table_headers">
                                    <tr>
                                        <th>Patient Name</th>
                                        <th>Doctor</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.map((b) => (
                                        <tr key={b.id}>
                                            <td>{b.patient_name}</td>
                                            <td>{b.doctor_name}</td>
                                            <td>{b.date}</td>
                                            <td>{b.start_time} - {b.end_time}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="dashboard_right_other_r">
                        <h3 className="dashboard_right_other_h">Upcoming Sessions until Next Friday</h3>
                        <p className="dashboard_right_other_p">Here's Quick access to Upcoming Sessions that Scheduled until 7 days Add, Remove and Many features available in @Schedule section.</p>
                        <div className="dashboard_table_div">
                            <table className="dashboard_doctor_table">
                                <thead className="dashboard_table_headers">
                                    <tr>
                                        <th>Doctor</th>
                                        <th>Date</th>
                                        <th>Start Time</th>
                                        <th>End Time</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {schedules.map(sch => (
                                        <tr key={sch.id}>
                                            <td>{sch.doctor_name}</td>
                                            <td>{sch.date}</td>
                                            <td>{sch.start_time}</td>
                                            <td>{sch.end_time}</td>
                                            <td>{sch.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
        </AdminOrtakSayfa>
    );
}

export default AdminDashboard;