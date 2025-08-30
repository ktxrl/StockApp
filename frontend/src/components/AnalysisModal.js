import React from 'react';

const AnalysisModal = ({ isOpen, onClose, analysis }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
        <h2 className="text-2xl font-bold mb-4">AI Analysis</h2>
        <p>{analysis}</p>
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-800 text-white rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default AnalysisModal;