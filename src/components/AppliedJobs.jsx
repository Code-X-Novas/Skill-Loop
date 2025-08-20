import { useSelector } from "react-redux";

const AppliedJobs = () => {

    const user = useSelector((state) => state.auth.user)
    const jobs = user?.appliedJobs;

    return (
        <div className="bg-white p-4 sm:p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">My Applied Jobs</h2>

            {/* Table for md+ screens */}
            {
                jobs === undefined || jobs.length === 0 ? (
                    <p className="text-gray-500 text-sm">You have not applied to any jobs yet.</p>
                ) : (
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-left text-sm min-w-[400px]">
                            <thead>
                                <tr className="text-gray-500 border-b">
                                    <th className="lg:p-3 p-2 lg:text-sm md:text-xs">Company</th>
                                    <th className="lg:p-3 p-2 lg:text-sm md:text-xs">Profile</th>
                                    <th className="lg:p-3 p-2 lg:text-sm md:text-xs">Applied On</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobs && jobs.map((job, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="lg:p-3 p-2 lg:text-sm md:text-xs">{job?.company}</td>
                                        <td className="lg:p-3 p-2 lg:text-sm md:text-xs">{job?.title}</td>
                                        <td className="lg:p-3 p-2 lg:text-sm md:text-xs">
                                            {job?.date
                                                ? new Date(job.date).toLocaleDateString("en-GB", {
                                                    day: "2-digit",
                                                    month: "long",
                                                    year: "numeric",
                                                }) : ""
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

            {/* Card layout for mobile */}
            <div className="md:hidden space-y-4">
                {jobs && jobs.map((job, index) => (
                    <div
                        key={index}
                        className="border rounded-lg p-4 shadow-sm space-y-1"
                    >
                        <p className="text-sm">
                            <span className="font-medium text-gray-600">Company: </span>
                            {job?.company}
                        </p>
                        <p className="text-sm">
                            <span className="font-medium text-gray-600">Profile: </span>
                            {job?.title}
                        </p>
                        <p className="text-sm">
                            <span className="font-medium text-gray-600">Applied On: </span>
                            {job?.date
                                ? new Date(job.date).toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric",
                                }) : ""
                            }
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AppliedJobs;
