import React from 'react';

// Card Skeleton
export const CardSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 animate-pulse">
    <div className="flex items-center space-x-4 mb-4">
      <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
      </div>
    </div>
    <div className="space-y-2">
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
    </div>
    <div className="flex justify-between items-center mt-4">
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
    </div>
  </div>
);

// Appointment Skeleton
export const AppointmentSkeleton = () => (
  <div className="border-2 border-gray-200 dark:border-gray-700 rounded-xl p-5 animate-pulse">
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center space-x-3">
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20"></div>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mt-3 w-3/4"></div>
  </div>
);

// Stats Card Skeleton
export const StatsCardSkeleton = () => (
  <div className="bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-2xl shadow-lg p-6 animate-pulse">
    <div className="flex items-center">
      <div className="w-14 h-14 bg-gray-300 dark:bg-gray-600 rounded-xl"></div>
      <div className="ml-5 flex-1">
        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-24 mb-2"></div>
        <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
      </div>
    </div>
  </div>
);

// List Skeleton
export const ListSkeleton = ({ count = 3 }) => (
  <>
    {[...Array(count)].map((_, index) => (
      <div key={index} className="animate-pulse">
        <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/2"></div>
          </div>
          <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded-full w-16"></div>
        </div>
      </div>
    ))}
  </>
);

// Table Skeleton
export const TableSkeleton = ({ rows = 5, cols = 5 }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead className="bg-gray-50 dark:bg-gray-700">
        <tr>
          {[...Array(cols)].map((_, index) => (
            <th key={index} className="px-6 py-3">
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
        {[...Array(rows)].map((_, rowIndex) => (
          <tr key={rowIndex}>
            {[...Array(cols)].map((_, colIndex) => (
              <td key={colIndex} className="px-6 py-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Map Skeleton
export const MapSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse">
    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
    <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded"></div>
  </div>
);

export default {
  CardSkeleton,
  AppointmentSkeleton,
  StatsCardSkeleton,
  ListSkeleton,
  TableSkeleton,
  MapSkeleton
};
