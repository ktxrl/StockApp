import React from 'react';

const AlertsDropdown = () => {
  return (
    <div className="absolute top-12 right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-10">
      <div className="p-4">
        <h3 className="text-lg font-bold">Notifications</h3>
      </div>
      <ul>
        <li className="p-4 border-t border-gray-200">
          <p className="font-bold">New AI Recommendation</p>
          <p className="text-sm text-gray-600">Tesla (TSLA) - Buy</p>
        </li>
        <li className="p-4 border-t border-gray-200">
          <p className="font-bold">Portfolio Alert</p>
          <p className="text-sm text-gray-600">Apple (AAPL) is up 5%</p>
        </li>
        <li className="p-4 border-t border-gray-200">
          <p className="font-bold">News Update</p>
          <p className="text-sm text-gray-600">Market is volatile today</p>
        </li>
      </ul>
    </div>
  );
};

export default AlertsDropdown;