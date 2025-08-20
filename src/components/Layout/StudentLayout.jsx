import { useState } from "react";
import { Outlet } from "react-router-dom";
import StudentSidebar from "./StudentSidebar";
import StudentNavbar from "../StudentNavbar";

const StudentLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <div className="flex  overflow-hidden">
            {/* Sidebar */}
            <div className={`z-40 ${isSidebarOpen ? "block duration-300 transition-all ease-in-out" : "hidden"} md:block`}>
                <StudentSidebar closeSidebar={closeSidebar} />
            </div>

            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-transparent z-30 md:hidden"
                    onClick={toggleSidebar}
                />
            )}

            {/* Main content */}
            <div className="flex md:pl-64 flex-col flex-1 overflow-y-auto bg-white">
                <StudentNavbar toggleSidebar={toggleSidebar} />
                <Outlet />
            </div>
        </div>
    );
};

export default StudentLayout;
