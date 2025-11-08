import React from 'react';
import { User, UserRole } from '../types';

interface UserManagementProps {
    users: User[];
    onRoleChange: (uid: string, newRole: UserRole) => void;
}

const UserManagement: React.FC<UserManagementProps> = ({ users, onRoleChange }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map(user => (
            <tr key={user.uid}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {user.role === UserRole.SUPER_ADMIN ? (
                  <span className="text-gray-400">Cannot change</span>
                ) : (
                  <select
                    value={user.role}
                    onChange={(e) => onRoleChange(user.uid, e.target.value as UserRole)}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-brand-green"
                  >
                    <option value={UserRole.ADMIN}>Admin</option>
                    <option value={UserRole.CLIENT}>Client</option>
                  </select>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;