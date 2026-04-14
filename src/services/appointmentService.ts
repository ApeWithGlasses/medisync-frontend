import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { Appointment, CreateAppointmentRequest, Doctor, Patient } from '../types/index.js';

const API_BASE_URL = 'http://localhost:8080';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const appointmentService = {
  // Appointments
  getAllAppointments: async (): Promise<Appointment[]> => {
    const response = await axiosInstance.get<Appointment[]>('/appointments');
    return response.data;
  },

  getAppointmentById: async (id: number): Promise<Appointment> => {
    const response = await axiosInstance.get<Appointment>(`/appointments/${id}`);
    return response.data;
  },

  getAppointmentsByPatient: async (patientId: number): Promise<Appointment[]> => {
    const response = await axiosInstance.get<Appointment[]>(
      `/appointments/patient/${patientId}`
    );
    return response.data;
  },

  getAppointmentsByDoctor: async (doctorId: number): Promise<Appointment[]> => {
    const response = await axiosInstance.get<Appointment[]>(
      `/appointments/doctor/${doctorId}`
    );
    return response.data;
  },

  createAppointment: async (data: CreateAppointmentRequest): Promise<Appointment> => {
    const response = await axiosInstance.post<Appointment>('/appointments', data);
    return response.data;
  },

  updateAppointment: async (id: number, data: Partial<Appointment>): Promise<Appointment> => {
    const response = await axiosInstance.put<Appointment>(`/appointments/${id}`, data);
    return response.data;
  },

  deleteAppointment: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/appointments/${id}`);
  },

  // Patients
  getAllPatients: async (): Promise<Patient[]> => {
    const response = await axiosInstance.get<Patient[]>('/patients');
    return response.data;
  },

  getPatientById: async (id: number): Promise<Patient> => {
    const response = await axiosInstance.get<Patient>(`/patients/${id}`);
    return response.data;
  },

  // Doctors
  getAllDoctors: async (): Promise<Doctor[]> => {
    const response = await axiosInstance.get<Doctor[]>('/doctors');
    return response.data;
  },

  getDoctorById: async (id: number): Promise<Doctor> => {
    const response = await axiosInstance.get<Doctor>(`/doctors/${id}`);
    return response.data;
  },
};
