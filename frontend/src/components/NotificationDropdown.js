import React from 'react';

const NotificationDropdown = () => {
  return (
    <div className="absolute top-12 right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-10">
      <div className="p-4">
        <h3 className="text-lg font-bold">Notifications</h3>
        <ul>
          <li className="py-2 border-b">Notification 1</li>
          <li className="py-2 border-b">Notification 2</li>
          <li className="py-2">Notification 3</li>
        </ul>
      </div>
    </div>
  );
};

export default NotificationDropdown;