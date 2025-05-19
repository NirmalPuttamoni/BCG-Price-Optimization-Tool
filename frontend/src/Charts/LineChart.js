// components/DemandForecastLineChart.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale
} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

const LineChart = (props) => {
  const { data } = props;

  // Sort by selling price for a smooth line
  const sortedProducts = [...data].sort((a, b) => a.selling_price - b.selling_price);

  const chartData = {
    labels: sortedProducts.map(p => `$${p.selling_price}`),
    datasets: [
      {
        label: 'Forecasted Demand',
        data: sortedProducts.map(p => p.demand_forecast),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.3,
        fill: true,
        pointRadius: 5,
        pointHoverRadius: 7
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          title: (context) => sortedProducts[context[0].dataIndex].name,
          label: (context) => `Demand: ${context.parsed.y}`
        }
      },
      title: {
        display: true,
        text: 'Demand Forecast vs Selling Price'
      },
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Selling Price ($)'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Forecasted Demand (Units)'
        }
      }
    }
  };

  return (
    <div >
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
