import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './components/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import DashboardStats from './components/DashboardStats';
import LiveTraffic from './components/LiveTraffic';
import ThreatHeatMap from './components/ThreatHeatMap';
import Alerts from './components/Alerts';
import IPBlocker from './components/IPBlocker';
import UserManagement from './components/UserManagement';
import Settings from './components/Settings';
import AttackSimulator from './components/AttackSimulator';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { user } = useAuth();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            <DashboardStats />
            <AttackSimulator />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <div className="xl:col-span-1">
                <LiveTraffic />
              </div>
              <div className="xl:col-span-1">
                <ThreatHeatMap />
              </div>
            </div>
          </div>
        );
      case 'traffic':
        return (
          <ProtectedRoute requiredPermission="view_dashboard">
            <LiveTraffic />
          </ProtectedRoute>
        );
      case 'heatmap':
        return (
          <ProtectedRoute requiredPermission="view_dashboard">
            <ThreatHeatMap />
          </ProtectedRoute>
        );
      case 'alerts':
        return (
          <ProtectedRoute requiredPermission="view_alerts">
            <Alerts />
          </ProtectedRoute>
        );
      case 'blocking':
        return (
          <ProtectedRoute requiredPermission="manage_ips">
            <IPBlocker />
          </ProtectedRoute>
        );
      case 'users':
        return (
          <ProtectedRoute adminOnly={true}>
            <UserManagement />
          </ProtectedRoute>
        );
      case 'settings':
        return (
          <ProtectedRoute requiredPermission="manage_settings">
            <Settings />
          </ProtectedRoute>
        );
      default:
        return (
          <ProtectedRoute requiredPermission="view_dashboard">
            <DashboardStats />
          </ProtectedRoute>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {activeTab === 'dashboard' && 'Security Dashboard'}
            {activeTab === 'traffic' && 'Live Traffic Monitor'}
            {activeTab === 'heatmap' && 'Global Threat Map'}
            {activeTab === 'alerts' && 'Security Alerts'}
            {activeTab === 'blocking' && 'IP Management'}
            {activeTab === 'users' && 'User Management'}
            {activeTab === 'settings' && 'System Settings'}
          </h1>
          <p className="text-gray-400">
            {activeTab === 'dashboard' && 'Real-time cybersecurity monitoring and threat analysis'}
            {activeTab === 'traffic' && 'Monitor live traffic patterns and anomaly detection'}
            {activeTab === 'heatmap' && 'Visualize global threat sources and attack patterns'}
            {activeTab === 'alerts' && 'Manage security alerts and incident responses'}
            {activeTab === 'blocking' && 'Control blocked IP addresses and access rules'}
            {activeTab === 'users' && 'Manage user accounts and access permissions'}
            {activeTab === 'settings' && 'Configure system settings and API integrations'}
          </p>
        </div>

        {renderContent()}
      </main>
    </div>
  );
}

function AppContent() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading Rakshak.AI...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return <Dashboard />;
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1f2937',
              color: '#fff',
              border: '1px solid #374151'
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
        <AppContent />
      </AuthProvider>
    </Router>
  );
}
