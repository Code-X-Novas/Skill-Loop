import { useState } from 'react';
import { X } from 'lucide-react';

const CreateAccount = ({ onClose, onSwitchToSignIn }) => {
  const [formData, setFormData] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    //Form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-sm sm:max-w-md relative">
        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute -top-2 -right-2 z-20 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200"
            aria-label="Close sign in"
          >
            <X size={20} className="text-gray-600 hover:text-gray-800" />
          </button>
        )}

        {/* Main Card */}
        <div className='p-[1px] rounded-2xl sm:rounded-3xl bg-[radial-gradient(circle_at_bottom,#211B86,#FFB47B)]'>
        <div className="bg-white/98 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 relative overflow-hidden">          
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8 relative z-10">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Create Account</h1>
            <p className="text-sm sm:text-base text-gray-600">Please enter your details to sign up</p>
          </div>

          {/* Form */}
          <div className="space-y-4 sm:space-y-6 relative z-10">

            {/* Name */}
            <div className='bg-radial from-[#99999910] to-[#00000010] px-4 py-2 rounded-lg sm:rounded-xl'>
                <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Name<span className="text-red-500">*</span>
                </label>
                <input 
                    type="name" 
                    id="name" 
                    name="name"
                    onChange={handleInputChange}
                    className="w-full focus:outline-none text-sm sm:text-base"
                    placeholder="Enter your name"
                />
            </div>

            {/* College Name */}
            <div className='bg-radial from-[#99999910] to-[#00000010] px-4 py-2 rounded-lg sm:rounded-xl'>
                <label htmlFor="college" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    College Name<span className="text-red-500">*</span>
                </label>
                <input 
                    type="text" 
                    id="college" 
                    name="college"
                    onChange={handleInputChange}
                    className="w-full focus:outline-none text-sm sm:text-base"
                    placeholder="Enter your college name"
                />
            </div>

            {/* Email ID */}
            <div className='bg-radial from-[#99999910] to-[#00000010] px-4 py-2 rounded-lg sm:rounded-xl'>
                <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Email ID<span className="text-red-500">*</span>
                </label>
                <input 
                    type="email" 
                    id="email" 
                    name="email"
                    onChange={handleInputChange}
                    className="w-full focus:outline-none text-sm sm:text-base"
                    placeholder="Enter your email ID"
                />
            </div>

            {/* Contact Number */}
            <div className='bg-radial from-[#99999910] to-[#00000010] px-4 py-2 rounded-lg sm:rounded-xl'>
                <label htmlFor="contact" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Contact Number<span className="text-red-500">*</span>
                </label>
                <input 
                    type="number" 
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                    maxLength="10"
                    id="contact" 
                    name="contact"
                    onChange={handleInputChange}
                    className="w-full focus:outline-none text-sm sm:text-base"
                    placeholder="Enter your contact number"
                />
            </div>

            {/* Referral Name (Optional) */}
            <div className='bg-radial from-[#99999910] to-[#00000010] px-4 py-2 rounded-lg sm:rounded-xl'>
                <label htmlFor="referral" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Referral Name <span className="text-gray-400 text-xs">(if any)</span>
                </label>
                <input 
                type="text" 
                id="referral" 
                name="referral"
                onChange={handleInputChange}
                className="w-full focus:outline-none text-sm sm:text-base"
                placeholder="Enter referral name if any"
                />
            </div>

            <button 
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-[#F4B860] to-[#D35244] text-white py-2.5 sm:py-3 px-4 rounded-lg sm:rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 text-sm sm:text-base mb-0"
            >
              Sign in
            </button>

            <div className="flex items-center justify-center gap-4 my-6">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="text-gray-600 text-sm font-medium">OR</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>

            <button 
              type="button" 
              className="w-full bg-gray-100 text-gray-700 py-2.5 sm:py-3 px-4 rounded-lg sm:rounded-xl font-medium flex items-center justify-center gap-2 sm:gap-3 hover:bg-gray-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm sm:text-base"
            >
              <img src="/google.svg" alt="Google Icon" className="w-4 h-4 sm:w-5 sm:h-5" />
              Continue with Google
            </button>
          </div>

          <div className="text-center mt-6 sm:mt-8 relative z-10">
            <p className="text-gray-600 text-xs sm:text-sm">
                Already have an account? 
              <button 
                onClick={onSwitchToSignIn}
                className="text-red-500 font-semibold hover:text-red-600 transition-colors duration-200 ml-1 underline cursor-pointer"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;