import React from "react";
import Chart from "chart.js/auto";
import { PolarArea } from "react-chartjs-2";
import "./widget.css";

Chart.register();

function Statistic3({ ...props }) {
  const data = {
    labels: ["Ouro Branco", "Conselheiro Lafaiete", "Congonhas"],
    datasets: [
      {
        data: [157, 157, 79],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)", // Jan - Vermelho
          "rgba(54, 162, 235, 0.6)", // Fev - Azul
          "rgba(255, 206, 86, 0.6)", // Mar - Amarelo

        ],
        label: "Corridas por Cidade",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 3.5, // Aumente o valor para tornar o gráfico maior
  };

  return (
    <div className={`widgetCard p-3 md:py-4 md:px-6 ${props.className}`}>
      <div className="">
        <PolarArea data={data} options={options} />
      </div>
    </div>
  );
}

export default Statistic3;
