// import { useState, useEffect } from "react";
// import AdvantageCard from "./AdvantageCard";
// import { motion } from "framer-motion";

// const advantages = [
//   {
//     id: 1,
//     title: "Digital Marketing",
//     description: "Learn SEO, social media, and content marketing. Ideal for beginners.",
//     color: "#FFD700", // gold
//   },
//   {
//     id: 2,
//     title: "Cybersecurity Essentials",
//     description: "Understand core cybersecurity principles and protection.",
//     color: "#20B2AA", // light sea green
//   },
//   {
//     id: 3,
//     title: "Full Stack Web Dev",
//     description: "Master front-end and back-end using React, Node.js, and MongoDB.",
//     color: "#8A2BE2", // blue violet
//   },
//   {
//     id: 4,
//     title: "UI/UX Design",
//     description: "Design beautiful, user-centric interfaces with modern tools.",
//     color: "#FF69B4", // hot pink
//   },
//   {
//     id: 5,
//     title: "Cloud Computing",
//     description: "Explore AWS, Azure, and deployment models in cloud systems.",
//     color: "#1E90FF", // dodger blue
//   },
// ];

// function AdvantageCarousel() {
//   const [activeIndex, setActiveIndex] = useState(2);
//   const [slideOutIndex, setSlideOutIndex] = useState(null); // tracks card being animated out

//   const next = () => {
//     setSlideOutIndex(activeIndex);
//     setTimeout(() => {
//       setActiveIndex((prev) => (prev + 1) % advantages.length);
//       setSlideOutIndex(null);
//     }, 500); // match transition duration
//   };

//   const prev = () => {
//     setSlideOutIndex(activeIndex);
//     setTimeout(() => {
//       setActiveIndex((prev) =>
//         prev === 0 ? advantages.length - 1 : prev - 1
//       );
//       setSlideOutIndex(null);
//     }, 500);
//   };

//   return (
//     <section className="flex flex-col items-center justify-center w-full h-full">
//       <h1 className="md:text-6xl text-4xl font-semibold leading-tight w-full md:text-right text-left">Our Advantages</h1>
//       {/* Navigation Buttons */}
//         <div className="flex items-end justify-end gap-6 my-6 z-10 w-full">
//             <button
//             onClick={prev}
//             className="bg-white border-2 border-orange-400 text-orange-500 hover:bg-orange-500 hover:text-white transition rounded-full w-10 h-10 flex items-center justify-center"
//             >
//             ←
//             </button>
//             <button
//             onClick={next}
//             className="bg-white border-2 border-orange-400 text-orange-500 hover:bg-orange-500 hover:text-white transition rounded-full w-10 h-10 flex items-center justify-center"
//             >
//             →
//             </button>
//         </div>
//       <div className="md:w-[42vw] w-[100vw] px-4 py-10 flex flex-col items-center justify-center relative overflow-hidden">
        

//         <div className="relative w-full max-w-6xl h-[450px]">
//           {advantages.map((advantage, index) => {
//             let position = index - activeIndex;

//             if (position < -Math.floor(advantages.length / 2))
//               position += advantages.length;
//             if (position > Math.floor(advantages.length / 2))
//               position -= advantages.length;

//             const isActive = position === 0;
//             const isSlidingOut = slideOutIndex === index;

//             const rotate = position * 4;
//             const zIndex = isActive ? 999 : 100 - Math.abs(position);

//             return (
//               <motion.div
//                 key={advantage.id}
//                 initial={{ opacity: 0, x: 0 }}
//                 animate={{
//                   opacity: 1,
//                   x: isSlidingOut ? 300 : 0,
//                   y: 0,
//                   rotate: isSlidingOut ? 0 : rotate,
//                   zIndex: zIndex,
                
//                 }}
//                 transition={{ duration: 0.5, ease: "easeInOut" }}
//                 className="absolute transform translate-x-1/2 top-0 left-0 w-[280px] h-[420px] rounded-2xl overflow-visible text-white"
//               >
//                 <AdvantageCard {...advantage} isActive={isActive} />
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default AdvantageCarousel;


import { useState } from "react";
import { motion } from "framer-motion";
import AdvantageCard from "./AdvantageCard";

const advantages = [
  {
    id: 1,
    title: "Digital Marketing",
    description: "Learn SEO, social media, and content marketing. Ideal for beginners.",
    color: "#FFD700",
  },
  {
    id: 2,
    title: "Cybersecurity Essentials",
    description: "Understand core cybersecurity principles and protection.",
    color: "#20B2AA",
  },
  {
    id: 3,
    title: "Full Stack Web Dev",
    description: "Master front-end and back-end using React, Node.js, and MongoDB.",
    color: "#8A2BE2",
  },
  {
    id: 4,
    title: "UI/UX Design",
    description: "Design beautiful, user-centric interfaces with modern tools.",
    color: "#FF69B4",
  },
  {
    id: 5,
    title: "Cloud Computing",
    description: "Explore AWS, Azure, and deployment models in cloud systems.",
    color: "#1E90FF",
  },
];

function AdvantageCarousel() {
  const [activeIndex, setActiveIndex] = useState(2);       // the real index
  const [displayIndex, setDisplayIndex] = useState(2);     // the visible card stack index
  const [slideOutIndex, setSlideOutIndex] = useState(null);
  const [direction, setDirection] = useState(1);

  const transitionDuration = 500;

  const goTo = (dir) => {
    const newIndex = (activeIndex + dir + advantages.length) % advantages.length;
    setSlideOutIndex(activeIndex);     // Mark card to animate out
    setDirection(dir);                 // Store direction of movement
    setActiveIndex(newIndex);          // Precalculate next

    setTimeout(() => {
      setSlideOutIndex(null);
      setDisplayIndex(newIndex);      // After animation, update stack reference
    }, transitionDuration);
  };

  const next = () => goTo(1);
  const prev = () => goTo(-1);

  return (
    <section className="flex flex-col items-center justify-center w-full h-full">
       <motion.h1 
        initial={{ opacity: 0, x: 100, y: 0 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
        className="md:text-6xl text-4xl font-semibold leading-tight w-full md:text-right text-left">Our Advantages</motion.h1>
       {/* Navigation Buttons */}
         <div className="flex items-end justify-end gap-6 my-6 z-10 w-full">
            <button
            onClick={prev}
            className="bg-white border-2 border-orange-400 text-orange-500 hover:bg-orange-500 hover:text-white transition rounded-full w-10 h-10 flex items-center justify-center"
            >
            ←
            </button>
            <button
            onClick={next}
            className="bg-white border-2 border-orange-400 text-orange-500 hover:bg-orange-500 hover:text-white transition rounded-full w-10 h-10 flex items-center justify-center"
            >
            →
            </button>
        </div>
      <div className="md:w-[42vw] w-[100vw] px-4 py-10 flex flex-col items-center justify-center relative overflow-x-visible">
        

        <div className="relative w-full max-w-6xl h-[450px]">
          {advantages.map((advantage, index) => {
            let position = index - displayIndex;

            if (position < -Math.floor(advantages.length / 2))
              position += advantages.length;
            if (position > Math.floor(advantages.length / 2))
              position -= advantages.length;

            const isActive = index === activeIndex;
            const isSlidingOut = index === slideOutIndex;

            const rotate = position * 4;
            const translateY = Math.abs(position) * 5;

            const zIndex = isActive
              ? 998
              : isSlidingOut
              ? 999
              : 100 - Math.abs(position);

            return (
              <motion.div
                key={advantage.id}
                initial={{
                  opacity: 0,
                  x: "-50%",
                  y: "-50%",
                  rotate: 0,
                }}
                animate={{
                  opacity: 1,
                  x: isSlidingOut
                    ? direction === 1
                      ? "80%"
                      : "-80%"
                    : "-50%",
                  y: `calc(-50% + ${translateY}px)`,
                  rotate,
                }}
                transition={{ duration: transitionDuration / 1000 }}
                className="absolute left-1/2 top-1/2"
                style={{
                  zIndex,
                }}
              >
                <AdvantageCard {...advantage} isActive={index === displayIndex} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default AdvantageCarousel;

