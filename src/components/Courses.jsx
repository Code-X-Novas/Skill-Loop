import { useState } from "react";
import CourseCard from "./CourseCard";
import { motion } from "framer-motion";
import { useEffect } from "react";

const courses = [
  {
    id: 1,
    title: "Digital Marketing",
    students: 400,
    description:
      "Learn SEO, social media, and content marketing. Ideal for beginners.",
    image: "https://picsum.photos/id/1015/500/300",
  },
  {
    id: 2,
    title: "Cybersecurity Essentials",
    students: 300,
    description: "Understand core cybersecurity principles and protection.",
    image: "https://picsum.photos/id/1011/500/300",
  },
  {
    id: 3,
    title: "Full Stack Web Dev",
    students: 600,
    description:
      "Master front-end and back-end using React, Node.js, and MongoDB.",
    image: "https://picsum.photos/id/1012/500/300",
  },
  {
    id: 4,
    title: "UI/UX Design",
    students: 250,
    description:
      "Design beautiful, user-centric interfaces with modern tools.",
    image: "https://picsum.photos/id/1016/500/300",
  },
  {
    id: 5,
    title: "Cloud Computing",
    students: 350,
    description:
      "Explore AWS, Azure, and deployment models in cloud systems.",
    image: "https://picsum.photos/id/1019/500/300",
  },
];

const CourseCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(2);

    const next = () => {
        setActiveIndex((prev) => (prev + 1) % courses.length);
    };

    const prev = () => {
        setActiveIndex((prev) =>
        prev === 0 ? courses.length - 1 : prev - 1
        );
    };

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
        
    useEffect(() => {
        setWindowWidth(Number(window.innerWidth));
        
        const handleResize = () => {
            setWindowWidth(Number(window.innerWidth));
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <section className="p-4 md:p-8 lg:p-16">
            <motion.h1 
              initial={{ opacity: 0, x: -100, y: 0 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.5 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold">Courses</motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: 0, y: 0 }}
              whileInView={{ opacity: 1, x: [windowWidth, -20, 0], y: 0 }}
              transition={{ duration: 2, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.5 }}
              className="text-gray-600 max-w-3xl mt-2 md:mt-4 text-sm md:text-base">
                Join us and be part of a transformative learning journey! Together, we'll create exceptional educational experiences that empower growth.
            </motion.p>

            <div className="flex w-full justify-end my-6">
                <motion.button 
                  initial={{ opacity: 0, x: 100, y: 0 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  viewport={{ once: true, amount: 0.1 }}
                  className="text-xs md:text-sm bg-gradient-to-b from-[#F4B860] to-[#D35244] bg-clip-text text-transparent border-2 border-[#F9A825] rounded-full py-1 md:py-2 px-4 md:px-8">
                    View All
                </motion.button>
            </div>
            <motion.div 
              initial={{ opacity: 0, x: 0, y: 100 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.1 }}
              className="w-full px-4 py-10 flex flex-col items-center relative overflow-hidden">
                <div className="relative w-full max-w-6xl h-[450px]">
                    {courses.map((course, index) => {
                    let position = index - activeIndex;

                    // Loop positioning
                    if (position < -2) position += courses.length;
                    if (position > 2) position -= courses.length;

                    const isActive = position === 0;
                    const opacity = Math.abs(position) > 1 ? 0 : 1;
                    const translateX = position * 110;
                    const translateY = isActive ? 0 : 30;

                    return (
                        <div
                        key={course.id}
                        className="absolute top-0 left-1/2 transition-all duration-500 ease-in-out"
                        style={{
                            transform: `translateX(${translateX}%) translateX(-50%) translateY(${translateY}px)`,
                            zIndex: 10 - Math.abs(position),
                            opacity,
                            transition: "transform 0.5s, opacity 0.5s",
                            height: isActive ? "420px" : "360px",
                        }}
                        >
                            <CourseCard {...course} isActive={isActive} />
                        </div>
                    );
                    })}
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-center mt-6 gap-6 z-10">
                    <button
                        onClick={prev}
                        className="bg-white border-2 border-orange-400 text-orange-500 hover:bg-orange-500 hover:text-white transition rounded-full w-10 h-10 flex items-center justify-center"
                    >
                        ←
                    </button>

                    
                    <div className="flex gap-2">
                        {courses.map((_, idx) => (
                        <div
                            key={idx}
                            onClick={() => setActiveIndex(idx)}
                            className={`w-3 h-3 rounded-full cursor-pointer transition ${
                            idx === activeIndex ? "bg-orange-500 w-6" : "bg-gray-300"
                            }`}
                        />
                        ))}
                    </div>

                    <button
                        onClick={next}
                        className="bg-white border-2 border-orange-400 text-orange-500 hover:bg-orange-500 hover:text-white transition rounded-full w-10 h-10 flex items-center justify-center"
                    >
                        →
                    </button>
                </div>

            </motion.div>
        </section>
    );
};

export default CourseCarousel;

