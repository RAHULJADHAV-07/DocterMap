// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen">
   
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white overflow-hidden">
        {/* Animated background shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="inline-block mb-4 px-4 py-2 bg-blue-500 bg-opacity-50 rounded-full text-sm font-semibold backdrop-blur-sm animate-fade-in">
              🏥 Healthcare Made Simple
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 animate-fade-in-up">
              Find the Right Doctor
              <span className="block bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
                Near You, Instantly
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-blue-100 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
              Connect with 500+ qualified healthcare professionals in Mumbai. Book appointments, view profiles, and get the care you deserve.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
              {isAuthenticated ? (
                <Link
                  to={`/dashboard/${user.role}`}
                  className="group bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 flex items-center justify-center"
                >
                  Go to Dashboard
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="group bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 flex items-center justify-center"
                  >
                    Get Started Free
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                  <Link
                    to="/login"
                    className="group border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-blue-600 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 backdrop-blur-sm bg-white bg-opacity-10"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
            
            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm animate-fade-in-up animation-delay-600">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-blue-100">500+ Verified Doctors</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-blue-100">10,000+ Appointments Booked</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-blue-100">4.8★ Average Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm font-semibold mb-4">
              Features
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose DoctorMap?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Your health is our priority. We make finding healthcare simple, fast, and convenient.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-blue-200 dark:border-gray-600">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 text-center">Find Nearby Doctors</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                Locate qualified doctors in your area with our interactive map and advanced search filters. Distance-based sorting available.
              </p>
            </div>
            
            <div className="group bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-green-200 dark:border-gray-600">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 text-center">Instant Booking</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                Book appointments instantly with real-time availability. Get instant confirmations and manage all appointments in one place.
              </p>
            </div>
            
            <div className="group bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-purple-200 dark:border-gray-600">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 text-center">Verified Professionals</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                All doctors are verified and licensed professionals with detailed profiles, ratings, and patient reviews for your peace of mind.
              </p>
            </div>
          </div>
        </div>
      </div>

    
      <div className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center transform hover:scale-110 transition-transform duration-300">
              <div className="relative inline-block mb-4">
                <div className="absolute inset-0 bg-blue-400 rounded-full blur-xl opacity-30"></div>
                <div className="relative text-5xl font-black bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">500+</div>
              </div>
              <div className="text-gray-600 dark:text-gray-300 font-semibold">Verified Doctors</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Across Mumbai</div>
            </div>
            <div className="text-center transform hover:scale-110 transition-transform duration-300">
              <div className="relative inline-block mb-4">
                <div className="absolute inset-0 bg-green-400 rounded-full blur-xl opacity-30"></div>
                <div className="relative text-5xl font-black bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">10K+</div>
              </div>
              <div className="text-gray-600 dark:text-gray-300 font-semibold">Happy Patients</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">And counting</div>
            </div>
            <div className="text-center transform hover:scale-110 transition-transform duration-300">
              <div className="relative inline-block mb-4">
                <div className="absolute inset-0 bg-purple-400 rounded-full blur-xl opacity-30"></div>
                <div className="relative text-5xl font-black bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">25+</div>
              </div>
              <div className="text-gray-600 dark:text-gray-300 font-semibold">Specializations</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">All medical fields</div>
            </div>
            <div className="text-center transform hover:scale-110 transition-transform duration-300">
              <div className="relative inline-block mb-4">
                <div className="absolute inset-0 bg-orange-400 rounded-full blur-xl opacity-30"></div>
                <div className="relative text-5xl font-black bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">24/7</div>
              </div>
              <div className="text-gray-600 dark:text-gray-300 font-semibold">Support Available</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Always here for you</div>
            </div>
          </div>
        </div>
      </div>

     
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Find Your Doctor?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of patients who trust DoctorMap for their healthcare needs. Start your journey to better health today.
          </p>
          {!isAuthenticated && (
            <Link
              to="/register"
              className="group inline-flex items-center bg-white text-blue-600 px-10 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105"
            >
              Sign Up Today - It's Free
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          )}
          
          {/* Feature badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <div className="px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-white text-sm font-semibold">
              ✓ No Hidden Charges
            </div>
            <div className="px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-white text-sm font-semibold">
              ✓ Instant Confirmation
            </div>
            <div className="px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-white text-sm font-semibold">
              ✓ 100% Secure
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;