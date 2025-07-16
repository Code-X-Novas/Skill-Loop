
import { motion } from 'framer-motion';

function JobOpenings() {
  const jobData = [
    {
      id: 1,
      type: "Remote/Hybrid",
      title: "PPO Opportunity at SkillLoop",
      description:
        "Thank you for being a part of SkillLoop’s journey as an intern! Based on your performance, contribution, and growth during the internship, you are now eligible to apply for a Pre-Placement Opportunity (PPO) with us. We’re excited to offer PPO roles across three verticals: HR Executive – ₹8 LPA, Marketing Specialist – ₹7 LPA, Sales Associate – ₹8 LPA. Note: This form is exclusively for current or recently completed SkillLoop interns.",
      postedDate: "2025-07-10",
      stipend_range: "₹7–8 LPA",
      company_img: "/skillLoopLogo.svg",
      company_name: "SkillLoop",
      company_location: "Remote/Hybrid",
      apply_link:
        "https://docs.google.com/forms/d/e/1FAIpQLSefGSABcmdWx64lo2C5PaNJ_0aSDmgGageO94VG_r0eVB4MAQ/viewform",
    },
    {
      id: 2,
      type: "Remote/Hybrid",
      title: "Full-Time Job Openings at SkillLoop",
      description:
        "We are currently hiring for 4 exciting full-time roles across departments. People & Culture Specialist (HR Executive Role) – ₹8–9 LPA, Digital Growth Strategist (Marketing Manager Role) – ₹9–10 LPA, Revenue Strategy Lead (Sales Manager Role) – ₹9–10 LPA, Learning Experience Specialist (Program Design & Delivery) – ₹8–9 LPA. Location: Remote/Hybrid. Join India’s fast-growing EdTech startup redefining skill-based learning.",
      postedDate: "2025-07-10",
      stipend_range: "₹8–10 LPA",
      company_img: "/skillLoopLogo.svg",
      company_name: "SkillLoop",
      company_location: "Remote/Hybrid",
      apply_link:
        "https://docs.google.com/forms/d/e/1FAIpQLSd6-2SEvYEQ6poiF9blDU2obsLrSrxlUiWdySXEH_sYesa0MA/viewform?usp=dialog",
    },
  ];

  return (
    <>
      <motion.h1
        initial={{ opacity: 0, x: -100, y: 0 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.5 }}
        id="job"
        className="md:text-6xl text-4xl font-bold mt-4"
      >
        Job Openings
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, x: 0, y: 0 }}
        whileInView={{ opacity: 1, x: [200, -20, 0], y: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.5 }}
        className="text-gray-600 md:text-md text-sm max-w-3xl mt-4"
      >
        Launch your career with a role that makes an impact. Grow, innovate, and
        thrive alongside industry leaders in our dynamic workplace.
      </motion.p>

      <div className="flex w-full justify-end my-8">
        <motion.button
          initial={{ opacity: 0, x: 10, y: 0 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.1 }}
          className="text-xs md:text-sm bg-gradient-to-b from-[#F4B860] to-[#D35244] bg-clip-text text-transparent border-2 border-[#F9A825] rounded-full py-1 md:py-2 px-4 md:px-8"
        >
          View All
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 100, y: 0 }}
        whileInView={{ opacity: 1, x: [0, -20, 0], y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.5 }}
        className="overflow-x-auto scrollbar-hide relative z-10"
      >
        <div className="flex space-x-4 w-max pb-4">
          {jobData.map((job) => {
            const desc = job.description || "";
            const midStart = Math.floor(desc.length / 3);
            const middleDesc = desc.slice(midStart, midStart + 100);

            return (
              <div
                key={job.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 w-80 flex-shrink-0 space-y-4"
              >
                <span className="inline-block bg-[#FDF1DF] text-[#D97706] md:text-sm text-xs font-medium px-3 py-1 rounded-md">
                  {job.type}
                </span>

                <div>
                  <h2 className="md:text-lg text-md font-bold text-gray-900">
                    {job.title}
                  </h2>
                  <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                    {middleDesc}...
                  </p>
                </div>

                <div className="flex justify-between md:text-sm text-xs text-gray-500 font-medium">
                  <span>{job.postedDate}</span>
                  <span className="text-gray-700 font-semibold">
                    {job.stipend_range}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-3">
                    <img
                      src={job.company_img}
                      alt={job.company_name}
                      className="md:w-10 md:h-10 h-8 w-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-sm text-gray-900">
                        {job.company_name}
                      </p>
                      <p className="md:text-sm text-xs text-gray-500">
                        {job.company_location}
                      </p>
                    </div>
                  </div>

                  <a
                    href={job.apply_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto text-xs bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-1 px-3 rounded-full transition"
                  >
                    Apply Now
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </>
  );
}

export default JobOpenings;
