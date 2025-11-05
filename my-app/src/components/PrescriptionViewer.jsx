// src/components/PrescriptionViewer.jsx
import React from 'react';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const PrescriptionViewer = ({ prescription }) => {
  const downloadPrescription = async () => {
    const element = document.getElementById('prescription-content');
    const canvas = await html2canvas(element, {
      scale: 2,
      logging: false,
      useCORS: true
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save(`prescription-${prescription._id}.pdf`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
    >
      {/* Action Buttons */}
      <div className="p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Prescription Details
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={downloadPrescription}
            className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download PDF
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 text-sm"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print
          </button>
        </div>
      </div>

      {/* Prescription Content */}
      <div id="prescription-content" className="p-8 bg-white">
        {/* Header */}
        <div className="border-b-2 border-blue-600 pb-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-blue-600 mb-1">
                {prescription.doctor.name}
              </h1>
              <p className="text-gray-600">{prescription.doctor.specialty}</p>
              <p className="text-sm text-gray-500">
                Registration: {prescription.doctor.registration || 'MH-12345'}
              </p>
            </div>
            <div className="text-right">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            <p>{prescription.doctor.location?.area || prescription.doctor.location}</p>
            <p>Phone: {prescription.doctor.phone}</p>
          </div>
        </div>

        {/* Patient Info */}
        <div className="mb-6 bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">Patient Information</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Name:</span>
              <span className="ml-2 font-medium">{prescription.patient.name}</span>
            </div>
            <div>
              <span className="text-gray-600">Date:</span>
              <span className="ml-2 font-medium">
                {new Date(prescription.createdAt).toLocaleDateString('en-IN')}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Age:</span>
              <span className="ml-2 font-medium">{prescription.patient.age || 'N/A'}</span>
            </div>
            <div>
              <span className="text-gray-600">Gender:</span>
              <span className="ml-2 font-medium">{prescription.patient.gender || 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* Diagnosis */}
        {prescription.diagnosis && (
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Diagnosis
            </h3>
            <p className="text-gray-700 bg-yellow-50 p-3 rounded border-l-4 border-yellow-400">
              {prescription.diagnosis}
            </p>
          </div>
        )}

        {/* Medications */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            Rx - Medications
          </h3>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-gray-900">Medicine</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-900">Dosage</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-900">Frequency</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-900">Duration</th>
                </tr>
              </thead>
              <tbody>
                {prescription.medications.map((med, index) => (
                  <tr key={index} className="border-t border-gray-200">
                    <td className="px-4 py-3 font-medium text-gray-900">{med.name}</td>
                    <td className="px-4 py-3 text-gray-700">{med.dosage}</td>
                    <td className="px-4 py-3 text-gray-700">{med.frequency}</td>
                    <td className="px-4 py-3 text-gray-700">{med.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tests */}
        {prescription.tests && prescription.tests.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              Recommended Tests
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {prescription.tests.map((test, index) => (
                <li key={index}>{test}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Instructions */}
        {prescription.instructions && (
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Special Instructions
            </h3>
            <p className="text-gray-700 bg-blue-50 p-3 rounded">
              {prescription.instructions}
            </p>
          </div>
        )}

        {/* Follow-up */}
        {prescription.followUpDate && (
          <div className="mb-6 bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-1 flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Follow-up Appointment
            </h3>
            <p className="text-gray-700">
              {new Date(prescription.followUpDate).toLocaleDateString('en-IN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-gray-200 text-sm text-gray-600">
          <p className="mb-2">
            <strong>Note:</strong> This prescription is valid for {prescription.validityPeriod || 30} days from the date of issue.
          </p>
          <div className="mt-4 text-right">
            <div className="inline-block">
              <p className="text-gray-900 font-semibold border-t-2 border-gray-900 pt-2">
                Dr. {prescription.doctor.name}
              </p>
              <p className="text-gray-600 text-xs">Digital Signature</p>
            </div>
          </div>
        </div>

        {/* Prescription ID */}
        <div className="mt-4 text-center text-xs text-gray-500">
          Prescription ID: {prescription._id}
        </div>
      </div>
    </motion.div>
  );
};

export default PrescriptionViewer;
