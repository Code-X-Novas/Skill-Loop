import React from 'react';
import { FaPlusCircle } from 'react-icons/fa';

const UploadBox = ({ label,id }) => (
  <div className="flex-1">
    <p className="mb-1 text-sm font-medium">{label}</p>

    <div className="border-2 border-dashed border-gray-300 rounded p-4 h-64 flex items-center justify-center">
      <label htmlFor={id} className="cursor-pointer w-full h-full flex items-center justify-center">
        <div className="w-[250px] h-[160px] bg-[#eae8e8] flex items-center justify-center rounded">
          <FaPlusCircle className="text-8xl text-white" />
        </div>
      </label>

      <input
        className="hidden"
      />
    </div>
  </div>
);
export default UploadBox;