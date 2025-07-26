import React, { useState } from 'react';
import { Shield, Plus, Search, Trash2, Clock, Globe, Ban, CheckCircle } from 'lucide-react';
import { cn } from '../utils/cn';

const blockedIPs = [
  {
    ip: '185.234.67.89',
    country: 'Russia',
    reason: 'DDoS Attack',
    blocked: new Date(Date.now() - 2 * 60 * 60 * 1000),
    expires: new Date(Date.now() + 22 * 60 * 60 * 1000),
    permanent: false,
    threats: 247,
  },
  {
    ip: '123.45.67.89',
    country: 'China',
    reason: 'Brute Force Attack',
    blocked: new Date(Date.now() - 5 * 60 * 60 * 1000),
    expires: null,
    permanent: true,
    threats: 89,
  },
  {
    ip: '78.123.45.67',
    country: 'Brazil',
    reason: 'Malware Distribution',
    blocked: new Date(Date.now() - 1 * 60 * 60 * 1000),
    expires: new Date(Date.now() + 23 * 60 * 60 * 1000),
    permanent: false,
    threats: 156,
  },
  {
    ip: '45.67.89.123',
    country: 'Unknown',
    reason: 'Suspicious Activity',
    blocked: new Date(Date.now() - 30 * 60 * 1000),
    expires: new Date(Date.now() + 5.5 * 60 * 60 * 1000),
    permanent: false,
    threats: 34,
  },
];

export default function IPBlocker() {
  const [searchTerm, setSearchTerm] = useState('');
  const [newIP, setNewIP] = useState('');
  const [blockReason, setBlockReason] = useState('');
  const [blockDuration, setBlockDuration] = useState('24');
  const [showAddForm, setShowAddForm] = useState(false);
  const [blockedList, setBlockedList] = useState(blockedIPs);

  const filteredIPs = blockedList.filter(ip =>
    ip.ip.includes(searchTerm) ||
    ip.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ip.reason.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBlockIP = () => {
    if (!newIP || !blockReason) return;

    const duration = blockDuration === 'permanent' ? null : parseInt(blockDuration);
    const newBlock = {
      ip: newIP,
      country: 'Unknown',
      reason: blockReason,
      blocked: new Date(),
      expires: duration ? new Date(Date.now() + duration * 60 * 60 * 1000) : null,
      permanent: duration === null,
      threats: 0,
    };

    setBlockedList(prev => [newBlock, ...prev]);
    setNewIP('');
    setBlockReason('');
    setBlockDuration('24');
    setShowAddForm(false);
  };

  const handleUnblockIP = (ipToUnblock: string) => {
    setBlockedList(prev => prev.filter(ip => ip.ip !== ipToUnblock));
  };

  const getTimeRemaining = (expiryDate: Date | null) => {
    if (!expiryDate) return 'Permanent';
    
    const diff = expiryDate.getTime() - Date.now();
    if (diff <= 0) return 'Expired';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const stats = {
    total: blockedList.length,
    permanent: blockedList.filter(ip => ip.permanent).length,
    temporary: blockedList.filter(ip => !ip.permanent).length,
    expiring: blockedList.filter(ip => 
      ip.expires && ip.expires.getTime() - Date.now() < 60 * 60 * 1000
    ).length,
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Blocked</p>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
            </div>
            <Ban className="w-8 h-8 text-danger-400" />
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Permanent</p>
              <p className="text-2xl font-bold text-danger-400">{stats.permanent}</p>
            </div>
            <Shield className="w-8 h-8 text-danger-400" />
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Temporary</p>
              <p className="text-2xl font-bold text-warning-400">{stats.temporary}</p>
            </div>
            <Clock className="w-8 h-8 text-warning-400" />
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Expiring Soon</p>
              <p className="text-2xl font-bold text-cyber-400">{stats.expiring}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-cyber-400" />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search IPs, countries, or reasons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyber-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-danger-600 hover:bg-danger-700 text-white rounded-lg transition-colors duration-200"
          >
            <Plus className="w-5 h-5" />
            <span>Block IP</span>
          </button>
        </div>

        {/* Add IP Form */}
        {showAddForm && (
          <div className="mt-6 p-4 bg-gray-700 rounded-lg border border-gray-600 animate-slide-up">
            <h4 className="text-white font-semibold mb-4">Block New IP Address</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="IP Address (e.g., 192.168.1.1)"
                value={newIP}
                onChange={(e) => setNewIP(e.target.value)}
                className="px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400 focus:ring-2 focus:ring-cyber-500"
              />
              <input
                type="text"
                placeholder="Block reason"
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
                className="px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400 focus:ring-2 focus:ring-cyber-500"
              />
              <select
                value={blockDuration}
                onChange={(e) => setBlockDuration(e.target.value)}
                className="px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:ring-2 focus:ring-cyber-500"
              >
                <option value="1">1 hour</option>
                <option value="6">6 hours</option>
                <option value="24">24 hours</option>
                <option value="168">1 week</option>
                <option value="permanent">Permanent</option>
              </select>
              <div className="flex space-x-2">
                <button
                  onClick={handleBlockIP}
                  className="flex-1 px-3 py-2 bg-danger-600 hover:bg-danger-700 text-white rounded transition-colors duration-200"
                >
                  Block
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 px-3 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Blocked IPs Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-xl font-semibold text-white flex items-center">
            <Ban className="w-6 h-6 mr-2 text-danger-400" />
            Blocked IP Addresses
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 text-sm border-b border-gray-700">
                <th className="p-4">IP Address</th>
                <th className="p-4">Country</th>
                <th className="p-4">Reason</th>
                <th className="p-4">Threats</th>
                <th className="p-4">Blocked</th>
                <th className="p-4">Expires</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="text-white">
              {filteredIPs.map((ip, index) => (
                <tr key={index} className="border-b border-gray-700/50 hover:bg-gray-700/50 transition-colors duration-200">
                  <td className="p-4 font-mono text-sm">{ip.ip}</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Globe className="w-4 h-4 text-gray-400" />
                      <span>{ip.country}</span>
                    </div>
                  </td>
                  <td className="p-4">{ip.reason}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-danger-500/20 text-danger-400 rounded text-sm font-medium">
                      {ip.threats}
                    </span>
                  </td>
                  <td className="p-4 text-gray-400 text-sm">
                    {ip.blocked.toLocaleString()}
                  </td>
                  <td className="p-4">
                    <span className={cn(
                      'px-2 py-1 rounded text-sm font-medium',
                      ip.permanent 
                        ? 'bg-danger-500/20 text-danger-400' 
                        : 'bg-warning-500/20 text-warning-400'
                    )}>
                      {getTimeRemaining(ip.expires)}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleUnblockIP(ip.ip)}
                      className="p-2 bg-success-500/20 hover:bg-success-500/30 text-success-400 rounded-lg transition-colors duration-200"
                      title="Unblock IP"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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