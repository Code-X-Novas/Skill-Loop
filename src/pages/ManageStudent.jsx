import React from 'react';
import GlanceCard from '../Components/cards/GlanceCard';
import StudentEnrollCharts from '../Components/Chart/StudentEnrollChart';
import JobOpeningsChart from '../Components/Chart/JobOpeningsChart';
import StudentTable from '../Components/tables/StudentTable';
import { FaFilter, FaSearch } from 'react-icons/fa';

const ManageStudents = () => {
  return (
    <div className="p-4 md:p-6 text-gray-700 space-y-3">
      <h1 className="text-xl font-semibold">Batch Insights</h1>

      <div className="flex flex-wrap justify-start gap-4">
        <GlanceCard title="Students Enrolled" className="h-45 w-full sm:w-[350px]">
          <div className="h-full">
            <StudentEnrollCharts />
          </div>
        </GlanceCard>

        <GlanceCard title="Total Student: 198" className="h-45 w-full sm:w-[350px]">
          <div className="h-full">
            <JobOpeningsChart />
          </div>
        </GlanceCard>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-xl font-semibold">Internship Applicants</h2>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-2">

          <div className="relative w-full md:w-auto">
            <input
              type="text"
              placeholder="Search"
              className="border px-3 py-1 rounded pl-8 text-sm w-full md:w-64 outline-none focus:ring-2 focus:ring-yellow-300"
            />
            <FaSearch className="absolute left-2 top-2.5 text-gray-400 text-sm" />
          </div>

          <button className="flex items-center gap-1 border px-3 py-1 rounded text-sm w-full md:w-auto hover:bg-gray-100 transition-colors">
            <FaFilter />
            <span>Filter</span>
          </button>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <StudentTable />
      </div>
    </div>
  );
};

export default ManageStudents;
