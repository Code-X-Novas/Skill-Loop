import { useState, useEffect } from "react"
import JobCardComponent from "../components/JobCardComponent.jsx"
import Footer from "../components/Footer.jsx"
import Background from "../ui/Background.jsx"
import Loading from "../components/Loader.jsx"
import { InternshipHeader } from "../components/InternshipHeader.jsx"
import { InternshipSidebar } from "../components/Layout/InternshipSidebar.jsx"
import InternshipCardComponent from "../components/InternshipCardComponent.jsx"

const initialFilters = {
  types: [
    { label: "Full Time", checked: false },
    { label: "Part Time", checked: false },
    { label: "Contract", checked: false },
    { label: "Remote", checked: false },
    { label: "Training", checked: false }
  ],
  experience: [
    { label: "Entry Level", checked: false },
    { label: "Mid-Level", checked: false },
    { label: "Senior Level", checked: false },
    { label: "No Experience", checked: false }
  ],
  stipend: [
    { label: "Unpaid", checked: false },
    { label: "0-5K", checked: false },
    { label: "5K-10K", checked: false },
    { label: "10K+", checked: false }
  ]
}


const internshipData = [
  { title: "Financial Analyst", location: "Mumbai", type: "Full Time", date: "July 8, 2025", by: "FinCorp", stipend: "10K+", experience: "Entry Level", image: "https://picsum.photos/id/1011/300", employeer_image: "https://picsum.photos/200" },
  { title: "Marketing Intern", location: "Delhi", type: "Part Time", date: "July 5, 2025", by: "AdWorks", stipend: "5K-10K", experience: "No Experience", image: "https://picsum.photos/id/1012/300", employeer_image: "https://picsum.photos/200" },
  { title: "Software Intern", location: "Remote", type: "Remote", date: "July 3, 2025", by: "CodeBase", stipend: "0-5K", experience: "Mid-Level", image: "https://picsum.photos/id/1013/300", employeer_image: "https://picsum.photos/200" },
  { title: "HR Intern", location: "Bangalore", type: "Full Time", date: "June 30, 2025", by: "PeopleFirst", stipend: "Unpaid", experience: "No Experience", image: "https://picsum.photos/id/1014/300", employeer_image: "https://picsum.photos/200" },
  { title: "Design Intern", location: "Hyderabad", type: "Contract", date: "July 1, 2025", by: "PixelPerfect", stipend: "5K-10K", experience: "Entry Level", image: "https://picsum.photos/id/1015/300", employeer_image: "https://picsum.photos/200" },
  { title: "Business Analyst Intern", location: "Chennai", type: "Training", date: "July 10, 2025", by: "BizCore", stipend: "10K+", experience: "Senior Level", image: "https://picsum.photos/id/1016/300", employeer_image: "https://picsum.photos/200" },
  { title: "Legal Intern", location: "Ahmedabad", type: "Full Time", date: "July 4, 2025", by: "LegalEase", stipend: "0-5K", experience: "Entry Level", image: "https://picsum.photos/id/1017/300", employeer_image: "https://picsum.photos/200" },
  { title: "Content Writer Intern", location: "Kolkata", type: "Remote", date: "July 6, 2025", by: "WriteRight", stipend: "5K-10K", experience: "No Experience", image: "https://picsum.photos/id/1018/300", employeer_image: "https://picsum.photos/200" },
  { title: "Operations Intern", location: "Pune", type: "Part Time", date: "July 2, 2025", by: "QuickOps", stipend: "10K+", experience: "Mid-Level", image: "https://picsum.photos/id/1019/300", employeer_image: "https://picsum.photos/200" }
]


const INTERNSHIPS_PER_PAGE = 6

export default function Internships() {
  const [filters, setFilters] = useState(initialFilters)
  const [page, setPage] = useState(1)
  const [showMobileFilter, setShowMobileFilter] = useState(false)
  const [loading, setLoading] = useState(true)

  const totalPages = Math.ceil(internshipData.length / INTERNSHIPS_PER_PAGE)

  const handleFilterChange = (label) => {
    const updatedFilters = { ...filters }

    const updateGroup = (group) =>
        group.map((f) => f.label === label ? { ...f, checked: !f.checked } : f)

    updatedFilters.types = updateGroup(updatedFilters.types)
    updatedFilters.experience = updateGroup(updatedFilters.experience)
    updatedFilters.stipend = updateGroup(updatedFilters.stipend)

    setFilters(updatedFilters)
    }

  const handleShowMore = () => {
    if (page < totalPages) {
      setPage(prev => prev + 1)
    }
  }

  const [visibleJobs, setVisibleJobs] = useState([])

  useEffect(() => {
    setLoading(true)
    const activeTypes = filters.types.filter(f => f.checked).map(f => f.label)
    const activeStipends = filters.stipend.filter(f => f.checked).map(f => f.label)
    const activeExp = filters.experience.filter(f => f.checked).map(f => f.label)

    const filteredJobs = internshipData.filter(internship => {
        const matchType = activeTypes.length ? activeTypes.includes(internship.type) : true
        const matchStipend = activeStipends.length ? activeStipends.includes(internship.stipend) : true
        const matchExp = activeExp.length ? activeExp.includes(internship.experience) : true
        return matchType && matchStipend && matchExp
    })

    const startIndex = (page - 1) * INTERNSHIPS_PER_PAGE
    const endIndex = startIndex + INTERNSHIPS_PER_PAGE
    const sliced = filteredJobs.slice(startIndex, endIndex)

    setVisibleJobs(sliced)
    const timer = setTimeout(() => {
        setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
    }, [page, filters])

  

  return (
    <>
    <div className="min-h-screen">
      <InternshipHeader />

      {/* Mobile Filter Toggle */}
      <div className="md:hidden flex justify-end px-4 sm:px-8 lg:px-16 mt-4">
        <button
          onClick={() => setShowMobileFilter(!showMobileFilter)}
          className="px-4 py-2 border rounded-md border-gray-300 text-sm"
        >
          {showMobileFilter ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {/* Dropdown Filter for Mobile */}
      {showMobileFilter && (
        <div className="md:hidden px-4 sm:px-8 lg:px-16 py-4 bg-white z-10">
          <InternshipSidebar filters={filters} onChange={handleFilterChange} />
        </div>
      )}

      <div className="flex flex-col sm:flex-row px-4 sm:px-8 lg:px-16 py-8 gap-8">
        {/* Sidebar for Desktop */}
        <div className="hidden md:block">
          <InternshipSidebar filters={filters} onChange={handleFilterChange} />
        </div>

        {loading ? (
          <div className="w-full flex flex-col justify-center items-center py-10">
            <Loading />
          </div>
        ) : visibleJobs.length === 0 ? (
          <div className="text-center text-gray-500 font-medium py-10">
            No internships found.
          </div>
        ) : (
          <div className="flex-1">
            <p className="text-xl my-4">
              Showing <span className="font-bold">{visibleJobs.length}</span> internships
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleJobs.map((internship, index) => (
                <InternshipCardComponent key={index} internship={internship} />
              ))}
            </div>

            <div className="flex justify-between items-center mt-6">
              <div className="flex gap-2 z-40">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-8 h-8 rounded-md text-sm flex items-center justify-center border transition ${
                      page === p
                        ? "bg-orange-500 text-white border-orange-500"
                        : "text-gray-500 border-gray-300 hover:border-orange-400"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>

              {page < totalPages && (
                <button
                  onClick={handleShowMore}
                  className="text-sm block bg-gradient-to-b from-[#F4B860] to-[#D35244] bg-clip-text text-transparent border-2 border-[#FDF1DF] rounded-full py-2 px-8 text-center z-40"
                >
                  Show me more
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
    <Background>
        <Footer />
    </Background>
    </>
  )
}
