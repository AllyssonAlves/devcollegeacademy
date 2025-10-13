import React from 'react';
import { useApp } from '../context/AppContext';
import '../styles/components.css';

const Plans = () => {
  const { plans } = useApp();

  return (
    <section id="planos" className="plans section">
      <div className="container">
        <div className="section-title">
          <h2>Planos e Preços</h2>
          <p>Escolha o plano ideal para o desenvolvimento do seu filho</p>
        </div>
        
        <div className="plans-grid">
          {plans.map(plan => (
            <div key={plan.id} className={`plan-card card ${plan.popular ? 'popular' : ''}`}>
              {plan.popular && <div className="popular-badge">Mais Popular</div>}
              <div className="plan-header">
                <h3>{plan.name}</h3>
                <div className="plan-price">
                  <span className="price">{plan.price}</span>
                  <span className="period">/{plan.period}</span>
                </div>
              </div>
              
              <div className="plan-features">
                <ul>
                  {plan.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              
              <div className="plan-action">
                <button className={`btn ${plan.popular ? 'btn-accent' : 'btn-primary'}`}>
                  Escolher Plano
                </button>
              </div>
            </div>
          ))}
        </div>

        {plans.length === 0 && (
          <div className="empty-state">
            <h3>Nenhum plano cadastrado</h3>
            <p>Adicione planos através do painel administrativo</p>
          </div>
        )}
        
        <div className="plans-footer">
          <p>Todos os planos incluem 7 dias de garantia ou seu dinheiro de volta</p>
        </div>
      </div>
    </section>
  );
};

export default Plans;