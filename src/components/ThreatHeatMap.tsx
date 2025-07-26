import React, { useState, useEffect } from 'react';
import { MapPin, Globe, AlertCircle, Shield } from 'lucide-react';

const threatData = [
  { country: 'China', threats: 2847, lat: 35.8617, lng: 104.1954, severity: 'high' },
  { country: 'Russia', threats: 1923, lat: 61.5240, lng: 105.3188, severity: 'high' },
  { country: 'United States', threats: 1456, lat: 37.0902, lng: -95.7129, severity: 'medium' },
  { country: 'Brazil', threats: 892, lat: -14.2350, lng: -51.9253, severity: 'medium' },
  { country: 'India', threats: 734, lat: 20.5937, lng: 78.9629, severity: 'medium' },
  { country: 'Germany', threats: 523, lat: 51.1657, lng: 10.4515, severity: 'low' },
  { country: 'United Kingdom', threats: 412, lat: 55.3781, lng: -3.4360, severity: 'low' },
  { country: 'France', threats: 387, lat: 46.2276, lng: 2.2137, severity: 'low' },
];

const recentThreats = [
  {
    ip: '185.234.67.89',
    country: 'Russia',
    type: 'DDoS Attack',
    severity: 'Critical',
    time: '2 minutes ago',
    blocked: true,
  },
  {
    ip: '123.45.67.890',
    country: 'China',
    type: 'Brute Force',
    severity: 'High',
    time: '5 minutes ago',
    blocked: true,
  },
  {
    ip: '78.123.45.67',
    country: 'Brazil',
    type: 'Web Scraping',
    severity: 'Medium',
    time: '12 minutes ago',
    blocked: false,
  },
  {
    ip: '45.67.89.123',
    country: 'United States',
    type: 'Port Scan',
    severity: 'Low',
    time: '18 minutes ago',
    blocked: false,
  },
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'Critical': return 'text-danger-400 bg-danger-500/10';
    case 'High': return 'text-warning-400 bg-warning-500/10';
    case 'Medium': return 'text-cyber-400 bg-cyber-500/10';
    case 'Low': return 'text-success-400 bg-success-500/10';
    default: return 'text-gray-400 bg-gray-500/10';
  }
};

export default function ThreatHeatMap() {
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [liveUpdate, setLiveUpdate] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveUpdate(prev => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* World Map Placeholder */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white flex items-center">
              <Globe className="w-6 h-6 mr-2 text-cyber-400" />
              Global Threat Map
            </h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-danger-400 rounded-full animate-pulse"></div>
              <span className="text-danger-400 text-sm">Live Threats</span>
            </div>
          </div>
          
          {/* Simplified world map representation */}
          <div className="relative h-64 bg-gray-900 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"></div>
            {threatData.map((threat, index) => (
              <div
                key={threat.country}
                className={`absolute w-4 h-4 rounded-full cursor-pointer transition-all duration-300 ${
                  threat.severity === 'high' ? 'bg-danger-400 animate-pulse' :
                  threat.severity === 'medium' ? 'bg-warning-400' : 'bg-success-400'
                }`}
                style={{
                  left: `${Math.random() * 80 + 10}%`,
                  top: `${Math.random() * 60 + 20}%`,
                }}
                onClick={() => setSelectedCountry(threat)}
                title={`${threat.country}: ${threat.threats} threats`}
              >
                <div className="absolute inset-0 rounded-full bg-current opacity-30 animate-ping"></div>
              </div>
            ))}
          </div>

          {selectedCountry && (
            <div className="mt-4 p-4 bg-gray-700 rounded-lg animate-fade-in">
              <h4 className="font-semibold text-white">{selectedCountry.country}</h4>
              <p className="text-gray-300 text-sm">Threats detected: {selectedCountry.threats}</p>
              <p className="text-gray-300 text-sm">Severity: {selectedCountry.severity}</p>
            </div>
          )}
        </div>

        {/* Threat Statistics */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
            <AlertCircle className="w-6 h-6 mr-2 text-warning-400" />
            Top Threat Sources
          </h3>
          <div className="space-y-4">
            {threatData.slice(0, 6).map((country, index) => (
              <div key={country.country} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-gray-700 rounded text-sm font-medium text-white">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-white font-medium">{country.country}</p>
                    <p className="text-gray-400 text-sm">{country.threats} threats</p>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium ${
                  country.severity === 'high' ? 'bg-danger-500/20 text-danger-400' :
                  country.severity === 'medium' ? 'bg-warning-500/20 text-warning-400' :
                  'bg-success-500/20 text-success-400'
                }`}>
                  {country.severity.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Threats */}
      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white flex items-center">
            <Shield className="w-6 h-6 mr-2 text-cyber-400" />
            Recent Threat Activity
          </h3>
          <span className="text-gray-400 text-sm">Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 text-sm border-b border-gray-700">
                <th className="pb-3">IP Address</th>
                <th className="pb-3">Country</th>
                <th className="pb-3">Threat Type</th>
                <th className="pb-3">Severity</th>
                <th className="pb-3">Time</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="text-white">
              {recentThreats.map((threat, index) => (
                <tr key={index} className="border-b border-gray-700/50">
                  <td className="py-3 font-mono text-sm">{threat.ip}</td>
                  <td className="py-3">{threat.country}</td>
                  <td className="py-3">{threat.type}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(threat.severity)}`}>
                      {threat.severity}
                    </span>
                  </td>
                  <td className="py-3 text-gray-400 text-sm">{threat.time}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      threat.blocked ? 'bg-danger-500/20 text-danger-400' : 'bg-success-500/20 text-success-400'
                    }`}>
                      {threat.blocked ? 'Blocked' : 'Monitoring'}
                    </span>
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