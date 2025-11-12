import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
  try {
    const res = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error('Login failed');

    const data = await res.json();
    const token = data.token;

    // Decode or store user info if returned
    const user: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      role: email.includes('admin') ? 'admin' : 'user',
    };

    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    setUser(user);
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};


  const register = async (email: string, password: string, name: string) => {
  try {
    const res = await fetch('http://localhost:8080/api/auth/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        password,
        confirmPassword: password,
      }),
    });
    
    if (!res.ok) throw new Error('Registration failed');

    const data = await res.json();

    const user: User = {
      id: Date.now().toString(),
      email,
      name,
      role: 'user',
    };

    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);

    return data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
