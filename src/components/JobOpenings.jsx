import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { arrayUnion, collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { auth, fireDB } from "../firebase/FirebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setAuthUser } from "../redux/authSlice";

function JobOpenings() {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    const user = useSelector((state) => state.auth.user);

    // for dialog
    const [showDialog, setShowDialog] = useState(false);
    const [appliedJobId, setAppliedJobId] = useState(null);

    const handleViewAll = () => {
        navigate("/jobopenings");
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const snapshot = await getDocs(collection(fireDB, "jobOpenings"));
                const jobsData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                // Sort jobs: "ppo" titled jobs come first
                const sortedJobs = jobsData.sort((a, b) => {
                    const isA_PPO = a.title?.toLowerCase() === "pre placement offer(ppo)";
                    const isB_PPO = b.title?.toLowerCase() === "pre placement offer(ppo)";
                    return isB_PPO - isA_PPO;
                });

                setJobs(sortedJobs);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching job openings:", error);
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    // Detect when user comes back from Google Form
    useEffect(() => {
        const handleFocus = () => {
            const jobId = localStorage.getItem("appliedJobId");
            if (jobId) {
                setAppliedJobId(jobId);
                setShowDialog(true);
            }
        };
        window.addEventListener("focus", handleFocus);
        return () => window.removeEventListener("focus", handleFocus);
    }, []);

    // Handle Apply Now Click
    const handleApplyClick = (jobId, link) => {
        localStorage.setItem("appliedJobId", jobId);
        window.open(link, "_blank"); // open Google Form in new tab
    };


    return (
        <>
            {/* Heading */}
            <motion.h2
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.5 }}
                id="job"
                className="md:text-5xl text-4xl font-bold lg:mt-16 md:mt-8 mt-4"
            >
                Job Openings
            </motion.h2>

            {/* Text */}
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1, x: [200, -20, 0] }}
                transition={{ duration: 2, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.5 }}
                className="text-gray-600 md:text-md text-sm max-w-3xl mt-4"
            >
                Launch your career with a role that makes an impact. Grow,
                innovate, and thrive alongside industry leaders in our dynamic
                workplace.
            </motion.p>

            {/* View all */}
            <div className="flex w-full justify-end my-8">
                <motion.button
                    onClick={handleViewAll}
                    // initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.1 }}
                    className="z-[10] text-xs md:text-sm 
                        bg-gradient-to-b from-[#F4B860] to-[#D35244] 
                        bg-clip-text text-transparent 
                        border-2 border-[#F9A825] rounded-full 
                        py-1 md:py-2 px-4 md:px-8 cursor-pointer 
                        transition-all duration-300
                        hover:text-white hover:bg-gradient-to-b hover:from-[#D35244] hover:to-[#F4B860] hover:bg-clip-border hover:border-white"
                >
                    View All
                </motion.button>
            </div>

            {/* Job Cards */}
            <motion.div
                // initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: [0, -20, 0] }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.5 }}
                className="overflow-x-auto scrollbar-hide relative z-10"
            >
                {loading ? (
                    <div className="text-center w-full py-10 text-gray-500">
                        Loading jobs...
                    </div>
                ) : jobs.length === 0 ? (
                    <div className="text-center w-full py-10 text-gray-500">
                        No job openings available right now.
                    </div>
                ) : (
                    <div className="flex space-x-4 w-max pb-4">
                        {jobs.map((job) => {
                            const desc = job.description || "";
                            const shortDesc = desc.slice(0, 100);

                            return (
                                <div
                                    key={job.id}
                                    className="bg-white justify-between flex flex-col rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 w-80 flex-shrink-0 space-y-4"
                                >
                                    <span className="inline-block w-fit bg-[#FDF1DF] text-[#D97706] md:text-sm text-xs font-medium px-3 py-1 rounded-md">
                                        {job.location || job.jobType || "N/A"}
                                    </span>

                                    <div>
                                        <h2 className="md:text-lg text-md font-bold text-gray-900">
                                            {job.title || "Untitled Job"}
                                        </h2>
                                        <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                                            {shortDesc}...
                                        </p>
                                    </div>

                                    <div className="flex justify-between md:text-sm text-xs text-gray-500 font-medium">
                                        <span>{job.startDate || "TBD"}</span>
                                        <span className="text-gray-700 font-semibold">
                                            {job.MinSalary && job.MaxSalary
                                                ? `₹${job.MinSalary}–₹${job.MaxSalary}`
                                                : ""}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between pt-2">
                                        <div className="flex items-center space-x-3">
                                            {job.company?.logo && (
                                                <img
                                                    src={job.company.logo}
                                                    alt={
                                                        job.company?.name ||
                                                        "Company"
                                                    }
                                                    className="md:w-10 md:h-10 h-8 w-8 rounded-full object-cover"
                                                />
                                            )}
                                            <div>
                                                <p className="font-semibold text-sm text-gray-900">
                                                    {job.company?.name ||
                                                        "Company"}
                                                </p>
                                                <p className="md:text-sm text-xs text-gray-500">
                                                    {job.company?.address ||
                                                        job.location ||
                                                        "N/A"}
                                                </p>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handleApplyClick(job.id, job.applicationLink)}
                                            disabled={!user || user?.appliedJobs?.some((i) => i.id === job.id)} // 👈 add disabled
                                            className={`text-xs font-semibold py-1 px-3 rounded-full transition
                                                            ${user?.appliedJobs?.some((i) => i.id === job.id)
                                                    ? "bg-green-500 text-white cursor-not-allowed"
                                                    : "bg-yellow-400 hover:bg-yellow-500 cursor-pointer text-black"
                                                }`}
                                        >
                                            {user?.appliedJobs?.some((i) => i.id === job.id)
                                                ? "Applied"
                                                : "Apply Now"}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </motion.div>

            {/* Apply Confirmation Dialog */}
            {showDialog && appliedJobId && (
                <ApplyConfirmDialog
                    jobId={appliedJobId}
                    onClose={() => setShowDialog(false)}
                />
            )}
        </>
    );
}

export default JobOpenings;


function ApplyConfirmDialog({ jobId, onClose }) {

    const dispatch = useDispatch();

    const handleResponse = async (applied) => {
        if (applied) {
            const userId = auth.currentUser?.uid;
            if (!userId) {
                toast.error("You must be logged in to apply for jobs.");
                return;
            }

            try {
                // Fetch job details
                const jobRef = doc(fireDB, "jobOpenings", jobId);
                const jobSnap = await getDoc(jobRef);
                if (!jobSnap.exists()) {
                    toast.error("Job not found.");
                    return;
                }
                const jobData = jobSnap.data();

                // Fetch user details
                const userRef = doc(fireDB, "users", userId);
                const userSnap = await getDoc(userRef);
                if (!userSnap.exists()) {
                    toast.error("User not found.");
                    return;
                }
                const userData = userSnap.data();

                // Build student object
                const studentDetails = {
                    id: userId,
                    name: userData.name || "",
                    email: userData.email || "",
                    college: userData.college || "",
                    contact: userData.contact || "",
                    date: new Date().toISOString(),
                };

                // Check if already applied in this job
                const alreadyApplied =
                    jobData.appliedStudents?.some((s) => s.id === userId) || false;

                if (!alreadyApplied) {
                    // Update job db with student details
                    await updateDoc(jobRef, {
                        appliedStudents: arrayUnion(studentDetails),
                    });
                }

                // Build job details object for user's record
                const appliedJobDetails = {
                    id: jobId,
                    title: jobData.title || "",
                    company: jobData.company?.name || "",
                    logo: jobData.company?.logo || "",
                    location: jobData.location || "",
                    jobType: jobData.jobType || "",
                    MinSalary: jobData.MinSalary || "",
                    MaxSalary: jobData.MaxSalary || "",
                    startDate: jobData.startDate || "",
                    applicationLink: jobData.applicationLink || "",
                    description: jobData.description || "",
                    date: new Date().toISOString(),
                };

                // Check if job already exists in user's appliedJobs
                const alreadyInUser =
                    userData.appliedJobs?.some((j) => j.id === jobId) || false;

                if (!alreadyInUser) {
                    await updateDoc(userRef, {
                        appliedJobs: arrayUnion(appliedJobDetails),
                    });
                }

                dispatch(setAuthUser({ ...userData, appliedJobs: [...userData.appliedJobs, appliedJobDetails] }));

                toast.success("Application confirmed ✅");
            } catch (error) {
                console.error("Error updating application:", error);
                toast.error("Something went wrong. Try again.");
            }
        }

        localStorage.removeItem("appliedJobId");
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl text-center space-y-4 w-80">
                <h2 className="text-lg font-semibold">Have you applied for this job?</h2>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={() => handleResponse(true)}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                    >
                        Yes
                    </button>
                    <button
                        onClick={() => handleResponse(false)}
                        className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
}
