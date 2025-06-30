// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Login from './components/Login';
import Register from './components/register';
import AdminPanel from './components/AdminPanel';
import ReceptionPanel from './components/ReceptionPanel';

function ProtectedRoutes() {
  const { token, role } = useAuth();

  if (!token) return <Navigate to="/login" replace />;

  if (role === 'admin') return <AdminPanel />;
  return <ReceptionPanel />;
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
