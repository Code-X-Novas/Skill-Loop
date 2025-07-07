import { useState } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';

const SignIn = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('admin');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({});

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

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
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Welcome back</h1>
            <p className="text-sm sm:text-base text-gray-600">Please enter your details to sign in</p>
          </div>

          {/* Toggle Buttons */}
          <div className="flex bg-gray-100 rounded-full p-1 mb-6 sm:mb-8 relative z-10">
            <div className="absolute inset-y-1 transition-all duration-300 ease-in-out" 
                 style={{
                   left: activeTab === 'admin' ? '1%' : '50%',
                   right: activeTab === 'admin' ? '50%' : '1%',
                   backgroundColor: 'white',
                   borderRadius: '9999px',
                   boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
                 }}>
            </div>
            <button 
              onClick={() => handleTabChange('admin')}
              className={`flex-1 py-2 px-3 sm:px-4 text-xs sm:text-sm font-medium rounded-full transition-all ease-in-out duration-300 relative z-10 ${
                activeTab === 'admin' 
                  ? 'text-gray-700' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Admin
            </button>
            <button 
              onClick={() => handleTabChange('student')}
              className={`flex-1 py-2 px-3 sm:px-4 text-xs sm:text-sm font-medium rounded-full transition-all duration-300 relative z-10 ${
                activeTab === 'student' 
                  ? 'text-gray-700' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Student
            </button>
          </div>

          {/* Form */}
          <div className="space-y-4 sm:space-y-6 relative z-10">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input 
                type="email" 
                id="email" 
                name="email"
                onChange={handleInputChange}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                placeholder="Enter your email"
              />
            </div>

            {/* Password*/}
            <div>
              <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input 
                  type={showPassword ? 'text' : 'password'}
                  id="password" 
                  name="password"
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 pr-10 sm:pr-12 text-sm sm:text-base"
                  placeholder="Enter your password"
                />
                <button 
                  type="button" 
                  onClick={togglePassword}
                  className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff size={18} className="sm:w-5 sm:h-5" /> : <Eye size={18} className="sm:w-5 sm:h-5" />}
                </button>
              </div>
            </div>

            <button 
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-[#F4B860] to-[#D35244] text-white py-2.5 sm:py-3 px-4 rounded-lg sm:rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 text-sm sm:text-base"
            >
              Sign in
            </button>

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
              Don't have an account? 
              <a href="#" className="text-red-500 font-semibold hover:text-red-600 transition-colors duration-200 ml-1">
                Create Account
              </a>
            </p>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;