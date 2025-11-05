import React from 'react';
import doctorMapVideo from '../assets/DoctorMapAd.mp4';
import logo from "../assets/DR_logo.png";


const About = () => (
  <div className="max-w-3xl mx-auto p-6">
    <div className="mb-8 flex flex-col items-center">
      <video
        src={doctorMapVideo}
        controls
        autoPlay
        muted
        loop
        className="rounded-lg shadow-lg w-full max-w-2xl border-4 border-blue-200"
        poster={logo}
        style={{ objectFit: 'cover' }}
      >
        Your browser does not support the video tag.
      </video>
    </div>

    <h1 className="text-3xl font-bold mb-4 text-blue-700">About DoctorMap</h1>
    <p className="mb-4 text-lg text-gray-700">
      <b>DoctorMap</b> is a modern healthcare platform designed to connect patients with the best doctors in their city. Our mission is to make healthcare accessible, transparent, and convenient for everyone.
    </p>
    <ul className="list-disc pl-6 mb-4 text-gray-700">
      <li>Search and filter doctors by specialization, location, and availability.</li>
      <li>Book appointments online and manage your bookings easily.</li>
      <li>Doctors can manage their schedules and patient appointments.</li>
      <li>All profiles are verified for trust and safety.</li>
    </ul>
    <p className="text-gray-600 mb-6">
      DoctorMap is built with ❤️ in India to empower both patients and healthcare professionals.
    </p>

    <div className="mt-8 p-4 bg-blue-50 dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-2 text-blue-800 dark:text-blue-300">Meet the Creator</h2>
      <div className="flex items-center space-x-4">
        <img
          src={logo}
          alt="Creator Logo"
          className="w-16 h-16 rounded-full border-2 border-blue-400"
        />
        <div>
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            Rahul D Jadhav (Creator & Developer)
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Hi! I'm Rahul, the creator of DoctorMap. I am passionate about building digital solutions that make healthcare more accessible and efficient for everyone. If you have feedback or want to collaborate, feel free to reach out!
          </p>
          <p className="mt-2 text-blue-700 dark:text-blue-400">
            Email: <a href="mailto:rahuljadhav0417@gmail.com" className="underline">rahuljadhav0417@gmail.com</a>
          </p>
          <p className="mt-2 text-blue-700 dark:text-blue-400">
            LinkedIn: <a href="https://www.linkedin.com/in/rahul-jadhav-a35b992a8/" className="underline" target="_blank" rel="noopener noreferrer">Rahul Jadhav</a>
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default About;
