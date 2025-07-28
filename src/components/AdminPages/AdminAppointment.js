import React, { useState, useEffect } from "react";
import AdminOrtakSayfa from "../OrtakSayfajs/AdminOrtakSayfa";
import "../../styles/Admincss/AdminAppointment.css";

function AdminAppointment() {
    const [bookings, setBookings] = useState([]);
    const [patients, setPatients] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [formVisible, setFormVisible] = useState(false);
    const [formData, setFormData] = useState({
      patient_id: "",
      schedule_id: ""
    });

    useEffect(() => {
      fetchBookings();
      fetchPatients();
      fetchSchedules();
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

    const fetchSchedules = () => {
      fetch("http://localhost/doctor_app/schedules.php")
      .then((res) => res.json())
      .then((data) => setSchedules(data.filter(s => s.status === "available")))
      .catch((err) => console.error("Error fetching schedules:", err));
    };

    const handleAddBooking = (e) => {
      e.preventDefault();

      if (!formData.patient_id || !formData.schedule_id) {
        alert("Lütfen hasta ve uygun randevu seçiniz.");
        return;
      }

      const selectedSchedule = schedules.find(s => String(s.id) === String(formData.schedule_id));
      if (!selectedSchedule) {
        alert("Geçersiz randevu seçimi.");
        return;
      }

      fetch("http://localhost/doctor_app/bookings.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patient_id: parseInt(formData.patient_id),
          doctor_id: selectedSchedule.doctor_id,
          date: selectedSchedule.date,
          status: "booked",
          schedule_id: selectedSchedule.id
        }),
      })
      .then((res) => res.json())
      .then(() => {
        fetchBookings();
        fetchSchedules();
        setFormData({ patient_id: "", schedule_id: "" });
        setFormVisible(false);
      })

      .catch(() => alert("Booking eklenirken hata oluştu."));
    };


  const handleRemoveBooking = (id) => {
    if (!window.confirm("Bu randevuyu silmek istediğinize emin misiniz?")) return;

    fetch("http://localhost/doctor_app/bookings.php", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
    .then((res) => res.json())
    .then((data) => {

      if (data.success) {
        fetchBookings();
        fetchSchedules();
        } else {
          alert("Randevu silinemedi.");
        }
    })
    .catch(() => alert("Silme işleminde hata oluştu."));
  };

  return (
    <AdminOrtakSayfa>
      <div className="app_body_div">
        <div>
          <div className="app_add_header">
            <h2 className="app_add_h">Appointments</h2>
            <button className="app_add_button" onClick={() => setFormVisible(!formVisible)}>
              + Add Appointments
            </button>
          </div>

          {formVisible && (
            <form onSubmit={handleAddBooking} className="app_form_row">
              <select
                className="app_form_input"
                value={formData.patient_id}
                onChange={(e) => setFormData({ ...formData, patient_id: e.target.value })}
                required
                >
                <option value="">Hasta Seçiniz</option>
                {patients.map((p) => (
                  <option key={p.patient_id} value={p.user_id}>
                    {p.name}
                  </option>
                ))}
              </select>

              <select
                className="app_form_input"
                value={formData.schedule_id}
                onChange={(e) => setFormData({ ...formData, schedule_id: e.target.value })}
                required
                >
                <option value="">Uygun Randevu Seçiniz</option>
                {schedules.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.doctor_name} - {s.date} ({s.start_time} - {s.end_time})
                  </option>
                ))}
              </select>

              <button className="app_add_button" type="submit">
                Save
              </button>
            </form>
          )}
        </div>

        <div className="app_table_div">
          <h3>All Appointments ({bookings.length})</h3>
          <table className="app_doctor_table">
            <thead className="app_table_headers">
              <tr>
                <th>Patient Name</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td>{b.patient_name}</td>
                  <td>{b.doctor_name}</td>
                  <td>{b.date}</td>
                  <td>{b.start_time} - {b.end_time}</td>
                  <td className="app_event_buttons_td">
                    <button className="app_event_buttons" onClick={() => handleRemoveBooking(b.id)}>
                      Remove
                    </button>
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

export default AdminAppointment;
