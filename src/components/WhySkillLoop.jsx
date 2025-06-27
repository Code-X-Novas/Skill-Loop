function WhySkillLoop() {
  return (
    <section className="min-h-screen p-16">
        <h1 className="text-6xl font-semibold text-left mb-8">Why SkillLoop ?</h1>
        <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col justify-around">
                <div className="bg-[#FDF1DF] rounded-3xl px-16 py-8 mb-4 overflow-hidden grid grid-cols-2 gap-4 relative">
                    <img src="/vector_1.svg" alt="design" className="absolute h-full w-full object-contain" />
                    <p className="text-2xl font-semibold z-10">Adaptive Learning Programs</p>
                    <div className="flex flex-col items-start justify-center gap-4 z-10">
                        <p className="text-sm uppercase text-white px-6 py-2 bg-[#F4B860] rounded-full z-10">Class Format</p>
                        <p className="text-xs text-gray-600 z-10">Ideal for professionals balancing advanced studies with work commitments, offering flexible scheduling without fixed session constraints. Expert-Led Instruction</p>
                    </div>
                </div>

                <div className="bg-[#FDF1DF] rounded-3xl px-16 py-8 mb-4 overflow-hidden grid grid-cols-2 gap-4 relative">
                    <img src="/vector_2.svg" alt="design" className="absolute h-full w-full object-contain" />
                    <span className="absolute h-16 w-16 bg-white top-0 left-0 rounded-full transform translate-x-8 -translate-y-1/2"></span>
                    <span className="absolute h-12 w-12 bg-white bottom-0 right-0 rounded-full transform -translate-x-8  -translate-y-6"></span>
                    <p className="text-2xl font-semibold z-10">Personalized Approach</p>
                    <div className="flex flex-col items-start justify-center gap-4 z-10">
                        <p className="text-sm uppercase text-white px-6 py-2 bg-[#F4B860] rounded-full z-10">Acheive goals quickly</p>
                    </div>
                </div>

                <div className="bg-[#FDF1DF] rounded-3xl px-16 py-8 mb-4 overflow-hidden grid grid-cols-2 gap-4">
                    <p className="text-2xl font-semibold">Accelerate Career Growth</p>
                    <div className="flex flex-col items-start justify-center gap-4">
                        <p className="text-sm uppercase text-white px-6 py-2 bg-[#F4B860] rounded-full">Improving Knowledge</p>
                    </div>
                </div>

                <div className="bg-[#FDF1DF] rounded-3xl px-16 py-8 mb-4  overflow-hidden grid grid-cols-2 gap-4 relative">
                    <span className="absolute h-24 w-24 bg-white top-1/2 left-0 rounded-full transform -translate-x-1/2 -translate-y-1/2"></span>
                    <span className="absolute h-24 w-24 bg-white top-0 right-0 rounded-full transform translate-x-1/2 -translate-y-1/2"></span>
                    <span className="absolute h-24 w-24 bg-white bottom-0 right-1/4 rounded-full transform translate-x-1/2 translate-y-3/4"></span>
                    <p className="text-2xl font-semibold">Seamless virtual learning environment</p>
                    <div className="flex flex-col items-start justify-center gap-4">
                        <p className="text-sm uppercase text-white px-6 py-2 bg-[#F4B860] rounded-full">STUDY FROM ANY LOCATION</p>

                    </div>
                </div>

            </div>
            <div className="grid grid-rows-2 max-h-screen gap-4">
                <img src="/why_img_1.svg" alt="Why SkillLoop" className="w-full h-full object-contain" />
                <img src="/why_img_2.svg" alt="Why SkillLoop" className="w-full h-full object-contain" />
            </div>
        </div>
        
    </section>
  )
}

export default WhySkillLoop