import DoctorOrtakSayfa from "../OrtakSayfajs/DoctorOrtakSayfa.js";
import React, {useState, useEffect} from "react";
import "../../styles/Doctorcss/DoctorsMyPatients.css";

function DoctorMyPatients() {
    const [patients, setPatients] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [usename, setUseName] = useState("");
    
    useEffect(() => {
        fetchPatients();
        fetchBookings();

        const storedName = localStorage.getItem("userNameDoctor");
        if (storedName) {
            setUseName(storedName);
        }
    }, []);

    const fetchBookings = () => {
    fetch("http://localhost/doctor_app/bookings.php")
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((err) => console.error("Error fetching bookings:", err));
    };

    const fetchPatients = () => {
        fetch("http://localhost/doctor_app/patients.php")
        .then((res) => res.json())
        .then((data) => setPatients(data))
        .catch((err) => console.error("Error fetching patients:", err));
    };

    return(
        <DoctorOrtakSayfa>
            <div className="dp_table_div">
                <h3>All Patients ({patients.length})</h3>
                <table className="dp_doctor_table">
                    <thead className="dp_table_headers">
                        <tr>
                            <th>Patient Name</th>
                            <th>E-mail</th>
                            <th>Doctor</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(dpat => (
                            usename === dpat.doctor_name && (
                                <tr key={dpat.id}>
                                    <td>{dpat.patient_name}</td>
                                    <td>{dpat.patient_email}</td>
                                    <td>{dpat.doctor_name}</td>
                                    <td>{dpat.status}</td>
                                    <td className="dp_event_buttons_td"> 
                                        <button onClick={() => handleRemoveSchedule(dpat.id)} className="dp_event_buttons">Remove</button>
                                    </td>
                                </tr>
                            )
                        ))}
                    </tbody>
                </table>
            </div>

        </DoctorOrtakSayfa>
    );
}

export default DoctorMyPatients;    