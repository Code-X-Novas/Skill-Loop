import React, { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { updateDoc, doc, arrayUnion, getDoc } from "firebase/firestore";
import { fireDB } from "../firebase/FirebaseConfig";
import { toast } from "react-toastify";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/authSlice";
import axios from "axios";

const CertificateGenerator = ({ user, course, subCourse, courseId, onClose }) => {
    const [loading, setLoading] = useState(false);
    const didRun = useRef(false);
    const dispatch = useDispatch();
    const previewRef = useRef();

    useEffect(() => {
        if (didRun.current) {
            console.warn("Certificate generation already triggered");
            return;
        }
        didRun.current = true;
        const generateCertificate = async () => {
            try {
                const certElement = document.getElementById("certificate-download");
                certElement.classList.remove("hidden");

                // 1️⃣ HTML to PNG
                const canvas = await html2canvas(certElement, { scale: 2 });
                const imgBlob = await new Promise((resolve) =>
                    canvas.toBlob(resolve, "image/png")
                );

                // 2️⃣ Upload PNG to Cloudinary
                const formData = new FormData();
                formData.append("file", imgBlob);
                formData.append("upload_preset", "my_unsigned_upload");

                const uploadRes = await axios.post(
                    "https://api.cloudinary.com/v1_1/dfhrlgaxw/image/upload",
                    formData
                );

                const uploadedUrl = uploadRes.data.secure_url;
                if (!uploadedUrl) throw new Error("Upload failed");

                if (!user?.uid || !courseId || !subCourse?.id) {
                    throw new Error("Missing user or course information");
                }

                const userRef = doc(fireDB, "users", user.uid);
                const userSnap = await getDoc(userRef);
                const userData = userSnap.data();

                if (!userData || !userData.yourCourses) {
                    toast.error("No purchased courses found.");
                    setLoading(false);
                    return;
                }

                const updatedYourCourses = [...userData.yourCourses];
                const index = updatedYourCourses.findIndex(
                    (c) => c.courseId === courseId && c.subCourseId === subCourse.id
                );

                if (index === -1) {
                    toast.error("Course not found in yourCourses");
                    setLoading(false);
                    return;
                }

                if (updatedYourCourses[index].certificate) {
                    toast.info("✅ Certificate already generated!");
                    setLoading(false);
                    return;
                }

                const subCourseRef = doc(
                    fireDB,
                    "courses",
                    courseId,
                    "subCategories",
                    subCourse.id
                );
                const subSnap = await getDoc(subCourseRef);
                const subData = subSnap.data();
                const certs = subData?.generatedCertificates || [];

                if (certs.some((c) => c.uid === user.uid)) {
                    toast.info("✅ Certificate already generated for this subcategory!");
                    setLoading(false);
                    return;
                }

                updatedYourCourses[index].certificate = uploadedUrl;
                updatedYourCourses[index].certificateGenerated = true;

                await updateDoc(userRef, {
                    yourCourses: updatedYourCourses,
                });

                await updateDoc(subCourseRef, {
                    generatedCertificates: arrayUnion({
                        uid: user.uid,
                        name: user.name || "",
                        certificate: uploadedUrl,
                        generatedAt: new Date().toISOString(),
                    }),
                });

                // ✅ Also update Redux state with updated yourCourses
                dispatch(
                    setAuthUser({
                        ...user,
                        yourCourses: updatedYourCourses,
                    })
                );
                certElement.classList.add("hidden");

                setLoading(false);
                toast.success("🎉 Certificate generated & saved!");
            } catch (err) {
                console.error("Certificate error:", err);
                toast.error("Error generating certificate");
                setLoading(false);
            }
        };
        generateCertificate();
    }, [user, courseId, subCourse, dispatch]);

    const handleDownload = () => {
        const certElement = document.getElementById("certificate-download");
        certElement.classList.remove("hidden");
        html2canvas(certElement, { scale: 2 }).then((canvas) => {
            const pdf = new jsPDF("landscape", "mm", "a4");
            const imgData = canvas.toDataURL("image/png");
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save(`${user.name}_Certificate.pdf`);

            certElement.classList.add("hidden");
        });
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white p-4 rounded-xl w-[95%] md:w-[85%] max-w-5xl relative overflow-y-auto max-h-[95vh] flex flex-col items-center">
                {/* Cross Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 z-10 cursor-pointer right-4 md:text-2xl text-gray-600 hover:text-black"
                >
                    ❌
                </button>

                {/* Certificate Preview */}
                <div
                    id="certificate-preview"
                    ref={previewRef}
                    className="relative h-auto max-w-[1200px] mx-auto"
                >
                    <img
                        src="/New_Certificate.png"
                        alt="Certificate Template"
                        className="w-full h-auto object-contain"
                    />

                    <div className="absolute xl:top-[47%] top-[46%] left-1/2 transform -translate-x-1/2 text-center font-serif text-[2.5vw] xl:text-2xl font-bold">
                        {user.name}
                    </div>
                    <div className="absolute lg:top-[55.4%] top-[55%] left-[54.4%] transform -translate-x-1/2 text-center font-serif text-[1.5vw] xl:text-[16px]">
                        {course.title?.split(" ").slice(0, 3).join(" ")}
                    </div>
                    <div className="absolute lg:top-[58.5%] md:top-[58%] top-[58.5%] left-[64.5%] transform -translate-x-1/2 text-center font-serif text-[1.5vw] xl:text-[16px]">
                        {new Date().toLocaleDateString()}
                    </div>
                    <div className="absolute top-[65.5%] left-[24.5%] transform -translate-x-1/2 text-center font-serif text-[1.5vw] xl:text-lg font-bold">
                        {user.name.split(" ")[0]}
                    </div>
                </div>

                {/* Hidden Download Version */}
                <div
                    id="certificate-download"
                    className="relative w-[1200px] h-[849px] hidden"
                >
                    <img
                        src="/New_Certificate.png"
                        alt="Certificate"
                        className="w-full h-full object-cover"
                    />

                    <div className="absolute top-[380px] text-[28px] font-bold font-serif text-center w-full">
                        {user.name}
                    </div>
                    <div className="absolute left-[50px] top-[460px] text-[18px] font-serif text-center w-full">
                        {course.title?.split(" ").slice(0, 3).join(" ")}
                    </div>
                    <div className="absolute left-[180px] top-[490px] text-[18px] font-serif text-center w-full">
                        {new Date().toLocaleDateString()}
                    </div>
                    <div className="absolute -left-[300px] top-[550px] text-[20px] font-bold font-serif text-center w-full">
                        {user.name.split(" ")[0]}
                    </div>
                </div>

                {/* Download Button */}
                {!loading && (
                    <button
                        onClick={handleDownload}
                        className="lg:mt-6 mt-3 px-6 py-2 text-xs md:text-base cursor-pointer bg-gradient-to-r from-orange-400 via-orange-600 to-orange-600 text-white rounded-lg"
                    >
                        Download Certificate
                    </button>
                )}
            </div>
        </div>
    );
};

export default CertificateGenerator;

