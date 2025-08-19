import { useSelector } from "react-redux";

const AppliedInternships = () => {
    const user = useSelector((state) => state.auth.user);
    const internships = user?.appliedInternships || [];
    console.log("Applied Internships:", internships);

    return (
        <div className="bg-white p-4 sm:p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">My Applied Internships</h2>

            {internships.length === 0 ? (
                <p className="text-gray-500 text-sm">You have not applied to any internships yet.</p>
            ) : (
                <>
                    {/* Table layout for md+ */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-left text-sm min-w-[600px]">
                            <thead>
                                <tr className="text-gray-500 border-b">
                                    <th className="lg:p-3 p-2 lg:text-sm md:text-xs">Company</th>
                                    <th className="lg:p-3 p-2 lg:text-sm md:text-xs">Profile</th>
                                    <th className="lg:p-3 p-2 lg:text-sm md:text-xs">Applied On</th>
                                    <th className="lg:p-3 p-2 lg:text-sm md:text-xs">Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                {internships.map((internship, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="lg:p-3 p-2 lg:text-sm md:text-xs">{internship?.company}</td>
                                        <td className="lg:p-3 p-2 lg:text-sm md:text-xs">{internship?.internshipName}</td>
                                        <td className="lg:p-3 p-2 lg:text-sm md:text-xs">
                                            {internship?.date
                                                ? new Date(internship.date).toLocaleDateString("en-GB", {
                                                    day: "2-digit",
                                                    month: "long",
                                                    year: "numeric",
                                                }) : ""
                                            }
                                        </td>
                                        <td className="lg:p-3 p-2 lg:text-sm md:text-xs">{internship?.duration}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Card layout for mobile */}
                    <div className="md:hidden space-y-4">
                        {internships.map((internship, index) => (
                            <div key={index} className="border rounded-lg p-4 shadow-sm space-y-1">
                                <p className="text-sm">
                                    <span className="font-medium text-gray-600">Company: </span>
                                    {internship?.company}
                                </p>
                                <p className="text-sm">
                                    <span className="font-medium text-gray-600">Profile: </span>
                                    {internship?.internshipName}
                                </p>
                                <p className="text-sm">
                                    <span className="font-medium text-gray-600">Applied On: </span>
                                    {internship?.date
                                        ? new Date(internship.date).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric",
                                        }) : ""
                                    }
                                </p>
                                <p className="text-sm">
                                    <span className="font-medium text-gray-600">Duration: </span>
                                    {internship?.duration}
                                </p>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default AppliedInternships;
