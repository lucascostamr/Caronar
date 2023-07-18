import React, { useState, useEffect } from "react";
import StatisticWidget from "../components/Widget/Statistic.jsx";
import AchievementWidget from "../components/Widget/Achievment.jsx";
import DashboardHeader from "../components/Other/DashboardHeader.jsx";
import ScrolledCard from "../components/Widget/ScrolledCard.jsx";
import { useOutletContext } from "react-router-dom";

function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState([]);

  const cnh = "CNH1";

  useEffect(() => {
    setLoading(true);
    fetch(`/api/passageiros/${cnh}/imagem-perfil`)
      .then((response) => response.json())
      .then((data) => {
        setAvatar(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const dataOS = [
    {
      title: "Kredit Konsumer",
      date: "12/Mei/2023",
      os: "23,938",
      gs: "20,900",
      percentage: 200.01,
      color: "cardInfo",
    },
    {
      title: "Kredit Ritel",
      date: "12/Mei/2023",
      os: "3,938",
      gs: "2,900",
      percentage: 190.01,
      color: "cardWarning",
    },
    {
      title: "Kredit KPR & KKB",
      date: "12/Mei/2023",
      os: "190,938",
      gs: "192,900",
      percentage: 99.01,
      color: "cardDanger",
    },
    {
      title: "Kredit UMKM",
      date: "12/Mei/2023",
      os: "2,938",
      gs: "2,900",
      percentage: 100.01,
      color: "cardSuccess",
    },
    {
      title: "Kredit Komersial",
      date: "12/Mei/2023",
      os: "23,938",
      gs: "20,900",
      percentage: 200.01,
      color: "cardLime",
    },
    {
      title: "Kredit BPR & LKM",
      date: "12/Mei/2023",
      os: "3,938",
      gs: "10,900",
      percentage: 210.01,
      color: "cardDanger",
    },
  ];

  const [sidebarToggle] = useOutletContext();

  return (
    <>
      <main className="h-full">
        {/* Welcome Header */}
        <DashboardHeader
          toggle={sidebarToggle}
          avatar={avatar.ImagemPerfil}
          user={{ name: "Hoki Teguh Oktian" }}
        />

        {/* Laba */}
        <div className="px-2 mx-auto mainCard">
          <div className="w-full overflow-hidden text-slate-700 md:grid gap-4 grid md:grid-cols-6">
            <StatisticWidget className="col-span-4 col-start-1 bg-white" />
            <AchievementWidget />
          </div>
        </div>

        {/* OS Kredit */}
        <div className="px-2 mx-auto mainCard">
          <h1 className="text-slate-500 pb-3 text-base md:text-lg">
            Pencapaian OS Kredit
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

export default Dashboard;
