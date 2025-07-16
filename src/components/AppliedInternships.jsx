const AppliedInternships = () => {
  const internships = [
    {
      company: "Xinterview",
      profile: "Graphic Design Internship",
      appliedOn: "15th July 2025",
      duration: "3 Months",
      status: "Hired",
    },
    {
      company: "She Can Foundation",
      profile: "Social Sector Internship",
      appliedOn: "15th January 2026",
      duration: "4 Months",
      status: "Not selected",
    },
    {
      company: "InAmigos Foundation",
      profile: "Graphic Design Internship",
      appliedOn: "16th January 2026",
      duration: "6 Months",
      status: "Not selected",
    },
  ];

  const statusColor = {
    "Hired": "bg-green-100 text-green-600",
    "Not selected": "bg-red-100 text-red-600",
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">My Applied Internships</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="py-2">Company</th>
              <th className="py-2">Profile</th>
              <th className="py-2">Applied On</th>
              <th className="py-2">Duration</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {internships.map((internship, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-3">{internship.company}</td>
                <td className="py-3">{internship.profile}</td>
                <td className="py-3">{internship.appliedOn}</td>
                <td className="py-3">{internship.duration}</td>
                <td className="py-3">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full flex items-center gap-2 w-fit ${statusColor[internship.status]}`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        internship.status === "Hired"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    />
                    {internship.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppliedInternships;
