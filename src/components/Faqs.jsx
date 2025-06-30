import { useState } from 'react';
import { motion } from 'framer-motion';

function Faqs () {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "What makes your programs different from other educational offerings?",
      answer:
        "Skill Loop is a comprehensive learning platform that helps you develop and master new skills through interactive courses, practical projects, and personalized learning paths. Our platform uses adaptive learning technology to customize the experience based on your progress and learning style.",
    },
    {
      id: 2,
      question: "Who are your typical participants?",
      answer:
        "We offer flexible pricing plans to suit different needs. Our basic plan starts at $19/month, with premium plans offering additional features like 1-on-1 mentoring, advanced certifications, and priority support. We also offer annual subscriptions with significant discounts.",
    },
    {
      id: 3,
      question: "What time commitment should I expect?",
      answer:
        "Yes! With our mobile app, you can download courses and access them offline. This feature is available for premium subscribers and allows you to continue learning even without an internet connection.",
    },
    {
      id: 4,
      question: "What funding options are available?",
      answer:
        "We provide industry-recognized certificates upon course completion. Our certificates are verified and can be shared on LinkedIn, added to your resume, or presented to employers. Premium users also get access to advanced certifications from our partner institutions.",
    }
  ];

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <section className="py-16 lg:px-16 md:px-8 px-4 mb-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, x: -100, y: 0 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.5 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">
            Frequently Asked Questions
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: -100, y: 0 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.5 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform is built to help you work smarter, not harder. It adapts to your needs and supports your goals. Make the most of every feature.
          </motion.p>
        </div>

        {/* FAQ Items */}
        <motion.div 
          initial={{ opacity: 0, x: 0, y: -100 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.5 }}
          className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-[#FFFFFF99] rounded-md border border-[#D9E8EE] overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full px-6 py-4 text-left transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.id}.{'  '}
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300">
                      {openFaq === faq.id ? (
                        // X Icon
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      ) : (
                        // Plus Icon
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              </button>

              {/* Answer */}
              <div
                className={`transition-all duration-500 ease-in-out ${
                  openFaq === faq.id
                    ? 'max-h-96 opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Faqs;
