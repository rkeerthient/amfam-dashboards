import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
  Plugin,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useEffect, useRef } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

interface SampleChartProps {
  completionPercentage: number;
  color: string;
}

const centerTextPlugin: Plugin<"doughnut"> = {
  id: "centerText",
  beforeDraw: (chart) => {
    const { width, height, ctx } = chart;
    if (!ctx) return;

    ctx.restore();
    const fontSize = (height / 100).toFixed(2);
    ctx.font = `${fontSize}em sans-serif`;
    ctx.textBaseline = "middle";

    const text = `${chart.config.data.datasets?.[0]?.data?.[0] ?? 0}%`;
    const textX = Math.round((width - ctx.measureText(text).width) / 2);
    const textY = height / 2;

    ctx.fillStyle = "#111827";
    ctx.fillText(text, textX, textY);
    ctx.save();
  },
};

const SampleChart = ({ completionPercentage, color }: SampleChartProps) => {
  const chartRef = useRef<ChartJS<"doughnut">>(null);

  useEffect(() => {
    chartRef.current?.update();
  }, [completionPercentage]);

  const data: ChartData<"doughnut"> = {
    datasets: [
      {
        data: [completionPercentage, 100 - completionPercentage],
        backgroundColor: ["rgb(31, 102, 224)", "#e5e7eb"],
        borderWidth: 0,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    cutout: "90%",
    responsive: true,
    animation: {
      duration: 800,
      easing: "easeOutQuart",
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div className="h-72 mx-auto my-4">
      <Doughnut
        ref={chartRef}
        data={data}
        options={options}
        plugins={[centerTextPlugin]}
      />
    </div>
  );
};

export default SampleChart;
