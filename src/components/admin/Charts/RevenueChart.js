import React from 'react';

const RevenueChart = ({ timeRange }) => {
  // Dados mockados para o gráfico de receita
  const getChartData = () => {
    switch (timeRange) {
      case 'week':
        return {
          revenue: [4200, 5800, 5100, 7200, 8900, 6300, 9500],
          conversions: [8, 12, 10, 15, 18, 14, 20]
        };
      case 'month':
        return {
          revenue: [18500, 22400, 19800, 24900],
          conversions: [42, 52, 46, 58]
        };
      case 'quarter':
        return {
          revenue: [65200, 78400, 89100],
          conversions: [156, 189, 212]
        };
      case 'year':
        return {
          revenue: [245000, 312000, 389000, 456000],
          conversions: [542, 689, 812, 945]
        };
      default:
        return {
          revenue: [],
          conversions: []
        };
    }
  };

  const { revenue, conversions } = getChartData();
  const maxRevenue = Math.max(...revenue);
  const maxConversions = Math.max(...conversions);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="revenue-chart">
      <div className="chart-legend">
        <div className="legend-item">
          <div className="legend-color revenue-color"></div>
          <span>Receita (R$)</span>
        </div>
        <div className="legend-item">
          <div className="legend-color conversion-color"></div>
          <span>Conversões</span>
        </div>
      </div>
      
      <div className="chart-bars dual-bars">
        {revenue.map((revValue, index) => (
          <div key={index} className="bar-group">
            <div className="bar-container">
              <div 
                className="bar revenue-bar"
                style={{ height: `${(revValue / maxRevenue) * 80}%` }}
              >
                <div className="bar-tooltip">
                  {formatCurrency(revValue)}
                </div>
              </div>
            </div>
            <div className="bar-container">
              <div 
                className="bar conversion-bar"
                style={{ height: `${(conversions[index] / maxConversions) * 80}%` }}
              >
                <div className="bar-tooltip">
                  {conversions[index]} conversões
                </div>
              </div>
            </div>
            <div className="bar-label">
              {timeRange === 'week' ? `D${index + 1}` : `P${index + 1}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenueChart;