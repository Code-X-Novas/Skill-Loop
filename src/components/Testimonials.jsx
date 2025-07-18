import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "NITYA LAMBA",
    role: "SALES INTERN",
    image: "https://picsum.photos/id/1005/300",
    text: `My experience at SkillLoop as a Sales Intern was truly enriching. I learned the fundamentals of 
          sales, improved my communication skills, and gained real-world exposure to lead conversion 
          and client interaction. The supportive team and performance-driven environment made this 
          internship both challenging and rewarding. It boosted my confidence and helped me develop a 
          result-oriented mindset. I’m thankful for the opportunity and the guidance I received throughout 
          the journey. `,
  },
  {
    id: 2,
    name: "Rohan Kapoor",
    role: "Sales Intern",
    image: "https://picsum.photos/id/1011/300",
    text: `Interning at SkillLoop as a Sales Intern was an eye-opening experience. I gained hands-on 
exposure to lead generation, cold pitching, and effective communication. The performance-based 
structure kept me goal-focused and accountable. The mentorship from the team helped me 
overcome hesitation and build confidence in real-time client interaction. This internship truly 
enhanced my practical understanding of sales and teamwork. `,
  },
  {
    id: 3,
    name: "Aditi Sharma",
    role: "Sales Intern",
    image: "https://picsum.photos/id/1012/300",
    text: `My internship journey at SkillLoop was extremely impactful. As a Sales Intern, I learned how to 
handle rejections, pitch effectively, and manage leads systematically. The supportive 
environment and regular performance tracking helped me stay consistent. I appreciated the 
freedom to improve at my own pace while still being held to clear targets. It’s an experience I’ll 
carry forward in my professional career. `,
  },
   {
    id: 4,
    name: "Mehak Arora",
    role: "HR Intern",
    image: "https://picsum.photos/id/1013/300",
    text: `Being an HR Intern at SkillLoop allowed me to dive into real-time tasks like recruitment, 
onboarding, and communication management. I gained clarity on how HR functions operate in a 
growing organization. The internship gave me a platform to work independently while receiving 
timely guidance when needed. It was a great mix of learning, responsibility, and exposure to 
professional ethics and HR workflows.`,
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
    <div className="lg:p-16 md:p-8 p-4 mb-8 overflow-y-visible" id="testimonials">
        <motion.h1 
          initial={{ opacity: 0, x: -100, y: 0 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.5 }}
          className="md:text-5xl text-4xl font-bold text-gray-900 mb-4">Testimonials</motion.h1>
        <div className="justify-center relative flex flex-col items-center md:gap-8 gap-2">
            
            <motion.div 
              initial={{ opacity: 1, x: 0, y: 100 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.5 }}
              className="bg-linear-to-b from-[#F9A825] to-[#F4B860] text-white p-4 rounded-full shadow-[-21px_34px_37.8px_rgba(0,0,0,0.25)] md:w-16 md:h-16 h-12 w-12">
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
              className="rounded-t-xl shadow-[-21px_34px_37.8px_rgba(0,0,0,0.25)] bg-[#F9F6F0] md:w-[80vw] w-full flex flex-col">
                <div className="relative flex flex-col items-center text-center font-semibold bg-white rounded-br-full md:text-xl text-sm md:py-4 p-10">
                    <p>Millions search for answers every month…</p>
                    <p>But true growth comes from structured learning</p>
                    <span className="absolute top-0 right-0 transform md:translate-x-1/2 -translate-y-1/2 md:h-16 md:w-16 h-12 w-12 bg-[#F4B860] rounded-full shadow-[#FF727242] shadow-lg"></span>
                </div>

                <div className="bg-white">
                    <div className="bg-[#F9F6F0] p-6 rounded-tl-[150px] flex md:flex-row flex-col items-center justify-around md:px-24 px-4 md:py-12 py-2 md:gap-8 gap-4">
                        <div className="relative min-w-[150px] min-h-[150px] flex items-center justify-center">
                            <div className="bg-[#E28050]/50 rounded-md p-1 -mb-3 z-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 sm:w-[75px] sm:h-[190px] w-[50px] h-[140px]"></div>
                            <img
                                src={active.image}
                                alt={active.name}
                                className="rounded-lg relative z-10 sm:w-[150px] sm:h-[150px] w-[100px] h-[100px] object-cover "
                            />
                        </div>
                        <div className="text-gray-600 text-sm mt-8 md:mt-0 text-left max-w-xl transition-all duration-500 ease-in-out">
                            <p className="font-semibold text-lg mb-2">{active.name}</p>
                            <p className="text-gray-500">{active.role}</p>
                            <p>{active.text}</p>
                        </div>
                    </div>   
                </div>

                <div className="relative">
                    <span className="absolute bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2 sm:h-32 sm:w-32 h-16 w-16 rounded-full bg-[#E28050] z-5 blur-sm opacity-50 "></span>
                    <div className="relative flex justify-center items-center gap-6 md:py-0 py-4 overflow-clip">
                    <span className="absolute bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2 sm:h-32 sm:w-32 h-16 w-16 md:border-[1rem] border-4 rounded-full border-[#E28050] bg-[#F9F6F0] z-5"></span>
                    
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
                                        isActive ? "sm:h-16 sm:w-16 h-12 w-12 opacity-100" : "sm:h-8 sm:w-8 h-6 w-6 opacity-40"
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
