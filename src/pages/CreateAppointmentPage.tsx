import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Doctor, Patient } from '../types/index.js';
import { appointmentService } from '../services/appointmentService';
import AppointmentForm from '../components/AppointmentForm';
import './CreateAppointmentPage.css';

const CreateAppointmentPage = () => {
  const Navigate = useNavigate();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [patientsData, doctorsData] = await Promise.all([
        appointmentService.getAllPatients(),
        appointmentService.getAllDoctors(),
      ]);

      setPatients(patientsData);
      setDoctors(doctorsData);
    } catch (err) {
      setError('Error al cargar los datos. Verifica que el backend esté ejecutándose.');
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
    try {
      setSubmitting(true);
      setError(null);
      
      await appointmentService.createAppointment({
        patientId: data.patientId,
        doctorId: data.doctorId,
        dateTime: data.dateTime,
      });

      Navigate('/', { state: { message: '¡Cita creada exitosamente!' } });
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al crear la cita';
      setError(errorMessage);
      console.error('Error creating appointment:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="create-appointment-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Cargando formulario...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="create-appointment-page">
      <div className="page-header">
        <h1>Agendar Nueva Cita</h1>
        <p className="page-subtitle">Completa el formulario para agendar tu consulta</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="form-container">
        <AppointmentForm
          patients={patients}
          doctors={doctors}
          onSubmit={handleSubmit}
          loading={submitting}
          submitButtonLabel="Agendar Cita"
        />
      </div>
    </div>
  );
};

export default CreateAppointmentPage;
