import { Outlet } from 'react-router-dom';
import StudentSidebar from './StudentSidebar';
import StudentNavbar from '../StudentNavbar';

const StudentLayout = () => {
  return (
    <div className="flex h-screen">
      <div className="flex-shrink-0 w-64">
        <StudentSidebar />
      </div>
      <div className="flex-1 overflow-y-auto bg-white">
        <StudentNavbar />
        <Outlet />
      </div>
    </div>
  );
};

export default StudentLayout;
