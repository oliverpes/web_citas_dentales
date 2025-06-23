// src/App.tsx
import React from 'react';
import { AuthProvider, useAuth } from './AuthContext';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';
import ReceptionPanel from './components/ReceptionPanel';

function Main() {
  const { token, role } = useAuth();

  if (!token) return <Login />;
  if (role === 'admin') return <AdminPanel />;
  return <ReceptionPanel />;
}

export default function App() {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
}
