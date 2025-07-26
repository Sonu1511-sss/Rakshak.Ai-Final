import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Shield, AlertTriangle } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: string;
  adminOnly?: boolean;
}

export default function ProtectedRoute({ 
  children, 
  requiredPermission, 
  adminOnly = false 
}: ProtectedRouteProps) {
  const { user, isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-cyber-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Authentication Required</h2>
          <p className="text-gray-400">Please log in to access this resource</p>
        </div>
      </div>
    );
  }

  if (adminOnly && !isAdmin) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-danger-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-gray-400">Administrator privileges required</p>
        </div>
      </div>
    );
  }

  if (requiredPermission && !user?.permissions.includes(requiredPermission)) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-warning-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Insufficient Permissions</h2>
          <p className="text-gray-400">You don't have permission to access this feature</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}