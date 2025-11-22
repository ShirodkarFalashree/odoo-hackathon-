import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export const BarChart = () => {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Stock In",
        data: [120, 90, 180, 75, 130, 160, 140],
        backgroundColor: "rgba(34, 197, 94, 0.7)", // green
        borderRadius: 6,
      },
      {
        label: "Stock Out",
        data: [80, 60, 110, 50, 95, 100, 120],
        backgroundColor: "rgba(234, 179, 8, 0.7)", // yellow
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: "#ccc" },
      },
    },
    scales: {
      x: {
        ticks: { color: "#aaa" },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
      y: {
        ticks: { color: "#aaa" },
        grid: { color: "rgba(255,255,255,0.08)" },
      },
    },
  };

  return <Bar data={data} options={options} />;
};
