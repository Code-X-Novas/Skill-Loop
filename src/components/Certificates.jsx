import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { MdOutlineFileDownload } from "react-icons/md";

const certificates = [
  {
    name: "Data Analytics for MBAs",
    date: "15th July 2025",
    image: "/certificate.png",
  },
  {
    name: "HR Operations & Analytics",
    date: "15th January 2026",
    image: "/certificate.png",
  },
  {
    name: "Marketing & Digital Growth",
    date: "16th January 2026",
    image: "/certificate.png",
  },
];

const Certificates = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <h2 className="text-lg font-semibold">Certificates</h2>
        <button className="text-sm border rounded px-4 py-1 flex items-center gap-2 cursor-pointer">
          <MdOutlineFileDownload className="w-4 h-4" />
          Download All
        </button>
      </div>

      {/* Table layout for md+ */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-sm min-w-[500px]">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="py-2">Course Name</th>
              <th className="py-2">Date</th>
              <th className="py-2"></th>
            </tr>
          </thead>
          <tbody>
            {certificates.map((cert, index) => (
              <tr
                key={index}
                onClick={() => setSelected(cert)}
                className="hover:bg-gray-50 cursor-pointer"
              >
                <td className="py-3 flex items-center gap-3">
                  <img
                    src={cert.image}
                    alt={cert.name}
                    className="w-14 h-10 rounded object-cover"
                  />
                  <span>{cert.name}</span>
                </td>
                <td className="py-3">{cert.date}</td>
                <td className="py-3">
                  <button className="border text-sm px-4 py-1 rounded flex items-center gap-1 cursor-pointer">
                    <MdOutlineFileDownload className="w-4 h-4" />
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for mobile */}
      <div className="md:hidden space-y-4">
        {certificates.map((cert, index) => (
          <div
            key={index}
            onClick={() => setSelected(cert)}
            className="border rounded-lg p-4 flex flex-col gap-2 shadow-sm cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <img
                src={cert.image}
                alt={cert.name}
                className="w-14 h-10 rounded object-cover"
              />
              <div>
                <p className="font-medium">{cert.name}</p>
                <p className="text-sm text-gray-500">{cert.date}</p>
              </div>
            </div>
            <button className="mt-2 border text-sm px-4 py-1 rounded flex items-center gap-1 w-fit">
              <MdOutlineFileDownload className="w-4 h-4" />
              Download
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-sm"
          >
            <button
              className="absolute top-4 right-4 text-gray-700 hover:text-black z-50"
              onClick={() => setSelected(null)}
            >
              <X className="w-6 h-6 cursor-pointer" />
            </button>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-xl shadow-lg p-4 max-w-[90vw] max-h-[90vh]"
            >
              <img
                src={selected.image}
                alt={selected.name}
                className="rounded-lg object-contain max-h-[75vh] max-w-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Certificates;
