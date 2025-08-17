import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FirstPage from './components/FirstPage.js';
import LogIn from './components/LogIn.js';
import Register from './components/Register.js';

import AdminDashboard from './components/AdminPages/AdminDashboard.js';
import AdminDoctors from './components/AdminPages/AdminDoctors.js';
import AdminPatients from './components/AdminPages/AdminPatients.js';
import AdminAppointment from './components/AdminPages/AdminAppointment.js';
import AdminSchedule from './components/AdminPages/AdminSchedule.js';
import AdminProfiles from './components/AdminPages/AdminProfiles.jsx';

import PatientDashboard from './components/PatientPages/PatientDashboard.js';
import PatientAllDoctors from './components/PatientPages/PatientAllDoctors.js';
import PatientSchedule from './components/PatientPages/PatientSchedule.js';
import PatientMyBookings from './components/PatientPages/PatientMyBookings.js';
import PatientProfile from './components/PatientPages/PatientProfile.jsx';

import DoctorDashboard from './components/DoctorPages/DoctorDashboard.jsx';
import DoctorsMyAppointments from './components/DoctorPages/DoctorsMyAppointments.jsx';
import DoctorMySessions from './components/DoctorPages/DoctorMySessions.jsx';
import DoctorMyPatients from './components/DoctorPages/DoctorMyPatients.jsx';
import DoctorProfile from './components/DoctorPages/DoctorProfile.jsx';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin_doctors" element={<AdminDoctors />} />
        <Route path='/patient_dashboard' element={<PatientDashboard/>} />
        <Route path='/doctor_dashboard' element={<DoctorDashboard/>} />
        <Route path='/doctors_my_appointments' element={<DoctorsMyAppointments/>} />
        <Route path='/admin_patients' element={<AdminPatients/>} />
        <Route path='/admin_appointment' element={<AdminAppointment/>} />
        <Route path='/admin_schedule' element={<AdminSchedule/>} />
        <Route path='/doctors_my_sessions' element={<DoctorMySessions/>} />
        <Route path='/doctors_my_patients' element={<DoctorMyPatients/>} />
        <Route path='/patient_all_doctors' element={<PatientAllDoctors/>} />
        <Route path='/patient_schedule' element={<PatientSchedule/>} />
        <Route path='/patient_my_bookings' element={<PatientMyBookings/>} />
        <Route path='/doctor_profile' element={<DoctorProfile/>}/>
        <Route path='/admin_profiles' element={<AdminProfiles/>} />
        <Route path='/patient_profile' element={<PatientProfile/>}/>
      </Routes>
    </Router>
  );
}

export default App;
