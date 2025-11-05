
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';

const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const DashboardDoctor = React.lazy(() => import('./pages/DashboardDoctor'));
const DashboardPatient = React.lazy(() => import('./pages/DashboardPatient'));
const About = React.lazy(() => import('./pages/About'));
const Contact = React.lazy(() => import('./pages/Contact'));
const DoctorMapPage = React.lazy(() => import('./pages/DoctorMapPage'));


const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={`/dashboard/${user.role}`} replace />;
  }
  
  return children;
};


function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Toaster position="top-right" />
      <Navbar />
      <main className="flex-1">
        <React.Suspense fallback={<div className="flex justify-center items-center h-96 text-xl">Loading...</div>}>
          <Routes>
            
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/doctormap" element={<DoctorMapPage />} />
            
            <Route 
              path="/dashboard/doctor" 
              element={
                <ProtectedRoute requiredRole="doctor">
                  <DashboardDoctor />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/patient" 
              element={
                <ProtectedRoute requiredRole="patient">
                  <DashboardPatient />
                </ProtectedRoute>
              } 
            />
           
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </React.Suspense>
      </main>
    </div>
  );
}

export default App;