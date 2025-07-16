
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import enrollBtn from '../img/enroll-button.png';
import { HiOutlineLightBulb } from 'react-icons/hi';
import { MdAccessTime } from 'react-icons/md';
import { IoRocketOutline } from 'react-icons/io5';
import vector7 from '../img/vector 7.png';
import vector10 from '../img/vector 10.png';

import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { fireDB } from '../firebase/FirebaseConfig';
import Loading from '../components/Loader';

const CoursePlans = () => {
  const { slug, id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [subCourses, setSubCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        // Fetch main course by ID
        const courseRef = doc(fireDB, 'courses', id);
        const courseSnap = await getDoc(courseRef);

        if (courseSnap.exists()) {
          setCourse(courseSnap.data());

          // Fetch subcategories
          const subCol = collection(courseRef, 'subCategories');
          const subSnap = await getDocs(subCol);

          const subList = [];
          subSnap.forEach((doc) => {
            subList.push({ id: doc.id, ...doc.data() });
          });
          setSubCourses(subList);
        } else {
          console.log('Course not found');
        }
      } catch (error) {
        console.error('Error fetching course:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const courseTitle = course?.title || 'Course';
  const courseDescription = course?.onelineDescription || '';

  return (
    <div className="relative bg-[#fff5e7] overflow-hidden">
      {/* Vectors */}
      <img
        src={vector7}
        alt="Vector"
        className="absolute top-0 right-0 w-[100px] md:w-[500px] z-0"
      />
      <img
        src={vector10}
        alt="Vector"
        className="absolute top-0 left-10 w-[700px] md:w-[1200px] z-0"
      />

      <div className="relative z-10">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-10 text-gray-800">
          <h1 className="text-3xl font-bold mb-2">{courseTitle}</h1>
          <p className="text-gray-600 text-base mb-8">{courseDescription}</p>

          {loading ? (
            <p><Loading/></p>
          ) : subCourses.length === 0 ? (
            <p>No sub plans found for this course.</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {subCourses.map((plan) => (
                <div
                  key={plan.id}
                  className="group border rounded-xl shadow hover:shadow-lg transition-colors duration-300
                  bg-white flex flex-col justify-between overflow-hidden 
                  hover:bg-gradient-to-br 
                  hover:from-red-700 
                  hover:via-orange-600 
                  hover:to-orange-300 
                  hover:text-white"
                >
                  <div className="mx-auto w-full sm:w-[80%] md:w-[60%] bg-gradient-to-b from-orange-300 to-orange-400 text-center py-6 rounded-md">
                    <h2 className="text-sm font-semibold text-white">{plan.level}</h2>
                  </div>

                  <div className="px-6 py-6 flex flex-col justify-between">
                    <p className="text-3xl font-semibold mb-4 py-6 text-center">₹{plan.price}</p>

                    <ul className="space-y-2 text-sm text-gray-600 text-center md:text-left">
                      {plan.highlightedHeadings.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 justify-center md:justify-start"
                        >
                          <span className="text-orange-500 group-hover:text-white">
                            <HiOutlineLightBulb />
                          </span>
                          <span className="group-hover:text-white">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() =>
                        navigate(`/courses/${slug}/${id}/overview`, {
                          state: { plan: plan.level, price: plan.price },
                        })
                      }
                      className="mt-6 py-2 px-4 rounded-full text-center transition text-white cursor-pointer"
                    >
                      <img
                        src={enrollBtn}
                        alt="Enroll"
                        className="h-10 mx-auto transition-transform duration-300 group-hover:scale-110"
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default CoursePlans;
