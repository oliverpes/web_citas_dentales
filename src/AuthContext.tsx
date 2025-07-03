// src/AuthContext.tsx
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  type ReactNode,
} from 'react';
import { api } from './Api';

// Tipado del contexto
interface AuthContextType {
  token: string | null;
  role: 'admin' | 'recepcionista' | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

// Crear contexto con tipo indefinido inicialmente
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Componente proveedor del contexto de autenticación
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const [role, setRole] = useState<'admin' | 'recepcionista' | null>(() => {
    const storedRole = localStorage.getItem('role');
    return storedRole === 'admin' || storedRole === 'recepcionista' ? storedRole : null;
  });

  // Guardar token en localStorage si cambia
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  // Guardar role en localStorage si cambia
  useEffect(() => {
    if (role) {
      localStorage.setItem('role', role);
    } else {
      localStorage.removeItem('role');
    }
  }, [role]);

  // Función para iniciar sesión
  const login = async (username: string, password: string): Promise<void> => {
    const res = await api.post('/auth/login', { username, password });

    // Guarda token y rol en estado y localStorage
    setToken(res.data.token);
    setRole(res.data.user.role);
  };

  // Función para cerrar sesión
  const logout = (): void => {
    setToken(null);
    setRole(null);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  };

  // Proveer valores del contexto
  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para consumir el contexto de auth
export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}
