const AppliedJobs = () => {
  const jobs = [
    {
      company: "Xinterview",
      profile: "Graphic Design",
      appliedOn: "15th July 2025",
      status: "Hired",
    },
    {
      company: "She Can Foundation",
      profile: "Social Sector",
      appliedOn: "15th January 2026",
      status: "Not selected",
    },
    {
      company: "InAmigos Foundation",
      profile: "Graphic Design",
      appliedOn: "16th January 2026",
      status: "Not selected",
    },
  ];

  const statusColor = {
    "Hired": "bg-green-100 text-green-600",
    "Not selected": "bg-red-100 text-red-600",
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">My Applied Jobs</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="py-2">Company</th>
              <th className="py-2">Profile</th>
              <th className="py-2">Applied On</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-3">{job.company}</td>
                <td className="py-3">{job.profile}</td>
                <td className="py-3">{job.appliedOn}</td>
                <td className="py-3">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full flex items-center gap-2 w-fit ${statusColor[job.status]}`}>
                    <span className={`w-2 h-2 rounded-full ${job.status === "Hired" ? "bg-green-500" : "bg-red-500"}`} />
                    {job.status}
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

export default AppliedJobs;
