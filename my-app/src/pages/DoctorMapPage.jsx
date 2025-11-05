import React, { useState, useEffect } from 'react';
import api from '../api';
import DoctorMap from '../components/DoctorMap';

const DoctorMapPage = () => {
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
    <div className="max-w-5xl mx-auto p-4">
      <DoctorMap doctors={doctors} />
    </div>
  );
};

export default DoctorMapPage;
