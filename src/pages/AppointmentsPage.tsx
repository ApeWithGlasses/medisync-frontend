import { useEffect, useState } from 'react';
import type { Appointment, Doctor, Patient } from '../types/index.js';
import { appointmentService } from '../services/appointmentService';
import AppointmentCard from '../components/AppointmentCard';
import './AppointmentsPage.css';

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [appointmentsData, doctorsData, patientsData] = await Promise.all([
        appointmentService.getAllAppointments(),
        appointmentService.getAllDoctors(),
        appointmentService.getAllPatients(),
      ]);

      setAppointments(appointmentsData);
      setDoctors(doctorsData);
      setPatients(patientsData);
    } catch (err) {
      setError(
        'Error al cargar las citas. Asegúrate de que el backend esté ejecutándose en http://localhost:8080'
      );
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Estás seguro de que deseas cancelar esta cita?')) {
      return;
    }

    try {
      setDeletingId(id);
      await appointmentService.deleteAppointment(id);
      setAppointments(appointments.filter((apt) => apt.id !== id));
    } catch (err) {
      alert('Error al cancelar la cita');
      console.error('Error deleting appointment:', err);
    } finally {
      setDeletingId(null);
    }
  };

  const getDoctorById = (doctorId: number): Doctor | undefined => {
    return doctors.find((doc) => doc.id === doctorId);
  };

  const getPatientById = (patientId: number): Patient | undefined => {
    return patients.find((pat) => pat.id === patientId);
  };

  if (loading) {
    return (
      <div className="appointments-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Cargando citas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="appointments-page">
      <div className="page-header">
        <h1>Mis Citas Médicas</h1>
        <p className="page-subtitle">Gestiona tus citas y consultas</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {appointments.length === 0 ? (
        <div className="empty-state">
          <p className="empty-state-icon">📅</p>
          <h2>No hay citas programadas</h2>
          <p>¡Crea tu primera cita médica!</p>
        </div>
      ) : (
        <div className="appointments-grid">
          {appointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              doctor={getDoctorById(appointment.doctorId)}
              patient={getPatientById(appointment.patientId)}
              onDelete={handleDelete}
              loading={deletingId === appointment.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentsPage;
