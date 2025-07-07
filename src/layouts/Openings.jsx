import Internships from '../components/Internships'
import JobOpenings from '../components/JobOpenings'

function Openings() {
  return (
        <section className="lg:p-16 md:p-8 p-4 relative overflow-hidden">
            <span className='absolute bottom-0 left-0 transform -translate-x-1/2 -translate-y-1/2 aspect-square w-full max-h-[100vh] bg-[#F98B2512] rounded-full  z-0 blur-3xl'></span>
            <Internships />
            <JobOpenings />
        </section>
  )
}

export default Openings