// Simulação de API para persistência de dados
const STORAGE_KEYS = {
  COURSES: 'devcollege_courses',
  PLANS: 'devcollege_plans',
  TESTIMONIALS: 'devcollege_testimonials'
};

export const api = {
  // Métodos para cursos
  getCourses: () => {
    const courses = localStorage.getItem(STORAGE_KEYS.COURSES);
    return courses ? JSON.parse(courses) : [];
  },
  
  saveCourses: (courses) => {
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
  },
  
  // Métodos para planos
  getPlans: () => {
    const plans = localStorage.getItem(STORAGE_KEYS.PLANS);
    return plans ? JSON.parse(plans) : [];
  },
  
  savePlans: (plans) => {
    localStorage.setItem(STORAGE_KEYS.PLANS, JSON.stringify(plans));
  },
  
  // Métodos para depoimentos
  getTestimonials: () => {
    const testimonials = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
    return testimonials ? JSON.parse(testimonials) : [];
  },
  
  saveTestimonials: (testimonials) => {
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials));
  }
};

