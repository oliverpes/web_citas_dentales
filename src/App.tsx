// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Login from './components/login';
import Register from './components/register';
import AdminPanel from './components/AdminPanel';
import ReceptionPanel from './components/ReceptionPanel';
import SuperAdminPanel from './components/SuperAdminPanel';

function ProtectedRoutes() {
  const { token, role } = useAuth();

  if (!token) return <Navigate to="/login" replace />;

  if (role === 'superadmin') return <SuperAdminPanel />;
  if (role === 'admin') return <AdminPanel />;
  if (role === 'recepcionista') return <ReceptionPanel />;

  return <div className="text-center p-4">Rol no reconocido</div>;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/panel" element={<ProtectedRoutes />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
