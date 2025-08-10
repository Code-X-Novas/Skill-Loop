import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { TbCertificate, TbChecklist, TbShoppingBagSearch, } from "react-icons/tb";
import CourseTopicCard from "./CourseTopicCard";
import { fireDB } from "../firebase/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import QuizGraph from "./QuizGraph";

const QuizSection = () => {
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [quizes, setQuizes] = useState(0);
    const [attemptedQuiz, setAttemptedQuiz] = useState(0);

    useEffect(() => {
        if(!user) return;
        if(user.yourCourses && user.yourCourses.length > 0) {
            setCourses(user.yourCourses || []);
        } else{
            return;
        }
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
                }))

                setQuizes(questions.length);
            }
        };

        let certCount = 0;
        for (const course of courses) {
            if (course.score !== undefined) {
                certCount++;
            }
        }
        setAttemptedQuiz(certCount);

        if (user) {
            getQuestions();
        }
    }, [user, courses]);

    const statusColor = {
        Complete: "bg-[#E4EDE8] text-[#68946D]",
        Ongoing: "bg-[#D1EAFF] text-[#51749C]",
    };

    return (
        <div className="p-4 md:p-6 flex flex-col xl:flex-row gap-6">
            {/* Main content */}
            <div className="flex-1 flex flex-col gap-6">
                {/* Top Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                        {
                            label: "Total Quizes",
                            value: courses.length,
                            icon: (
                                <RiCalendarScheduleLine
                                    size={32}
                                    className="text-[#2A9D8F]"
                                />
                            ),
                        },
                        {
                            label: "Quiz Attempted",
                            value: attemptedQuiz || 0,
                            icon: (
                                <TbCertificate
                                    size={32}
                                    className="text-[#E76F51]"
                                />
                            ),
                        },
                        {
                            label: "Un - attempted Quiz",
                            value: courses.length - attemptedQuiz || 0,
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

                {/* My Quiz Table */}
                <div className="bg-white rounded-lg p-4">
                    <h2 className="text-lg font-semibold mb-4">My Quizes</h2>

                    {courses.length === 0 ? (
                        <p className="text-gray-500">
                            You have not purchased any courses yet.
                        </p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm min-w-[500px]">
                                <thead>
                                    <tr className="text-gray-500 border-b">
                                        <th className="py-2">Course Name</th>
                                        <th className="py-2">Result</th>
                                        <th className="py-2">Re-Attempt</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courses.map((course, idx) => {
                                        
                                        return (
                                            <tr
                                                key={idx}
                                                className="hover:bg-gray-50 cursor-pointer"
                                                onClick={() => {
                                                    const slug = course.title
                                                        .toLowerCase()
                                                        .replace(/\s+/g, "-");
                                                    navigate(
                                                        `/courses/${slug}/${course?.subCourseId}/quiz`,
                                                        { state: { course } }
                                                    )
                                                }}
                                            >
                                                <td className="flex items-center gap-3 py-3">
                                                    <img
                                                        src={course.image}
                                                        alt={course.title}
                                                        className="w-10 h-10 rounded-md object-cover"
                                                    />
                                                    <span>{course.title}</span>
                                                </td>
                                                {
                                                    course?.score !== undefined ? (
                                                        <td>
                                                            <span
                                                                className={`px-3 py-1 text-xs font-medium rounded-full ${statusColor[status]}`}
                                                            >
                                                                {course?.score}/{quizes}
                                                            </span>
                                                        </td>
                                                    ) : (
                                                        <td>
                                                            <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-200 text-gray-600">
                                                                Not Attempted
                                                            </span>
                                                        </td>
                                                    )

                                                }
                                                <td>
                                                    <div className={`bg-[#FAD7A0] w-fit text-xs rounded-full px-3 py-1.5`}>
                                                        {course?.score !== undefined ? `Re-Attempt` : `Attempt Now`}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Course Topic Card */}
            <div className="w-full lg:w-[300px] flex-shrink-0">
                <QuizGraph courses={courses} quizes={attemptedQuiz} />
            </div>
        </div>
    );
};

export default QuizSection;
