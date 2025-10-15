import React, { createContext, useContext, useReducer, useEffect } from 'react';
import embeddedCourseImages from '../data/embeddedCourseImages.json';

// Estado inicial com dados de exemplo
const initialState = {
  courses: [
    {
      id: 1,
      title: 'Programação de Aplicativos',
      description: 'Dê asas à imaginação! Com 12 módulos e aulas ao vivo, eles aprenderão a desenvolver apps funcionais e jogos divertidos, usando a lógica e a criatividade.',
      ageRange: '9-15 anos',
  duration: '12 módulos',
      color: '#3B82F6',
  image: process.env.PUBLIC_URL + '/assets/app_course.svg',
      lessons: [
        { id: '1-1', title: 'Módulo 1' },
        { id: '1-2', title: 'Módulo 2' },
        { id: '1-3', title: 'Módulo 3' },
        { id: '1-4', title: 'Módulo 4' },
        { id: '1-5', title: 'Módulo 5' },
        { id: '1-6', title: 'Módulo 6' },
        { id: '1-7', title: 'Módulo 7' },
        { id: '1-8', title: 'Módulo 8' },
        { id: '1-9', title: 'Módulo 9' },
        { id: '1-10', title: 'Módulo 10' },
        { id: '1-11', title: 'Módulo 11' },
        { id: '1-12', title: 'Módulo 12' }
      ]
    },
    {
      id: 2,
      title: 'Inteligência Artificial',
      description: 'Mergulhe no mundo da IA! Nossos jovens cientistas desvendarão como a Inteligência Artificial funciona e darão os primeiros passos para construir o futuro. 9 módulos de pura descoberta.',
      ageRange: '10-15 anos',
  duration: '9 módulos',
      color: '#8B5CF6',
  image: process.env.PUBLIC_URL + '/assets/ai_course.svg',
      lessons: [
        { id: '2-1', title: 'Módulo 1' },
        { id: '2-2', title: 'Módulo 2' },
        { id: '2-3', title: 'Módulo 3' },
        { id: '2-4', title: 'Módulo 4' },
        { id: '2-5', title: 'Módulo 5' },
        { id: '2-6', title: 'Módulo 6' },
        { id: '2-7', title: 'Módulo 7' },
        { id: '2-8', title: 'Módulo 8' },
        { id: '2-9', title: 'Módulo 9' }
      ]
    },
    {
      id: 3,
      title: 'Desenvolvimento Web (HTML + CSS + Python)',
      description: 'Para os futuros arquitetos da internet! A partir dos 10 anos, eles aprenderão a criar sites dinâmicos e interativos, dominando linguagens essenciais do universo digital.',
      ageRange: '10+ anos',
  duration: '12 módulos',
      color: '#06B6D4',
  image: process.env.PUBLIC_URL + '/assets/web_course.svg',
      lessons: [
        { id: '3-1', title: 'Módulo 1' },
        { id: '3-2', title: 'Módulo 2' },
        { id: '3-3', title: 'Módulo 3' },
        { id: '3-4', title: 'Módulo 4' },
        { id: '3-5', title: 'Módulo 5' },
        { id: '3-6', title: 'Módulo 6' },
        { id: '3-7', title: 'Módulo 7' },
        { id: '3-8', title: 'Módulo 8' },
        { id: '3-9', title: 'Módulo 9' },
        { id: '3-10', title: 'Módulo 10' },
        { id: '3-11', title: 'Módulo 11' },
        { id: '3-12', title: 'Módulo 12' }
      ]
    }
  ],
  plans: [
    {
      id: 1,
      name: 'Básico',
      price: 'R$ 149',
      period: 'mensal',
      features: [
        '1 curso por vez',
        'Acesso à plataforma online',
        'Suporte por email',
        'Certificado de conclusão'
      ],
      popular: false
    },
    {
      id: 2,
      name: 'Premium',
      price: 'R$ 249',
      period: 'mensal',
      features: [
        'Até 3 cursos simultâneos',
        'Acesso à plataforma online',
        'Suporte prioritário',
        'Certificado de conclusão',
        'Aulas gravadas e ao vivo'
      ],
      popular: true
    }
  ],
  students: [
    {
      id: 1,
      name: 'João Silva',
      email: 'joao@email.com',
      age: '10',
      course: 'Programação para Iniciantes',
      plan: 'Premium',
      planPrice: 249,
      status: 'active',
      progress: 75,
      enrollmentDate: '2024-01-15',
      projects: [],
      achievements: [
        {
          id: 1,
          name: 'Primeiro Projeto',
          description: 'Você cadastrou seu primeiro projeto!',
          icon: '🏅',
          unlocked: true,
          date: '2025-10-11'
        },
        {
          id: 2,
          name: 'Perfil Completo',
          description: 'Seu perfil está completo!',
          icon: '📝',
          unlocked: false
        },
        {
          id: 3,
          name: '100% Progresso',
          description: 'Você concluiu um curso!',
          icon: '🎓',
          unlocked: false
        }
      ]
        ,
        // Track which lesson index the student has last completed (0-based). Next lesson = index + 1
        currentLessonIndex: 8
    }
  ],
  testimonials: [
    {
      id: 1,
      name: 'Mariana Silva',
      age: 10,
      course: 'Programação para Iniciantes',
      text: 'Eu adorei aprender a programar! Agora consigo criar meus próprios jogos e animações.',
      relationship: 'Aluna'
    }
  ],
  siteConfig: {
    title: 'DevCollege Academy',
    description: 'Cursos de tecnologia para crianças',
    mascot: 'robot',
    contact: {
      email: 'contato@devcollegeacademy.com',
      phone: '(11) 9999-9999',
      address: 'Av. Paulista, 1000 - São Paulo, SP'
    }
  },
  metrics: {
    totalStudents: 1,
    activeSubscriptions: 1,
    monthlyRevenue: 249,
    completionRate: 0
  }
};

// Actions
const ACTION_TYPES = {
  UNLOCK_ACHIEVEMENT: 'UNLOCK_ACHIEVEMENT',
  ADD_PROJECT: 'ADD_PROJECT',
  UPDATE_PROJECT: 'UPDATE_PROJECT',
  DELETE_PROJECT: 'DELETE_PROJECT',
  LOAD_DATA: 'LOAD_DATA',
  ADD_COURSE: 'ADD_COURSE',
  UPDATE_COURSE: 'UPDATE_COURSE',
  DELETE_COURSE: 'DELETE_COURSE',
  ADD_PLAN: 'ADD_PLAN',
  UPDATE_PLAN: 'UPDATE_PLAN',
  DELETE_PLAN: 'DELETE_PLAN',
  ADD_STUDENT: 'ADD_STUDENT',
  ADVANCE_LESSON: 'ADVANCE_LESSON',
  UPDATE_STUDENT: 'UPDATE_STUDENT',
  DELETE_STUDENT: 'DELETE_STUDENT',
  ADD_TESTIMONIAL: 'ADD_TESTIMONIAL',
  UPDATE_TESTIMONIAL: 'UPDATE_TESTIMONIAL',
  DELETE_TESTIMONIAL: 'DELETE_TESTIMONIAL',
  UPDATE_SITE_CONFIG: 'UPDATE_SITE_CONFIG',
  UPDATE_METRICS: 'UPDATE_METRICS'
};

// Reducer
const appReducer = (state, action) => {
  // Automatizar conquistas ao adicionar projeto
  if (action.type === ACTION_TYPES.ADD_PROJECT) {
    const student = state.students.find(s => s.id === action.payload.studentId);
    const alreadyUnlocked = student?.achievements?.find(a => a.id === 1 && a.unlocked);
    const hadNoProjects = (student?.projects?.length || 0) === 0;
    let newState = null;
    if (!alreadyUnlocked && hadNoProjects) {
      // Desbloqueia conquista 'Primeiro Projeto'
      newState = appReducer({
        ...state,
        students: state.students.map(s =>
          s.id === action.payload.studentId
            ? { ...s, projects: [...(s.projects || []), { ...action.payload.project, id: Date.now() }] }
            : s
        )
      }, {
        type: ACTION_TYPES.UNLOCK_ACHIEVEMENT,
        payload: { studentId: action.payload.studentId, achievementId: 1 }
      });
      return newState;
    }
  }
  switch (action.type) {
    // Automatizar conquista ao concluir curso
    case ACTION_TYPES.UPDATE_STUDENT: {
      const wasCompleted = state.students.find(s => s.id === action.payload.id)?.progress === 100;
      const isNowCompleted = action.payload.progress === 100;
      let newState = {
        ...state,
        students: state.students.map(student =>
          student.id === action.payload.id ? action.payload : student
        )
      };
      if (!wasCompleted && isNowCompleted) {
        newState = appReducer(newState, {
          type: ACTION_TYPES.UNLOCK_ACHIEVEMENT,
          payload: { studentId: action.payload.id, achievementId: 3 }
        });
      }
      return newState;
    }
    case ACTION_TYPES.UNLOCK_ACHIEVEMENT:
      // action.payload: { studentId, achievementId }
      return {
        ...state,
        students: state.students.map(s =>
          s.id === action.payload.studentId
            ? {
                ...s,
                achievements: (s.achievements || []).map(a =>
                  a.id === action.payload.achievementId ? { ...a, unlocked: true, date: new Date().toISOString().slice(0,10) } : a
                )
              }
            : s
        )
      };
    case ACTION_TYPES.ADVANCE_LESSON: {
      // action.payload: { studentId }
      const student = state.students.find(s => s.id === action.payload.studentId);
      if (!student) return state;
      const course = state.courses.find(c => c.title === student.course);
      const lessonsCount = (course?.lessons?.length) || 0;
      const nextIndex = (student.currentLessonIndex || 0) + 1;
      const cappedIndex = Math.min(nextIndex, lessonsCount);
      const newProgress = lessonsCount > 0 ? Math.round((cappedIndex / lessonsCount) * 100) : student.progress;

      let newState = {
        ...state,
        students: state.students.map(s =>
          s.id === action.payload.studentId
            ? { ...s, currentLessonIndex: cappedIndex, progress: newProgress }
            : s
        )
      };

      // If student finished (100%), unlock completion achievement (id:3)
      if (newProgress === 100) {
        newState = appReducer(newState, {
          type: ACTION_TYPES.UNLOCK_ACHIEVEMENT,
          payload: { studentId: action.payload.studentId, achievementId: 3 }
        });
      }
      return newState;
    }
    case ACTION_TYPES.ADD_PROJECT:
      // action.payload: { studentId, project }
      return {
        ...state,
        students: state.students.map(s =>
          s.id === action.payload.studentId
            ? { ...s, projects: [...(s.projects || []), { ...action.payload.project, id: Date.now() }] }
            : s
        )
      };
    case ACTION_TYPES.UPDATE_PROJECT:
      // action.payload: { studentId, project }
      return {
        ...state,
        students: state.students.map(s =>
          s.id === action.payload.studentId
            ? {
                ...s,
                projects: (s.projects || []).map(p =>
                  p.id === action.payload.project.id ? { ...action.payload.project } : p
                )
              }
            : s
        )
      };
    case ACTION_TYPES.DELETE_PROJECT:
      // action.payload: { studentId, projectId }
      return {
        ...state,
        students: state.students.map(s =>
          s.id === action.payload.studentId
            ? {
                ...s,
                projects: (s.projects || []).filter(p => p.id !== action.payload.projectId)
              }
            : s
        )
      };
    case ACTION_TYPES.LOAD_DATA:
      return { ...state, ...action.payload };

    case ACTION_TYPES.ADD_COURSE:
      return {
        ...state,
        courses: [...state.courses, { ...action.payload, id: Date.now() }]
      };

    case ACTION_TYPES.UPDATE_COURSE:
      return {
        ...state,
        courses: state.courses.map(course =>
          course.id === action.payload.id ? action.payload : course
        )
      };

    case ACTION_TYPES.DELETE_COURSE:
      return {
        ...state,
        courses: state.courses.filter(course => course.id !== action.payload)
      };

    case ACTION_TYPES.ADD_PLAN:
      return {
        ...state,
        plans: [...state.plans, { ...action.payload, id: Date.now() }]
      };

    case ACTION_TYPES.UPDATE_PLAN:
      return {
        ...state,
        plans: state.plans.map(plan =>
          plan.id === action.payload.id ? action.payload : plan
        )
      };

    case ACTION_TYPES.DELETE_PLAN:
      return {
        ...state,
        plans: state.plans.filter(plan => plan.id !== action.payload)
      };

    case ACTION_TYPES.ADD_STUDENT:
      return {
        ...state,
        students: [...state.students, { ...action.payload, id: Date.now() }]
      };

    case ACTION_TYPES.UPDATE_STUDENT:
      return {
        ...state,
        students: state.students.map(student =>
          student.id === action.payload.id ? action.payload : student
        )
      };

    case ACTION_TYPES.DELETE_STUDENT:
      return {
        ...state,
        students: state.students.filter(student => student.id !== action.payload)
      };

    case ACTION_TYPES.ADD_TESTIMONIAL:
      return {
        ...state,
        testimonials: [...state.testimonials, { ...action.payload, id: Date.now() }]
      };

    case ACTION_TYPES.UPDATE_TESTIMONIAL:
      return {
        ...state,
        testimonials: state.testimonials.map(testimonial =>
          testimonial.id === action.payload.id ? action.payload : testimonial
        )
      };

    case ACTION_TYPES.DELETE_TESTIMONIAL:
      return {
        ...state,
        testimonials: state.testimonials.filter(testimonial => testimonial.id !== action.payload)
      };

    case ACTION_TYPES.UPDATE_SITE_CONFIG:
      // Merge profundo para o objeto de contato
      return {
        ...state,
        siteConfig: {
          ...state.siteConfig,
          ...action.payload,
          contact: {
            ...state.siteConfig.contact,
            ...(action.payload.contact || {})
          }
        }
      };

    case ACTION_TYPES.UPDATE_METRICS:
      return {
        ...state,
        metrics: { ...state.metrics, ...action.payload }
      };

    default:
      return state;
  }
};

// Context
const AppContext = createContext();

// Provider
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Carregar dados do localStorage na inicialização
  useEffect(() => {
    const savedData = localStorage.getItem('devcollege_data');
    const sanitizeLoadedData = (obj) => {
      if (!obj || typeof obj !== 'object') return obj;
      const cloned = { ...obj };
      if (Array.isArray(cloned.courses)) {
        cloned.courses = cloned.courses.map(c => {
          if (!c || typeof c !== 'object') return c;
          const copy = { ...c };
          if (typeof copy.image === 'string' && copy.image.trim()) {
            const img = copy.image.trim();
            // If it starts with PUBLIC_URL, strip that so we store relative '/assets/...' paths
            const publicUrl = process.env.PUBLIC_URL || '';
            if (publicUrl && img.startsWith(publicUrl)) {
              copy.image = img.slice(publicUrl.length) || img.replace(new RegExp(`^${publicUrl}`), '');
            } else if (img.startsWith(window?.location?.origin || '')) {
              // remove origin if present
              copy.image = img.slice((window.location.origin || '').length) || img.replace(new RegExp(`^${window.location.origin}`), '');
            } else {
              copy.image = img;
            }
            // ensure leading slash for relative paths
            if (copy.image && !copy.image.startsWith('/')) copy.image = '/' + copy.image;
          }
          return copy;
        });
      }
      return cloned;
    };

    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        // Validate parsed shape before loading to avoid overwriting state with malformed data
        const isValidSavedState = (obj) => {
          if (!obj || typeof obj !== 'object') return false;
          // basic expectations
          if (!Array.isArray(obj.courses)) return false;
          if (!Array.isArray(obj.plans)) return false;
          if (!Array.isArray(obj.students)) return false;
          return true;
        };

        if (isValidSavedState(parsedData)) {
          // sanitize images and load saved state from localStorage
          let sanitized = sanitizeLoadedData(parsedData);
          // Optionally force embed images from code (overrides admin choices).
          // Controlled by env var REACT_APP_FORCE_EMBEDDED_COURSE_IMAGES (default true for immediate fix)
          const forceEmbedded = (process.env.REACT_APP_FORCE_EMBEDDED_COURSE_IMAGES || 'true') === 'true';
          if (forceEmbedded && embeddedCourseImages) {
            // Only apply embedded image when course has no image set (respect admin choices)
            sanitized.courses = (sanitized.courses || []).map(c => {
              const idKey = String(c.id);
              if (!c.image && embeddedCourseImages[idKey]) {
                return { ...c, image: embeddedCourseImages[idKey] };
              }
              return c;
            });
          }
          dispatch({ type: ACTION_TYPES.LOAD_DATA, payload: sanitized });
        } else {
          console.warn('[AppContext] saved localStorage devcollege_data has unexpected shape — ignoring to avoid data loss', parsedData);
        }
      } catch (error) {
        console.error('Erro ao carregar dados do localStorage:', error);
      }
    } else {
        console.log('[AppContext] Nenhum dado encontrado no localStorage, tentando migrar de chaves legadas.');
        // Attempt migration from legacy keys if present
        try {
          const legacyCourses = localStorage.getItem('devcollege_courses');
          const legacyPlans = localStorage.getItem('devcollege_plans');
          const legacyTestimonials = localStorage.getItem('devcollege_testimonials');
          let migrated = false;
          const payload = {};
          if (legacyCourses) {
            try { payload.courses = JSON.parse(legacyCourses); migrated = true; } catch (e) { /* ignore */ }
          }
          if (legacyPlans) {
            try { payload.plans = JSON.parse(legacyPlans); migrated = true; } catch (e) { /* ignore */ }
          }
          if (legacyTestimonials) {
            try { payload.testimonials = JSON.parse(legacyTestimonials); migrated = true; } catch (e) { /* ignore */ }
          }
          if (migrated) {
            console.log('[AppContext] Migrated legacy data into state:', {
              courses: (payload.courses || []).length,
              plans: (payload.plans || []).length,
              testimonials: (payload.testimonials || []).length
            });
            dispatch({ type: ACTION_TYPES.LOAD_DATA, payload: { ...payload } });
          }
        } catch (err) {
          // ignore migration errors
        }
    }
  }, []);

  // Recarregar dados do localStorage sempre que a aba for focada ou quando houver alteração em outra aba
  useEffect(() => {
    const handleSync = (e) => {
      try {
        if (e.type === 'focus') {
          const savedData = localStorage.getItem('devcollege_data');
          if (savedData) {
            const parsedData = JSON.parse(savedData);
            // reuse validation
            const isValidSavedState = (obj) => {
              if (!obj || typeof obj !== 'object') return false;
              if (!Array.isArray(obj.courses)) return false;
              if (!Array.isArray(obj.plans)) return false;
              if (!Array.isArray(obj.students)) return false;
              return true;
            };
            if (isValidSavedState(parsedData)) {
              dispatch({ type: ACTION_TYPES.LOAD_DATA, payload: parsedData });
            } else {
              console.warn('[AppContext] Ignoring invalid saved data on focus sync');
            }
          }
        } else if (e.key === 'devcollege_data' && e.storageArea === localStorage) {
          const savedData = localStorage.getItem('devcollege_data');
          if (savedData) {
            try {
              const parsedData = JSON.parse(savedData);
              const isValidSavedState = (obj) => {
                if (!obj || typeof obj !== 'object') return false;
                if (!Array.isArray(obj.courses)) return false;
                if (!Array.isArray(obj.plans)) return false;
                if (!Array.isArray(obj.students)) return false;
                return true;
              };
              if (isValidSavedState(parsedData)) {
                dispatch({ type: ACTION_TYPES.LOAD_DATA, payload: parsedData });
              } else {
                console.warn('[AppContext] Ignoring invalid saved data from storage event');
              }
            } catch (error) {
              console.error('Erro ao recarregar dados do localStorage:', error);
            }
          }
        }
      } catch (err) {
        console.error('Error in handleSync:', err);
      }
    };
    window.addEventListener('focus', handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('focus', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  // Salvar dados no localStorage sempre que o state mudar
  useEffect(() => {
    try {
      localStorage.setItem('devcollege_data', JSON.stringify(state));
      try {
        // small debug info to help trace persistence issues
        console.debug('[AppContext] Saved devcollege_data — courses:', (state.courses || []).length, 'plans:', (state.plans || []).length, 'students:', (state.students || []).length);
      } catch (e) {}
    } catch (error) {
      console.error('Erro ao salvar dados no localStorage:', error);
    }
  }, [state]);

  // Atualizar métricas automaticamente
  useEffect(() => {
    const totalStudents = state.students.length;
    const activeSubscriptions = state.students.filter(s => s.status === 'active').length;
    const monthlyRevenue = state.students.reduce((total, student) => {
      return total + (student.planPrice || 0);
    }, 0);
    const completionRate = state.students.length > 0 
      ? Math.round((state.students.filter(s => s.progress === 100).length / state.students.length) * 100)
      : 0;

    dispatch({
      type: ACTION_TYPES.UPDATE_METRICS,
      payload: {
        totalStudents,
        activeSubscriptions,
        monthlyRevenue,
        completionRate
      }
    });
  }, [state.students]);

  const value = {
    ...state,
    dispatch,
    actions: ACTION_TYPES
  };

  // Dev helper: expose a helper to add a course from the browser console for quick testing
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
      window.__dev_addCourse = (course) => {
        try {
          dispatch({ type: ACTION_TYPES.ADD_COURSE, payload: course });
          console.debug('[AppContext] dev helper added course', course);
        } catch (e) {
          console.error('dev addCourse failed', e);
        }
      };
      return () => { try { delete window.__dev_addCourse; } catch (e) {} };
    }
  }, [dispatch]);

  // One-time auto-correction: apply embedded images mapping to persisted courses and save.
  React.useEffect(() => {
    try {
      const markerKey = 'devcollege_images_autocorrected_v1';
      if (localStorage.getItem(markerKey)) return;
      // Only run if we have embedded images mapping
      if (!embeddedCourseImages) return;
      // Build normalized state using current state as base
      const normalizedCourses = (state.courses || []).map(c => {
        const idKey = String(c.id);
        if (embeddedCourseImages[idKey]) {
          return { ...c, image: embeddedCourseImages[idKey] };
        }
        return c;
      });
      const toSave = { ...state, courses: normalizedCourses };
      // Persist and dispatch new data
      localStorage.setItem('devcollege_data', JSON.stringify(toSave));
      dispatch({ type: ACTION_TYPES.LOAD_DATA, payload: toSave });
      localStorage.setItem(markerKey, '1');
      console.debug('[AppContext] Auto-applied embedded course images and saved state');
    } catch (err) {
      console.error('Auto-correction failed:', err);
    }
  }, []);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Hook personalizado
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp deve ser usado dentro de um AppProvider');
  }
  return context;
};