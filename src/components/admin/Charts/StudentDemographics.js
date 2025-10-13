import React from 'react';

const StudentDemographics = () => {
  const ageData = [
    { range: '6-8 anos', count: 85, percentage: 16 },
    { range: '9-11 anos', count: 156, percentage: 29 },
    { range: '12-14 anos', count: 198, percentage: 37 },
    { range: '15-17 anos', count: 103, percentage: 19 }
  ];

  const genderData = [
    { gender: 'Masculino', count: 287, percentage: 53 },
    { gender: 'Feminino', count: 255, percentage: 47 }
  ];

  const locationData = [
    { region: 'Sudeste', count: 312, percentage: 58 },
    { region: 'Sul', count: 125, percentage: 23 },
    { region: 'Nordeste', count: 68, percentage: 13 },
    { region: 'Centro-Oeste', count: 25, percentage: 5 },
    { region: 'Norte', count: 12, percentage: 2 }
  ];

  return (
    <div className="student-demographics">
      <div className="demographics-grid">
        <div className="demographic-section">
          <h4>Idade dos Alunos</h4>
          <div className="demographic-list">
            {ageData.map((item, index) => (
              <div key={index} className="demographic-item">
                <div className="demographic-label">
                  <span>{item.range}</span>
                  <span>{item.percentage}%</span>
                </div>
                <div className="demographic-bar">
                  <div 
                    className="bar-fill"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <div className="demographic-count">({item.count} alunos)</div>
              </div>
            ))}
          </div>
        </div>

        <div className="demographic-section">
          <h4>Gênero</h4>
          <div className="pie-chart">
            <div className="pie" style={{ background: `conic-gradient(
              #6C63FF 0% ${genderData[0].percentage}%,
              #FF6584 ${genderData[0].percentage}% 100%
            )` }}></div>
            <div className="pie-legend">
              {genderData.map((item, index) => (
                <div key={index} className="pie-legend-item">
                  <div 
                    className="legend-color"
                    style={{ 
                      backgroundColor: index === 0 ? '#6C63FF' : '#FF6584' 
                    }}
                  ></div>
                  <span>{item.gender}: {item.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="demographic-section">
          <h4>Região</h4>
          <div className="demographic-list">
            {locationData.map((item, index) => (
              <div key={index} className="demographic-item">
                <div className="demographic-label">
                  <span>{item.region}</span>
                  <span>{item.percentage}%</span>
                </div>
                <div className="demographic-bar">
                  <div 
                    className="bar-fill"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDemographics;