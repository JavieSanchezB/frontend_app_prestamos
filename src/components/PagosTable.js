// src/components/PagosTable.js
import React from 'react';
import { useTable } from 'react-table';

const PagosTable = ({ data, onEdit, onDelete }) => {
  const columns = React.useMemo(
    () => [
      { Header: 'ID Pago', accessor: 'id_pago' },
      { Header: 'ID Préstamo', accessor: 'id_prestamo' },
      { Header: 'Monto', accessor: 'monto' },
      { Header: 'Fecha de Pago', accessor: 'fecha_pago' },
      {
        Header: 'Acciones',
        Cell: ({ row }) => (
          <>
            <button onClick={() => onEdit(row.original)}>Editar</button>
            <button onClick={() => onDelete(row.original.id_pago)}>Eliminar</button>
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

export default PagosTable;
