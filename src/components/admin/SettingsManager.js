import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RobotMascot, AstronautMascot } from '../../components/MascotVariants';
import MascotMultiPreview from './MascotMultiPreview';

const SettingsManager = () => {
  const { siteConfig, dispatch, actions } = useApp();
  // Inicializa formData garantindo todos os campos presentes
  const getInitialFormData = () => ({
    title: siteConfig.title || '',
    description: siteConfig.description || '',
    mascot: siteConfig.mascot || 'robot',
    contact: {
      email: siteConfig.contact?.email || '',
      phone: siteConfig.contact?.phone || '',
      address: siteConfig.contact?.address || ''
    }
  });
  const [formData, setFormData] = useState(getInitialFormData());
  const [previewView, setPreviewView] = useState('hero');
  const [previewSize, setPreviewSize] = useState('medium');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  // Sempre que siteConfig mudar (ex: reload, sync), atualiza formData
  React.useEffect(() => {
    setFormData(getInitialFormData());
  }, [siteConfig]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Garante que o objeto contact sempre tenha todos os campos
    const payload = {
      ...formData,
      contact: {
        ...siteConfig.contact,
        ...formData.contact
      },
      mascot: formData.mascot || siteConfig.mascot || 'robot'
    };
    dispatch({
      type: actions.UPDATE_SITE_CONFIG,
      payload
    });
    alert('Configurações salvas com sucesso!');
  };

  const handleMascotChange = (e) => {
    const newMascot = e.target.value;
    setFormData(prev => ({ ...prev, mascot: newMascot }));
    // Persist immediately so preview and other components update
    dispatch({
      type: actions.UPDATE_SITE_CONFIG,
      payload: { mascot: newMascot }
    });
  };

  const handleReset = () => {
    if (window.confirm('Tem certeza que deseja redefinir todas as configurações?')) {
      localStorage.removeItem('devcollege_data');
      window.location.reload();
    }
  };

  return (
    <div className="settings-manager">
      <h2>Configurações do Site</h2>
      
      <form onSubmit={handleSubmit} className="admin-form">
        {/* Logo do site agora é um arquivo estático em /assets/logo.png */}
        <div className="form-section">
          <h3>Informações Gerais</h3>
          
          <div className="form-group">
            <label htmlFor="site-title">Nome da Escola</label>
            <input
              id="site-title"
              type="text"
              name="title"
              autoComplete="organization"
              value={formData.title || ''}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="site-description">Descrição</label>
            <textarea
              id="site-description"
              name="description"
              autoComplete="off"
              rows="3"
              value={formData.description || ''}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="site-mascot">Mascote do Site</label>
            <select id="site-mascot" name="mascot" value={formData.mascot || 'robot'} onChange={handleMascotChange}>
              <option value="robot">Robô</option>
              <option value="astronaut">Astronauta</option>
            </select>
            <div style={{marginTop:12}}>
              <div className="preview-controls" style={{display:'flex', gap:8, alignItems:'center', marginBottom:8}}>
                <div>
                  <label htmlFor="preview-view">Visualizar como:</label>
                  <select id="preview-view" value={previewView} onChange={(e) => setPreviewView(e.target.value)}>
                    <option value="hero">Hero</option>
                    <option value="avatar">Avatar</option>
                    <option value="footer">Footer</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="preview-size">Tamanho:</label>
                  <select id="preview-size" value={previewSize} onChange={(e) => setPreviewSize(e.target.value)}>
                    <option value="small">Pequeno</option>
                    <option value="medium">Médio</option>
                    <option value="large">Grande</option>
                  </select>
                </div>
              </div>
              <MascotMultiPreview mascot={formData.mascot || siteConfig.mascot || 'robot'} size={previewSize} activeView={previewView} />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Informações de Contato</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                type="email"
                name="contact.email"
                autoComplete="email"
                value={formData.contact?.email || ''}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="contact-phone">Telefone</label>
              <input
                id="contact-phone"
                type="text"
                name="contact.phone"
                autoComplete="tel"
                value={formData.contact?.phone || ''}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="contact-address">Endereço</label>
            <input
              id="contact-address"
              type="text"
              name="contact.address"
              autoComplete="street-address"
              value={formData.contact?.address || ''}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Salvar Configurações
          </button>
          
          <button 
            type="button" 
            className="btn btn-accent"
            onClick={handleReset}
          >
            Redefinir Todos os Dados
          </button>
        </div>
      </form>
      
      <div className="data-info">
        <h3>Informações do Sistema</h3>
        <div className="info-grid">
          <div className="info-item">
            <strong>Total de Cursos:</strong>
            <span>{siteConfig.courses?.length || 0}</span>
          </div>
          <div className="info-item">
            <strong>Total de Alunos:</strong>
            <span>{siteConfig.students?.length || 0}</span>
          </div>
          <div className="info-item">
            <strong>Total de Planos:</strong>
            <span>{siteConfig.plans?.length || 0}</span>
          </div>
          <div className="info-item">
            <strong>Última Atualização:</strong>
            <span>{new Date().toLocaleString('pt-BR')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsManager;