import { FaLinkedin, FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Footer() {

    const navigate = useNavigate();

    return (
        <div className="relative z-10 px-4 md:pt-16 pt-5 mx-auto w-full sm:max-w-xl md:max-w-full md:px-24 lg:px-8">
            {/* Top Flex Container to enable justify-between */}
            <div className="lg:flex lg:justify-between lg:items-start gap-10 mb-4">
                {/* Logo + Description + Contact */}
                <div className="mb-10 lg:mb-0 max-w-md">
                    {/* Logo */}
                    <a
                        href="/"
                        aria-label="Go home"
                        title="Company"
                        className="inline-flex items-center"
                    >
                        <img
                            src="/skillLoopLogo.svg"
                            alt="SkillLoop Logo"
                            className="h-16 w-16"
                        />
                        <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                            Skill Loop
                        </span>
                    </a>

                    {/* Description */}
                    <div className="mt-4">
                        <p className="text-sm text-gray-800">
                            Grow your skills with interactive courses,
                            internships, and job opportunities. Start your
                            journey today!
                        </p>
                    </div>

                    {/* Contact */}
                    <div className="mt-4 flex flex-col md:space-y-3 space-y-1 text-gray-600">
                        <a href="tel:+917877295918" className="flex gap-x-3 items-center hover:text-black">
                            <FaPhone /> +91 78772 95918
                        </a>
                        <a href="mailto:info@skillloop.co.in" className="flex gap-x-3 items-center hover:text-black">
                            <MdEmail /> info@skillloop.co.in
                        </a>
                        <a
                            href="https://www.linkedin.com/company/myskillloop/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex gap-x-3 items-center hover:text-black"
                        >
                            <FaLinkedin /> linkedin.com/company/myskillloop
                        </a>
                    </div>

                </div>

                {/* Link Sections Grid */}
                <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
                    {/* Quick Links */}
                    <div>
                        <p className="font-semibold tracking-wide text-gray-800">
                            Quick Links
                        </p>
                        <ul className="mt-2 space-y-2 ">
                            {[
                                "Home",
                                "About Us",
                                "Advantages",
                                "Why SkillLoop",
                                "Testimonials",
                            ].map((item) => (
                                <li key={item}>
                                    <p
                                        onClick={() => navigate("/")}
                                        className="text-gray-600 cursor-pointer hover:text-black transition-colors duration-300"
                                    >
                                        {item}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Courses */}
                    <div>
                        <p className="font-semibold tracking-wide text-gray-800">
                            Courses
                        </p>
                        <ul className="mt-2 space-y-2">
                            {[
                                "Finance",
                                "Marketing",
                                "Promt Engineering",
                                "HR operations",
                                "Bussiness Analytics",
                            ].map((item) => (
                                <li key={item}>
                                    <p
                                        onClick={() => navigate("/coursedetail")}
                                        className="text-gray-600 cursor-pointer hover:text-black transition-colors duration-300"
                                    >
                                        {item}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Job Opportunities */}
                    <div>
                        <p className="font-semibold tracking-wide text-gray-800">
                            Job Opportunities
                        </p>
                        <ul className="mt-2 space-y-2">
                            {["Program Design", "HR Executive", "Sales Manager", "Marketing Manager"].map(
                                (item) => (
                                    <li key={item}>
                                        <p
                                            onClick={() => navigate("/jobopenings")}
                                            className="text-gray-600 cursor-pointer hover:text-black transition-colors duration-300"
                                        >
                                            {item}
                                        </p>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                </div>
            </div>  

            {/* Bottom Bar */}
            <div className="flex flex-col justify-between pt-5 pb-10 border-t sm:flex-row">
                <p className="text-sm text-gray-600">
                    © 2025 Skill Loop. All rights reserved.
                </p>
                <div className="flex items-center mt-4 space-x-4 sm:mt-0">
                    {[
                        "Privacy Policy",
                        "Refund Policy",
                        "Terms & Conditions",
                    ].map((text) => (
                        <a
                            key={text}
                            href="/terms"
                            className="text-gray-500 underline"
                        >
                            {text}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Footer;
