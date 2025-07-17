
import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { doc, getDoc, collection, getDocs, updateDoc, arrayUnion } from 'firebase/firestore';
import { fireDB } from '../firebase/FirebaseConfig';
import { CgNotes } from "react-icons/cg";
import { RiBookReadFill } from "react-icons/ri";
import { MdLiveTv } from "react-icons/md";
import { IoVolumeMedium } from "react-icons/io5";
import { CiLock } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser, setCart } from '../redux/authSlice';
import { toast } from 'react-toastify';

import user1 from '../img/user1.jpg';
import user2 from '../img/user2.jpg';
import Loading from '../components/Loader';

const reviews = [
  {
    pfp: user1,
    name: "Neha Sharma",
    day: "2 days ago",
    text: "The course was really insightful and easy to follow. Loved the hands-on examples!",
  },
  {
    pfp: user2,
    name: "Rahul Verma",
    day: "5 days ago",
    text: "Good coverage of topics. The instructor explained everything very clearly.",
  },
];

const CourseOverview = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const selectedLevel = location.state?.plan || 'Basic';

  const [course, setCourse] = useState(null);
  const [subCourse, setSubCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseRef = doc(fireDB, 'courses', id);
        const courseSnap = await getDoc(courseRef);

        if (courseSnap.exists()) {
          const courseData = courseSnap.data();
          setCourse(courseData);

          const subCol = collection(courseRef, 'subCategories');
          const subSnap = await getDocs(subCol);

          let foundSub = null;
          subSnap.forEach((doc) => {
            const data = doc.data();
            if (data.level?.toLowerCase() === selectedLevel.toLowerCase()) {
              foundSub = { id: doc.id, ...data };
            }
          });

          setSubCourse(foundSub);
        }
      } catch (error) {
        console.error('Error fetching course:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, selectedLevel]);


  const handleAddToCart = async () => {
  if (!user) {
    toast.error('Please login first!');
    navigate('/');
    return;
  }

  try {
    const uniqueId = `${id}_${subCourse.id}_${subCourse.level}`;

    // 🔹 1️⃣ Check local Redux state
    const isAlreadyInLocalCart = user.cart?.some((item) => item.id === uniqueId);

    // 🔹 2️⃣ Check latest Firestore cart
    const userRef = doc(fireDB, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    let isAlreadyInFirestoreCart = false;
    if (userSnap.exists()) {
      const userData = userSnap.data();
      const firestoreCart = userData.cart || [];
      isAlreadyInFirestoreCart = firestoreCart.some((item) => item.id === uniqueId);
    }

    if ( isAlreadyInLocalCart || isAlreadyInFirestoreCart) {
      toast.info('Item already in your cart.');
      navigate('/cart');
      return;
    }

    const cartItem = {
      id: uniqueId,
      courseId: id,
      subCourseId: subCourse.id,
      title: `${course.title} - ${subCourse.level}`,
      price: subCourse.price,
      image: course.thumbnail,
      duration: `${subCourse.videoDuration} mins`,
      startDate: 'Next Monday',
      addedAt: new Date().toISOString(),
    };

    // 🔹 Add to Firestore
    await updateDoc(userRef, {
      cart: arrayUnion(cartItem),
    });

    // 🔹 Update Redux too
    const updatedCart = user.cart ? [...user.cart, cartItem] : [cartItem];
    dispatch(setCart(updatedCart));

    toast.success('Added to cart!');
    navigate('/cart');
  } catch (error) {
    console.error(error);
    toast.error('Error adding to cart');
  }
};



 const handleBuyNow = async () => {
    if (!user) {
      toast.error("Please login first");
      navigate("/");
      return;
    }

    if (user.role === 'admin') {
      toast.error("Admins cannot purchase courses");
      return;
    }

    try {
      const courseTitle = `${course.title} - ${subCourse.level}`;
      const coursePrice = subCourse.price;

      const orderOptions = {
        key: "rzp_test_bEgUYtg6yXPfNV",
        amount: parseInt(coursePrice * 100),
        currency: "INR",
        name: "SkillLoop",
        description: `Purchase: ${courseTitle}`,
        order_receipt: `order_rcptid_${user.name}`,
        handler: async function (response) {
          const paymentId = response.razorpay_payment_id;
          const timestamp = new Date().toISOString();

          const userRef = doc(fireDB, 'users', user.uid);
          const courseRef = doc(fireDB, 'courses', id);
          const subCourseRef = doc(courseRef, 'subCategories', subCourse.id);

          const purchasedCourse = {
            courseId: id,
            subCourseId: subCourse.id,
            title: `${course.title} - ${subCourse.level}`,
            level: subCourse.level,
            price: coursePrice,
            image: course.thumbnail,
            paymentId,
            purchasedAt: timestamp,
          };

          await updateDoc(userRef, {
            yourCourses: arrayUnion(purchasedCourse),
          });

          await updateDoc(subCourseRef, {
            enrolledStudents: arrayUnion({
              uid: user.uid,
              email: user.email,
              name: user.name,
              photoURL: user.photoURL,
              purchasedAt: timestamp,
            }),
          });

          dispatch(setAuthUser({
            ...user,
            yourCourses: user.yourCourses ? [...user.yourCourses, purchasedCourse] : [purchasedCourse],
          }));

          toast.success("Payment successful! Course unlocked.");
          navigate("/yourcourses");
        },
        theme: {
          color: "#D35244",
        },
      };

      const razorpay = new window.Razorpay(orderOptions);
      razorpay.open();
    } catch (error) {
      console.error(error);
      toast.error("Payment initiation failed");
    }
  };


  // dummy card details :-  4386 2894 0766 0153


// useEffect( () => {
//   dispatch(setAuthUser({...user,cart:[]}))
// },[])


  if (loading) {
    return <p className="text-center py-20"><Loading/></p>;
  }

  if (!course || !subCourse) {
    return <p className="text-center py-20">Course or Subcategory not found.</p>;
  }

  return (
    <>

      <div className="max-w-6xl mx-auto px-4 py-2 text-gray-800">
        <p className="text-sm text-gray-500">{course.seo?.title || ''}</p>
        <h1 className="text-3xl font-bold mb-1">{course.title} - {subCourse.level}</h1>

        <div className="text-sm text-gray-600 mt-1 flex flex-wrap gap-1">
          <span className='text-red-400 mr-2'>By {course.seo?.title || 'Instructor'}</span>
          <FaStar className="text-yellow-300" />
          <span className="font-semibold">4.8</span> (123 ratings)
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start mt-6">
          <div className="md:col-span-2">
            <img src={course.thumbnail} alt="Course" className="w-full max-h-[400px] object-cover rounded-lg" />

            <div className="flex flex-wrap mt-6 font-semibold gap-4">
              {['description', 'course', 'review'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} className="cursor-pointer hover:underline hover:decoration-orange-500 capitalize">
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === 'description' && (
              <div className="mt-6 space-y-4">
                <h2 className="text-xl font-bold">About this {subCourse.level} Plan</h2>
                <p className="text-gray-700">
                  {subCourse.courseDescription}
                </p>
              </div>
            )}

            {(activeTab === 'description' || activeTab === 'course') && (
              <div className="mt-12">
                <h2 className="text-xl font-bold mb-2">Highlights</h2>
                <ul className="list-disc ml-6 text-gray-700">
                  {subCourse.highlightedHeadings.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            )}

            {(activeTab === 'description' || activeTab === 'course') && (
              <div className="mt-12">
                <h2 className="text-xl font-bold mb-2">Sections</h2>
                <ul className="list-disc ml-6 text-gray-700">
                  {subCourse.sections.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'review' && (
              <div className="mt-12 space-y-1">
                <h2 className="text-xl font-bold">Reviews</h2>
                <div>
                  {reviews.map((review, index) => (
                    <div key={index} className="flex flex-col sm:flex-row items-start gap-4 bg-white p-4">
                      <img src={review.pfp} alt={review.name} className="w-12 h-12 rounded-full object-cover" />
                      <div>
                        <p className="text-sm font-semibold text-yellow-500">{review.name}</p>
                        <p className="text-xs text-gray-500">{review.day}</p>
                        <p className="text-sm text-gray-700 mt-1">{review.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="md:col-span-1 md:top-20">
            <div className="bg-white border rounded-xl p-6 shadow-md flex flex-col justify-between h-full">
              <div className="mt-4">
                <div className="mb-4 flex gap-2">
                  <p className="text-xs font-bold text-gray-400 mt-2">Price</p>
                  <p className="text-xl font-semibold">₹{subCourse.price}</p>
                </div>
              </div>
              <div>
                <button onClick={handleBuyNow} className="w-full bg-gradient-to-r from-orange-400 via-orange-600 to-orange-600 text-white py-2 rounded-xl mt-4 cursor-pointer">
                  Buy Now
                </button>
                <button
                  onClick={handleAddToCart}
                  className="w-full border border-orange-500 text-orange-600 py-2 rounded-xl mt-3 cursor-pointer"
                >
                  Add to cart
                </button>
                <ul className="text-sm text-gray-600 space-y-2 mt-4">
                  <li className="flex items-center gap-2"><CgNotes className="text-lg" />{subCourse.sections.length} Sections</li>
                  <li className="flex items-center gap-2"><RiBookReadFill className="text-lg" />{subCourse.videoDuration} min duration</li>
                  <li className="flex items-center gap-2"><MdLiveTv className="text-lg" />{subCourse.level}</li>
                  <li className="flex items-center gap-2"><IoVolumeMedium className="text-lg" />{subCourse.language}</li>
                </ul>
              </div>
            </div>

            <div className="mt-4">
              <button className="w-full py-2 border rounded-full text-sm text-gray-500 flex items-center justify-center gap-2 font-semibold">
                <CiLock className="text-lg text-gray-500" /> Unlock
              </button>
              <button className="w-full mt-2 py-2 border rounded-full bg-gray-300 text-sm text-white font-semibold">
                Generate Certificate
              </button>
              <p className="text-xs text-center mt-1 text-black">
                <span className="text-red-500">*</span> It will be unlocked after completion
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[linear-gradient(to_right,white,#f0fdf4,#fefce8,white)]">
        <Footer />
      </div>
    </>
  );
};

export default CourseOverview;

