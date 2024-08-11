// src/components/ClienteForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClienteForm = ({ cliente, onClose }) => {
  const [cedula, setCedula] = useState(cliente ? cliente.cedula : '');
  const [nombres, setNombres] = useState(cliente ? cliente.nombres : '');
  const [apellidos, setApellidos] = useState(cliente ? cliente.apellidos : '');
  const [alias, setAlias] = useState(cliente ? cliente.alias : '');
  const [celular, setCelular] = useState(cliente ? cliente.celular : '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { cedula, nombres, apellidos, alias, celular };
    try {
      if (cliente) {
        // Editar cliente existente
        await axios.put(`http://localhost:5001/clientes/${cliente.id_cliente}`, data);
      } else {
        // Crear nuevo cliente
        await axios.post('http://localhost:5001/clientes', data);
      }
      onClose();
    } catch (error) {
      console.error('Error al guardar el cliente', error);
    }
  };

  return (
    <div>
      <h2>{cliente ? 'Editar Cliente' : 'Agregar Cliente'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Cédula:
          <input type="text" value={cedula} onChange={(e) => setCedula(e.target.value)} required />
        </label>
        <label>
          Nombres:
          <input type="text" value={nombres} onChange={(e) => setNombres(e.target.value)} required />
        </label>
        <label>
          Apellidos:
          <input type="text" value={apellidos} onChange={(e) => setApellidos(e.target.value)} required />
        </label>
        <label>
          Alias:
          <input type="text" value={alias} onChange={(e) => setAlias(e.target.value)} required />
        </label>
        <label>
          Celular:
          <input type="text" value={celular} onChange={(e) => setCelular(e.target.value)} required />
        </label>
        <button type="submit">Guardar</button>
        <button type="button" onClick={onClose}>Cancelar</button>
      </form>
    </div>
  );
};

export default ClienteForm;
