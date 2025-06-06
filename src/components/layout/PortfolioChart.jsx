import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useCrypto } from "../../context/crypto-context";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PortfolioChart() {
  const {assets} = useCrypto()
  
    const data = {
    labels: assets.map((a) => a.id),
    datasets: [
      {
        label: "# of Votes",
        data: assets.map((a)=>a.totalAmount),
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
          "rgba(255, 206, 86)",
          "rgba(75, 192, 192)",
          "rgba(153, 102, 255)",
          "rgba(255, 159, 64)",
        ],
      },
    ],
  };

  return (
    <div
      style={{
        display: "flex",
        marginBottom: "1rem",
        justifyContent: "center",
        height: 400,
      }}
    >
      <Pie data={data} />
    </div>
  );
}
