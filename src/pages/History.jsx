import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import UserTable from "./UserTable";

function Table() {
  const [loading] = useState(false);
  const [data, setData] = useState([]);

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
      key: "Origem",
      label: "Origem",
    },
    {
      key: "Destino",
      label: "Destino",
    },
    {
      key: "NomeMotorista",
      label: "Motorista",
    },
    {
      key: "Preco",
      label: "Preço",
    }
  ];
  

  const formatData = (date) => {
    const splitDateTime = date.split("T");
    return splitDateTime[0];
  };

  const cpf = '111.111.111-11';

  useEffect(() => {
    const fetchUserHistory = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/user/${cpf}/historico`);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Erro na solicitação:', error);
        // Trate o erro conforme necessário
      }
    };
  
    fetchUserHistory();
  }, [cpf]);
  

  const handleDelete = () => {};

  return (
    <div className="h-full">
      <Navbar />

      {/* Main Content */}
      <div className="mainCard">
        <div className="border w-full border-gray-200 bg-white py-4 px-6 rounded-md">
          <UserTable
            loading={loading}
            dataHeader={dataHeader.map((item) => ({
              ...item,
              label: item.key === "Data" ? "Data" : item.label,
            }))}
            data={data.map((item) => ({
              ...item,
              Data: formatData(item.Data), // Chave "Data" formatada
            }))}
            handleDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default Table;