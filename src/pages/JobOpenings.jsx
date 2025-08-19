import { useState, useEffect } from "react";
import { JobHeader } from "../components/JobHeader.jsx";
import { JobSidebar } from "../components/Layout/JobSidebar.jsx";
import Footer from "../components/Footer.jsx";
import Background from "../ui/Background.jsx";
import Loading from "../components/Loader.jsx";
import { collection, getDocs, doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { fireDB } from "../firebase/FirebaseConfig";
import { auth } from "../firebase/FirebaseConfig"; // make sure auth is exported from FirebaseConfig
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "../redux/authSlice.js";

const initialFilters = {
    types: [
        { label: "Full Time", checked: false },
        { label: "Part Time", checked: false },
        { label: "Contract", checked: false },
        { label: "Remote", checked: false },
        { label: "Training", checked: false }
    ],
    experience: [
        { label: "Entry Level", checked: false },
        { label: "Mid-Level", checked: false },
        { label: "Senior Level", checked: false },
        { label: "No Experience", checked: false }
    ]
};

const JOBS_PER_PAGE = 6;

export default function JobOpenings() {
    const [filters, setFilters] = useState(initialFilters);
    const [allJobs, setAllJobs] = useState([]);
    const [visibleJobs, setVisibleJobs] = useState([]);
    const [page, setPage] = useState(1);
    const [showMobileFilter, setShowMobileFilter] = useState(false);
    const [loading, setLoading] = useState(true);

    const user = useSelector((state) => state.auth.user);

    // for dialog
    const [showDialog, setShowDialog] = useState(false);
    const [appliedJobId, setAppliedJobId] = useState(null);

    const totalPages = Math.ceil(allJobs.length / JOBS_PER_PAGE);

    const handleFilterChange = (label) => {
        const updatedFilters = { ...filters };
        const updateGroup = (group) =>
            group.map((f) => f.label === label ? { ...f, checked: !f.checked } : f);

        updatedFilters.types = updateGroup(updatedFilters.types);
        updatedFilters.experience = updateGroup(updatedFilters.experience);
        setFilters(updatedFilters);
    };

    const handleShowMore = () => {
        if (page < totalPages) {
            setPage((prev) => prev + 1);
        }
    };

    // Scroll top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Fetch Jobs
    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            try {
                const snapshot = await getDocs(collection(fireDB, "jobOpenings"));
                const jobsData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setAllJobs(jobsData);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    // Pagination
    useEffect(() => {
        const endIndex = page * JOBS_PER_PAGE;
        const filtered = allJobs;
        const paginated = filtered.slice(0, endIndex);

        setVisibleJobs(paginated);
    }, [allJobs, page, filters]);

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
            <div className="min-h-screen">
                <JobHeader />

                {/* Mobile Filter Toggle */}
                <div className="xl:hidden flex justify-end px-4 sm:px-8 xl:px-16 mt-4">
                    <button
                        onClick={() => setShowMobileFilter(!showMobileFilter)}
                        className="px-4 py-2 border rounded-md border-gray-300 text-sm"
                    >
                        {showMobileFilter ? "Hide Filters" : "Show Filters"}
                    </button>
                </div>

                {/* Dropdown Filter for Mobile */}
                {showMobileFilter && (
                    <div className="xl:hidden px-4 sm:px-8 xl:px-16 py-4 bg-white z-10">
                        <JobSidebar filters={filters} onChange={handleFilterChange} />
                    </div>
                )}

                {/* main content */}
                <div className="flex flex-col sm:flex-row px-4 sm:px-8 lg:px-16 py-8 gap-8">
                    {/* Sidebar for Desktop */}
                    <div className="hidden xl:block">
                        <JobSidebar filters={filters} onChange={handleFilterChange} />
                    </div>

                    {loading ? (
                        <div className="w-full flex flex-col justify-center items-center py-10">
                            <Loading />
                        </div>
                    ) : visibleJobs.length === 0 ? (
                        <div className="text-center text-gray-500 font-medium py-10">
                            No jobs found.
                        </div>
                    ) : (
                        <div className="flex-1">
                            <p className="text-xl my-4">
                                Showing <span className="font-bold">{visibleJobs.length}</span> jobs
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {visibleJobs.map((job) => {
                                    const desc = job.description || "";
                                    const shortDesc = desc.slice(0, 100);

                                    return (
                                        <div
                                            key={job.id}
                                            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col space-y-4"
                                        >
                                            <span className="inline-block bg-[#FDF1DF] text-[#D97706] md:text-sm text-xs font-medium px-3 py-1 rounded-md w-max">
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

                                            <div className="flex flex-wrap gap-2 items-center justify-between pt-2">
                                                <div className="flex items-center space-x-3">
                                                    {job.company?.logo && (
                                                        <img
                                                            src={job.company.logo}
                                                            alt={job.company?.name || "Company"}
                                                            className="md:w-10 md:h-10 h-8 w-8 rounded-full object-cover"
                                                        />
                                                    )}
                                                    <div>
                                                        <p className="font-semibold text-sm text-gray-900">
                                                            {job.company?.name || "Company"}
                                                        </p>
                                                        <p className="md:text-sm text-xs text-gray-500">
                                                            {job.company?.address || job.location || "N/A"}
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

                            {page < totalPages && (
                                <div className="flex justify-center mt-8">
                                    <button
                                        onClick={handleShowMore}
                                        className="text-sm block bg-gradient-to-b from-[#F4B860] to-[#D35244] bg-clip-text text-transparent border-2 border-[#FDF1DF] rounded-full py-2 px-8 text-center z-40"
                                    >
                                        Show me more
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Apply Confirmation Dialog */}
            {showDialog && appliedJobId && (
                <ApplyConfirmDialog
                    jobId={appliedJobId}
                    onClose={() => setShowDialog(false)}
                />
            )}

            <Background>
                <Footer />
            </Background>
        </>
    );
}


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