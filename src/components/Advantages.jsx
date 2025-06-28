import { useState } from "react";
import AdvantageCard from "./AdvantageCard";


const advantages = [
    {
        id: 1,
        title: "Digital Marketing",
        description:
        "Learn SEO, social media, and content marketing. Ideal for beginners.",
        color: "#FFD700" // gold
    },
    {
        id: 2,
        title: "Cybersecurity Essentials",
        description: "Understand core cybersecurity principles and protection.",
        color: "#20B2AA" // light sea green
    },
    {
        id: 3,
        title: "Full Stack Web Dev",
        description:
        "Master front-end and back-end using React, Node.js, and MongoDB.",
        color: "#8A2BE2" // blue violet
    },
    {
        id: 4,
        title: "UI/UX Design",
        description:
        "Design beautiful, user-centric interfaces with modern tools.",
        color: "#FF69B4" // hot pink
    },
    {
        id: 5,
        title: "Cloud Computing",
        description:
        "Explore AWS, Azure, and deployment models in cloud systems.",
        color: "#1E90FF" // dodger blue
    }
];

function AdvantageCarousel (){
    const [activeIndex, setActiveIndex] = useState(2);

    const next = () => {
        setActiveIndex((prev) => (prev + 1) % advantages.length);
    };

    const prev = () => {
        setActiveIndex((prev) =>
        prev === 0 ? advantages.length - 1 : prev - 1
        );
    };

    return (
        <section className="p-4">
            <div className="w-[50vw] px-4 py-10 flex flex-col items-center relative overflow-hidden">
                {/* Navigation Buttons */}
                <div className="flex items-center justify-center gap-6 mb-6 z-10">
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
                <div className="relative w-full max-w-6xl h-[450px]">
                    {advantages.map((advantages, index) => {
                    let position = index - activeIndex;

                    if (position < -Math.floor(advantages.length / 2))  position += advantages.length;
                    if (position > Math.floor(advantages.length / 2))   position -= advantages.length;

                    const isActive = position === 0;

                    const rotate = isActive ? 0 : position * 4;
                    const translateY = isActive ? 0 : Math.abs(position) * 4;
                    const zIndex = 100 - Math.abs(position);

                    return (
                        <div
                        key={advantages.id}
                        className="absolute top-1/2 left-1/2 transition-all duration-500 ease-in-out"
                        style={{
                            transform: 
                            `translate(-50%, -50%)
                            rotate(${rotate}deg)
                            translateY(${translateY}px)
                            `,
                            zIndex,
                            opacity: 1,
                        }}
                        >
                            <AdvantageCard {...advantages} isActive={isActive} />
                        </div>
                    );
                    })}
                </div>

                

            </div>
        </section>
    );
};

export default AdvantageCarousel;

