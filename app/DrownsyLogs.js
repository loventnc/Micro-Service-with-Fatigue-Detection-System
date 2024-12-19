'use client';
import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react'

export const DrownsyLogs = () => {
  const [logs, setLogs] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  
  const formatDate = (rawDate) => {
    const year = rawDate.substring(0, 4);
    const month = rawDate.substring(4, 6);
    const day = rawDate.substring(6, 8);
  
    const date = new Date(`${year}-${month}-${day}`);
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };
  
  const formatTime = (rawTime) => {
    const hour = rawTime.substring(0, 2);
    const minute = rawTime.substring(2, 4);
    const second = rawTime.substring(4, 6);
  
    return `${hour}:${minute}:${second}`;
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/uploads');
        const data = await response.json();
        setLogs(data);
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    };
    fetchData();
  }, []);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleClosePopup = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <main className="flex-1 p-8 space-y-8">
        <h1 className="flex justify-center text-4xl font-semibold text-gray-800 mb-8">
          Drownsy Logs
        </h1>
        <table className="w-full bg-white rounded-lg shadow-lg">
          <thead className="bg-gray-200">
            <tr className='text-black font-bold'>
              <th className="py-3 px-6 text-left text-sm font-semibold ">No.</th>
              <th className="py-3 px-6 text-left text-sm font-semibold ">Date</th>
              <th className="py-3 px-6 text-left text-sm font-semibold ">Time</th>
              <th className="py-3 px-6 text-left text-sm font-semibold ">Status</th>
              <th className="py-3 px-6 text-left text-sm font-semibold ">Action</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => {
              const [date, time] = log.name
                .replace('drowsy_', '')
                .replace('.jpg', '')
                .split('_');
              return (
                <tr key={index} className="border-t">
                  <td className="py-3 px-6 text-gray-700">{index + 1}</td>
                  <td className="py-3 px-6 text-gray-700">{formatDate(date)}</td>
                  <td className="py-3 px-6 text-gray-700">{formatTime(time)}</td>
                  <td className="py-3 px-6 text-red-700 font-bold">Drownsy</td>
                  <td className="py-3 px-6">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleImageClick(log.url)}
                    >
                      <Icon icon="material-symbols:image-search" className='w-8 h-8' />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>

      {/* Popup for image */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={handleClosePopup}
            >
              ✕
            </button>
            <img src={selectedImage} alt="Selected" className="max-w-full max-h-[80vh]" />
          </div>
        </div>
      )}
    </>
  );
};
