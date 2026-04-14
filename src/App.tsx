import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AppointmentsPage from './pages/AppointmentsPage';
import CreateAppointmentPage from './pages/CreateAppointmentPage';
import EditAppointmentPage from './pages/EditAppointmentPage';
import ViewAppointmentPage from './pages/ViewAppointmentPage';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<AppointmentsPage />} />
          <Route path="/create" element={<CreateAppointmentPage />} />
          <Route path="/edit/:id" element={<EditAppointmentPage />} />
          <Route path="/view/:id" element={<ViewAppointmentPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App
