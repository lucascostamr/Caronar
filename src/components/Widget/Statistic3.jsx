import React from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import "./widget.css";

Chart.register();

function Statistic3({ ...props }) {
  const data = {
    labels: ["Jan", "Fev", "Mar", "Apr", "Mai", "Jun", "Jul"],
    datasets: [
      {
        label: "2025",
        data: ["12", "22", "90", "150", "145", "120", "190"],
      },
      {
        label: "Mulheres",
        data: ["6", "12", "90", "150", "145", "120", "190"],
      },
      {
        label: "Target",
        data: ["11", "20", "89", "149", "150"],
        type: "line",
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

export default Statistic3;