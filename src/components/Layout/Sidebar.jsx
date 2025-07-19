import React from 'react';
import { GoHome } from "react-icons/go";
import { BiSolidArrowFromBottom } from "react-icons/bi";
import { TbShoppingBagSearch } from "react-icons/tb";
import { IoMdPerson } from "react-icons/io";
import { MdLogout, MdSupervisorAccount } from "react-icons/md";
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  const menuItems = [
    { path: '/dashboard', label: 'Home', icon: <GoHome /> },
    { path: '/courses', label: 'Manage Courses', icon: <BiSolidArrowFromBottom /> },
    { path: '/postings', label: 'Manage Postings', icon: <TbShoppingBagSearch /> },
    { path: '/students', label: 'Manage Students', icon: <IoMdPerson /> },
  ];

  // Add Admin Management only for super admin
  if (user?.role === 'superadmin') {
    menuItems.push({
      path: '/admin-management',
      label: 'Manage Admins',
      icon: <MdSupervisorAccount />
    });
  }

  return (
    <div className="h-screen w-64 bg-orange-200 text-black py-6 flex flex-col justify-between rounded-2xl sidebar-shadow font-semibold">
      <div>
        <div className="px-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800">
            {user?.role === 'superadmin' ? 'Super Admin' : 'Admin'} Panel
          </h2>
        </div>

        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-6 py-3 rounded-r-full transition-all ${
                  location.pathname === item.path 
                    ? 'bg-orange-300 text-orange-900 font-bold border-r-4 border-orange-500' 
                    : 'hover:bg-orange-100 text-gray-700'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="px-6">
        <Link
          to="/logout"
          className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all"
        >
          <MdLogout />
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
