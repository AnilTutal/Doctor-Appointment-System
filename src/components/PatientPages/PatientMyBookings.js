import PatientOrtakSayfa from "../OrtakSayfajs/PatientOrtakSayfa";
import "../../styles/Patientcss/PatientMyBookings.css";
import React, {useState, useEffect} from "react";

function PatientMyBookings() {
    const [bookings, setBookings] = useState([]);
    const [usename, setUseName] = useState("");
    

    useEffect(() => {
        fetchBookings();

        const storedName = localStorage.getItem("userNamePatient");
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

    return(
        <PatientOrtakSayfa>
            <div className="pb_table_div">
                    <h3 style={{paddingBottom: "10px"}}>Your Up Coming Bookings</h3>
                    <table className="pb_doctor_table">
                        <thead className="pb_table_headers">
                            <tr>
                                <th>Patient Name</th>
                                <th>Doctor</th>
                                <th>Date</th>
                                <th>Time</th>
                            </tr>
                        </thead>    
                        <tbody>
                            {bookings.map((b) => (
                                usename === b.patient_name && (
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
        </PatientOrtakSayfa>
    );
}

export default PatientMyBookings;