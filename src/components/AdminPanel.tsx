// src/components/AdminPanel.tsx
import React, { useEffect, useState } from 'react';
import { api } from '../Api';
import { useAuth } from '../AuthContext';

interface User { id: number; username: string; role: string; }

const AdminPanel: React.FC = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [nuser, setNuser] = useState('');
  const [npass, setNpass] = useState('');
  const [nrole, setNrole] = useState<'admin'|'recepcionista'>('recepcionista');

  const fetchUsers = async () => {
    const res = await api.get('/users', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setUsers(res.data);
  };

  const create = async () => {
    await api.post('/auth/register', { username: nuser, password: npass, role: nrole });
    setNuser(''); setNpass(''); fetchUsers();
  };

  useEffect(() => { fetchUsers(); }, []);

  return (
    <div>
      <h2>Admin Panel</h2>
      <h3>Crear Usuario</h3>
      <input value={nuser} onChange={e => setNuser(e.target.value)} placeholder="Usuario" />
      <input type="password" value={npass} onChange={e => setNpass(e.target.value)} placeholder="Contraseña" />
      <select value={nrole} onChange={e => setNrole(e.target.value as any)}>
        <option value="admin">Admin</option>
        <option value="recepcionista">Recepcionista</option>
      </select>
      <button onClick={create}>Crear</button>
      <h3>Usuarios registrados:</h3>
      <ul>{users.map(u => (
        <li key={u.id}>{u.username} ({u.role})</li>
      ))}</ul>
    </div>
  );
};

export default AdminPanel;
