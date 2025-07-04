import CourseCarousel from "../components/Courses"
import Faqs from "../components/Faqs"
import Footer from "../components/Footer"
import Hero from "../components/Hero"
import Info from "../components/Info"
import Internships from "../components/Internships"
import JobOpenings from "../components/JobOpenings"
import Testimonials from "../components/Testimonials"
import WhySkillLoop from "../components/WhySkillLoop"
import Background from "../ui/Background"


function Landing() {
  return (
    <>
        <Hero />
        <Info />
        <WhySkillLoop />
        <CourseCarousel />
        <Internships />
        <JobOpenings />
        <Testimonials />
        <Background>
        <Faqs />
        <Footer />
        </Background>
    </>
  )
}

export default Landing