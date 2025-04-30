import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import { Chart, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, TimeScale, Filler } from "chart.js";

Chart.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  TimeScale,
  Filler
);

export default function ChartView({ data }) {
  if (!data.length) return <p className="text-gray-500">No data to display.</p>;

  const cleaned = data.filter(d => d.index_date && d.closing_index_value && d.volume);
  const labels = cleaned.map(d => new Date(d.index_date));
  const prices = cleaned.map(d => parseFloat(d.closing_index_value));
  const volumes = cleaned.map(d => parseFloat(d.volume));
  const openPrices = cleaned.map(d => parseFloat(d.open_index_value));
  const highPrices = cleaned.map(d => parseFloat(d.high_index_value));

  const chartData = {
    labels,
    datasets: [
      {
        label: "Close Price",
        data: prices,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.4,
        fill: true
      },
      {
        label: "Open Price",
        data: openPrices,
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        tension: 0.4,
        fill: true
      },
      {
        label: "High Price",
        data: highPrices,
        borderColor: "#f43f5e",
        backgroundColor: "rgba(244, 63, 94, 0.2)",
        tension: 0.4,
        fill: true
      },
      {
        label: "Volume",
        data: volumes,
        borderColor: "#d4d4d4", 
        backgroundColor: "rgba(100, 116, 139, 0.3)", 
        tension: 0.4,
        fill: false, 
        yAxisID: "y1",
        pointRadius: 0 
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { 
        title: { display: true, text: "Price" } 
      },
      y1: {
        position: "right",
        title: { display: true, text: "Volume" },
        grid: { drawOnChartArea: false }
      },
      x: {
        type: "time",
        time: { unit: "month" },
        title: { display: true, text: "Date" }
      }
    },
    plugins: {
      tooltip: { mode: "index", intersect: false }
    }
  };

  return (
    <div className="bg-white dark:bg-[#1e293b] rounded-xl p-6 shadow-xl h-[500px] transition-all">
      <Line data={chartData} options={options} />
    </div>
  );
}
