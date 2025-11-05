import React, { useState, useEffect } from 'react';
import api from '../api';

const DoctorsMap = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await api.get('/api/doctors');
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <div className="w-full h-[400px] bg-gray-200 rounded-lg flex flex-col items-center justify-center p-4">
      <h2 className="text-xl font-bold mb-4 text-blue-700">Doctors on Map (Demo)</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col items-center">
            <img src={doctor.image} alt={doctor.name} className="w-16 h-16 rounded-full mb-2 object-cover" />
            <p className="font-semibold text-gray-900 dark:text-white">{doctor.name}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">{doctor.specialization}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{doctor.location}</p>
            <span className={`mt-1 px-2 py-1 rounded-full text-xs font-medium ${doctor.available ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
              {doctor.available ? 'Available' : 'Not Available'}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-gray-500 text-sm">(Map integration coming soon. This is a demo list of all doctors.)</p>
    </div>
  );
};

export default DoctorsMap;
