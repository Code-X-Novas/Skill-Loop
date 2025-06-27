function Navbar() {
  return (
    <nav className="py-4 px-8">
      <div className="container mx-auto flex justify-between items-center">
        <img src="/skillLoopLogo.svg" alt="SkillLoop Logo" className="h-16 w-16" />
        <ul className="flex space-x-8 items-center">
          <li>
            <a href="/" className="text-sm">Home</a>
          </li>
          <li>
            <a href="/about" className="text-sm">Courses</a>
          </li>
          <li>
            <a href="/blog" className="text-sm">Internship</a>
          </li>
          <li>
            <a href="/blog" className="text-sm">Job Openings</a>
          </li>
          <li>
            <a href="/contact" className="text-sm">Contact</a>
          </li>
        </ul>
        <div className="flex items-center space-x-4 ">
          <a href="/login" className="text-sm bg-gradient-to-b from-[#F4B860] to-[#D35244] bg-clip-text text-transparent border-2 border-[#FDF1DF] rounded-full py-2 px-8">Login</a>
          <a href="/signup" className="text-sm bg-linear-to-r from-[#F4B860] to-[#D35244] text-white rounded-full py-2 px-8">Create an Account</a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar