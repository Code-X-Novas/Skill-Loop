import { Routes, Route, Navigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './layouts/Landing';
import Navbar from './components/Navbar';

import LayoutWithSidebar from './Components/Layout/LayoutWithSidebar';
import LayoutWithoutSidebar from './Components/Layout/LayoutWithoutSidebar';

import ManageCourses from './pages/ManageCourses';
import CreateCourse from './pages/CreateCourse';
import Home from './pages/Home';
import ManagePosting from './pages/ManagePosting';
import ManageStudents from './pages/ManageStudent';

import SEO from './components/SEO'; 
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Info from "./components/Info";
import Navbar from "./components/Navbar";
import WhySkillLoop from "./components/WhySkillLoop";
import Faqs from "./components/Faqs";
import Background from "./ui/Background";
import Internships from "./components/Internships";
import JobOpenings from "./components/JobOpenings";
import CourseCarousel from "./components/Courses";
import Testimonials from "./components/Testimonials";

const LandingPage = () => (
  <div className="scroll-smooth">
    <SEO />
    <Navbar />
    <Hero />
    <Info />
    <WhySkillLoop />
    <CourseCarousel />
    <Internships />
    <JobOpenings />
    <Testimonials />
    <Background>
      <Faqs />
      <Footer />
    </Background>
  </div>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/adminsignin" element={<Navigate to="/dashboard" replace />} />

      <Route element={<LayoutWithSidebar />}>
        <Route path="/dashboard" element={<Home />} />
        <Route path="/courses" element={<ManageCourses />} />
        <Route path="/postings" element={<ManagePosting />} />
        <Route path="/students" element={<ManageStudents />} />
      </Route>

      <Route element={<LayoutWithoutSidebar />}>
        <Route path="/courses/new" element={<CreateCourse />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
