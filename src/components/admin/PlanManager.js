import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

const PlanManager = () => {
  const { plans, dispatch, actions } = useApp();
  const [editingPlan, setEditingPlan] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    period: 'mensal',
    features: '',
    popular: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const featuresArray = formData.features.split('\n').filter(f => f.trim() !== '');
    
    const planData = {
      ...formData,
      features: featuresArray
    };

    if (editingPlan) {
      dispatch({
        type: actions.UPDATE_PLAN,
        payload: { ...planData, id: editingPlan.id }
      });
    } else {
      dispatch({
        type: actions.ADD_PLAN,
        payload: planData
      });
    }
    
    setFormData({
      name: '',
      price: '',
      period: 'mensal',
      features: '',
      popular: false
    });
    setEditingPlan(null);
  };

  const handleEdit = (plan) => {
    setEditingPlan(plan);
    setFormData({
      ...plan,
      features: plan.features.join('\n')
    });
  };

  const handleDelete = (planId) => {
    if (window.confirm('Tem certeza que deseja excluir este plano?')) {
      dispatch({
        type: actions.DELETE_PLAN,
        payload: planId
      });
    }
  };

  return (
    <div className="plan-manager">
      <h2>Gerenciar Planos</h2>
      
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-row">
          <div className="form-group">
            <label>Nome do Plano</label>
            <input
              type="text"
              name="name"
              placeholder="Ex: Plano Básico"
              value={formData.name || ''}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Preço</label>
            <input
              type="text"
              name="price"
              placeholder="Ex: R$ 149"
              value={formData.price || ''}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Período</label>
            <select
              name="period"
              value={formData.period || 'mensal'}
              onChange={handleChange}
            >
              <option value="mensal">Mensal</option>
              <option value="trimestral">Trimestral</option>
              <option value="semestral">Semestral</option>
              <option value="anual">Anual</option>
            </select>
          </div>
        </div>
        
        <div className="form-group">
          <label>Características (uma por linha)</label>
          <textarea
            name="features"
            placeholder="Ex: Acesso à plataforma online&#10;Suporte por email&#10;Certificado de conclusão"
            rows="5"
              value={formData.features || ''}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        
        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="popular"
              checked={!!formData.popular}
              onChange={handleChange}
            />
            Marcar como plano popular
          </label>
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingPlan ? 'Atualizar Plano' : 'Adicionar Plano'}
          </button>
          
          {editingPlan && (
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => {
                setEditingPlan(null);
                setFormData({
                  name: '',
                  price: '',
                  period: 'mensal',
                  features: '',
                  popular: false
                });
              }}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
      
      <div className="admin-list">
        <h3>Planos Cadastrados ({plans.length})</h3>
        
        {plans.length === 0 ? (
          <div className="empty-state">
            <p>Nenhum plano cadastrado</p>
          </div>
        ) : (
          plans.map(plan => (
            <div key={plan.id} className="admin-item card">
              <div className="item-content">
                <div className="item-header">
                  <h4>{plan.name} {plan.popular && <span className="popular-tag">(Popular)</span>}</h4>
                  <span className="plan-price">{plan.price}/{plan.period}</span>
                </div>
                <ul className="features-list">
                  {plan.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div className="item-actions">
                <button 
                  className="btn btn-secondary"
                  onClick={() => handleEdit(plan)}
                >
                  Editar
                </button>
                <button 
                  className="btn btn-accent"
                  onClick={() => handleDelete(plan.id)}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PlanManager;