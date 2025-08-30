import React from 'react';
import { Link } from 'react-router-dom';

const ProfileDropdown = () => {
  return (
    <div className="absolute top-12 right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
      <ul>
        <li className="p-4 hover:bg-gray-100 cursor-pointer">
          <Link to="/settings">Settings</Link>
        </li>
        <li className="p-4 hover:bg-gray-100 cursor-pointer">
          <Link to="/profile">Profile</Link>
        </li>
        <li className="p-4 hover:bg-gray-100 cursor-pointer border-t border-gray-200">
          <Link to="/logout">Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default ProfileDropdown;