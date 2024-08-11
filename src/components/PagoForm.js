// src/components/PagoForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const PagoForm = ({ pago, onClose }) => {
  const [prestamos, setPrestamos] = useState([]);
  const [id_prestamo, setIdPrestamo] = useState(pago ? pago.id_prestamo : '');
  const [monto, setMonto] = useState(pago ? pago.monto : '');
  const [fecha_pago, setFechaPago] = useState(pago ? new Date(pago.fecha_pago) : new Date());

  useEffect(() => {
    const fetchPrestamos = async () => {
      try {
        const response = await axios.get('http://localhost:5001/prestamos');
        setPrestamos(response.data);
      } catch (error) {
        console.error('Error al obtener préstamos', error);
      }
    };
    fetchPrestamos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      id_prestamo,
      monto,
      fecha_pago: fecha_pago.toISOString().split('T')[0],
    };
    try {
      if (pago) {
        await axios.put(`http://localhost:5000/pagos/${pago.id_pago}`, data);
      } else {
        await axios.post('http://localhost:5000/pagos', data);
      }
      onClose();
    } catch (error) {
      console.error('Error al guardar el pago', error);
    }
  };

  return (
    <div>
      <h2>{pago ? 'Editar Pago' : 'Agregar Pago'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Préstamo:
          <select value={id_prestamo} onChange={(e) => setIdPrestamo(e.target.value)} required>
            <option value="">Seleccionar préstamo</option>
            {prestamos.map((prestamo) => (
              <option key={prestamo.id_prestamo} value={prestamo.id_prestamo}>
                {prestamo.id_prestamo} - {prestamo.fecha_prestamo} (Cliente: {prestamo.id_cliente})
              </option>
            ))}
          </select>
        </label>
        <label>
          Monto:
          <input type="number" value={monto} onChange={(e) => setMonto(e.target.value)} required />
        </label>
        <label>
          Fecha de Pago:
          <DatePicker selected={fecha_pago} onChange={(date) => setFechaPago(date)} required />
        </label>
        <button type="submit">Guardar</button>
        <button type="button" onClick={onClose}>Cancelar</button>
      </form>
    </div>
  );
};

export default PagoForm;
