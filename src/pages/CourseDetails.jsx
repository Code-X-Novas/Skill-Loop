import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import course1 from "../img/course1.png";
import course2 from "../img/course2.png";
import course3 from "../img/course3.png";
import course4 from "../img/course4.png";
import course5 from "../img/course5.png";

const courseData = {
  'data-analytics': {
    img: course1,
    title: 'Data Analytics for MBA',
    description:
      'Learn to make data-driven decisions using Excel, Power BI, and real business case studies tailored for management professionals.',
  },
  'hr-operations': {
    img: course2,
    title: 'HR Operations & Analytics',
    description:
      'Covers HRMS, ATS, analytics, budgeting, and scorecards to build modern HR workflows.',
  },
  'marketing-growth': {
    img: course3,
    title: 'Marketing & Digital Growth',
    description:
      'Introduces SEO, digital funnels, social media, ads, analytics and automation for brand growth.',
  },
  'finance-strategy': {
    img: course4,
    title: 'Finance Tools & Strategy',
    description:
      'Master budgeting, forecasting, and investment planning with real-world finance dashboards.',
  },
  'ai-prompt-engineering': {
    img: course5,
    title: 'AI & Prompt Engineering for MBAs',
    description:
      'Learn how to use AI tools like ChatGPT for content, workflows, and business automation.',
  },
};

const CourseDetails = () => {
  const navigate = useNavigate();
  const courses = Object.entries(courseData);

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-12 text-gray-800">
        <h1 className="text-2xl md:text-4xl font-bold mb-6 text-center md:text-left">Explore Courses</h1>

        {courses.map(([slug, course]) => (
          <div
            key={slug}
            className="bg-white rounded-xl border shadow-sm p-2 md:p-4 mb-6 flex flex-col md:flex-row  items-center md:items-start justify-between gap-4 md:gap-6"
          >
            <img
              src={course.img}
              alt={course.title}
              className="w-full md:w-36 h-34 md:h-20 rounded-md object-cover"
            />
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-lg font-semibold">{course.title}</h2>
              <p className="text-gray-600 text-sm mt-1">{course.description}</p>
            </div>
            <button
              onClick={() => {
                navigate(`/courses/${slug}/enroll`);
                window.scrollTo({ top: 0, behavior: "instant" });
              }}
              className="text-sm font-medium border-2 border-orange-500 text-orange-600 px-4 py-1.5 rounded-full bg-white transition-all duration-500 hover:text-white hover:border-transparent hover:bg-gradient-to-r hover:from-orange-400 hover:to-orange-600 cursor-pointer lg:mt-6 md:mt-6"
            >
              View All
            </button>
          </div>
        ))}
      </div>

      <div className="bg-[linear-gradient(to_right,white,#f0fdf4,#fefce8,white)]">
        <Footer />
      </div>
    </>
  );
};

export default CourseDetails;
