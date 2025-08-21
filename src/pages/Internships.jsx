import { useState, useEffect, useMemo } from "react";
import { JobSidebar } from "../components/Layout/JobSidebar.jsx";
import Footer from "../components/Footer.jsx";
import Background from "../ui/Background.jsx";
import Loading from "../components/Loader.jsx";
import { collection, getDocs, doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { fireDB, auth } from "../firebase/FirebaseConfig";
import { InternshipHeader } from "../components/InternshipHeader.jsx";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "../redux/authSlice.js";

const initialFilters = {
    types: [
        { label: "Full Time", checked: false },
        { label: "Part Time", checked: false },
        { label: "Remote", checked: false },
        { label: "Paid", checked: false },
        { label: "Unpaid", checked: false },
    ],
    experience: [
        { label: "No Experience", checked: false },
        { label: "Undergraduate", checked: false },
        { label: "Graduate", checked: false },
    ]
};

const INTERNSHIPS_PER_PAGE = 6;

export default function Internships() {
    const [filters, setFilters] = useState(initialFilters);
    const [allInternships, setAllInternships] = useState([]);
    const [filteredInternships, setFilteredInternships] = useState([]);
    const [visibleInternships, setVisibleInternships] = useState([]);
    const [page, setPage] = useState(1);
    const [showMobileFilter, setShowMobileFilter] = useState(false);
    const [loading, setLoading] = useState(true);
    const [keyword, setKeyword] = useState("");
    const [location, setLocation] = useState("All Locations");

    const user = useSelector((state) => state.auth.user);

    // For dialog
    const [showDialog, setShowDialog] = useState(false);
    const [appliedInternshipId, setAppliedInternshipId] = useState(null);

    const totalPages = Math.ceil(filteredInternships.length / INTERNSHIPS_PER_PAGE);

    const handleFilterChange = (label) => {
        const updatedFilters = { ...filters };
        const updateGroup = (group) =>
            group.map((f) => f.label === label ? { ...f, checked: !f.checked } : f);

        updatedFilters.types = updateGroup(updatedFilters.types);
        updatedFilters.experience = updateGroup(updatedFilters.experience);
        setFilters(updatedFilters);
        setPage(1);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleShowMore = () => {
        if (page < totalPages) {
            setPage((prev) => prev + 1);
        }
    };

    // Fetch all internships (runs only once on mount)
    useEffect(() => {
        const fetchInternships = async () => {
            setLoading(true);
            try {
                const snapshot = await getDocs(collection(fireDB, "internships"));
                const internshipsData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setAllInternships(internshipsData);
            } catch (error) {
                console.error("Error fetching internships:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchInternships();
    }, []);

    // Compute unique locations from data
    const locationOptions = useMemo(() => {
        const places = new Set();
        allInternships.forEach((i) => {
            if (i.place) places.add(i.place);
            if (i.company?.address) places.add(i.company.address);
        });
        return ["All Locations", ...Array.from(places)];
    }, [allInternships]);

    // Apply filters and pagination
    useEffect(() => {
        const selectedTypes = filters.types.filter((f) => f.checked).map((f) => f.label);
        const selectedExperience = filters.experience.filter((f) => f.checked).map((f) => f.label);

        const normalizedKeyword = keyword.trim().toLowerCase();
        const normalizedLocation = location;

        const filtered = allInternships.filter((internship) => {
            // Keyword filter
            if (normalizedKeyword) {
                const haystack = [
                    internship.internshipName,
                    internship.description,
                    internship.company?.name,
                    internship.company?.address,
                    internship.place,
                    internship.duration,
                ]
                    .filter(Boolean)
                    .join(" \u2022 ")
                    .toLowerCase();
                if (!haystack.includes(normalizedKeyword)) {
                    return false;
                }
            }

            // Location filter
            if (normalizedLocation && normalizedLocation !== "All Locations") {
                const matchesPlace = (internship.place || "").toLowerCase() === normalizedLocation.toLowerCase();
                const matchesAddress = (internship.company?.address || "").toLowerCase() === normalizedLocation.toLowerCase();
                if (!matchesPlace && !matchesAddress) {
                    return false;
                }
            }

            // Type of Employment filter
            if (selectedTypes.length > 0) {
                const stipend = parseFloat(internship.MinStipend ?? 0) || 0;
                const typeCandidates = new Set();
                // Derive known types from available fields
                if (internship.place === "Remote") typeCandidates.add("Remote");
                if (stipend > 0) typeCandidates.add("Paid");
                if (stipend <= 0) typeCandidates.add("Unpaid");
                // If dataset includes explicit employment type, use it
                const explicitType = (internship.employmentType || internship.type || internship.jobType || "").toString();
                if (explicitType) typeCandidates.add(explicitType);

                const matchesType = selectedTypes.some((t) => {
                    // Case-insensitive match across derived/explicit types
                    for (const cand of typeCandidates) {
                        if (cand && cand.toString().toLowerCase() === t.toLowerCase()) return true;
                    }
                    return false;
                });
                if (!matchesType) return false;
            }

            // Experience Level filter (if present in data)
            if (selectedExperience.length > 0) {
                const expField = (internship.experienceLevel || internship.experience || internship.level || "").toString();
                if (!expField) return false;
                const matchesExp = selectedExperience.some(
                    (e) => e.toLowerCase() === expField.toLowerCase()
                );
                if (!matchesExp) return false;
            }

            return true;
        });

        setFilteredInternships(filtered);

        const endIndex = page * INTERNSHIPS_PER_PAGE;
        setVisibleInternships(filtered.slice(0, endIndex));
    }, [allInternships, page, filters, keyword, location]);

    // Detect return from Google Form
    useEffect(() => {
        const handleFocus = () => {
            const internshipId = localStorage.getItem("appliedInternshipId");
            if (internshipId) {
                setAppliedInternshipId(internshipId);
                setShowDialog(true);
            }
        };
        window.addEventListener("focus", handleFocus);
        return () => window.removeEventListener("focus", handleFocus);
    }, []);

    // Handle Apply Click
    const handleApplyClick = (internshipId, link) => {
        localStorage.setItem("appliedInternshipId", internshipId);
        window.open(link, "_blank");
    };

    return (
        <>
            <div className="min-h-screen">
                <InternshipHeader
                    keyword={keyword}
                    onKeywordChange={setKeyword}
                    location={location}
                    onLocationChange={(val) => {
                        setLocation(val);
                        setPage(1);
                    }}
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

                <div className="flex flex-col sm:flex-row px-4 sm:px-8 lg:px-16 py-8 gap-8">
                    {/* Sidebar for Desktop */}
                    <div className="hidden xl:block">
                        <JobSidebar filters={filters} onChange={handleFilterChange} />
                    </div>

                    {loading ? (
                        <div className="w-full flex flex-col justify-center items-center py-10">
                            <Loading />
                        </div>
                    ) : visibleInternships.length === 0 ? (
                        <div className="text-center text-gray-500 font-medium py-10">
                            No internships found.
                        </div>
                    ) : (
                        <div className="flex-1">
                            <p className="text-xl my-4">
                                Showing <span className="font-bold">{visibleInternships.length}</span> of {filteredInternships.length} internships
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {visibleInternships.map((internship) => {
                                    const desc = internship.description || "";
                                    const shortDesc = desc.slice(0, 100);

                                    return (
                                        <div
                                            key={internship.id}
                                            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col space-y-4"
                                        >
                                            <span className="inline-block bg-[#FDF1DF] text-[#D97706] md:text-sm text-xs font-medium px-3 py-1 rounded-md w-max">
                                                {internship.place || "N/A"}
                                            </span>

                                            <div>
                                                <h2 className="md:text-lg text-md font-bold text-gray-900">
                                                    {internship.internshipName || "Untitled Internship"}
                                                </h2>
                                                <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                                                    {shortDesc}...
                                                </p>
                                            </div>

                                            <div className="flex justify-between md:text-sm text-xs text-gray-500 font-medium">
                                                <span>{internship.startDate || "TBD"}</span>
                                                <span className="text-gray-700 font-semibold">
                                                    {internship?.MinStipend}
                                                </span>
                                            </div>

                                            <div className="flex flex-wrap gap-2 items-center justify-between pt-2">
                                                <div className="flex items-center space-x-3">
                                                    {internship.company?.logo && (
                                                        <img
                                                            src={internship.company.logo}
                                                            alt={internship.company?.name || "Company"}
                                                            className="md:w-10 md:h-10 h-8 w-8 rounded-full object-cover"
                                                        />
                                                    )}
                                                    <div>
                                                        <p className="font-semibold text-sm text-gray-900">
                                                            {internship.company?.name || "Company"}
                                                        </p>
                                                        <p className="md:text-sm text-xs text-gray-500">
                                                            {internship.company?.address || internship.place || "N/A"}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Apply Button */}
                                                <button
                                                    onClick={() => handleApplyClick(internship.id, internship.googleFormLink)}
                                                    disabled={!user || user?.appliedInternships?.some((i) => i.id === internship.id)} // 👈 add disabled
                                                    className={`text-xs font-semibold py-1 px-3 rounded-full transition
                                                            ${user?.appliedInternships?.some((i) => i.id === internship.id)
                                                            ? "bg-green-500 text-white cursor-not-allowed"
                                                            : "bg-yellow-400 hover:bg-yellow-500 cursor-pointer text-black"
                                                        }`}
                                                >
                                                    {user?.appliedInternships?.some((i) => i.id === internship.id)
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

            {/* Confirmation Dialog */}
            {showDialog && appliedInternshipId && (
                <ApplyConfirmDialog
                    internshipId={appliedInternshipId}
                    onClose={() => setShowDialog(false)}
                />
            )}

            <Background>
                <Footer />
            </Background>
        </>
    );
}


// Apply Confirm Dialog
function ApplyConfirmDialog({ internshipId, onClose }) {

    const dispatch = useDispatch();

    const handleResponse = async (applied) => {
        if (applied) {
            const userId = auth.currentUser?.uid;
            if (!userId) {
                toast.error("You must be logged in to apply for internships.");
                return;
            }

            try {
                // Fetch internship details
                const internshipRef = doc(fireDB, "internships", internshipId);
                const internshipSnap = await getDoc(internshipRef);
                if (!internshipSnap.exists()) {
                    toast.error("Internship not found.");
                    return;
                }
                const internshipData = internshipSnap.data();

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

                // Check if already enrolled
                const alreadyEnrolled =
                    internshipData.enrolledInterns?.some((s) => s.id === userId) || false;

                if (!alreadyEnrolled) {
                    await updateDoc(internshipRef, {
                        enrolledInterns: arrayUnion(studentDetails),
                    });
                }

                // Build internship details for user's record
                const appliedInternshipDetails = {
                    id: internshipId,
                    internshipName: internshipData.internshipName || "",
                    company: internshipData.company?.name || "",
                    logo: internshipData.company?.logo || "",
                    place: internshipData.place || "",
                    MinStipend: internshipData.MinStipend || "",
                    MaxStipend: internshipData.MaxStipend || "",
                    startDate: internshipData.startDate || "",
                    googleFormLink: internshipData.googleFormLink || "",
                    description: internshipData.description || "",
                    duration: internshipData.duration || "",
                    date: new Date().toISOString(),
                };

                const alreadyInUser =
                    userData.appliedInternships?.some((i) => i.id === internshipId) || false;

                if (!alreadyInUser) {
                    await updateDoc(userRef, {
                        appliedInternships: arrayUnion(appliedInternshipDetails),
                    });
                }

                dispatch(setAuthUser({ ...userData, appliedInternships: [...userData.appliedInternships, appliedInternshipDetails] }));

                toast.success("Internship application confirmed ✅");
                
            } catch (error) {
                console.error("Error updating internship application:", error);
                toast.error("Something went wrong. Try again.");
            }
        }

        localStorage.removeItem("appliedInternshipId");
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl text-center space-y-4 w-80">
                <h2 className="text-lg font-semibold">Have you applied for this internship?</h2>
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
