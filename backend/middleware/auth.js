const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'rakshak_ai_secret_key_2024';

// Mock users database
const users = [
  {
    id: '1',
    username: 'admin',
    password: '$2b$10$rQZ9vXqZ9vXqZ9vXqZ9vXO', // hashed 'admin123'
    email: 'admin@rakshak.ai',
    role: 'admin',
    permissions: ['view_dashboard', 'manage_ips', 'view_alerts', 'manage_settings', 'view_logs', 'manage_users']
  },
  {
    id: '2',
    username: 'security',
    password: '$2b$10$sQZ9vXqZ9vXqZ9vXqZ9vXO', // hashed 'security123'
    email: 'security@rakshak.ai',
    role: 'admin',
    permissions: ['view_dashboard', 'manage_ips', 'view_alerts', 'manage_settings', 'view_logs']
  },
  {
    id: '3',
    username: 'analyst',
    password: '$2b$10$tQZ9vXqZ9vXqZ9vXqZ9vXO', // hashed 'analyst123'
    email: 'analyst@rakshak.ai',
    role: 'user',
    permissions: ['view_dashboard', 'view_alerts', 'view_logs']
  },
  {
    id: '4',
    username: 'viewer',
    password: '$2b$10$uQZ9vXqZ9vXqZ9vXqZ9vXO', // hashed 'viewer123'
    email: 'viewer@rakshak.ai',
    role: 'user',
    permissions: ['view_dashboard', 'view_alerts']
  }
];

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Authorization middleware
const requirePermission = (permission) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (!req.user.permissions.includes(permission)) {
      return res.status(403).json({ error: `Permission '${permission}' required` });
    }

    next();
  };
};

// Admin only middleware
const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Administrator privileges required' });
  }

  next();
};

// Generate JWT token
const generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
    permissions: user.permissions
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
};

// Find user by username
const findUserByUsername = (username) => {
  return users.find(user => user.username === username);
};

// Find user by ID
const findUserById = (id) => {
  return users.find(user => user.id === id);
};

module.exports = {
  authenticateToken,
  requirePermission,
  requireAdmin,
  generateToken,
  findUserByUsername,
  findUserById,
  users
};