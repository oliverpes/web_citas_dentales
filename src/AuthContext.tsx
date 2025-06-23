import React, { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';
import { api } from './Api';


interface AuthContextType {
  token: string | null;
  role: 'admin' | 'recepcionista' | null;
  login: (username: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<'admin' | 'recepcionista' | null>(null);

  const login = async (username: string, password: string): Promise<void> => {
    const res = await api.post('/auth/login', { username, password });
    setToken(res.data.token);
    setRole(res.data.user.role);
  };

  return (
    <AuthContext.Provider value={{ token, role, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}
