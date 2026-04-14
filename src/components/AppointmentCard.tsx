import type { Appointment, Doctor, Patient } from '../types/index.js';
import { formatDate } from '../utils/dateUtils';
import { Link } from 'react-router-dom';
import './AppointmentCard.css';

interface AppointmentCardProps {
  appointment: Appointment;
  patient?: Patient;
  doctor?: Doctor;
  onDelete?: (id: number) => void;
  loading?: boolean;
}

const AppointmentCard = ({
  appointment,
  patient,
  doctor,
  onDelete,
  loading = false,
}: AppointmentCardProps) => {
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

  return (
    <div className="appointment-card">
      <div className="appointment-header">
        <div className="appointment-info">
          <h3 className="appointment-title">
            {patient?.name || `Paciente #${appointment.patientId}`}
          </h3>
          <p className="appointment-doctor">
            Dr. {doctor?.name || `Médico #${appointment.doctorId}`}
          </p>
        </div>
        <div className={`badge ${getStatusBadgeClass(appointment.status)}`}>
          {getStatusLabel(appointment.status)}
        </div>
      </div>

      <div className="appointment-details">
        <div className="detail-item">
          <span className="detail-label">📅 Fecha y Hora:</span>
          <span className="detail-value">{formatDate(appointment.dateTime)}</span>
        </div>
        {doctor && (
          <div className="detail-item">
            <span className="detail-label">🏥 Especialidad:</span>
            <span className="detail-value">{doctor.specialty}</span>
          </div>
        )}
      </div>

      <div className="appointment-actions">
        <Link
          to={`/view/${appointment.id}`}
          className="action-btn action-btn-view"
        >
          Ver Detalles
        </Link>
        {appointment.status === 'SCHEDULED' && (
          <>
            <Link
              to={`/edit/${appointment.id}`}
              className="action-btn action-btn-edit"
            >
              Editar
            </Link>
            <button
              className="action-btn action-btn-delete"
              onClick={() => onDelete?.(appointment.id)}
              disabled={loading}
            >
              {loading ? 'Eliminando...' : 'Cancelar'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AppointmentCard;
