import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const chartLabels = ["Desktop", "Mobile", "Tablet", "Unknown"];
const chartData = [68, 22, 9, 1];
const chartColors = ["#188acc", "#22d2be", "#fec030", "#f3316a"];

export const data = {
  labels: chartLabels,
  datasets: [
    {
      data: chartData,
      backgroundColor: chartColors,
      borderWidth: 1,
    },
  ],
};

const options: ChartOptions<"doughnut"> = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Device users use to find my website",
    },
    legend: {
      position: "bottom",
      labels: {
        font: {
          size: 10,
        },
        usePointStyle: true,
        generateLabels: (chart) => {
          const dataset = chart.data.datasets[0];
          return chartLabels.map((label, index) => ({
            text: `${label}: ${dataset.data[index]}%`,
            fillStyle: (dataset.backgroundColor as string[])[index],
            strokeStyle: (dataset.backgroundColor as string[])[index],
            index,
          }));
        },
      },
    },
  },
};

const DonutChart = () => {
  return (
    <Doughnut data={data} options={options} className="!h-[400px] !w-auto" />
  );
};

export default DonutChart;
