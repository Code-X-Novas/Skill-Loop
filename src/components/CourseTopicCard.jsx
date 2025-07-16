const CourseTopicCard = () => {
  const data = [
    { name: "Design", value: 10, color: "#FAD7A0" },
    { name: "Code", value: 10, color: "#F4A261" },
    { name: "Business", value: 10, color: "#F6BE7A" },
    { name: "Data", value: 12, color: "#D2691E" },
  ];

  const total = data.reduce((acc, item) => acc + item.value, 0);

  // calculate percentages
  const percentages = data.map((item) => ({
    ...item,
    percentage: Math.round((item.value / total) * 100),
  }));

  // convert to conic-gradient string
  const getGradient = () => {
    let currentDeg = 0;
    return percentages
      .map((item) => {
        const start = currentDeg;
        const end = currentDeg + item.percentage * 3.6;
        currentDeg = end;
        return `${item.color} ${start}deg ${end}deg`;
      })
      .join(", ");
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm">
      <h2 className="text-base font-semibold mb-4">Course Topic</h2>

      <div className="relative w-40 h-40 mx-auto">
        <div
          className="w-full h-full rounded-full"
          style={{
            background: `conic-gradient(${getGradient()})`,
          }}
        ></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-white rounded-full flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
          <div className="text-center">
            <p className="text-2xl font-bold">{total}</p>
            <p className="text-xs text-gray-500">Total Course</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-6 text-xs font-medium text-gray-700">
        {percentages.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: item.color }}
            ></div>
            <span>
              {item.name} ({item.percentage}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseTopicCard;
