import React, { useState } from 'react';
import { Zap, Shield, AlertTriangle, Target, Activity } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { cn } from '../utils/cn';

export default function AttackSimulator() {
  const [isAttacking, setIsAttacking] = useState(false);
  const [attackType, setAttackType] = useState<string | null>(null);
  const [attackCount, setAttackCount] = useState(0);

  const sendDdosAttack = async () => {
    setIsAttacking(true);
    setAttackType('DDoS');
    setAttackCount(0);
    
    toast.loading('🚨 Launching DDoS attack simulation...', { id: 'ddos-attack' });

    try {
      // Send 100 rapid requests to simulate DDoS
      const promises = [];
      for (let i = 0; i < 100; i++) {
        const promise = fetch('/api/monitor/stats', {
          method: 'GET',
          headers: {
            'X-Forwarded-For': `185.234.67.${Math.floor(Math.random() * 255)}`,
            'X-Real-IP': `185.234.67.${Math.floor(Math.random() * 255)}`,
            'User-Agent': 'AttackBot/1.0'
          }
        }).then(() => {
          setAttackCount(prev => prev + 1);
        });
        promises.push(promise);
        
        // Small delay between requests
        if (i % 10 === 0) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
      
      await Promise.all(promises);
      toast.success('✅ DDoS attack simulation completed!', { id: 'ddos-attack' });
    } catch (error) {
      console.error('DDoS simulation error:', error);
      toast.error('❌ DDoS simulation failed', { id: 'ddos-attack' });
    } finally {
      setIsAttacking(false);
      setAttackType(null);
      setTimeout(() => setAttackCount(0), 3000);
    }
  };

  const sendBruteForceAttack = async () => {
    setIsAttacking(true);
    setAttackType('Brute Force');
    setAttackCount(0);
    
    toast.loading('🔐 Launching brute force attack simulation...', { id: 'brute-force' });

    const passwords = ['123456', 'password', 'admin', 'root', 'qwerty', 'letmein'];
    
    try {
      for (let i = 0; i < 50; i++) {
        await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Forwarded-For': '123.45.67.89',
            'X-Real-IP': '123.45.67.89',
          },
          body: JSON.stringify({
            username: 'admin',
            password: passwords[i % passwords.length]
          })
        });
        
        setAttackCount(prev => prev + 1);
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      toast.success('✅ Brute force simulation completed!', { id: 'brute-force' });
    } catch (error) {
      console.error('Brute force simulation error:', error);
      toast.error('❌ Brute force simulation failed', { id: 'brute-force' });
    } finally {
      setIsAttacking(false);
      setAttackType(null);
      setTimeout(() => setAttackCount(0), 3000);
    }
  };

  const sendPortScanAttack = async () => {
    setIsAttacking(true);
    setAttackType('Port Scan');
    setAttackCount(0);
    
    toast.loading('🔍 Launching port scan simulation...', { id: 'port-scan' });

    const ports = [21, 22, 23, 25, 53, 80, 110, 143, 443, 993, 995, 3000, 3306, 5000];
    
    try {
      for (let i = 0; i < ports.length; i++) {
        await fetch('/api/monitor/log-scan', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Forwarded-For': '78.123.45.67',
            'X-Real-IP': '78.123.45.67',
            'User-Agent': 'nmap/7.80'
          },
          body: JSON.stringify({
            type: 'port_scan',
            port: ports[i],
            target: 'localhost'
          })
        });
        
        setAttackCount(prev => prev + 1);
        await new Promise(resolve => setTimeout(resolve, 300));
      }
      toast.success('✅ Port scan simulation completed!', { id: 'port-scan' });
    } catch (error) {
      console.error('Port scan simulation error:', error);
      toast.error('❌ Port scan simulation failed', { id: 'port-scan' });
    } finally {
      setIsAttacking(false);
      setAttackType(null);
      setTimeout(() => setAttackCount(0), 3000);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white flex items-center">
          <Target className="w-6 h-6 mr-2 text-danger-400" />
          Attack Simulator
        </h3>
        {isAttacking && (
          <div className="flex items-center space-x-2 bg-danger-500/10 px-3 py-1 rounded-full">
            <Activity className="w-4 h-4 text-danger-400 animate-pulse" />
            <span className="text-danger-400 text-sm font-medium">
              {attackType}: {attackCount} requests
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={sendDdosAttack}
          disabled={isAttacking}
          className={cn(
            'flex flex-col items-center space-y-3 p-6 rounded-lg border-2 transition-all duration-200',
            isAttacking && attackType === 'DDoS'
              ? 'border-danger-500 bg-danger-500/10'
              : 'border-danger-500/30 bg-danger-500/5 hover:border-danger-500/50 hover:bg-danger-500/10',
            isAttacking && attackType !== 'DDoS' ? 'opacity-50 cursor-not-allowed' : ''
          )}
        >
          <div className="p-3 bg-danger-500/20 rounded-lg">
            <Zap className="w-8 h-8 text-danger-400" />
          </div>
          <div className="text-center">
            <h4 className="text-white font-semibold">DDoS Attack</h4>
            <p className="text-gray-400 text-sm">100 rapid requests</p>
          </div>
          {isAttacking && attackType === 'DDoS' && (
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-danger-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${attackCount}%` }}
              ></div>
            </div>
          )}
        </button>

        <button
          onClick={sendBruteForceAttack}
          disabled={isAttacking}
          className={cn(
            'flex flex-col items-center space-y-3 p-6 rounded-lg border-2 transition-all duration-200',
            isAttacking && attackType === 'Brute Force'
              ? 'border-warning-500 bg-warning-500/10'
              : 'border-warning-500/30 bg-warning-500/5 hover:border-warning-500/50 hover:bg-warning-500/10',
            isAttacking && attackType !== 'Brute Force' ? 'opacity-50 cursor-not-allowed' : ''
          )}
        >
          <div className="p-3 bg-warning-500/20 rounded-lg">
            <Shield className="w-8 h-8 text-warning-400" />
          </div>
          <div className="text-center">
            <h4 className="text-white font-semibold">Brute Force</h4>
            <p className="text-gray-400 text-sm">50 login attempts</p>
          </div>
          {isAttacking && attackType === 'Brute Force' && (
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-warning-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(attackCount / 50) * 100}%` }}
              ></div>
            </div>
          )}
        </button>

        <button
          onClick={sendPortScanAttack}
          disabled={isAttacking}
          className={cn(
            'flex flex-col items-center space-y-3 p-6 rounded-lg border-2 transition-all duration-200',
            isAttacking && attackType === 'Port Scan'
              ? 'border-cyber-500 bg-cyber-500/10'
              : 'border-cyber-500/30 bg-cyber-500/5 hover:border-cyber-500/50 hover:bg-cyber-500/10',
            isAttacking && attackType !== 'Port Scan' ? 'opacity-50 cursor-not-allowed' : ''
          )}
        >
          <div className="p-3 bg-cyber-500/20 rounded-lg">
            <AlertTriangle className="w-8 h-8 text-cyber-400" />
          </div>
          <div className="text-center">
            <h4 className="text-white font-semibold">Port Scan</h4>
            <p className="text-gray-400 text-sm">14 port probes</p>
          </div>
          {isAttacking && attackType === 'Port Scan' && (
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-cyber-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(attackCount / 14) * 100}%` }}
              ></div>
            </div>
          )}
        </button>
      </div>

      <div className="mt-6 p-4 bg-gray-700/50 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <AlertTriangle className="w-5 h-5 text-warning-400" />
          <span className="text-warning-400 font-medium">Live Attack Simulation</span>
        </div>
        <p className="text-gray-400 text-sm">
          Rakshak.AI detects 15+ attack types including DDoS, brute force, SQL injection, XSS, and more. 
          These simulations demonstrate real-time threat detection with immediate dashboard alerts and automated blocking.
        </p>
        <div className="mt-2 flex flex-wrap gap-2 text-xs">
          <span className="px-2 py-1 bg-danger-500/20 text-danger-400 rounded">DDoS Detection</span>
          <span className="px-2 py-1 bg-warning-500/20 text-warning-400 rounded">Brute Force</span>
          <span className="px-2 py-1 bg-cyber-500/20 text-cyber-400 rounded">Port Scanning</span>
          <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded">Bot Detection</span>
        </div>
      </div>
    </div>
  );
}