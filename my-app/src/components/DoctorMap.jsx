// src/components/DoctorMap.jsx
import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icons
const createCustomIcon = (color) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 30px;
        height: 30px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 2px solid white;
        box-shadow: 0 2px 5px rgba(0,0,0,0.3);
      ">
        <div style="
          transform: rotate(45deg);
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 16px;
          font-weight: bold;
        ">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
    `,
    iconSize: [30, 42],
    iconAnchor: [15, 42],
    popupAnchor: [0, -42],
  });
};

const availableIcon = createCustomIcon('#10b981'); // Green
const busyIcon = createCustomIcon('#ef4444'); // Red

// Component to fit bounds to all markers
const MapUpdater = ({ doctors }) => {
  const map = useRef(null);

  useEffect(() => {
    // Get map instance from window after a short delay
    const timer = setTimeout(() => {
      const leafletMap = document.querySelector('.leaflet-container')?._leaflet_map;
      if (leafletMap && doctors && doctors.length > 0) {
        const validDoctors = doctors.filter(
          doctor => doctor.location?.latitude && doctor.location?.longitude
        );
        
        if (validDoctors.length > 0) {
          const bounds = L.latLngBounds(
            validDoctors.map(doctor => [
              doctor.location.latitude,
              doctor.location.longitude
            ])
          );
          leafletMap.fitBounds(bounds, { padding: [50, 50] });
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [doctors]);

  return null;
};

const DoctorMap = ({ doctors }) => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [stats, setStats] = useState({ total: 0, available: 0, busy: 0 });
  const mapRef = useRef(null);
  const [mapInitialized, setMapInitialized] = useState(false);

  useEffect(() => {
    if (doctors) {
      setStats({
        total: doctors.length,
        available: doctors.filter(d => d.available).length,
        busy: doctors.filter(d => !d.available).length,
      });
    }
  }, [doctors]);

  // Filter doctors with valid coordinates
  const validDoctors = doctors?.filter(
    doctor => doctor.location?.latitude && doctor.location?.longitude
  ) || [];

  // Mumbai center coordinates
  const mumbaiCenter = [19.0760, 72.8777];

  // Fit bounds only once when map is first loaded
  useEffect(() => {
    if (mapRef.current && validDoctors.length > 0 && !mapInitialized) {
      const map = mapRef.current;
      const bounds = L.latLngBounds(
        validDoctors.map(doctor => [
          doctor.location.latitude,
          doctor.location.longitude
        ])
      );
      setTimeout(() => {
        map.fitBounds(bounds, { padding: [50, 50] });
        setMapInitialized(true);
      }, 100);
    }
  }, [validDoctors, mapInitialized]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Doctors Map - Mumbai
        </h3>
        <div className="flex items-center space-x-4 text-sm">
          <span className="text-gray-600 dark:text-gray-400">
            Total: <span className="font-semibold text-gray-900 dark:text-white">{stats.total}</span>
          </span>
          <span className="text-green-600 dark:text-green-400">
            Available: <span className="font-semibold">{stats.available}</span>
          </span>
          <span className="text-red-600 dark:text-red-400">
            Busy: <span className="font-semibold">{stats.busy}</span>
          </span>
        </div>
      </div>

      <div className="relative rounded-lg overflow-hidden" style={{ height: '600px' }}>
        {validDoctors.length > 0 ? (
          <MapContainer
            center={mumbaiCenter}
            zoom={11}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={true}
            dragging={true}
            touchZoom={true}
            doubleClickZoom={true}
            zoomControl={true}
            tap={true}
            boxZoom={true}
            keyboard={true}
            ref={mapRef}
            whenCreated={(mapInstance) => {
              mapRef.current = mapInstance;
              // Enable scroll wheel zoom immediately
              mapInstance.scrollWheelZoom.enable();
              // Enable touch interactions
              if (mapInstance.tap) mapInstance.tap.enable();
              if (mapInstance.touchZoom) mapInstance.touchZoom.enable();
              if (mapInstance.dragging) mapInstance.dragging.enable();
            }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {validDoctors.map((doctor) => {
              const position = [doctor.location.latitude, doctor.location.longitude];
              
              return (
                <Marker
                  key={doctor._id}
                  position={position}
                  icon={doctor.available ? availableIcon : busyIcon}
                >
                  <Popup>
                    <div className="p-2 min-w-[200px]">
                      <h4 className="font-bold text-gray-900 mb-1">{doctor.name}</h4>
                      <p className="text-sm text-gray-600 mb-1">
                        <span className="font-medium">Specialization:</span> {doctor.specialization}
                      </p>
                      <p className="text-sm text-gray-600 mb-1">
                        <span className="font-medium">Location:</span> {doctor.location.area}
                      </p>
                      <p className="text-sm text-gray-600 mb-1">
                        <span className="font-medium">Experience:</span> {doctor.experience} years
                      </p>
                      <p className="text-sm text-gray-600 mb-1">
                        <span className="font-medium">Fee:</span> ₹{doctor.fee}
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">Rating:</span> ⭐ {doctor.rating}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          doctor.available
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {doctor.available ? 'Available' : 'Busy'}
                        </span>
                        <button className="text-blue-600 hover:text-blue-800 text-xs font-medium">
                          Book Appointment
                        </button>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        ) : (
          <div className="h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
            <p className="text-gray-500 dark:text-gray-400">No doctors with valid locations found</p>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-center space-x-6">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow"></div>
          <span className="text-sm text-gray-600 dark:text-gray-400">Available Doctors</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow"></div>
          <span className="text-sm text-gray-600 dark:text-gray-400">Busy Doctors</span>
        </div>
      </div>
    </div>
  );
};

export default DoctorMap;