import React from 'react';
import { X, UserCircle, Phone, MapPin, Calendar, Activity, Heart, AlertCircle } from 'lucide-react';
import { Patient, Doctor } from '../types';

interface PatientDetailsProps {
  patient: Patient;
  doctor: Doctor | undefined;
  onClose: () => void;
}

const PatientDetails: React.FC<PatientDetailsProps> = ({ patient, doctor, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-end z-50">
      <div className="bg-white w-full max-w-lg h-full overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Patient Details</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                <UserCircle className="w-12 h-12 text-gray-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{patient.name}</h3>
                <p className="text-gray-600">Patient ID: {patient.id}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Age</p>
                  <p className="font-medium">{patient.age} years</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Blood Group</p>
                  <p className="font-medium">{patient.bloodGroup}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <Phone className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Contact</p>
                  <p className="font-medium">{patient.contactNumber}</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="font-medium">{patient.address}</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex items-start space-x-2">
                <Activity className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Current Diagnosis</p>
                  <p className="font-medium">{patient.diagnosis}</p>
                </div>
              </div>
            </div>

            {doctor && (
              <div className="border-t pt-4">
                <h4 className="text-lg font-semibold mb-3">Assigned Doctor</h4>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <UserCircle className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Dr. {doctor.name}</p>
                      <p className="text-sm text-gray-600">{doctor.specialization}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {patient.medicalHistory && (
              <div className="border-t pt-4">
                <h4 className="text-lg font-semibold mb-3">Medical History</h4>
                <div className="space-y-2">
                  {patient.medicalHistory.map((record, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <AlertCircle className="w-5 h-5 text-gray-500 mt-1" />
                      <p>{record}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {patient.emergencyContact && (
              <div className="border-t pt-4">
                <h4 className="text-lg font-semibold mb-3">Emergency Contact</h4>
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="font-medium">{patient.emergencyContact.name}</p>
                  <p className="text-sm text-gray-600">{patient.emergencyContact.relation}</p>
                  <p className="text-sm font-medium mt-1">{patient.emergencyContact.phone}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;