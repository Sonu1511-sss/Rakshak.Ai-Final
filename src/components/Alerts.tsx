import React, { useState, useEffect } from 'react';
import { AlertTriangle, Clock, Shield, X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { cn } from '../utils/cn';

const alertTypes = {
  critical: { icon: AlertTriangle, color: 'text-danger-400', bg: 'bg-danger-500/10', border: 'border-danger-500/30' },
  warning: { icon: AlertCircle, color: 'text-warning-400', bg: 'bg-warning-500/10', border: 'border-warning-500/30' },
  info: { icon: Info, color: 'text-cyber-400', bg: 'bg-cyber-500/10', border: 'border-cyber-500/30' },
  success: { icon: CheckCircle, color: 'text-success-400', bg: 'bg-success-500/10', border: 'border-success-500/30' },
};

const initialAlerts = [
  {
    id: 1,
    type: 'critical' as keyof typeof alertTypes,
    title: 'DDoS Attack Detected',
    message: 'High volume of requests from multiple IPs targeting /api/login endpoint',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    source: '185.234.67.89',
    resolved: false,
    action: 'Auto-blocked suspicious IPs',
  },
  {
    id: 2,
    type: 'warning' as keyof typeof alertTypes,
    title: 'Unusual Traffic Pattern',
    message: 'Traffic spike detected from China region (300% above normal)',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    source: 'China',
    resolved: false,
    action: 'Monitoring for 30 minutes',
  },
  {
    id: 3,
    type: 'critical' as keyof typeof alertTypes,
    title: 'Brute Force Attack',
    message: '50+ failed login attempts from single IP in 2 minutes',
    timestamp: new Date(Date.now() - 25 * 60 * 1000),
    source: '123.45.67.89',
    resolved: true,
    action: 'IP blocked for 24 hours',
  },
  {
    id: 4,
    type: 'info' as keyof typeof alertTypes,
    title: 'Security Scan Detected',
    message: 'Automated security scan from known security research IP',
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    source: '208.67.222.222',
    resolved: false,
    action: 'Allowed (whitelisted)',
  },
  {
    id: 5,
    type: 'warning' as keyof typeof alertTypes,
    title: 'Rate Limit Exceeded',
    message: 'API rate limit exceeded for user API key',
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
    source: 'API Key: ak_...',
    resolved: true,
    action: 'Temporary throttling applied',
  },
];

export default function Alerts() {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [filter, setFilter] = useState('all');
  const [newAlert, setNewAlert] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate new alerts
      if (Math.random() > 0.8) {
        const newAlertData = {
          id: Date.now(),
          type: (['critical', 'warning', 'info'] as const)[Math.floor(Math.random() * 3)],
          title: 'New Security Event',
          message: 'Automated threat detection system triggered',
          timestamp: new Date(),
          source: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          resolved: false,
          action: 'Under investigation',
        };
        
        setAlerts(prev => [newAlertData, ...prev]);
        setNewAlert(true);
        
        // Show toast notification
        if (newAlertData.type === 'critical') {
          toast.error(`🚨 ${newAlertData.title}`, {
            description: newAlertData.message
          });
        } else if (newAlertData.type === 'warning') {
          toast.error(`⚠️ ${newAlertData.title}`, {
            description: newAlertData.message
          });
        }
        
        setTimeout(() => setNewAlert(false), 3000);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'all') return true;
    if (filter === 'unresolved') return !alert.resolved;
    return alert.type === filter;
  });

  const resolveAlert = (id: number) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, resolved: true } : alert
    ));
  };

  const deleteAlert = (id: number) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const getTimeAgo = (timestamp: Date) => {
    const diff = Date.now() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) return `${hours}h ago`;
    return `${minutes}m ago`;
  };

  const alertCounts = {
    total: alerts.length,
    critical: alerts.filter(a => a.type === 'critical' && !a.resolved).length,
    warning: alerts.filter(a => a.type === 'warning' && !a.resolved).length,
    unresolved: alerts.filter(a => !a.resolved).length,
  };

  return (
    <div className="space-y-6">
      {/* Alert Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Alerts</p>
              <p className="text-2xl font-bold text-white">{alertCounts.total}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-cyber-400" />
          </div>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Critical</p>
              <p className="text-2xl font-bold text-danger-400">{alertCounts.critical}</p>
            </div>
            <div className="w-8 h-8 bg-danger-500/20 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-danger-400" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Warnings</p>
              <p className="text-2xl font-bold text-warning-400">{alertCounts.warning}</p>
            </div>
            <div className="w-8 h-8 bg-warning-500/20 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-warning-400" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Unresolved</p>
              <p className="text-2xl font-bold text-warning-400">{alertCounts.unresolved}</p>
            </div>
            <Clock className="w-8 h-8 text-warning-400" />
          </div>
        </div>
      </div>

      {/* New Alert Notification */}
      {newAlert && (
        <div className="bg-danger-500/10 border border-danger-500/30 rounded-lg p-4 animate-slide-up">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-5 h-5 text-danger-400" />
            <span className="text-danger-400 font-medium">New security alert detected!</span>
          </div>
        </div>
      )}

      {/* Filter Controls */}
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
        <div className="flex flex-wrap gap-2">
          {['all', 'unresolved', 'critical', 'warning', 'info'].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={cn(
                'px-3 py-1 rounded-md text-sm font-medium transition-all duration-200',
                filter === filterType
                  ? 'bg-cyber-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              )}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts List */}
      <div className="bg-gray-800 rounded-xl border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-xl font-semibold text-white flex items-center">
            <Shield className="w-6 h-6 mr-2 text-cyber-400" />
            Security Alerts
          </h3>
        </div>
        
        <div className="divide-y divide-gray-700">
          {filteredAlerts.map((alert) => {
            const AlertIcon = alertTypes[alert.type].icon;
            
            return (
              <div
                key={alert.id}
                className={cn(
                  'p-6 transition-all duration-200',
                  alert.resolved ? 'opacity-60' : '',
                  `hover:${alertTypes[alert.type].bg}`
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex space-x-4">
                    <div className={cn(
                      'p-2 rounded-lg',
                      alertTypes[alert.type].bg,
                      alertTypes[alert.type].border,
                      'border'
                    )}>
                      <AlertIcon className={cn('w-5 h-5', alertTypes[alert.type].color)} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-white font-semibold">{alert.title}</h4>
                        {alert.resolved && (
                          <span className="px-2 py-1 bg-success-500/20 text-success-400 text-xs rounded font-medium">
                            Resolved
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-300 mb-2">{alert.message}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{getTimeAgo(alert.timestamp)}</span>
                        </span>
                        <span>Source: {alert.source}</span>
                        <span>Action: {alert.action}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {!alert.resolved && (
                      <button
                        onClick={() => resolveAlert(alert.id)}
                        className="p-2 bg-success-500/20 hover:bg-success-500/30 text-success-400 rounded-lg transition-colors duration-200"
                        title="Mark as resolved"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteAlert(alert.id)}
                      className="p-2 bg-danger-500/20 hover:bg-danger-500/30 text-danger-400 rounded-lg transition-colors duration-200"
                      title="Delete alert"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}