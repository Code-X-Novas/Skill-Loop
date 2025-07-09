import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import AuthModal from './AuthModal';
import { createPortal } from 'react-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authInitialView, setAuthInitialView] = useState('signin');
  const login = localStorage.getItem('login');

  const openSignInModal = () => {
    setAuthInitialView('signin');
    setIsAuthModalOpen(true);
  };

  const openCreateAccountModal = () => {
    setAuthInitialView('createaccount');
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
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
              className={`w-6 h-6 ${isOpen ? 'fixed z-50 right-4' : ''}`} 
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
              <a href="/coursedetail" className="text-sm">Courses</a>
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
          
          {(login) ? (
              <div className="hidden lg:flex items-center space-x-4">
                <img src='/shopping.svg' className="w-6 h-6 text-gray-700 cursor-pointer bg-" />
                <div className="text-xs flex items-center border-2 border-gray-200 rounded-lg p-2 gap-4 cursor-pointer">
                  <img src='https://picsum.photos/200' alt="Profile" className="w-8 h-8" />
                  <div>
                    <p>Username</p>
                    <p>test@gmail.com</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-700" />
                </div>
              </div>
          ) : 
            (
              <div className="hidden lg:flex items-center space-x-4">
                <button onClick={openSignInModal} className="text-sm bg-gradient-to-b from-[#F4B860] to-[#D35244] bg-clip-text text-transparent border-2 border-[#FDF1DF] rounded-full py-2 px-8 cursor-pointer">Login</button>
                <button onClick={openCreateAccountModal} className="text-sm bg-gradient-to-r from-[#F4B860] to-[#D35244] text-white rounded-full py-2 px-8">Create an Account</button>
              </div>
            )}
          
          {/* Mobile menu */}
          <AnimatePresence>
          {isOpen && (
            <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="lg:hidden fixed top-0 left-0 right-0 bg-white min-h-screen p-5 pt-28 z-[49]"
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
                  <button onClick={openSignInModal} className="w-full text-sm block bg-gradient-to-b from-[#F4B860] to-[#D35244] bg-clip-text text-transparent border-2 border-[#FDF1DF] rounded-full py-2 px-8 text-center cursor-pointer">Login</button>
                </li>
                <li className="pt-2">
                  <button onClick={openCreateAccountModal} className="w-full text-sm block bg-gradient-to-r from-[#F4B860] to-[#D35244] text-white rounded-full py-2 px-8 text-center">Create an Account</button>
                </li>
              </ul>
            </motion.div>
          )}
          </AnimatePresence>

          {/* Auth Modal */}
          {isAuthModalOpen && createPortal(
            <div className="fixed inset-0 overflow-y-auto bg-white/50 z-50">
              <AuthModal 
                onClose={closeAuthModal}
                initialView={authInitialView}
              />
            </div>,
            document.body
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;