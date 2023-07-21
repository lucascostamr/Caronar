import React from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import "./widget.css";

Chart.register();

function Statistic4({ ...props }) {
  const data = {
    labels: ["Jan", "Fev", "Mar", "Apr", "Mai", "Jun", "Jul"],
    datasets: [
      {
        label: "Você",
        data: ["3", "3", "4", "1", "0", "0", "1"],
      },
      {
        label: "Média Geral",
        data: ["2.26", "1.62", "1.53", "1.28", "1.17", "1.36", "1.57"],
      },
      {
        label: "Média dos Homens",
        data: ["2.19", "1.57", "1.47", "1.17", "1.25","1.44","1.39"],
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
      <h1 className="text-medium font-semibold pb-4">Corridas </h1>
      <div className="">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default Statistic4;