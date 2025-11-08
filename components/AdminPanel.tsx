import React, { useState } from 'react';
import Card from './common/Card';
import UserManagement from './UserManagement';
import FarmerManagement from './FarmerManagement';
import OrderManagement from './OrderManagement';
import { User, UserRole, Order } from '../types';

type AdminTab = 'Users' | 'Farmers' | 'Orders';

interface AdminPanelProps {
    orders: Order[];
    onStatusChange: (orderId: string, newStatus: Order['status']) => void;
    userRole: UserRole;
}

// Mock data for demonstration purposes
const mockUsers: User[] = [
    { uid: 'user-1', email: 'client1@example.com', role: UserRole.CLIENT },
    { uid: 'user-2', email: 'admin1@example.com', role: UserRole.ADMIN },
    { uid: 'user-3', email: 'admin@amaderdhan.com', role: UserRole.SUPER_ADMIN },
    { uid: 'user-4', email: 'client2@example.com', role: UserRole.CLIENT },
];

const AdminPanel: React.FC<AdminPanelProps> = ({ orders, onStatusChange, userRole }) => {
    const [activeTab, setActiveTab] = useState<AdminTab>('Orders');
    const [users, setUsers] = useState<User[]>(mockUsers);

    const handleRoleChange = (uid: string, newRole: UserRole) => {
        setUsers(users.map(u => u.uid === uid ? { ...u, role: newRole } : u));
    };
    
    const renderContent = () => {
        switch (activeTab) {
            case 'Users':
                return <UserManagement users={users} onRoleChange={handleRoleChange} />;
            case 'Farmers':
                return <FarmerManagement />;
            case 'Orders':
                return <OrderManagement orders={orders} onStatusChange={onStatusChange} />;
            default:
                return null;
        }
    };

    const availableTabs: AdminTab[] = userRole === UserRole.SUPER_ADMIN 
        ? ['Orders', 'Farmers', 'Users']
        : ['Orders', 'Farmers'];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-gray-800">Admin Panel</h2>
                <p className="text-gray-600">Manage users, farmers, and orders.</p>
            </div>

            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    {availableTabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`${
                                activeTab === tab
                                ? 'border-brand-green text-brand-green'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm focus:outline-none`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>
            
            <Card>
                {renderContent()}
            </Card>
        </div>
    );
};

export default AdminPanel;