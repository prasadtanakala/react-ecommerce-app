import React from 'react'
import { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);
const Productpiechart = () => {
    const [chartData, setChartData] = useState(null);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('https://fakestoreapi.com/products');
         
          const products = await response.json();
          const categories = {};
          products.forEach(product => {
            categories[product.category] = (categories[product.category] || 0) + 1;
          });        
          const data = {
            labels: Object.keys(categories),
            datasets: [
              {
                data: Object.values(categories),
                backgroundColor: [
                  '#FF6384',
                  '#36A2EB',
                  '#FFCE56',
                  '#4BC0C0',
                  '#9966FF',
                  '#FF9F40',
                ],
                hoverBackgroundColor: [
                  '#FF6384',
                  '#36A2EB',
                  '#FFCE56',
                  '#4BC0C0',
                  '#9966FF',
                  '#FF9F40',
                ],
              },
            ],
          };
          
          setChartData(data);
        } catch (err) {
          console.log(err)
        }
      };
  
      fetchData();
    }, []);

  return (
    <div className="card">
    <div className="card-header">
      <h2>Product Categories Distribution</h2>
    </div>
    <div className="card-content">
      <div className="chart-container">
        <Pie 
          data={chartData} 
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'right',
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    const label = context.label || '';
                    const value = context.raw || 0;
                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                    const percentage = Math.round((value / total) * 100);
                    return `${label}: ${value} (${percentage}%)`;
                  }
                }
              }
            }
          }}
        />
      </div>
    </div>
  </div>
  )
}

export default Productpiechart