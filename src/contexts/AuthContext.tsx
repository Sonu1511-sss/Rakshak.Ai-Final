import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
  permissions: string[];
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    email: 'admin@rakshak.ai',
    role: 'admin' as const,
    permissions: ['view_dashboard', 'manage_ips', 'view_alerts', 'manage_settings', 'view_logs']
  },
  {
    id: '2',
    username: 'security',
    password: 'security123',
    email: 'security@rakshak.ai',
    role: 'admin' as const,
    permissions: ['view_dashboard', 'manage_ips', 'view_alerts', 'manage_settings', 'view_logs']
  },
  {
    id: '3',
    username: 'analyst',
    password: 'analyst123',
    email: 'analyst@rakshak.ai',
    role: 'user' as const,
    permissions: ['view_dashboard', 'view_alerts', 'view_logs']
  },
  {
    id: '4',
    username: 'viewer',
    password: 'viewer123',
    email: 'viewer@rakshak.ai',
    role: 'user' as const,
    permissions: ['view_dashboard', 'view_alerts']
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth token on app load
    const token = localStorage.getItem('rakshak_token');
    const userData = localStorage.getItem('rakshak_user');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        localStorage.removeItem('rakshak_token');
        localStorage.removeItem('rakshak_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.username === username && u.password === password);
    
    if (foundUser) {
      const userWithoutPassword = {
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email,
        role: foundUser.role,
        permissions: foundUser.permissions
      };
      
      // Generate mock JWT token
      const token = `mock_jwt_${foundUser.id}_${Date.now()}`;
      
      localStorage.setItem('rakshak_token', token);
      localStorage.setItem('rakshak_user', JSON.stringify(userWithoutPassword));
      
      setUser(userWithoutPassword);
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };

  const logout = () => {
    localStorage.removeItem('rakshak_token');
    localStorage.removeItem('rakshak_user');
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}