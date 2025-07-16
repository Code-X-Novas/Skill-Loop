import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './layouts/Landing';
import CoursePlans from './pages/CoursePlans';
import CourseDetails from './pages/CourseDetails';
import CourseOverview from './pages/CourseOverview';
import Cart from './pages/Cart';import LayoutWithSidebar from './components/Layout/LayoutWithSidebar';
import LayoutWithoutSidebar from './components/Layout/LayoutWithoutSidebar';
import ManageCourses from './pages/ManageCourses';
import CreateCourse from './pages/CreateCourse';
import Home from './pages/Home';
import ManagePosting from './pages/ManagePosting';
import ManageStudents from './pages/ManageStudent';
import AddSubCourse from './pages/AddSubCategory';
import EditSubCategory from './pages/EditSubCategory';
import EditMainCourse from './pages/EditMainCourse';
import AddSubCategory from './pages/AddSubCategory';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import CreateInternshipOffer from './pages/CreateInternshipOffer';
import EditInternshipOffer from './pages/EditInternshipOffer';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/courses/:slug/:id/enroll" element={<CoursePlans />} />
      <Route path="/courses/:slug/details" element={<CourseDetails />} />
      <Route path="/courses/:slug/:id/overview" element={<CourseOverview />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/coursedetail" element={<CourseDetails />} />
      {/* <Route path="/adminsignin" element={<Navigate to="/dashboard" replace />} /> */}
      <Route element={
          <AdminProtectedRoute>
            <LayoutWithSidebar />
            </AdminProtectedRoute>
        }>
        <Route path="/dashboard" element={<Home />} />
        <Route path="/courses" element={<ManageCourses />} />
        <Route path="/postings" element={<ManagePosting />} />
        <Route path="/students" element={<ManageStudents />} />
      </Route>
        {/* ✅ Protected LayoutWithoutSidebar */}
      <Route
        element={
          <AdminProtectedRoute>
            <LayoutWithoutSidebar />
           </AdminProtectedRoute>
        }
      >
        <Route path="/courses/new" element={<CreateCourse />} />
        <Route path="/courses/:courseId/subcategory/:subCategoryId/edit" element={<EditSubCategory />} />
        <Route path="/courses/:courseId/edit" element={<EditMainCourse />} />
        <Route path="/courses/:courseId/subcategory/add" element={<AddSubCategory />} />
        <Route path="/postings/new" element={ <CreateInternshipOffer /> } />
        <Route path="/postings/edit/:internshipId" element={<EditInternshipOffer />} />
      </Route>

<Route path="/postings/new" element={ <CreateInternshipOffer /> } />


      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />


    </Routes>
  );
}

export default App;









