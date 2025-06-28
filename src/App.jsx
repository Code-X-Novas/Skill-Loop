import Footer from "./components/Footer"
import Hero from "./components/Hero"
import Info from "./components/Info"
import Navbar from "./components/Navbar"
import WhySkillLoop from "./components/WhySkillLoop"
import Faqs from "./components/Faqs"
import Background from "./ui/Background"
import Internships from "./components/Internships"
import JobOpenings from "./components/JobOpenings"
import CourseCarousel from "./components/Courses"
import Testimonials from "./components/Testimonials"


function App() {
  return (
    <>
      <Navbar />
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

export default App