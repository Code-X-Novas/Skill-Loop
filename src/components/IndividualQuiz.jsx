import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { TbCertificate, TbChecklist, } from "react-icons/tb";
import { fireDB } from "../firebase/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import IndividualGraph from "./IndividualGraph";

const IndividualQuiz = () => {
    const user = useSelector((state) => state.auth.user);
    const [courses, setCourses] = useState([]);
    const [quizes, setQuizes] = useState(0);
    const location = useLocation();
    const [course, setCourse] = useState(location.state?.course || {});
    const navigate = useNavigate();
    console.log("course: ", course);

    useEffect(() => {
        if (user) {
            setCourses(user.yourCourses || []);
            console.log("✅ Set courses", user.yourCourses);
        }

        if (location.state?.course) {
            setCourse(location.state.course);
            console.log("✅ Set course from location", location.state.course);
        }
    }, [user, location.state]);

    useEffect(() => {
        if (!course?.courseId || !course?.subCourseId || !courses.length) return;

        const matchedCourse = courses.find(
            (c) =>
                c.courseId === course.courseId &&
                c.subCourseId === course.subCourseId
        );

        if (matchedCourse) {
            setCourse(matchedCourse); // update with fresh details like score etc.
            console.log("✅ Found matchedCourse", matchedCourse);
        } else {
            console.warn("❌ Course not found in user's courses");
        }
    }, [courses, course]);

    useEffect(() => {
        const getQuestions = async () => {
            for (const course of courses) {
                const quizRef = collection(
                    fireDB,
                    "courses",
                    course.courseId,
                    "subCategories",
                    course.subCourseId,
                    "quiz"
                );

                const snapshot = await getDocs(quizRef);
                const questions = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setQuizes(questions.length);
            }
        };

        if (courses.length && user) {
            getQuestions();
        }
    }, [courses, user]);

    return (
        <div className="p-6 md:px-10 lg:px-16 flex flex-col xl:flex-row gap-6">
            {/* Main content */}
            <div className="flex-1 flex flex-col gap-6">
                {/* Top Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        {
                            label: "Total Questions",
                            value: quizes,
                            icon: (
                                <RiCalendarScheduleLine
                                    size={32}
                                    className="text-[#2A9D8F]"
                                />
                            ),
                        },
                        {
                            label: "Score",
                            value: course?.score,
                            icon: (
                                <RiCalendarScheduleLine
                                    size={32}
                                    className="text-[#2A9D8F]"
                                />
                            ),
                        },
                        {
                            label: "Attempted Questions",
                            value: course?.attemptedQuestions || 0,
                            icon: (
                                <TbCertificate
                                    size={32}
                                    className="text-[#E76F51]"
                                />
                            ),
                        },
                        {
                            label: "Unattempted Questions",
                            value: quizes - course?.attemptedQuestions,
                            icon: (
                                <TbChecklist
                                    size={32}
                                    className="text-[#A6CEAB]"
                                />
                            ),
                        },
                    ].map((stat, idx) => (
                        <div
                            key={idx}
                            className="border rounded-lg lg:px-4 md:px-3 px-4 lg:py-6 py-4 shadow-sm bg-white"
                        >
                            <div className="flex items-center lg:gap-2 md:gap-1 gap-2 mb-2">
                                <div className="text-gray-500 font-semibold">
                                    {stat.icon}
                                </div>
                                <p className="text-md text-gray-600">
                                    {stat.label}
                                </p>
                            </div>
                            <p className="text-3xl font-bold">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Instruction and graph */}
                <div className="flex sm:flex-row flex-col-reverse mt-5 gap-5">
                    {/* Instruction */}
                    <div className="bg-white w-full">
                        <h1 className="text-2xl md:text-3xl font-bold text-center mb-4 text-[#FC8A10]">
                            Instructions
                        </h1>

                        <ul className="list-disc space-y-3 text-gray-700 px-4 mb-6 text-justify">
                            <li>
                                <strong>Mandatory Participation:</strong> Completing this quiz is <span className="text-red-500 font-semibold">mandatory</span>. If you do not attend, your certificate <strong>will not be generated</strong>.
                            </li>
                            <li>
                                <strong>Minimum Passing Criteria:</strong> Score at least <strong>60%</strong> to qualify for the course certificate.
                            </li>
                            <li>
                                <strong>No External Help:</strong> Please avoid taking help. This quiz assesses your real understanding.
                            </li>
                            <li>
                                <strong>Technical Suggestions:</strong>
                                <ul className="list-disc pl-6 mt-1">
                                    <li>Ensure a stable internet connection.</li>
                                    <li>Do not refresh the page during the quiz.</li>
                                    <li>Use a modern browser like Chrome or Edge.</li>
                                </ul>
                            </li>
                        </ul>

                        {/* Button */}
                        <div className=" flex justify-center">
                            <button
                                onClick={() => {
                                    const slug = course.title.toLowerCase().replace(/\s+/g, '-');
                                    navigate(`/courses/${slug}/${course.courseId}/overview/quiz`, { state: { subCourseId: course.subCourseId } })
                                }}
                                className="w-fit py-2 px-4 border cursor-pointer rounded-full bg-gradient-to-r from-green-400 via-green-600 to-green-600 text-white text-sm font-semibold"
                            >
                                Attend Quiz
                            </button>
                        </div>
                    </div>

                    {/* Graph */}
                    <div className="pb-4">
                        <IndividualGraph course={course} quizes={quizes} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IndividualQuiz;
