function JobOpenings() {
    const jobData = [
        {
            id: 1,
            type: "Remote",
            title: "Software Development Intern",
            description: "Join our team as a Software Development Intern and work on real-world projects that impact our products. Gain hands-on experience in software development, coding, and project management.",
            postedDate: "2023-10-01",
            stipend_range: "₹10,000 - ₹15,000",
            company_img: "https://picsum.photos/150",
            company_name: "Tech Innovators",
            company_location: "Bangalore, India",
        },
        {
            id: 2,
            type: "In-Office",
            title: "UI/UX Design Intern",
            description: "Collaborate with our design team to create user-centered interfaces. Work on wireframes, prototypes, and real product design cycles.",
            postedDate: "2023-10-03",
            stipend_range: "₹8,000 - ₹12,000",
            company_img: "https://picsum.photos/150",
            company_name: "DesignCraft",
            company_location: "Mumbai, India"
        },
        {
            id: 3,
            type: "Remote",
            title: "Data Science Intern",
            description: "Assist in building predictive models and data pipelines. Gain experience in Python, ML algorithms, and data visualization.",
            postedDate: "2023-10-05",
            stipend_range: "₹12,000 - ₹18,000",
            company_img: "https://picsum.photos/150",
            company_name: "DataMinds",
            company_location: "Hyderabad, India"
        },
        {
            id: 4,
            type: "Remote",
            title: "Digital Marketing Intern",
            description: "Learn and contribute to digital marketing campaigns, social media strategies, SEO, and email marketing.",
            postedDate: "2023-10-07",
            stipend_range: "₹5,000 - ₹10,000",
            company_img: "https://picsum.photos/150",
            company_name: "BrandNest",
            company_location: "Delhi, India"
        },
        {
            id: 5,
            type: "In-Office",
            title: "Content Writing Intern",
            description: "Write blog articles, product descriptions, and marketing content while developing your writing and SEO skills.",
            postedDate: "2023-10-10",
            stipend_range: "₹6,000 - ₹9,000",
            company_img: "https://picsum.photos/150",
            company_name: "InkWell Media",
            company_location: "Pune, India"
        },
        {
            id: 6,
            type: "Remote",
            title: "Product Management Intern",
            description: "Assist in defining product strategy, gathering user feedback, and coordinating cross-functional tasks.",
            postedDate: "2023-10-12",
            stipend_range: "₹15,000 - ₹20,000",
            company_img: "https://picsum.photos/150",
            company_name: "Prodify",
            company_location: "Chennai, India"
        },
        {
            id: 7,
            type: "Remote",
            title: "Full Stack Developer Intern",
            description: "Work on both frontend and backend tasks, build APIs, and contribute to scalable web applications.",
            postedDate: "2023-10-14",
            stipend_range: "₹10,000 - ₹15,000",
            company_img: "https://picsum.photos/150",
            company_name: "CodeSprint",
            company_location: "Ahmedabad, India"
        },
        {
            id: 8,
            type: "In-Office",
            title: "Cybersecurity Intern",
            description: "Get exposure to penetration testing, vulnerability assessments, and securing digital infrastructure.",
            postedDate: "2023-10-16",
            stipend_range: "₹12,000 - ₹17,000",
            company_img: "https://picsum.photos/150",
            company_name: "Secura Labs",
            company_location: "Noida, India"
        },
        {
            id: 9,
            type: "Remote",
            title: "Business Analyst Intern",
            description: "Analyze market trends, prepare reports, and assist the strategy team in key business decisions.",
            postedDate: "2023-10-18",
            stipend_range: "₹9,000 - ₹14,000",
            company_img: "https://picsum.photos/150",
            company_name: "InsightWorks",
            company_location: "Kolkata, India"
        },
        {
            id: 10,
            type: "Remote",
            title: "Mobile App Development Intern",
            description: "Help build and maintain Android/iOS apps using Flutter. Collaborate with UI designers and backend teams.",
            postedDate: "2023-10-20",
            stipend_range: "₹10,000 - ₹16,000",
            company_img: "https://picsum.photos/150",
            company_name: "Appify",
            company_location: "Jaipur, India"
        },
        {
            id: 11,
            type: "In-Office",
            title: "DevOps Intern",
            description: "Learn about CI/CD pipelines, cloud deployments, and monitoring tools. Work closely with the engineering team.",
            postedDate: "2023-10-22",
            stipend_range: "₹13,000 - ₹18,000",
            company_img: "https://picsum.photos/150",
            company_name: "InfraTech",
            company_location: "Gurgaon, India"
        }
    ];    

    return (
        <section className="p-16">
            <h1 className="text-5xl font-bold">Job Openings</h1>
            <p className="text-gray-600 max-w-3xl mt-4">
                Launch your career with a role that makes an impact. Grow, innovate, and thrive alongside industry leaders in our dynamic workplace.
            </p>
            <div className="flex w-full justify-end mb-8">
                <button className="text-sm bg-gradient-to-b from-[#F4B860] to-[#D35244] bg-clip-text text-transparent border-2 border-[#F9A825] rounded-full py-2 px-8">View ALL</button>
            </div>

            <div className="overflow-x-auto scrollbar-hide">
                <div className="flex space-x-4 w-max pb-4">
                    {jobData.map((job) => (
                    <div key={job.id} className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 w-80 flex-shrink-0 space-y-4">
                        <span className="inline-block bg-[#FDF1DF] text-[#D97706] text-sm font-medium px-3 py-1 rounded-md">
                        {job.type}
                        </span>
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">{job.title}</h2>
                            <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                                {job.description}
                            </p>
                        </div>

                        <div className="flex justify-between text-sm text-gray-500 font-medium">
                            <span>{job.postedDate}</span>
                            <span className="text-gray-700 font-semibold">{job.stipend_range}</span>
                        </div>

                        <div className="flex items-center space-x-3 pt-2">
                            <img
                                src={job.company_img}
                                alt={job.company_name}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                                <p className="font-semibold text-gray-900">{job.company_name}</p>
                                <p className="text-sm text-gray-500">{job.company_location}</p>
                            </div>
                        </div>
                    </div>))}
                </div>
            </div>

        </section>
    )
}

export default JobOpenings