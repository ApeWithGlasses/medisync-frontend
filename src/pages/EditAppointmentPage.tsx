import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Appointment, Doctor, Patient } from '../types/index.js';
import { appointmentService } from '../services/appointmentService';
import AppointmentForm from '../components/AppointmentForm';
import './EditAppointmentPage.css';

const EditAppointmentPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);
      const [appointmentData, patientsData, doctorsData] = await Promise.all([
        appointmentService.getAppointmentById(Number(id)),
        appointmentService.getAllPatients(),
        appointmentService.getAllDoctors(),
      ]);

      if (appointmentData.status !== 'SCHEDULED') {
        setError('No puedes editar una cita que no está programada');
        return;
      }

      setAppointment(appointmentData);
      setPatients(patientsData);
      setDoctors(doctorsData);
    } catch (err) {
      setError('Error al cargar la cita');
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: {
    patientId: number;
    doctorId: number;
    dateTime: string;
  }) => {
    if (!id) return;

    try {
      setSubmitting(true);
      setError(null);
      
      await appointmentService.updateAppointment(Number(id), {
        patientId: data.patientId,
        doctorId: data.doctorId,
        dateTime: data.dateTime,
      });

      navigate('/', { state: { message: '¡Cita actualizada exitosamente!' } });
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al actualizar la cita';
      setError(errorMessage);
      console.error('Error updating appointment:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="edit-appointment-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Cargando cita...</p>
        </div>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="edit-appointment-page">
        <div className="alert alert-error">Cita no encontrada</div>
      </div>
    );
  }

  return (
    <div className="edit-appointment-page">
      <div className="page-header">
        <h1>Editar Cita #{appointment.id}</h1>
        <p className="page-subtitle">Modifica los detalles de tu cita</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="form-container">
        <AppointmentForm
          initialData={{
            patientId: appointment.patientId,
            doctorId: appointment.doctorId,
            dateTime: appointment.dateTime,
          }}
          patients={patients}
          doctors={doctors}
          onSubmit={handleSubmit}
          loading={submitting}
          submitButtonLabel="Actualizar Cita"
        />
      </div>
    </div>
  );
};

export default EditAppointmentPage;
