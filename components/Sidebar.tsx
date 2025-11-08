import React from 'react';
import { View, UserRole } from '../types';
import { DashboardIcon, SoilIcon, SeedIcon, MarketplaceIcon, AdminIcon } from './icons';

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
  userRole: UserRole;
  isOpen: boolean;
  closeSidebar: () => void;
}

const NavItem: React.FC<{
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => (
  <li
    className={`
      flex items-center p-3 my-1 rounded-lg cursor-pointer
      transition-all duration-300 ease-in-out group relative
      ${isActive
        ? 'font-semibold text-white bg-white/10'
        : 'text-gray-300 hover:bg-white/10'
      }
    `}
    onClick={onClick}
  >
    <div className={`absolute left-0 w-1 h-full bg-brand-yellow rounded-r-full transition-transform duration-300 transform ${isActive ? 'scale-y-100' : 'scale-y-0'} group-hover:scale-y-100`}></div>
    <span className="w-6 h-6 mr-4">{icon}</span>
    <span className="font-medium">{label}</span>
  </li>
);

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange, userRole, isOpen, closeSidebar }) => {
  
  const handleViewChange = (view: View) => {
    onViewChange(view);
    if(window.innerWidth < 768) { // Only close on mobile
        closeSidebar();
    }
  };

  const navItems = [
    { view: View.DASHBOARD, label: 'Dashboard', icon: <DashboardIcon />, roles: [UserRole.CLIENT, UserRole.ADMIN, UserRole.SUPER_ADMIN] },
    { view: View.SOIL_MONITOR, label: 'Soil Monitor', icon: <SoilIcon />, roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN] },
    { view: View.SEED_LIBRARY, label: 'Seed Library', icon: <SeedIcon />, roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN] },
    { view: View.MARKETPLACE, label: 'Marketplace', icon: <MarketplaceIcon />, roles: [UserRole.CLIENT, UserRole.ADMIN, UserRole.SUPER_ADMIN] },
    { view: View.ADMIN_PANEL, label: 'Admin Panel', icon: <AdminIcon />, roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN] },
  ];

  const availableNavItems = navItems.filter(item => item.roles.includes(userRole));

  return (
    <>
        {/* Backdrop for mobile */}
        {isOpen && <div onClick={closeSidebar} className="fixed inset-0 bg-black/50 z-20 md:hidden"></div>}

        <aside className={`bg-brand-green text-white w-64 min-h-screen p-4 flex flex-col fixed md:relative transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out z-30 shadow-2xl`}>
            <div className="text-center mb-10 pt-4">
                <h1 className="text-3xl font-bold">Amader<span className="text-brand-yellow">Dhan</span></h1>
                <p className="text-sm text-gray-300 mt-1">Smart Farming Assistant</p>
            </div>
            <nav>
                <ul className="space-y-2">
                {availableNavItems.map(item => (
                    <NavItem
                    key={item.view}
                    label={item.label}
                    icon={item.icon}
                    isActive={currentView === item.view}
                    onClick={() => handleViewChange(item.view)}
                    />
                ))}
                </ul>
            </nav>
            <div className="mt-auto text-center text-xs text-gray-400 pb-4">
                <p>&copy; {new Date().getFullYear()} AmaderDhan. All rights reserved.</p>
            </div>
        </aside>
    </>
  );
};

export default Sidebar;