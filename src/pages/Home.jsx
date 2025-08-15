import { useEffect, useState } from "react";
import GlanceCard from "../components/cards/GlanceCard";
import EnrollmentTable from "../components/tables/EnrollmentTable";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { fireDB } from "../firebase/FirebaseConfig";

const Home = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);

    const [totalCourses, setTotalCourses] = useState(0);
    const [totalEnrolledStudents, setTotalEnrolledStudents] = useState(0);
    const [totalJobs, setTotalJobs] = useState(0);
    const [totalInternships, setTotalInternships] = useState(0);
    const [totalCertificates, setTotalCertificates] = useState(0);
    const [studentsList, setStudentsList] = useState([]);

    useEffect(() => {
        if (!user || (user.role !== "admin" && user.role !== "superadmin")) {
            navigate("/");
        }
    }, [user, navigate]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("Fetching dashboard data...");
                let coursesCount = 0;
                let enrolledCount = 0;
                let certificatesCount = 0;
                let allStudents = [];

                // Get all main courses
                const coursesSnap = await getDocs(
                    collection(fireDB, "courses")
                );
                console.log("Courses found:", coursesSnap.size);

                for (const courseDoc of coursesSnap.docs) {
                    const courseId = courseDoc.id;
                    const courseData = courseDoc.data();
                    const mainCourseTitle =
                        courseData.title || "Untitled Course";

                    // Get subCategories under this course
                    const subCatSnap = await getDocs(
                        collection(fireDB, "courses", courseId, "subCategories")
                    );
                    console.log(
                        `SubCategories for ${courseId}:`,
                        subCatSnap.size
                    );

                    coursesCount += subCatSnap.size;

                    subCatSnap.forEach((subDoc) => {
                        const subData = subDoc.data();
                        console.log("SubCategory data:", subData);

                        const students = subData.enrolledStudents || [];
                        enrolledCount += students.length;

                        const subLevel = subData.level || "Unknown Level";
                        const courseTitleFull = `${mainCourseTitle} - ${subLevel}`;

                        students.forEach((student) => {
                            allStudents.push({
                                ...student,
                                courseTitle: courseTitleFull,
                            });
                        });

                        const certs = subData.generatedCertificates || [];
                        certificatesCount += certs.length;
                    });
                }

                console.log("✅ Final Courses:", coursesCount);
                console.log("✅ Final Enrolled:", enrolledCount);
                console.log("✅ Final Certificates:", certificatesCount);
                console.log("✅ Students:", allStudents);

                setTotalCourses(coursesCount);
                setTotalEnrolledStudents(enrolledCount);
                setTotalCertificates(certificatesCount);
                setStudentsList(allStudents);

                // Jobs
                const jobsSnap = await getDocs(
                    collection(fireDB, "jobOpenings")
                );
                setTotalJobs(jobsSnap.size);
                console.log("Job Openings:", jobsSnap.size);

                // Internships
                const internshipsSnap = await getDocs(
                    collection(fireDB, "internships")
                );
                setTotalInternships(internshipsSnap.size);
                console.log("Internships:", internshipsSnap.size);
            } catch (error) {
                console.error("❌ Dashboard fetch error:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex-1 p-8 space-y-8 bg-white overflow-auto">
            <h2 className="text-xl font-bold">Numbers at a Glance</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <GlanceCard title="Your Courses" className="h-50 w-full">
                    <p className="flex justify-center align-middle text-8xl font-bold">
                        {totalCourses}
                    </p>
                </GlanceCard>
                <GlanceCard title="Students Enrolled" className="h-50 w-full">
                    <p className="flex justify-center align-middle text-8xl font-bold">
                        {totalEnrolledStudents}
                    </p>
                </GlanceCard>
                <GlanceCard title="Job Openings" className="h-50 w-full">
                    <p className="flex justify-center align-middle text-8xl font-bold">
                        {totalJobs}
                    </p>
                </GlanceCard>
                <GlanceCard title="Internships" className="h-50 w-full">
                    <p className="flex justify-center align-middle text-8xl font-bold">
                        {totalInternships}
                    </p>
                </GlanceCard>
                <GlanceCard title="Certificates Issued" className="h-50 w-full">
                    <p className="flex justify-center align-middle text-8xl font-bold">
                        {totalCertificates}
                    </p>
                </GlanceCard>
            </div>

            <div className="space-y-8">
                <h2 className="text-xl font-bold">Recent Enrollments</h2>
                <EnrollmentTable students={studentsList} />
            </div>
        </div>
    );
};

export default Home;
