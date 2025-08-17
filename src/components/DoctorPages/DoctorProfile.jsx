import DoctorOrtakSayfa from "../OrtakSayfajs/DoctorOrtakSayfa";
import "../../styles/Doctorcss/DoctorProfile.css";

import React, {useState, useEffect} from "react";

function DoctorProfile(){
    const [users, setUsers] = useState([]);
    const [usename, setUseName] = useState("");
  
  useEffect(() => {
    fetchUsers();

    const storedName = localStorage.getItem("userNameDoctor");
        if (storedName) {
            setUseName(storedName);
        }
    }, []);

  const fetchUsers = () => {
    fetch("http://localhost/doctor_app/users.php")
    .then((res) => res.json())
    .then((data) => setUsers(data))
    .catch((err) => console.error("Error fetching users:", err));
  };
  
    return(
        <DoctorOrtakSayfa>
            <div className="docp_table_div">
                <h3 style={{padding:"10px 0"}}>Information</h3>
                <table className="docp_doctor_table">
                    <thead className="docp_table_headers">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Number</th>
                        <th>Adress</th>
                        <th>Password</th>
                        <th>Date of Birth</th>
                        <th>Role</th>
                    </tr>
                    </thead>
                    <tbody>
                        {users.map((b) => (
                            usename === b.name && (
                            <tr key={b.id}>
                                <td>{b.name}</td>
                                <td>{b.email}</td>
                                <td>{b.number}</td>
                                <td>{b.adress}</td>
                                <td>{b.password}</td>
                                <td>{b.date_of_birth}</td>
                                <td>{b.role}</td>
                            </tr>
                            )
                        ))}
                    </tbody>
                </table>
            </div>
        </DoctorOrtakSayfa>
    );
}

export default DoctorProfile;