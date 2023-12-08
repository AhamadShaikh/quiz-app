import React from 'react';

const SubmittedPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 animate__animated animate__fadeIn animate__delay-2s">
        <p className="text-2xl font-bold text-blue-500 mb-4">Assignment Successfully Submitted</p>
        <div className="border-t border-gray-300 pt-4 mt-4 text-center">
        </div>
      </div>
    </div>
  );
};

export default SubmittedPage;
