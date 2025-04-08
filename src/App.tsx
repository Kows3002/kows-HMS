import React, { useState } from 'react';
import { PlusCircle, Users, UserCircle, Calendar, Activity } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/Sidebar';
import PatientForm from './components/PatientForm';
import DoctorForm from './components/DoctorForm';
import AppointmentForm from './components/AppointmentForm';
import PatientDetails from './components/PatientDetails';
import DashboardCard from './components/DashboardCard';
import { Patient, Doctor, Appointment } from './types';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showPatientForm, setShowPatientForm] = useState(false);
  const [showDoctorForm, setShowDoctorForm] = useState(false);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const handleAddPatient = (patientData: Omit<Patient, 'id'>) => {
    const newPatient: Patient = {
      ...patientData,
      id: Math.random().toString(36).substr(2, 9),
    };
    setPatients([...patients, newPatient]);
    setShowPatientForm(false);
  };

  const handleAddDoctor = (doctorData: Omit<Doctor, 'id' | 'patients'>) => {
    const newDoctor: Doctor = {
      ...doctorData,
      id: Math.random().toString(36).substr(2, 9),
      patients: [],
    };
    setDoctors([...doctors, newDoctor]);
    setShowDoctorForm(false);
  };

  const handleAddAppointment = (appointmentData: Omit<Appointment, 'id'>) => {
    const newAppointment: Appointment = {
      ...appointmentData,
      id: Math.random().toString(36).substr(2, 9),
    };
    setAppointments([...appointments, newAppointment]);
    setShowAppointmentForm(false);
  };

  const getAssignedDoctor = (patientId: string) => {
    return doctors.find(doctor => doctor.patients.includes(patientId));
  };

  const getTodayAppointments = () => {
    const today = new Date().toISOString().split('T')[0];
    return appointments.filter(apt => apt.date === today);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <button
                onClick={() => setShowAppointmentForm(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Schedule Appointment
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <DashboardCard
                title="Total Patients"
                value={patients.length}
                icon={Users}
                color="text-blue-600"
                percentage={12}
              />
              <DashboardCard
                title="Total Doctors"
                value={doctors.length}
                icon={UserCircle}
                color="text-green-600"
                percentage={5}
              />
              <DashboardCard
                title="Today's Appointments"
                value={getTodayAppointments().length}
                icon={Calendar}
                color="text-purple-600"
                percentage={-8}
              />
              <DashboardCard
                title="Active Cases"
                value={patients.length}
                icon={Activity}
                color="text-orange-600"
                percentage={15}
              />
            </div>

            {showAppointmentForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg w-full max-w-2xl p-6">
                  <h2 className="text-xl font-bold mb-4">Schedule New Appointment</h2>
                  <AppointmentForm
                    doctors={doctors}
                    patients={patients}
                    onSubmit={handleAddAppointment}
                    onCancel={() => setShowAppointmentForm(false)}
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Appointments</h2>
                <div className="space-y-4">
                  {appointments.slice(0, 5).map(appointment => {
                    const patient = patients.find(p => p.id === appointment.patientId);
                    const doctor = doctors.find(d => d.id === appointment.doctorId);
                    return (
                      <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{patient?.name}</p>
                          <p className="text-sm text-gray-500">with Dr. {doctor?.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{appointment.date}</p>
                          <p className="text-sm text-gray-500">{appointment.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Patients</h2>
                <div className="space-y-4">
                  {patients.slice(0, 5).map(patient => (
                    <div key={patient.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{patient.name}</p>
                        <p className="text-sm text-gray-500">{patient.diagnosis}</p>
                      </div>
                      <button
                        onClick={() => setSelectedPatient(patient)}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'patients':
        return (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Patients</h1>
              <button
                onClick={() => setShowPatientForm(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <PlusCircle className="w-5 h-5 mr-2" />
                Add Patient
              </button>
            </div>
            {showPatientForm ? (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <PatientForm
                  onSubmit={handleAddPatient}
                  onCancel={() => setShowPatientForm(false)}
                />
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Age
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Gender
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Admission Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {patients.map((patient) => (
                      <tr key={patient.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">{patient.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{patient.age}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{patient.gender}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{patient.contactNumber}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{patient.admissionDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => setSelectedPatient(patient)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );

      case 'doctors':
        return (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Doctors</h1>
              <button
                onClick={() => setShowDoctorForm(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <PlusCircle className="w-5 h-5 mr-2" />
                Add Doctor
              </button>
            </div>
            {showDoctorForm ? (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <DoctorForm
                  onSubmit={handleAddDoctor}
                  onCancel={() => setShowDoctorForm(false)}
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctors.map((doctor) => (
                  <div key={doctor.id} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                        <UserCircle className="w-8 h-8 text-gray-500" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Dr. {doctor.name}</h3>
                        <p className="text-gray-600">{doctor.specialization}</p>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <p className="text-sm">
                        <span className="font-medium">Experience:</span> {doctor.experience} years
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Email:</span> {doctor.email}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Contact:</span> {doctor.contactNumber}
                      </p>
                    </div>
                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">Available on:</h4>
                      <div className="flex flex-wrap gap-2">
                        {doctor.availability.map((day) => (
                          <span
                            key={day}
                            className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded"
                          >
                            {day}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'appointments':
        return (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Appointments</h1>
              <button
                onClick={() => setShowAppointmentForm(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <PlusCircle className="w-5 h-5 mr-2" />
                Schedule Appointment
              </button>
            </div>
            {showAppointmentForm ? (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <AppointmentForm
                  doctors={doctors}
                  patients={patients}
                  onSubmit={handleAddAppointment}
                  onCancel={() => setShowAppointmentForm(false)}
                />
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Patient
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Doctor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {appointments.map((appointment) => {
                      const patient = patients.find(p => p.id === appointment.patientId);
                      const doctor = doctors.find(d => d.id === appointment.doctorId);
                      return (
                        <tr key={appointment.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">{patient?.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap">Dr. {doctor?.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{appointment.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{appointment.time}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs rounded-full capitalize" style={{
                              backgroundColor: appointment.type === 'emergency' ? '#FEE2E2' : '#E0E7FF',
                              color: appointment.type === 'emergency' ? '#991B1B' : '#3730A3'
                            }}>
                              {appointment.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs rounded-full capitalize" style={{
                              backgroundColor: 
                                appointment.status === 'completed' ? '#DCFCE7' :
                                appointment.status === 'cancelled' ? '#FEE2E2' : '#E0F2FE',
                              color:
                                appointment.status === 'completed' ? '#166534' :
                                appointment.status === 'cancelled' ? '#991B1B' : '#075985'
                            }}>
                              {appointment.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold">Coming Soon</h1>
            <p className="text-gray-600 mt-2">This feature is under development.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1">
        {renderContent()}
      </main>
      {selectedPatient && (
        <PatientDetails
          patient={selectedPatient}
          doctor={getAssignedDoctor(selectedPatient.id)}
          onClose={() => setSelectedPatient(null)}
        />
      )}
      <Toaster position="top-right" />
    </div>
  );
}

export default App;