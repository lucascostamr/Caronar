import React, { useState, useEffect } from "react";
import StatisticWidget from "../components/Widget/Statistic.jsx";
import StatisticWidget2 from "../components/Widget/Statistic2.jsx";
// import AchievementWidget from "../components/Widget/Achievment.jsx";
import DashboardHeader from "../components/Other/DashboardHeader.jsx";
import ScrolledCard from "../components/Widget/ScrolledCard.jsx";
import { useOutletContext } from "react-router-dom";

function DashboardPassageiro() {
  const [avatar, setAvatar] = useState({});
  const [dataOS, setDataOS] = useState([]);

  const cpf = "000.000.000-01";
  
  useEffect(() => {
    fetch(`http://localhost:3001/api/passageiro/${cpf}/imagem-perfil`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0 && data[0].ImagemPerfil) {
          setAvatar(data[0]);
        } else {
          setAvatar({});
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [cpf]);

  useEffect(() => {
    const colorList = ["cardInfo", "cardWarning", "cardDanger", "cardSuccess", "cardLime"];
    fetch("http://localhost:3001/api/passageiros-mais-viagens")
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((passageiro, index) => ({
          nome: passageiro.Nome,
          cidade: passageiro.Cidade,
          totalCorridas: passageiro.NumeroDeViagens,
          color: colorList[index % colorList.length], // Atribua uma cor da lista cíclica para cada objeto
        }));
        setDataOS(formattedData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [sidebarToggle] = useOutletContext();

  return (
    <>
      <main className="h-full">
        {/* Welcome Header */}
        <DashboardHeader
          toggle={sidebarToggle}
          avatar={avatar.ImagemPerfil}
          user={{ name: avatar.nome }}
        />

        {/* Laba */}
        <div className="px-2 mx-auto mainCard">
          <div className="w-full overflow-hidden text-slate-700 md:grid gap-4 grid md:grid-cols-6">
            <StatisticWidget className="col-span-4 col-start-1 bg-white" />
          </div>
        </div>


        <div className="px-2 mx-auto mainCard">
          <div className="w-full overflow-hidden text-slate-700 md:grid gap-4 grid md:grid-cols-6">
            <StatisticWidget2 className="col-span-4 col-start-1 bg-white" />
          </div>
        </div>


        {/* OS Kredit */}
        <div className="px-2 mx-auto mainCard">
          <h1 className="text-slate-500 pb-3 text-base md:text-lg">
            Passageiros com mais viagens
          </h1>

          <div className="flex flex-row gap-x-4 overflow-hidden overflow-x-auto justify-between no-scrollbar">
            {dataOS?.map((data, index) => (
              <ScrolledCard key={index} data={data} />
            ))}
          </div>

          <div className="lg:w-full w-[1024px] overflow-hidden flex flex-row justify-between text-slate-700 gap-2 lg:max-h-screen overflow-x-auto whitespace-nowrap"></div>
        </div>
      </main>
    </>
  );
}

export default DashboardPassageiro;
