import { useState } from "react";
import { X, Loader } from "lucide-react";
import { fireDB, auth, googleProvider } from "../firebase/FirebaseConfig";
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile, } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/authSlice";

const CreateAccount = ({ onClose, onSwitchToSignIn }) => {
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // const handleSubmit = async () => {
    //     const { name, email, contact, referral, password } = formData;

    //     if (!name || !email || !contact || !password) {
    //         setError("Please fill in all required fields.");
    //         return;
    //     }

    //     try {
    //         setLoading(true);
    //         setError("");

    //         // Check if email already exists in Firestore
    //         const existingDoc = await getDoc(doc(fireDB, "users", email));
    //         if (existingDoc.exists()) {
    //             setError("User already exists. Please sign in.");
    //             setLoading(false);
    //             return;
    //         }

    //         // Create user in Firebase Auth (this automatically logs in the user)
    //         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    //         const user = userCredential.user;

    //         await updateProfile(user, { displayName: name });

    //         // Add user to Firestore
    //         await setDoc(doc(fireDB, "users", user.uid), {
    //             name,
    //             email,
    //             contact,
    //             referral: referral || "",
    //             createdAt: serverTimestamp(),
    //         });

    //         // 🔥 Fetch the newly created user from Firestore
    //         const userRef = doc(fireDB, "users", user.uid);
    //         const userSnap = await getDoc(userRef);

    //         if (!userSnap.exists()) {
    //             throw new Error("User data not found in Firestore.");
    //         }

    //         const userData = userSnap.data();

    //         // 🔥 Dispatch to Redux
    //         dispatch(
    //             setAuthUser({
    //                 ...userData,
    //                 uid: user.uid,
    //                 role: "student",
    //             })
    //         );

    //         toast.success("Account created successfully");

    //         if (onClose) onClose();
    //     } catch (err) {
    //         setError(err.message || "Failed to create account");
    //         toast.error("Failed to create account");
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // const handleGoogleSignIn = async () => {
    //     try {
    //         setLoading(true);
    //         setError("");

    //         const result = await signInWithPopup(auth, googleProvider);
    //         const user = result.user;

    //         const userDocRef = doc(fireDB, "users", user.uid);
    //         const userSnap = await getDoc(userDocRef);

    //         if (!userSnap.exists()) {
    //             await setDoc(userDocRef, {
    //                 name: user.displayName,
    //                 email: user.email,
    //                 contact: "",
    //                 referral: "",
    //                 createdAt: serverTimestamp(),
    //             });
    //         }

    //         // 🔥 Fetch the newly created user from Firestore
    //         const userRef = doc(fireDB, "users", user.uid);
    //         const userSnap2 = await getDoc(userRef);

    //         if (!userSnap2.exists()) {
    //             throw new Error("User data not found in Firestore.");
    //         }

    //         const userData = userSnap2.data();

    //         // 🔥 Dispatch to Redux
    //         dispatch(
    //             setAuthUser({
    //                 ...userData,
    //                 uid: user.uid,
    //                 role: "student",
    //             })
    //         );

    //         toast.success("Account created successfully");
    //         if (onClose) onClose();
    //     } catch (err) {
    //         setError(err.message || "Google Sign-In failed");
    //         toast.error("Google Sign-In failed");
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const serializeFirestoreData = (data) => {
        const result = { ...data };
        for (const key in result) {
            if (result[key] instanceof Timestamp) {
                result[key] = result[key].toDate().toISOString(); // convert
            }
        }
        return result;
    };

    const handleSubmit = async () => {
        const { name, email, contact, referral, password } = formData;

        if (!name || !email || !contact || !password) {
            setError("Please fill in all required fields.");
            return;
        }

        try {
            setLoading(true);
            setError("");

            // ✅ Check if email already exists in Firestore
            const existingDoc = await getDoc(doc(fireDB, "users", email));
            if (existingDoc.exists()) {
                setError("User already exists. Please sign in.");
                setLoading(false);
                return;
            }

            // ✅ Create user in Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await updateProfile(user, { displayName: name });

            // ✅ Add user to Firestore
            await setDoc(doc(fireDB, "users", user.uid), {
                name,
                email,
                contact,
                referral: referral || "",
                createdAt: serverTimestamp(),
            });

            // ✅ Fetch the newly created user from Firestore
            const userRef = doc(fireDB, "users", user.uid);
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) {
                throw new Error("User data not found in Firestore.");
            }

            const userData = serializeFirestoreData(userSnap.data());

            // ✅ Dispatch to Redux
            dispatch(
                setAuthUser({
                    ...userData,
                    uid: user.uid,
                    role: "student",
                })
            );

            toast.success("Account created successfully");
            if (onClose) onClose();
        } catch (err) {
            setError(err.message || "Failed to create account");
            toast.error("Failed to create account");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            setLoading(true);
            setError("");

            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            const userDocRef = doc(fireDB, "users", user.uid);
            const userSnap = await getDoc(userDocRef);

            if (!userSnap.exists()) {
                await setDoc(userDocRef, {
                    name: user.displayName,
                    email: user.email,
                    contact: "",
                    referral: "",
                    createdAt: serverTimestamp(),
                });
            }

            // ✅ Fetch again to ensure data is up-to-date
            const userSnap2 = await getDoc(userDocRef);

            if (!userSnap2.exists()) {
                throw new Error("User data not found in Firestore.");
            }

            const userData = serializeFirestoreData(userSnap2.data());

            // ✅ Dispatch to Redux
            dispatch(
                setAuthUser({
                    ...userData,
                    uid: user.uid,
                    role: "student",
                })
            );

            toast.success("Account created successfully");
            if (onClose) onClose();
        } catch (err) {
            setError(err.message || "Google Sign-In failed");
            toast.error("Google Sign-In failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4 sm:p-6">
            <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg relative overflow-y-auto scrollbar-hide">
                {onClose && (
                    <button
                        onClick={onClose}
                        className="absolute -top-2 -right-2 z-20 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200"
                        aria-label="Close sign in"
                    >
                        <X
                            size={20}
                            className="text-gray-600 cursor-pointer hover:text-gray-800"
                        />
                    </button>
                )}

                {/* form */}
                <div className="p-[1px] rounded-2xl sm:rounded-3xl bg-[radial-gradient(circle_at_bottom,#211B86,#FFB47B)]">
                    <div className="bg-white/98 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 relative ">
                        <div className="text-center mb-6 sm:mb-8 relative z-10">
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                                Create Account
                            </h1>
                            <p className="text-sm sm:text-base text-gray-600">
                                Please enter your details to sign up
                            </p>
                        </div>

                        {/* Form */}
                        <div className="space-y-4 sm:space-y-6 relative z-10">
                            {error && (
                                <div className="text-red-600 text-sm font-medium">
                                    {error}
                                </div>
                            )}

                            {/* name and email */}
                            <div className="flex gap-3">
                                {/* Name */}
                                <div className="bg-[#dcd6d4] justify-between flex flex-col p-2.5 rounded-lg sm:rounded-xl">
                                    <label
                                        htmlFor="name"
                                        className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Name<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        onChange={handleInputChange}
                                        className="w-full lg:placeholder:text-sm placeholder:text-xs focus:outline-none text-sm sm:text-base"
                                        placeholder="Enter your name"
                                    />
                                </div>

                                {/* Email */}
                                <div className="bg-[#dcd6d4] p-2.5 rounded-lg sm:rounded-xl">
                                    <label
                                        htmlFor="email"
                                        className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Email ID
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        onChange={handleInputChange}
                                        className="w-full lg:placeholder:text-sm placeholder:text-xs focus:outline-none text-sm sm:text-base"
                                        placeholder="Enter your email ID"
                                    />
                                </div>
                            </div>

                            {/* Password and Contact Number */}
                            <div className="flex gap-3">
                                {/* Password */}
                                <div className="bg-[#dcd6d4] p-2.5 rounded-lg sm:rounded-xl">
                                    <label
                                        htmlFor="password"
                                        className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Password
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        onChange={handleInputChange}
                                        className="w-full lg:placeholder:text-sm placeholder:text-xs focus:outline-none text-sm sm:text-base"
                                        placeholder="Enter a password"
                                    />
                                </div>

                                {/* Contact Number */}
                                <div className="bg-[#dcd6d4] p-2.5 rounded-lg sm:rounded-xl">
                                    <label
                                        htmlFor="contact"
                                        className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Contact Number
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        id="contact"
                                        name="contact"
                                        maxLength="10"
                                        onChange={handleInputChange}
                                        className="w-full lg:placeholder:text-sm placeholder:text-xs focus:outline-none text-sm sm:text-base"
                                        placeholder="Enter your contact number"
                                    />
                                </div>
                            </div>

                            {/* Referral Name */}
                            <div className="bg-[#dcd6d4] p-2.5 rounded-lg sm:rounded-xl">
                                <label
                                    htmlFor="referral"
                                    className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                                >
                                    Referral Name{" "}
                                    <span className="text-gray-400 text-xs">
                                        (if any)
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    id="referral"
                                    name="referral"
                                    onChange={handleInputChange}
                                    className="w-full lg:placeholder:text-sm placeholder:text-xs focus:outline-none text-sm sm:text-base"
                                    placeholder="Enter referral name if any"
                                />
                            </div>

                            {/* Sign Up Button */}
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="w-full cursor-pointer bg-gradient-to-r from-[#F4B860] to-[#D35244] text-white py-2.5 sm:py-3 px-4 rounded-lg sm:rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 text-sm sm:text-base"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <Loader className="w-4 h-4 animate-spin" />
                                        Please wait...
                                    </div>
                                ) : (
                                    "Sign Up"
                                )}
                            </button>

                            {/* Divider */}
                            <div className="flex items-center justify-center gap-4 my-4">
                                <div className="flex-grow h-px bg-gray-300"></div>
                                <span className="text-gray-600 text-sm font-medium">
                                    OR
                                </span>
                                <div className="flex-grow h-px bg-gray-300"></div>
                            </div>

                            {/* Google Sign-In Button */}
                            <button
                                type="button"
                                onClick={handleGoogleSignIn}
                                disabled={loading}
                                className="w-full cursor-pointer bg-gray-100 text-gray-700 py-2.5 sm:py-3 px-4 rounded-lg sm:rounded-xl font-medium flex items-center justify-center gap-2 sm:gap-3 hover:bg-gray-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm sm:text-base"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <Loader className="w-4 h-4 animate-spin" />
                                        Please wait...
                                    </div>
                                ) : (
                                    <>
                                        <img
                                            src="/google.svg"
                                            alt="Google Icon"
                                            className="w-4 h-4 sm:w-5 sm:h-5"
                                        />
                                        Continue with Google
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Last text */}
                        <div className="text-center sm:mt-4 mt-2 relative z-10">
                            <p className="text-gray-600 text-[11px] sm:text-xs">
                                Already have an account?
                                <button
                                    onClick={onSwitchToSignIn}
                                    className="text-red-500 font-semibold hover:text-red-600 transition-colors duration-200 ml-1 underline cursor-pointer"
                                >
                                    Sign In
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateAccount;
