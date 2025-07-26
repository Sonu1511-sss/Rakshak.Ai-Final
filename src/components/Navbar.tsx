import React from 'react';
import { Shield, Activity, Map, AlertTriangle, Settings, Users, BarChart3, LogOut, User } from 'lucide-react';
import { cn } from '../utils/cn';
import { useAuth } from '../contexts/AuthContext';

const navItems = [
  { id: 'dashboard', icon: BarChart3, label: 'Dashboard', active: true },
  { id: 'traffic', icon: Activity, label: 'Live Traffic' },
  { id: 'heatmap', icon: Map, label: 'Threat Map' },
  { id: 'alerts', icon: AlertTriangle, label: 'Alerts' },
  { id: 'blocking', icon: Users, label: 'IP Control' },
  { id: 'users', icon: Users, label: 'Users', adminOnly: true },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const { user, logout, isAdmin } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Shield className="w-8 h-8 text-cyber-400" />
              <span className="text-2xl font-bold text-white">Rakshak.AI</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.filter(item => !item.adminOnly || isAdmin).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={cn(
                      'flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200',
                      activeTab === item.id
                        ? 'bg-cyber-600 text-white shadow-lg shadow-cyber-600/30'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 bg-gray-800 px-3 py-2 rounded-lg">
              <User className="w-4 h-4 text-cyber-400" />
              <div className="text-sm">
                <p className="text-white font-medium">{user?.username}</p>
                <p className="text-gray-400 text-xs">{user?.role}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 bg-success-900/20 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-success-400 rounded-full animate-pulse"></div>
              <span className="text-success-400 text-sm font-medium">System Online</span>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-3 py-2 bg-danger-600 hover:bg-danger-700 text-white rounded-lg transition-colors duration-200"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:block">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}