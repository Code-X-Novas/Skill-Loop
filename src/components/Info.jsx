import AdvantageCarousel from "./Advantages"

function Info() {
  return (
    <section className='md:grid md:grid-cols-2 flex flex-col space-x-4 lg:p-16 md:p-8 p-4' id="about">
        <div className='flex flex-col items-center justify-start gap-2 w-full'>
            <h1 className="md:text-6xl text-4xl font-semibold leading-tight w-full">About Us</h1>
            <p className='md:text-xl text-sm text-gray-600'>
            At SkillLoop, we believe that education should be practical, engaging, and directly connected to real-world opportunities. As a modern EdTech platform, our mission is to empower students by bridging the gap between learning and career growth.
            </p>
            <img src='/about_us.gif' alt='About Us' className='w-full md:max-w-xl sm:max-w-1/2 max-w-full h-auto mt-4' />
        </div>
        <div className='flex flex-col items-center justify-start gap-2 w-full'>
            <h1 className="md:text-6xl text-4xl font-semibold leading-tight w-full md:text-right text-left">Our Advantages</h1>
            <AdvantageCarousel />
        </div>
    </section>
  )
}

export default Info