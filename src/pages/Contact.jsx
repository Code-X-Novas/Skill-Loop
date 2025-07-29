import { useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import Footer from "../components/Footer";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const service_id = "service_email";
    const template_id = "template_5eqkfz9";
    const public_key = "AT3vgqrOqcq9Ky9V4";

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
        emailjs.send(
            service_id,
            template_id,
            formData,
            public_key
        )
        .then(() => {
            toast.success('Message sent successfully!');
            setFormData({ name: '', email: '', phone: '', message: '' });
        })
        .catch((error) => {
            toast.error('Failed to send message. Try again.');
            console.error("EmailJS Error:", error);
        });
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center px-4 py-5">
                <div className="max-w-3xl w-full rounded-xl md:px-8 py-5">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
                        Contact Us
                    </h2>
                    <p className="text-center text-gray-600 md:mb-12 mb-8">
                        Search your career opportunity through 12,800 jobs
                    </p>
                    <form
                        className="space-y-6 shadow-md p-8 rounded-lg border-2 border-gray-200 bg-white"
                        onSubmit={handleSubmit}
                    >
                        <label className="block text-lg font-bold mb-4">Leave A Message</label>

                        {/* Name */}
                        <div>
                            <label className="block text-sm text-gray-400 font-semibold mb-1">
                                Your name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Name"
                                className="w-full font-medium border-[2px] border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                            />
                        </div>

                        {/* Email and Phone */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-400 font-semibold mb-1">
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    className="w-full font-medium border-[2px] border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 font-semibold mb-1">
                                    Your Phone
                                </label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Phone"
                                    className="w-full font-medium border-[2px] border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                                />
                            </div>
                        </div>

                        {/* Comment */}
                        <div>
                            <label className="block text-sm text-gray-400 font-semibold mb-1">
                                Your Message
                            </label>
                            <textarea
                                rows="5"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Message"
                                className="w-full font-medium border-[2px] border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                            ></textarea>
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-[#F4B860] to-[#D35244] cursor-pointer text-white px-8 py-3 rounded-md font-medium text-sm hover:opacity-90 transition-all"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-[linear-gradient(to_right,white,#f0fdf4,#fefce8,white)]">
                <Footer />
            </div>
        </>
    );
};

export default Contact;
