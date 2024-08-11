// src/components/ClientesTable.js
import React from 'react';
import { useTable } from 'react-table';

const ClientesTable = ({ data, onEdit, onDelete }) => {
  const columns = React.useMemo(
    () => [
      { Header: 'Cédula', accessor: 'cedula' },
      { Header: 'Nombres', accessor: 'nombres' },
      { Header: 'Apellidos', accessor: 'apellidos' },
      { Header: 'Alias', accessor: 'alias' },
      { Header: 'Celular', accessor: 'celular' },
      {
        Header: 'Acciones',
        Cell: ({ row }) => (
          <>
            <button onClick={() => onEdit(row.original)}>Editar</button>
            <button onClick={() => onDelete(row.original.id_cliente)}>Eliminar</button>
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

export default ClientesTable;
