import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { fireDB } from "../firebase/FirebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loader";
import { setAuthUser } from "../redux/authSlice";

export default function Quiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [scenarioAnswers, setScenarioAnswers] = useState({});
    const [acceptedInstructions, setAcceptedInstructions] = useState(false);
    const [showQuiz, setShowQuiz] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const { user } = useSelector((store) => store.auth);
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const location = useLocation();
    const subcourseId = location.state?.course?.subCourseId || "";
    console.log("subcourseId from location:", subcourseId);

    useEffect(() => {
        const getQuestions = async () => {
            // 1. Find subCourseId by matching courseId
            const matchedCourse = user?.yourCourses?.find(
                (course) => course.courseId === id
            );

            if (matchedCourse) {

                // 2. Now fetch questions from Firestore
                const quizRef = collection(
                    fireDB,
                    "courses",
                    id,
                    "subCategories",
                    matchedCourse.subCourseId,
                    "quiz"
                );

                const snapshot = await getDocs(quizRef);
                const questions = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                    .sort((a, b) => Number(a.id) - Number(b.id))

                setQuestions(questions);
                setAnswers(Array(questions.length).fill(null));
            } else {
                console.warn("Course not found for given id:", id);
            }
        };

        if (user) {
            getQuestions();
        }
    }, [user, id]);

    const current = questions[currentQuestion];

    const handleAnswer = (value) => {
        const updated = [...answers];
        updated[currentQuestion] = value;
        setAnswers(updated);
    };

    const handleScenarioChange = (e) => {
        setScenarioAnswers({
            ...scenarioAnswers,
            [currentQuestion]: e.target.value,
        });
    };

    const next = () => {
        if (currentQuestion < questions.length - 1)
            setCurrentQuestion(currentQuestion + 1);
    };

    const prev = () => {
        if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
    };

    const score = answers.filter(
        (ans, idx) => ans === questions[idx].correctAnswer
    ).length;

    const attemptedCount = questions.reduce((count, _, idx) => {
        const hasOptionAnswer = answers[idx] !== null;
        const hasScenarioAnswer = scenarioAnswers[idx]?.trim() !== "";
        return count + (hasOptionAnswer || hasScenarioAnswer ? 1 : 0);
    }, 0);

    const handleSubmit = async () => {
        setSubmitted(true);
        const userRef = doc(fireDB, "users", user.uid);
        const progressRef = doc(fireDB, "userProgress", `${user.uid}_${id}_${subcourseId}`);

        setLoading(true);
        try {
            const userSnap = await getDoc(userRef);
            if (!userSnap.exists()) {
                console.error("User not found");
                return;
            }

            const userData = userSnap.data();
            console.log("userdata: ", userData);
            const courses = userData.yourCourses || [];
            console.log("id and subcourseId: ", id, subcourseId);

            const updatedCourses = [...courses];

            const existingIndex = updatedCourses.findIndex(
                (course) =>
                    course.courseId === id && course.subCourseId === subcourseId
            );

            if (existingIndex !== -1) {
                // ✅ Only update the score and attemptedQuestions of the matched course
                updatedCourses[existingIndex] = {
                    ...updatedCourses[existingIndex],
                    score,
                    attemptedQuestions: attemptedCount,
                };

                // ✅ Push updated yourCourses back to Firestore
                await updateDoc(userRef, { yourCourses: updatedCourses });

                console.log(`✅ Course updated:`, updatedCourses[existingIndex]);
            } else {
                console.warn("⚠️ Matched course not found. No updates made.");
            }

            // ✅ Set certificate eligibility 
            await setDoc(progressRef, { canGenerateCertificate: true }, { merge: true });
            console.log(`✅ Certificate eligibility set for user ${user.uid} in course ${id}`);

            // ✅ Update Redux
            dispatch(
                setAuthUser({
                    ...user,
                    yourCourses: updatedCourses,
                })
            );

            navigate(`/student/quiz`)

            console.log("✅ Score and Redux state updated successfully");
        } catch (error) {
            console.error("❌ Error updating score or progress:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Loading />
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-4">
            {/* Instructions Section */}
            {!showQuiz ? (
                <>
                    <h1 className="text-2xl md:text-3xl font-bold text-center mb-4 text-[#FC8A10]">
                        📝 Instructions Before You Begin the Quiz
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

                    <div className="flex items-center space-x-2 mb-6">
                        <input
                            type="checkbox"
                            id="confirm"
                            checked={acceptedInstructions}
                            onChange={(e) => setAcceptedInstructions(e.target.checked)}
                            className="w-4 h-4 text-orange-600 border-gray-300 focus:ring-[#FC8A10]"
                        />
                        <label htmlFor="confirm" className="text-sm text-gray-700">
                            I have read and understood the above instructions.
                        </label>
                    </div>

                    <div className="text-center">
                        <button
                            disabled={!acceptedInstructions}
                            onClick={() => setShowQuiz(true)}
                            className={`px-6 py-2 rounded-full cursor-pointer text-white font-semibold transition
                                ${acceptedInstructions
                                    ? "bg-[#FC8A10] hover:bg-[#e47b0e]"
                                    : "bg-gray-300 cursor-not-allowed"
                                }`}
                        >
                            Continue to Quiz
                        </button>
                    </div>
                </>
            ) : (
                <>
                    {/* Quiz title */}
                    <h1 className="text-2xl md:text-3xl font-bold text-center mb-4 text-[#FC8A10]">
                        MBA Analytics Quiz
                    </h1>

                    {/* Quiz Content */}
                    {!submitted && (
                        <div className="bg-white shadow rounded-lg p-4 space-y-4">
                            <h2 className="text-lg font-semibold">
                                {current.title} ({currentQuestion + 1}/{questions.length})
                            </h2>
                            <p className="text-gray-800">{current.question}</p>

                            {current.options && (
                                <div className="space-y-2">
                                    {Object.entries(current.options).map(([key, value]) => (
                                        <button
                                            key={key}
                                            onClick={() => handleAnswer(key)}
                                            className={`w-full text-left px-4 py-2 border rounded transition 
                                                ${answers[currentQuestion] === key
                                                    ? "bg-[#FC8A10] text-white"
                                                    : "bg-gray-100 hover:bg-orange-100"
                                                }`}
                                        >
                                            {value}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {!current.options && (
                                <div className="space-y-2">
                                    <p className="text-sm italic text-gray-500">
                                        {current.think || "Describe your approach briefly."}
                                    </p>
                                    <textarea
                                        rows={5}
                                        placeholder="Type your answer here..."
                                        className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#FC8A10]"
                                        value={scenarioAnswers[currentQuestion] || ""}
                                        onChange={handleScenarioChange}
                                    />
                                </div>
                            )}
                        </div>
                    )}

                    {/* Prev/Next/Submit */}
                    {!submitted && (
                        <div className="flex justify-between items-center mt-4">
                            <button
                                onClick={prev}
                                disabled={currentQuestion === 0}
                                className="px-4 py-2 rounded bg-gray-200 text-gray-800 disabled:opacity-50"
                            >
                                Prev
                            </button>
                            {currentQuestion < questions.length - 1 ? (
                                <button
                                    onClick={next}
                                    className="px-4 py-2 rounded bg-[#FC8A10] text-white hover:bg-[#e47b0e]"
                                >
                                    Next
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                                >
                                    Submit
                                </button>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
