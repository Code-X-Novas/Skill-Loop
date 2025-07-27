import { motion } from 'framer-motion';
import knowMore from "../img/know-more.png";

function Hero() {

    return (
        <main className="bg-[url(/hero_bg.svg)] bg-cover bg-no-repeat bg-center md:grid md:grid-cols-2 flex flex-col items-start justify-between lg:mx-16 md:mx-8 mx-4 py-12 p-8 rounded-3xl overflow-clip relative" role="main" aria-label="Hero section">
            <motion.img src='/hero_ele_1.svg' alt="Decorative hero element showcasing SkillLoop's dynamic learning environment" 
                initial={{ opacity: 0, x: -400, y: 0, rotate: 10, scale: 1.2 }}
                animate={{ opacity: [1, 1], x: [-800, 0, -300], y: [0, -100] , rotate: [0,-15] , scale: [1.3, 0.8] }}
                transition={{ duration: 3, ease: "easeOut", times: [0, 0.5, 1] }}
                className='absolute xl:top-20 lg:top-16 rotate-12 left-0 transform aspect-square w-screen h-screen z-0 lg:block hidden' 
            />
            
            <div className='flex flex-col gap-8 justify-between h-full z-10 relative'>

                {/* heading */}
                <motion.h1
                    initial={{ opacity: 0, x: -100, y: 100 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 1.5}}
                    className='md:text-5xl text-4xl font-bold leading-tight'
                    >
                    Learn Today <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F4B860] to-[#D35244]">Lead Tomorrow</span>
                </motion.h1>

                {/* know more */}
                <motion.a href="#about" 
                    initial={{ opacity: 0, x: -1000, y: 0 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 2, ease: "easeOut", delay: 1.5}}
                    className="inline-flex items-center group"
                    aria-label="Learn more about SkillLoop's MBA-focused courses and internship programs"
                >
                    
                    <img 
                        src={knowMore}
                        alt="Know More"
                        className="md:h-12 h-10 transition-transform duration-300 group-hover:scale-105"
                    />

                </motion.a>

                {/* 4 lines */}
                <motion.section
                    initial={{ opacity: 0, x: 1000, y: 0 }}
                    animate={{ opacity: 1, x: [1000, -20, 0], y: 0 }}
                    transition={{ duration: 2, ease: "easeOut", delay: 2.5 }}
                    className='sm:grid sm:grid-cols-2 gap-4 mt-8 md:text-xl flex flex-col text-sm'
                    aria-label="SkillLoop's key features and advantages">
                    <div className='flex items-center gap-2'>
                        <p className="bg-[#F8D6A480] rounded-md px-4 py-2" role="button" aria-label="Personalized learning approach">🎯 Personalized Approach</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <p className="bg-[#F8D6A480] rounded-md px-4 py-2" role="button" aria-label="Industry-relevant skills training">📈 Relevant Skills</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <p className="bg-[#F8D6A480] rounded-md px-4 py-2" role="button" aria-label="Small group learning sessions">👥 Small Groups</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <p className="bg-[#F8D6A480] rounded-md px-4 py-2" role="button" aria-label="MBA-focused curriculum">🎓 MBA-Focused</p>
                    </div>
                </motion.section>
            </div>

            {/* <div className="hidden md:grid md:grid-rows-3">
                <motion.div
                    initial={{ opacity: 0, x: 300, y: 300 }}
                    animate={{ opacity: [1, 1], x: [300, 0, 0], y: [300, 0 ,0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, ease: "easeOut", delay: 1.5, times: [0, 0.5, 1] }}
                    className="relative h-[22vh] w-full xl:relative invisible xl:visible pointer-events-none xl:pointer-events-auto">
                    <img src="/test2.png" className="absolute h-full min-h-[200px] aspect-auto object-contain rounded-xl right-12" alt="Hero Image" />
                    <div className="absolute -bottom-15 right-0 bg-white rounded-xl p-3 z-10">
                        <h1 className="text-md font-semibold">VARUN KUMAWAT</h1>
                        <p className="text-xs text-[#9D9D9F]">AI & Prompt Engineering</p>
                    </div>
                </motion.div>
                <motion.div 
                    initial={{ opacity: 0, x: 700, y: 300 }}
                    animate={{ opacity: [1, 1], x: [700,0,0], y: [300, 0,0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, ease: "easeOut", delay: 1.5, times: [0, 0.5, 1] }}
                    className="relative h-[22vh] w-full">
                    <img src="/test1.png" className="absolute h-full min-h-[250px] aspect-auto object-contain rounded-xl left-0 transform translate-x-1/2 bottom-2" alt="Hero Image" />
                    <div className="absolute bottom-0 left-0 transform translate-x-1/4 translate-y-1/2 bg-white rounded-xl p-3 z-10">
                        <h1 className="text-md font-semibold">ASHUTOSH SONI</h1>
                        <p className="text-xs text-[#9D9D9F]">MBA (DATA ANALYTICS)</p>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 300, y: 300 }}
                    animate={{ opacity: [1, 1], x: [300, 0,0], y: [300, 0,0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, ease: "easeOut", delay: 1.5, times: [0, 0.5, 1] }} 
                    className="relative h-[22vh] w-full">
                    <img src="/test3.png" className="absolute h-full min-h-[200px] aspect-auto object-contain rounded-xl top-0 left-1/2 transform translate-x-1/2 -translate-y-1/4" alt="Hero Image" />
                    <div className="absolute bottom-0 left-1/2 transform translate-x-1/4 bg-white rounded-xl p-3 z-10">
                        <h1 className="text-md font-semibold">Vaibhav Saraswat</h1>
                        <p className="text-xs text-[#9D9D9F]">AI & Prompt Engineering</p>
                    </div>
                </motion.div>
            </div> */}

        </main>
    )
}


export default Hero