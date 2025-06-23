// src/components/ReceptionPanel.tsx
import React, { useEffect, useState } from 'react';
import { api } from '../Api';
import { useAuth } from '../AuthContext';
import CitaList from './CitaList';

interface Cita { id: number; paciente: string; fecha: string; motivo: string; }

const ReceptionPanel: React.FC = () => {
  const { token } = useAuth();
  const [citas, setCitas] = useState<Cita[]>([]);
  const [paciente, setPaciente] = useState('');
  const [fecha, setFecha] = useState('');
  const [motivo, setMotivo] = useState('');

  const fetchCitas = async () => {
    const res = await api.get('/api/citas');
    setCitas(res.data);
  };

  const create = async () => {
    const res = await api.post('/api/citas', { paciente, fecha, motivo });
    setCitas(prev => [...prev, res.data]);
    setPaciente(''); setFecha(''); setMotivo('');
  };

  const remove = async (id: number) => {
    await api.delete(`/api/citas/${id}`);
    setCitas(prev => prev.filter(c => c.id !== id));
  };

  useEffect(() => { fetchCitas(); }, []);

  return (
    <div>
      <h2>Recepcionista Panel</h2>
      <CitaList citas={citas} onDelete={remove} />
      <h3>Crear nueva cita</h3>
      <input value={paciente} onChange={e => setPaciente(e.target.value)} placeholder="Paciente" />
      <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} />
      <input value={motivo} onChange={e => setMotivo(e.target.value)} placeholder="Motivo" />
      <button onClick={create}>Crear</button>
    </div>
  );
};

export default ReceptionPanel;
