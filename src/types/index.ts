export interface Patient {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface Doctor {
  id: number;
  name: string;
  specialty: string;
}

export interface Appointment {
  id: number;
  patientId: number;
  doctorId: number;
  dateTime: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
}

export interface CreateAppointmentRequest {
  patientId: number;
  doctorId: number;
  dateTime: string;
}
