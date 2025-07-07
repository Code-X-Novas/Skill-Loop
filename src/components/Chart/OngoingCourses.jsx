import React from 'react';

const OngoingCourses = () => {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-3">Ongoing Courses</h2>
      <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
        {[1, 2, 3, 4, 5].map((_, i) => (
          <div
            key={i}
            className="min-w-[320px] h-[180px] bg-gray-200 rounded-lg flex-shrink-0 shadow"
          />
        ))}
      </div>
    </section>
  );
};

export default OngoingCourses;
