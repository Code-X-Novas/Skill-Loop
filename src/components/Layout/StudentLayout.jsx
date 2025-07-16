import { Outlet } from 'react-router-dom';
import StudentSidebar from './StudentSidebar';

const StudentLayout = () => {
  return (
    <div className="flex h-screen">
      <div className="flex-shrink-0 w-64">
        <StudentSidebar />
      </div>

      {/* Main content (takes remaining space) */}
      <div className="flex-1 overflow-y-auto bg-white">
        <Outlet />
      </div>
    </div>
  );
};

export default StudentLayout;
