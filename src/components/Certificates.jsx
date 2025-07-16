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
    <div className="bg-white p-6 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Certificates</h2>
        <button className="text-sm border rounded px-4 py-1 flex items-center gap-2 cursor-pointer">
          <MdOutlineFileDownload className="w-4 h-4" />
          Download All
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="py-2">Course Name</th>
              <th className="py-2">Date</th>
              <th className="py-2"></th>
            </tr>
          </thead>
          <tbody>
            {certificates.map((cert, index) => (
              <tr key={index} onClick={() => setSelected(cert)} className="hover:bg-gray-50 cursor-pointer">
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
                  <button
                    className="border text-sm px-4 py-1 rounded flex items-center gap-1 cursor-pointer"
                  >
                    <MdOutlineFileDownload className="w-4 h-4" />
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-sm"
          >
            <button
              className="absolute top-2 right-2 text-gray-700 hover:text-black"
              onClick={() => setSelected(null)}
            >
              <X className="w-6 h-6 cursor-pointer" />
            </button>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-xl shadow-lg p-4"
            >
              <img
                src={selected.image}
                alt={selected.name}
                className="max-w-[80vw] max-h-[80vh] rounded-lg object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Certificates;
