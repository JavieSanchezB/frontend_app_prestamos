// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClientesTable from './components/ClientesTable';
import PrestamosTable from './components/PrestamosTable';
import PagosTable from './components/PagosTable';
import ClienteForm from './components/ClienteForm';
import PrestamoForm from './components/PrestamoForm';
import PagoForm from './components/PagoForm';

function App() {
  const [clientes, setClientes] = useState([]);
  const [prestamos, setPrestamos] = useState([]);
  const [pagos, setPagos] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [selectedPrestamo, setSelectedPrestamo] = useState(null);
  const [selectedPago, setSelectedPago] = useState(null);
  const [showClienteForm, setShowClienteForm] = useState(false);
  const [showPrestamoForm, setShowPrestamoForm] = useState(false);
  const [showPagoForm, setShowPagoForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientesRes, prestamosRes, pagosRes] = await Promise.all([
          axios.get('http://localhost:5001/clientes'),
          axios.get('http://localhost:5001/prestamos'),
          axios.get('http://localhost:5001/pagos'),
        ]);
        setClientes(clientesRes.data);
        setPrestamos(prestamosRes.data);
        setPagos(pagosRes.data);
      } catch (error) {
        console.error('Error al obtener datos', error);
      }
    };
    fetchData();
  }, []);

  const handleAddCliente = () => {
    setSelectedCliente(null);
    setShowClienteForm(true);
  };

  const handleEditCliente = (cliente) => {
    setSelectedCliente(cliente);
    setShowClienteForm(true);
  };

  const handleDeleteCliente = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/clientes/${id}`);
      setClientes(clientes.filter(cliente => cliente.id_cliente !== id));
    } catch (error) {
      console.error('Error al eliminar cliente', error);
    }
  };

  const handleAddPrestamo = () => {
    setSelectedPrestamo(null);
    setShowPrestamoForm(true);
  };

  const handleEditPrestamo = (prestamo) => {
    setSelectedPrestamo(prestamo);
    setShowPrestamoForm(true);
  };

  const handleDeletePrestamo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/prestamos/${id}`);
      setPrestamos(prestamos.filter(prestamo => prestamo.id_prestamo !== id));
    } catch (error) {
      console.error('Error al eliminar préstamo', error);
    }
  };

  const handleAddPago = () => {
    setSelectedPago(null);
    setShowPagoForm(true);
  };

  const handleEditPago = (pago) => {
    setSelectedPago(pago);
    setShowPagoForm(true);
  };

  const handleDeletePago = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/pagos/${id}`);
      setPagos(pagos.filter(pago => pago.id_pago !== id));
    } catch (error) {
      console.error('Error al eliminar pago', error);
    }
  };

  return (
    <div>
      <h1>Gestión de Préstamos</h1>
      <button onClick={handleAddCliente}>Agregar Cliente</button>
      <ClientesTable data={clientes} onEdit={handleEditCliente} onDelete={handleDeleteCliente} />

      <button onClick={handleAddPrestamo}>Agregar Préstamo</button>
      <PrestamosTable data={prestamos} onEdit={handleEditPrestamo} onDelete={handleDeletePrestamo} />

      <button onClick={handleAddPago}>Agregar Pago</button>
      <PagosTable data={pagos} onEdit={handleEditPago} onDelete={handleDeletePago} />

      {showClienteForm && (
        <ClienteForm
          cliente={selectedCliente}
          onClose={() => {
            setShowClienteForm(false);
            setSelectedCliente(null);
            // Refetch clientes data
            axios.get('http://localhost:5000/clientes').then(response => setClientes(response.data));
          }}
        />
      )}
      
      {showPrestamoForm && (
        <PrestamoForm
          prestamo={selectedPrestamo}
          onClose={() => {
            setShowPrestamoForm(false);
            setSelectedPrestamo(null);
            // Refetch prestamos data
            axios.get('http://localhost:5000/prestamos').then(response => setPrestamos(response.data));
          }}
        />
      )}
      
      {showPagoForm && (
        <PagoForm
          pago={selectedPago}
          onClose={() => {
            setShowPagoForm(false);
            setSelectedPago(null);
            // Refetch pagos data
            axios.get('http://localhost:5000/pagos').then(response => setPagos(response.data));
          }}
        />
      )}
    </div>
  );
}

export default App;
