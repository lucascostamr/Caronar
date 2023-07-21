import React from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import "./widget.css";

Chart.register();

function Statistic2({ ...props }) {
  const data = {
    labels: ["Ouro Branco", "Congonhas", "Conselheiro Lafaiete"],
    datasets: [
      {
        label: "Homens",
        data: ["2", "23", "0"],
      },
      {
        label: "Mulheres",
        data: ["0", "22", "2"],
      },
      {
        label: "Total",
        data: ["2", "45", "2"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 2,
  };
  return (
    <div className={`widgetCard p-3 md:py-4 md:px-6 ${props.className}`}>
      <h1 className="text-medium font-semibold pb-4">Motoristas disponíveis</h1>
      <div className="">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default Statistic2;