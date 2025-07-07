import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { LuArrowUpFromLine } from "react-icons/lu";
import InputField from '../Components/Form/InputField';
import TextAreaField from '../Components/Form/TextAreaField';
import UploadBox from "../Components/Form/UploadBox";

const CreateCourse = () => {
  const navigate = useNavigate();
const [courseTitle, setCourseTitle] = useState('');

  return (
    <div className="min-h-screen font-sans flex">
    

      <div className="w-64 h-screen fixed top-0 left-0 bg-orange-200 border-r border-black flex flex-col z-10">
        <div className="p-6 text-xl font-bold text-black">SkillLoop</div>
        <nav className="flex-1">
          <ul>
            <li className="px-6 py-3 hover:bg-orange-200 cursor-pointer flex items-center gap-2">
              <LuArrowUpFromLine /> Manage Courses
            </li>
            <li className="px-6 py-3 bg-orange-300 font-medium">Add new course</li>
          </ul>
        </nav>
        <button
          onClick={() => navigate('/courses')}
          className="mt-auto px-6 py-3 text-left flex items-center gap-2"
        >
          <FaArrowLeft /> Back
        </button>
      </div>

      <div className="ml-64 flex-1 p-10 bg-white overflow-y-auto">
        <h1 className="text-2xl font-semibold text-center mb-8">Create a New Course</h1>

        <form className="space-y-8 max-w-4xl mx-auto">
          <InputField
            label="Course Title *"
          />

          <TextAreaField
            label="Description *"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <UploadBox
              label="Add a thumbnail"
            />
            <UploadBox
              label="Add videos"
            />
          </div>

          <div className="pt-4">
            <h2 className="text-xl font-semibold mb-4">SEO Settings</h2>
            <InputField
              label="SEO Title *"
            />
            <TextAreaField
              label="Meta Description *"
            />
            <InputField
              label="Slug / URL Handle *"
            />
            <UploadBox
              label="Social Share Preview"
            />
          </div>

          <div className="flex justify-around gap-4 pt-6">
            <button
              type="button"
              className="px-6 py-2 border border-gray-400 bg-gray-100 hover:bg-gray-200 rounded"
            >
              Save
            </button>
            <button
              type="submit"
              className="px-6 py-2 border border-gray-400 bg-gray-100 hover:bg-gray-200 rounded"
            >
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
