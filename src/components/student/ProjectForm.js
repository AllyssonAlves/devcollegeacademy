import React, { useState } from 'react';

const defaultForm = {
  title: '',
  description: '',
  link: '',
  image: ''
};

const ProjectForm = ({ onSubmit, onCancel, initialData }) => {
  const [form, setForm] = useState(initialData || defaultForm);
  const [imagePreview, setImagePreview] = useState(initialData?.image || '');

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleImage = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(f => ({ ...f, image: reader.result }));
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.title || !form.description) return;
    onSubmit(form);
    setForm(defaultForm);
    setImagePreview('');
  };

  return (
    <form className="project-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="project-title">Título</label>
        <input id="project-title" name="title" value={form.title} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="project-description">Descrição</label>
        <textarea id="project-description" name="description" value={form.description} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="project-link">Link do Projeto (opcional)</label>
        <input id="project-link" name="link" value={form.link} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="project-image">Imagem do Projeto</label>
        <input id="project-image" type="file" accept="image/*" onChange={handleImage} />
        {imagePreview && <img src={imagePreview} alt="Preview" className="project-image-preview" />}
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">Salvar</button>
        {onCancel && <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>}
      </div>
    </form>
  );
};

export default ProjectForm;
