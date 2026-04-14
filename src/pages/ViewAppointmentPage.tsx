import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Appointment, Doctor, Patient } from '../types/index.js';
import { appointmentService } from '../services/appointmentService';
import { formatDate } from '../utils/dateUtils';
import './ViewAppointmentPage.css';

const ViewAppointmentPage = () => {
  const { id } = useParams<{ id: string }>();
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);
      const appointmentData = await appointmentService.getAppointmentById(Number(id));
      setAppointment(appointmentData);

      const [patientData, doctorData] = await Promise.all([
        appointmentService.getPatientById(appointmentData.patientId),
        appointmentService.getDoctorById(appointmentData.doctorId),
      ]);

      setPatient(patientData);
      setDoctor(doctorData);
    } catch (err) {
      setError('Error al cargar la cita');
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'SCHEDULED':
        return 'badge-scheduled';
      case 'COMPLETED':
        return 'badge-completed';
      case 'CANCELLED':
        return 'badge-cancelled';
      default:
        return 'badge-default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'SCHEDULED':
        return 'Programada';
      case 'COMPLETED':
        return 'Completada';
      case 'CANCELLED':
        return 'Cancelada';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="view-appointment-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Cargando detalles de la cita...</p>
        </div>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="view-appointment-page">
        <div className="alert alert-error">Cita no encontrada</div>
      </div>
    );
  }

  return (
    <div className="view-appointment-page">
      <Link to="/" className="back-link">
        ← Volver a Citas
      </Link>

      <div className="appointment-details-container">
        <div className="details-header">
          <h1>Detalles de la Cita #{appointment.id}</h1>
          <div className={`badge ${getStatusBadgeClass(appointment.status)}`}>
            {getStatusLabel(appointment.status)}
          </div>
        </div>

        <div className="details-grid">
          <div className="detail-card">
            <h3 className="detail-card-title">👨‍⚕️ Información del Médico</h3>
            <div className="detail-content">
              <p>
                <span className="detail-label">Nombre:</span>
                <span className="detail-value">{doctor?.name || 'N/A'}</span>
              </p>
              <p>
                <span className="detail-label">Especialidad:</span>
                <span className="detail-value">{doctor?.specialty || 'N/A'}</span>
              </p>
            </div>
          </div>

          <div className="detail-card">
            <h3 className="detail-card-title">👤 Información del Paciente</h3>
            <div className="detail-content">
              <p>
                <span className="detail-label">Nombre:</span>
                <span className="detail-value">{patient?.name || 'N/A'}</span>
              </p>
              <p>
                <span className="detail-label">Email:</span>
                <span className="detail-value">{patient?.email || 'N/A'}</span>
              </p>
              <p>
                <span className="detail-label">Teléfono:</span>
                <span className="detail-value">{patient?.phone || 'N/A'}</span>
              </p>
            </div>
          </div>

          <div className="detail-card">
            <h3 className="detail-card-title">📅 Información de la Cita</h3>
            <div className="detail-content">
              <p>
                <span className="detail-label">Fecha y Hora:</span>
                <span className="detail-value">{formatDate(appointment.dateTime)}</span>
              </p>
              <p>
                <span className="detail-label">Estado:</span>
                <span className="detail-value">{getStatusLabel(appointment.status)}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="action-buttons">
          {appointment.status === 'SCHEDULED' && (
            <Link
              to={`/edit/${appointment.id}`}
              className="btn btn-primary"
            >
              Editar Cita
            </Link>
          )}
          <Link to="/" className="btn btn-secondary">
            Volver a Citas
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewAppointmentPage;
