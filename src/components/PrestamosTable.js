// src/components/PrestamosTable.js
import React from 'react';
import { useTable } from 'react-table';

const PrestamosTable = ({ data, onEdit, onDelete }) => {
  const columns = React.useMemo(
    () => [
      { Header: 'ID Préstamo', accessor: 'id_prestamo' },
      { Header: 'Cliente ID', accessor: 'id_cliente' },
      { Header: 'Fecha de Préstamo', accessor: 'fecha_prestamo' },
      { Header: 'Fecha de Pago', accessor: 'fecha_pago' },
      { Header: 'Interés (%)', accessor: 'interes' },
      {
        Header: 'Acciones',
        Cell: ({ row }) => (
          <>
            <button onClick={() => onEdit(row.original)}>Editar</button>
            <button onClick={() => onDelete(row.original.id_prestamo)}>Eliminar</button>
          </>
        ),
      },
    ],
    [onEdit, onDelete]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default PrestamosTable;
