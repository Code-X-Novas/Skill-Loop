import { useState, useEffect } from 'react';

const courses = [
    {
        id: 1,
        title: "Digital Marketing",
        students: 400,
        description: "Learn the fundamentals of digital marketing, including SEO, social media, and content marketing. Perfect for beginners looking to enter the field.",
        image: "https://picsum.photos/id/1015/500/300"
    },
    {
        id: 2,
        title: "Full Stack Web Dev",
        students: 600,
        description: "Master front-end and back-end development using modern tools like React, Node.js, and MongoDB.",
        image: "https://picsum.photos/id/1018/500/300"
    },
    {
        id: 3,
        title: "Data Science",
        students: 350,
        description: "Explore Python, statistics, machine learning, and data visualization with hands-on projects.",
        image: "https://picsum.photos/id/1024/500/300"
    }
];

const CarouselItem = ({ content, level, isActive }) => {
    const levelStyles = {
        0: "z-30",
        1: "z-20",
        '-1': "z-20",
    };

    const [dimensions, setDimensions] = useState({
        height: "h-72",
        width: "w-64"
    });

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setDimensions({
                    height: level === 0 ? "h-52" : "h-36",
                    width: "w-48"
                });
            } else if (window.innerWidth < 1024) {
                setDimensions({
                    height: level === 0 ? "h-64" : "h-40",
                    width: "w-56"
                });
            } else {
                setDimensions({
                    height: level === 0 ? "h-72" : "h-48",
                    width: "w-64"
                });
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [level]);

    return (
        <div
            className={`absolute rounded-3xl shadow-lg text-white font-semibold overflow-hidden p-6 transition-all duration-500 ease-in-out ${levelStyles[level] || "hidden"} ${dimensions.height} ${dimensions.width}`}
            style={{
                left: `${(level + 2) * 20}%`,
                backgroundImage: `url(${content.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transform: typeof window !== 'undefined' && window.innerWidth < 640
                    ? `translateX(-${level === 0 ? 50 : 45}%)`
                    : 'translateX(-50%)'
            }}
        >
            <div className="bg-black/60 p-4 rounded-2xl h-full flex flex-col justify-between w-full">
                <div>
                    <h2 className="text-xl md:text-2xl">{content.title}</h2>
                    <p className="text-sm md:text-base mt-1">{content.students} Students</p>
                    {isActive && (
                        <p className="text-sm mt-2 font-normal text-gray-200">{content.description}</p>
                    )}
                </div>
                <button className="mt-4 text-sm border-2 border-white px-4 py-2 rounded-xl hover:bg-white hover:text-black transition">
                    Join Now
                </button>
            </div>
        </div>
    );
};

export default function CourseCarousel() {
    const [active, setActive] = useState(0);

    const mod = (n, m) => ((n % m) + m) % m;

    const getVisibleItems = () => {
        return [-1, 0, 1].map((offset) => {
            const index = mod(active + offset, courses.length);
            return { index, level: offset };
        });
    };

    const moveLeft = () => setActive((prev) => mod(prev - 1, courses.length));
    const moveRight = () => setActive((prev) => mod(prev + 1, courses.length));

    return (
        <section className="p-4 md:p-8 lg:p-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Courses</h1>
            <p className="text-gray-600 max-w-3xl mt-2 md:mt-4 text-sm md:text-base">
                Join us and be part of a transformative learning journey! Together, we'll create exceptional educational experiences that empower growth.
            </p>

            <div className="flex w-full justify-end mb-6">
                <button className="text-xs md:text-sm bg-gradient-to-b from-[#F4B860] to-[#D35244] bg-clip-text text-transparent border-2 border-[#F9A825] rounded-full py-1 md:py-2 px-4 md:px-8">
                    View All
                </button>
            </div>

            <div className="relative w-full h-80 md:h-96 flex flex-col items-center justify-center overflow-hidden">
                <div className="relative w-full h-full flex items-center justify-center">
                    {getVisibleItems().map(({ index, level }) => (
                        <CarouselItem
                            key={index}
                            content={courses[index]}
                            level={level}
                            isActive={level === 0}
                        />
                    ))}
                </div>

                <div className="mt-6 flex items-center space-x-4">
                    <button onClick={moveLeft} className="p-2 rounded-full border border-orange-400 text-orange-500 hover:bg-orange-100">
                        ←
                    </button>

                    <div className="flex space-x-2">
                        {courses.map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-2 rounded-full ${
                                    idx === active ? 'bg-orange-400 w-4' : 'bg-gray-300 w-2'
                                } transition-all duration-300`}
                            ></div>
                        ))}
                    </div>

                    <button onClick={moveRight} className="p-2 rounded-full border border-orange-400 text-orange-500 hover:bg-orange-100">
                        →
                    </button>
                </div>
            </div>
        </section>
    );
}
