import { useState } from "react";
import { Menu } from "lucide-react";
import AuthModal from "./AuthModal";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function StudentNavbar({ toggleSidebar }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [authInitialView, setAuthInitialView] = useState("signin");

    const { user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = user?.cart || [];

    const openSignInModal = () => {
        setAuthInitialView("signin");
        setIsAuthModalOpen(true);
        setIsMenuOpen(false);
    };

    const openCreateAccountModal = () => {
        setAuthInitialView("createaccount");
        setIsAuthModalOpen(true);
        setIsMenuOpen(false);
    };

    const closeAuthModal = () => {
        setIsAuthModalOpen(false);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const handleNavClick = (url) => {
        closeMenu();
        navigate(url);
    };

    return (
        <>
            <nav className="py-4 px-4 md:px-8 bg-white z-30">
                <div className="flex justify-between items-center relative">
                    {/* Sidebar toggle */}
                    {toggleSidebar && (
                        <button
                            className="md:hidden p-2 mr-2 cursor-pointer"
                            onClick={toggleSidebar}
                            aria-label="Toggle Sidebar"
                        >
                            <Menu className="w-6 h-6 text-gray-700" />
                        </button>
                    )}

                    {/* Desktop Nav */}
                    <ul className="hidden md:flex space-x-8 items-center">
                        <li>
                            <button
                                onClick={() => handleNavClick("/")}
                                className="text-sm cursor-pointer hover:text-[#D35244]"
                            >
                                Home
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => handleNavClick("/coursedetail")}
                                className="text-sm cursor-pointer hover:text-[#D35244]"
                            >
                                Courses
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => handleNavClick("/internship")}
                                className="text-sm cursor-pointer hover:text-[#D35244]"
                            >
                                Internship
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => handleNavClick("/jobopenings")}
                                className="text-sm cursor-pointer hover:text-[#D35244]"
                            >
                                Job Openings
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => handleNavClick("/contact")}
                                className="text-sm cursor-pointer hover:text-[#D35244]"
                            >
                                Contact
                            </button>
                        </li>
                    </ul>

                    {/* Auth / Cart */}
                    {user ? (
                        <div className="relative cursor-pointer ">
                            <img
                                src="/shopping.svg"
                                alt="Cart"
                                onClick={() => navigate("/cart")}
                                className="w-6 h-6 text-gray-700"
                            />
                            {cartItems.length > 0 && (
                                <span className="absolute -top-2 -right-1.5 animate-bounce bg-[#D35244] text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                                    {cartItems.length}
                                </span>
                            )}
                        </div>
                    ) : (
                        <div className="hidden lg:flex items-center space-x-4">
                            <button
                                onClick={openSignInModal}
                                className="text-sm cursor-pointer bg-gradient-to-b from-[#F4B860] to-[#D35244] bg-clip-text text-transparent border border-[#FDF1DF] rounded-full py-2 px-6"
                            >
                                Login
                            </button>
                            <button
                                onClick={openCreateAccountModal}
                                className="text-sm cursor-pointer bg-gradient-to-r from-[#F4B860] to-[#D35244] text-white rounded-full py-2 px-6"
                            >
                                Create an Account
                            </button>
                        </div>
                    )}
                </div>
            </nav>

            {/* Auth Modal */}
            {isAuthModalOpen &&
                createPortal(
                    <div className="fixed inset-0 bg-transparent z-50 flex items-center justify-center">
                        <AuthModal
                            onClose={closeAuthModal}
                            initialView={authInitialView}
                        />
                    </div>,
                    document.body
                )}
        </>
    );
}

export default StudentNavbar;
