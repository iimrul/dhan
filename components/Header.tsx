import React, { useState } from 'react';
import { View, UserRole } from '../types';
import { HamburgerIcon, CartIcon, ChevronDownIcon } from './icons';

interface HeaderProps {
  currentView: View;
  toggleSidebar: () => void;
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  cartItemCount: number;
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({
  currentView,
  toggleSidebar,
  userRole,
  onRoleChange,
  cartItemCount,
  onCartClick,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleRoleSelect = (role: UserRole) => {
    onRoleChange(role);
    setIsDropdownOpen(false);
  };

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center z-10">
      {/* Left side: Hamburger and View Title */}
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="md:hidden mr-4 text-gray-600 hover:text-gray-800 transition-colors">
          <HamburgerIcon className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">{currentView}</h2>
      </div>

      {/* Right side: Role Switcher and Cart */}
      <div className="flex items-center space-x-6">
        {/* Role Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
          >
            <span className="font-semibold text-gray-700">View as:</span>
            <span className="font-bold text-brand-green">{userRole}</span>
            <ChevronDownIcon className={`w-5 h-5 text-gray-600 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-20 ring-1 ring-black ring-opacity-5">
              <ul className="py-1">
                <li
                  onClick={() => handleRoleSelect(UserRole.CLIENT)}
                  className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                >
                  Client
                </li>
                <li
                  onClick={() => handleRoleSelect(UserRole.ADMIN)}
                  className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                >
                  Admin
                </li>
                <li
                  onClick={() => handleRoleSelect(UserRole.SUPER_ADMIN)}
                  className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                >
                  Super Admin
                </li>
              </ul>
            </div>
          )}
        </div>
        
        {/* Cart Button - Only for Clients */}
        {userRole === UserRole.CLIENT && (
          <button onClick={onCartClick} className="relative text-gray-600 hover:text-brand-green transition-colors">
            <CartIcon className="w-7 h-7" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;