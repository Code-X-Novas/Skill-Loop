import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    role: "Software Engineer",
    image: "https://picsum.photos/id/1005/300",
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.`,
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Data Analyst",
    image: "https://picsum.photos/id/1011/300",
    text: `Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
  },
  {
    id: 3,
    name: "Alex Johnson",
    role: "UX Designer",
    image: "https://picsum.photos/id/1012/300",
    text: `Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const active = testimonials[activeIndex];

  return (
    <div className="lg:p-16 md:p-8 p-4 mb-8 overflow-y-visible">
        <motion.h1 
          initial={{ opacity: 0, x: -100, y: 0 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.5 }}
          className="md:text-6xl text-4xl font-bold text-gray-900 md:mb-8 mb-4">Testimonials</motion.h1>
        <div className="justify-center relative flex flex-col items-center md:gap-8 gap-2">
            
            <motion.div 
              initial={{ opacity: 1, x: 0, y: 100 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.5 }}
              className="bg-linear-to-b from-[#F9A825] to-[#F4B860] text-white p-4 rounded-full shadow-md md:w-20 md:h-20 h-12 w-12">
                <motion.img src='/quote.svg' alt="Quote Icon" 
                  initial={{ opacity: 0, x: -100, y: 0 }}
                  whileInView={{ opacity: 1, x: [0, 10, 0], y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                  viewport={{ once: true, amount: 0.5 }}
                  className="w-full h-full" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 1, x: 0, y: 100 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
              className="rounded-t-xl shadow-2xl bg-[#F9F6F0] md:w-[80vw] w-full flex flex-col">
                <div className="relative flex flex-col items-center text-center font-semibold bg-white p-10 rounded-br-full md:text-3xl text-sm">
                    <p>Millions search for answers every month…</p>
                    <p>But true growth comes from structured learning</p>
                    <span className="absolute top-0 right-0 transform md:translate-x-1/2 -translate-y-1/2 md:translate-y-0 md:h-24 md:w-24 h-12 w-12 bg-[#F4B860] rounded-full shadow-[#FF727242] shadow-lg"></span>
                </div>

                <div className="bg-white">
                    <div className="bg-[#F9F6F0] p-6 rounded-tl-[150px] flex md:flex-row flex-col items-center justify-around md:px-24 px-4 md:py-12 py-2 md:gap-8 gap-4">
                        <div className="relative">
                            <div className="bg-[#E28050]/50 rounded-md p-1 -mb-3 z-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-[200px] md:h-[340px] sm:w-[100px] sm:h-[240px] w-[50px] h-[140px]"></div>
                            <img
                                src={active.image}
                                alt={active.name}
                                className="rounded-lg relative z-10 md:w-[300px] md:h-[300px] sm:w-[200px] sm:h-[200px] w-[100px] h-[100px] object-cover "
                            />
                        </div>
                        <div className="text-gray-600 text-sm mt-8 md:mt-0 text-left max-w-xl transition-all duration-500 ease-in-out">
                            <p>{active.text}</p>
                        </div>
                    </div>   
                </div>

                <div className="relative">
                    <span className="absolute bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2 sm:h-48 sm:w-48 h-16 w-16 rounded-full bg-[#E28050] z-5 blur-sm opacity-50 "></span>
                    <div className="relative flex justify-center items-center gap-6 md:py-6 py-4 overflow-clip">
                    <span className="absolute bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2 sm:h-48 sm:w-48 h-16 w-16 md:border-[1rem] border-4 rounded-full border-[#E28050] bg-[#F9F6F0] z-5"></span>
                    
                    <button
                        onClick={prev}
                        className="p-2 rounded-full transition z-10"
                    >
                        ←
                    </button>

                    <div className="flex justify-center items-center gap-2 transition-all duration-500 ease-in-out relative">
                        {testimonials.map((t, index) => {
                            let position = index - activeIndex;
                            
                            // Loop positioning for carousel effect
                            if (position < -1) position += testimonials.length;
                            if (position > 1) position -= testimonials.length;
                            
                            const isActive = position === 0;
                            const opacity = Math.abs(position) > 1 ? 0 : 1;
                            const translateX = windowWidth > 480 ? position * 80 : position * 50;
                            
                            return (
                                <img
                                    key={t.id}
                                    src={t.image}
                                    alt={`Avatar ${t.name}`}
                                    className={`rounded-full cursor-pointer transition-all duration-500 ease-in-out absolute ${
                                        isActive ? "sm:h-24 sm:w-24 h-12 w-12 opacity-100" : "sm:h-12 sm:w-12 h-6 w-6 opacity-40"
                                    }`}
                                    style={{
                                        transform: `translateX(${translateX}px)`,
                                        zIndex: 10 - Math.abs(position),
                                        opacity,
                                    }}
                                    onClick={() => setActiveIndex(index)}
                                />
                            );
                        })}
                        <div className="sm:w-48 sm:h-24 h-18 w-36 opacity-0"></div>
                    </div>

                    <button
                        onClick={next}
                        className="p-2 rounded-full transition"
                    >
                        →
                    </button>
                    </div>
                </div>          
            </motion.div>
        </div>
    </div>
  );
};

export default Testimonials;
