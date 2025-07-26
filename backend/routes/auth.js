const express = require('express');
const bcrypt = require('bcryptjs');
const { generateToken, findUserByUsername } = require('../middleware/auth');
const router = express.Router();

// Login endpoint
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const clientIP = req.headers['x-forwarded-for'] || 
                   req.headers['x-real-ip'] || 
                   req.connection.remoteAddress;

  console.log(`🔓 Login attempt from ${clientIP}: ${username}`);

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Username and password are required'
    });
  }

  const user = findUserByUsername(username);
  
  // For demo purposes, use simple password comparison
  // In production, use bcrypt.compare(password, user.password)
  const validPasswords = {
    'admin': 'admin123',
    'security': 'security123',
    'analyst': 'analyst123',
    'viewer': 'viewer123'
  };

  if (user && validPasswords[username] === password) {
    const token = generateToken(user);
    
    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        permissions: user.permissions
      }
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid credentials',
      timestamp: new Date().toISOString(),
      ip: clientIP
    });
  }
});

// Simulate registration endpoint
router.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  const clientIP = req.headers['x-forwarded-for'] || 
                   req.headers['x-real-ip'] || 
                   req.connection.remoteAddress;

  console.log(`📝 Registration attempt from ${clientIP}: ${username}`);

  res.status(400).json({
    success: false,
    message: 'Registration temporarily disabled',
    timestamp: new Date().toISOString(),
    ip: clientIP
  });
});

// Logout endpoint
router.post('/logout', (req, res) => {
  // In a real app, you might blacklist the token
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

// Get current user info
router.get('/me', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  // For demo purposes, return mock user data
  res.json({
    success: true,
    user: {
      id: '1',
      username: 'demo_user',
      email: 'demo@rakshak.ai',
      role: 'admin',
      permissions: ['view_dashboard', 'manage_ips', 'view_alerts', 'manage_settings']
    }
  });
});
module.exports = router;