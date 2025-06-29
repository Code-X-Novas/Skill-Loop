import { useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    role: "Software Engineer",
    image: "https://picsum.photos/id/1005/300",
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error nisi necessitatibus culpa soluta fugit ut rerum vitae nam, enim facilis praesentium totam eveniet ducimus magni voluptas dolor quam. Magni eius ratione, veniam odit, vel quos perspiciatis accusamus iste sunt in rerum corporis! Laudantium hic iure nesciunt consequatur optio reiciendis error.`,
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
    <div className="lg:p-16 md:p-8 p-4 mb-8 overflow-hidden">
        <h1 className="md:text-6xl text-4xl font-bold text-gray-900 mb-8">Testimonials</h1>
        <div className="justify-center relative flex flex-col items-center md:gap-8 gap-2">
            
            <div className="bg-linear-to-b from-[#F9A825] to-[#F4B860] text-white p-4 rounded-full shadow-md md:w-24 md:h-24 h-12 w-12">
                <img src='/quote.svg' alt="Quote Icon" className="w-full h-full" />
            </div>

            <div className="rounded-t-xl shadow-2xl bg-[#F9F6F0] md:w-[80vw] w-full flex flex-col">
                <div className="relative flex flex-col items-center text-center font-semibold bg-white p-10 rounded-br-full md:text-3xl text-sm">
                    <p>Millions search for answers every month…</p>
                    <p>But true growth comes from structured learning</p>
                    <span className="absolute top-0 right-0 transform translate-x-1/2  md:h-24 md:w-24 h-12 w-12 bg-[#F4B860] rounded-full shadow-[#FF727242] shadow-lg"></span>
                </div>

                <div className="bg-white">
                    <div className="bg-[#F9F6F0] p-6 rounded-tl-[150px] flex md:flex-row flex-col items-center justify-around md:px-24 px-4 py-12 gap-8">
                        <div className="relative">
                            <div className="bg-[#E28050]/50 rounded-md p-1 -mb-3 z-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200px] h-[340px]"></div>
                            <img
                                src={active.image}
                                alt={active.name}
                                className="rounded-lg relative z-10 w-[300px] h-[300px] object-cover "
                            />
                        </div>
                        <div className="text-gray-600 text-sm mt-8 md:mt-0 text-left max-w-xl transition-all duration-500 ease-in-out">
                            <p>{active.text}</p>
                        </div>
                    </div>   
                </div>

                <div className="relative">
                    <span className="absolute bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2 sm:h-48 sm:w-48 h-16 w-16 rounded-full bg-[#E28050] z-5 blur-sm opacity-50 "></span>
                    <div className="relative flex justify-center items-center gap-6 py-6 overflow-clip">
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
                            const translateX = position * 80;
                            
                            return (
                                <img
                                    key={t.id}
                                    src={t.image}
                                    alt={`Avatar ${t.name}`}
                                    className={`rounded-full cursor-pointer transition-all duration-500 ease-in-out absolute ${
                                        isActive ? "sm:h-24 sm:w-24 h-18 w-18 opacity-100" : "sm:h-12 sm:w-12 h-9 w-9 opacity-40"
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
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
