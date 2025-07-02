import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="py-4 px-8">
      <div className="container mx-auto flex justify-between items-center">
        <img src="/skillLoopLogo.svg" alt="SkillLoop Logo" className="h-16 w-16" />
        
        {/* Hamburger menu button - visible on mobile */}
        <button 
          className="lg:hidden" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg 
            className={`w-6 h-6 ${isOpen ? 'fixed z-[51] right-4' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        
        {/* Desktop menu */}
        <ul className="hidden lg:flex space-x-8 items-center">
          <li>
            <a href="/" className="text-sm">Home</a>
          </li>
          <li>
            <a href="#courses" className="text-sm">Courses</a>
          </li>
          <li>
            <a href="#internships" className="text-sm">Internship</a>
          </li>
          <li>
            <a href="#job" className="text-sm">Job Openings</a>
          </li>
          <li>
            <a href="/contact" className="text-sm">Contact</a>
          </li>
        </ul>
        
        <div className="hidden lg:flex items-center space-x-4">
          <a href="/login" className="text-sm bg-gradient-to-b from-[#F4B860] to-[#D35244] bg-clip-text text-transparent border-2 border-[#FDF1DF] rounded-full py-2 px-8">Login</a>
          <a href="/signup" className="text-sm bg-gradient-to-r from-[#F4B860] to-[#D35244] text-white rounded-full py-2 px-8">Create an Account</a>
        </div>
        
        {/* Mobile menu */}
        <AnimatePresence>
        {isOpen && (
          <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="lg:hidden fixed top-0 left-0 right-0 bg-white min-h-screen p-5 pt-28 z-50"
          >
            <ul className="flex flex-col space-y-4">
              <li>
                <a href="/" className="text-sm block py-2" onClick={closeMenu}>Home</a>
              </li>
              <li>
                <a href="#courses" className="text-sm block py-2" onClick={closeMenu}>Courses</a>
              </li>
              <li>
                <a href="#internship" className="text-sm block py-2" onClick={closeMenu}>Internship</a>
              </li>
              <li>
                <a href="#job" className="text-sm block py-2" onClick={closeMenu}>Job Openings</a>
              </li>
              <li>
                <a href="/contact" className="text-sm block py-2" onClick={closeMenu}>Contact</a>
              </li>
              <li className="pt-4">
                <a href="/login" className="text-sm block bg-gradient-to-b from-[#F4B860] to-[#D35244] bg-clip-text text-transparent border-2 border-[#FDF1DF] rounded-full py-2 px-8 text-center" onClick={closeMenu}>Login</a>
              </li>
              <li className="pt-2">
                <a href="/signup" className="text-sm block bg-gradient-to-r from-[#F4B860] to-[#D35244] text-white rounded-full py-2 px-8 text-center" onClick={closeMenu}>Create an Account</a>
              </li>
            </ul>
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

export default Navbar;