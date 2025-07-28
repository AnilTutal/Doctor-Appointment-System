import DoctorOrtakSayfa from "../OrtakSayfajs/DoctorOrtakSayfa.js";
import "../../styles/Doctorcss/DoctorDashboard.css";
import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { MdOutlineMedicalServices, MdOutlineMonitorHeart } from "react-icons/md";
import { FaWheelchairMove } from "react-icons/fa6";
import { BiCalendar } from "react-icons/bi";


function DoctorDashboard({children}) {
    const [bookings, setBookings] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);

    const status = [
        { id : 1, name: "All Doctors", icon: <MdOutlineMedicalServices size={25} />, number: doctors.length},
        { id : 2, name: "All Patients", icon: <FaWheelchairMove size={25}/>, number: patients.length},
        { id : 3, name: "All Appointment", icon: <BiCalendar size={25} />, number: bookings.length},
        { id : 4, name: "All Schedule", icon: <MdOutlineMonitorHeart size={25} />, number: schedules.length}
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

    return(
        <DoctorOrtakSayfa>
            <div className="dhome_body">
                <div className="dhome_up_div">
                    <h4 className="dhome_up_h">Welcome</h4>
                    <h2>Test Doctor</h2>
                    <p>Thanks for joining with us. We are always trying to get you a complete service<br/>You can view your daily schedule, Reach Patients Appointment at home!</p>
                </div>
                
                <div className="dhome_down_div">
                    <div className="dhome_status_wrapper">
                        <h4 className="dhome_status_title">Status</h4>
                        <div className="dhome_status_div">
                            {status.map((statu) => (
                                <div key={statu.id} className="dhome_status_block">
                                    <div className="dhome_status_block_iconwrite">
                                        <p className="dhome_status_block_pnum">{statu.number}</p>
                                        <p className="dhome_status_block_pname">{statu.name}</p>
                                    </div>
                                    <div className="dhome_status_block_icondiv">
                                        <div className="dhome_status_block_icon">
                                            {statu.icon}
                                        </div>
                                    </div>                            
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="dpp_table_div">
                        <h3 style={{paddingBottom: "10px"}}>Your Up Coming Sessions</h3>
                        <table className="dpp_doctor_table">
                            <thead className="dpp_table_headers">
                                <tr>
                                    <th>Patient Name</th>
                                    <th>Doctor</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((b) => (
                                    b.doctor_name === "Cengiz" && (
                                        <tr key={b.id}>
                                        <td>{b.patient_name}</td>
                                        <td>{b.doctor_name}</td>
                                        <td>{b.date}</td>
                                        <td>{b.start_time} - {b.end_time}</td>
                                        </tr>
                                    )
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DoctorOrtakSayfa>

    );
}

export default DoctorDashboard;