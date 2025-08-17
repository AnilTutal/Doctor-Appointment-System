import AdminOrtakSayfa from "../OrtakSayfajs/AdminOrtakSayfa";
import React, { useEffect, useState } from "react";
import "../../styles/Admincss/AdminSchedule.css";

function AdminSchedule() {
  const [doctors, setDoctors] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    doctor_id: "",
    date: "",
    start_time: "",
    end_time: ""
  });

  useEffect(() => {
    fetchDoctors();
    fetchSchedules();
  }, []);

  const fetchDoctors = () => {
    fetch("http://localhost/doctor_app/doctors.php")
    .then(res => res.json())
    .then(data => setDoctors(data))
    .catch(err => console.error("Error:", err));
  };

  const fetchSchedules = () => {
    fetch("http://localhost/doctor_app/schedules.php")
    .then((res) => res.json())
    .then((data) => {
      console.log("Schedules fetched:", data);
      setSchedules(data); // filtreyi kaldırdık, backend filtre yapıyor
    })
    .catch((err) => console.error("Error fetching schedules:", err));
  };

  const handleAddSchedule = (e) => {
    e.preventDefault();
    fetch("http://localhost/doctor_app/schedules.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
    .then((res) => res.json())
    .then(() => {
      fetchSchedules();
      setFormData({ doctor_id: "", date: "", start_time: "", end_time: "" });
      setFormVisible(false);
    });
  };

  const handleRemoveSchedule = (id) => {
    if (!window.confirm("Are you sure you want to remove this schedule?")) return;

    fetch("http://localhost/doctor_app/schedules.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "delete", id }),
    })
    .then(res => res.json())
    .then(() => fetchSchedules());
  };

  return (
    <AdminOrtakSayfa>
      <div className="as_body_div">
        <div className="as_add_header">
          <h2 className="as_add_h">Schedules</h2>
          <button className="as_add_button" onClick={() => setFormVisible(!formVisible)}>+ Add New</button>
        </div>

        {formVisible && (
          <form onSubmit={handleAddSchedule} className="as_form_row">
            <select className="as_form_input" name="doctor_id" value={formData.doctor_id} onChange={(e) => setFormData({ ...formData, doctor_id: e.target.value })}>
              <option value="">Select Doctor</option>
              {doctors.map(doc => (
                <option key={doc.id} value={doc.id}>{doc.name}</option>
              ))}
            </select>
            
            <input type="date" className="as_form_input" name="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required />
            <input type="time" className="as_form_input" name="start_time" value={formData.start_time} onChange={(e) => setFormData({ ...formData, start_time: e.target.value })} required />
            <input type="time" className="as_form_input" name="end_time" value={formData.end_time} onChange={(e) => setFormData({ ...formData, end_time: e.target.value })} required />
            <button className="as_add_button" type="submit">Save</button>
          </form>
        )}

        <div className="as_table_div">
          <h3>All Schedules ({schedules.length})</h3>
          <table className="as_doctor_table">
            <thead className="as_table_headers">  
              <tr>
                <th>Doctor</th>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Status</th>
                <th>Actions</th>
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
                  <td className="as_event_buttons_td">
                    <button onClick={() => handleRemoveSchedule(sch.id)} className="as_event_buttons">Remove</button>
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

export default AdminSchedule;
