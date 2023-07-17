import React from "react";
import { Link } from "react-router-dom";
import Datatables from "../components/Datatables/Table";
import TableCell from "../components/Datatables/TableCell";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

function UserTable({ loading, dataHeader, data, handleDelete }) {
  return (
    <Datatables loading={loading} dataHeader={dataHeader}>
      {data?.map((row) => (
        <tr
          key={row.id}
          className="bg-white border md:border-b block md:table-row rounded-md shadow-md md:rounded-none md:shadow-none mb-5"
        >
          <TableCell dataLabel="Data" showLabel={true}>
            <span className="font-medium text-sm text-gray-900">
              {row.Data}
            </span>
          </TableCell>
          <TableCell dataLabel="Hora" showLabel={true}>
            <p className="font-normal text-sm text-gray-500">{row.Hora}</p>
          </TableCell>
          <TableCell dataLabel="Origem" showLabel={true}>
            <p className="font-normal text-sm text-gray-500">{row.Origem}</p>
          </TableCell>
          <TableCell dataLabel="Destino" showLabel={true}>
            <p className="font-normal text-sm text-gray-500">{row.Destino}</p>
          </TableCell>
          <TableCell dataLabel="Motorista" showLabel={true}>
            <p className="font-normal text-sm text-gray-500">{row.NomeMotorista}</p>
          </TableCell>
          <TableCell dataLabel="Preço" showLabel={true}>
            <p className="font-normal text-sm text-gray-500">{row.Preco}</p>
          </TableCell>
          <TableCell>
            <Link
              to={`/auth/master/user/${row.id}/edit`}
              className="text-sky-700 inline-flex py-2 px-2 rounded text-sm"
            >
              <FontAwesomeIcon icon={faPencil} />
            </Link>
            <Link
              onClick={() => handleDelete(row.id)}
              to={`/auth/master/user/${row.id}/edit`}
              className="text-red-700 inline-flex py-2 px-2 rounded text-sm"
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </Link>
          </TableCell>
        </tr>
      ))}
    </Datatables>
  );
}

export default UserTable;
