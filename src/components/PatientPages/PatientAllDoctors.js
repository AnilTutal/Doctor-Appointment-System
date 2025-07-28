import PatientOrtakSayfa from "../OrtakSayfajs/PatientOrtakSayfa";
import React, { useEffect, useState} from "react";
import "../../styles/Patientcss/PatientAllDoctors.css";

function PatientAllDoctors() {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = () => {
        fetch("http://localhost/doctor_app/doctors.php")
        .then(res => res.json())
        .then(data => setDoctors(data))
        .catch(err => console.error("Error:", err));
    };

    return(
        <PatientOrtakSayfa>
            <div className="pd_table_div">
                <h3>All Doctors ({doctors.length})</h3>
                <table className="pd_doctor_table">
                    <thead className="pd_table_headers">
                        <tr>
                            <th>Doctor Name</th>
                            <th>Email</th>
                            <th>Specialties</th>
                        </tr>
                    </thead>
                    <tbody>
                    {doctors.map((doc) => (
                        <tr key={doc.id}>
                            <td>{doc.name}</td>
                            <td>{doc.email}</td>
                            <td>{doc.specialties}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>   
        </PatientOrtakSayfa>
    );
}

export default PatientAllDoctors;