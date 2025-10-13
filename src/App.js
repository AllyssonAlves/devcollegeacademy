import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Home from './pages/Home';
import Admin from './pages/Admin';
import StudentArea from './pages/StudentArea';
import Courses from './pages/Courses';
import './styles/index.css';

function App() {
  return (
    <AppProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          {process.env.REACT_APP_ENABLE_ADMIN === 'true' && (
            <Route path="/admin" element={<Admin />} />
          )}
          <Route path="/aluno" element={<StudentArea />} />
          <Route path="/cursos" element={<Courses />} />
        </Routes>
      </div>
    </AppProvider>
  );
}

export default App;