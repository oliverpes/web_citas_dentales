// src/components/Login.tsx
import React, { useState } from 'react';
import { useAuth } from '../AuthContext';

const Login: React.FC = () => {
  const { login } = useAuth();
  const [u, setU] = useState('');
  const [p, setP] = useState('');
  const [error, setError] = useState('');

  const handle = async () => {
    try {
      await login(u, p);
    } catch {
      setError('Credenciales inválidas');
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <input value={u} onChange={e => setU(e.target.value)} placeholder="Usuario" />
      <input type="password" value={p} onChange={e => setP(e.target.value)} placeholder="Contraseña" />
      <button onClick={handle}>Entrar</button>
      {error && <p style={{color:'red'}}>{error}</p>}
    </div>
  );
};

export default Login;
