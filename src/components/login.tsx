// src/components/Login.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login: React.FC = () => {
  const { token, login } = useAuth();
  const navigate = useNavigate();
  const [u, setU] = useState('');
  const [p, setP] = useState('');
  const [error, setError] = useState('');

  // Si ya está logueado, redirigir a /panel automáticamente
  useEffect(() => {
    if (token) {
      navigate('/panel');
    }
  }, [token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(u, p);  // realiza login
      navigate('/panel'); // redirige si login OK
    } catch (err) {
      setError('Credenciales inválidas');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-cyan-200 to-teal-300 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Iniciar Sesión</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <div>
            <label className="block text-gray-600">Usuario</label>
            <input
              type="text"
              value={u}
              onChange={(e) => setU(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Ingresa tu usuario"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600">Contraseña</label>
            <input
              type="password"
              value={p}
              onChange={(e) => setP(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Ingresar
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-600">
            ¿No tienes cuenta?{' '}
            <Link
              to="/register"
              className="text-blue-600 hover:underline font-semibold"
            >
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
