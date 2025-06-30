import AdvantageCarousel from "./Advantages"
import { motion } from "framer-motion"

function Info() {
  return (
    <section className='md:grid md:grid-cols-2 flex flex-col space-x-4 lg:p-16 md:p-8 p-4' id="about">
        <div className='flex flex-col items-center justify-start gap-2 w-full'>
            <motion.h1 
              initial={{ opacity: 0, x: -100, y: 0 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.9 }}
              className="md:text-6xl text-4xl font-semibold leading-tight w-full">About Us</motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -100, y: 0 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.9 }}
              className='text-sm md:text-base text-gray-600'>
            At SkillLoop, we believe that education should be practical, engaging, and directly connected to real-world opportunities. As a modern EdTech platform, our mission is to empower students by bridging the gap between learning and career growth.
            </motion.p>
            <motion.img
              initial={{ opacity: 0, x: 0, y: 100 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }} 
              src='/about_us.gif' 
              alt='About Us' 
              className='w-full md:max-w-2/3 sm:max-w-1/2 max-w-full h-auto mt-4' />
        </div>
        <div className='flex flex-col items-center justify-start gap-2 w-full'>
            <h1 className="md:text-6xl text-4xl font-semibold leading-tight w-full md:text-right text-left">Our Advantages</h1>
            <AdvantageCarousel />
        </div>
    </section>
  )
}

export default Info