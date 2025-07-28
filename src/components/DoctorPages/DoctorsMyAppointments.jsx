import React, { useEffect, useState } from "react";
import DoctorOrtakSayfa from "../OrtakSayfajs/DoctorOrtakSayfa.js";
import "../../styles/Doctorcss/DoctorsMyAppointments.css";

function DoctorsMyAppointments({children}) {

  const [bookings, setBookings] = useState([]);
  
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    fetch("http://localhost/doctor_app/bookings.php")
    .then((res) => res.json())
    .then((data) => setBookings(data))
    .catch((err) => console.error("Error fetching bookings:", err));
  };

  return (
      <DoctorOrtakSayfa>
        <div className="dpp_table_div">
          <h3 style={{paddingBottom: "10px"}}>My Appointments ({bookings.length})</h3>
          <table className="dpp_doctor_table">
            <thead className="dpp_table_headers">
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
                b.doctor_name === "Cengiz" && (
                  <tr key={b.id}>
                    <td>{b.patient_name}</td>
                    <td>{b.doctor_name}</td>
                    <td>{b.date}</td>
                    <td>{b.start_time} - {b.end_time}</td>
                    <td className="dpp_event_buttons_td">
                      <button className="dpp_event_buttons" onClick={() => handleRemoveBooking(b.id)}>
                        Remove
                      </button>
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

export default DoctorsMyAppointments;
