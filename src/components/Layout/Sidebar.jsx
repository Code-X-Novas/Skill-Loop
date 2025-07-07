import React from 'react';
import { GoHome } from "react-icons/go";
import { BiSolidArrowFromBottom } from "react-icons/bi";
import { TbShoppingBagSearch } from "react-icons/tb";
import { IoMdPerson } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', label: 'Home', icon: <GoHome /> },
    { path: '/courses', label: 'Manage Courses', icon: <BiSolidArrowFromBottom /> },
    { path: '/postings', label: 'Manage Postings', icon: <TbShoppingBagSearch /> },
    { path: '/students', label: 'Manage Students', icon: <IoMdPerson /> },
  ];

  return (
    <div className="h-screen w-64 bg-orange-200 text-black py-6 flex flex-col justify-between rounded-2xl sidebar-shadow font-semibold">
      <div>
        <h2 className="text-3xl font-bold mb-14 px-6">SkillLoop</h2>
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`w-full flex items-center gap-4 px-6 py-2 rounded transition-colors duration-200 ${
                  location.pathname === item.path ? 'bg-orange-300' : 'hover:bg-orange-100'
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="px-6">
        <button className="w-full flex items-center gap-2 py-2 rounded cursor-pointer transition-colors duration-200 text-black">
          <MdLogout />
          Log out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
