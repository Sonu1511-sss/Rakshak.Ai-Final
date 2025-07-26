import React, { useState } from 'react';
import { Users, Plus, Edit, Trash2, Shield, Eye, EyeOff } from 'lucide-react';
import { cn } from '../utils/cn';

const mockUsers = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@rakshak.ai',
    role: 'admin',
    status: 'active',
    lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000),
    permissions: ['view_dashboard', 'manage_ips', 'view_alerts', 'manage_settings', 'view_logs']
  },
  {
    id: '2',
    username: 'security',
    email: 'security@rakshak.ai',
    role: 'admin',
    status: 'active',
    lastLogin: new Date(Date.now() - 5 * 60 * 60 * 1000),
    permissions: ['view_dashboard', 'manage_ips', 'view_alerts', 'manage_settings', 'view_logs']
  },
  {
    id: '3',
    username: 'analyst',
    email: 'analyst@rakshak.ai',
    role: 'user',
    status: 'active',
    lastLogin: new Date(Date.now() - 1 * 60 * 60 * 1000),
    permissions: ['view_dashboard', 'view_alerts', 'view_logs']
  },
  {
    id: '4',
    username: 'viewer',
    email: 'viewer@rakshak.ai',
    role: 'user',
    status: 'inactive',
    lastLogin: new Date(Date.now() - 24 * 60 * 60 * 1000),
    permissions: ['view_dashboard', 'view_alerts']
  }
];

export default function UserManagement() {
  const [users, setUsers] = useState(mockUsers);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingUser, setEditingUser] = useState<string | null>(null);

  const getRoleColor = (role: string) => {
    return role === 'admin' ? 'text-danger-400 bg-danger-500/10' : 'text-cyber-400 bg-cyber-500/10';
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'text-success-400 bg-success-500/10' : 'text-gray-400 bg-gray-500/10';
  };

  const getTimeAgo = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    return `${hours}h ago`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center">
            <Users className="w-8 h-8 mr-3 text-cyber-400" />
            User Management
          </h2>
          <p className="text-gray-400 mt-1">Manage user accounts and permissions</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-cyber-600 hover:bg-cyber-700 text-white rounded-lg transition-colors duration-200"
        >
          <Plus className="w-5 h-5" />
          <span>Add User</span>
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Users</p>
              <p className="text-2xl font-bold text-white">{users.length}</p>
            </div>
            <Users className="w-8 h-8 text-cyber-400" />
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Administrators</p>
              <p className="text-2xl font-bold text-danger-400">
                {users.filter(u => u.role === 'admin').length}
              </p>
            </div>
            <Shield className="w-8 h-8 text-danger-400" />
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Users</p>
              <p className="text-2xl font-bold text-success-400">
                {users.filter(u => u.status === 'active').length}
              </p>
            </div>
            <Eye className="w-8 h-8 text-success-400" />
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Inactive Users</p>
              <p className="text-2xl font-bold text-warning-400">
                {users.filter(u => u.status === 'inactive').length}
              </p>
            </div>
            <EyeOff className="w-8 h-8 text-warning-400" />
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-xl font-semibold text-white">User Accounts</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 text-sm border-b border-gray-700">
                <th className="p-4">User</th>
                <th className="p-4">Role</th>
                <th className="p-4">Status</th>
                <th className="p-4">Last Login</th>
                <th className="p-4">Permissions</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="text-white">
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-700/50 hover:bg-gray-700/50 transition-colors duration-200">
                  <td className="p-4">
                    <div>
                      <p className="font-medium">{user.username}</p>
                      <p className="text-gray-400 text-sm">{user.email}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={cn(
                      'px-2 py-1 rounded text-xs font-medium',
                      getRoleColor(user.role)
                    )}>
                      {user.role.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={cn(
                      'px-2 py-1 rounded text-xs font-medium',
                      getStatusColor(user.status)
                    )}>
                      {user.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4 text-gray-400 text-sm">
                    {getTimeAgo(user.lastLogin)}
                  </td>
                  <td className="p-4">
                    <span className="text-gray-400 text-sm">
                      {user.permissions.length} permissions
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setEditingUser(user.id)}
                        className="p-2 bg-cyber-500/20 hover:bg-cyber-500/30 text-cyber-400 rounded-lg transition-colors duration-200"
                        title="Edit user"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 bg-danger-500/20 hover:bg-danger-500/30 text-danger-400 rounded-lg transition-colors duration-200"
                        title="Delete user"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}