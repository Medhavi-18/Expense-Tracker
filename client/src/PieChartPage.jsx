import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChartPage() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:3001') 
      .then((result) => {
        calculateCategoryData(result.data);
      })
      .catch((err) => console.log(err));
  }, []);


  // Calculate total amount per category
  const calculateCategoryData = (data) => {
    const categoryTotals = {};
    data.forEach((item) => {
      if (categoryTotals[item.category]) {
        categoryTotals[item.category] += parseFloat(item.amount);
      } else {
        categoryTotals[item.category] = parseFloat(item.amount);
      }
    });

    // Prepare chart from data
    setChartData({
      labels: Object.keys(categoryTotals),
      datasets: [
        {
          label: 'Expenses Distribution',
          data: Object.values(categoryTotals),
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
          ],
          borderWidth: 1,
        },
      ],
    });
  };

  return (
    <div className="d-flex vh-100 bg-light justify-content-center align-items-center">
      <div
        className="bg-white rounded shadow-sm d-flex flex-column align-items-center justify-content-center"
        style={{
          width: '600px',
          height: '600px',
          padding: '20px',
        }}
      >
        <h2 className="text-center mb-4">Category-wise Expenses</h2>
        {chartData ? (
          <div style={{ width: '100%', height: '100%' }}>
            <Pie
              data={chartData}
              options={{
                maintainAspectRatio: false, 
              }}
            />
          </div>
        ) : (
          <p className="text-center">Loading chart...</p>
        )}
      </div>
    </div>
  );
}

export default PieChartPage;
