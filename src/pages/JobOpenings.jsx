import { useState, useEffect, useMemo } from "react";
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

function deriveExperienceBucket(job) {
    // Try explicit label first
    const explicit = (job.experienceLevel || job.level || "").toString();
    const known = ["Entry Level", "Mid-Level", "Senior Level", "No Experience"];
    if (explicit) {
        const match = known.find((k) => k.toLowerCase() === explicit.toLowerCase());
        if (match) return match;
    }

    // Collect potential numeric sources
    const minSources = [job.minExperience, job.minimumExperience, job.expMin, job.experienceMin];
    const maxSources = [job.maxExperience, job.maximumExperience, job.expMax, job.experienceMax];
    const singleSources = [job.experience, job.experienceYears, job.exp];

    let min = undefined;
    let max = undefined;

    for (const v of minSources) {
        if (v !== undefined && v !== null && v !== "") { min = Number(v); break; }
    }
    for (const v of maxSources) {
        if (v !== undefined && v !== null && v !== "") { max = Number(v); break; }
    }
    if (min === undefined && max === undefined) {
        for (const v of singleSources) {
            if (v !== undefined && v !== null && v !== "") { min = Number(v); break; }
        }
    }

    // If still not found, try parsing from a string field
    if (min === undefined && max === undefined) {
        const raw = (job.experience || job.experienceRequired || job.requirements || "").toString();
        if (raw) {
            const nums = (raw.match(/\d+/g) || []).map((n) => Number(n));
            if (nums.length >= 1) min = nums[0];
            if (nums.length >= 2) max = nums[1];
            if (nums.length === 1 && /\+/.test(raw)) {
                max = Number.POSITIVE_INFINITY;
            }
        }
    }

    const hasMin = typeof min === "number" && !Number.isNaN(min);
    const hasMax = typeof max === "number" && !Number.isNaN(max);
    const effectiveMax = hasMax ? max : (hasMin ? min : undefined);

    if (hasMin || hasMax) {
        if ((hasMin && min === 0) && (effectiveMax === 0)) return "No Experience";
        if ((hasMin && min <= 0) && (effectiveMax !== undefined && effectiveMax <= 2)) return "Entry Level"; // 0–2
        if ((hasMin && min >= 2) && (effectiveMax !== undefined && effectiveMax <= 5)) return "Mid-Level"; // 2–4 or 2–5
        return "Senior Level";
    }

    return "";
}

export default function JobOpenings() {
    const [filters, setFilters] = useState(initialFilters);
    const [allJobs, setAllJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [visibleJobs, setVisibleJobs] = useState([]);
    const [page, setPage] = useState(1);
    const [showMobileFilter, setShowMobileFilter] = useState(false);
    const [loading, setLoading] = useState(true);
    const [keyword, setKeyword] = useState("");
    const [location, setLocation] = useState("All Locations");

    const user = useSelector((state) => state.auth.user);

    // for dialog
    const [showDialog, setShowDialog] = useState(false);
    const [appliedJobId, setAppliedJobId] = useState(null);

    const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);

    const handleFilterChange = (label) => {
        const updatedFilters = { ...filters };
        const updateGroup = (group) =>
            group.map((f) => f.label === label ? { ...f, checked: !f.checked } : f);

        updatedFilters.types = updateGroup(updatedFilters.types);
        updatedFilters.experience = updateGroup(updatedFilters.experience);
        setFilters(updatedFilters);
        setPage(1);
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

    // Location options computed from data
    const locationOptions = useMemo(() => {
        const places = new Set();
        allJobs.forEach((j) => {
            if (j.location) places.add(j.location);
            if (j.company?.address) places.add(j.company.address);
        });
        return ["All Locations", ...Array.from(places)];
    }, [allJobs]);

    // Apply filtering and pagination
    useEffect(() => {
        const selectedTypes = filters.types.filter((f) => f.checked).map((f) => f.label);
        const selectedExperience = filters.experience.filter((f) => f.checked).map((f) => f.label);

        const normalizedKeyword = keyword.trim().toLowerCase();
        const normalizedLocation = location;

        const filtered = allJobs.filter((job) => {
            // Keyword
            if (normalizedKeyword) {
                const haystack = [
                    job.title,
                    job.description,
                    job.company?.name,
                    job.company?.address,
                    job.location,
                    job.jobType,
                ]
                    .filter(Boolean)
                    .join(" \u2022 ")
                    .toLowerCase();
                if (!haystack.includes(normalizedKeyword)) return false;
            }

            // Location
            if (normalizedLocation && normalizedLocation !== "All Locations") {
                const matchesLoc = (job.location || "").toLowerCase() === normalizedLocation.toLowerCase();
                const matchesAddr = (job.company?.address || "").toLowerCase() === normalizedLocation.toLowerCase();
                if (!matchesLoc && !matchesAddr) return false;
            }

            // Type of employment
            if (selectedTypes.length > 0) {
                const typeCandidates = new Set();
                const explicit = (job.jobType || job.type || job.employmentType || "").toString();
                if (explicit) typeCandidates.add(explicit);
                if ((job.location || "").toString().toLowerCase() === "remote") typeCandidates.add("Remote");

                const matchesType = selectedTypes.some((t) => {
                    for (const cand of typeCandidates) {
                        if (cand && cand.toString().toLowerCase() === t.toLowerCase()) return true;
                    }
                    return false;
                });
                if (!matchesType) return false;
            }

            // Experience level mapping
            if (selectedExperience.length > 0) {
                const bucket = deriveExperienceBucket(job);
                if (!bucket) return false;
                const matchesExp = selectedExperience.some((e) => e.toLowerCase() === bucket.toLowerCase());
                if (!matchesExp) return false;
            }

            return true;
        });

        setFilteredJobs(filtered);
        const endIndex = page * JOBS_PER_PAGE;
        setVisibleJobs(filtered.slice(0, endIndex));
    }, [allJobs, page, filters, keyword, location]);

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
                <JobHeader
                    keyword={keyword}
                    onKeywordChange={setKeyword}
                    location={location}
                    onLocationChange={(val) => { setLocation(val); setPage(1); }}
                    locations={locationOptions}
                    onSearch={() => setPage(1)}
                />

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
                                Showing <span className="font-bold">{visibleJobs.length}</span> of {filteredJobs.length} jobs
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