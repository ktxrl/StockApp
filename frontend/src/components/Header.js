import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NotificationDropdown from './NotificationDropdown';
import ProfileDropdown from './ProfileDropdown';

const Header = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f5] px-10 py-3">
      <div className="flex items-center gap-4 text-[#111418]">
        <div className="size-4">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="currentColor"></path>
          </svg>
        </div>
        <h2 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em]">TradeWise</h2>
      </div>
      <div className="flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-9">
          <Link to="/" className="text-[#111418] text-sm font-medium leading-normal">
            Dashboard
          </Link>
          <Link to="/portfolio" className="text-[#111418] text-sm font-medium leading-normal">
            Portfolio
          </Link>
          <Link to="/news" className="text-[#111418] text-sm font-medium leading-normal">
            News
          </Link>
        </div>
        <div className="relative">
          <button
            className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-[#f0f2f5] text-[#111418] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <div className="text-[#111418]" data-icon="Bell" data-size="20px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"></path>
              </svg>
            </div>
          </button>
          {showNotifications && <NotificationDropdown />}
        </div>
        <div className="relative">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 cursor-pointer"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCbf7cnkJXTfvA_sAH93JQT3rfu6zL8y8BD1aCYUk9Z90JxIiOk25NzrhaMBBoVnLTPSYN4CL8jeBHmxAht1URj93iF0C93gWH8SoRW44XVvfJFCiPYHCOo3lgh7sbOanKZjGly9jPv3Sk3raSYz3K_3qjIfA40N8m7GV7dJT02a70C17Kkqpck7Armghmg7FFkbzDlhayWPYo5TwafDhUQ5vZr6GsB4qRMHawjUPeV8IszaYdAqxkDPozzJ4Pfbsi-4JlSNEBse76V")',
            }}
            onClick={() => setShowProfile(!showProfile)}
          ></div>
          {showProfile && <ProfileDropdown />}
        </div>
      </div>
    </header>
  );
};

export default Header;