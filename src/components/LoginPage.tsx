import React, { useState } from 'react';
import { Shield, User, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [selectedDemo, setSelectedDemo] = useState('admin');
  const [showDemoCredentials, setShowDemoCredentials] = useState(false);
  const { login, loading } = useAuth();

  const demoAccounts = [
    { username: 'admin', password: 'admin123', role: 'Admin', description: 'Full access to all features' },
    { username: 'security', password: 'security123', role: 'Security Admin', description: 'Security operations and management' },
    { username: 'analyst', password: 'analyst123', role: 'Security Analyst', description: 'View dashboard and alerts' },
    { username: 'viewer', password: 'viewer123', role: 'Viewer', description: 'Read-only dashboard access' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    const success = await login(username, password);
    if (!success) {
      setError('Invalid username or password');
    }
  };

  const handleDemoLogin = (account: typeof demoAccounts[0]) => {
    setUsername(account.username);
    setPassword(account.password);
    setSelectedDemo(account.username);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="w-12 h-12 text-cyber-400" />
            <h1 className="text-4xl font-bold text-white">Rakshak.AI</h1>
          </div>
          <h2 className="text-xl text-gray-300">Cybersecurity Command Center</h2>
          <p className="text-gray-400 mt-2">Secure login to access threat monitoring dashboard</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-xl border border-gray-700 space-y-6">
          {error && (
            <div className="bg-danger-500/10 border border-danger-500/30 rounded-lg p-3 flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-danger-400" />
              <span className="text-danger-400 text-sm">{error}</span>
            </div>
          )}

          <div>
            <label className="block text-gray-400 text-sm font-medium mb-2">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyber-500 focus:border-transparent"
                placeholder="Enter your username"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-400 text-sm font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyber-500 focus:border-transparent"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyber-600 hover:bg-cyber-700 disabled:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <Shield className="w-5 h-5" />
                <span>Access Dashboard</span>
              </>
            )}
          </button>
        </form>

        {/* Demo Credentials Tab */}
        <div className="text-center">
          <button
            onClick={() => setShowDemoCredentials(!showDemoCredentials)}
            className="text-cyber-400 hover:text-cyber-300 text-sm underline transition-colors duration-200"
          >
            {showDemoCredentials ? 'Hide' : 'Show'} Demo Credentials
          </button>
          
          {showDemoCredentials && (
            <div className="mt-4 bg-gray-800 p-4 rounded-lg border border-gray-700 animate-slide-up">
              <div className="grid grid-cols-2 gap-3 text-xs">
                {demoAccounts.map((account) => (
                  <button
                    key={account.username}
                    onClick={() => handleDemoLogin(account)}
                    className="text-left p-2 bg-gray-700 hover:bg-gray-600 rounded border border-gray-600 transition-colors duration-200"
                  >
                    <p className="text-white font-medium text-sm">{account.role}</p>
                    <p className="text-cyber-400">{account.username}/{account.password}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Security Notice */}
        <div className="text-center text-gray-400 text-sm">
          <p>🔒 Secure authentication with role-based access control</p>
          <p className="mt-1">This is a demonstration environment with mock credentials</p>
        </div>
      </div>
    </div>
  );
}