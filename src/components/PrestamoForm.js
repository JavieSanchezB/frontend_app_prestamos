// src/components/PrestamoForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const PrestamoForm = ({ prestamo, onClose }) => {
  const [clientes, setClientes] = useState([]);
  const [id_cliente, setIdCliente] = useState(prestamo ? prestamo.id_cliente : '');
  const [fecha_prestamo, setFechaPrestamo] = useState(prestamo ? new Date(prestamo.fecha_prestamo) : new Date());
  const [fecha_pago, setFechaPago] = useState(prestamo ? new Date(prestamo.fecha_pago) : new Date());
  const [interes, setInteres] = useState(prestamo ? prestamo.interes : '');

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/clientes');
        setClientes(response.data);
      } catch (error) {
        console.error('Error al obtener clientes', error);
      }
    };
    fetchClientes();
  }, []);

  useEffect(() => {
    if (fecha_prestamo) {
      const newFechaPago = new Date(fecha_prestamo);
      newFechaPago.setDate(newFechaPago.getDate() + 30);
      setFechaPago(newFechaPago);
    }
  }, [fecha_prestamo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      id_cliente,
      fecha_prestamo: fecha_prestamo.toISOString().split('T')[0],
      fecha_pago: fecha_pago.toISOString().split('T')[0],
      interes,
    };
    try {
      if (prestamo) {
        await axios.put(`http://localhost:5001/prestamos/${prestamo.id_prestamo}`, data);
      } else {
        await axios.post('http://localhost:5001/prestamos', data);
      }
      onClose();
    } catch (error) {
      console.error('Error al guardar el préstamo', error);
    }
  };

  return (
    <div>
      <h2>{prestamo ? 'Editar Préstamo' : 'Agregar Préstamo'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Cliente:
          <select value={id_cliente} onChange={(e) => setIdCliente(e.target.value)} required>
            <option value="">Seleccionar cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.id_cliente} value={cliente.id_cliente}>
                {cliente.nombres} {cliente.apellidos}
              </option>
            ))}
          </select>
        </label>
        <label>
          Fecha de Préstamo:
          <DatePicker selected={fecha_prestamo} onChange={(date) => setFechaPrestamo(date)} required />
        </label>
        <label>
          Fecha de Pago:
          <DatePicker selected={fecha_pago} onChange={(date) => setFechaPago(date)} readOnly />
        </label>
        <label>
          Interés (%):
          <input type="number" value={interes} onChange={(e) => setInteres(e.target.value)} required />
        </label>
        <button type="submit">Guardar</button>
        <button type="button" onClick={onClose}>Cancelar</button>
      </form>
    </div>
  );
};

export default PrestamoForm;
