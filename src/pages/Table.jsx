import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import UserTable from "./UserTable";

function Table() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:3001/api/passageiro/555.555.555-55/historico')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const dataHeader = [
    {
      key: "Data",
      label: "Data",
    },
    {
      key: "Hora",
      label: "Hora",
    },
    {
      key: "Destino",
      label: "Destino",
    },
    {
      key: "Origem",
      label: "Origem",
    },
    {
      key: "Preco",
      label: "Preço",
    }
  ];

  const handleDelete = () => {};

  return (
    <div className="h-full">
      <Navbar />

      {/* Main Content */}
      <div className="mainCard">
        <div className="border w-full border-gray-200 bg-white py-4 px-6 rounded-md">
          <UserTable
            loading={loading}
            dataHeader={dataHeader}
            data={data}
            handleDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default Table;
