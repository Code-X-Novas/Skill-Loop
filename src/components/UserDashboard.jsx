import { RiCalendarScheduleLine } from "react-icons/ri";
import { TbCertificate } from "react-icons/tb";
import { TbChecklist } from "react-icons/tb";
import { TbShoppingBagSearch } from "react-icons/tb";
import CourseTopicCard from "./CourseTopicCard";

const UserDashboard = () => {
  const courses = [
    {
      name: "Financial Marketing",
      lessons: "15/20",
      status: "Complete",
      image: "https://picsum.photos/200",
    },
    {
      name: "AI for Marketing",
      lessons: "15/20",
      status: "Ongoing",
      image: "https://picsum.photos/200",
    },
    {
      name: "Lorem Ipsum",
      lessons: "15/20",
      status: "Ongoing",
      image: "https://picsum.photos/200",
    },
  ];

  const statusColor = {
    Complete: "bg-[#E4EDE8] text-[#68946D]",
    Ongoing: "bg-[#D1EAFF] text-[#51749C]",
  };

  return (
    <div className="p-6 flex space-y-8 gap-4">
      {/* Top Stat Cards */}
      <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Ongoing Courses", value: 13, icon: <RiCalendarScheduleLine size={32} className="text-[#2A9D8F]" />},
          { label: "Certificates", value: 37, icon: <TbCertificate size={32} className="text-[#E76F51]" /> },
          { label: "Internships", value: 20, icon: <TbChecklist size={32} className="text-[#A6CEAB]"/> },
          { label: "Jobs", value: 30, icon: <TbShoppingBagSearch size={32} className="text-[#DDA89A]" /> },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="border rounded-lg px-4 py-6 shadow-sm bg-white"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="text-gray-500 font-semibold">{stat.icon}</div>
              <p className="text-md text-gray-600">{stat.label}</p>
            </div>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* My Courses Table */}
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">My Course</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="py-2">Course Name</th>
                <th className="py-2">Lessons</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="flex items-center gap-3 py-3">
                    <img
                      src={course.image}
                      alt={course.name}
                      className="w-10 h-10 rounded-md object-cover"
                    />
                    <span>{course.name}</span>
                  </td>
                  <td>{course.lessons}</td>
                  <td>
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${statusColor[course.status]}`}
                    >
                      {course.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>

      <div className="w-[300px]">
        <CourseTopicCard />
      </div>
    </div>
  );
};

export default UserDashboard;
