import React from 'react';

const EnrollmentChart = ({ timeRange }) => {
  // Dados mockados para o gráfico
  const getChartData = () => {
    switch (timeRange) {
      case 'week':
        return {
          labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
          data: [12, 19, 8, 15, 22, 18, 25]
        };
      case 'month':
        return {
          labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
          data: [45, 52, 68, 79]
        };
      case 'quarter':
        return {
          labels: ['Jan-Mar', 'Abr-Jun', 'Jul-Set', 'Out-Dez'],
          data: [189, 234, 278, 312]
        };
      case 'year':
        return {
          labels: ['2020', '2021', '2022', '2023', '2024'],
          data: [156, 289, 423, 542, 678]
        };
      default:
        return {
          labels: [],
          data: []
        };
    }
  };

  const { labels, data } = getChartData();
  const maxValue = Math.max(...data);

  return (
    <div className="enrollment-chart">
      <div className="chart-bars">
        {data.map((value, index) => (
          <div key={index} className="bar-container">
            <div className="bar-value">{value}</div>
            <div 
              className="bar"
              style={{ height: `${(value / maxValue) * 100}%` }}
            ></div>
            <div className="bar-label">{labels[index]}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnrollmentChart;