

function Hero() {
  return (
    <main className="bg-[url(/hero_bg.svg)] bg-cover bg-no-repeat bg-center md:grid md:grid-cols-2 flex flex-col items-start justify-between lg:mx-16 md:mx-8 mx-4 py-12 p-8 rounded-4xl">

        <div className='flex flex-col gap-8 justify-between h-full'>
            <h1 className='lg:text-6xl text-4xl font-bold leading-tight'>Future-Proof Your Skills: AI & Finance</h1>
            <a href="/" className="inline-flex items-center group">
                <div className="relative flex items-center bg-gradient-to-b from-[#F4B860] to-[#D35244] text-white px-6 py-3 rounded-full font-semibold text-sm sm:text-base z-10">
                    KNOW MORE
                </div>

                <div className="relative w-13 h-10 -ml-6 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#F4B860] to-[#D35244]"></div>

                    {/* Top inward curve */}
                    <div className="absolute -top-13 left-1/2 -translate-x-1/2 w-7 h-15 bg-[#F8EEDD] rounded-full"></div>

                    {/* Bottom inward curve */}
                    <div className="absolute -bottom-13 left-1/2 -translate-x-1/2 w-7 h-15 bg-[#F8EEDD] rounded-full"></div>
                </div>

                <div className="-ml-6 z-10 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-b from-[#F4B860] to-[#D35244] text-white">
                    <svg
                    className="w-5 h-5 transform group-hover:scale-110 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 7l-10 10m0-10h10v10" />
                    </svg>
                </div>
            </a>
            <section className='grid grid-cols-2 gap-4 mt-8'>
                <div className='flex items-center gap-2'>
                    <p className="bg-[#F8D6A480] rounded-md px-4 py-2">🎯 Personalized Approach</p>
                </div>
                <div className='flex items-center gap-2'>
                    <p className="bg-[#F8D6A480] rounded-md px-4 py-2">📈 Relevant Skills</p>
                </div>
                <div className='flex items-center gap-2'>
                    <p className="bg-[#F8D6A480] rounded-md px-4 py-2">👥 Small Groups</p>
                </div>
                <div className='flex items-center gap-2'>
                    <p className="bg-[#F8D6A480] rounded-md px-4 py-2">🎓 MBA-Focused</p>
                </div>
            </section>
        </div>


        <div className="hidden md:grid md:grid-rows-3">
            <div className="relative h-[22vh]">
                <img src="https://picsum.photos/200/300" className="absolute h-full min-h-[200px] aspect-auto object-cover rounded-xl right-12" alt="Hero Image" />
                <div className="absolute -bottom-15 right-0 bg-white rounded-xl px-4 py-2 z-10">
                    <h1 className="text-md font-semibold">Lorem Ipsum</h1>
                    <p className="text-sm">15 years old</p>
                </div>
            </div>
            <div className="relative h-[22vh] w-full">
                <img src="https://picsum.photos/200/300" className="absolute h-full min-h-[250px] aspect-auto object-cover rounded-xl left-0 transform translate-x-1/2 bottom-2" alt="Hero Image" />
                <div className="absolute bottom-0 left-0 transform translate-x-1/4 translate-y-1/2 bg-white rounded-xl px-4 py-2 z-10">
                    <h1 className="text-md font-semibold">Lorem Ipsum</h1>
                    <p className="text-sm">15 years old</p>
                </div>
            </div>
            <div className="relative h-[22vh] w-full">
                <img src="https://picsum.photos/200/300" className="absolute h-full min-h-[200px] aspect-auto object-cover rounded-xl top-0 left-1/2 transform translate-x-1/2 -translate-y-1/4" alt="Hero Image" />
                <div className="absolute bottom-0 left-1/2 transform translate-x-1/4 bg-white rounded-xl px-4 py-2 z-10">
                    <h1 className="text-md font-semibold">Lorem Ipsum</h1>
                    <p className="text-sm">15 years old</p>
                </div>
            </div>
        </div>

    </main>
  )
}


export default Hero