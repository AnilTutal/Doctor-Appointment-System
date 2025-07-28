import AdminOrtakSayfa from "../OrtakSayfajs/AdminOrtakSayfa";
import "../../styles/Admincss/AdminPatients.css";
import React, { useEffect, useState } from "react";

function AdminPatients({ children }) {
  const [patients, setPatients] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = () => {
    fetch("http://localhost/doctor_app/patients.php")
      .then((res) => res.json())
      .then((data) => setPatients(data))
      .catch((err) => console.error("Error:", err));
  };

  const handleAddPatient = (e) => {
    e.preventDefault();
    fetch("http://localhost/doctor_app/patients.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
    .then((res) => res.json())
    .then(() => {
      fetchPatients();
      setFormData({ name: "", email: "" });
      setFormVisible(false);
    });
  };

  const handleRemovePatient = (id) => {
    if (!window.confirm("Are you sure you want to remove this patient?")) return;

    fetch("http://localhost/doctor_app/patients.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "delete", id }),
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        fetchPatients();
      } else {
        alert("Patient could not be deleted");
      }
    })
    .catch(() => alert("An error occurred while deleting the patient"));
  };

  return (
    <AdminOrtakSayfa>
      <div className="ap_body_div">
        <div>
          <div className="ap_add_header">
            <h2 className="ap_add_h">Patients</h2>
            <button className="ap_add_button" onClick={() => setFormVisible(!formVisible)}>+ Add New</button>
          </div>

          {formVisible && (
            <form onSubmit={handleAddPatient} className="ap_form_row">
              <input
                className="ap_form_input"
                type="text"
                placeholder="Patient Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <input
                className="ap_form_input"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <button className="ap_add_button" type="submit">Save</button>
            </form>
          )}
        </div>

        <div className="ap_table_div">
          <h3>All Patients ({patients.length})</h3>
          <table className="ap_doctor_table">
            <thead className="ap_table_headers">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((pat) => (
                <tr key={pat.id}>
                  <td>{pat.name}</td>
                  <td>{pat.email}</td>
                  <td className="ap_event_buttons_td">
                    <button className="ap_event_buttons" onClick={() => handleRemovePatient(pat.id)}>Remove</button>
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

export default AdminPatients;
