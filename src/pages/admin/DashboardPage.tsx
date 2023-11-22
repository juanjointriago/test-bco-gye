import { Box} from "@mantine/core";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Panel',
    },
  },
};

export const DashboardPage = () => {

  return (
    <div>
      <h1>Dashboard</h1>
      
      <Box
        sx={{
          width: '80%',
          margin: 'auto',
          marginTop: '2rem',
          marginBottom: '2rem',
        }}
      >
        {/* <Line options={options} data={datas} /> */}
      </Box>
    </div>
  )
};
