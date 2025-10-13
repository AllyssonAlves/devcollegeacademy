import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
  // Exportação CSV
  const handleExportCSV = (type) => {
    let data = [];
    let filename = '';
    if (type === 'students') {
      data = students;
      filename = 'alunos.csv';
    } else if (type === 'courses') {
      data = courses;
      filename = 'cursos.csv';
    } else if (type === 'plans') {
      data = plans;
      filename = 'planos.csv';
    }
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Exportação Excel
  const handleExportExcel = (type) => {
    let data = [];
    let filename = '';
    if (type === 'students') {
      data = students;
      filename = 'alunos.xlsx';
    } else if (type === 'courses') {
      data = courses;
      filename = 'cursos.xlsx';
    } else if (type === 'plans') {
      data = plans;
      filename = 'planos.xlsx';
    }
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, type);
    XLSX.writeFile(workbook, filename);
  };
  // Função para gerar relatório PDF
  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Relatório de Métricas - DevCollege Academy', 14, 18);
    doc.setFontSize(12);
    doc.text(`Data/Hora: ${new Date().toLocaleString()}`, 14, 28);
    doc.text('---', 14, 34);
    doc.text(`Total de Alunos: ${metrics.totalStudents}`, 14, 44);
    doc.text(`Assinaturas Ativas: ${metrics.activeSubscriptions}`, 14, 52);
    doc.text(`Receita Mensal: R$ ${metrics.monthlyRevenue?.toLocaleString()}`, 14, 60);
    doc.text(`Taxa de Conclusão: ${metrics.completionRate}%`, 14, 68);
    doc.text('---', 14, 74);
    doc.text('Top 3 Cursos:', 14, 84);
    (dashboardData.topCourses || []).slice(0,3).forEach((c, i) => {
      doc.text(`${i+1}. ${c.name} - Matrículas: ${c.enrollments} - Receita: R$ ${c.revenue}`, 16, 92 + i*8);
    });
    doc.save('relatorio-metricas.pdf');
  };
import { useApp } from '../../context/AppContext';
import StatCard from './Widgets/StatCard';
import EnrollmentChart from './Charts/EnrollmentChart';
import RevenueChart from './Charts/RevenueChart';
import CoursePerformance from './Charts/CoursePerformance';
import StudentDemographics from './Charts/StudentDemographics';
import RecentActivity from './Widgets/RecentActivity';
import TopCourses from './Widgets/TopCourses';
import '../../styles/admin-metrics.css';

const MetricsDashboard = () => {
  const { metrics, students, courses, plans } = useApp();
  const [timeRange, setTimeRange] = useState('month');
  const [dashboardData, setDashboardData] = useState({});

  useEffect(() => {
    // Calcular dados em tempo real
    const recentEnrollments = students
      .slice(-5)
      .reverse()
      .map(student => ({
        id: student.id,
        student: student.name,
        course: student.course,
        date: student.enrollmentDate,
        amount: student.planPrice
      }));

    const topCourses = courses.map(course => {
      const courseStudents = students.filter(s => s.course === course.title);
      const revenue = courseStudents.reduce((total, student) => total + student.planPrice, 0);
      
      return {
        name: course.title,
        enrollments: courseStudents.length,
        revenue: revenue
      };
    }).sort((a, b) => b.enrollments - a.enrollments).slice(0, 5);

    setDashboardData({
      recentEnrollments,
      topCourses,
      studentDemographics: calculateDemographics(students),
      coursePerformance: calculatePerformance(courses, students)
    });
  }, [students, courses, plans]);

  const calculateDemographics = (students) => {
    const ageGroups = { '6-8': 0, '9-11': 0, '12-14': 0, '15-17': 0 };
    const genders = { Masculino: 0, Feminino: 0 };
    const regions = { Sudeste: 0, Sul: 0, Nordeste: 0, 'Centro-Oeste': 0, Norte: 0 };

    students.forEach(student => {
      // Simulação de dados demográficos
      const age = parseInt(student.age);
      if (age >= 6 && age <= 8) ageGroups['6-8']++;
      else if (age >= 9 && age <= 11) ageGroups['9-11']++;
      else if (age >= 12 && age <= 14) ageGroups['12-14']++;
      else if (age >= 15 && age <= 17) ageGroups['15-17']++;

      // Simulação de gênero (50/50 para exemplo)
      genders[Math.random() > 0.5 ? 'Masculino' : 'Feminino']++;

      // Simulação de região
      const regionsList = ['Sudeste', 'Sul', 'Nordeste', 'Centro-Oeste', 'Norte'];
      const randomRegion = regionsList[Math.floor(Math.random() * regionsList.length)];
      regions[randomRegion]++;
    });

    return { ageGroups, genders, regions };
  };

  const calculatePerformance = (courses, students) => {
    return courses.map(course => {
      const courseStudents = students.filter(s => s.course === course.title);
      const avgProgress = courseStudents.length > 0 
        ? Math.round(courseStudents.reduce((sum, s) => sum + s.progress, 0) / courseStudents.length)
        : 0;
      
      const satisfaction = 4.5 + (Math.random() * 0.5); // Simulação

      return {
        course: course.title,
        completion: avgProgress,
        satisfaction: Math.round(satisfaction * 10) / 10,
        enrollments: courseStudents.length
      };
    });
  };

  return (
    <div className="metrics-dashboard">
      <div className="dashboard-header">
        <h2>Dashboard de Métricas</h2>
        <button className="btn btn-primary" style={{marginRight:16}} onClick={handleGeneratePDF}>
          📄 Baixar Relatório PDF
        </button>
        <div style={{display:'inline-block'}}>
          <span style={{fontWeight:'bold', marginRight:8}}>Exportar:</span>
          <button className="btn btn-secondary" style={{marginRight:4}} onClick={() => handleExportCSV('students')}>Alunos CSV</button>
          <button className="btn btn-secondary" style={{marginRight:4}} onClick={() => handleExportCSV('courses')}>Cursos CSV</button>
          <button className="btn btn-secondary" style={{marginRight:12}} onClick={() => handleExportCSV('plans')}>Planos CSV</button>
          <button className="btn btn-secondary" style={{marginRight:4}} onClick={() => handleExportExcel('students')}>Alunos Excel</button>
          <button className="btn btn-secondary" style={{marginRight:4}} onClick={() => handleExportExcel('courses')}>Cursos Excel</button>
          <button className="btn btn-secondary" onClick={() => handleExportExcel('plans')}>Planos Excel</button>
        </div>
        <div className="time-range-selector">
          <button 
            className={timeRange === 'week' ? 'active' : ''}
            onClick={() => setTimeRange('week')}
          >
            Semana
          </button>
          <button 
            className={timeRange === 'month' ? 'active' : ''}
            onClick={() => setTimeRange('month')}
          >
            Mês
          </button>
          <button 
            className={timeRange === 'quarter' ? 'active' : ''}
            onClick={() => setTimeRange('quarter')}
          >
            Trimestre
          </button>
          <button 
            className={timeRange === 'year' ? 'active' : ''}
            onClick={() => setTimeRange('year')}
          >
            Ano
          </button>
        </div>
      </div>

      {/* Cards de Estatísticas com Dados Reais */}
      <div className="stats-grid">
        <StatCard
          title="Total de Alunos"
          value={metrics.totalStudents}
          change={12}
          changeType="positive"
          icon="👥"
        />
        <StatCard
          title="Assinaturas Ativas"
          value={metrics.activeSubscriptions}
          change={5}
          changeType="positive"
          icon="📊"
        />
        <StatCard
          title="Receita Mensal"
          value={`R$ ${metrics.monthlyRevenue?.toLocaleString()}`}
          change={8}
          changeType="positive"
          icon="💰"
        />
        <StatCard
          title="Taxa de Conclusão"
          value={`${metrics.completionRate}%`}
          change={3}
          changeType="positive"
          icon="🎯"
        />
      </div>

      {/* Gráficos com Dados Reais */}
      <div className="charts-grid">
        <div className="chart-card">
          <h3>Matrículas por Período</h3>
          <EnrollmentChart 
            timeRange={timeRange} 
            students={students}
          />
        </div>
        <div className="chart-card">
          <h3>Receita e Conversão</h3>
          <RevenueChart 
            timeRange={timeRange}
            students={students}
          />
        </div>
      </div>

      <div className="secondary-grid">
        <div className="chart-card">
          <h3>Performance dos Cursos</h3>
          <CoursePerformance data={dashboardData.coursePerformance} />
        </div>
        <div className="chart-card">
          <h3>Demografia dos Alunos</h3>
          <StudentDemographics data={dashboardData.studentDemographics} />
        </div>
      </div>

      {/* Widgets com Dados Reais */}
      <div className="widgets-grid">
        <RecentActivity activities={dashboardData.recentEnrollments || []} />
        <TopCourses courses={dashboardData.topCourses || []} />
      </div>
    </div>
  );
};

export default MetricsDashboard;