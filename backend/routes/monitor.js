const express = require('express');
const router = express.Router();
const abuseIPDB = require('../services/abuseIPDB');
const trafficAnalyzer = require('../services/trafficAnalyzer');

// Get current traffic statistics
router.get('/stats', async (req, res) => {
  try {
    const stats = await trafficAnalyzer.getCurrentStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch traffic statistics' });
  }
});

// Check IP reputation
router.post('/check-ip', async (req, res) => {
  try {
    const { ip } = req.body;
    
    if (!ip) {
      return res.status(400).json({ error: 'IP address is required' });
    }

    const reputation = await abuseIPDB.checkIP(ip);
    res.json(reputation);
  } catch (error) {
    res.status(500).json({ error: 'Failed to check IP reputation' });
  }
});

// Get blocked IPs
router.get('/blocked-ips', async (req, res) => {
  try {
    // In a real implementation, this would fetch from database
    const blockedIPs = [
      {
        ip: '185.234.67.89',
        country: 'Russia',
        reason: 'DDoS Attack',
        blocked: new Date(Date.now() - 2 * 60 * 60 * 1000),
        expires: new Date(Date.now() + 22 * 60 * 60 * 1000),
        permanent: false,
        threats: 247,
      }
    ];
    
    res.json(blockedIPs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blocked IPs' });
  }
});

// Block IP address
router.post('/block-ip', async (req, res) => {
  try {
    const { ip, reason, duration } = req.body;
    
    if (!ip || !reason) {
      return res.status(400).json({ error: 'IP and reason are required' });
    }

    // In a real implementation, this would save to database and update firewall rules
    const blockResult = {
      ip,
      reason,
      blocked: new Date(),
      expires: duration ? new Date(Date.now() + duration * 60 * 60 * 1000) : null,
      permanent: !duration,
      success: true
    };

    res.json(blockResult);
  } catch (error) {
    res.status(500).json({ error: 'Failed to block IP address' });
  }
});

// Unblock IP address
router.delete('/block-ip/:ip', async (req, res) => {
  try {
    const { ip } = req.params;
    
    // In a real implementation, this would remove from database and update firewall rules
    res.json({ ip, unblocked: true, timestamp: new Date() });
  } catch (error) {
    res.status(500).json({ error: 'Failed to unblock IP address' });
  }
});

// Get alerts
router.get('/alerts', async (req, res) => {
  try {
    // In a real implementation, this would fetch from database
    const alerts = [
      {
        id: 1,
        type: 'critical',
        title: 'DDoS Attack Detected',
        message: 'High volume of requests from multiple IPs targeting /api/login endpoint',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        source: '185.234.67.89',
        resolved: false,
        action: 'Auto-blocked suspicious IPs',
      }
    ];
    
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch alerts' });
  }
});

// Log port scan attempts
router.post('/log-scan', async (req, res) => {
  try {
    const { type, port, target } = req.body;
    const clientIP = req.headers['x-forwarded-for'] || 
                     req.headers['x-real-ip'] || 
                     req.connection.remoteAddress;

    console.log(`🔍 Port scan detected from ${clientIP}: ${type} on port ${port}`);

    // In a real implementation, this would save to database
    res.json({
      success: true,
      logged: true,
      timestamp: new Date(),
      ip: clientIP,
      scan_type: type,
      port: port
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to log scan attempt' });
  }
});

module.exports = router;