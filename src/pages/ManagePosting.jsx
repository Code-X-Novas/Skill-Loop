import React from 'react';
import { FaFilter, FaPlusCircle, FaSearch } from 'react-icons/fa';
import ApplicantTable from '../components/tables/ApplicantTable';

const ManagePosting = () => {
  return (
    <div className="p-4 md:p-6 text-gray-700 space-y-6">
   
      <div className="flex flex-wrap gap-6">
       
        <div className="w-full sm:w-[280px] space-y-2">
          <p className="text-sm font-semibold text-gray-800">View Existing Forms</p>
          <div className="border-2 border-dashed border-gray-300 rounded-lg h-40 p-4 flex items-center justify-center">
            <div className="w-full h-full flex gap-3">
              <div className="flex-1 bg-gray-200 rounded-lg" />
              <div className="flex-1 bg-gray-200 rounded-lg" />
            </div>
          </div>
        </div>

        <div className="w-full sm:w-[280px] space-y-2">
          <p className="text-sm font-semibold text-gray-800">Upload New Form</p>
          <div className="border-2 border-dashed border-gray-300 rounded-lg h-40 p-4 flex items-center justify-center relative">
            <label className="cursor-pointer w-full h-full flex items-center justify-center">
              <div className="w-[150px] h-[90px] bg-gray-200 transition rounded-lg flex items-center justify-center shadow-inner">
                <FaPlusCircle className="text-6xl text-white" />
              </div>
            </label>

            <input className="hidden"
            />
          </div>
        </div>
      </div>

     
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-xl font-semibold text-gray-800">Internship Applicants</h2>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-3 w-full md:w-auto">
       
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search applicants"
              className="border border-gray-300 px-3 py-2 rounded pl-9 text-sm w-full outline-none focus:ring-2 focus:ring-yellow-300"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400 text-sm" />
          </div>

    
          <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded text-sm bg-white hover:bg-gray-100 transition">
            <FaFilter />
            Filter
          </button>
        </div>
      </div>

      <div className="w-full overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
        <ApplicantTable />
      </div>
    </div>
  );
};

export default ManagePosting;