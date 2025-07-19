import { useEffect } from 'react';
import GlanceCard from '../components/cards/GlanceCard';
import EnrollmentTable from "../components/tables/EnrollmentTable";
import Internships from "../components/tables/InternshipApplicant";
import PaymentConfirmation from "../components/tables/PaymentConfirmation";

import JobOpeningsChart from "../components/Chart/JobOpeningsChart";
import StudentEnrollCharts from '../components/Chart/StudentEnrollChart';
import CourseGridDisplay from '../components/Chart/CourseGridDisplay';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate()

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user == null || user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);
  
  return (
  <div className="flex-1 p-8 space-y-8 bg-white overflow-auto">
    <h2 className="text-xl font-bold">Numbers at a Glance</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <GlanceCard title="Your Courses" className="h-50 w-full" ><CourseGridDisplay/></GlanceCard>
      <GlanceCard title="Students Enrolled" className="h-50 w-full" ><StudentEnrollCharts/></GlanceCard>
      <GlanceCard title="Job Openings" className="h-50 w-full" ><JobOpeningsChart /></GlanceCard>
      <GlanceCard title="Internships" className="h-50 w-full" ><JobOpeningsChart /></GlanceCard>
      <GlanceCard title="Certificates issued" className="h-50 w-full" ><JobOpeningsChart /></GlanceCard>
    </div>

   <div className="space-y-8">
      <h2 className="text-xl font-bold">Recent Enrollments</h2>
      <EnrollmentTable />

      <h2 className="text-xl font-bold">Internship Applicants</h2>
      <Internships />

      <h2 className="text-xl font-bold">Payment Confirmations</h2>
      <PaymentConfirmation />
    </div>
  </div>
);
}

export default Home;



