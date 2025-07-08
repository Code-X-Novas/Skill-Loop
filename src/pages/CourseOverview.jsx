import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import course1 from '../img/course1.png';
import course2 from '../img/course2.png';
import course3 from '../img/course3.png';
import course4 from '../img/course4.png';
import course5 from '../img/course5.png';
import { CgNotes } from "react-icons/cg";
import { RiBookReadFill } from "react-icons/ri";
import { MdLiveTv } from "react-icons/md";
import { IoVolumeMedium } from "react-icons/io5";
import { CiLock } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { AiFillPlayCircle } from "react-icons/ai";
import { useCart } from '../components/CartContext';
import user1 from'../img/user1.jpg'
import user2 from'../img/user2.jpg'

const courseData = {
  'data-analytics': {
    title: 'Data Analytics for MBA',
    image: course1,
    role: 'Development / Mobile Engineer',
    instructor: 'Ankit Raj',
    rating: 4.8,
    totalRatings: 2343,
  },
  'hr-operations': {
    title: 'HR Operations & Analytics',
    image: course2,
    role: 'HR Strategist',
    instructor: 'Sneha Patel',
    rating: 4.7,
    totalRatings: 1892,
  },
  'marketing-growth': {
    title: 'Marketing & Digital Growth',
    image: course3,
    role: 'Digital Marketing Expert',
    instructor: 'Ravi Mehta',
    rating: 4.9,
    totalRatings: 2641,
  },
  'finance-strategy': {
    title: 'Finance Tools & Strategy',
    image: course4,
    role: 'Investment Analyst',
    instructor: 'Neha Kapoor',
    rating: 4.8,
    totalRatings: 2175,
  },
  'ai-prompt-engineering': {
    title: 'AI & Prompt Engineering for MBAs',
    image: course5,
    role: 'AI/Automation Consultant',
    instructor: 'Arjun Das',
    rating: 4.9,
    totalRatings: 3120,
  },
};

const curriculum = [
  {
    title: "Chapter 1: Course Overview",
    progress: "1/12 videos",
    duration: "28min",
    topics: [
      { title: "Introduction", time: "20min 50s" },
      { title: "What is Data Analytics?", time: "15min 22s" },
      { title: "Tools Used", time: "18min 40s" },
      { title: "Excel Basics", time: "25min 15s" },
      { title: "Charts and Visuals", time: "30min 5s" },
    ],
  },
  {
    title: "Chapter 2: Components",
    progress: "3/10 videos",
    duration: "35min",
    topics: [
      { title: "Power BI Setup", time: "22min 10s" },
      { title: "Connecting Data", time: "19min 32s" },
      { title: "Creating Dashboards", time: "24min 45s" },
    ],
  },
];

const reviews = [
  {
    pfp: user1,
    name: "neha Sharma",
    day: "2 days ago",
    text: "The course was really insightful and easy to follow. Loved the hands-on examples!",
  },
  {
    pfp: user2,
    name: "Rahul Verma",
    day: "5 days ago",
    text: "Good coverage of topics. The instructor explained everything very clearly.",
  },
];

const CourseOverview = () => {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const selectedPrice = location.state?.price || '₹ 12,000';
  const course = courseData[slug] || {};
  const courseTitle = course.title || 'Course';
  const courseImage = course.image || course1;

  const [activeTab, setActiveTab] = useState('description');

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-2 text-gray-800">
        <p className="text-sm text-gray-500">{course.role}</p>
        <h1 className="text-3xl font-bold mb-1">{courseTitle}</h1>

        <div className="text-sm text-gray-600 mt-1 flex flex-wrap gap-1">
          <span className='text-red-400 mr-2'>{course.instructor}</span> <FaStar className="text-yellow-300" /> <span className="font-semibold">{course.rating}</span> ({course.totalRatings} ratings)
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start mt-6">
          <div className="md:col-span-2">
            <img src={courseImage} alt="Course" className="w-full max-h-[400px] object-cover rounded-lg" />

            <div className="flex flex-wrap mt-6 font-semibold gap-4">
              {['description', 'course', 'review'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} className="cursor-pointer hover:underline hover:decoration-orange-500 capitalize">
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === 'description' && (
              <div className="mt-6 space-y-4">
                <h2 className="text-xl font-bold">About Course</h2>
                <p className="text-gray-700">
                  We’ll demonstrate Excel as a reporting & presentation framework for building clear dashboards.
                  Unlike other courses, this is tailored for MBA students & managers...
                </p>
              </div>
            )}

            {(activeTab === 'description' || activeTab === 'course') && (
              <div className="mt-12">
                <h2 className="text-xl font-bold mb-2">Course Curriculum</h2>
                <div className="bg-gray-100 rounded-lg overflow-hidden">
                  {curriculum.map((chapter, index) => (
                    <details key={index} className={`group ${index !== curriculum.length - 1 ? 'border-b border-gray-300' : ''}`}>
                      <summary className="flex justify-between items-center px-4 py-3 cursor-pointer list-none">
                        <div>
                          <p className="font-semibold">{chapter.title}</p>
                          <p className="text-sm text-gray-500">{chapter.progress} • <span className="text-yellow-600">{chapter.duration}</span></p>
                        </div>
                        <IoIosArrowForward className="text-xl text-gray-500 transition-transform duration-300 group-open:rotate-90" />
                      </summary>

                      <ul className="pb-4">
                        {chapter.topics.map((topic, i) => (
                          <li key={i} className="flex flex-col bg-gray-200 px-6 py-2 text-sm text-gray-700">
                            <div className="flex items-center gap-2">
                              <span>{topic.title}</span>
                            </div>
                            <div className="flex flex-row gap-1"><AiFillPlayCircle className="text-yellow-600 text-lg" />
                            <span className="text-xs text-gray-600">{topic.time}</span></div>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ))}
                </div>
              </div>
            )}

            {(activeTab === 'description' || activeTab === 'course' || activeTab === 'review') && (
              <div className="mt-12 space-y-1">
                  <h2 className="text-xl font-bold">Reviews</h2>
                <div>
                  {reviews.map((review, index) => (
                  <div key={index} className="flex flex-col sm:flex-row items-start gap-4 bg-white p-4">
                    <img src={review.pfp} alt={review.name} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <p className="text-sm font-semibold text-yellow-500">{review.name}</p>
                      <p className="text-xs text-gray-500">{review.day}</p>
                      <p className="text-sm text-gray-700 mt-1">{review.text}</p>
                    </div> 
                  </div>
                ))}
                <div className="flex justify-center mt-2">
                  <button className="text-xs text-black border border-black py-2 px-4 rounded hover:bg-gray-100 transition font-bold ">
                    Load more reviews
                  </button>
                </div>
                </div>
              </div>
            )}
          </div>

          <div className="md:col-span-1 md:top-20">
            <div className="bg-white border rounded-xl p-6 shadow-md flex flex-col justify-between h-full">
              <div className="mt-4">
                <div className="mb-4 flex gap-2">
                  <p className="text-xs font-bold text-gray-400 mt-2">Price</p>
                  <p className="text-xl font-semibold">{selectedPrice}</p>
                </div>
              </div>
              <div>
                <button className="w-full bg-gradient-to-r from-orange-400 via-orange-600 to-orange-600 text-white py-2 rounded-xl mt-4 cursor-pointer">
                  Buy Now
                </button>
                <button
                  onClick={() => {
                    addToCart({
                      id: slug,
                      title: courseTitle,
                      price: parseInt(selectedPrice.replace(/[^\d]/g, '')),
                      image: courseImage,
                      duration: '10h duration',
                      startDate: 'Next Monday'
                    });
                    navigate('/cart');
                  }}
                  className="w-full border border-orange-500 text-orange-600 py-2 rounded-xl mt-3 cursor-pointer"
                >
                  Add to cart
                </button>
                <ul className="text-sm text-gray-600 space-y-2 mt-4">
                  <li className="flex items-center gap-2"><CgNotes className="text-lg" />32 Sections</li>
                  <li className="flex items-center gap-2"><RiBookReadFill className="text-lg" />10h duration</li>
                  <li className="flex items-center gap-2"><MdLiveTv className="text-lg" />Beginner to Intermediate</li>
                  <li className="flex items-center gap-2"><IoVolumeMedium className="text-lg" />English</li>
                </ul>
              </div>
            </div>

            <div className="mt-4">
              <button className="w-full py-2 border rounded-full text-sm text-gray-500 flex items-center justify-center gap-2 font-semibold">
                <CiLock className="text-lg text-gray-500" /> Unlock
              </button>
              <button className="w-full mt-2 py-2 border rounded-full bg-gray-300 text-sm text-white font-semibold">
                Generate Certificate
              </button>
              <p className="text-xs text-center mt-1 text-black">
                <span className="text-red-500">*</span> It will be unlocked after completion
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[linear-gradient(to_right,white,#f0fdf4,#fefce8,white)]">
        <Footer />
      </div>
    </>
  );
};

export default CourseOverview;