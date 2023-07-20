import React from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import "./widget.css";

Chart.register();

function Statistic({ ...props }) {
  const data = {
    labels: ["Jan", "Fev", "Mar", "Apr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    datasets: [
      {
        label: "Você",
        data: ["6", "1", "2", "1", "1", "2", "2"],
      },
      {
        label: "Demais usuários",
        data: ["2.9800", "1.7200", "1.5400", "1.2000", "1.0800", "1.0000", "1.5000"],
        type: "line",
      },
      {
        label: "Mulheres",
        data: ["3.12", "1.72", "1.52", "1.2000", "1.0800", "1.0000", "1.4800"],
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
      <h1 className="text-medium font-semibold pb-4">Total viagens</h1>
      <div className="">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default Statistic;