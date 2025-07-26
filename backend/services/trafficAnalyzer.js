const EventEmitter = require('events');

class TrafficAnalyzer extends EventEmitter {
  constructor() {
    super();
    this.stats = {
      totalRequests: 0,
      normalTraffic: 0,
      suspiciousTraffic: 0,
      blockedTraffic: 0,
      peakRPS: 0,
      currentRPS: 0,
      anomaliesDetected: 0
    };
    
    this.isAnalyzing = false;
    this.io = null;
  }

  startAnalysis(io) {
    this.io = io;
    this.isAnalyzing = true;
    
    console.log('🔍 Starting traffic analysis...');
    
    // Simulate real-time traffic analysis
    this.analysisInterval = setInterval(() => {
      this.analyzeTraffic();
    }, 2000);

    // Simulate anomaly detection
    this.anomalyInterval = setInterval(() => {
      this.detectAnomalies();
    }, 30000);
  }

  stopAnalysis() {
    this.isAnalyzing = false;
    
    if (this.analysisInterval) {
      clearInterval(this.analysisInterval);
    }
    
    if (this.anomalyInterval) {
      clearInterval(this.anomalyInterval);
    }
    
    console.log('⏹️ Traffic analysis stopped');
  }

  analyzeTraffic() {
    // Simulate traffic analysis with random data
    const normalTraffic = Math.floor(Math.random() * 1000) + 500;
    const suspiciousTraffic = Math.floor(Math.random() * 200) + 10;
    const blockedTraffic = Math.floor(Math.random() * 50) + 5;
    
    this.stats.normalTraffic = normalTraffic;
    this.stats.suspiciousTraffic = suspiciousTraffic;
    this.stats.blockedTraffic = blockedTraffic;
    this.stats.currentRPS = normalTraffic + suspiciousTraffic;
    this.stats.totalRequests += this.stats.currentRPS;
    
    if (this.stats.currentRPS > this.stats.peakRPS) {
      this.stats.peakRPS = this.stats.currentRPS;
    }

    // Emit real-time data to connected clients
    if (this.io) {
      this.io.emit('traffic-update', {
        timestamp: new Date(),
        stats: this.stats,
        traffic: {
          normal: normalTraffic,
          suspicious: suspiciousTraffic,
          blocked: blockedTraffic
        }
      });
    }

    this.emit('traffic-analyzed', this.stats);
  }

  detectAnomalies() {
    // Simulate anomaly detection
    const anomalyChance = Math.random();
    
    if (anomalyChance > 0.7) {
      this.stats.anomaliesDetected++;
      
      const anomaly = {
        type: anomalyChance > 0.9 ? 'critical' : 'warning',
        description: this.generateAnomalyDescription(),
        timestamp: new Date(),
        source: this.generateRandomIP(),
        confidence: Math.floor(Math.random() * 30) + 70
      };

      if (this.io) {
        this.io.emit('anomaly-detected', anomaly);
      }

      this.emit('anomaly-detected', anomaly);
      console.log(`🚨 Anomaly detected: ${anomaly.description}`);
    }
  }

  generateAnomalyDescription() {
    const descriptions = [
      'Unusual traffic spike detected',
      'Potential DDoS attack pattern',
      'Brute force attack on login endpoint',
      'Suspicious bot activity detected',
      'Multiple failed authentication attempts',
      'Unusual geographic traffic distribution',
      'Port scanning activity detected'
    ];
    
    return descriptions[Math.floor(Math.random() * descriptions.length)];
  }

  generateRandomIP() {
    return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
  }

  async getCurrentStats() {
    return {
      ...this.stats,
      timestamp: new Date(),
      analyzing: this.isAnalyzing
    };
  }
}

module.exports = new TrafficAnalyzer();