import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { arrayUnion, collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { auth, fireDB } from "../firebase/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setAuthUser } from "../redux/authSlice";

function Internships() {
    const [internshipData, setInternshipData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);

    const [showDialog, setShowDialog] = useState(false);
    const [appliedInternshipId, setAppliedInternshipId] = useState(null);

    useEffect(() => {
        const fetchInternships = async () => {
            try {
                setLoading(true);
                const querySnapshot = await getDocs(
                    collection(fireDB, "internships")
                );
                const data = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setInternshipData(data);
            } catch (error) {
                console.error("Error fetching internships:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchInternships();
    }, []);

    const handleViewAll = () => {
        navigate("/internship");
    };

    const handleApplyClick = (internshipId, link) => {
        localStorage.setItem("appliedInternshipId", internshipId);
        window.open(link, "_blank");
    };

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

    return (
        <>
            {/* Heading */}
            <motion.h2
                initial={{ opacity: 0, x: -100, y: 0 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.5 }}
                id="internships"
                className="md:text-5xl text-4xl md:mt-0 mt-5 font-bold z-10"
            >
                Internships
            </motion.h2>

            {/* Text */}
            <motion.p
                initial={{ opacity: 0, x: 0, y: 0 }}
                whileInView={{ opacity: 1, x: [200, -20, 0], y: 0 }}
                transition={{ duration: 2, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.5 }}
                className="text-gray-600 md:text-md text-sm max-w-3xl mt-4 z-10"
            >
                Kickstart your future with an internship that matters. Learn,
                contribute, and grow alongside industry leaders in a dynamic
                environment.
            </motion.p>

            {/* view all */}
            <div className="flex w-full justify-end my-8 z-10">
                <motion.button
                    onClick={handleViewAll}
                    // initial={{ opacity: 0, x: 100, y: 0 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.1 }}
                    className="z-[10] text-xs md:text-sm  bg-gradient-to-b from-[#F4B860] to-[#D35244] 
                    bg-clip-text text-transparent  border-2 border-[#F9A825] rounded-full py-1 md:py-2 px-4 md:px-8 
                    cursor-pointer  hover:bg-gradient-to-b hover:from-[#D35244] hover:to-[#F4B860]
                    transition-all duration-300 hover:text-white hover:bg-clip-border hover:border-white"
                >
                    View All
                </motion.button>
            </div>

            {/* card */}
            <motion.div
                // initial={{ opacity: 0, x: 100, y: 0 }}
                whileInView={{ opacity: 1, x: [0, -20, 0], y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.5 }}
                className="overflow-x-auto scrollbar-hide relative z-10"
            >
                {loading ? (
                    <div className="w-full flex flex-col justify-center items-center py-10">
                        <motion.div
                            className="w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{
                                repeat: Infinity,
                                duration: 1,
                                ease: "linear",
                            }}
                        ></motion.div>
                        <div className="mt-4 text-gray-600 font-medium">
                            Loading, please wait...
                        </div>
                    </div>
                ) : internshipData.length === 0 ? (
                    <div className="w-full text-center text-gray-500 font-medium py-10">
                        No internships found.
                    </div>
                ) : (
                    <div className="flex space-x-4 w-max pb-4">
                        {internshipData.map((internship) => {
                            // Get middle slice of description if it’s long
                            const desc = internship.description || "";
                            // const midStart = Math.floor(desc.length / 3);

                            return (
                                <div
                                    key={internship.id}
                                    className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 w-80 flex-shrink-0 space-y-4"
                                >
                                    <span className="inline-block bg-[#FDF1DF] text-[#D97706] md:text-sm text-xs font-medium px-3 py-1 rounded-md">
                                        {internship.place || "Remote"}
                                    </span>

                                    <div>
                                        <h2 className="md:text-lg text-md font-bold text-gray-900">
                                            {internship.internshipName ||
                                                internship.title}
                                        </h2>
                                        <p className="text-gray-500 md:text-sm text-xs mt-1 line-clamp-2">
                                            {desc}...
                                        </p>
                                    </div>

                                    <div className="flex justify-between md:text-sm text-xs text-gray-500 font-medium">
                                        <span>
                                            {internship.startDate ||
                                                internship.postedDate}
                                        </span>
                                        <span className="text-gray-700 text-[13px] font-semibold">
                                            ₹{internship.MinStipend}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between pt-2">
                                        <div className="flex items-center space-x-3">
                                            <img
                                                src={
                                                    internship.company?.logo ||
                                                    "https://picsum.photos/150"
                                                }
                                                alt={
                                                    internship.company?.name ||
                                                    "Company"
                                                }
                                                className="md:w-10 md:h-10 w-8 h-8 rounded-full object-cover"
                                            />
                                            <div>
                                                <p className="font-semibold text-sm text-gray-900">
                                                    {internship.company?.name}
                                                </p>
                                                <p className="md:text-sm text-xs text-gray-500">
                                                    {internship.company?.address || "Remote"}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Apply Button */}
                                        <button
                                            onClick={() => handleApplyClick(internship.id, internship.googleFormLink)}
                                            disabled={user?.appliedInternships?.some((i) => i.id === internship.id)} // 👈 add disabled
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

                        {/* Confirmation Dialog */}
                        {showDialog && appliedInternshipId && (
                            <ApplyConfirmDialog
                                internshipId={appliedInternshipId}
                                onClose={() => setShowDialog(false)}
                            />
                        )}
                    </div>
                )}
            </motion.div>
        </>
    );
}

export default Internships;


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
