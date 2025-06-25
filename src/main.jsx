import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Portfolio from './components/Portfolio.jsx'
import AboutPage from './pages/AboutPage.jsx'
import SkillsPage from './pages/SkillsPage.jsx'
import ProjectsPage from './pages/ProjectsPage.jsx'
import EducationPage from './pages/EducationPage.jsx'
import ExperiencePage from './pages/ExperiencePage.jsx'
import CertificationsPage from './pages/CertificationsPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import './styles/Portfolio.css'
import './styles/Pages.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/education" element={<EducationPage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/certifications" element={<CertificationsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
) 