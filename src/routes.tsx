import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Organizations from './pages/Organizations';
import Users from './pages/Users';
import Courses from './pages/Courses';
import Classes from './pages/Classes';
import AcademicSessions from './pages/AcademicSessions';
import Dashboard from './pages/Dashboard';

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/organizations" element={<Organizations />} />
      <Route path="/users" element={<Users />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/classes" element={<Classes />} />
      <Route path="/academic-sessions" element={<AcademicSessions />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes; 