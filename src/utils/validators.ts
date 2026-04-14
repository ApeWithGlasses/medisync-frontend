export const validatePatientId = (patientId: number | string): boolean => {
  const id = Number(patientId);
  return !isNaN(id) && id > 0;
};

export const validateDoctorId = (doctorId: number | string): boolean => {
  const id = Number(doctorId);
  return !isNaN(id) && id > 0;
};

export const validateDateTime = (dateTime: string): boolean => {
  if (!dateTime) return false;
  const date = new Date(dateTime);
  return date instanceof Date && !isNaN(date.getTime());
};

export const validateForm = (
  patientId: number | string,
  doctorId: number | string,
  dateTime: string
): { valid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  if (!validatePatientId(patientId)) {
    errors.patientId = 'Paciente inválido';
  }

  if (!validateDoctorId(doctorId)) {
    errors.doctorId = 'Médico inválido';
  }

  if (!validateDateTime(dateTime)) {
    errors.dateTime = 'Fecha y hora inválidas';
  } else {
    const selectedDate = new Date(dateTime);
    if (selectedDate < new Date()) {
      errors.dateTime = 'La fecha debe ser en el futuro';
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};
