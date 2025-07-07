import React from 'react';

const CourseTable = () => {
  const colCount = 6;
  const rowCount = 12;

  const actionButtons = (
    <div className="flex gap-4 justify-center">
      <button className="px-3 py-1 rounded text-xs text-black bg-gray-200 hover:bg-gray-400 transition">
        View Course
      </button>
      <button className="px-3 py-1 rounded text-xs text-black bg-gray-200 hover:bg-gray-400 transition">
        Edit Course
      </button>
      <button className="px-3 py-1 rounded text-xs text-black bg-gray-200 hover:bg-gray-400 transition">
        Delete Course
      </button>
    </div>
  );

  return (
    <div className="overflow-auto border rounded-lg">
      <table className="min-w-full text-xs text-center border border-gray-200 bg-white">
        <thead className="bg-gray-100 text-gray-500">
          <tr>
            {['Course Title', 'Tier', 'Price', 'Students Enrolled', 'Status', 'Actions'].map(
              (heading, i) => (
                <th
                  key={i}
                  className="px-4 py-2 border border-gray-400 text-cente text-xs"
                >
                  {heading}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rowCount }).map((_, rowIndex) => (
            <tr key={rowIndex} className="border-b border-orange-300 text-gray-500 ">
              
              {rowIndex % 3 === 0 && (
                <td rowSpan={3} className="border-r border-orange-300 align-top"></td>
              )}
            
              {Array.from({ length: colCount - 1 }).map((_, colIndex) => (
                <td
                  key={colIndex}
                  className={`px-4 py-2 ${
                    colIndex !== colCount - 2 ? 'border-r border-orange-300' : ''
                  }`}
                >
                  <div className="flex items-center justify-center">
                    {colIndex === colCount - 2 ? actionButtons : ''}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseTable;
