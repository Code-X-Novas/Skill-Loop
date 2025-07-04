import React from 'react';
import Lines from './Lines';

const EnrollmentTable = () => (
  <table className="w-full text-xs text-left bg-white rounded-lg overflow-hidden border border-gray-300 shadow">
    <thead className="bg-gray-100 text-gray-500">
      <tr>
        {[
          "Enrollment Id",
          "Full Name",
          "Contact Number",
          "Email Id",
          "Course Enrolled",
          "Enrolled On",
          "Admin Utilities",
        ].map((heading, index, array) => (
          <th
            key={heading}
            className={`px-4 py-2 border-b border-gray-300 ${
              index !== array.length - 1 ? 'border-r border-gray-300' : ''
            }`}
          >
            {heading}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      <Lines colCount={7} rowCount={3} />
    </tbody>
  </table>
);

export default EnrollmentTable;

