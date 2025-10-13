import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Estado inicial com dados de exemplo
const initialState = {
  courses: [
    {
      id: 1,
      title: 'Programação para Iniciantes',
      description: 'Introdução à lógica de programação com Scratch e Blockly',
      ageRange: '6-10 anos',
      duration: '12 semanas',
      price: 'R$ 149',
      color: '#6C63FF'
      ,
      lessons: [
        { id: '1-1', title: 'Introdução à Programação' },
        { id: '1-2', title: 'Sequências e Comandos' },
        { id: '1-3', title: 'Loops' },
        { id: '1-4', title: 'Condições' },
        { id: '1-5', title: 'Variáveis' },
        { id: '1-6', title: 'Eventos' },
        { id: '1-7', title: 'Funções' },
        { id: '1-8', title: 'Projeto Final' }
      ]
    },
    {
      id: 2,
      title: 'Criação de Games',
      description: 'Desenvolvimento de jogos com Roblox e Minecraft',
      ageRange: '8-12 anos',
      duration: '16 semanas',
      price: 'R$ 249',
      color: '#FF6584'
      ,
      lessons: [
        { id: '2-1', title: 'Conceitos de Game Design' },
        { id: '2-2', title: 'Blocos e Mecânicas' },
        { id: '2-3', title: 'Sprites e Animações' },
        { id: '2-4', title: 'Criação de Níveis' },
        { id: '2-5', title: 'Publicando seu Jogo' }
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
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        // loaded saved state from localStorage (no verbose logging in production)
        dispatch({ type: ACTION_TYPES.LOAD_DATA, payload: parsedData });
      } catch (error) {
        console.error('Erro ao carregar dados do localStorage:', error);
      }
    } else {
      console.log('[AppContext] Nenhum dado encontrado no localStorage, usando estado inicial.');
    }
  }, []);

  // Recarregar dados do localStorage sempre que a aba for focada ou quando houver alteração em outra aba
  useEffect(() => {
    const handleSync = (e) => {
      if (e.type === 'focus' || (e.key === 'devcollege_data' && e.storageArea === localStorage)) {
        const savedData = localStorage.getItem('devcollege_data');
        if (savedData) {
          try {
            const parsedData = JSON.parse(savedData);
            dispatch({ type: ACTION_TYPES.LOAD_DATA, payload: parsedData });
          } catch (error) {
            console.error('Erro ao recarregar dados do localStorage:', error);
          }
        }
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