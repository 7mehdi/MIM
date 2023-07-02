import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, } from "chart.js";
import { Doughnut , Bar} from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const ArticleCategoryChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:7000/api/stock');
      const { categories, quantities } = processChartData(response.data);
      const colors = generateColors(categories.length);

      setChartData({
        labels: categories,
        datasets: [
          {
            label: 'Quantity',
            data: quantities,
            backgroundColor: colors,
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };

  const processChartData = (data) => {
    const categories = data.map((item) => item.item_category);
    const quantities = data.map((item) => item.real_count);
    return { categories, quantities };
  };

  const generateColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const color = `rgba(${getRandomValue(0, 255)}, ${getRandomValue(0, 255)}, ${getRandomValue(0, 255)}, 0.6)`;
      colors.push(color);
    }
    return colors;
  };

  const getRandomValue = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return (
    <div>
      <h2>Article Category Chart</h2>
      {chartData ? (
        <Doughnut style={{ maxWidth: '30rem',height:'30rem', margin: '0 auto' }} data={chartData} />
      ) : (
        <p>Loading chart data...</p>
      )}
        <div>
      <h2>User Item Chart</h2>
    
    </div>
    </div>
  );
};

export default ArticleCategoryChart;
