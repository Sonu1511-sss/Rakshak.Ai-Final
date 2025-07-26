import React from 'react';
import { Activity, Shield, AlertTriangle, Globe, TrendingUp, Users } from 'lucide-react';
import { cn } from '../utils/cn';

const stats = [
  {
    title: 'Total Requests',
    value: '2,847,392',
    change: '+12.5%',
    changeType: 'increase',
    icon: Activity,
    color: 'bg-cyber-500',
  },
  {
    title: 'Threats Blocked',
    value: '1,247',
    change: '+8.2%',
    changeType: 'increase',
    icon: Shield,
    color: 'bg-success-500',
  },
  {
    title: 'Active Alerts',
    value: '23',
    change: '-15.3%',
    changeType: 'decrease',
    icon: AlertTriangle,
    color: 'bg-warning-500',
  },
  {
    title: 'Countries',
    value: '156',
    change: '+2.1%',
    changeType: 'increase',
    icon: Globe,
    color: 'bg-purple-500',
  },
  {
    title: 'Anomalies Detected',
    value: '89',
    change: '+24.7%',
    changeType: 'increase',
    icon: TrendingUp,
    color: 'bg-danger-500',
  },
  {
    title: 'Blocked IPs',
    value: '456',
    change: '+5.4%',
    changeType: 'increase',
    icon: Users,
    color: 'bg-orange-500',
  },
];

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={stat.title}
          className={cn(
            'bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-200 animate-slide-up'
          )}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
              <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
            </div>
            <div className={cn('p-3 rounded-lg', stat.color)}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="mt-4">
            <span
              className={cn(
                'text-sm font-medium',
                stat.changeType === 'increase' ? 'text-success-400' : 'text-danger-400'
              )}
            >
              {stat.change}
            </span>
            <span className="text-gray-400 text-sm ml-2">from last week</span>
          </div>
        </div>
      ))}
    </div>
  );
}