import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import enrollBtn from "../img/enroll-button.png";
import enrollWhite from "../img/enroll-white.png";
import { HiOutlineLightBulb } from "react-icons/hi";
import vector7 from "../img/vector7.png";
import vector10 from "../img/vector10.png";

import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { fireDB } from "../firebase/FirebaseConfig";
import Loading from "../components/Loader";
import { useSelector } from "react-redux";
// import { setAuthUser } from "../redux/authSlice";

const CoursePlans = () => {
    const { slug, id } = useParams();
    const navigate = useNavigate();
    // const dispatch = useDispatch();

    const [course, setCourse] = useState(null);
    const [subCourses, setSubCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const user = useSelector((state) => state.auth.user);
    const purchasedCourses = user?.yourCourses || [];
    console.log("user from plan-", user);

    // useEffect(() => {
    //   const fetchCourse = async () => {
    //     try {
    //       // Fetch main course by ID
    //       const courseRef = doc(fireDB, 'courses', id);
    //       const courseSnap = await getDoc(courseRef);

    //       if (courseSnap.exists()) {
    //         setCourse(courseSnap.data());

    //         // Fetch subcategories
    //         const subCol = collection(courseRef, 'subCategories');
    //         const subSnap = await getDocs(subCol);

    //         const subList = [];
    //         subSnap.forEach((doc) => {
    //           subList.push({ id: doc.id, ...doc.data() });
    //         });
    //         setSubCourses(subList);
    //       } else {
    //         console.log('Course not found');
    //       }
    //     } catch (error) {
    //       console.error('Error fetching course:', error);
    //     } finally {
    //       setLoading(false);
    //     }
    //   };

    //   fetchCourse();
    // }, [id]);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const courseRef = doc(fireDB, "courses", id);
                const courseSnap = await getDoc(courseRef);

                if (courseSnap.exists()) {
                    setCourse(courseSnap.data());

                    const subCol = collection(courseRef, "subCategories");
                    const subSnap = await getDocs(subCol);

                    let subList = [];
                    subSnap.forEach((doc) => {
                        subList.push({ id: doc.id, ...doc.data() });
                    });

                    // ✅ Sort by expected order: Basic → Intermediate → Advanced
                    const order = ["Basic", "Intermediate", "Advanced"];
                    subList.sort((a, b) => {
                        return order.indexOf(a.level) - order.indexOf(b.level);
                    });

                    setSubCourses(subList);
                } else {
                    console.log("Course not found");
                }
            } catch (error) {
                console.error("Error fetching course:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [id]);

    const courseTitle = course?.title || "Course";
    const courseDescription = course?.onelineDescription || "";

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
                <div className="max-w-6xl mx-auto md:px-4 px-6 py-10 text-gray-800">
                    <h1 className="text-3xl font-bold mb-2">{courseTitle}</h1>
                    <p className="text-gray-600 text-base mb-8">
                        {courseDescription}
                    </p>

                    {loading ? (
                        <p>
                            <Loading />
                        </p>
                    ) : subCourses.length === 0 ? (
                        <p>No sub plans found for this course.</p>
                    ) : (
                        <div className="grid md:grid-cols-3 lg:gap-6 gap-4 md:mx-0 mx-2">
                            {subCourses.map((plan) => {
                                const isPurchased = purchasedCourses.some(
                                    (p) =>
                                        p.courseId === id &&
                                        p.subCourseId === plan.id
                                );

                                return (
                                    <div
                                        key={plan.id}
                                        className="group border border-[#F4B860] rounded-3xl shadow hover:shadow-lg transition-colors 
                                                    bg-white flex flex-col justify-between overflow-hidden hover:bg-gradient-to-br
                                                    hover:from-[#D35244] hover:to-[#F4B860] hover:text-white duration-300"
                                    >
                                        <div className="mx-auto w-full sm:w-[80%] md:w-[60%] bg-gradient-to-b from-orange-300 to-orange-400 text-center py-8 rounded-b-xl">
                                            <h2 className="font-normal text-white">
                                                {plan.level}
                                            </h2>
                                        </div>

                                        <div className="lg:px-6 px-4 py-3 flex flex-col justify-between">
                                            <p className="text-3xl font-semibold mb-4 py-6 text-center">
                                                ₹{plan.price}
                                            </p>

                                            <ul className="space-y-2 text-sm text-gray-600 text-center md:text-left">
                                                {plan.highlightedHeadings.map(
                                                    (feature, i) => (
                                                        <li
                                                            key={i}
                                                            className="flex items-center gap-2 md:ml-0 ml-10 md:justify-start"
                                                        >
                                                            <span className="text-orange-500 group-hover:text-white">
                                                                <HiOutlineLightBulb />
                                                            </span>
                                                            <span className="group-hover:text-white">
                                                                {feature}
                                                            </span>
                                                        </li>
                                                    )
                                                )}
                                            </ul>

                                            {isPurchased ? (
                                                <button
                                                    onClick={() =>
                                                        navigate(
                                                            `/courses/${slug}/${id}/overview`,
                                                            {
                                                                state: {
                                                                    plan: plan.level,
                                                                    price: plan.price,
                                                                },
                                                            }
                                                        )
                                                    }
                                                    className="mt-6 py-2 px-4 rounded-full bg-gradient-to-r from-orange-400 via-orange-600 to-orange-600 text-white text-center transition cursor-pointer"
                                                >
                                                    View
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() =>
                                                        navigate(
                                                            `/courses/${slug}/${id}/overview`,
                                                            {
                                                                state: {
                                                                    plan: plan.level,
                                                                    price: plan.price,
                                                                },
                                                            }
                                                        )
                                                    }
                                                    className="mt-6 py-2 px-4 rounded-full text-center transition text-white cursor-pointer"
                                                >
                                                    <div className="group relative w-fit mx-auto h-10">
                                                        <img
                                                            src={enrollBtn}
                                                            alt="Enroll"
                                                            className="h-10 absolute top-0 left-0 transition-opacity duration-300 opacity-100 group-hover:opacity-0"
                                                        />
                                                        <img
                                                            src={enrollWhite}
                                                            alt="Enroll White"
                                                            className="h-10 transition-opacity group-hover:scale-105 duration-300 opacity-0 group-hover:opacity-100"
                                                        />
                                                    </div>

                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default CoursePlans;
