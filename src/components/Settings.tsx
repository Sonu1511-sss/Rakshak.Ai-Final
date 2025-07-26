import React, { useState } from 'react';
import { Settings as SettingsIcon, Key, Bell, Shield, Database, Save, Eye, EyeOff } from 'lucide-react';

export default function Settings() {
  const [apiKeys, setApiKeys] = useState({
    abuseipdb: '••••••••••••••••',
    virustotal: '••••••••••••••••',
  });
  
  const [showKeys, setShowKeys] = useState({
    abuseipdb: false,
    virustotal: false,
  });

  const [notifications, setNotifications] = useState({
    email: true,
    slack: false,
    webhook: true,
    realTime: true,
  });

  const [security, setSecurity] = useState({
    autoBlock: true,
    blockDuration: '24',
    threatThreshold: '5',
    rateLimit: '100',
  });

  const [database, setDatabase] = useState({
    retention: '30',
    compression: true,
    backup: true,
    export: 'csv',
  });

  const toggleKeyVisibility = (keyType: keyof typeof showKeys) => {
    setShowKeys(prev => ({
      ...prev,
      [keyType]: !prev[keyType]
    }));
  };

  const handleSave = () => {
    // In a real app, this would save to backend
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <SettingsIcon className="w-8 h-8 mr-3 text-cyber-400" />
          System Configuration
        </h2>

        {/* API Keys Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Key className="w-5 h-5 mr-2 text-cyber-400" />
            API Keys
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 text-sm font-medium mb-2">
                AbuseIPDB API Key
              </label>
              <div className="relative">
                <input
                  type={showKeys.abuseipdb ? 'text' : 'password'}
                  value={apiKeys.abuseipdb}
                  onChange={(e) => setApiKeys(prev => ({ ...prev, abuseipdb: e.target.value }))}
                  className="w-full px-4 py-2 pr-12 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-cyber-500 focus:border-transparent"
                  placeholder="Enter your AbuseIPDB API key"
                />
                <button
                  type="button"
                  onClick={() => toggleKeyVisibility('abuseipdb')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showKeys.abuseipdb ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-gray-400 text-sm font-medium mb-2">
                VirusTotal API Key
              </label>
              <div className="relative">
                <input
                  type={showKeys.virustotal ? 'text' : 'password'}
                  value={apiKeys.virustotal}
                  onChange={(e) => setApiKeys(prev => ({ ...prev, virustotal: e.target.value }))}
                  className="w-full px-4 py-2 pr-12 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-cyber-500 focus:border-transparent"
                  placeholder="Enter your VirusTotal API key"
                />
                <button
                  type="button"
                  onClick={() => toggleKeyVisibility('virustotal')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showKeys.virustotal ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Bell className="w-5 h-5 mr-2 text-cyber-400" />
            Notifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(notifications).map(([key, value]) => (
              <label key={key} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <span className="text-white capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => setNotifications(prev => ({ ...prev, [key]: e.target.checked }))}
                  className="w-4 h-4 text-cyber-600 bg-gray-600 border-gray-500 rounded focus:ring-cyber-500"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Security Settings */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-cyber-400" />
            Security Settings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-sm font-medium mb-2">
                Auto Block
              </label>
              <select
                value={security.autoBlock ? 'enabled' : 'disabled'}
                onChange={(e) => setSecurity(prev => ({ ...prev, autoBlock: e.target.value === 'enabled' }))}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:ring-2 focus:ring-cyber-500"
              >
                <option value="enabled">Enabled</option>
                <option value="disabled">Disabled</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-400 text-sm font-medium mb-2">
                Default Block Duration (hours)
              </label>
              <input
                type="number"
                value={security.blockDuration}
                onChange={(e) => setSecurity(prev => ({ ...prev, blockDuration: e.target.value }))}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:ring-2 focus:ring-cyber-500"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm font-medium mb-2">
                Threat Threshold
              </label>
              <input
                type="number"
                value={security.threatThreshold}
                onChange={(e) => setSecurity(prev => ({ ...prev, threatThreshold: e.target.value }))}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:ring-2 focus:ring-cyber-500"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm font-medium mb-2">
                Rate Limit (requests/minute)
              </label>
              <input
                type="number"
                value={security.rateLimit}
                onChange={(e) => setSecurity(prev => ({ ...prev, rateLimit: e.target.value }))}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:ring-2 focus:ring-cyber-500"
              />
            </div>
          </div>
        </div>

        {/* Database Settings */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Database className="w-5 h-5 mr-2 text-cyber-400" />
            Database Settings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-sm font-medium mb-2">
                Data Retention (days)
              </label>
              <input
                type="number"
                value={database.retention}
                onChange={(e) => setDatabase(prev => ({ ...prev, retention: e.target.value }))}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:ring-2 focus:ring-cyber-500"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm font-medium mb-2">
                Export Format
              </label>
              <select
                value={database.export}
                onChange={(e) => setDatabase(prev => ({ ...prev, export: e.target.value }))}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:ring-2 focus:ring-cyber-500"
              >
                <option value="csv">CSV</option>
                <option value="json">JSON</option>
                <option value="xml">XML</option>
              </select>
            </div>

            <label className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
              <span className="text-white">Enable Compression</span>
              <input
                type="checkbox"
                checked={database.compression}
                onChange={(e) => setDatabase(prev => ({ ...prev, compression: e.target.checked }))}
                className="w-4 h-4 text-cyber-600 bg-gray-600 border-gray-500 rounded focus:ring-cyber-500"
              />
            </label>

            <label className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
              <span className="text-white">Auto Backup</span>
              <input
                type="checkbox"
                checked={database.backup}
                onChange={(e) => setDatabase(prev => ({ ...prev, backup: e.target.checked }))}
                className="w-4 h-4 text-cyber-600 bg-gray-600 border-gray-500 rounded focus:ring-cyber-500"
              />
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 px-6 py-3 bg-cyber-600 hover:bg-cyber-700 text-white rounded-lg transition-colors duration-200"
          >
            <Save className="w-5 h-5" />
            <span>Save Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}