import AdminOrtakSayfa from "../OrtakSayfajs/AdminOrtakSayfa.js";
import React, { useEffect, useState } from "react";
import "../../styles/Admincss/AdminDoctors.css";

function AdminDoctors({ children }) {
  const [doctors, setDoctors] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    specialties: "",
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = () => {
    fetch("http://localhost/doctor_app/doctors.php")
    .then((res) => res.json())
    .then((data) => setDoctors(data))
    .catch((err) => console.error("Error:", err));
  };

  const handleAddDoctor = (e) => {
    e.preventDefault();
    fetch("http://localhost/doctor_app/doctors.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
    .then((res) => res.json())
    .then(() => {
      fetchDoctors(); // tabloyu güncelle
      setFormData({ name: "", email: "", specialties: "" });
      setFormVisible(false); // formu kapat
    });
  };

  const handleRemoveDoctor = (id) => {
    if (!window.confirm("Are you sure you want to remove this doctor?")) return;
    fetch("http://localhost/doctor_app/doctors.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "delete", id }),
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        fetchDoctors(); // listeyi güncelle
      } else {
        alert("Doctor could not be deleted");
      }
    })
    .catch(() => alert("An error occurred while deleting the doctor"));
  };

  return (
    <AdminOrtakSayfa>
      <div className="body_div">
        <div>
          <div className="add_header">
            <h2 className="add_h">Doctors</h2>
            <button className="add_button" onClick={() => setFormVisible(!formVisible)}>+ Add New</button>
          </div>

          {formVisible && (
            <form  onSubmit={handleAddDoctor} className="form_row">
              <input className="form_input"
                type="text"
                placeholder="Doctor Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required

              />
              <input className="form_input"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <input className="form_input"
                type="text"
                placeholder="Specialties"
                value={formData.specialties}
                onChange={(e) => setFormData({ ...formData, specialties: e.target.value })}
                required
              />
              <button className="add_button" type="submit">Save</button>
            </form>
          )}
        </div>

        <div className="table_div">
          <h3>All Doctors ({doctors.length})</h3>
          <table className="doctor_table">
            <thead className="table_headers">
              <tr>
                <th>Doctor Name</th>
                <th>Email</th>
                <th>Specialties</th>
                <th>Events</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doc) => (
                <tr key={doc.id}>
                  <td>{doc.name}</td>
                  <td>{doc.email}</td>
                  <td>{doc.specialties}</td>
                  <td className="event_buttons_td">
                    <button className="event_buttons" onClick={() => handleRemoveDoctor(doc.id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminOrtakSayfa>
  );
}

export default AdminDoctors;
