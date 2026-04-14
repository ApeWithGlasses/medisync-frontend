import { useEffect, useState } from 'react';
import type { Doctor, Patient } from '../types/index.js';
import { validateForm, validateDateTime } from '../utils/validators';
import { formatDateForInput } from '../utils/dateUtils';
import './AppointmentForm.css';

interface AppointmentFormProps {
  initialData?: {
    patientId: number;
    doctorId: number;
    dateTime: string;
  };
  patients: Patient[];
  doctors: Doctor[];
  onSubmit: (data: {
    patientId: number;
    doctorId: number;
    dateTime: string;
  }) => Promise<void>;
  loading?: boolean;
  submitButtonLabel?: string;
}

const AppointmentForm = ({
  initialData,
  patients,
  doctors,
  onSubmit,
  loading = false,
  submitButtonLabel = 'Crear Cita',
}: AppointmentFormProps) => {
  const [formData, setFormData] = useState({
    patientId: initialData?.patientId || '',
    doctorId: initialData?.doctorId || '',
    dateTime: initialData?.dateTime ? formatDateForInput(initialData.dateTime) : '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        patientId: initialData.patientId || '',
        doctorId: initialData.doctorId || '',
        dateTime: formatDateForInput(initialData.dateTime),
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    validateField(name, formData[name as keyof typeof formData]);
  };

  const validateField = (name: string, value: string | number) => {
    const fieldErrors: Record<string, string> = { ...errors };

    if (name === 'patientId') {
      if (!value) {
        fieldErrors.patientId = 'Selecciona un paciente';
      } else {
        delete fieldErrors.patientId;
      }
    }

    if (name === 'doctorId') {
      if (!value) {
        fieldErrors.doctorId = 'Selecciona un médico';
      } else {
        delete fieldErrors.doctorId;
      }
    }

    if (name === 'dateTime') {
      const stringValue = String(value);
      if (!stringValue) {
        fieldErrors.dateTime = 'La fecha y hora son requeridas';
      } else if (!validateDateTime(stringValue)) {
        fieldErrors.dateTime = 'Fecha y hora inválidas';
      } else {
        const selectedDate = new Date(stringValue);
        if (selectedDate < new Date()) {
          fieldErrors.dateTime = 'La fecha debe ser en el futuro';
        } else {
          delete fieldErrors.dateTime;
        }
      }
    }

    setErrors(fieldErrors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { valid, errors: formErrors } = validateForm(
      formData.patientId,
      formData.doctorId,
      formData.dateTime
    );

    if (!valid) {
      setErrors(formErrors);
      setTouched({
        patientId: true,
        doctorId: true,
        dateTime: true,
      });
      return;
    }

    try {
      await onSubmit({
        patientId: Number(formData.patientId),
        doctorId: Number(formData.doctorId),
        dateTime: formData.dateTime,
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form className="appointment-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="patientId" className="form-label">
          Paciente <span className="required">*</span>
        </label>
        <select
          id="patientId"
          name="patientId"
          value={formData.patientId}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`form-input ${errors.patientId && touched.patientId ? 'error' : ''}`}
        >
          <option value="">Selecciona un paciente</option>
          {patients.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patient.name} ({patient.email})
            </option>
          ))}
        </select>
        {errors.patientId && touched.patientId && (
          <span className="error-message">{errors.patientId}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="doctorId" className="form-label">
          Médico <span className="required">*</span>
        </label>
        <select
          id="doctorId"
          name="doctorId"
          value={formData.doctorId}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`form-input ${errors.doctorId && touched.doctorId ? 'error' : ''}`}
        >
          <option value="">Selecciona un médico</option>
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.name} - {doctor.specialty}
            </option>
          ))}
        </select>
        {errors.doctorId && touched.doctorId && (
          <span className="error-message">{errors.doctorId}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="dateTime" className="form-label">
          Fecha y Hora <span className="required">*</span>
        </label>
        <input
          id="dateTime"
          type="datetime-local"
          name="dateTime"
          value={formData.dateTime}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`form-input ${errors.dateTime && touched.dateTime ? 'error' : ''}`}
        />
        {errors.dateTime && touched.dateTime && (
          <span className="error-message">{errors.dateTime}</span>
        )}
      </div>

      <button
        type="submit"
        className="form-submit"
        disabled={loading}
      >
        {loading ? 'Guardando...' : submitButtonLabel}
      </button>
    </form>
  );
};

export default AppointmentForm;
