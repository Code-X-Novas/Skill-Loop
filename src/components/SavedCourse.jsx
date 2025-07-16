
export default function SavedCourse() {
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
  )
}
