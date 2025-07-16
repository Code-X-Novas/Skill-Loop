import { useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const Settings = () => {
  const [form, setForm] = useState({
    name: "Edit name",
    email: "nabinagarwal@gmail.com",
    phone: "1234567890",
    city: "Bhubaneswar",
  });

  const [editMode, setEditMode] = useState(false);
  const [tempForm, setTempForm] = useState(form);

  const handleChange = (e) => {
    setTempForm({ ...tempForm, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setForm(tempForm);
    setEditMode(false);
  };

  const handleDiscard = () => {
    setTempForm(form);
    setEditMode(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg space-y-6">
      <h2 className="text-lg font-semibold">My Profile</h2>

      {/* Top Avatar and Name Section */}
      <div className="border rounded-lg p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-xs border">
            <img
              src="https://picsum.photos/200"
              alt="avatar"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div>
            <p className="font-semibold">{form.name}</p>
            <p className="text-sm text-gray-500">{form.email}</p>
          </div>
        </div>
        <div className="space-x-2">
          <button
            onClick={handleDiscard}
            className="text-sm border px-4 py-1 rounded hover:bg-gray-100"
          >
            Discard Changes
          </button>
          <button
            onClick={handleSave}
            className="text-sm bg-gradient-to-r from-[#F4B860] to-[#D35244] text-white px-4 py-1 rounded"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Contact Info */}
      <div className="border rounded-lg p-4 flex justify-between items-start">
        <div className="space-y-2 text-sm">
          <div>
            <p className="text-gray-500">email</p>
            <p className="font-medium">{form.email}</p>
          </div>
          <div>
            <p className="text-gray-500">phone</p>
            {editMode ? (
              <input
                type="text"
                name="phone"
                value={tempForm.phone}
                onChange={handleChange}
                className="border rounded px-2 py-1 w-full"
              />
            ) : (
              <p className="font-medium">{form.phone}</p>
            )}
          </div>
          <div>
            <p className="text-gray-500">city</p>
            {editMode ? (
              <input
                type="text"
                name="city"
                value={tempForm.city}
                onChange={handleChange}
                className="border rounded px-2 py-1 w-full"
              />
            ) : (
              <p className="font-medium">{form.city}</p>
            )}
          </div>
        </div>
        <button
          onClick={() => setEditMode(!editMode)}
          className="text-sm text-white bg-gradient-to-r from-[#F4B860] to-[#D35244] px-4 py-2 rounded flex items-center gap-2"
        >
          <FiEdit3 />
          Edit
        </button>
      </div>

      {/* Delete Account Warning */}
      <div className="border-2 border-[#D35244]/30 bg-[#F8EEDD] p-4 rounded-md">
        <div className="flex items-start gap-3">
          <div className="text-[#D35244] mt-1">
            <MdDelete size={24} />
          </div>
          <div>
            <p className="font-semibold text-[#D35244]">Delete Account</p>
            <p className="text-sm text-gray-600 mt-1">
              Would you like to delete account?
              <br />
              This account includes access to rented vehicles. Deleting your
              account will permanently remove all associated bookings and
              rental history.
            </p>
            <p className="mt-2 text-sm font-medium italic text-black">
              I want to delete my account.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
