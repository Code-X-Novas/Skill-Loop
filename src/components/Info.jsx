function Info() {
  return (
    <section className='grid grid-cols-2 space-x-4 p-16'>
        <div className='flex flex-col items-center justify-start gap-2 w-full'>
            <h1 className="text-6xl font-semibold leading-tight w-full">About Us</h1>
            <p className='text-xl text-gray-600'>
            At SkillLoop, we believe that education should be practical, engaging, and directly connected to real-world opportunities. As a modern EdTech platform, our mission is to empower students by bridging the gap between learning and career growth.
            </p>
            <img src='/about_us.gif' alt='About Us' className='h-1/2 mt-4' />
        </div>
        <div className='flex flex-col items-center justify-start gap-2 w-full'>
            <h1 className="text-6xl font-semibold leading-tight w-full text-right">Our Advantages</h1>
            {/* Advantages Component */}
        </div>
    </section>
  )
}

export default Info