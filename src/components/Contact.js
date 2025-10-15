import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import '../styles/components.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    interest: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar o formulário
    console.log('Formulário enviado:', formData);
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      interest: ''
    });
  };

  const { siteConfig } = useApp();
  return (
    <section id="contato" className="contact section">
      <div className="container">
        <div className="contact-content">
          <div className="contact-info">
            <div className="section-title">
              <h2>{siteConfig?.title || 'Entre em Contato'}</h2>
            </div>
            <p>{siteConfig?.description || 'Estamos aqui para tirar todas as suas dúvidas sobre nossos cursos e metodologia.'}</p>
            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon">📧</div>
                <div className="contact-text">
                  <h4>Email</h4>
                  <p>devcollegeacademy@gmail.com</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div className="contact-text">
                  <h4>Telefone</h4>
                  <p>(88) 99481-4505</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div className="contact-text">
                  <h4>Endereço</h4>
                  <p>Atendimento Remoto</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder="Seu nome completo"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="Seu melhor email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <input
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  placeholder="Seu telefone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <select
                  name="interest"
                  autoComplete="off"
                  value={formData.interest}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seu principal interesse</option>
                  <option value="programming">Programação</option>
                  <option value="games">Criação de Games</option>
                  <option value="robotics">Robótica</option>
                  <option value="web">Desenvolvimento Web</option>
                  <option value="apps">Apps Mobile</option>
                  <option value="other">Outro</option>
                </select>
              </div>
              
              <div className="form-group">
                <textarea
                  name="message"
                  autoComplete="off"
                  placeholder="Sua mensagem"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary btn-full">
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;