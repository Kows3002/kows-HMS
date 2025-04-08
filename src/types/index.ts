export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  contactNumber: string;
  address: string;
  bloodGroup: string;
  admissionDate: string;
  diagnosis: string;
  assignedDoctor?: string;
  medicalHistory?: string[];
  emergencyContact?: {
    name: string;
    relation: string;
    phone: string;
  };
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  contactNumber: string;
  email: string;
  availability: string[];
  patients: string[];
  department?: string;
  qualification?: string;
  profileImage?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  type: 'checkup' | 'follow-up' | 'emergency' | 'consultation';
  notes?: string;
}