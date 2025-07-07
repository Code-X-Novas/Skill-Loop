import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './layouts/Landing';

import LayoutWithSidebar from './components/Layout/LayoutWithSidebar';
import LayoutWithoutSidebar from './components/Layout/LayoutWithoutSidebar';

import ManageCourses from './pages/ManageCourses';
import CreateCourse from './pages/CreateCourse';
import Home from './pages/Home';
import ManagePosting from './pages/ManagePosting';
import ManageStudents from './pages/ManageStudent';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />

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
    </>
  );
}

export default App;
