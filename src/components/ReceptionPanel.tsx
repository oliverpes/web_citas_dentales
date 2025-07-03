import React, { useEffect, useState } from 'react';
import { api } from '../Api';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

interface Cita {
  id: number;
  paciente: string;
  fecha: string;
  motivo: string;
}

const ReceptionPanel: React.FC = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [citas, setCitas] = useState<Cita[]>([]);
  const [paciente, setPaciente] = useState('');
  const [fecha, setFecha] = useState('');
  const [motivo, setMotivo] = useState('');

  // Obtener todas las citas
  const fetchCitas = async () => {
    const res = await api.get('/api/citas', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCitas(res.data);
  };

  // Crear nueva cita
  const create = async () => {
    const res = await api.post(
      '/api/citas',
      { paciente, fecha, motivo },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setCitas(prev => [...prev, res.data]);
    setPaciente('');
    setFecha('');
    setMotivo('');
  };

  // Eliminar cita
  const remove = async (id: number) => {
    await api.delete(`/api/citas/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCitas(prev => prev.filter(c => c.id !== id));
  };

  useEffect(() => {
    fetchCitas();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 to-cyan-200 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-700">Panel de Recepcionista</h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Cerrar sesión
          </button>
        </div>

        <h3 className="text-xl font-semibold text-gray-700 mb-4">Crear nueva cita</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input
            value={paciente}
            onChange={e => setPaciente(e.target.value)}
            placeholder="Nombre del paciente"
            className="p-3 border rounded shadow-sm"
          />
          <input
            type="date"
            value={fecha}
            onChange={e => setFecha(e.target.value)}
            className="p-3 border rounded shadow-sm"
          />
          <input
            value={motivo}
            onChange={e => setMotivo(e.target.value)}
            placeholder="Motivo de la cita"
            className="p-3 border rounded shadow-sm"
          />
        </div>
        <button
          onClick={create}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Agendar cita
        </button>

        <h3 className="text-xl font-semibold text-gray-700 mt-10 mb-4">Citas agendadas</h3>
        {citas.length === 0 ? (
          <p className="text-gray-500">No hay citas registradas aún.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {citas.map(cita => (
              <div
                key={cita.id}
                className="bg-white border-l-4 border-blue-400 shadow p-4 rounded-lg relative"
              >
                <button
                  onClick={() => remove(cita.id)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm"
                >
                  ✕
                </button>
                <p className="text-sm text-gray-500">Fecha: <strong>{cita.fecha}</strong></p>
                <p className="text-lg font-semibold text-blue-700">{cita.paciente}</p>
                <p className="text-gray-700">Motivo: {cita.motivo}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReceptionPanel;
